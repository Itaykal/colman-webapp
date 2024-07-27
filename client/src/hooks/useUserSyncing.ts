import { useCallback, useEffect, useState } from "react";
import User from "../models/user";
import useSessionToken from "./useSessionToken";
import * as userService from "../services/userService"

const useUserSyncing = () => {
    const { decodedToken, setToken } = useSessionToken();
    const [user, setUser] = useState<User>();

    const fetchUser = useCallback(async () => {
        if (!decodedToken) return;
        const user = await userService.getUser(decodedToken._id)
        setUser(user)
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
