import clsx from "clsx"
import { LucideMoreVertical, LucidePencil, LucideSquareArrowOutUpRight, LucideTrash, Omega } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Ticket } from "@/generated/prisma"
import { ticketEditPath, ticketPath } from "@/paths"
import { deleteTicket } from "../actions/delete-ticket";
import { TICKET_ICONS } from "../constants"
import { toCurrencyFromCents } from "@/utils/currency"
import { TicketMoreMenu } from "./ticket-more-menu"


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

    const moreMenu = <TicketMoreMenu ticket={ticket} trigger={
        <Button size="icon" variant="outline">
            <LucideMoreVertical className="h-4 w-4" />
        </Button>
    } />

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
                <CardFooter className="flex justify-between">
                    <p className="text-sm text-muted-foreground">{ticket.deadline}</p>
                    <p className="text-sm text-muted-foreground">{toCurrencyFromCents(ticket.bounty)}</p>
                </CardFooter>
            </Card>

            <div className="flex flex-col gap-y-1">
                {isDetail ?
                    <>
                        {editButton}
                        {deleteButton}
                        {moreMenu}
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