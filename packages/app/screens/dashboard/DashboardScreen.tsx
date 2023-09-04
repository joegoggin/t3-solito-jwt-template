import { useUser } from "app/provider/context/UserContextProvider";
import { Button } from "app/ui/buttons";
import { Layout } from "app/ui/layout";
import { H1 } from "app/ui/typography";
import React from "react";
import { Roles } from "server/models/enums/Role";
import { useRouter } from "solito/router";

const UserDashboardScreen: React.FC = () => {
    // context
    const { user, role } = useUser();

    // router
    const router = useRouter();

    // event handlers
    const handleAdminOnlyNavigation = () => {
        router.push("/admin-only");
    };

    return (
        <Layout>
            <H1 className="text-white">Hello {user?.fName}!</H1>

            {role && role === Roles.Admin && (
                <Button
                    className="mt-10 bg-black text-white"
                    text="Admin Only"
                    onPress={handleAdminOnlyNavigation}
                />
            )}
        </Layout>
    );
};

export default UserDashboardScreen;
