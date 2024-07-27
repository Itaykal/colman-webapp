import { Empty, Typography } from "antd"
import PostModel from "../../models/post"
import Post from "../post/post"
import "./postsList.scss"

export default function PostList({ posts }: { posts: PostModel[] }) {
    return (
        <div className="posts-list">
            {posts.length == 0 ?
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={
                        <Typography.Text className="empty-text">
                            No posts
                        </Typography.Text>
                    }
                /> :
                posts.map(p => {
                    return (
                        <Post key={p._id} post={p} />
                    )
                })}
        </ div>
    )
}