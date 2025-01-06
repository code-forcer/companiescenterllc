// middleware/middleware.js
import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;

export function middleware(req) {
  const token = req.cookies.get('token'); // or req.headers.get('authorization') if using headers

  if (token) {
    try {
      verify(token, SECRET_KEY);
      return NextResponse.next();
    } catch (error) {
      console.error('Token verification failed:', error);
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  return NextResponse.redirect(new URL('/admin/login', req.url));
}

export const config = {
  matcher: ['/admin/:path*'], // Apply middleware to specific paths
};
