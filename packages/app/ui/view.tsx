import { View as ReactNativeView, ViewProps } from "react-native";
import { styled } from "nativewind";
import { getClasses, Styled } from "app/utils/hooks/getClasses";
import React from "react";

const StyledView = styled(ReactNativeView);

export type CustomViewProps = ViewProps & Styled;

export const View: React.FC<CustomViewProps> = ({ styles, ...props }) => {
    const classes = getClasses(styles);

    return <StyledView className={classes} {...props} />;
};
