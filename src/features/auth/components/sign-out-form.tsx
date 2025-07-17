
import { LucideLogOut } from "lucide-react";
import { SubmitButton } from "@/components/form/submit-button";
import { signOutAction } from "../actions/sign-out";


// const keycloakLogoutUrl =
//     "http://127.0.0.1:8080/realms/road-to-next/protocol/openid-connect/logout?redirect_uri=http://localhost:3000";

// if wanted to logout from keycloak everywhere onClick={() => (window.location.href = keycloakLogoutUrl)}
const SignOutForm = () => {
    return (
        <form action={signOutAction}>
            <SubmitButton label="Sign Out" icon={<LucideLogOut />} />
        </form>
    );
}

export { SignOutForm };