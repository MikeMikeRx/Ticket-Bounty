"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
    ActionState,
    fromErrorToActionState,
    toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { hashPassword, verifyPassword } from "@/lib/auth/password";

const updatePasswordSchema = z
    .object({
        currentPassword: z.string().min(1, { message: "Is required" }),
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

export const updatePassword = async (
    _actionState: ActionState,
    formData: FormData,
) => {
    const { user } = await getAuthOrRedirect();

    try {
        const { currentPassword, newPassword } = updatePasswordSchema.parse(
            Object.fromEntries(formData)
        );

        const dbUser = await prisma.user.findUniqueOrThrow({
            where: { id: user.id },
        });

        const isValid = await verifyPassword(dbUser.passwordHash, currentPassword);

        if (!isValid) {
            return toActionState("ERROR", "Incorrect current password", formData);
        }

        const passwordHash = await hashPassword(newPassword);

        await prisma.user.update({
            where: { id: user.id },
            data: { passwordHash },
        });
    } catch (error) {
        return fromErrorToActionState(error, formData);
    }

    return toActionState("SUCCESS", "Password updated");
};
