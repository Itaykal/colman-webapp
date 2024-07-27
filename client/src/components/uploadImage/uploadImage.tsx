import { PlusOutlined } from "@ant-design/icons";
import { GetProp, Upload, UploadProps, Image, Space } from "antd"
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

export default function UploadImage(
    { onSelect, style, uploadText }: { onSelect: (file: FileType) => void, style: React.CSSProperties, uploadText?: string }
) {
    const handlePreview = async (file: FileType) => {
        const b64File = await getBase64(file);
        setPreviewImage(b64File);
    };
    const [previewImage, setPreviewImage] = useState('');

    const uploadButton = (
        <button className="upload-button" type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>{uploadText || "Upload"}</div>
        </button>
    );

    return (
        <>
            <Space><Upload
                style={style}
                beforeUpload={async e => {
                    handlePreview(e)
                    onSelect(e)
                    return false;
                }}
                listType="picture-card"
                fileList={[]}
                accept=".jpeg,.png,.jpg"
                maxCount={1}
            >
                {uploadButton}
            </Upload>
            {
                previewImage && (
                    <Image
                    width={102}
                    height={102}
                        src={previewImage}
                    />
                )
            }</Space>
        </>
    )
}