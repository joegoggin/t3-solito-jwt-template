import { TRPCError } from "@trpc/server";
import { User, UserInput } from "../../models/schemas/User";
import { PrivateCTX, PublicCTX } from "../../types/CTX";
import { hashPassword } from "../../utils/auth";
import {
    handlePrismaNotFoundError,
    handlePrismaUniqueError,
} from "../../utils/errorHandling";
import { validateEmail } from "../../utils/validation";

const select = {
    id: true,
    fName: true,
    lName: true,
    email: true,
    role: true,
};

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
        const hashedPassword = await hashPassword(data.password);

        const { confirm: _confirm, ...userData } = data;
        userData.password = hashedPassword;

        const user = await ctx.prisma.user.create({
            data: userData,
        });

        const { password: _password, ...createUserData } = user;

        return { user: createUserData as User };
    } catch (error) {
        handlePrismaUniqueError(error, "email", data.email, "User");

        throw error;
    }
};

export const handleGetUser = async (ctx: PrivateCTX, userId: string) => {
    try {
        const user = await ctx.prisma.user.findUnique({
            where: {
                id: userId,
            },
            select,
        });

        if (user) {
            return user as User;
        }
    } catch (error) {
        handlePrismaNotFoundError(error, "User");
    }
};
