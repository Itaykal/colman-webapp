import User from "../models/user";
import apiClient from "./apiClient";

export const getUser = async (userId: string): Promise<User> => {
    const response = await apiClient.get(`/api/profile/${userId}`)
    return response.data;
}