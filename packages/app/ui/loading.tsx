import { styled } from "nativewind";
import React from "react";
import { ActivityIndicator as NativeActivityIndicator } from "react-native";
import { Layout } from "./layout";

const ActivityIndicator = styled(NativeActivityIndicator, "text-green-800");

const LoadingSpinner: React.FC = () => {
    return (
        <Layout>
            <ActivityIndicator color="white" size="large" />
        </Layout>
    );
};

export default LoadingSpinner;
