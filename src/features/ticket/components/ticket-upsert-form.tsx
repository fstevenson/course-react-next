
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Ticket } from "@/generated/prisma/client";
import { upsertTicket } from "@/features/ticket/actions/upsert-ticket";
import { SubmitButton } from "@/components/form/submit-button";
import { useActionState } from "react";
import { FieldError } from "@/components/form/field-error";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";


type TicketUpsertFormProps = {
    ticket?: Ticket
}

const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
    const [actionState, action] = useActionState(upsertTicket.bind(null, ticket?.id), EMPTY_ACTION_STATE);

    return (
        <form
            action={action}
            className="flex flex-col gap-y-2"
        >
            <Label htmlFor="title">Title</Label>
            <Input type="text" id="title" name="title" defaultValue={
                (actionState.payload?.get('title') as string) ?? ticket?.title} />
            <FieldError
                actionState={actionState}
                name="title" />

            <Label htmlFor="content">Content</Label>
            <Textarea id="content" name="content" defaultValue={
                (actionState.payload?.get('content') as string) ?? ticket?.content} />
            <FieldError
                actionState={actionState}
                name="content" />

            <SubmitButton label={ticket ? "Edit" : "Create"} />
        </form>
    );
}

export { TicketUpsertForm }