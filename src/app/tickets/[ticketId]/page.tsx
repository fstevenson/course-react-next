import { notFound } from "next/navigation";
import { TicketItem } from "@/features/ticket/components/ticket-item";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import { RedirectToast } from "@/features/ticket/components/redirect-toast";

type TicketPageProps = {
    params: Promise<{
        ticketId: string;
    }>;
};

const TicketPage = async ({ params }: TicketPageProps) => {

    const { ticketId } = await params;
    const ticket = await getTicket(ticketId);

    if (!ticket) {
        notFound();
    }

    return (
        <>
            <div className="flex justify-center animate-fade-from-top">
                <TicketItem ticket={ticket} key={ticket.id} isDetail />
            </div>
            <RedirectToast />
        </>


    );
}
// function below is for learning purposes only, it is not used in the current implementation.
// It is used to generate static paths for the tickets page.

// export async function generateStaticParams() {
//     const tickets = await getTickets();

//     return tickets.map((ticket) => ({
//         ticketId: ticket.id,
//     }));
// }

export default TicketPage;