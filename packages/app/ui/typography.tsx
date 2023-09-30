import React from "react";
import { Text as NativeText, TextProps } from "react-native";
import { styled } from "nativewind";
import { getClasses, Styled } from "app/utils/hooks/getClasses";
import { twMerge } from "tailwind-merge";

export const StyledText = styled(NativeText);

export type CustomTextProps = TextProps & Styled;

export const Text: React.FC<CustomTextProps> = ({ styles, ...props }) => {
    const classes = getClasses(styles);

    return <StyledText className={classes} {...props} />;
};

export const P: React.FC<CustomTextProps> = ({ styles, ...props }) => {
    const classes = getClasses(styles);
    const mergedClasses = twMerge("text-base text-black my-4", classes);

    return <StyledText className={mergedClasses} {...props} />;
};

P.defaultProps = {
    accessibilityRole: "text",
};

export const H1: React.FC<CustomTextProps> = ({ styles, ...props }) => {
    const classes = getClasses(styles);
    const mergedClasses = twMerge("text-9xl font-extrabold my-4", classes);

    return <StyledText className={mergedClasses} {...props} />;
};

H1.defaultProps = {
    accessibilityLevel: 1,
    accessibilityRole: "header",
};
