"use server";

import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
    ActionState,
    fromErrorToActionState,
    toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { revalidatePath } from "next/cache";
import { accountProfilePath } from "@/constants/paths";

const updateProfileSchema = z.object({
    username: z
        .string()
        .max(191)
        .refine(
            (value) => !value || !value.includes(" "),
            "Username cannot contain spaces"
        ),
    email: z.union([z.literal(""), z.email().max(191)]),
});

export const updateProfile = async (
    _actionState: ActionState,
    formData: FormData,
) => {
    const { user } = await getAuthOrRedirect();

    try {
        const { username, email } = updateProfileSchema.parse(
            Object.fromEntries(formData)
        );

        const data: { username?: string; email?: string } = {};
        if (username) data.username = username;
        if (email) data.email = email;

        if (Object.keys(data).length === 0) {
            return toActionState("ERROR", "No changes to save", formData);
        }

        await prisma.user.update({
            where: { id: user.id },
            data,
        });
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002"
        ) {
            return toActionState(
                "ERROR",
                "Email or username is already in use",
                formData
            );
        }

        return fromErrorToActionState(error, formData);
    }

    revalidatePath(accountProfilePath());

    return toActionState("SUCCESS", "Profile updated", formData);
};
