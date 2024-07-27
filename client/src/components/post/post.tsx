import { Avatar, Card, Flex } from "antd";
import Meta from "antd/es/card/Meta";
import './post.scss'
import { Link, useNavigate } from "react-router-dom";
import PostModel from "../../models/post"
import { CommentOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import * as breedService from "../../services/breedService"
import Breed from "../../models/breed";

export default function Post({ post, }: { post: PostModel, }) {
    const navigate = useNavigate()
    const [breed, setBreed] = useState<Breed>()

    const fetchData = useCallback(async () => {
        const newBreed = await breedService.getBreed(post.breedId);
        setBreed(newBreed)
    }, [post.breedId])

    useEffect(() => { fetchData() }, [fetchData])

    return (
        <Card
            className="post"
            bordered={false}
            cover={<img alt="example" src={post.imageURL} />}
            hoverable
            onClick={() => { navigate(`/post/${post._id}`) }}
        >
            <Meta
                title={<>
                    {post.title}<br />
                    <Flex justify="space-between">
                        <Link to={`/breed/${post.breedId}`}>{breed?.attributes.name}</Link>
                        <div>{post.commentsCount}<CommentOutlined /></div>
                    </Flex >
                </>}
                description={`${post.description}\n${post.description}`}
                avatar={
                    <Link to={`/profile/${post.authorId}`}>
                        <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                    </Link>
                }
            />
        </Card>
    )
}