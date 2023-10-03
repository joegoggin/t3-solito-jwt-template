import { TRPCError } from "@trpc/server";
import { User, UserInput } from "../../models/schemas/User";
import { PrivateCTX, PublicCTX } from "../../types/CTX";
import { hashPassword } from "../../utils/auth";
import {
    handlePrismaNotFoundError,
    handlePrismaUniqueError,
} from "../../utils/errorHandling";
import { validateEmail, validateNewPassword } from "../../utils/validation";

const select = {
    id: true,
    fName: true,
    lName: true,
    email: true,
    role: true,
    authCode: true,
    setPassword: true,
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

export const handleUpdateUser = async (
    ctx: PrivateCTX,
    userId: string,
    data: Partial<UserInput>
) => {
    try {
        let updatedUser: User | undefined;

        if (data.password) {
            const validation = validateNewPassword(data.password);

            if (!validation.isValid) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: validation.error || "Invalid password.",
                });
            }

            if (data.password !== data.confirm) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Password and Confirm don't match.",
                });
            }

            const hashedPassword = await hashPassword(data.password);

            if (hashedPassword) {
                const { confirm: _, ...userData } = data;

                updatedUser = (await ctx.prisma.user.update({
                    where: {
                        id: userId,
                    },
                    data: { ...userData, password: hashedPassword },
                    select,
                })) as User;
            }
        } else {
            updatedUser = (await ctx.prisma.user.update({
                where: {
                    id: userId,
                },
                data,
                select,
            })) as User;
        }

        if (updatedUser) {
            return { updatedUser };
        }
    } catch (error) {
        handlePrismaNotFoundError(error, "User");
        handlePrismaUniqueError(error, "email", data.email, "User");

        throw error;
    }
};
