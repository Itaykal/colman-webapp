import { List } from "antd";
import CommentModel from "../../models/comment"
import Comment from "../comment/comment"

export default function CommentsList({ comments, refreshComments}: { comments: CommentModel[], refreshComments: () => void}) {
    return (
        <List
            className='comments-list'
            itemLayout="horizontal"
            dataSource={comments}
            renderItem={(item) => (
                <Comment refreshComments={refreshComments} comment={item}></Comment>
            )}
        >

        </List>
    )
}