import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  function middleware(NextRequest) {
    const permission = NextRequest.nextauth.token.tokenObj.permision;

    console.log(permission);

    if (NextRequest.nextUrl.pathname.startsWith("/admin/produk")) {
      if (permission.includes("admin") || permission.includes("lihat-gudang")) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/admin", NextRequest.url));
    }

    if (NextRequest.nextUrl.pathname.startsWith("/admin/kategori")) {
      if (permission.includes("admin")) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/admin", NextRequest.url));
    }

    if (NextRequest.nextUrl.pathname == "/admin/branch") {
      if (permission.includes("admin")) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/admin", NextRequest.url));
    }

    if (NextRequest.nextUrl.pathname == "/admin/branch") {
      if (permission.includes("lihat_produk_request")) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/admin", NextRequest.url));
    }

    if (NextRequest.nextUrl.pathname.startsWith("/admin/order")) {
      if (permission.includes("admin")) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/admin", NextRequest.url));
    }

    if (NextRequest.nextUrl.pathname.startsWith("/admin/supplier")) {
      if (permission.includes("admin")) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/admin", NextRequest.url));
    }
    if (NextRequest.nextUrl.pathname == "/admin/warehouse") {
      if (permission.includes("admin")) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/admin", NextRequest.url));
    }

    if (NextRequest.nextUrl.pathname.startsWith("/admin/warehouse/detail")) {
      if (permission.includes("admin")) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/admin", NextRequest.url));
    }

    if (NextRequest.nextUrl.pathname.startsWith("/admin/role")) {
      if (permission.includes("admin")) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/admin", NextRequest.url));
    }
    if (NextRequest.nextUrl.pathname.startsWith("/admin/user")) {
      if (permission.includes("admin")) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/admin", NextRequest.url));
    }

    if (NextRequest.nextUrl.pathname == "admin/warehouse_request") {
      if (
        permission.includes("admin") ||
        permission.includes("lihat-request-pesanan")
      ) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/admin", NextRequest.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => token,
    },
  }
);

export const config = { matcher: ["/admin/:path*"] };
