import UserModel from "../models/user";
import PostModel from "../models/post";
import PostsList from "../components/postsList/postsList";
import "../styles/profile.scss"
import { useLoaderData } from "react-router-dom";
import { Card, Spin } from "antd";
import Meta from "antd/es/card/Meta";
import { useCallback, useEffect, useState } from "react";
import * as postsService from "../services/postsService"
import * as userService from "../services/userService"


export default function Profile() {
  const { userId } = useLoaderData() as { userId: string };
  const [posts, setPosts] = useState<PostModel[] | null>(null)
  const [user, setUser] = useState<UserModel>()

  const fetchData = useCallback(async () => {
    if (!userId) {
      return;
    }
    const [newPosts, newUser] = await Promise.all([postsService.getPosts(userId), userService.getUser(userId)])
    setUser(newUser)
    setPosts(newPosts)
  }, [userId])

  useEffect(() => { fetchData() }, [fetchData])

  return (
    <>
      {!user || posts === null ? (<Spin />) :
        <div className="profile">
          <Card
            className="user-info"
            cover={<img src={user.avatar ||
              `https://robohash.org/${user.username}.png?size=200x200`}></img>}
          >
            <Meta
              title={`${user.email}`}
              description={<a
                target="_blank"
                href={`https://twitter.com/${user.username}`}
              >
                {user.username}
              </a>}
            />
          </Card>
          <PostsList posts={posts} />
        </div>
      }
    </ >
  );
}

