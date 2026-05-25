import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

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


