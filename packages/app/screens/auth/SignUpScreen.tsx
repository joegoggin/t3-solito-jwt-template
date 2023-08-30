import { Card, Layout } from "app/ui/layout";
import { View } from "app/ui/view";
import { InputLabel, TextInput } from "app/ui/inputs";
import { H1 } from "app/ui/typography";
import React from "react";
import { Button } from "app/ui/buttons";

const SignInScreen: React.FC = () => {
    return (
        <Layout>
            <Card>
                <H1 className="text-black">Sign Up</H1>
                <View className="mt-10 w-[80%]">
                    <View className="mb-2 w-full flex-row">
                        <View className="mr-[4%] w-[48%]">
                            <InputLabel>First Name</InputLabel>
                            <TextInput />
                        </View>
                        <View className="mr-[4%] w-[48%]">
                            <InputLabel>First Name</InputLabel>
                            <TextInput />
                        </View>
                    </View>
                    <InputLabel>Username</InputLabel>
                    <TextInput className="mb-2" />
                    <InputLabel>Password</InputLabel>
                    <TextInput className="mb-2" />
                    <InputLabel></InputLabel>
                </View>
                <View className="mt-20 w-[80%] flex-row justify-evenly">
                    <Button text="Sign In" onPress={() => { }} />
                    <Button
                        className="bg-black"
                        text="Sign Up"
                        onPress={() => { }}
                    />
                </View>
            </Card>
        </Layout>
    );
};

export default SignInScreen;
