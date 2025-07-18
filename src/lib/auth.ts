import { PrismaAdapter } from "@auth/prisma-adapter";
import { verify } from "@node-rs/argon2";
import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
    debug: process.env.NODE_ENV === 'development',
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", name: "email" },
                password: { label: "Password", type: "password", name: "password" }
            },
            async authorize(credentials) {
                const email = typeof credentials.email === "string" ? credentials.email : undefined;
                const password = typeof credentials.password === "string" ? credentials.password : undefined;

                const user = await prisma.user.findUnique({
                    where: { email }
                });

                if (!user) {
                    return null;
                }
                const validPassword = await verify(user.passwordHash as string, password as string);
                console.log('Valid Password:', validPassword);
                if (!validPassword) {
                    return null;
                }
                if (user && validPassword) {
                    console.log('auth user', user);
                    return user;
                }
                return null;
            }
        })
    ], //[Keycloak]
    session: { strategy: "jwt" },
});