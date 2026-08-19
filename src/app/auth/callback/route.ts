import { NextRequest, NextResponse } from 'next/server';
import { supabaseKlien } from '@/pustaka/supabase/klien';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const error = requestUrl.searchParams.get('error');
  const errorDescription = requestUrl.searchParams.get('error_description');
  const next = requestUrl.searchParams.get('next') || '/dashboard';

  // Tangani error yang dikirimkan oleh OAuth provider / Google
  if (error) {
    console.error('Google OAuth Error:', error, errorDescription);
    const redirectUrl = new URL('/login', requestUrl.origin);
    redirectUrl.searchParams.set('error', errorDescription || error);
    return NextResponse.redirect(redirectUrl);
  }

  // Jika terdapat auth code, tukar dengan session token
  if (code) {
    try {
      const { data: sessionData, error: exchangeError } = await supabaseKlien.auth.exchangeCodeForSession(code);
      if (exchangeError) {
        console.error('Supabase code exchange error:', exchangeError.message);
        const redirectUrl = new URL('/login', requestUrl.origin);
        redirectUrl.searchParams.set('error', 'Gagal memproses otentikasi Google. Silakan coba lagi.');
        return NextResponse.redirect(redirectUrl);
      }

      // Auto-upsert record user di public.profiles untuk mencegah Foreign Key constraint violation
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

      // Berhasil login -> redirect ke halaman tujuan
      const destinationUrl = new URL(next.startsWith('/') ? next : `/${next}`, requestUrl.origin);
      return NextResponse.redirect(destinationUrl);
    } catch (err) {
      console.error('Unexpected error in auth callback:', err);
      const redirectUrl = new URL('/login', requestUrl.origin);
      redirectUrl.searchParams.set('error', 'Terjadi kesalahan sistem saat proses masuk.');
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Jika tidak ada code maupun error, kembalikan ke login
  return NextResponse.redirect(new URL('/login', requestUrl.origin));
}
