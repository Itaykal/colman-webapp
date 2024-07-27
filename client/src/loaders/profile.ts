import User from "../models/user";
import * as UserService from "../services/userService"

export function loader({ params: { userId } }: { params: { userId: string } }): { userId: string; } {
    return {userId: userId}
  }
  