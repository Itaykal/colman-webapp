import UserModel from "../models/user";
import PostModel from "../models/post";
import PostsList from "../components/postsList/postsList";
import "../styles/profile.scss"
import { useLoaderData } from "react-router-dom";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import { useCallback, useEffect, useState } from "react";
import * as postsService from "../services/postsService"
import * as userService from "../services/userService"


export default function Profile() {
  const { userId } = useLoaderData() as { userId: string };
  const [posts, setPosts] = useState<PostModel[]>([])
  const [user, setUser] = useState<UserModel>()

  const fetchPosts = useCallback(async () => {
    if (!userId) {
      return;
    }
    const [newPosts, newUser] = await Promise.all([postsService.getPosts(userId), userService.getUser(userId)])
    setUser(newUser)
    setPosts(newPosts)
  }, [userId])

  const fetchUser = useCallback(async () => {
    if (!userId) {
      return;
    }

  }, [userId])


  useEffect(() => { fetchPosts() }, [fetchPosts])
  useEffect(() => { fetchUser() }, [fetchUser])

  return (
    <div className="profile">
      {!user ? null :
        <Card
          className="user-info"
          cover={<img src={user.avatar ||
            `https://robohash.org/${user.first}.png?size=200x200`}></img>}
        >
          <Meta
            title={`${user.first} ${user.last}`}
            description={<a
              target="_blank"
              href={`https://twitter.com/${user.handle}`}
            >
              {user.handle}
            </a>}
          />
        </Card>
      }
      <PostsList posts={posts} />
    </div >
  );
}

