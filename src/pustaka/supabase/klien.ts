/**
 * Helper Supabase Client untuk REFOUND
 * Mendukung pembacaan env Supabase URL & Anon Key
 */

export function dapatkanUrlSupabase(): string {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock-supabase.refound.local';
}

export function dapatkanKunciAnonSupabase(): string {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock-anon-key-refound';
}
