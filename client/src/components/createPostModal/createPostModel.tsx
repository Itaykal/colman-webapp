import { Input, Modal, Select, SelectProps } from "antd";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import * as breedService from "../../services/breedService"
import './createPostModal.scss'
import UploadImage from "../uploadImage/uploadImage";
import Breed from "../../models/breed";
import PostModel from "../../models/post";

type CreatePostModalProps = {
    handleOk: (title: string, body: string, dogBreedID: string, file?: File,) => Promise<void>,
    handleCancel: () => void,
    isModalOpen: boolean,
    initialPost?: PostModel,
    initialBreed?: string,
    allowEmptyFile: boolean
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
        breedService.searchBreed(value)
            .then((d: Breed[]) => {
                if (currentValue === value) {
                    callback(d);
                }
            });
    };
    timeout = setTimeout(f, 300);


}

export default function CreatePostModal({ handleOk, handleCancel, isModalOpen, initialPost, initialBreed, allowEmptyFile }: CreatePostModalProps) {
    const [file, setFile] = useState<File>();
    const [title, setTitle] = useState<string>(initialPost?.title || "");
    const [body, setBody] = useState<string>(initialPost?.body || "");
    const [breedsOptions, setBreedsOptions] = useState<Breed[]>([]);
    const [dogBreedID, setDogBreedID] = useState<string>(initialPost?.breedId || "");
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
        await handleOk(title, body, dogBreedID, file)
        setFile(undefined)
        setBody("")
        setTitle("")
        setDogBreedID("")
        setConfirmLoading(false)
    }

    useEffect(() => { fetchBreeds(initialBreed || "", searchCallback) }, [])

    return (
        <>
            <Modal
                title="Create post"
                onOk={onOk}
                onCancel={handleCancel}
                open={isModalOpen}
                okButtonProps={{ disabled: (!allowEmptyFile && !file) || title.length == 0 || body.length == 0 || dogBreedID.length == 0 }}
                confirmLoading={confirmLoading}
            >
                <div className="modal-content-wrapper">
                    <div className="modal-content">
                        <Input value={title} placeholder="Title" className="input" onChange={e => { setTitle(e.target.value) }} />
                        <TextArea value={body} rows={4} placeholder="Body" className="input" onChange={e => { setBody(e.target.value) }} />
                        <Select
                            showSearch
                            placeholder="Dog Breed"
                            options={breedAutoCompleteOptions}
                            onSearch={handleSearch}
                            value={dogBreedID}
                            className="input"
                            onChange={handleBreedSelect}
                            optionFilterProp="label"
                        />
                        {isModalOpen && <UploadImage style={{ color: "white" }} onSelect={setFile}></UploadImage>}
                    </div>
                </div>
            </Modal>
        </>
    )
}