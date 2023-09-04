import {
    clearLocalToken,
    storeTokenLocally,
    getLocalToken,
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
    isInit: boolean;
    setUserData: (userData: UserData) => void;
    clearUserData: () => void;
};

const UserCtx = createContext<UserContext>({
    user: null,
    token: null,
    role: null,
    isInit: false,
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
    const [isInit, setIsInit] = useState<boolean>(false);

    // queries
    const { data: fetchedUser } = api.user.getUser.useQuery({
        userId,
    });

    // mutations
    const verifyToken = api.auth.verifyToken.useMutation();

    // functions
    const setUserData = (userData: UserData) => {
        setUserId(userData.userId);
        setToken(userData.token);
        setAuthToken(userData.token);
        storeTokenLocally(userData.token);
    };

    const clearUserData = () => {
        setUserId("");
        setToken(null);
        setUser(null);
        clearLocalToken();
    };

    // effects
    useEffect(() => {
        const init = async () => {
            try {
                const token = await getLocalToken();

                if (token) {
                    const { userId: fetchedUserId } =
                        await verifyToken.mutateAsync({
                            token,
                        });
                    if (fetchedUserId) {
                        setUserId(fetchedUserId);
                        setToken(token);
                        setAuthToken(token);
                    } else {
                        clearUserData();
                    }
                }

                setIsInit(true);
            } catch (error) {
                console.error(error);
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

    return (
        <UserCtx.Provider
            value={{ user, token, role, isInit, setUserData, clearUserData }}
        >
            {children}
        </UserCtx.Provider>
    );
};

export default UserContextProvider;
