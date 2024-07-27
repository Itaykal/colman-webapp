import { FloatButton, GetProp, UploadProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import CreatePostModal from "../createPostModal/createPostModel";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export default function CreatePostButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const post = (file: FileType, title: string, description: string, dogBreedID: string) => {
        console.log(file, title, description, dogBreedID)
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = (file: FileType, title: string, description: string, dogBreedID: string) => {
        post(file, title, description, dogBreedID);
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <FloatButton icon={<PlusOutlined />} onClick={showModal} />
            {isModalOpen && (<CreatePostModal handleCancel={handleCancel} handleOk={handleOk} isModalOpen={isModalOpen} />)}
        </>
    )
}