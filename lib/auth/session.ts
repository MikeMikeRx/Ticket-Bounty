import { randomBytes } from "crypto";
import { prisma } from "../prisma";

const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30;

export function generateSessionId(): string {
    return randomBytes(32).toString("hex");
}

export async function createSession(userId: string) {
    const id = generateSessionId();
    const expiresAt = new Date(Date.now() + SESSION_TTL_MS);

    await prisma.session.create({
        data: {
            id,
            userId,
            expiresAt,
        },
    });

    return { id, expiresAt };
}

export async function validateSession(sessionId: string) {
    const session = await prisma.session.findUnique({
        where: { id: sessionId },
        include: { user: true },
    });

    if (!session) return null;
    if (session.expiresAt < new Date()) {
        await prisma.session.delete({ where: { id: sessionId } });
        return null;
    }

    return session;
}

export async function deleteSession(sessionId: string) {
    await prisma.session.delete({ where: { id: sessionId } });
}