import { useUser } from "app/provider/context/UserContextProvider";
import { Button } from "app/ui/buttons";
import { TextInput } from "app/ui/inputs";
import { Card, Layout } from "app/ui/layout";
import { H1 } from "app/ui/typography";
import { View } from "app/ui/view";
import { handleChangeText } from "app/utils/handleChangeText";
import { api } from "app/utils/trpc";
import React, { useState } from "react";
import { useRouter } from "solito/router";
import { authFormStyles as styles } from "app/constants/styles";

type SetPasswordScreenProps = {};

const SetPasswordScreen: React.FC<SetPasswordScreenProps> = () => {
    // state
    const [password, setPassword] = useState<string>("");
    const [confirm, setConfirm] = useState<string>("");

    // context
    const { user } = useUser();

    // mutations
    const updateUser = api.user.updateUser.useMutation();

    // router
    const router = useRouter();

    // event handler
    const handleResetPassword = async () => {
        try {
            await updateUser.mutateAsync({
                userId: user?.id as string,
                data: { password, confirm, setPassword: false },
            });

            router.push("/dashboard");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Layout>
            <Card>
                <H1 styles={styles.title}>Update Password</H1>
                <View styles={styles.form}>
                    <TextInput
                        styles={{ main: "mb-6" }}
                        value={password}
                        secureTextEntry={true}
                        onChangeText={handleChangeText(setPassword)}
                        placeholder="Password"
                    />
                    <TextInput
                        value={confirm}
                        secureTextEntry={true}
                        onChangeText={handleChangeText(setConfirm)}
                        placeholder="Confirm Password"
                    />
                </View>
                <View styles={styles.btnContainer}>
                    <Button text="Set Password" onPress={handleResetPassword} />
                </View>
            </Card>
        </Layout>
    );
};

export default SetPasswordScreen;
