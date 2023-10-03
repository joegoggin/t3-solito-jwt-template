import { Card, Layout } from "app/ui/layout";
import { View } from "app/ui/view";
import { TextInput } from "app/ui/inputs";
import { H1 } from "app/ui/typography";
import React, { useState } from "react";
import { Button } from "app/ui/buttons";
import { handleChangeText } from "app/utils/handleChangeText";
import { api } from "app/utils/trpc";
import { useRouter } from "solito/router";
import { useUser } from "app/provider/context/UserContextProvider";
import { authFormStyles as styles } from "app/constants/styles";

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
                <H1 styles={styles.title}>Sign In</H1>
                <View styles={styles.form}>
                    <TextInput
                        styles={{ main: "mb-6" }}
                        value={email}
                        onChangeText={handleChangeText(setEmail)}
                        placeholder="Email"
                    />
                    <TextInput
                        value={password}
                        secureTextEntry={true}
                        onChangeText={handleChangeText(setPassword)}
                        placeholder="Password"
                    />
                </View>
                <View styles={styles.btnContainer}>
                    <Button text="Sign In" onPress={handleSignIn} />
                </View>
            </Card>
        </Layout>
    );
};

export default SignInScreen;
