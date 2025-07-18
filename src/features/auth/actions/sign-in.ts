'use server';

import { ActionState } from '@/components/form/utils/to-action-state';
import { signIn as rawSignIn } from '@/lib/auth';
import { homePath } from '@/paths';


export const signIn = async (_actionState: ActionState, formData: FormData) => {
    const { email, password } = Object.fromEntries(formData);
    await rawSignIn('credentials', { email, password, redirectTo: homePath(), redirect: true });
    console.log('Sign-in action completed');
};