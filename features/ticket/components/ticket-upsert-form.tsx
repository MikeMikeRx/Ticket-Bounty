"use client";

import { Ticket } from "@prisma/client";
import { SubmitButton } from "@/components/form/submit-button";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { upsertTicket } from "../actions/upsert-ticket";
import { fromCent } from "@/utils/currency";

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

                    <div className="flex gap-x-2 mb-1">
                        <div className="w-1/2">
                            <Label htmlFor="deadline">Deadline</Label>
                            <Input
                                id="deadline"
                                name="deadline"
                                type="date"
                                defaultValue={
                                    (actionState.payload?.get("deadline") as string) ??
                                    ticket?.deadline?.split("T")[0]
                                }
                            />
                            <FieldError actionState={actionState} name="deadline" />
                        </div>
                        <div className="w-1/2">
                            <Label htmlFor="bounty">Bounty ($)</Label>
                            <Input
                                id="bounty"
                                name="bounty"
                                type="number"
                                step="0.01"
                                defaultValue={
                                    (actionState.payload?.get("bounty") as string) ??
                                    (ticket?.bounty ? fromCent(ticket.bounty) : "")
                                }
                            />
                            <FieldError actionState={actionState} name="bounty" />
                        </div>
                    </div>

                    <SubmitButton label={ticket ? "Edit" : "Create"} />                
                </>
            )}
        </Form>
    );
};

export { TicketUpsertForm };