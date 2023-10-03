import { useUser } from "app/provider/context/UserContextProvider";
import { useRouter } from "next/router";
import LoadingSpinner from "app/ui/loading";
import { useTimeout } from "app/utils/hooks/useTimeout";
import React, { useEffect, useState } from "react";

type AuthPageProps = {
    children: React.ReactNode;
};

const AuthPage: React.FC<AuthPageProps> = ({ children }) => {
    // state
    const [loading, setLoading] = useState<boolean>(true);

    // context
    const { token, user } = useUser();

    // hooks
    useTimeout(() => {
        setLoading(false);
    }, 500);

    // router
    const router = useRouter();

    // effects
    useEffect(() => {
        if (token && user) {
            if (user.setPassword) {
                router.replace("/set-password");
            } else {
                router.replace("/dashboard");
            }
        }
    }, [token, user]);

    if (loading) {
        return <LoadingSpinner color="white" size="large" />;
    }

    return <>{children}</>;
};

export default AuthPage;
