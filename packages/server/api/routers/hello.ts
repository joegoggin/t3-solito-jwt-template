import { handleSayHello } from "../controllers/hello";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const helloRouter = createTRPCRouter({
    sayHello: publicProcedure.query(() => {
        const response = handleSayHello();

        return response;
    }),
});
