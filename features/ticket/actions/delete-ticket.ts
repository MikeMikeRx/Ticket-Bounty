"use server"

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/constants/paths";
import { setCookieByKey } from "@/actions/cookies";

export const deleteTicket = async (id:string) => {
    await prisma.ticket.delete({
        where: {
            id,
        },
    });

    revalidatePath(ticketsPath());
    await setCookieByKey("toast", "Ticket deleted");
    redirect(ticketsPath());
};