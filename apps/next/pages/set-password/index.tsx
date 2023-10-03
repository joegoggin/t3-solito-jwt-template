import React from "react";

import SetPasswordScreen from "app/screens/auth/SetPasswordScreen";
import PrivatePage from "next-app/auth/PrivatePage";

const SetPasswordPage: React.FC = () => {
    return (
        <PrivatePage role="All">
            <SetPasswordScreen />
        </PrivatePage>
    );
};

export default SetPasswordPage;
