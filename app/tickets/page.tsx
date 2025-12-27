import Link from "next/link";
import { initialTickets } from "@/data/data";
import { ticketPath } from "@/constants/paths";

const TICKET_ICONS = {
    OPEN: "O",
    IN_PROGRESS: ">",
    DONE: "X",
} as const;

const TicketPage = () => {
    return (
        <div>
            {initialTickets.map((ticket) => (
                <div key={ticket.id}>
                    <div>{TICKET_ICONS[ticket.status as keyof typeof TICKET_ICONS]}</div>
                    <h2 className="text-lg">{ticket.title}</h2>

                    <Link href={ticketPath(ticket.id)} className="text-sm underline">
                        View
                    </Link> 
                </div>
            ))}
        </div>
    );
};

export default TicketPage;