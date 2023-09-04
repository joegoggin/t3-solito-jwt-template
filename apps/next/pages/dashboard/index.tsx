import React from "react";
import DashboardScreen from "app/screens/dashboard/DashboardScreen";
import PrivatePage from "next-app/auth/PrivatePage";

const DashboardPage: React.FC = () => {
    return (
        <PrivatePage role="All">
            <DashboardScreen />
        </PrivatePage>
    );
};

export default DashboardPage;
