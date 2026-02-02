"use server";

import { redirect } from "next/navigation";
import { signInPath } from "@/constants/paths";
import { getAuth } from "../queries/get-auth";
import { deleteSession } from "@/lib/auth/session";
import { deleteSessionCookie } from "@/lib/auth/cookies";

export const signOut = async () => {
    const { session } = await getAuth();

    if (!session) {
        redirect(signInPath());
    }

    await deleteSession(session.id);
    await deleteSessionCookie();

    redirect(signInPath());
};
