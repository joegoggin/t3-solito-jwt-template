import { useUser } from "app/provider/context/UserContextProvider";
import { useRouter } from "next/router";
import LoadingSpinner from "app/ui/loading";
import React, { useEffect, useState } from "react";

type AuthPageProps = {
    children: React.ReactNode;
};

const AuthPage: React.FC<AuthPageProps> = ({ children }) => {
    // state
    const [loading, setLoading] = useState<boolean>(true);

    // context
    const { token, isInit } = useUser();

    // router
    const router = useRouter();

    // effects
    useEffect(() => {
        if (token) {
            router.replace("/dashboard");
        } else {
            if (isInit) {
                setLoading(false);
            }
        }
    }, [token, isInit]);

    if (loading) {
        return <LoadingSpinner color="white" size="large" />;
    }

    return <>{children}</>;
};

export default AuthPage;
