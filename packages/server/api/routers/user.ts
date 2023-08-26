import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";
import { UserSchema } from "server/models/schemas/User";
import { handleCreateUser } from "../controllers/user";
import { TRPCError } from "@trpc/server";

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
});
