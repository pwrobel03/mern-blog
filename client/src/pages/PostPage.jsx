import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Spinner, Button } from 'flowbite-react';

const PostPage = () => {
    const { postSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [post, setPost] = useState();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true)
                const res = await fetch(`/api/post/get-posts?slug=${postSlug}`);
                const data = await res.json();
                if (!res.ok) {
                    setError(true)
                    setLoading(false)
                }

                if (res.ok) {
                    setPost(data.posts[0]);
                    console.log(data);
                    setError(false)
                    setLoading(false)
                }
            } catch (error) {
                setLoading(false)
                setError(true)
            }
        }
        fetchPost()
    }, [postSlug])

    if (loading) {
        return (
            <div className='min-h-screen w-full flex flex-col items-center justify-center'>
                <Spinner size='xl' color="gray" />
                <h1 className='font-bold mt-5'>Post is loading...</h1>
            </div>
        )
    }

    return (
        <>
            <main className='py-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
                <h1 className='text-3xl my-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-6xl'>{post && post.title}</h1>
                <Link
                    to={`/search?category=${post && post.category}`}
                    className='mx-auto'>
                    <Button className='font-bold shadow-xl dark:shadow-neutral-700 rounded-3xl bg-gradient-to-r from-emerald-400 to-emerald-200 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-emerald-400 dark:focus:ring-green-800'>{post && post.category}</Button>
                </Link>
                <img src={post && post.image} alt={post && post.title} className='mt-10 py-3 max-h-[600px] w-full' />
                <div className='flex justify-between border-b-4 py-2 border-stone-200 dark:border-stone-800 '>
                    <span className='mx-3'>{post && new Date(post.createdAt).toLocaleDateString()}</span>
                    <span className='mx-3'>{post && +(post.content.length / 1000).toFixed(0) + 1} mins read</span>
                </div>
                <div className='p-6 max-w-3xl mx-auto post-content-custom-css' dangerouslySetInnerHTML={{ __html: post && post.content }}></div>
            </main>
        </>
    )
}

export default PostPage