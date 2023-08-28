import z from "zod";

export const AuthSchema = z.object({
    username: z.string().min(1, "Username is required."),
    password: z.string().min(1, "Password is required."),
});

export type SignInInput = z.infer<typeof AuthSchema>;
