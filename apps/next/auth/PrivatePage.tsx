import { useUser } from "app/provider/context/UserContextProvider";
import LoadingSpinner from "app/ui/loading";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Role } from "server/models/enums/Role";
import { Roles } from "server/models/enums/Role";

type PrivatePageProps = {
    role: Role | "All";
    children: React.ReactNode;
};

const PrivatePage: React.FC<PrivatePageProps> = ({ role, children }) => {
    // state
    const [loading, setLoading] = useState<boolean>(true);

    // context
    const { token, role: userRole, isInit } = useUser();

    // router
    const router = useRouter();

    // effects
    useEffect(() => {
        if (isInit) {
            if (!token) {
                router.replace("/sign-in");
            } else {
                if (
                    role === "All" ||
                    userRole === Roles.Admin ||
                    userRole === role
                ) {
                    setLoading(false);
                } else {
                    router.push("/dashboard");
                }
            }
        }
    }, [isInit, userRole, token]);

    if (loading) {
        return <LoadingSpinner color="white" size="large" />;
    }

    return <>{children}</>;
};

export default PrivatePage;
