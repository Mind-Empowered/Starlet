import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://pxgurlmrtoxlmlpiyqrj.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4Z3VybG1ydG94bG1scGl5cXJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwMTQzMjcsImV4cCI6MjA5MjU5MDMyN30.hoo0QEO1zswZdqzRAlCkiYk_r-BuxEN2kP6VKo2wbuo'

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Check your Vercel Environment Variables.')
}

// Export a dummy client if keys are missing to prevent app-wide crashes
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : (() => {
      const mockQuery = {
        select: () => mockQuery,
        eq: () => mockQuery,
        order: () => mockQuery,
        is: () => mockQuery,
        single: async () => ({ data: null, error: null }),
        insert: async () => ({ error: { message: 'Supabase not configured' } }),
        update: () => mockQuery,
        upsert: async () => ({ error: { message: 'Supabase not configured' } }),
        delete: () => mockQuery,
        then: (onfulfilled) => onfulfilled({ data: [], error: null }),
      };

      const mockChannel = {
        on: () => mockChannel,
        subscribe: () => mockChannel,
      };

      return {
        auth: {
          getSession: async () => ({ data: { session: null }, error: null }),
          onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
          signInWithPassword: async () => ({ error: { message: 'Supabase not configured' } }),
          signUp: async () => ({ error: { message: 'Supabase not configured' } }),
          signOut: async () => ({ error: null }),
        },
        from: () => mockQuery,
        storage: {
          from: () => ({
            upload: async () => ({ error: { message: 'Supabase not configured' } }),
            getPublicUrl: () => ({ data: { publicUrl: '' } }),
          }),
        },
        channel: () => mockChannel,
        removeChannel: () => {},
      };
    })();


