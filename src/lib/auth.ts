import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from 'next-auth';
import Keycloak from 'next-auth/providers/keycloak';
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
    debug: process.env.NODE_ENV === 'development',
    adapter: PrismaAdapter(prisma),
    providers: [Keycloak],
    session: { strategy: "database" },
});