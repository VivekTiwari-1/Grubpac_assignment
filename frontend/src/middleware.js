import { NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/my-bookings"];
const authRoutes = ["/login", "/register"];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Read httpOnly cookie set by backend
  const token = request.cookies.get("accessToken")?.value;

  const isProtected = protectedRoutes.some((r) => pathname.startsWith(r));
  const isAuth = authRoutes.some((r) => pathname.startsWith(r));

  if (isProtected && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname); // optional: redirect back after login
    return NextResponse.redirect(loginUrl);
  }

  if (isAuth && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/my-bookings/:path*", "/login", "/register"],
};
