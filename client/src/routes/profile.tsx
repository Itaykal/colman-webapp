import UserModel from "../models/user";
import PostModel from "../models/post";
import PostsList from "../components/postsList/postsList";
import "../styles/profile.scss"
import { Card, Flex, Spin } from "antd";
import Meta from "antd/es/card/Meta";
import { useCallback, useEffect, useState } from "react";
import * as postsService from "../services/postsService"
import * as userService from "../services/userService"
import CreatePostButton from "../components/createPostButton/createPostButton";
import useUserSyncing from "../hooks/useUserSyncing";
import { EditOutlined } from "@ant-design/icons";
import EditProfileModal from "../components/editProfileModal/editProfileModal";
import { useNavigate, useParams } from "react-router-dom";


export default function Profile() {
  const navigate = useNavigate()
  const { userId } = useParams()
  const [posts, setPosts] = useState<PostModel[] | null>(null)
  const [user, setUser] = useState<UserModel>()
  const [modalVisible, setModalVisible] = useState(false)
  const { user: loggedUser } = useUserSyncing()

  useEffect(() => {
    if (!userId) navigate("/")
  })

  const openModal = () => {
    setModalVisible(true)
  }

  const handleModalOk = async (username: string, profilePicture?: File) => {
    const newUser = await userService.editUser(username, profilePicture)
    setModalVisible(false)
    setUser(newUser)
  }

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
              title={<Flex justify="space-between">
                {user.email} <EditOutlined onClick={openModal} />
              </Flex>}
              description={<a
                target="_blank"
                href={`https://twitter.com/${user.username}`}
              >
                {user.username}
              </a>}
            />
          </Card>
          <PostsList refreshPosts={fetchData} posts={posts} />
          {loggedUser?._id == user._id && <>
            <CreatePostButton refreshPosts={fetchData} />
            {modalVisible && <EditProfileModal
              isModalOpen={modalVisible}
              handleCancel={() => setModalVisible(false)}
              handleOk={handleModalOk}
              profile={user}
            ></EditProfileModal>}
          </>
          }

        </div>
      }
    </ >
  );
}

