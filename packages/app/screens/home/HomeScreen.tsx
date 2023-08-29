import { Layout } from "app/ui/layout";
import { View } from "app/ui/view";
import { H1, P } from "app/ui/typography";
import { api } from "app/utils/trpc";
import { Button } from "app/ui/buttons";
import React, { useEffect, useState } from "react";
import { useRouter } from "solito/router";

const HomeScreen: React.FC = () => {
    // state
    const [message, setMessage] = useState<string>("test");

    // queries
    const { data: fetchedMessage } = api.hello.sayHello.useQuery();

    // router
    const router = useRouter();

    // effects
    useEffect(() => {
        if (fetchedMessage) {
            setMessage(fetchedMessage);
        }
    }, [fetchedMessage]);

    // event handlers
    const handleSignInNavigation = () => {
        router.push("/sign-in");
    };

    return (
        <Layout>
            <H1 className="text-white">T3 Solito Template</H1>
            <P className="text-[20px] text-cyan-100 lg:text-[30px]">
                {message}
            </P>
            <View className="m-10 w-1/4 flex-row items-center justify-evenly">
                <Button
                    className="bg-white text-black"
                    text="Sign In"
                    onPress={handleSignInNavigation}
                />
                <Button
                    className="bg-black text-white"
                    text="Sign Up"
                    onPress={() => { }}
                />
            </View>
        </Layout>
    );
};

export default HomeScreen;
