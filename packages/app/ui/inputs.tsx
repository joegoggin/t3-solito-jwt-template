import { TextInput as NativeTextInput } from "react-native";
import { styled } from "nativewind";
import { Text } from "./typography";

export const TextInput = styled(
    NativeTextInput,
    "bg-gray-200 w-full rounded-xl py-2 px-4 text-green-800 text-base focus:outline-green-800"
);

export const InputLabel = styled(
    Text,
    "mb-2 ml-2 text-base font-bold text-green-800"
);
