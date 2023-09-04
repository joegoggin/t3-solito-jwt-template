import React from "react";
import { ActivityIndicator } from "react-native";
import { Layout } from "./layout";

type LoadingSpinnerProps = {
    color: string;
    size: "small" | "large";
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ color, size }) => {
    return (
        <Layout>
            <ActivityIndicator color={color} size={size} />
        </Layout>
    );
};

export default LoadingSpinner;
