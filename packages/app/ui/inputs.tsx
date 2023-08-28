import { TextInput as NativeTextInput } from "react-native";
import { styled } from "nativewind";
export const TextInput = styled(
    NativeTextInput,
    "bg-gray-200 w-full rounded-xl py-2 px-4 text-green-800 text-base focus:outline-green-800"
);
