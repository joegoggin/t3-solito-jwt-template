import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { ZodError } from "zod";
import { initTRPC } from "@trpc/server";
import { PrismaClient } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import * as devalue from "devalue";

import prisma from "db";
import { JWT_SECRET } from "../env";
import { InvalidTokenError } from "../types/errors/invalidToken";

type CreateContextOptions = {
    prisma?: PrismaClient;
    token?: string;
};

export const createInnerTRPContext = (opts?: CreateContextOptions) => {
    return {
        prisma: opts?.prisma ? opts.prisma : prisma,
        token: opts?.token,
    };
};

export const createTRPCContext = (opts: CreateNextContextOptions) => {
    const { req } = opts;

    const token: string | undefined = req.headers.authorization?.split(" ")[1];

    return createInnerTRPContext({
        token,
        prisma,
    });
};

export const t = initTRPC.context<typeof createTRPCContext>().create({
    transformer: {
        serialize: (object) => devalue.uneval(object),
        deserialize: (object) => eval(`(${object})`),
    },
    errorFormatter({ shape, error }) {
        let newShape = { ...shape };

        if (error.cause instanceof ZodError) {
            if (error.cause.issues[0]?.message) {
                const message = error.cause.issues[0]?.message;

                newShape.message = message;
            }
        }

        return { ...newShape };
    },
});

const isAuth = t.middleware(({ ctx, next }) => {
    const { token } = ctx;

    if (!token) {
        throw new InvalidTokenError();
    } else {
        try {
            jwt.verify(token, JWT_SECRET);
        } catch {
            throw new InvalidTokenError();
        }
    }

    return next();
});

export const createTRPCRouter = t.router;

export const privateProcedure = t.procedure.use(isAuth);

export const publicProcedure = t.procedure;
