'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { setCookieByKey } from "@/actions/cookies";
import { fromErrorToActionState } from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

export const deleteTicket = async (id: string) => {
    try {
        await prisma.ticket.delete({
            where: {
                id,
            },
        });
    } catch (err) {
        return fromErrorToActionState(err);
    }


    revalidatePath(ticketsPath());
    await setCookieByKey("toast", "Ticket deleted");
    redirect(ticketsPath());
}