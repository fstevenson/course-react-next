"use server"

import { hash } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { ActionState, fromErrorToActionState } from "@/components/form/utils/to-action-state";
import { lucia } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

const signUpSchema = z.object({
    username: z
        .string()
        .min(1)
        .max(191)
        .refine((value) => !value.includes(" "), "User cannot contain spaces"),
    email: z.string().min(1, { message: "Is required" }).max(191).email(),
    password: z.string().min(6).max(191),
    confirmPassword: z.string().min(6).max(191),
})
    .superRefine(({ password, confirmPassword }, ctx) => {
        if (password !== confirmPassword) {
            ctx.addIssue({
                code: "custom",
                message: "Passwords do not match",
                path: ["confirmPassword"]
            })
        }
    });


export const signUp = async (_actionState: ActionState, formData: FormData) => {
    // console.log(Object.fromEntries(formData).username);
    // Instead of parsing one by one do the option below.
    // const { username, email, password } = signUpSchema.parse({
    //     username: formData.get("username"),
    //     email: formData.get("email"),
    //     password: formData.get("password"),
    //     confirmPassword: formData.get("confirmPassword"),
    // });
    try {
        const { username, email, password } = signUpSchema.parse(Object.fromEntries(formData));

        const passwordHash = await hash(password);

        const user = await prisma.user.create({
            data: {
                username,
                email,
                passwordHash,
            }
        });
        // Create session in the database
        const session = await lucia.createSession(user.id, {});
        // Create cookie with session information
        const sessionCookie = lucia.createSessionCookie(session.id);

        (await cookies()).set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        )

    } catch (error) {
        return fromErrorToActionState(error, formData);
    }

    redirect(ticketsPath());

}