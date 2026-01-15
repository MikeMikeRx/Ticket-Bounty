"use client";

import { Ticket } from "@prisma/client";
import { SubmitButton } from "@/components/form/submit-button";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { upsertTicket } from "../actions/upsert-ticket";

type TicketUpsertFormProps = {
    ticket?: Ticket;
};

const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
    return (
        <Form action={upsertTicket.bind(null, ticket?.id)}>
            {(actionState) => (
                <>
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        name="title"
                        type="text"
                        defaultValue={
                        (actionState.payload?.get("title") as string) ?? ticket?.title
                        }
                    />
                    <FieldError actionState={actionState} name="title" />

                    <Label htmlFor="content">Content</Label>
                    <Textarea
                        id="content"
                        name="content"
                        defaultValue={
                        (actionState.payload?.get("content") as string) ?? ticket?.content
                        }
                    />
                    <FieldError actionState={actionState} name="content" />

                    <SubmitButton label={ticket ? "Edit" : "Create"} />                
                </>
            )}
        </Form>
    );
};

export { TicketUpsertForm };