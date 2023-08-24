import { H1, P } from "app/ui/typography";
import { View } from "app/ui/view";
import { api } from "app/utils/trpc";
import React, { useEffect, useState } from "react";

type HomeScreenProps = {};

const HomeScreen: React.FC<HomeScreenProps> = () => {
    // state
    const [message, setMessage] = useState<string>("test");

    // queries
    const { data: fetchedMessage } = api.hello.sayHello.useQuery();

    // effects
    useEffect(() => {
        if (fetchedMessage) {
            setMessage(fetchedMessage);
        }
    }, [fetchedMessage]);

    return (
        <View className="flex-1 items-center justify-center bg-green-800">
            <H1 className="text-white">T3 Solito Template</H1>
            <P className="text-[20px] text-cyan-100 lg:text-[30px]">
                {message}
            </P>
        </View>
    );
};

export default HomeScreen;
