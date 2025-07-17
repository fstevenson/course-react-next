import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { apiAuthPath, passwordForgotPath, signInPath, signUpPath } from "./paths";

// You cannot use Prisma or NextAuth's `auth()` in middleware in v5 if you use a database adapter.
// Instead, protect routes using cookies or other logic.

export function middleware(request: NextRequest) {
    const isAuthenticated =
        request.cookies.get("authjs.session-token") ||
        request.cookies.get("__Secure-authjs.session-token");

    const { pathname } = request.nextUrl;

    // Allow access to sign-in, sign-up, password-forgot, and all auth API routes
    if (
        isAuthenticated ||
        pathname.startsWith(signInPath()) ||
        pathname.startsWith(signUpPath()) ||
        pathname.startsWith(passwordForgotPath()) ||
        pathname.startsWith(apiAuthPath())
    ) {
        return NextResponse.next();
    }

    // Redirect unauthenticated users to sign-in
    const signInUrl = new URL("/sign-in", request.url);
    return NextResponse.redirect(signInUrl);
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|static/).*)"],
};