"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { ticketPath, ticketsPath } from "@/constants/paths";

const upsertTicketSchema = z.object({
    title: z.string().min(1).max(191),
    content: z.string().min(1).max(1024),
});

export const upsertTicket = async (
    id: string | undefined,
    _actionState: { message: string },
    formData: FormData
) => {
    try {
        const data = upsertTicketSchema.parse({
            title: formData.get("title"),
            content: formData.get("content"),
        });

        await prisma.ticket.upsert({
            where: { id: id || "" },
            update: data,
            create: data,
        });
    } catch(error) {
        return { message: "Something went wrong" };
    }

    revalidatePath(ticketsPath());

    if (id) {
        redirect(ticketPath(id));
    }

    return { message: "Ticket created" };
};