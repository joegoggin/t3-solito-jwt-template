import { z } from "zod";

import { RoleEnum } from "server/models/enums/Role";

export const UserSchema = z.object({
    fName: z.string().min(1, "First Name is required."),
    lName: z.string().min(1, "Last Name is required."),
    email: z.string().min(1, "Email is required."),
    username: z.string().min(1, "Username is required."),
    password: z.string().min(1, "Password is required."),
    confirm: z.string().min(1, "Confirm is required."),
    role: RoleEnum,
});

const SelectiveSchema = UserSchema.omit({
    confirm: true,
    password: true,
});

export type UserInput = z.infer<typeof UserSchema>;

export type User = z.infer<typeof SelectiveSchema> & { id: string };