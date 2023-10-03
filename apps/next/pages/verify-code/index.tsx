import React from "react";

import VerifyCodeScreen from "app/screens/auth/VerifyCodeScreen";
import AuthPage from "next-app/auth/AuthPage";

const VerifyCodePage: React.FC = () => {
    return (
        <AuthPage>
            <VerifyCodeScreen />
        </AuthPage>
    );
};

export default VerifyCodePage;
