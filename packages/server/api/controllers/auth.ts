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

export const handleVerifyToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

        if (decoded.userId) {
            return { userId: decoded.userId as string };
        }

        return { userId: null };
    } catch {
        return { userId: null };
    }
};

export const handleVerifyAuthCode = async (
    ctx: PublicCTX,
    authCode: string
) => {
    try {
        const user = await ctx.prisma.user.findUnique({
            where: {
                authCode,
            },
        });

        if (!user) {
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: "Invalid authentication code.",
            });
        }

        await ctx.prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                authCode: null,
            },
        });

        const token = jwt.sign({ userId: user.id }, JWT_SECRET);

        return { userId: user.id, token };
    } catch (error) {
        throw error;
    }
};
