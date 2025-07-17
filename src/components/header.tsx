
"use client";

import { LucideKanban } from "lucide-react";
import Link from "next/link";
import { SignInForm } from "@/features/auth/components/sign-in-form";
import { SignOutForm } from "@/features/auth/components/sign-out-form";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { homePath, ticketsPath } from "@/paths";
import { ThemeSwitcher } from "./theme/theme-switcher";
import { buttonVariants } from "./ui/button";

const Header = () => {
    const { user, isFetched } = useAuth();

    if (!isFetched) return null;

    const navItems = user ? (
        <>
            <Link
                href={ticketsPath()}
                className={buttonVariants({ variant: "outline" })}
            >
                Tickets
            </Link>
            <SignOutForm />

        </>
    ) : (
        <>
            <SignInForm />
        </>
    );



    return (
        <nav
            className="
                animate-header-from-top 
                supports-backdrop-blur:bg-background/60
                fixed left-0 right-0 top-0 z-20
                border-b bg-background/95 backdrop-blur
                w-full flex py-2.5 px-5 justify-between
            "
        >
            <div className="flex align-items gap-x-2">
                <Link
                    href={homePath()}
                    className={buttonVariants({ variant: "ghost" })}
                >
                    <LucideKanban />
                    <h1 className="text-lg font-semibold">TicketBounty</h1>
                </Link>
            </div>
            <div className="flex align-items gap-x-2">

                <ThemeSwitcher />
                {navItems}
            </div>
        </nav>
    );
};

export { Header };