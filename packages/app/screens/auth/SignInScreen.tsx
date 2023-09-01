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

    return (
        <Layout>
            <Card>
                <H1 className="text-black">Sign In</H1>
                <View className="mt-10 w-[80%]">
                    <InputLabel>Email</InputLabel>
                    <TextInput
                        className="mb-2"
                        value={email}
                        onChangeText={handleChangeText(setEmail)}
                    />

                    <InputLabel>Password</InputLabel>
                    <TextInput
                        value={password}
                        secureTextEntry={true}
                        onChangeText={handleChangeText(setPassword)}
                    />
                </View>
                <View className="mt-20 w-[80%] flex-row justify-evenly">
                    <Button text="Sign In" onPress={handleSignIn} />
                    <Button
                        className="bg-black"
                        text="Sign Up"
                        onPress={handleSignUpNavigation}
                    />
                </View>
            </Card>
        </Layout>
    );
};

export default SignInScreen;
