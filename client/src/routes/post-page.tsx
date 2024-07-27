import '../styles/home.scss'
import PostModel from '../models/post'
import * as postsService from "../services/postsService"
import { useCallback, useEffect, useState } from 'react';
import { Spin } from 'antd';
import Post from '../components/post/post';
import { useLoaderData } from 'react-router-dom';
import Comment from '../models/comment';
import "../styles/post-page.scss"
import CommentsList from '../components/commentsList/commentsList';


export default function PostPage() {
    const [post, setPost] = useState<PostModel | null>(null)
    const [comments, setComments] = useState<Comment[] | null>(null)

    const { postId } = useLoaderData() as { postId: string };

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
                    <Post post={post} />
                    <div
                        className='comments-wrapper'
                    >
                        <CommentsList comments={comments}></CommentsList>
                    </div>
                </div>
            }
        </>
    )
}