import { Placeholder } from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { initialTickets } from "@/data";
import { TicketItem } from "@/features/ticket/components/ticket-item";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import { ticketsPath } from "@/paths";
import Link from "next/link";

type TicketPageProps = {
    params: {
        ticketId: string;
    };
}

const TicketPage = async ({ params }: TicketPageProps) => {

    const ticket = await getTicket(params.ticketId);

    if (!ticket) {
        return (
            <div className="flex-1 flex">
                <Placeholder
                    label="Ticket not found"
                    button={
                        <Button asChild variant="outline">
                            <Link href={ticketsPath()}>Go to Tickets</Link>
                        </Button>
                    } />
            </div>

        );
    }

    return (
        <div className="flex justify-center animate-fade-from-top">
            <TicketItem ticket={ticket} key={ticket.id} isDetail />
        </div>

    );
}

export default TicketPage;