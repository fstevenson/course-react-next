import { prisma } from "@/lib/prisma";

// no need to surround the function with cache() as it is not being used/called/rendered in multiple places yet.

export const getTicket = async (id: string) => {
    return await prisma.ticket.findUnique({
        where: {
            id,
        },
    });
}