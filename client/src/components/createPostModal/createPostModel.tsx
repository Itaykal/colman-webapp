import { GetProp, Input, UploadProps, Modal, Select, SelectProps } from "antd";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import * as breedService from "../../services/breedService"
import './createPostModal.scss'
import UploadImage from "../uploadImage/uploadImage";
import Breed from "../../models/breed";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
type CreatePostModalProps = {
    handleOk: (file: FileType, title: string, description: string, dogBreedID: string) => Promise<void>,
    handleCancel: () => void,
    isModalOpen: boolean
}

let timeout: ReturnType<typeof setTimeout> | null;
let currentValue: string;

const fetchBreeds = (value: string, callback: (data: Breed[]) => void) => {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value;

    const f = () => {
        console.log("searching breeds", value)
        breedService.searchBreed(value)
            .then((d: Breed[]) => {
                if (currentValue === value) {
                    callback(d);
                }
            });
    };
    timeout = setTimeout(f, 300);


}

export default function CreatePostModal({ handleOk, handleCancel, isModalOpen }: CreatePostModalProps) {
    const [file, setFile] = useState<FileType>();
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [breedsOptions, setBreedsOptions] = useState<Breed[]>([]);
    const [dogBreedID, setDogBreedID] = useState<string>("");
    const [breedAutoCompleteOptions, setBreedAutoCompleteOptions] = useState<SelectProps['options']>();
    const [confirmLoading, setConfirmLoading] = useState(false);

    const searchCallback = (breeds: Breed[]) => {
        setBreedsOptions(breeds)
        setBreedAutoCompleteOptions(breeds.map(breed => { return { value: breed.id, label: breed.attributes.name } }))
    }

    const handleSearch = (e: string) => {
        if (!e) return;
        fetchBreeds(e, searchCallback)
    }

    const handleBreedSelect = (breedId: string) => {
        const breed = breedsOptions.find(breed => breed.id == breedId)
        setDogBreedID(breed?.id || "");
    }

    const onOk = async () => {
        setConfirmLoading(true)
        await handleOk(file!, title, description, dogBreedID) 
        setConfirmLoading(false)
    }

    useEffect(() => { fetchBreeds("", searchCallback) }, [])

    return (
        <>
            <Modal
                title="Create post"
                onOk={onOk}
                onCancel={handleCancel}
                open={isModalOpen}
                okButtonProps={{ disabled: !file || title.length == 0 || description.length == 0 || dogBreedID.length == 0 }}
                confirmLoading={confirmLoading}
            >
                <div className="modal-content-wrapper">
                    <div className="modal-content">
                        <Input value={title} placeholder="Title" className="input" onChange={e => { setTitle(e.target.value) }} />
                        <TextArea value={description} rows={4} placeholder="Description" className="input" onChange={e => { setDescription(e.target.value) }} />
                        <Select
                            showSearch
                            placeholder="Dog Breed"
                            options={breedAutoCompleteOptions}
                            onSearch={handleSearch}
                            className="input"
                            onChange={handleBreedSelect}
                            optionFilterProp="label"
                        />
                        <UploadImage style={{ color: "white" }} onSelect={setFile}></UploadImage>
                    </div>
                </div>
            </Modal>
        </>
    )
}