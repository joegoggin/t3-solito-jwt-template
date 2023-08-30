import { TRPCError } from "@trpc/server";
import { User, UserInput } from "../../models/schemas/User";
import { PublicCTX } from "../../types/CTX";
import { hashPassword } from "../../utils/auth";
import { handlePrismaUniqueError } from "../../utils/errorHandling";
import { validateEmail } from "../../utils/validation";

export const handleCreateUser = async (ctx: PublicCTX, data: UserInput) => {
    const { password, confirm } = data;

    console.log(data);

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
