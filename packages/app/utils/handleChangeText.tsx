import { SetValue } from "app/types/SetValue";

export const handleChangeText =
    (setState: SetValue<any>) => (enteredText: string) => {
        setState(enteredText);
    };
