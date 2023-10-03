import { Card, Layout } from "app/ui/layout";
import { View } from "app/ui/view";
import { TextInput } from "app/ui/inputs";
import React, { useEffect, useState } from "react";
import { Button } from "app/ui/buttons";
import { handleChangeText } from "app/utils/handleChangeText";
import { api } from "app/utils/trpc";
import { useUser } from "app/provider/context/UserContextProvider";
import { useIsClaim } from "app/utils/hooks/params/useIsClaim";
import { H1 } from "app/ui/typography";
import { authFormStyles as styles } from "app/constants/styles";

const VerifyCode: React.FC = () => {
    // state
    const [authCode, setAuthCode] = useState<string>("");
    const [isClaim, setIsClaim] = useState<boolean>(false);

    // params
    const isClaimParam = useIsClaim();

    // context
    const { setUserData } = useUser();

    // mutations
    const verifyAuthCode = api.auth.verifyAuthCode.useMutation();

    // effects
    useEffect(() => {
        if (isClaimParam) {
            setIsClaim(JSON.parse(isClaimParam));
        }
    }, [isClaimParam]);

    // event handlers
    const handleClaimAccount = async () => {
        try {
            const userData = await verifyAuthCode.mutateAsync({ authCode });

            setUserData(userData);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Layout>
            <Card>
                <H1 styles={styles.title}>
                    {isClaim ? "Claim Account" : "Reset Password"}
                </H1>
                <View styles={styles.form}>
                    <TextInput
                        value={authCode}
                        onChangeText={handleChangeText(setAuthCode)}
                        placeholder="Authentication Code"
                    />
                </View>
                <View styles={styles.btnContainer}>
                    <Button
                        text={isClaim ? "Claim Account" : "Reset Password"}
                        onPress={handleClaimAccount}
                    />
                </View>
            </Card>
        </Layout>
    );
};

export default VerifyCode;
