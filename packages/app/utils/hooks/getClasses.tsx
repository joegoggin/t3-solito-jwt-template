import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { getValueOrDefault } from "app/utils/getValueOrDefault";
import useDimensions from "./useDimensions";

export type Styles = {
    phone?: string;
    tablet?: string;
    desktop?: string;
    desktopLg?: string;
    main?: string;
};

export type StyleSheet = {
    [key: string]: Styles;
};

export type Styled = {
    styles?: Styles;
};

export const breakpoints = {
    phone: 480,
    tablet: 768,
    desktop: 1024,
    desktopLg: 1200,
};

export const getClasses = (styles: Styles | undefined) => {
    // state
    const [classes, setClasses] = useState<string>("");

    // context
    const { width } = useDimensions();

    // effects
    useEffect(() => {
        if (styles) {
            let phone = "";
            let tablet = "";
            let desktop = "";
            let desktopLg = "";

            if (width < breakpoints.phone) {
                phone = getValueOrDefault(styles.phone, "");
            } else if (width < breakpoints.tablet) {
                tablet = getValueOrDefault(styles.tablet, "");
            } else if (width < breakpoints.desktop) {
                desktop = getValueOrDefault(styles.desktop, "");
            } else if (width < breakpoints.desktopLg) {
                desktopLg = getValueOrDefault(styles.desktopLg, "");
            }

            setClasses(
                twMerge(
                    getValueOrDefault(styles.main, ""),
                    phone,
                    tablet,
                    desktop,
                    desktopLg
                )
            );
        }
    }, [width, styles]);

    return classes;
};
