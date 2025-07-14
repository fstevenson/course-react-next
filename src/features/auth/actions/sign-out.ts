"use server";

import { redirect } from "next/navigation";
import { signOut } from "@/lib/auth";
import { signInPath } from "@/paths";

export const signOutAction = async () => {

    await signOut();

    // Redirect to the Auth.js sign-out endpoint
    redirect("/api/auth/signout?callbackUrl=" + encodeURIComponent(signInPath()));
}