import { Input, Modal } from "antd";
import { useState } from "react";
import './editProfileModal.scss'
import UploadImage from "../uploadImage/uploadImage";
import User from "../../models/user";

type EditProfileModalProps = {
    handleOk: (username: string, file?: File) => Promise<void>,
    handleCancel: () => void,
    isModalOpen: boolean,
    profile: User
}

export default function EditProfileModal({ handleOk, handleCancel, isModalOpen, profile }: EditProfileModalProps) {
    const [file, setFile] = useState<File>();
    const [username, setUsername] = useState<string>(profile.username);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const onOk = async () => {
        setConfirmLoading(true)
        await handleOk(username, file)
        setFile(undefined)
        setUsername("")
        setConfirmLoading(false)
    }

    return (
        <>
            <Modal
                title="Edit Profile"
                onOk={onOk}
                onCancel={handleCancel}
                open={isModalOpen}
                okButtonProps={{ disabled: !file && username == profile.username }}
                confirmLoading={confirmLoading}
            >
                <div className="modal-content-wrapper">
                    <div className="modal-content">
                        <Input value={username} placeholder="Username" className="input" onChange={e => { setUsername(e.target.value) }} />
                        <UploadImage style={{ color: "white" }} onSelect={setFile}></UploadImage>
                    </div>
                </div>
            </Modal>
        </>
    )
}