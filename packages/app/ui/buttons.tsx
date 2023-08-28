import { styled } from "nativewind";
import React from "react";
import { Pressable as NativePressable } from "react-native";
import { Text } from "./typography";

export const Pressable = styled(
    NativePressable,
    "w-max bg-green-800 py-5 px-8 rounded-xl"
);

type ButtonProps = {
    text: string;
    onPress: () => void;
    className?: string;
    textClassName?: string;
};

export const Button: React.FC<ButtonProps> = ({
    text,
    onPress,
    className,
    textClassName,
}) => {
    return (
        <Pressable className={className} onPress={onPress}>
            <Text className={`text-lg font-bold text-white ${textClassName}`}>
                {text}
            </Text>
        </Pressable>
    );
};
