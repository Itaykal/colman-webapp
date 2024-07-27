import Post from "../models/post";
import Comment from "../models/comment";
import apiClient from "./apiClient";
import * as fileService from "./fileService"

export const getPosts = async (userId?: string): Promise<Post[]> => {
    let q = ""
    if (userId) {
        q = `/user/${userId}`
    }
    const response = await apiClient.get(`/api/post${q}`)
    return response.data;
}

export const deletePost = async (postId: string) => {
    const response = await apiClient.delete(`/api/post/${postId}`)
    return response.data;
}

export const createPost = async (file: File, title: string, body: string, dogBreedID: string): Promise<Post> => {
    const imageUrl = await fileService.uploadFile(file)
    const postResponse = await apiClient.post(`/api/post`, {
        title: title,
        breedId: dogBreedID,
        body: body,
        imageUrl: imageUrl,
    })
    return postResponse.data as Post
}

export const editPost = async (postId: string, title: string, body: string, dogBreedID: string, file?: File): Promise<Post> => {
    let requestBody: object;
    if (file) {
        const imageUrl = await fileService.uploadFile(file)
        requestBody = {
            title: title,
            breedId: dogBreedID,
            body: body,
            imageUrl: imageUrl,
        }
    } else {
        requestBody = {
            title: title,
            breedId: dogBreedID,
            body: body,
        }
    }
    const postResponse = await apiClient.post(`/api/post/${postId}/edit`, requestBody)
    return postResponse.data as Post
}

export const createComment = async (postId: string, body: string): Promise<Comment> => {
    const commentResponse = await apiClient.post(`/api/comment`, {
        body: body,
        postId: postId,
    })
    return commentResponse.data as Comment
}

export const editComment = async (commentId: string, body: string): Promise<Comment> => {
    const commentResponse = await apiClient.post(`/api/comment/${commentId}/edit`, {
        body: body,
    })
    return commentResponse.data as Comment
} 

export const getPost = async (postId: string): Promise<Post> => {
    const response = await apiClient.get(`/api/post/${postId}`)
    return response.data;
}

export const getPostComments = async (postId: string): Promise<Comment[]> => {
    const response = await apiClient.get(`/api/comment/${postId}`)
    return response.data;
}