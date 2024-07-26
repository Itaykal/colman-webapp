import { Avatar, Card } from "antd";
import Meta from "antd/es/card/Meta";
import './post.scss'
import { Link } from "react-router-dom";
import PostModel from "../../models/post"

export default function Post({ post, }: { post: PostModel, }) {
    return (
        <Card
            className="post"
            bordered={false}
            cover={<img alt="example" src={post.imageURL} />}
        >
            <Meta
                title={post.title}
                description={post.description}
                avatar={
                    <Link to={`/profile/${post.authorId}`}>
                        <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                    </Link>
                }
            />
        </Card>
    )
}