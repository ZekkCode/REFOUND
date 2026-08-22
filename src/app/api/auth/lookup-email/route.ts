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
      return NextResponse.json(
        { sukses: false, error: `NIM ${nim} tidak terdaftar di sistem.` },
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
