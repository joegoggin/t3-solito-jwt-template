import { PrismaClient } from "@prisma/client";

export type PrivateCTX = {
    prisma: PrismaClient<any, never, any>;
    token: string;
};

export type PublicCTX = {
    prisma: PrismaClient<any, never, any>;
};
