import { Card, Layout } from "app/ui/layout";
import { View } from "app/ui/view";
import { InputLabel, TextInput } from "app/ui/inputs";
import { H1 } from "app/ui/typography";
import React, { useState } from "react";
import { Button } from "app/ui/buttons";
import { handleChangeText } from "app/utils/handleChangeText";
import { api } from "app/utils/trpc";
import { useRouter } from "solito/router";
import { useUser } from "app/provider/context/UserContextProvider";
import { StyleSheet } from "app/utils/hooks/getClasses";

const SignInScreen: React.FC = () => {
    // state
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    // context
    const { setUserData } = useUser();

    // mutations
    const signIn = api.auth.signIn.useMutation();

    // router
    const router = useRouter();

    // event handlers
    const handleSignUpNavigation = () => {
        router.push("/sign-up");
    };

    const handleSignIn = async () => {
        try {
            const userData = await signIn.mutateAsync({
                email: email.toLowerCase(),
                password,
            });

            if (userData) {
                setUserData(userData);
                router.push("/dashboard");
            }
        } catch (error) {
            console.error(error);
        }
    };

    // styles
    const styles = {
        card: {
            main: "bg-green-600",
        },
        title: {
            main: "text-green-900",
        },
        label: {
            main: "text-cyan-800",
        },
        input: {
            main: "bg-green-400",
        },
        signInBtn: {
            main: "text-green-600",
        },
        signUpBtn: {
            main: "bg-cyan-800 text-green-600",
        },
    } satisfies StyleSheet;

    return (
        <Layout>
            <Card styles={styles.card}>
                <H1 styles={styles.title}>Sign In</H1>
                <View className="mt-10 w-[80%]">
                    <InputLabel styles={styles.label}>Email</InputLabel>
                    <TextInput
                        styles={{ main: `mb-2 ${styles.input.main}` }}
                        value={email}
                        onChangeText={handleChangeText(setEmail)}
                    />

                    <InputLabel styles={styles.label}>Password</InputLabel>
                    <TextInput
                        styles={styles.input}
                        value={password}
                        secureTextEntry={true}
                        onChangeText={handleChangeText(setPassword)}
                    />
                </View>
                <View className="mt-20 w-[80%] flex-row justify-evenly">
                    <Button
                        styles={styles.signInBtn}
                        text="Sign In"
                        onPress={handleSignIn}
                    />
                    <Button
                        styles={styles.signUpBtn}
                        text="Sign Up"
                        onPress={handleSignUpNavigation}
                    />
                </View>
            </Card>
        </Layout>
    );
};

export default SignInScreen;
