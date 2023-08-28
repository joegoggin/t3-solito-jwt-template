import { createTRPCRouter } from "./trpc";
import { helloRouter } from "./routers/hello";
import { userRouter } from "./routers/user";
import { authRouter } from "./routers/auth";

export const appRouter = createTRPCRouter({
    hello: helloRouter,
    user: userRouter,
    auth: authRouter,
});

export type AppRouter = typeof appRouter;
