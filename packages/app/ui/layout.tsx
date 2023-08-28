import { View } from "react-native";
import { styled } from "nativewind";

export const Row = styled(View, "flex-row");

export const Layout = styled(
    View,
    "flex-1 items-center justify-center bg-green-800"
);

export const Card = styled(
    View,
    "p-20 w-[50%] bg-white rounded-lg items-center"
);
