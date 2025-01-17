import { Modal } from "antd";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import './createCommentModal.scss'
import Comment from "../../models/comment";

type CreateCommentModalProps = {
    handleOk: (body: string) => Promise<void>,
    handleCancel: () => void,
    isModalOpen: boolean,
    initialComment?: Comment
}

export default function CreateCommentModal({ handleOk, handleCancel, isModalOpen, initialComment }: CreateCommentModalProps) {
    const [body, setBody] = useState<string>(initialComment?.body || "");
    const [confirmLoading, setConfirmLoading] = useState(false);

    const onOk = async () => {
        setConfirmLoading(true)
        await handleOk(body) 
        setBody("")
        setConfirmLoading(false)
    }

    return (
        <>
            <Modal
                title="Create comment"
                onOk={onOk}
                onCancel={handleCancel}
                open={isModalOpen}
                okButtonProps={{ disabled: body.length == 0 }}
                confirmLoading={confirmLoading}
            >
                <div className="modal-content-wrapper">
                    <div className="modal-content">
                        <TextArea value={body} rows={4} placeholder="Body" className="input" onChange={e => { setBody(e.target.value) }} />
                    </div>
                </div>
            </Modal>
        </>
    )
}