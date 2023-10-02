import { Layout } from "app/ui/layout";
import { H1 } from "app/ui/typography";
import React from "react";
import { StyleSheet } from "app/utils/hooks/getClasses";
import { View } from "app/ui/view";
import { Button } from "app/ui/buttons";
import { useRouter } from "solito/router";

const HomeScreen: React.FC = () => {
    // router
    const router = useRouter();

    // event handlers
    const handleSignInNavigation = () => {
        router.push("/sign-in");
    };

    const handleClaimNavigation = () => {
        router.push("/verify-code");
    };

    // styles
    const styles = {
        title: {
            main: "text-blue-500 text-center mb-20",
            phoneSm: "text-2xl",
            phone: "text-3xl",
            tablet: "text-4xl",
        },
        btnContainer: {
            main: "flex-row w-1/2 justify-evenly",
        },
        signInBtn: {
            main: "bg-blue-600 text-black px-14",
        },
        claimBtn: {
            main: "bg-gray-700 text-black",
        },
    } satisfies StyleSheet;

    return (
        <Layout>
            <H1 styles={styles.title}>Emensia</H1>
            <View styles={styles.btnContainer}>
                <Button
                    styles={styles.signInBtn}
                    text="Sign In"
                    onPress={handleSignInNavigation}
                />
                <Button
                    styles={styles.claimBtn}
                    text="Claim Account"
                    onPress={handleClaimNavigation}
                />
            </View>
        </Layout>
    );
};

export default HomeScreen;
