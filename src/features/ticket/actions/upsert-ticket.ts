"use server";

import { setCookieByKey } from "@/actions/cookies";
import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { ticketPath, ticketsPath } from "@/paths";
import { toCent } from "@/utils/currency";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const upsertTicketSchema = z.object({
    title: z.string().min(1, "Title is required").max(191, "Title must be less than 255 characters"),
    content: z.string().min(1, "Content is required").max(1024, "Content must be less than 1024 characters"),
    deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Deadline must be in YYYY-MM-DD format"),
    bounty: z.coerce.number().positive(),
});

export const upsertTicket = async (
    id: string | undefined,
    _actionState: ActionState,
    formData: FormData) => {
    try {
        const data = upsertTicketSchema.parse({
            title: formData.get("title"),
            content: formData.get("content"),
            bounty: formData.get("bounty"),
            deadline: formData.get("deadline"),
        });
        const dbData = {
            ...data,
            bounty: toCent(data.bounty),
        }
        await prisma.ticket.upsert({
            where: {
                id: id || "",
            },
            update: dbData,
            create: dbData
        });
    } catch (error) {
        return fromErrorToActionState(error, formData);

    }


    revalidatePath(ticketsPath());

    if (id) {
        await setCookieByKey("toast", "Ticket updated");
        redirect(ticketPath(id));
    }

    return toActionState("SUCCESS", "Ticket created")

}