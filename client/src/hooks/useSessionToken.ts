import { useMemo, useState } from "react";
import apiClient from "../services/apiClient";
import { jwtDecode } from "jwt-decode";
import User from "../models/user";
import * as userService from "../services/userService"

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
        if (initialValue) {
            apiClient.defaults.headers.common["Authorization"] = "Bearer " + initialValue.token;
        }
        return initialValue || null;
    });

    const setToken = (value: Token | null) => {
        if (value) {
            apiClient.defaults.headers.common["Authorization"] = "Bearer " + value.token;
            setSessionToken(value)
        } else {
            delete apiClient.defaults.headers.common["Authorization"];
            deleteSessionToken()
        }
        setToken_(value)
    }

    const decodedToken: JwtPayload | null = useMemo(() => {
        if (!token?.token) return null
        const payload = jwtDecode<JwtPayload>(token.token)
        if (timeout) {
            clearTimeout(timeout)
        }
        timeout = setTimeout(async () => {
            const newToken = await userService.refresh(token.refreshToken)
            setToken(newToken)
        }, payload.exp * 1000 - new Date().getTime())
        return payload
    }, [token?.token])

    return { token, setToken, decodedToken };
};

export default useSessionToken;
