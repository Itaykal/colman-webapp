import { Spin } from "antd"
import PostModel from "../../models/post"
import Post from "../post/post"
import "./postsList.scss"

export default function PostList({ posts }: { posts: PostModel[] }) {
    return (
        <div className="posts-list">
            {posts.length == 0 ? (<Spin />) : posts.map(p => {
                return (
                    <Post post={p} />
                )
            })}
        </ div>
    )
}