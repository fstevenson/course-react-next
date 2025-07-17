// "use server"

// import { hash } from "@node-rs/argon2";
// import { redirect } from "next/navigation";
// import { z } from "zod";
// import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
// import { signUp } from "@/lib/auth";
// import { prisma, prismaClientKnownRequestError } from "@/lib/prisma";
// import { ticketsPath } from "@/paths";

// const signUpSchema = z.object({
//     username: z
//         .string()
//         .min(1)
//         .max(191)
//         .refine((value) => !value.includes(" "), "User cannot contain spaces"),
//     email: z.string().min(1, { message: "Is required" }).max(191).email(),
//     password: z.string().min(6).max(191),
//     confirmPassword: z.string().min(6).max(191),
// })
//     .superRefine(({ password, confirmPassword }, ctx) => {
//         if (password !== confirmPassword) {
//             ctx.addIssue({
//                 code: "custom",
//                 message: "Passwords do not match",
//                 path: ["confirmPassword"]
//             })
//         }
//     });


// export const signUpAction = async (_actionState: ActionState, formData: FormData) => {
//     // console.log(Object.fromEntries(formData).username);
//     // Instead of parsing one by one do the option below.
//     // const { username, email, password } = signUpSchema.parse({
//     //     username: formData.get("username"),
//     //     email: formData.get("email"),
//     //     password: formData.get("password"),
//     //     confirmPassword: formData.get("confirmPassword"),
//     // });
//     try {
//         const { username, email, password } = signUpSchema.parse(Object.fromEntries(formData));

//         const passwordHash = await hash(password);

//         await prisma.user.create({
//             data: {
//                 email,
//                 passwordHash,
//             }
//         });

//         await signUp("keycloak");
//     } catch (error) {
//         if (
//             error instanceof prismaClientKnownRequestError &&
//             error.code === 'P2002'
//         ) {
//             return toActionState("ERROR", "Either email or username is already in use", formData);
//         }

//         return fromErrorToActionState(error, formData);
//     }

//     redirect(ticketsPath());

// }