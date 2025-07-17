import { useSession } from "next-auth/react";

const useAuth = () => {
    const { data: session, status } = useSession();
    console.log("Session:", session);
    return {
        user: session?.user ?? null,
        isFetched: status !== "loading",
    };
};

export { useAuth };