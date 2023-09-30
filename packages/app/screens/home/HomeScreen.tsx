import { Layout } from "app/ui/layout";
import { H1 } from "app/ui/typography";
import React from "react";
import { StyleSheet } from "app/utils/hooks/getClasses";

const HomeScreen: React.FC = () => {
    // styles
    const styles = {
        title: {
            main: "text-blue-500 text-center",
            phoneSm: "text-2xl",
            phone: "text-3xl",
            tablet: "text-4xl",
        },
    } satisfies StyleSheet;

    return (
        <Layout>
            <H1 styles={styles.title}>Emensia</H1>
        </Layout>
    );
};

export default HomeScreen;
