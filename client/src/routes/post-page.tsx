import '../styles/home.scss'
import PostModel from '../models/post'
import * as postsService from "../services/postsService"
import { useCallback, useEffect, useState } from 'react';
import { Spin } from 'antd';
import Post from '../components/post/post';
import Comment from '../models/comment';
import "../styles/post-page.scss"
import CommentsList from '../components/commentsList/commentsList';
import CreateCommentButton from '../components/createCommentButton/createCommentButton';
import { useNavigate, useParams } from 'react-router-dom';


export default function PostPage() {
    const [post, setPost] = useState<PostModel | null>(null)
    const [comments, setComments] = useState<Comment[] | null>(null)
    const navigate = useNavigate()

    const { postId } = useParams() as { postId: string };

    useEffect(() => {
        if (!postId) navigate("/")
    })

    const fetchPost = useCallback(async () => {
        const [newPost, newComments] = await Promise.all([postsService.getPost(postId), postsService.getPostComments(postId)])
        setPost(newPost)
        setComments(newComments)
    }, [postId])

    useEffect(() => { fetchPost() }, [fetchPost])

    return (
        <>
            {post === null || comments === null ? (<Spin />) :
                <div className="post-page">
                    <Post refreshPosts={fetchPost} post={post} />
                    <div
                        className='comments-wrapper'
                    >
                        <CommentsList refreshComments={fetchPost} comments={comments}></CommentsList>
                    </div>
                    <CreateCommentButton refreshComments={fetchPost} postId={post._id} />
                </div>
            }
        </>
    )
}