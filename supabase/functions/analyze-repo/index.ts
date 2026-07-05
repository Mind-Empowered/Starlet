// Deno Edge Function — runs on Supabase infrastructure.
// Performs automated Git commit history audit and AI detection scans on GitHub repos.
// Triggered by database webhook on insert, or manually invoked by admins.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const githubToken = Deno.env.get('GITHUB_TOKEN') // Optional token to bypass rate limit
    const hfToken = Deno.env.get('HUGGINGFACE_API_KEY') // Optional HF token

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    })

    // Parse input (supports both webhook and direct invocation)
    const body = await req.json()
    const record = body.record || body

    const submissionId = record.id
    const githubUrl = record.github_url

    if (!submissionId || !githubUrl) {
      return new Response(JSON.stringify({ error: 'Missing submission ID or GitHub URL' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Mark as scanning
    await supabase
      .from('project_submissions')
      .update({ git_audit_status: 'scanning' })
      .eq('id', submissionId)

    // Parse owner and repo from URL
    // e.g. https://github.com/owner/repo/issues -> owner, repo
    const regex = /github\.com\/([^/]+)\/([^/]+)/i
    const match = githubUrl.match(regex)

    if (!match) {
      await supabase
        .from('project_submissions')
        .update({
          git_audit_status: 'flagged',
          audit_anomalies: ['Invalid GitHub repository URL format']
        })
        .eq('id', submissionId)
      return new Response(JSON.stringify({ error: 'Invalid GitHub URL format' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const owner = match[1]
    const repo = match[2].replace(/\.git$/i, '').split('/')[0]

    // 1. Fetch commits from GitHub REST API
    const headers: Record<string, string> = {
      'User-Agent': 'Starlet-Hackathon-Auditor',
      'Accept': 'application/vnd.github.v3+json'
    }
    if (githubToken) {
      headers['Authorization'] = `token ${githubToken}`
    }

    const commitsRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=100`, { headers })
    
    if (!commitsRes.ok) {
      const errText = await commitsRes.text()
      await supabase
        .from('project_submissions')
        .update({
          git_audit_status: 'flagged',
          audit_anomalies: [`Could not access GitHub repo: ${commitsRes.statusText}`]
        })
        .eq('id', submissionId)
      return new Response(JSON.stringify({ error: `GitHub API error: ${errText}` }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const commits = await commitsRes.json()
    const totalCommits = commits.length
    const anomalies: string[] = []

    // Analyze commit times and counts
    let gitStatus = 'passed'
    if (totalCommits > 0) {
      const firstCommitDate = new Date(commits[commits.length - 1].commit.author.date)
      const lastCommitDate = new Date(commits[0].commit.author.date)
      const durationHours = Math.abs(lastCommitDate.getTime() - firstCommitDate.getTime()) / (1000 * 60 * 60)

      if (totalCommits < 3) {
        gitStatus = 'flagged'
        anomalies.push(`Low commit count (${totalCommits} total commit(s))`)
      }

      // If they finished a whole codebase in under 20 minutes
      if (durationHours < 0.33 && totalCommits >= 2) {
        gitStatus = 'flagged'
        anomalies.push(`Bulk code dump (all commits completed within 20 minutes)`)
      }
    } else {
      gitStatus = 'flagged'
      anomalies.push('Zero commits found in repository')
    }

    // 2. Optional: AI semantic detection via Hugging Face
    let aiPercentage: number | null = null
    try {
      // Find a main code file to analyze (check common locations)
      const targetPaths = [
        'src/App.jsx', 'src/App.tsx', 'src/App.js', 'src/main.jsx', 'src/index.js',
        'App.js', 'main.py', 'index.js', 'src/main.js'
      ]
      let codeContent = ''
      
      for (const path of targetPaths) {
        // Try master then main branch raw file content
        for (const branch of ['main', 'master']) {
          const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`
          const fileRes = await fetch(rawUrl, { headers: { 'User-Agent': 'Starlet-Hackathon-Auditor' } })
          if (fileRes.ok) {
            codeContent = await fileRes.text()
            break
          }
        }
        if (codeContent) break
      }

      // Send code snippet to Hugging Face text classification if we got some files
      if (codeContent && codeContent.trim().length > 100) {
        const textSnippet = codeContent.slice(0, 1000) // limit size
        
        const hfHeaders: Record<string, string> = { 'Content-Type': 'application/json' }
        if (hfToken) {
          hfHeaders['Authorization'] = `Bearer ${hfToken}`
        }

        const modelUrl = 'https://api-inference.huggingface.co/models/Hello-SimpleAI/chatgpt-detector-roberta'
        const hfRes = await fetch(modelUrl, {
          method: 'POST',
          headers: hfHeaders,
          body: JSON.stringify({ inputs: textSnippet })
        })

        if (hfRes.ok) {
          const hfData = await hfRes.json()
          // Output format from HF text classification is usually [[{label: "ChatGPT", score: X}, {label: "Human", score: Y}]]
          if (Array.isArray(hfData) && Array.isArray(hfData[0])) {
            const aiLabel = hfData[0].find((item: any) => item.label === 'ChatGPT' || item.label === 'Fake')
            if (aiLabel) {
              aiPercentage = Math.round(aiLabel.score * 100)
            }
          }
        }
      }
    } catch (e) {
      console.error('HF AI check failed (skipping):', e)
    }

    // 3. Write final results to Database
    const { error: dbError } = await supabase
      .from('project_submissions')
      .update({
        git_audit_status: gitStatus,
        ai_percentage: aiPercentage,
        commit_count: totalCommits,
        audit_anomalies: anomalies
      })
      .eq('id', submissionId)

    if (dbError) throw dbError

    return new Response(JSON.stringify({
      status: 'success',
      git_status: gitStatus,
      commits: totalCommits,
      ai_score: aiPercentage,
      anomalies
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
