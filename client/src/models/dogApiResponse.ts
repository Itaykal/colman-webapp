export default interface DogApiResponse {
    data: unknown,
    links: {
        self: string,
        current?: string,
        next?: string,
        last?: string,
    }
}