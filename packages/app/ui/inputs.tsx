import { TextInput as NativeTextInput, TextInputProps } from "react-native";
import { styled } from "nativewind";
import { CustomTextProps, StyledText } from "./typography";
import { getClasses, Styled } from "app/utils/hooks/getClasses";
import { twMerge } from "tailwind-merge";
import React from "react";

const StyledTextInput = styled(NativeTextInput);

type CustomTextInput = TextInputProps & Styled;

export const TextInput: React.FC<CustomTextInput> = ({ styles, ...props }) => {
    const classes = getClasses(styles);
    const mergedClasses = twMerge(
        "bg-black w-full border border-blue-500 focus:shadow-sm focus:shadow-blue-700 py-2 px-2 text-base text-blue-500 focus:outline-none focus:border-4 focus:font-bold focus:px-2 focus:text-lg transition-all duration-250",
        classes
    );

    return <StyledTextInput className={mergedClasses} {...props} />;
};

export const InputLabel: React.FC<CustomTextProps> = ({ styles, ...props }) => {
    const classes = getClasses(styles);
    const mergedClasses = twMerge(
        "mb-2 ml-2 text-base font-bold text-blue-500",
        classes
    );

    return <StyledText className={mergedClasses} {...props} />;
};
