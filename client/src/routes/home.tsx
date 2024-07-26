import '../styles/home.scss'
import PostModel from '../models/post'
import PostsList from '../components/postsList/postsList';
import CreatePostButton from '../components/createPostButton/createPostButton';

const posts: PostModel[] = Array(5).fill(
    {
        authorId: "1",
        description: "this post was made by moth gang this is a very very long description lalalalala loren ipsum kaki pipi bacon dolor hedgehog",
        imageURL: "https://24ai.tech/en/wp-content/uploads/sites/3/2023/10/01_product_1_sdelat-kvadratnym-5-scaled.jpg",
        title: "Lmao imagine being a butterfly",
        breedId: "ff7758e7-c33d-472d-ab8d-04d3a6354b39"
    },
);

export default function Home() {
    return (
        <div className="home">
            <PostsList posts={posts} />
            <CreatePostButton />
        </div>
    )
}