import { useCallback, useEffect, useState } from "react";
import User from "../models/user";
import useSessionToken from "./useSessionToken";

const useUserSyncing = () => {
    const { decodedToken } = useSessionToken();
    const [user, setUser] = useState<User>();

    const fetchUser = useCallback(async () => {
        if (!decodedToken) return;
        setUser(decodedToken)
    }, [decodedToken])

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return { user };
};

export default useUserSyncing;
