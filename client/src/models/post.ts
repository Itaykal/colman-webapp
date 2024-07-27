export default interface Post {
    _id: string
    title: string,
    description: string,
    authorId: string,
    imageURL: string,
    commentsCount: number,
    breedId: string,
    breedName: string
}