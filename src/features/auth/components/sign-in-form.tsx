'use client';

import { signIn } from "../actions/sign-in";

const SignInForm = () => {
    return (
        <form action={signIn}>
            <button type="submit">Sign in</button>
        </form>
    );
}

export { SignInForm };