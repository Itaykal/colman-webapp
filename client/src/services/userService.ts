import { GetProp, UploadProps } from "antd";
import { Token } from "../hooks/useSessionToken";
import User from "../models/user";
import apiClient from "./apiClient";
import * as fileService from "./fileService"

export const getUser = async (userId: string): Promise<User> => {
    const response = await apiClient.get(`/api/profile/${userId}`)
    return response.data;
}

export const login = async (username: string, password: string): Promise<Token> => {
    const response = await apiClient.post("/api/auth/login", { username, password })
    return response.data
}

export const register = async (username: string, password: string, email: string, profilePicture: File): Promise<Token> => {
    const imageUrl = await fileService.uploadFile(profilePicture)
    const response = await apiClient.post("/api/auth/register", { username, password, email, avatar: imageUrl })
    return response.data
}