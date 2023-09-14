import { Layout } from "app/ui/layout";
import { View } from "app/ui/view";
import { H1, P } from "app/ui/typography";
import { api } from "app/utils/trpc";
import { Button } from "app/ui/buttons";
import React, { useEffect, useState } from "react";
import { useRouter } from "solito/router";
import { StyleSheet } from "app/utils/hooks/getClasses";

const HomeScreen: React.FC = () => {
    // state
    const [message, setMessage] = useState<string>("");

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

    const handleSignUpNavigation = () => {
        router.push("/sign-up");
    };

    // styles
    const styles = {
        title: {
            main: "text-green-500 text-center",
        },
        message: {
            main: "text-[30px] text-blue-500 text-center",
        },
        btnContainer: {
            main: "m-10 w-1/4 flex-row items-center justify-evenly",
            phone: "flex-col w-[80%]",
            tablet: "flex-col w-[80%]",
        },
        signInBtn: {
            main: "bg-green-700 text-black",
            phone: "w-full mb-10",
            tablet: "w-full mb-10",
        },
        signUpBtn: {
            main: "bg-cyan-500 text-black",
            phone: "w-full",
            tablet: "w-full",
        },
    } satisfies StyleSheet;

    return (
        <Layout>
            <H1 styles={styles.title}>T3 Solito Template</H1>
            <P styles={styles.message}>{message}</P>
            <View styles={styles.btnContainer}>
                <Button
                    styles={styles.signInBtn}
                    text="Sign In"
                    onPress={handleSignInNavigation}
                />
                <Button
                    styles={styles.signUpBtn}
                    text="Sign Up"
                    onPress={handleSignUpNavigation}
                />
            </View>
        </Layout>
    );
};

export default HomeScreen;
