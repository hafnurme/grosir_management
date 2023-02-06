import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  function middleware(NextRequest) {
    const permission = NextRequest.nextauth.token.tokenObj.permision;

    const permisArray = [];

    permission.map((permissionElement) => {
      permisArray.push(permissionElement.name);
    });

    if (NextRequest.nextUrl.pathname.startsWith("/admin/produk")) {
      if (permisArray.includes("admin")) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/admin", NextRequest.url));
    }

    if (NextRequest.nextUrl.pathname.startsWith("/admin/produk/tambah")) {
      if (permisArray.includes("admin")) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/admin", NextRequest.url));
    }

    if (NextRequest.nextUrl.pathname.startsWith("/admin/kategori")) {
      if (permisArray.includes("admin")) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/admin", NextRequest.url));
    }

    if (NextRequest.nextUrl.pathname.startsWith("/admin/branch")) {
      if (permisArray.includes("admin")) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/admin", NextRequest.url));
    }

    if (NextRequest.nextUrl.pathname.startsWith("/admin/order")) {
      if (permisArray.includes("admin")) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/admin", NextRequest.url));
    }

    if (NextRequest.nextUrl.pathname.startsWith("/admin/supplier")) {
      if (permisArray.includes("admin")) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/admin", NextRequest.url));
    }

    if (NextRequest.nextUrl.pathname.startsWith("/admin/warehouse")) {
      if (
        permisArray.includes("admin") ||
        permisArray.includes("lihat-gudang")
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
