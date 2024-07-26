import axios, { CanceledError } from "axios";

export { CanceledError }

const dogApiClient = axios.create({
    baseURL: import.meta.env.VITE_DOG_API_URL,
});

export default dogApiClient;