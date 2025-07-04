
"use client";

import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Ticket } from "@/generated/prisma/client";
import { upsertTicket } from "@/features/ticket/actions/upsert-ticket";
import { SubmitButton } from "@/components/form/submit-button";
import { useActionState, useEffect, useRef } from "react";
import { FieldError } from "@/components/form/field-error";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Form } from "@/components/form/form";
import { fromCent } from "@/utils/currency";
import { DatePicker, ImperativeHandleFromDatePicker } from "@/components/date-picker";


type TicketUpsertFormProps = {
    ticket?: Ticket
}

const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
    const [actionState, action] = useActionState(upsertTicket.bind(null, ticket?.id), EMPTY_ACTION_STATE);

    const datePickerImperativeHandleRef = useRef<ImperativeHandleFromDatePicker>(null!) as React.RefObject<ImperativeHandleFromDatePicker>;

    const handleSuccess = () => {
        datePickerImperativeHandleRef.current?.reset();
    }

    return (
        <Form
            action={action}
            actionState={actionState}
            onSuccess={handleSuccess}
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
            <div className="flex gap-x-2 mb-1">
                <div className="w-1/2">
                    <Label htmlFor="deadline">Deadline</Label>

                    <DatePicker
                        //key={actionState.timestamp}
                        id="deadline"
                        name="deadline"
                        defaultValue={
                            (actionState.payload?.get('deadline') as string) ?? ticket?.deadline
                        }
                        imperativeHandleRef={datePickerImperativeHandleRef}
                    />
                    <FieldError
                        actionState={actionState}
                        name="deadline" />
                </div>
                <div className="w-1/2">
                    <Label htmlFor="bounty">Bounty ($)</Label>
                    <Input type="number" step="0.01" id="bounty" name="bounty" defaultValue={
                        (actionState.payload?.get('bounty') as string) ?? (ticket?.bounty ? fromCent(ticket?.bounty) : "")} />
                    <FieldError
                        actionState={actionState}
                        name="bounty" />
                </div>


            </div>


            <SubmitButton label={ticket ? "Edit" : "Create"} />
        </Form>
    );
}

export { TicketUpsertForm }