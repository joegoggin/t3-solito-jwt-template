import { TRPCError } from "@trpc/server";
import { AuthSchema } from "../../models/schemas/Auth";
import { handleSignIn } from "../controllers/auth";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
    signIn: publicProcedure
        .input(AuthSchema)
        .mutation(async ({ ctx, input }) => {
            try {
                const response = await handleSignIn(ctx, input);

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
