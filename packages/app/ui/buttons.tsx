import { styled } from "nativewind";
import React from "react";
import { Platform, Pressable as NativePressable } from "react-native";
import { Text } from "./typography";
import { twMerge } from "tailwind-merge";
import { separateTextClasses } from "app/utils/tailwind";

export const StyledPressable = styled(NativePressable);

type ButtonProps = {
    text: string;
    onPress: () => void;
    className?: string;
};

export const Button: React.FC<ButtonProps> = ({ text, onPress, className }) => {
    const { baseClasses, textClasses } = separateTextClasses(className);

    const pressableClassName = twMerge(
        "w-max rounded-xl bg-green-800 px-8 py-5",
        baseClasses
    );

    const textClassName = twMerge("text-lg font-bold text-white", textClasses);

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
