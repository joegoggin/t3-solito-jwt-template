import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { getValueOrDefault } from "app/utils/getValueOrDefault";
import useDimensions from "./useDimensions";

export type Styles = {
    main?: string;
    phoneSm?: string;
    phone?: string;
    tablet?: string;
    desktop?: string;
    desktopLg?: string;
};

export type StyleSheet = {
    [key: string]: Styles;
};

export type Styled = {
    styles?: Styles;
};

export const breakpoints = {
    phoneSm: 300,
    phone: 480,
    tablet: 770,
    desktop: 1024,
};

export const getClasses = (styles: Styles | undefined) => {
    // state
    const [classes, setClasses] = useState<string>("");

    // context
    const { width } = useDimensions();

    // effects
    useEffect(() => {
        if (styles) {
            let phoneSm = "";
            let phone = "";
            let tablet = "";
            let desktop = "";
            let desktopLg = "";

            if (width < breakpoints.phoneSm) {
                if (styles.phone && !styles.phoneSm) {
                    phoneSm = styles.phone;
                } else {
                    phoneSm = getValueOrDefault(styles.phoneSm, "");
                }
            } else if (width < breakpoints.phone) {
                phone = getValueOrDefault(styles.phone, "");
            } else if (width < breakpoints.tablet) {
                tablet = getValueOrDefault(styles.tablet, "");
            } else if (width < breakpoints.desktop) {
                desktop = getValueOrDefault(styles.desktop, "");
            } else {
                if (styles.desktop && !styles.desktopLg) {
                    desktopLg = getValueOrDefault(styles.desktop, "");
                } else {
                    desktopLg = getValueOrDefault(styles.desktopLg, "");
                }
            }

            setClasses(
                twMerge(
                    getValueOrDefault(styles.main, ""),
                    phoneSm,
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
