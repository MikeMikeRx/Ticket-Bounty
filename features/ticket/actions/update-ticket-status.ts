"use server";

import { TicketStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import {
    fromErrorToActionState,
    toActionState,
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/constants/paths";

export const updateTicketStatus = async (id: string, status: TicketStatus) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
        await prisma.ticket.update({
            where: {
                id,
            },
            data: {
                status,
            },
        });
    } catch (error) {
        return fromErrorToActionState(error);
    }

    revalidatePath(ticketsPath());

    return toActionState("SUCCESS", "Status updated");
};