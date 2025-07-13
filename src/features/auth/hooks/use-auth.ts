import { User as AuthUser } from "lucia"
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getAuth } from "../actions/get-auth";


const useAuth = () => {
    // const { user } = await getAuth();
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isFetched, setFetched] = useState<boolean | null>(null);

    // needed because the component is part of the layout and 
    // the layout doesn't re-render
    const pathname = usePathname();


    useEffect(() => {
        const fetchUser = async () => {
            const { user } = await getAuth();
            setUser(user);
            setFetched(true);
        }

        fetchUser();
    }, [pathname])

    return { user, isFetched };
}

export { useAuth }