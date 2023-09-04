import React from "react";
import { Roles } from "server/models/enums/Role";
import AdminOnlyScreen from "app/screens/admin/AdminOnlyScreen";
import PrivatePage from "next-app/auth/PrivatePage";

const AdminOnlyPage: React.FC = () => {
    return (
        <PrivatePage role={Roles.Admin}>
            <AdminOnlyScreen />
        </PrivatePage>
    );
};

export default AdminOnlyPage;
