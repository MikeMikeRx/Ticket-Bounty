"use server";

import { verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { setSessionCookie } from "@/lib/auth/cookies";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
    ActionState,
    fromErrorToActionState,
    toActionState,
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/constants/paths";

const signInSchema = z.object({
    email: z.string().min(1, { message: "Is required" }).max(191).email(),
    password: z.string().min(6).max(191),
});

export const signIn = async (_actionState: ActionState, formData: FormData) => {
    try {
        const { email, password } = signInSchema.parse(
            Object.fromEntries(formData)
        );

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return toActionState("ERROR", "Incorect email or password", formData);
        }

        const validPassword = await verifyPassword(user.passwordHash, password);
        if(!validPassword) {
            return toActionState("ERROR", "Incorrect email or password", formData);
        }

        const session = await createSession(user.id);
        await setSessionCookie(session.id, session.expiresAt);
    } catch (error) {
        return fromErrorToActionState(error, formData);
    }

    redirect(ticketsPath());
};