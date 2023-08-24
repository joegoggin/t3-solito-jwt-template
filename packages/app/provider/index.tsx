import { NavigationProvider } from "./navigation";
import { SafeArea } from "./safe-area";
import { TRPCProvider } from "./trpc/TRPCProvider";

export function Provider({ children }: { children: React.ReactNode }) {
    return (
        <TRPCProvider>
            <SafeArea>
                <NavigationProvider>{children}</NavigationProvider>
            </SafeArea>
        </TRPCProvider>
    );
}
