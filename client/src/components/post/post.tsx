import { Avatar, Card, Flex } from "antd";
import Meta from "antd/es/card/Meta";
import './post.scss'
import { Link, useNavigate } from "react-router-dom";
import PostModel from "../../models/post"
import { CommentOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import * as breedService from "../../services/breedService"
import Breed from "../../models/breed";
import * as userService from "../../services/userService"
import * as postsService from "../../services/postsService"
import User from "../../models/user";
import useUserSyncing from "../../hooks/useUserSyncing";
import CreatePostModal from "../createPostModal/createPostModel";

export default function Post({ post, refreshPosts}: { post: PostModel, refreshPosts: () => void}) {
    const navigate = useNavigate()
    const [breed, setBreed] = useState<Breed>()
    const [author, setAuthor] = useState<User>()
    const [modalVisible, setModalVisible] = useState(false)
    const { user } = useUserSyncing()

    const fetchData = useCallback(async () => {
        const newBreed = await breedService.getBreed(post.breedId);
        setBreed(newBreed)
    }, [post.breedId])

    useEffect(() => { fetchData() }, [fetchData])

    const fetchAuthor = useCallback(async () => {
        const newAuthor = await userService.getUser(post.authorID);
        setAuthor(newAuthor)
    }, [post.authorID])

    const handleModalOk = async (title: string, body: string, dogBreedID: string, file?: File) => {
        await postsService.editPost(post._id, title, body, dogBreedID, file);
        refreshPosts()
        setModalVisible(false);
    }

    useEffect(() => { fetchData() }, [fetchData])
    useEffect(() => { fetchAuthor() }, [fetchAuthor])

    return (
        <Card
            className="post"
            bordered={false}
            cover={<img onClick={() => { navigate(`/post/${post._id}`) }} alt="example" src={post.imageUrl} />}
            hoverable

        >
            <Meta
                title={<>
                    <Flex justify="space-between">
                        <span style={{ fontWeight: 500 }}>{post.title}</span>
                        <span>{
                            user?._id == author?._id && <EditOutlined onClick={() => setModalVisible(true)}/> 
                        }
                        {
                            user?._id == author?._id && <DeleteOutlined onClick={() => {
                                postsService.deletePost(post._id)
                                refreshPosts()
                            }}/>
                        }</span>
                        {
                            modalVisible && <CreatePostModal
                            allowEmptyFile={true}
                            handleOk={handleModalOk}
                            handleCancel={() => setModalVisible(false)}
                            isModalOpen={modalVisible}
                            initialPost={post}
                            initialBreed={breed?.attributes.name}
                        />
                        }
                    </Flex>
                    <Flex justify="space-between">
                        <Link to={`/breed/${post.breedId}`}>{breed?.attributes.name}</Link>
                        <span>{post.comments}<CommentOutlined style={{marginLeft: "2px"}} /></span>
                    </Flex >
                </>}
                description={post.body}
                avatar={
                    <Link to={`/profile/${author?._id}`}>
                        <Avatar src={author?.avatar} />
                    </Link>
                }
            />
        </Card>
    )
}