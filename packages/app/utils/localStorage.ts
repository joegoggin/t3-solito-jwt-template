import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeUserDataLocally = async (id: string, token: string) => {
    if (Platform.OS === "web") {
        localStorage.setItem("token", token);
        localStorage.setItem("userId", id);
    } else {
        try {
            await AsyncStorage.setItem("token", token);
            await AsyncStorage.setItem("userId", id);
        } catch (error) {
            throw error;
        }
    }

    return true;
};

export const getLocalUserData = async () => {
    let token: string | null = null;
    let userId: string | null = null;

    if (Platform.OS === "web") {
        token = localStorage.getItem("token");
        userId = localStorage.getItem("userId");
    } else {
        try {
            token = await AsyncStorage.getItem("token");
            userId = await AsyncStorage.getItem("userId");
        } catch (error) {
            throw error;
        }
    }

    return { token, userId };
};

export const clearLocalUserData = async () => {
    if (Platform.OS === "web") {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
    } else {
        try {
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("userId");
        } catch (error) {
            throw error;
        }
    }

    return true;
};
