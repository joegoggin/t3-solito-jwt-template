import { z } from "zod";
import { AuthSchema } from "../../models/schemas/Auth";
import { InternalServerError } from "../../types/errors/internalServerError";
import {
    handleSignIn,
    handleVerifyAuthCode,
    handleVerifyToken,
} from "../controllers/auth";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
    signIn: publicProcedure
        .input(AuthSchema)
        .mutation(async ({ ctx, input }) => {
            try {
                const response = await handleSignIn(ctx, input);

                if (!response) {
                    throw new InternalServerError();
                }

                return response;
            } catch (error) {
                throw error;
            }
        }),
    verifyToken: publicProcedure
        .input(z.object({ token: z.string().min(1, "Token is required.") }))
        .mutation(({ input }) => {
            const { token } = input;

            const response = handleVerifyToken(token);

            if (!response) {
                throw new InternalServerError();
            }

            return response;
        }),
    verifyAuthCode: publicProcedure
        .input(
            z.object({
                authCode: z.string().min(1, "Authentication code is required."),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { authCode } = input;

            try {
                const response = await handleVerifyAuthCode(ctx, authCode);

                if (!response) {
                    throw new InternalServerError();
                }

                return response;
            } catch (error) {
                throw error;
            }
        }),
});
