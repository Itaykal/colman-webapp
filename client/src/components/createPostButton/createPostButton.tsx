import { FloatButton, GetProp, Input, Upload, UploadFile, UploadProps, Modal, Image, AutoComplete, AutoCompleteProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import * as breedService from "../../services/breedService"
import './createPostButton.scss'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export default function CreatePostButton() {
    // const dogBreeds = useDogBreeds()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [title, setTitle] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [dogBreed, setDogBreed] = useState<string>();
    const [breedsOptions, setBreedsOptions] = useState<AutoCompleteProps['options']>([]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleBreedSearch = async (text: string) => {
        const breeds = await breedService.searchBreed(text)
        setBreedsOptions(breeds.map(breed => {return {value: breed}}))
    }

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    return (
        <>
            <FloatButton icon={<PlusOutlined />} onClick={showModal} />
            <Modal
                title="Create post"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}>
                <div className="modal-content-wrapper">
                    <div className="modal-content">
                        <Input placeholder="Title" className="input" onChange={e => {setTitle(e.target.value)}}/>
                        <TextArea rows={4} placeholder="Description" className="input" onChange={e => {setDescription(e.target.value)}}/>
                        <AutoComplete placeholder="Dog Breed" options={breedsOptions} onSearch={handleBreedSearch} className="input" onSelect={setDogBreed}/>
                        <Upload
                            onChange={e => {setFileList(e.fileList)}}
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            accept=".jpeg,.png,.jpg"
                        >
                            {fileList.length >= 1 ? null : uploadButton}
                        </Upload>
                        {previewImage && (
                            <Image
                                wrapperStyle={{ display: 'none' }}
                                preview={{
                                    visible: previewOpen,
                                    onVisibleChange: (visible) => setPreviewOpen(visible),
                                    afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                }}

                                src={previewImage}
                            />
                        )}
                    </div>
                </div>
            </Modal>
        </>
    )
}