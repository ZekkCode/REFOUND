import { NextResponse } from 'next/server';
import { buatKlienAdminSupabase } from '@/pustaka/supabase/klien';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nim } = body;

    if (!nim) {
      return NextResponse.json({ sukses: false, error: 'NIM wajib dikirim.' }, { status: 400 });
    }

    const adminClient = buatKlienAdminSupabase();
    
    // Fetch all users to look up by user_metadata.nim
    const { data: { users }, error } = await adminClient.auth.admin.listUsers();

    if (error) {
      return NextResponse.json({ sukses: false, error: error.message }, { status: 500 });
    }

    const foundUser = users.find(
      (u) => u.user_metadata?.nim === nim || u.user_metadata?.nip === nim
    );

    if (!foundUser || !foundUser.email) {
      // Otomatis buat akun admin default jika belum terdaftar demi kemudahan demo
      if (nim === 'ADM-TIF-01') {
        try {
          const { data: newUser, error: createError } = await adminClient.auth.admin.createUser({
            email: 'admin@refound.id',
            password: '123456',
            email_confirm: true,
            user_metadata: {
              full_name: 'Admin Laboratorium TIF-SI',
              nim: 'ADM-TIF-01',
              role: 'admin_lab'
            }
          });

          if (!createError && newUser?.user) {
            return NextResponse.json({
              sukses: true,
              email: 'admin@refound.id',
            });
          }
        } catch (errCreate) {
          console.error('Gagal melakukan auto-seeding admin:', errCreate);
        }
      }

      return NextResponse.json(
        { sukses: false, error: `NIM/NIP ${nim} tidak terdaftar di sistem.` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      sukses: true,
      email: foundUser.email,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Kesalahan server';
    return NextResponse.json({ sukses: false, error: msg }, { status: 500 });
  }
}
