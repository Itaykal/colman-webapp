import axios from "axios";
import Post from "../models/post";
import Comment from "../models/comment";

export const getPosts = async (userId?: string): Promise<Post[]> => {
    await new Promise(f => setTimeout(f, 1000));
    return Array(5).fill(
        {
            _id: "22116as1df5a1sd95f9",
            authorId: "1",
            description: "this post was made by moth gang this is a very very long description lalalalala loren ipsum kaki pipi bacon dolor hedgehog",
            imageURL: "https://24ai.tech/en/wp-content/uploads/sites/3/2023/10/01_product_1_sdelat-kvadratnym-5-scaled.jpg",
            title: "Lmao imagine being a butterfly",
            breedId: "ff7758e7-c33d-472d-ab8d-04d3a6354b39",
            breedName: "Russell Terrier",
            comments: [{ text: "this is a comment", authorId: "1" }, { text: "this is another comment", authorId: "2" }]
        } as Post,
    );
    let q = ""
    if (userId) {
        q = `?userId=${userId}`
    }
    const response = await axios.get(`"/api/posts${q}"`)
    return response.data;
}

export const getPost = async (postId?: string): Promise<Post> => {
    await new Promise(f => setTimeout(f, 1000));
    return {
        _id: postId,
        authorId: "1",
        description: "this post was made by moth gang this is a very very long description lalalalala loren ipsum kaki pipi bacon dolor hedgehog",
        imageURL: "https://24ai.tech/en/wp-content/uploads/sites/3/2023/10/01_product_1_sdelat-kvadratnym-5-scaled.jpg",
        title: "Lmao imagine being a butterfly",
        breedId: "ff7758e7-c33d-472d-ab8d-04d3a6354b39",
        commentsCount: 2
    } as Post
    let q = ""
    if (userId) {
        q = `?userId=${userId}`
    }
    const response = await axios.get(`"/api/posts${q}"`)
    return response.data;
}

export const getPostComments = async (postId?: string): Promise<Comment[]> => {
    await new Promise(f => setTimeout(f, 1000));
    return [{ body: "this is a comment", authorId: "1" }, { body: "this is another comment", authorId: "2" }]
    let q = ""
    if (userId) {
        q = `?userId=${userId}`
    }
    const response = await axios.get(`"/api/posts${q}"`)
    return response.data;
}