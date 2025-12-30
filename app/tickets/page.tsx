import { LucideFileText, LucideCheckCircle, LucidePencil } from "lucide-react";
import Link from "next/link";
import { Heading } from "@/components/heading";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter
} from "@/components/ui/card";
import { initialTickets } from "@/data/data";
import { ticketPath } from "@/constants/paths";

const TICKET_ICONS = {
    OPEN: <LucideFileText />,
    DONE: <LucideCheckCircle />,
    IN_PROGRESS: <LucidePencil />,
};

const TicketPage = () => {
    return (
        <div className="flex-1 flex flex-col gap-y-8">
            <Heading title="Tickets" description="All your tickets at one place" />
            
            <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
                {initialTickets.map((ticket) => (
                    <Card key={ticket.id} className="w-full max-w-md">
                        <CardHeader>
                            <CardTitle className="flex gap-x-2">
                                <span>{TICKET_ICONS[ticket.status as keyof typeof TICKET_ICONS]}</span>
                                <span>{ticket.title}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <span className="line-clamp-3 whitespace-break-spaces">
                                {ticket.content}
                            </span>
                        </CardContent>
                        <CardFooter>
                            <Link href={ticketPath(ticket.id)} className="text-sm underline">
                                View
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default TicketPage;