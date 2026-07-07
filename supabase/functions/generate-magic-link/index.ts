// Edge Function - runs server-side on Supabase infrastructure.
// Uses service_role key (set as SUPABASE_SERVICE_ROLE_KEY secret in Supabase dashboard).
// Called ONLY by admin users. Validates caller JWT role before generating link.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing authorization header' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!supabaseUrl || !supabaseAnonKey || !serviceRoleKey) {
      console.error('Missing configuration: SUPABASE_URL, SUPABASE_ANON_KEY or SUPABASE_SERVICE_ROLE_KEY is not defined.')
      return new Response(JSON.stringify({ error: 'Internal configuration error' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Verify caller is an authenticated user
    const callerClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    })

    const { data: { user: callerUser }, error: callerErr } = await callerClient.auth.getUser()
    if (callerErr || !callerUser) {
      console.error('Caller authentication failed:', callerErr)
      return new Response(JSON.stringify({ error: 'Invalid or expired token' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Use service_role client to bypass RLS policies when verifying admin role
    const adminClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    })

    const { data: callerProfile, error: profileErr } = await adminClient
      .from('profiles')
      .select('user_role')
      .eq('id', callerUser.id)
      .single()

    if (profileErr) {
      console.error(`Error querying user profile for ID ${callerUser.id}:`, profileErr)
    }

    if (callerProfile?.user_role !== 'admin') {
      return new Response(JSON.stringify({ error: 'Forbidden: admin only' }), {
        status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Parse target email from request body safely
    let email: string
    try {
      const body = await req.json()
      email = body.email
    } catch (parseErr) {
      console.error('Failed to parse request JSON body:', parseErr)
      return new Response(JSON.stringify({ error: 'Invalid JSON request body' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    if (!email || typeof email !== 'string') {
      return new Response(JSON.stringify({ error: 'Missing email in request body' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const trimmedEmail = email.trim().toLowerCase()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmedEmail)) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const { data, error } = await adminClient.auth.admin.generateLink({
      type: 'recovery',
      email: trimmedEmail,
    })

    if (error) {
      console.error(`Error generating magic link for ${trimmedEmail}:`, error)
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    return new Response(
      JSON.stringify({
        magic_link: data.properties?.action_link,
        email: trimmedEmail,
        expires_in: '1 hour (single-use)'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (err) {
    console.error('Unhandled server error:', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
