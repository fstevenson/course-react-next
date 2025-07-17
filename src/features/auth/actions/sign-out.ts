"use server";

import { signOut } from "@/lib/auth";
import { homePath } from "@/paths";

export const signOutAction = async () => await signOut({
    redirectTo: homePath(),
});