"use server";

import { randomBytes } from "crypto";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
    ActionState,
    fromErrorToActionState,
    toActionState,
} from "@/components/form/utils/to-action-state";
import { sendPasswordResetEmail } from "@/lib/email";
import { passwordResetPath } from "@/constants/paths";

const RESET_TOKEN_TTL_MS = 1000 * 60 * 60;

const passwordForgotSchema = z.object({
    email: z.string().min(1, { message: "Is required" }).max(191).email(),
});

export const passwordForgot = async (
    _actionState: ActionState,
    formData: FormData,
) => {
    try {
        const { email } = passwordForgotSchema.parse(
            Object.fromEntries(formData)
        );

        const user = await prisma.user.findUnique({ where: { email } });

        if (user) {
            await prisma.passwordResetToken.deleteMany({
                where: { userId: user.id },
            });

            const token = randomBytes(32).toString("hex");
            const expiresAt = new Date(Date.now() + RESET_TOKEN_TTL_MS);

            await prisma.passwordResetToken.create({
                data: { token, userId: user.id, expiresAt },
            });

            const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}${passwordResetPath(token)}`;
            await sendPasswordResetEmail(email, resetLink);
        }
    } catch (error) {
        return fromErrorToActionState(error, formData);
    }

    return toActionState(
        "SUCCESS",
        "If that email exists, a reset link has been sent"
    );
};
