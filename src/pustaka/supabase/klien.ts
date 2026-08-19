import { createClient } from '@supabase/supabase-js';

export function dapatkanUrlSupabase(): string {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xgcftrngotmcptgxpflx.supabase.co';
}

export function dapatkanKunciAnonSupabase(): string {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
}

export function dapatkanKunciServiceRoleSupabase(): string {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || '';
}

export const supabaseKlien = createClient(
  dapatkanUrlSupabase(),
  dapatkanKunciAnonSupabase()
);

export function buatKlienAdminSupabase() {
  return createClient(
    dapatkanUrlSupabase(),
    dapatkanKunciServiceRoleSupabase()
  );
}

