// src/features/auth/hooks/use-auth.ts
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const useAuth = () => {
    const { data: session, status } = useSession();
    const pathname = usePathname();
    const router = useRouter();

    console.log("useAuth session:", session, "status:", status, "pathname:", pathname);

    useEffect(() => {
        const time = async () => {
            setTimeout(() => {
                console.log("session:", session, "status:", status, "pathname:", pathname);
            }, 1000);
        };
        time();
    }, [session, status, pathname, router]);
    return {
        user: session?.user ?? null,
        isFetched: status !== "loading",
    };
};

export { useAuth };