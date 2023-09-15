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
        "bg-gray-200 w-full rounded-xl py-2 px-4 text-green-800 text-base focus:outline-green-800",
        classes
    );

    return <StyledTextInput className={mergedClasses} {...props} />;
};

export const InputLabel: React.FC<CustomTextProps> = ({ styles, ...props }) => {
    const classes = getClasses(styles);
    const mergedClasses = twMerge(
        "mb-2 ml-2 text-base font-bold text-green-800",
        classes
    );

    return <StyledText className={mergedClasses} {...props} />;
};
