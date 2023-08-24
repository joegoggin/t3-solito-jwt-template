import { render, screen } from "expo-app/tests/test-utils";
import HomeScreen from "app/screens/home/HomeScreen";

describe("Home Screen", () => {
    test("Home Screen renders properly", async () => {
        render(<HomeScreen />);

        const heading = await screen.findByRole("header", {
            name: "T3 Solito Template",
        });
        const message = await screen.findByRole("text", {
            name: "hello from tRPC!",
        });

        expect(heading).toBeTruthy();
        expect(message).toBeTruthy();
    });
});
