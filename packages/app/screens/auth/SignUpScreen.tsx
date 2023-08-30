import { Card, Layout } from "app/ui/layout";
import { View } from "app/ui/view";
import { InputLabel, TextInput } from "app/ui/inputs";
import { H1, P } from "app/ui/typography";
import React, { useState } from "react";
import { Button } from "app/ui/buttons";
import { handleChangeText } from "app/utils/handleChangeText";
import { useRouter } from "solito/router";
import { api } from "app/utils/trpc";
import { capitalize } from "app/utils/capitalize";
import { Roles } from "server/models/enums/Role";

const SignUpScreen: React.FC = () => {
    // state
    const [fName, setFName] = useState<string>("");
    const [lName, setLName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirm, setConfirm] = useState<string>("");

    // router
    const router = useRouter();

    // mutations
    const createUser = api.user.createUser.useMutation();

    // event handlers
    const handleSignInNavigation = () => {
        router.push("/sign-in");
    };

    const handleSignUp = async () => {
        try {
            const { user } = await createUser.mutateAsync({
                fName: capitalize(fName),
                lName: capitalize(lName),
                email: email.toLowerCase(),
                password,
                confirm,
                role: Roles.User,
            });

            if (user) {
                console.log(user);
                setFName("");
                setLName("");
                setEmail("");
                setPassword("");
                setConfirm("");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Layout>
            <Card>
                <H1 className="text-black">Sign Up</H1>
                <View className="mt-10 w-[80%]">
                    <View className="mb-2 w-full flex-row">
                        <View className="mr-[4%] w-[48%]">
                            <InputLabel>First Name</InputLabel>
                            <TextInput
                                value={fName}
                                onChangeText={handleChangeText(setFName)}
                            />
                        </View>

                        <View className="mr-[4%] w-[48%]">
                            <InputLabel>Last Name</InputLabel>
                            <TextInput
                                value={lName}
                                onChangeText={handleChangeText(setLName)}
                            />
                        </View>
                    </View>

                    <InputLabel>Email</InputLabel>
                    <TextInput
                        className="mb-2"
                        value={email}
                        onChangeText={handleChangeText(setEmail)}
                    />

                    <InputLabel>Password</InputLabel>
                    <TextInput
                        className="mb-2"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={handleChangeText(setPassword)}
                    />

                    <InputLabel>Confirm Password</InputLabel>
                    <TextInput
                        secureTextEntry={true}
                        value={confirm}
                        onChangeText={handleChangeText(setConfirm)}
                    />
                </View>
                <View className="mt-20 w-[80%] flex-row justify-evenly">
                    <Button text="Sign Up" onPress={handleSignUp} />
                    <Button
                        className="bg-black"
                        text="Sign In"
                        onPress={handleSignInNavigation}
                    />
                </View>
            </Card>
        </Layout>
    );
};

export default SignUpScreen;
