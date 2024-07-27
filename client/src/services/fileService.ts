
import apiClient from "./apiClient";

export const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file)
    const imageResponse = await apiClient.post(`/api/post/upload-file`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return imageResponse.data as string
}