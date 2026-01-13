import { Suspense } from "react";
import { Heading } from "@/components/heading";
import { Spinner } from "@/components/spinner";
import { CardCompact } from "@/components/card-compact";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { TicketCreateForm } from "@/features/ticket/components/ticket-create-form";

export const runtime = "nodejs";

const TicketsPage = () => {
    return (
        <div className="flex-1 flex flex-col gap-y-8">
            <Heading title="Tickets" description="All your tickets at one place" />

            <CardCompact
                title="Create Ticket"
                description="A new ticket will be created"
                className="w-full max-w-105 self-center"
                content={<TicketCreateForm />}
            />
            
            <Suspense fallback={<Spinner/>}>
                <TicketList />
            </Suspense>
        </div>
    );
};

export default TicketsPage;