import { FloatButton, GetProp, UploadProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import CreatePostModal from "../createPostModal/createPostModel";
import * as postsService from "../../services/postsService"

File
export default function CreatePostButton({ refreshPosts }: { refreshPosts: () => void}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async (file: File, title: string, body: string, dogBreedID: string) => {
        await postsService.createPost(file, title, body, dogBreedID);
        refreshPosts()
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <FloatButton icon={<PlusOutlined />} onClick={showModal} />
            <CreatePostModal handleCancel={handleCancel} handleOk={handleOk} isModalOpen={isModalOpen} />
        </>
    )
}