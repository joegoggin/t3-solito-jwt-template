import { appRouter } from "server";
import { createInnerTRPContext } from "server/api/trpc";

describe("hello router", () => {
    test("sayHello", async () => {
        const caller = appRouter.createCaller(createInnerTRPContext());

        const result = await caller.hello.sayHello();

        expect(result).toStrictEqual("hello from tRPC!");
    });
});
