import { Avatar, Card, Flex } from "antd";
import Meta from "antd/es/card/Meta";
import './post.scss'
import { Link, useNavigate } from "react-router-dom";
import PostModel from "../../models/post"
import { CommentOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import * as breedService from "../../services/breedService"
import Breed from "../../models/breed";
import * as userService from "../../services/userService"
import User from "../../models/user";

export default function Post({ post, }: { post: PostModel, }) {
    const navigate = useNavigate()
    const [breed, setBreed] = useState<Breed>()
    const [author, setAuthor] = useState<User>()

    const fetchData = useCallback(async () => {
        const newBreed = await breedService.getBreed(post.breedId);
        setBreed(newBreed)
    }, [post.breedId])

    useEffect(() => { fetchData() }, [fetchData])

    const fetchAuthor = useCallback(async () => {
        const newAuthor = await userService.getUser(post.authorID);
        setAuthor(newAuthor)
    }, [post.authorID])

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
                    {post.title}<br />
                    <Flex justify="space-between">
                        <Link to={`/breed/${post.breedId}`}>{breed?.attributes.name}</Link>
                        <div>{post.comments}<CommentOutlined /></div>
                    </Flex >
                </>}
                description={post.body}
                avatar={
                    <Link to={`/profile/${author?._id}`}>
                        <Avatar src={author?.avatar}/>
                    </Link>
                }
            />
        </Card>
    )
}