import { List } from "antd";
import CommentModel from "../../models/comment"
import Comment from "../comment/comment"

export default function CommentsList({ comments, }: { comments: CommentModel[], }) {
    return (
        <List
            className='comments-list'
            itemLayout="horizontal"
            dataSource={comments}
            renderItem={(item) => (
                <Comment comment={item}></Comment>
            )}
        >

        </List>
    )
}