import { prisma } from "@/lib/prisma";
import { TicketItem } from "./ticket-item";

const TicketList = async () => {
    const tickets = await prisma.ticket.findMany();

    return (
        <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
            {tickets.map((ticket) => (
                <TicketItem key={ticket.id} ticket={ticket}/>
            ))}
        </div>
    );
};

export { TicketList };