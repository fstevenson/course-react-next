import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { apiAuthPath, homePath, passwordForgotPath, signInPath, signUpPath } from "./paths";

export function middleware(request: NextRequest) {
    // Use `!!` to ensure the value is a boolean
    const isAuthenticated =
        !!request.cookies.get("authjs.session-token") ||
        !!request.cookies.get("__Secure-authjs.session-token");

    const { pathname } = request.nextUrl;

    // Define routes that should only be accessible to unauthenticated users
    const guestRoutes = [
        signInPath(),
        signUpPath(),
        passwordForgotPath(),
    ];

    const isGuestRoute = guestRoutes.some((route) => pathname.startsWith(route));
    const isAuthApiRoute = pathname.startsWith(apiAuthPath());

    // 1. If the user is authenticated and on a guest route, redirect to home
    if (isAuthenticated && isGuestRoute) {
        console.log("Redirecting authenticated user from guest route...");
        return NextResponse.redirect(new URL(homePath(), request.url));
    }

    // 2. If the user is not authenticated and is trying to access a protected route, redirect to sign-in
    // Note: API auth routes and guest routes are not protected.
    if (!isAuthenticated && !isGuestRoute && !isAuthApiRoute) {
        console.log("Redirecting unauthenticated user to sign-in...");
        const signInUrl = new URL(signInPath(), request.url);

        return NextResponse.redirect(signInUrl);
    }

    // 3. If none of the above conditions are met, allow the request to proceed
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|static/).*)"],
};