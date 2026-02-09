import { Suspense } from "react";
import { Heading } from "@/components/heading";
import { Spinner } from "@/components/spinner";
import { CardCompact } from "@/components/card-compact";
import { getAuth } from "@/features/auth/queries/get-auth";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";
import { SearchParams } from "nuqs/server"; 
import { searchParamsCache } from "@/features/ticket/search-params";

type TicketPageProps = {
    searchParams: SearchParams;
};

export const runtime = "nodejs";

const TicketsPage = async({ searchParams}: TicketPageProps) => {
    const { user } = await getAuth();

    return (
        <div className="flex-1 flex flex-col gap-y-8">
            <Heading title="My Tickets" description="All your tickets at one place" />

            <CardCompact
                title="Create Ticket"
                description="A new ticket will be created"
                className="w-full max-w-105 self-center"
                content={<TicketUpsertForm />}
            />
            
            <Suspense fallback={<Spinner/>}>
                <TicketList userId={user?.id} searchParams={searchParamsCache.parse(await searchParams)} />
            </Suspense>
        </div>
    );
};

export default TicketsPage;