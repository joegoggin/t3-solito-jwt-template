import { Layout } from "app/ui/layout";
import { H1 } from "app/ui/typography";
import React from "react";

type AdminOnlyScreenProps = {};

const AdminOnlyScreen: React.FC<AdminOnlyScreenProps> = () => {
    return (
        <Layout>
            <H1 className="text-white">This Page Is For Admins Only</H1>
        </Layout>
    );
};

export default AdminOnlyScreen;
