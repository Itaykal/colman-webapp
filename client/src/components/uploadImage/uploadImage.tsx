import { PlusOutlined } from "@ant-design/icons";
import { GetProp, Upload, UploadFile, UploadProps, Image } from "antd"
import { useState } from "react";
import "./uploadImage.scss"

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export default function UploadImage({ onUpload, style }: { onUpload: (file: UploadFile) => void, style: React.CSSProperties }) {
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const uploadButton = (
        <button className="upload-button" type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    return (
        <>
            <Upload
                style={style}
                onChange={e => {
                    setFileList(e.fileList);
                    onUpload(e.fileList[0])
                }}
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                accept=".jpeg,.png,.jpg"
            >
                {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            {
                previewImage && (
                    <Image
                        wrapperStyle={{ display: 'none' }}
                        preview={{
                            visible: previewOpen,
                            onVisibleChange: (visible) => setPreviewOpen(visible),
                            afterOpenChange: (visible) => !visible && setPreviewImage(''),
                        }}

                        src={previewImage}
                    />
                )
            }
        </>
    )
}