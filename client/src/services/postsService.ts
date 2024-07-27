import axios from "axios";
import Post from "../models/post";

export const getPosts = async (userId?: string): Promise<Post[]> => {
    await new Promise(f => setTimeout(f, 1000));
    return Array(5).fill(
        {
            authorId: "1",
            description: "this post was made by moth gang this is a very very long description lalalalala loren ipsum kaki pipi bacon dolor hedgehog",
            imageURL: "https://24ai.tech/en/wp-content/uploads/sites/3/2023/10/01_product_1_sdelat-kvadratnym-5-scaled.jpg",
            title: "Lmao imagine being a butterfly",
            breedId: "ff7758e7-c33d-472d-ab8d-04d3a6354b39"
        },
    );
    let q = ""
    if (userId) {
        q = `?userId=${userId}`
    }
    const response = await axios.get(`"/api/posts${q}"`)
    return response.data;
}