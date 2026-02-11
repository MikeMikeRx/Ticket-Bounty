"use server";

import { cache } from "react";
import { getSessionCookie, deleteSessionCookie } from "@/lib/auth/cookies";
import { validateSession } from "@/lib/auth/session";

export const getAuth = cache(async () => {
    const sessionId = await getSessionCookie();

    if (!sessionId) {
        return { user: null, session: null };
    }

    const result = await validateSession(sessionId);

    if (!result) {
        try {
            await deleteSessionCookie();
        } catch {}
    
        return { user: null, session: null };
    }

    return { user: result.user, session: result };
});
