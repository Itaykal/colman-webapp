import { Empty } from "antd"
import PostModel from "../../models/post"
import Post from "../post/post"
import "./postsList.scss"

export default function PostList({ posts, refreshPosts }: { posts: PostModel[], refreshPosts: () => void }) {
    return (
        <div className="posts-list">
            {posts.length == 0 ?
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={
                            "No posts"
                    }
                /> :
                posts.map(p => {
                    return (
                        <Post refreshPosts={refreshPosts} key={p._id} post={p} />
                    )
                })}
        </ div>
    )
}