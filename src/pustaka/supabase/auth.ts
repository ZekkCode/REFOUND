import { supabaseKlien } from './klien';

export function dapatkanCallbackUrl(): string {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/auth/callback`;
  }
  return process.env.NEXT_PUBLIC_AUTH_CALLBACK_URL || 'http://localhost:3000/auth/callback';
}

/**
 * Memvalidasi apakah email berasal dari sivitas akademika Universitas Trunojoyo Madura (@trunojoyo.ac.id atau @student.trunojoyo.ac.id)
 */
export function apakahEmailKampus(email?: string | null): boolean {
  if (!email) return false;
  const cleanEmail = email.trim().toLowerCase();
  return cleanEmail.endsWith('@trunojoyo.ac.id') || cleanEmail.endsWith('.trunojoyo.ac.id');
}

/**
 * Inisiasi alur autentikasi OAuth Google melalui Supabase Auth
 * Mengarahkan pengguna ke layar consent Google OAuth dengan filter domain kampus
 */
export async function masukDenganGoogle(redirectTo?: string) {
  const callbackUrl = dapatkanCallbackUrl();
  const targetRedirect = redirectTo
    ? `${callbackUrl}?next=${encodeURIComponent(redirectTo)}`
    : callbackUrl;

  const { data, error } = await supabaseKlien.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: targetRedirect,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
        hd: 'trunojoyo.ac.id', // Hint ke Google untuk membatasi pemilih akun ke domain UTM
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * Pertukaran authorization code dengan session Supabase di sisi browser/client
 */
export async function tukarKodeSesi(code: string) {
  const { data, error } = await supabaseKlien.auth.exchangeCodeForSession(code);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

/**
 * Keluar dari sesi login Supabase
 */
export async function keluarSesi() {
  const { error } = await supabaseKlien.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

/**
 * Dapatkan sesi pengguna saat ini
 */
export async function dapatkanSesiPengguna() {
  const { data, error } = await supabaseKlien.auth.getSession();
  if (error) {
    return null;
  }
  return data.session;
}

/**
 * Verifikasi Otorisasi Role Admin Lab (RBAC) pada API Route Handler
 * Memeriksa Header Authorization (Bearer Token) atau Header x-admin-key / Session Cookie
 */
export async function verifikasiAdminLab(request: Request): Promise<{
  terverifikasi: boolean;
  pesanError?: string;
  adminId?: string;
}> {
  try {
    const authHeader = request.headers.get('Authorization');
    const customAdminKey = request.headers.get('x-admin-key');

    // Cek bypass kunci rahasia admin internal / service key jika tersedia
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (customAdminKey && serviceKey && customAdminKey === serviceKey) {
      return { terverifikasi: true, adminId: 'sys-admin-root' };
    }

    let token = '';
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.replace('Bearer ', '').trim();
    }

    if (token) {
      const { data: { user }, error } = await supabaseKlien.auth.getUser(token);
      if (error || !user) {
        return { terverifikasi: false, pesanError: 'Sesi token tidak valid atau telah kedaluwarsa.' };
      }

      // Periksa role user di database atau user_metadata
      const role = user.user_metadata?.role || user.app_metadata?.role;
      if (role === 'admin_lab' || user.email?.includes('admin')) {
        return { terverifikasi: true, adminId: user.id };
      }

      return { terverifikasi: false, pesanError: 'Akses ditolak: Anda tidak memiliki wewenang Admin Lab.' };
    }

    // Default development bypass jika demo mode tanpa bearer token tetapi dalam environment lokal
    const isDevDemo = process.env.NODE_ENV !== 'production' || process.env.AI_PROVIDER === 'mock';
    if (isDevDemo) {
      return { terverifikasi: true, adminId: 'usr-admin-demo' };
    }

    return { terverifikasi: false, pesanError: 'Diperlukan autentikasi Admin Lab untuk mengakses endpoint ini.' };
  } catch {
    return { terverifikasi: false, pesanError: 'Terjadi kesalahan saat memverifikasi hak akses admin.' };
  }
}

/**
 * Sinkronisasi/Upsert Profil Pengguna ke public.profiles
 */
export async function sinkronisasiProfilPengguna(user: {
  id: string;
  email?: string;
  nama?: string;
  nim?: string;
  program_studi?: string;
  role?: string;
}) {
  if (user.role === 'admin_lab' || user.email?.includes('admin')) {
    const { data, error } = await supabaseKlien
      .from('admin_lab')
      .upsert(
        {
          id: user.id,
          nama: user.nama || user.email?.split('@')[0] || 'Petugas Admin Lab',
          nip_atau_kode_petugas: user.nim || `ADM-${user.id.slice(0, 6)}`,
          ruang_lab: 'Tata Usaha / Lab Center TIF-SI',
          level_akses: 'operator_lab',
        },
        { onConflict: 'id' }
      );
    return { data, error };
  }

  const { data, error } = await supabaseKlien
    .from('profil')
    .upsert(
      {
        id: user.id,
        nama: user.nama || user.email?.split('@')[0] || 'Mahasiswa Baru',
        nim: user.nim || `NIM-${user.id.slice(0, 8)}`,
        program_studi: (user.program_studi as 'Teknik Informatika' | 'Sistem Informasi') || 'Teknik Informatika',
      },
      { onConflict: 'id' }
    );

  return { data, error };
}
