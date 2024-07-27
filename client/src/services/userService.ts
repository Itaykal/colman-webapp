import axios from "axios";
import User from "../models/user";
import { Token } from "../hooks/useSessionToken";

export const getUser = async (userId: string): Promise<User> => {
    await new Promise(f => setTimeout(f, 1000));
    return {
        email: "userId@gmail.com",
        avatar: `https://robohash.org/${userId}.png?size=200x200`,
        username: userId,
        _id: userId
    };
    const response = await axios.get(`"/api/users/${userId}"`)
    return response.data;
}