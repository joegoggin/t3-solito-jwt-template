import z from "zod";

export const AuthSchema = z.object({
    email: z.string().min(1, "Email is required."),
    password: z.string().min(1, "Password is required."),
});

export type SignInInput = z.infer<typeof AuthSchema>;
