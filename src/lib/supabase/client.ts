// REFOUND Supabase client blueprint
// Install `@supabase/supabase-js` when ready: `npm install @supabase/supabase-js`

export const SUPABASE_CONFIG = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co',
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key',
};

// ponytail: Simplified config object. Upgrade path: instantiate createClient from @supabase/supabase-js once dependencies installed.
