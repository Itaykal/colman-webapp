import { useCallback, useEffect, useState } from "react";
import User from "../models/user";
import useSessionToken from "./useSessionToken";

const useUserSyncing = () => {
    const { decodedToken, setToken } = useSessionToken();
    const [user, setUser] = useState<User>();

    const fetchUser = useCallback(async () => {
        if (!decodedToken) return;
        setUser(decodedToken)
    }, [decodedToken])

    const logout = () => {
        setToken(null)
    }

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return { user, logout };
};

export default useUserSyncing;
