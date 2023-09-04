import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeTokenLocally = async (token: string) => {
    if (Platform.OS === "web") {
        localStorage.setItem("token", token);
    } else {
        try {
            await AsyncStorage.setItem("token", token);
        } catch (error) {
            throw error;
        }
    }

    return true;
};

export const getLocalToken = async () => {
    let token: string | null = null;

    if (Platform.OS === "web") {
        token = localStorage.getItem("token");
    } else {
        try {
            token = await AsyncStorage.getItem("token");
        } catch (error) {
            throw error;
        }
    }

    return token;
};

export const clearLocalToken = async () => {
    if (Platform.OS === "web") {
        localStorage.removeItem("token");
    } else {
        try {
            await AsyncStorage.removeItem("token");
        } catch (error) {
            throw error;
        }
    }

    return true;
};
