import { NextRequest, NextResponse } from 'next/server';
import { supabaseKlien } from '@/pustaka/supabase/klien';
import { apakahEmailKampus, sinkronisasiProfilPengguna } from '@/pustaka/supabase/auth';

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
        const userEmail = u.email || '';
        const role = u.user_metadata?.role || u.app_metadata?.role;
        const isAdmin = role === 'admin_lab' || userEmail === 'admin@refound.id' || userEmail.includes('admin');

        // Validasi domain email kampus trunojoyo.ac.id
        if (!isAdmin && !apakahEmailKampus(userEmail)) {
          console.warn(`[OAuth Security] Ditolak: ${userEmail} bukan email kampus UTM.`);
          await supabaseKlien.auth.signOut();
          const redirectUrl = new URL('/login', requestUrl.origin);
          redirectUrl.searchParams.set(
            'error',
            'Akses ditolak: Hanya akun email kampus resmi Trunojoyo (@trunojoyo.ac.id atau @student.trunojoyo.ac.id) yang diizinkan.'
          );
          return NextResponse.redirect(redirectUrl);
        }

        await sinkronisasiProfilPengguna({
          id: u.id,
          email: u.email,
          nama: u.user_metadata?.full_name || u.user_metadata?.name,
          nim: u.user_metadata?.nim,
          program_studi: u.user_metadata?.prodi || 'Teknik Informatika',
          role: role,
        });
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
