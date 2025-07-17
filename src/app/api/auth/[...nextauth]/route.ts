export const runtime = "nodejs";
// filepath: src/app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/lib/auth";


export const { GET, POST } = handlers;
