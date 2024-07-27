import Breed from '../models/breed'
import dogApiClient from './dogApiClient'
import axios from "axios";

export const getBreed = async (breedId: string): Promise<Breed> => {
    const breedResponse = (await dogApiClient.get(`/breeds/${breedId}`)).data
    return breedResponse.data
}

export const searchBreed = async (text: string): Promise<Breed[]> => {
    return [
        {id: "asdf", type: "breed", attributes: {name: "breed name", description: "Good Boy"}},
        {id: "fdsa", type: "breed", attributes: {name: "pincher", description: "Good Boy"}},
        {id: "qwer", type: "breed", attributes: {name: "caucasian dog", description: "Good Boy"}},
        {id: "rewq", type: "breed", attributes: {name: "Pterodactyl", description: "Good Boy"}},
    ].filter(breed => breed.attributes.name.toLowerCase().startsWith(text)) as Breed[]
    const response = await axios.get(`/api/breeds/search?q=${text}`)
    return response.data
}