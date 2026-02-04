import { User } from "@prisma/client";

type Entity = {
    userId: string | null;
};

export const isOwner = (
    user: User | null | undefined,
    entity: Entity | null | undefined
) => {
    if(!user || !entity) {
        return false;
    }

    if(!entity.userId) {
        return false;
    }

    return entity.userId === user.id;
};