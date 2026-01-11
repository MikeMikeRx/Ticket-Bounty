import { TicketStatus } from "@prisma/client";
import { LucideCheckCircle, LucideFileText, LucidePencil } from "lucide-react";

export const TICKET_ICONS: Record<TicketStatus, React.ReactNode> = {
    OPEN: <LucideFileText />,
    DONE: <LucideCheckCircle />,
    IN_PROGRESS: <LucidePencil />,
};