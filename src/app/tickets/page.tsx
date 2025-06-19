
import { Heading } from "@/components/heading";
import { Suspense } from "react";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { Spinner } from "@/features/ticket/components/spinner";

const TicketsPage = () => {
    return (
        <div className="flex-1 flex flex-col gap-y-8">
            <Heading title="Tickets Page" description="All your tickets at one place" />
            <Suspense fallback={<Spinner />}>
                <TicketList />
            </Suspense>
        </div >
    );
}

export default TicketsPage;