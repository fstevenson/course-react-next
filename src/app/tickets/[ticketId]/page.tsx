import { Placeholder } from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { initialTickets } from "@/data";
import { ticketsPath } from "@/paths";
import Link from "next/link";

type TicketPageProps = {
    params: Promise<{
        ticketId: string;
    }>;
}

const TicketPage = async ({ params }: TicketPageProps) => {
    const { ticketId } = await params;

    const ticket = initialTickets.find((ticket) => ticket.id === ticketId);

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
        <div>
            <h2 className="text-lg">{ticket.title}</h2>
            <p>{ticket.content}</p>
        </div>
    );
}

export default TicketPage;