import { NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/my-bookings"];
const authRoutes = ["/login", "/register"];

export function middleware(request) {
  // const { pathname } = request.nextUrl;
  // const token =
  //   request.cookies.get("accessToken")?.value ||
  //   request.headers.get("x-access-token");

  // const isProtected = protectedRoutes.some((r) => pathname.startsWith(r));
  // const isAuth = authRoutes.some((r) => pathname.startsWith(r));

  // if (isProtected && !token) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }
  // if (isAuth && token) {
  //   return NextResponse.redirect(new URL("/dashboard", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/my-bookings/:path*", "/login", "/register"],
};
