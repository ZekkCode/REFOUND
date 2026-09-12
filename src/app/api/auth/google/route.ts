import { NextRequest, NextResponse } from 'next/server';
import { supabaseKlien } from '@/pustaka/supabase/klien';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const next = requestUrl.searchParams.get('next') || '/dashboard';
  
  // Ambil callback origin
  const callbackUrl = process.env.NEXT_PUBLIC_AUTH_CALLBACK_URL || `${requestUrl.origin}/auth/callback`;
  const targetRedirect = `${callbackUrl}?next=${encodeURIComponent(next)}`;

  try {
    const { data, error } = await supabaseKlien.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: targetRedirect,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
          hd: 'trunojoyo.ac.id',
        },
      },
    });

    if (error) {
      return NextResponse.json({ sukses: false, error: error.message }, { status: 400 });
    }

    if (data?.url) {
      return NextResponse.redirect(data.url);
    }

    return NextResponse.json({ sukses: false, error: 'URL Google OAuth tidak ditemukan.' }, { status: 500 });
  } catch (err: unknown) {
    const pesanError = err instanceof Error ? err.message : 'Kesalahan server internal';
    return NextResponse.json({ sukses: false, error: pesanError }, { status: 500 });
  }
}
