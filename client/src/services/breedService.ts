import Breed from '../models/breed'
import dogApiClient from './dogApiClient'
import axios from "axios";

export const getBreed = async (breedId: string): Promise<Breed> => {
    const breedResponse = (await dogApiClient.get(`/breeds/${breedId}`)).data
    return breedResponse.data
}

export const searchBreed = async (text: string): Promise<string[]> => {
    return ['Affenpinscher', 'Xoloitzcuintli', 'Bichon Frise']
    const response = await axios.get(`/api/breeds/search?q=${text}`)
    return response.data
}