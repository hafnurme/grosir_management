import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// // export { default } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    if (!req.nextauth.token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (
      req.nextauth.token.user.role === "admin" &&
      req.nextUrl.pathname.startsWith("/gudang")
    ) {
      return NextResponse.redirect(new URL("/company/dashboard", req.url));
    }

    if (
      req.nextauth.token.user.role === "admin gudang" &&
      req.nextUrl.pathname.startsWith("/company")
    ) {
      return NextResponse.redirect(new URL("/gudang", req.url));
    }
  }
);

// export { default } from "next-auth/middleware";

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/company/:path*", "/gudang/:path*"],
};
