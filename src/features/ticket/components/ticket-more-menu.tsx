"use client";

import { LucideTrash } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ticket, TicketStatus } from "@/generated/prisma";
import { TICKET_STATUS_LABELS } from "../constants";
import { updateTicketStatus } from "../actions/update-ticket-status";
import { toast } from "sonner";
import { ActionState } from "@/components/form/utils/to-action-state";

type TicketMoreMenuProps = {
    ticket: Ticket;
    trigger: React.ReactElement;
};

const TicketMoreMenu = ({ ticket, trigger }: TicketMoreMenuProps) => {
    const deleteButton = (
        <DropdownMenuItem>
            <LucideTrash className="h-4 w-4" />
            <span>Delete</span>
        </DropdownMenuItem>
    );

    const handleUpdateTicketStatus = async (value: string) => {
        const promise = updateTicketStatus(ticket.id, value as TicketStatus);
        toast.promise(promise, {
            loading: 'Updating status...'
        });

        const result = await promise;

        if (result.status === 'ERROR') {
            toast.error(result.message);
        } else if (result.status === 'SUCCESS') {
            toast.success(result.message);
        }
    }

    const ticketStatusRadioGroupItems = (
        <DropdownMenuRadioGroup value={ticket.status} onValueChange={handleUpdateTicketStatus}>
            {(Object.keys(TICKET_STATUS_LABELS) as Array<TicketStatus>).map(key => (
                <DropdownMenuRadioItem value={key} key={key}>
                    {TICKET_STATUS_LABELS[key]}
                </DropdownMenuRadioItem>
            ))}
        </DropdownMenuRadioGroup>
    )

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" side="right">
                {ticketStatusRadioGroupItems}
                <DropdownMenuSeparator />
                {deleteButton}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export { TicketMoreMenu };