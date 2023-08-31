import { TRPCError } from "@trpc/server";
import { PublicCTX } from "server/types/CTX";
import { SignInInput } from "server/models/schemas/Auth";
import { verifyPassword } from "server/utils/auth";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "server/env";

export const handleSignIn = async (ctx: PublicCTX, data: SignInInput) => {
    const { email, password } = data;

    try {
        const user = await ctx.prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: `Unable to find account with email of ${email}`,
            });
        }

        const isValid = await verifyPassword(password, user.password);

        if (!isValid) {
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: "Username and password do not match.",
            });
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET);

        return { token, userId: user.id, role: user.role };
    } catch (error) {
        throw error;
    }
};
