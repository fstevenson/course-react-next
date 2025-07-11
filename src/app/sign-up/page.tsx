import Link from "next/link";
import { CardCompact } from "@/components/card-compact";
import { SignUpForm } from "@/features/auth/components/sign-up-form";
import { signInPath } from "@/paths";

const SignUpPage = () => {
    return (
        <div className="flex-1 flex flex-col gap-y-8">
            <CardCompact
                title="Sign Up"
                description="Create an account to get started"
                className="w-full max-w-[420px] self-center"
                content={<SignUpForm />}
                footer={
                    <Link className="text-sm text-muted-foreground" href={signInPath()}>
                        Have an account? Sign in now.
                    </Link>
                }
            />

        </div >

    );
}

export default SignUpPage;