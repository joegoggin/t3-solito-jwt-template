import { View } from "app/ui/view";
import { ViewProps } from "react-native";
import { getClasses, Styled } from "app/utils/hooks/getClasses";
import { twMerge } from "tailwind-merge";
import React from "react";

type StyledViewProps = ViewProps & Styled;

export const Layout: React.FC<StyledViewProps> = ({ styles, ...props }) => {
    const classes = getClasses(styles);
    const className = twMerge(
        "flex-1 items-center justify-center bg-black",
        classes
    );

    return <View className={className} {...props} />;
};

export const Card: React.FC<StyledViewProps> = ({ styles, ...props }) => {
    const classes = getClasses(styles);
    const className = twMerge(
        "p-20 w-1/2 border border-blue-500 shadow-md shadow-blue-700 rounded-lg items-center",
        classes
    );

    return <View className={className} {...props} />;
};
