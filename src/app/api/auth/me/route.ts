import { NextResponse } from 'next/server';
import { supabaseKlien } from '@/pustaka/supabase/klien';

export async function GET() {
  try {
    const { data: { user }, error } = await supabaseKlien.auth.getUser();

    if (error || !user) {
      return NextResponse.json({
        terautentikasi: false,
        user: null,
      });
    }

    return NextResponse.json({
      terautentikasi: true,
      user: {
        id: user.id,
        email: user.email,
        nama: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0],
        avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture,
      },
    });
  } catch (err: unknown) {
    const pesan = err instanceof Error ? err.message : 'Kesalahan server';
    return NextResponse.json({ terautentikasi: false, error: pesan }, { status: 500 });
  }
}
