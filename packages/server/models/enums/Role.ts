import { z } from "zod";
import { objectToZodStringArray } from "server/utils/objectToStringArray";

export const Roles = {
    Admin: "Admin",
    User: "User",
} as const;

const RolesArray = objectToZodStringArray(Roles);

export const RoleEnum = z.enum(RolesArray, {
    required_error: "Role is required.",
});

export type Roles = (typeof Roles)[keyof typeof Roles];
