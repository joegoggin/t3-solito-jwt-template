import {
    clearLocalUserData,
    storeUserDataLocally,
    getLocalUserData,
} from "app/utils/localStorage";
import { api } from "app/utils/trpc";
import {
    type ReactNode,
    createContext,
    useContext,
    useState,
    useEffect,
} from "react";
import { Role } from "server/models/enums/Role";
import { User } from "server/models/schemas/User";
import { setAuthToken } from "../trpc/TRPCProvider";

type UserData = {
    userId: string;
    token: string;
};

type UserContext = {
    user: User | null;
    token: string | null;
    role: Role | null;
    setUserData: (userData: UserData) => void;
    clearUserData: () => void;
};

const UserCtx = createContext<UserContext>({
    user: null,
    token: null,
    role: null,
    setUserData: () => { },
    clearUserData: () => { },
});

export const useUser = () => useContext(UserCtx);

const UserContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [role, setRole] = useState<Role | null>(null);
    const [userId, setUserId] = useState<string>("");

    // queries
    const { data: fetchedUser, refetch } = api.user.getUser.useQuery({
        userId,
    });

    // functions
    const setUserData = (userData: UserData) => {
        setUserId(userData.userId);
        setToken(userData.token);
        setAuthToken(userData.token);
        storeUserDataLocally(userData.userId, userData.token);
    };

    const clearUserData = () => {
        setUserId("");
        setToken(null);
        setUser(null);
        clearLocalUserData();
    };

    // effects
    useEffect(() => {
        const init = async () => {
            const userData = await getLocalUserData();

            if (userData.userId && userData.token) {
                setUserId(userData.userId);
                setToken(userData.token);
                setAuthToken(userData.token);
            }
        };

        init();
    }, []);

    useEffect(() => {
        if (fetchedUser) {
            setUser(fetchedUser);
            setRole(fetchedUser.role as Role);
        }
    }, [fetchedUser]);

    useEffect(() => {
        refetch();
    }, [userId]);

    return (
        <UserCtx.Provider
            value={{ user, token, role, setUserData, clearUserData }}
        >
            {children}
        </UserCtx.Provider>
    );
};

export default UserContextProvider;
