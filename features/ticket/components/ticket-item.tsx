import Link from "next/link";
import clsx from "clsx";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ticketEditPath, ticketPath } from "@/constants/paths";
import { TICKET_ICONS } from "../constants";
import { Ticket } from "@prisma/client";
import {
    LucideArrowUpRightFromSquare,
    LucideMoreVertical,
    LucidePencil,
    LucideTrash
} from "lucide-react";
import { deleteTicket } from "../actions/delete-ticket";
import { toCurrencyFromCent } from "@/utils/currency";
import { TicketMoreMenu } from "./ticket-more-menu";

type TicketProps = {
    ticket: Ticket;
    isDetail?: boolean;
};

const TicketItem = ({ ticket, isDetail }: TicketProps) => {
    const moreMenu = (
        <TicketMoreMenu
            ticket={ticket}
            trigger={
                <Button variant="outline" size="icon">
                    <LucideMoreVertical className="h-4 w-4" />
                </Button>
            }
        />
    );

    const detailButton = (
        <Button variant="outline" size="icon" asChild>
            <Link prefetch href={ticketPath(ticket.id)}>
                <LucideArrowUpRightFromSquare className="h-4 w-4" />
            </Link>
        </Button>
    );

    const deleteButton = (
        <form action={deleteTicket.bind(null, ticket.id)}>
            <Button variant="outline" size="icon">
                <LucideTrash className="h-4 w-4" />
            </Button>
        </form>
    );

    const editButton = (
        <Button variant="outline" size="icon" asChild>
            <Link prefetch href={ticketEditPath(ticket.id)}>
                <LucidePencil className="h-4 w-4" />
            </Link>
        </Button>
    );

    return (
        <div className={clsx("w-full max-w-md flex-gap-x-1", {
            "max-w-xl": isDetail,
            "max-w-md": !isDetail,
            })}
        >
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="flex gap-x-2">
                        <span>{TICKET_ICONS[ticket.status]}</span>
                        <span className="truncate">{ticket.title}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <span className={clsx("line-clamp-3 whitespace-break-spaces", {
                        "line-clamp-3": !isDetail,
                        })}
                    >
                        {ticket.content}
                    </span>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <p className="text-sm text-muted-foreground">{ticket.deadline}</p>
                    <p className="text-sm text-muted-foreground">
                        {toCurrencyFromCent(ticket.bounty)}
                    </p>
                </CardFooter>
            </Card>
            
            <div className="flex flex-row gap-y-1">
                {isDetail ? (
                    <>
                        {editButton}
                        {deleteButton}
                        {moreMenu}
                    </>
                ) : (
                    <>
                        {detailButton}
                        {editButton}
                    </>
                )}
            </div>
        </div>
    );
};

export { TicketItem };