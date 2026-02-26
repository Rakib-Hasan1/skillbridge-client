import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/UserService";
import { Roles } from "./constants/roles";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  try {
    const { data } = await userService.getSession();

    const user = data?.user;

    // ===============================
    // 🔐 Protected Dashboard Routes
    // ===============================
    const protectedRoutes = [
      "/admin-dashboard",
      "/tutor-dashboard",
      "/student-dashboard",
    ];

    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(route),
    );

    // 🚫 1️⃣ Not Logged In
    if (!user && isProtectedRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // ===============================
    // 🛡️ Role Authorization
    // ===============================

    if (pathname.startsWith("/admin-dashboard")) {
      if (user?.role !== Roles.admin) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    }

    if (pathname.startsWith("/tutor-dashboard")) {
      if (user?.role !== Roles.tutor) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    }

    if (pathname.startsWith("/student-dashboard")) {
      if (user?.role !== Roles.student) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    // If session fails for any reason → treat as logged out
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/admin-dashboard/:path*",
    "/tutor-dashboard/:path*",
    "/student-dashboard/:path*",
  ],
};
