import axios, { CanceledError } from "axios";

export { CanceledError }

const apiClient = axios.create();

export default apiClient;