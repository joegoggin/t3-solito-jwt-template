import { TRPCError } from "@trpc/server";

export class InvalidTokenError extends TRPCError {
    constructor() {
        super({
            code: "UNAUTHORIZED",
            message: "Invalid authentication token.",
        });
    }
}
