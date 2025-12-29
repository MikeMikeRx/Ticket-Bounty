import Link from "next/link";
import { initialTickets } from "@/data/data";
import { ticketPath } from "@/constants/paths";
import clsx from "clsx";

const TICKET_ICONS = {
    OPEN: "O",
    IN_PROGRESS: ">",
    DONE: "X",
} as const;

const TicketPage = () => {
    return (
        <div className="flex-1 flex flex-col gap-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Tickets</h2>
                <p className="text-sm text-muted-foreground">
                    All your tickets at one place
                </p>
            </div>
            
            <div className="flex-1 flex flex-col items-center gap-y-4">
                {initialTickets.map((ticket) => (
                    <div
                    key={ticket.id}
                    className="w-full max-w-md p-4 border border-slate-100 rounded"
                    >
                        <div>{TICKET_ICONS[ticket.status as keyof typeof TICKET_ICONS]}</div>
                        <h3 className="text-lg font-semibold truncate">{ticket.title}</h3>
                        <p
                            className={clsx("text-sm text-slate-500 truncate", {
                                "line-through": ticket.status === "DONE"
                            })}
                            >
                                {ticket.content}
                        </p>               
                        <Link href={ticketPath(ticket.id)} className="text-sm underline">
                            View
                        </Link> 
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TicketPage;