import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith('/admin')) return NextResponse.next();

  // Login page is always accessible
  if (pathname === '/admin') return NextResponse.next();

  const token = req.cookies.get('admin_token')?.value;
  const validToken = Buffer.from(process.env.ADMIN_PASSWORD || 'gleeye2026').toString('base64');

  if (token !== validToken) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
