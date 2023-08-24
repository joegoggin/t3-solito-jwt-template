import { TRPCError } from "@trpc/server";
import { User, UserInput } from "../../models/schemas/User";
import { PublicCTX } from "../../types/CTX";
import { handlePrismaUniqueError } from "../../utils/errorHandling";
import { validateEmail } from "../../utils/validation";

export const handleCreateUser = async (ctx: PublicCTX, data: UserInput) => {
    const { password, confirm } = data;

    if (!validateEmail(data.email)) {
        throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Email is invalid.",
        });
    }

    if (password !== confirm) {
        throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Password and Confirm Password don't match.",
        });
    }

    try {
        const user = await ctx.prisma.user.create({
            data,
        });

        const userData = { ...user, password: undefined };

        return { user: userData as User };
    } catch (error) {
        handlePrismaUniqueError(error, "email", data.email, "User");
        handlePrismaUniqueError(error, "username", data.username, "User");
    }
};
