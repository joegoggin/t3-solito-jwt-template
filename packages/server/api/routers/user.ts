import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";
import { UserSchema } from "server/models/schemas/User";
import { handleCreateUser, handleGetUser } from "../controllers/user";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const userRouter = createTRPCRouter({
    createUser: publicProcedure
        .input(UserSchema)
        .mutation(async ({ ctx, input }) => {
            try {
                const response = await handleCreateUser(ctx, input);

                if (!response) {
                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: "Something went wrong.",
                    });
                }

                return response;
            } catch (error) {
                throw error;
            }
        }),
    getUser: privateProcedure
        .input(z.object({ userId: z.string().nullish() }))
        .query(async ({ ctx, input }) => {
            try {
                const { userId } = input;

                if (!userId) {
                    throw new TRPCError({
                        code: "BAD_REQUEST",
                        message: "User ID is required.",
                    });
                }

                const response = await handleGetUser(ctx, userId);

                if (!response) {
                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: "Something went wrong.",
                    });
                }

                return response;
            } catch (error) {
                throw error;
            }
        }),
});
