import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  // cek token user dari next-auth (JWT)
  const token = await getToken({ req, secret });

  const { pathname } = req.nextUrl;

  // jika akses route /backend dan token tidak ada (belum login)
  if (pathname.startsWith("/backend") && !token) {
    // redirect ke halaman login
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // izinkan akses (next)
  return NextResponse.next();
}

// hanya jalankan middleware untuk route /backend dan turunannya
export const config = {
  matcher: ["/backend/:path*"],
};
