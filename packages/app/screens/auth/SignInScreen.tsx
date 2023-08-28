import { Card, Layout } from "app/ui/layout";
import { H1 } from "app/ui/typography";
import React from "react";

type SignInScreenProps = {};

const SignInScreen: React.FC<SignInScreenProps> = () => {
    return (
        <Layout>
            <Card>
                <H1 className="text-black">Sign In</H1>
            </Card>
        </Layout>
    );
};

export default SignInScreen;
