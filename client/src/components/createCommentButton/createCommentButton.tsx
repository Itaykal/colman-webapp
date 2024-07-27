import { FloatButton } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import CreateCommentModal from "../createCommentModal/createCommentModel";
import * as postsService from "../../services/postsService"

export default function CreateCommentButton({ postId, refreshComments }: { postId: string, refreshComments: () => void}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async (body: string) => {
        await postsService.createComment(postId, body);
        refreshComments()
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <FloatButton icon={<PlusOutlined />} onClick={showModal} />
            <CreateCommentModal handleCancel={handleCancel} handleOk={handleOk} isModalOpen={isModalOpen} />
        </>
    )
}