import { createTRPCRouter, publicProcedure } from "../trpc";
import { UserSchema } from "server/models/schemas/User";
import { handleCreateUser } from "../controllers/user";

export const Router = createTRPCRouter({
    createUser: publicProcedure
        .input(UserSchema)
        .mutation(async ({ ctx, input }) => {
            try {
                const response = await handleCreateUser(ctx, input);

                return response;
            } catch (error) {
                throw error;
            }
        }),
});
