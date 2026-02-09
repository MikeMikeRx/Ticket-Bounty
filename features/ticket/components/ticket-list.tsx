import { TicketItem } from "./ticket-item";
import { getTickets } from "../queries/get-tickets";
import { SearchInput } from "@/components/search-input";

type TicketListProps = {
    userId?: string;
};

const TicketList = async ({ userId }: TicketListProps) => {
    const tickets = await getTickets(userId);

    return (
        <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
            <div className="w-full max-w-110">
                <SearchInput placeholder="Search tickets" />
            </div>

            {tickets.map((ticket) => (
                <TicketItem key={ticket.id} ticket={ticket}/>
            ))}
        </div>
    );
};

export { TicketList };