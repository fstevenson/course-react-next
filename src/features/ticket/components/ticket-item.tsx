import clsx from "clsx"
import { LucidePencil, LucideSquareArrowOutUpRight, LucideTrash, Omega } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Ticket } from "@/generated/prisma"
import { ticketEditPath, ticketPath } from "@/paths"
import { deleteTicket } from "../actions/delete-ticket";
import { TICKET_ICONS } from "../constants"


type TicketItemProps = {
    ticket: Ticket; /* | Awaited<ReturnType<typeof getTickets>>[number] | Awaited<ReturnType<typeof getTicket>>; */
    isDetail?: boolean;
}

const TicketItem = ({ ticket, isDetail }: TicketItemProps) => {
    const detailButton = (
        <Button size="icon" variant="outline" asChild>
            <Link prefetch href={ticketPath(ticket.id)}>
                <LucideSquareArrowOutUpRight className="h-4 w-4" />
            </Link>
        </Button>
    );

    const editButton = (
        <Button size="icon" variant="outline">
            <Link prefetch href={ticketEditPath(ticket.id)}>
                <LucidePencil className="h-4 w-4" />
            </Link>
        </Button>
    )

    const deleteButton = (
        <form action={deleteTicket.bind(null, ticket.id)}>
            <Button size="icon" variant="outline">
                <LucideTrash className="h-4 w-4" />
            </Button>
        </form>

    )

    return (
        <div className={clsx("w-full flex gap-x-1", {
            "max-w-[580px]": isDetail,
            "max-w-[420px]": !isDetail,
        })} >
            <Card key={ticket.id} className="w-full">
                <CardHeader>
                    <CardTitle className="flex gap-x-2">
                        <span>{TICKET_ICONS[ticket.status]}</span>
                        <span className="truncate">{ticket.title}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <span className={clsx("whitespace-break-spaces", {
                        "line-clamp-3": !isDetail,
                    })}>
                        {ticket.content}
                    </span>
                </CardContent>
            </Card>

            <div className="flex flex-col gap-y-1">
                {isDetail ?
                    <>
                        {editButton}
                        {deleteButton}
                    </> :
                    <>
                        {detailButton}
                        {editButton}
                    </>}
            </div>


        </div >

    )
}

export { TicketItem }