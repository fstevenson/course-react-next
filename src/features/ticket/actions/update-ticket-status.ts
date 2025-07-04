"use server";

import { prisma } from "@/lib/prisma";
import { TicketStatus } from "@/generated/prisma";
import { revalidatePath } from "next/cache";
import { getTicket } from "../queries/get-ticket";
import { ticketPath, ticketsPath } from "@/paths";
import { fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { error } from "console";

export const updateTicketStatus = async (id: string, status: TicketStatus) => {
    try {
        await prisma.ticket.update({
            where: {
                id,
            },
            data: {
                status,
            }
        });


    } catch (err) {
        return fromErrorToActionState(error);
    }
    revalidatePath(ticketsPath());
    return toActionState("SUCCESS", "Status Updated");
}