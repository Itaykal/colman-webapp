

import { Avatar, List } from "antd";
import { Link } from "react-router-dom";
import CommentModel from "../../models/comment"
import User from "../../models/user";
import { useCallback, useEffect, useState } from "react";
import * as userService from "../../services/userService"

export default function Comment({ comment, }: { comment: CommentModel, }) {
    const [author, setAuthor] = useState<User>();

    const fetchData = useCallback(async () => {
        const newAuthor = await userService.getUser(comment.authorID);
        setAuthor(newAuthor)
    }, [comment.authorID])

    useEffect(() => { fetchData() }, [fetchData])
    return (
        <List.Item>
            <List.Item.Meta
                avatar={<Avatar src={author?.avatar} />}
                title={<Link to={`/profile/${author?._id}`}>{author?.username}</Link>}
            />
            {comment.body}
        </List.Item>
    )
}