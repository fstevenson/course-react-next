
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Heading } from "@/components/heading";
import { Placeholder } from "@/components/placeholder";
import { Spinner } from "@/components/spinner";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { TicketCreateForm } from "@/features/ticket/components/ticket-create-form";
import { CardCompact } from "@/components/card-compact";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";

// export const dynamic = "force-dynamic"; // Force dynamic rendering to avoid stale data issues
// export const revalidate = 30; // revalidate to fetch fresh data

const TicketsPage = () => {
    return (
        <div className="flex-1 flex flex-col gap-y-8">
            <Heading title="Tickets Page" description="All your tickets at one place" />
            <CardCompact
                title="Create Ticket"
                description="Create a new ticket to get help"
                className="w-full max-w-[420px] self-center"
                content={<TicketUpsertForm />} />
            <ErrorBoundary fallback={<Placeholder label="Something went wrong while loading tickets" />}>
                <Suspense fallback={<Spinner />}>
                    <TicketList />
                </Suspense>
            </ErrorBoundary>
        </div >
    );
}

export default TicketsPage;