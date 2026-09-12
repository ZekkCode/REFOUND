import { NextRequest, NextResponse } from 'next/server';
import { supabaseKlien } from '@/pustaka/supabase/klien';
import { apakahEmailKampus, sinkronisasiProfilPengguna } from '@/pustaka/supabase/auth';

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

      // Validasi dan Sinkronisasi Sesi Pengguna
      if (sessionData?.user) {
        const u = sessionData.user;
        const userEmail = u.email || '';
        const role = u.user_metadata?.role || u.app_metadata?.role;
        const isAdmin = role === 'admin_lab' || userEmail === 'admin@refound.id' || userEmail.includes('admin');

        // Validasi domain email kampus trunojoyo.ac.id
        if (!isAdmin && !apakahEmailKampus(userEmail)) {
          console.warn(`[OAuth Security] Ditolak: ${userEmail} bukan email kampus UTM.`);
          // Segera batalkan sesi pengguna non-kampus
          await supabaseKlien.auth.signOut();
          const redirectUrl = new URL('/login', requestUrl.origin);
          redirectUrl.searchParams.set(
            'error',
            'Akses ditolak: Hanya akun email resmi kampus (@trunojoyo.ac.id atau @student.trunojoyo.ac.id) yang diizinkan masuk.'
          );
          return NextResponse.redirect(redirectUrl);
        }

        // Auto-upsert record user di public.profil / public.admin_lab
        await sinkronisasiProfilPengguna({
          id: u.id,
          email: u.email,
          nama: u.user_metadata?.full_name || u.user_metadata?.name,
          nim: u.user_metadata?.nim,
          program_studi: u.user_metadata?.prodi || 'Teknik Informatika',
          role: role,
        });
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
