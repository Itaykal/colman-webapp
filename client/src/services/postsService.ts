import Post from "../models/post";
import Comment from "../models/comment";
import apiClient from "./apiClient";
import { GetProp, UploadProps } from "antd";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export const getPosts = async (userId?: string): Promise<Post[]> => {
    let q = ""
    if (userId) {
        q = `/user/${userId}`
    }
    const response = await apiClient.get(`/api/post${q}`)
    return response.data;
}

export const createPost = async (file: FileType, title: string, description: string, dogBreedID: string): Promise<Post> => {
    var formData = new FormData();
    formData.append('file', file)
    const imageResponse = await apiClient.post(`/api/post/upload-file`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    const imageUrl = imageResponse.data.imageUrl
}

export const getPost = async (postId: string): Promise<Post> => {
    const response = await apiClient.get(`/api/post/${postId}`)
    return response.data;
}

export const getPostComments = async (postId: string): Promise<Comment[]> => {
    const response = await apiClient.get(`/api/comment/${postId}`)
    return response.data;
}