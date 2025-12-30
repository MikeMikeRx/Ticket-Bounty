import { Ticket } from "@/features/ticket/types";

export const initialTickets: Ticket[] = [
    {
        id: "1",
        title: "Ticket 1",
        content: "This is the first Ticket",
        status: "DONE",
    },
    {
        id: "2",
        title: "Ticket 2",
        content: "This is the second Ticket",
        status: "OPEN",
    },
    {
        id: "3",
        title: "Ticket 3",
        content: "This is the third Ticket",
        status: "IN_PROGRESS",
    },
];