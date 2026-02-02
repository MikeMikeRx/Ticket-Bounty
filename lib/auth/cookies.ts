import { cookies } from "next/headers";

const SESSION_COOKIE = "session";

export async function setSessionCookie(
    sessionId: string,
    expiresAt: Date,
) {
    (await cookies()).set(SESSION_COOKIE, sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: expiresAt,
    });
}

export async function getSessionCookie() {
    return (await cookies()).get(SESSION_COOKIE)?.value ?? null;
}

export async function deleteSessionCookie() {
    (await cookies()).delete(SESSION_COOKIE);
}
