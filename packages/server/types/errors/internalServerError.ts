import { TRPCError } from "@trpc/server";

export class InternalServerError extends TRPCError {
    constructor() {
        super({
            code: "INTERNAL_SERVER_ERROR",
            message: "Something went wrong.",
        });
    }
}
