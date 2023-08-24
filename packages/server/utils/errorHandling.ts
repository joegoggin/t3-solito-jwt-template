import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";

import { capitalize } from "app/utils/capitalize";

export const handlePrismaUniqueError = (
    error: any,
    key: string,
    value: string | undefined | null,
    model: string
) => {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
            const errorKey = error.message.split("`")[3];

            if (errorKey === key) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: `${model} with ${key} of "${value}" already exists. \n ${capitalize(
                        key
                    )} must be unique.`,
                });
            }
        }
    }
};

export const handlePrismaNotFoundError = (error: any, model: string) => {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: `${model} not found.`,
            });
        }
    }
};
