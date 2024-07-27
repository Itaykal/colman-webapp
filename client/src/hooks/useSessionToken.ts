import { useMemo, useState } from "react";
import apiClient from "../services/apiClient";
import { jwtDecode } from "jwt-decode";
import User from "../models/user";

export interface Token {
    token: string,
    refreshToken: string,
    expires: number
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

let timeout: ReturnType<typeof setTimeout> | null;

const useSessionToken = () => {
    const [token, setToken_] = useState<Token | null>(() => {
        const initialValue = getSessionToken();
        return initialValue || null;
    });

    const setToken = (value: Token | null) => {
        if (timeout) {
            clearTimeout(timeout)
        }
        setToken_(value)
        if (value) {
            timeout = setTimeout(()=>{}, value.expires)
            apiClient.defaults.headers.common["Authorization"] = "Bearer " + value.token;
            setSessionToken(value)
        } else {
            delete apiClient.defaults.headers.common["Authorization"];
            deleteSessionToken()
        }
    }

    const decodedToken: JwtPayload | null = useMemo(() => {
        if (!token?.token) return null
        return jwtDecode<JwtPayload>(token.token)
    }, [token?.token])

    return { token, setToken, decodedToken };
};

export default useSessionToken;
