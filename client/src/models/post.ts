export default interface Post {
    _id: string
    title: string,
    body: string,
    authorID: string,
    imageUrl: string,
    comments: number,
    breedId: string,
}