import { styled } from "nativewind";
import React from "react";
import { Platform, Pressable as NativePressable } from "react-native";
import { Text } from "./typography";
import { twMerge } from "tailwind-merge";
import { separateTextClasses } from "app/utils/tailwind";
import { getClasses, Styled } from "app/utils/hooks/getClasses";

export const StyledPressable = styled(NativePressable);

type ButtonProps = {
    text: string;
    onPress: () => void;
} & Styled;

export const Button: React.FC<ButtonProps> = ({ text, onPress, styles }) => {
    const className = getClasses(styles);
    const { baseClasses, textClasses } = separateTextClasses(className);

    const pressableClassName = twMerge(
        "w-max rounded-xl bg-blue-700 px-8 py-5 hover:bg-blue-500 hover:scale-105 hover:shadow-sm hover:shadow-blue-700 transition-all duration-150",
        baseClasses
    );

    const textClassName = twMerge(
        "text-lg font-bold text-black text-center",
        textClasses
    );

    const buttonClassName = twMerge(pressableClassName, textClassName);

    if (Platform.OS === "web") {
        return (
            <button className={buttonClassName} onClick={onPress}>
                {text}
            </button>
        );
    }

    return (
        <StyledPressable className={pressableClassName} onPress={onPress}>
            <Text className={textClassName}>{text}</Text>
        </StyledPressable>
    );
};
