import axios from "axios";
import User from "../models/user";

export const getUser = async (userId: string): Promise<User> => {
    await new Promise(f => setTimeout(f, 1000));
    return {
        first: "Your",
        last: "Name",
        avatar: "https://robohash.org/you.png?size=200x200",
        handle: userId,
        id: userId
      };
    const response = await axios.get(`"/api/users/${userId}"`)
    return response.data;
}