"use server";

import { prisma } from "@/lib/prisma";
import { ticketPath, ticketsPath } from "@/paths";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const upsertTicketSchema = z.object({
    title: z.string().min(1, "Title is required").max(191, "Title must be less than 255 characters"),
    content: z.string().min(1, "Content is required").max(1024, "Content must be less than 1024 characters"),
});

export const upsertTicket = async (
    id: string | undefined,
    _actionState: { message: string, payload?: FormData },
    formData: FormData) => {
    try {
        const data = upsertTicketSchema.parse({
            title: formData.get("title"),
            content: formData.get("content"),
        });

        await prisma.ticket.upsert({
            where: {
                id: id || "",
            },
            update: data,
            create: data
        });
    } catch (error) {
        return {
            message: "Something went wrong. Please try again.",
            payload: formData
        };
    }


    revalidatePath(ticketsPath());

    if (id) {
        redirect(ticketPath(id));
    }

    return { message: "Ticket created successfully" }

}