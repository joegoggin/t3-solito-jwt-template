import { z } from "zod";

export const Roles = {
    Admin: "Admin",
    User: "User",
} as const;

const RolesArray = ["Admin", "User"] as const;

export const RoleEnum = z.enum(RolesArray, {
    required_error: "Role is required.",
});

export type Role = (typeof Roles)[keyof typeof Roles];
