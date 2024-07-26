import User from "../models/user";

export async function loader({ params: { userHandle } }: { params: { userHandle: string } }): Promise<{ user: User; }> {
    const user = {
      first: "Your",
      last: "Name",
      avatar: "https://robohash.org/you.png?size=200x200",
      handle: userHandle,
    }
    return { user };
  }
  