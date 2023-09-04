import { useUser } from "app/provider/context/UserContextProvider";
import { Button } from "app/ui/buttons";
import { Layout } from "app/ui/layout";
import { H1 } from "app/ui/typography";
import { View } from "app/ui/view";
import React from "react";
import { Roles } from "server/models/enums/Role";
import { useRouter } from "solito/router";

const UserDashboardScreen: React.FC = () => {
    // context
    const { user, role, clearUserData } = useUser();

    // router
    const router = useRouter();

    // event handlers
    const handleAdminOnlyNavigation = () => {
        router.push("/admin-only");
    };

    const handleSignOut = () => {
        clearUserData();
        router.push("/sign-in");
    };

    return (
        <Layout>
            <H1 className="text-white">Hello {user?.fName}!</H1>

            <View className="mt-10 w-[40%] flex-row items-center justify-evenly">
                <Button
                    className="bg-black text-white"
                    text="Sign Out"
                    onPress={handleSignOut}
                />

                {role && role === Roles.Admin && (
                    <Button
                        className="bg-white text-black"
                        text="Admin Only"
                        onPress={handleAdminOnlyNavigation}
                    />
                )}
            </View>
        </Layout>
    );
};

export default UserDashboardScreen;
