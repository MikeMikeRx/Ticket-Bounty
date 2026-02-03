"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { signInPath, ticketPath, ticketsPath } from "@/constants/paths";
import {
    ActionState,
    fromErrorToActionState,
    toActionState,
} from "@/components/form/utils/to-action-state";
import { setCookieByKey } from "@/actions/cookies";
import { toCent } from "@/utils/currency";
import { getAuth } from "@/features/auth/queries/get-auth";

const upsertTicketSchema = z.object({
    title: z.string().min(1).max(191),
    content: z.string().min(1).max(1024),
    deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Is required"),
    bounty: z.coerce.number().positive(),
});

export const upsertTicket = async (
    id: string | undefined,
    _actionState: ActionState,
    formData: FormData
) => {
    const { user } = await getAuth();

    if (!user) {
        redirect(signInPath());
    }

    try {
        const data = upsertTicketSchema.parse({
            title: formData.get("title"),
            content: formData.get("content"),
            deadline: formData.get("deadline"),
            bounty: formData.get("bounty"),
        });

        const dbData = {
            title: data.title,
            content: data.content,
            deadline: data.deadline,
            bounty: toCent(data.bounty),
        };

        if (id) {
            await prisma.ticket.update({
                where: { id },
                data: dbData,
            });
        } else {
            await prisma.ticket.create({
                data: {
                    ...dbData,
                    userId: user.id,
                },
            });
        }
    } catch(error) {
        return fromErrorToActionState(error, formData);
    }

    revalidatePath(ticketsPath());

    if (id) {
        await setCookieByKey("toast", "Ticket updated");
        redirect(ticketPath(id));
    }

    return toActionState("SUCCESS", "Ticket created" );
};