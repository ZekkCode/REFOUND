import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Hanya proteksi rute portal admin (/admin, /admin/klaim, /admin/laporan, dll)
  // Kecualikan halaman login admin (/admin-login) dan API routes
  if (pathname.startsWith('/admin') && pathname !== '/admin-login') {
    const adminSessionCookie = request.cookies.get('refound_admin_token') || request.cookies.get('sb-access-token');
    const adminSessionHeader = request.headers.get('x-admin-key');
    const isDev = process.env.NODE_ENV !== 'production' || process.env.AI_PROVIDER === 'mock';

    // Di production, jika tidak ada cookie session admin, redirect ke gerbang admin login
    if (!isDev && !adminSessionCookie && !adminSessionHeader) {
      const loginUrl = new URL('/admin-login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
