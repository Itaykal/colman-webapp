import '../styles/home.scss'
import PostModel from '../models/post'
import PostsList from '../components/postsList/postsList';
import CreatePostButton from '../components/createPostButton/createPostButton';
import * as postsService from "../services/postsService"
import { useCallback, useEffect, useState } from 'react';
import { Spin } from 'antd';


export default function Home() {
    const [posts, setPosts] = useState<PostModel[] | null>(null)

    const fetchPosts = useCallback(async () => {
        const newPosts = await postsService.getPosts()
        setPosts(newPosts)
    }, [])

    useEffect(() => { fetchPosts() }, [fetchPosts])

    return (
        <> {posts === null ? (<Spin />) :
            <div className="home">
                <PostsList posts={posts} />
                <CreatePostButton />
            </div>
        }
        </>
    )
}