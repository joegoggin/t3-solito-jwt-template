import { PrismaClient } from "@prisma/client";

export type PrivateCTX = {
    prisma: PrismaClient<any, never, any>;
    token: string | undefined;
};

export type PublicCTX = {
    prisma: PrismaClient<any, never, any>;
};
