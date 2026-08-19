import { NextRequest, NextResponse } from 'next/server';
import { supabaseKlien } from '@/pustaka/supabase/klien';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const error = requestUrl.searchParams.get('error');
  const errorDescription = requestUrl.searchParams.get('error_description');
  const next = requestUrl.searchParams.get('next') || '/dashboard';

  if (error) {
    console.error('API Google Callback Error:', error, errorDescription);
    const redirectUrl = new URL('/login', requestUrl.origin);
    redirectUrl.searchParams.set('error', errorDescription || error);
    return NextResponse.redirect(redirectUrl);
  }

  if (code) {
    try {
      const { data: sessionData, error: exchangeError } = await supabaseKlien.auth.exchangeCodeForSession(code);
      if (exchangeError) {
        console.error('API Callback code exchange error:', exchangeError.message);
        const redirectUrl = new URL('/login', requestUrl.origin);
        redirectUrl.searchParams.set('error', 'Gagal memproses otentikasi Google.');
        return NextResponse.redirect(redirectUrl);
      }

      if (sessionData?.user) {
        const u = sessionData.user;
        const meta = u.user_metadata || {};
        await supabaseKlien.from('profiles').upsert(
          {
            id: u.id,
            name: meta.full_name || meta.name || u.email?.split('@')[0] || 'Mahasiswa Pengguna',
            nim: meta.nim || `NIM-${u.id.slice(0, 8)}`,
            study_program: 'Teknik Informatika',
            role: 'user',
          },
          { onConflict: 'id' }
        );
      }

      const destinationUrl = new URL(next.startsWith('/') ? next : `/${next}`, requestUrl.origin);
      return NextResponse.redirect(destinationUrl);
    } catch (err) {
      console.error('Unexpected error in API auth callback:', err);
      const redirectUrl = new URL('/login', requestUrl.origin);
      redirectUrl.searchParams.set('error', 'Terjadi kesalahan sistem saat proses callback.');
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.redirect(new URL('/login', requestUrl.origin));
}
