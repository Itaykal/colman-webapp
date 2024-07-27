import { FloatButton, GetProp, UploadProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import CreatePostModal from "../createPostModal/createPostModel";
import * as postsService from "../../services/postsService"

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export default function CreatePostButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async (file: FileType, title: string, description: string, dogBreedID: string) => {
        await postsService.createPost(file, title, description, dogBreedID);
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