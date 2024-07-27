import Breed from '../models/breed'
import dogApiClient from './dogApiClient'
import axios from "axios";

export const getBreed = async (breedId: string): Promise<Breed> => {
    const breedResponse = (await dogApiClient.get(`/breeds/${breedId}`)).data
    return breedResponse.data
}

export const searchBreed = async (text: string): Promise<Breed[]> => {
    const response = await axios.get(`/api/breed?query=${text}`)
    return response.data
}