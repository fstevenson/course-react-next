import { CardCompact } from "@/components/card-compact";
import { TicketUpdateForm } from "@/components/ticket-update-form";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import { notFound } from "next/navigation";

type TicketEditPageProps = {
    params: {
        ticketId: string;
    };
};

const TicketEditPage = async ({ params }: TicketEditPageProps) => {
    const ticket = await getTicket((await params).ticketId);

    if (!ticket) {
        notFound();
    }

    return (
        <div className="flex-1 flex flex-col justify-center items-center">
            <CardCompact
                title="Edit Ticket"
                description="Edit your ticket details"
                className="w-full max-w-[420px] animate-fade-from-top"
                content={<TicketUpdateForm ticket={ticket} />} />
        </div>
    );
}

export default TicketEditPage;