"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
    ActionState,
    fromErrorToActionState,
    toActionState,
} from "@/components/form/utils/to-action-state";
import { hashPassword } from "@/lib/auth/password";
import { signInPath } from "@/constants/paths";

const passwordResetSchema = z
    .object({
        token: z.string().min(1),
        newPassword: z.string().min(6).max(191),
        confirmNewPassword: z.string().min(6).max(191),
    })
    .superRefine(({ newPassword, confirmNewPassword }, ctx) => {
        if (newPassword !== confirmNewPassword) {
            ctx.addIssue({
                code: "custom",
                message: "Passwords do not match",
                path: ["confirmNewPassword"],
            });
        }
    });

export const passwordReset = async (
    _actionState: ActionState,
    formData: FormData,
) => {
    try {
        const { token, newPassword } = passwordResetSchema.parse(
            Object.fromEntries(formData)
        );

        const resetToken = await prisma.passwordResetToken.findUnique({
            where: { token },
        });

        if (!resetToken || resetToken.expiresAt < new Date()) {
            return toActionState("ERROR", "Invalid or expired reset link", formData);
        }

        const passwordHash = await hashPassword(newPassword);

        await prisma.user.update({
            where: { id: resetToken.userId },
            data: { passwordHash },
        });

        await prisma.passwordResetToken.delete({ where: { token } });
    } catch (error) {
        return fromErrorToActionState(error, formData);
    }

    redirect(signInPath());
};
