import { useEffect, useMemo, useState } from "react";
import apiClient from "../services/apiClient";
import { jwtDecode } from "jwt-decode";
import User from "../models/user";

export interface Token {
    accessToken: string,
    refreshToken: string
}

export interface JwtPayload extends User {
    iat: number,
    exp: number
}


const setSessionToken = (token: Token) => {
    const tokenString = JSON.stringify(token)
    sessionStorage.setItem('token', tokenString);
}

const getSessionToken = (): Token | null => {
    const tokenString = sessionStorage.getItem('token');
    if (!tokenString) return null;
    return JSON.parse(tokenString);
}

const deleteSessionToken = () => {
    sessionStorage.removeItem('token');
}

const useSessionToken = () => {
    const [token, setToken] = useState<Token | null>(() => {
        const initialValue = getSessionToken();
        return initialValue || null;
    });

    useEffect(() => {
        if (token) {
            apiClient.defaults.headers.common["Authorization"] = "Bearer " + token.accessToken;
            setSessionToken(token)
        } else {
            delete apiClient.defaults.headers.common["Authorization"];
            deleteSessionToken()
        }
    }, [token]);

    const decodedToken: JwtPayload | null = useMemo(() => {
        if (!token?.accessToken) return null
        return jwtDecode<JwtPayload>(token.accessToken)
    }, [token?.accessToken])

    return { token, setToken, decodedToken };
};

export default useSessionToken;
