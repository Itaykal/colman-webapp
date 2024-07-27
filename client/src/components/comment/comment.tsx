

import { Avatar, Flex, List } from "antd";
import { Link } from "react-router-dom";
import CommentModel from "../../models/comment"
import User from "../../models/user";
import { useCallback, useEffect, useState } from "react";
import * as userService from "../../services/userService"
import * as postService from "../../services/postsService"
import useUserSyncing from "../../hooks/useUserSyncing";
import { EditOutlined } from "@ant-design/icons";
import CreateCommentModal from "../createCommentModal/createCommentModel";

export default function Comment({ comment, refreshComments }: { comment: CommentModel, refreshComments: () => void}) {
    const [author, setAuthor] = useState<User>();
    const { user } = useUserSyncing()

    const fetchData = useCallback(async () => {
        const newAuthor = await userService.getUser(comment.authorID);
        setAuthor(newAuthor)
    }, [comment.authorID])
    const [modalVisible, setModalVisible] = useState(false);

    const handleModalOk = async (newBody: string) => {
        await postService.editComment(comment._id, newBody)
        refreshComments()
        setModalVisible(false)
    }


    useEffect(() => { fetchData() }, [fetchData])
    return (
        <List.Item>
            <List.Item.Meta
                avatar={<Avatar src={author?.avatar} />}
                title={<Flex justify="space-between">
                    <Link to={`/profile/${author?._id}`}>{author?.username}</Link>
                    { author?._id == user?._id && <EditOutlined onClick={() => setModalVisible(true)} /> }
                  </Flex>}
            />
            {comment.body}
            {modalVisible && <CreateCommentModal
            handleCancel={() => setModalVisible(false)}
            handleOk={handleModalOk}
            initialComment={comment}
            isModalOpen={modalVisible}
            />}
        </List.Item>
    )
}