"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import {
    ActionState,
    fromErrorToActionState,
    toActionState,
} from "@/components/form/utils/to-action-state";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/constants/paths";
import { hashPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { setSessionCookie } from "@/lib/auth/cookies";

const signUpSchema = z
    .object({
        username: z
            .string()
            .min(1)
            .max(191)
            .refine(
                (value) => !value.includes(" "),
                "Username cannot contain spaces"
            ),
        email: z.string().min(1, { message: "Is required" }).max(191).email(),
        password: z.string().min(6).max(191),
        confirmPassword: z.string().min(6).max(191),
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
        if(password !== confirmPassword) {
            ctx.addIssue({
                code: "custom",
                message: "Passwords do not match",
                path: ["confirmPassword"],
            });
        }
    });

    export const signUp = async (_actionState: ActionState, formData: FormData) => {
        try {
            const { username, email, password } = signUpSchema.parse(
                Object.fromEntries(formData)
            );

            const passwordHash = await hashPassword(password);

            const user = await prisma.user.create({
                data: {
                    username,
                    email,
                    passwordHash,
                },
            });

            const session = await createSession(user.id);
            await setSessionCookie(session.id, session.expiresAt);
        } catch(error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2002"
            ) {
                return toActionState(
                    "ERROR",
                    "Either email or username is already in use",
                    formData
                );
            }

            return fromErrorToActionState(error, formData);
        }

        redirect(ticketsPath());
    };