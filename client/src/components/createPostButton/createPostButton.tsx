import { FloatButton, GetProp, Input, Upload, UploadFile, UploadProps, Modal, Image, AutoComplete, AutoCompleteProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import * as breedService from "../../services/breedService"
import './createPostButton.scss'
import UploadImage from "../uploadImage/uploadImage";

export default function CreatePostButton() {
    // const dogBreeds = useDogBreeds()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [file, setFile] = useState<UploadFile>([]);
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

    const handleBreedSearch = async (text: string) => {
        const breeds = await breedService.searchBreed(text)
        setBreedsOptions(breeds.map(breed => {return {value: breed}}))
    }

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
                        <UploadImage style={{color: "white"}} onUpload={setFile}></UploadImage>
                    </div>
                </div>
            </Modal>
        </>
    )
}