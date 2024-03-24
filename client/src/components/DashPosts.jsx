import { Modal, Table, Button, Toast } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { CiWarning } from 'react-icons/ci';
import { set } from 'mongoose';

export default function DashPosts() {
    const { currentUser } = useSelector((state) => state.user);
    const [userPosts, setUserPosts] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState('');

    // get posts 
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`/api/post/get-posts?userId=${currentUser._id}`);
                const data = await res.json();
                if (res.ok) {
                    setUserPosts(data.posts);
                    console.log(data);
                    if (data.posts.length < 9) {
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        if (currentUser.isAdmin) {
            fetchPosts();
        }
    }, [currentUser._id]);

    //  get more posts
    const handleShowMore = async () => {
        const startIndex = userPosts.length;
        try {
            const res = await fetch(
                `/api/post/get-posts?userId=${currentUser._id}&startIndex=${startIndex}`
            );
            const data = await res.json();
            if (res.ok) {
                setUserPosts((prev) => [...prev, ...data.posts]);
                if (data.posts.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const deletePostHandler = async () => {
        setShowModal(false)
        console.log(postIdToDelete);
        try {
            const res = await fetch(`/api/post/delete-post/${postIdToDelete}/${currentUser._id}`,
                { method: "DELETE" }
            )

            const data = await res.json()
            if (!res.ok) {
                console.log(data.message);
            } else {
                setUserPosts((prev) => prev.filter((post) => post._id !== postIdToDelete))
            }
        } catch (error) {
            console.log(error);
        }
        // await fetch("/api/post/delete-post")
    }

    return (
        <div className='mt-4 h-full table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-200 dark:scrollbar-track-[#313134] dark:scrollbar-thumb-[#27272A]'>
            {currentUser.isAdmin && userPosts.length > 0 ? (
                <>
                    <Table hoverable className='shadow-md'>
                        <Table.Head>
                            <Table.HeadCell>Date updated</Table.HeadCell>
                            <Table.HeadCell>Post image</Table.HeadCell>
                            <Table.HeadCell>Post title</Table.HeadCell>
                            <Table.HeadCell>Category</Table.HeadCell>
                            <Table.HeadCell>Delete</Table.HeadCell>
                            <Table.HeadCell>
                                <span>Edit</span>
                            </Table.HeadCell>
                        </Table.Head>
                        {userPosts.map((post) => (
                            <Table.Body key={post._id} className='divide-y'>
                                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                    <Table.Cell>
                                        {new Date(post.updatedAt).toLocaleDateString()}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link to={`/post/${post.slug}`}>
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className='w-20 h-10 object-cover bg-gray-500'
                                            />
                                        </Link>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link
                                            className='font-medium text-gray-900 dark:text-white'
                                            to={`/post/${post.slug}`}
                                        >
                                            {post.title}
                                        </Link>
                                    </Table.Cell>
                                    <Table.Cell>{post.category}</Table.Cell>
                                    <Table.Cell>
                                        <span
                                            onClick={() => {
                                                setShowModal(true)
                                                setPostIdToDelete(post._id)
                                            }}
                                            className='text-red-500 cursor-pointer uppercase underline-offset-2 underline hover:underline-offset-4'
                                        >
                                            Delete
                                        </span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link
                                            className='text-teal-500 uppercase underline-offset-2 underline hover:underline-offset-4'
                                            to={`/update-post/${post._id}`}
                                        >
                                            <span>Edit</span>
                                        </Link>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        ))}
                    </Table>
                    {showMore ? (
                        <Button
                            onClick={handleShowMore}
                            className='px-12 py-4 text-black mt-6 bg-[#F9FAFB] mx-auto enabled:hover:bg-[#E9EAEB] focus:ring-[#F9FAFB] dark:bg-[#27272A] dark:text-[#AAA] dark:enabled:hover:bg-[#222225] dark:focus:ring-[#27272A]'
                        >
                            Show more
                        </Button>
                    ) : <p className='mt-2 font-bold text-center'>All posts was loaded.</p>}
                </>
            ) : (
                <p>You have no posts yet!</p>
            )}
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                popup
                size="md"
                className=''>
                <Modal.Header className='bg-zinc-200' />
                <Modal.Body className='flex flex-col dark:bg-zinc-900 bg-zinc-200'>
                    <div className='text-center'>
                        <CiWarning className='w-64 h-64 text-zinc-400 dark:text-zinc-700 mb-4 mx-auto' />
                    </div>
                    <h3 className='text-center font-semibold text-lg text-zinc-500'>Are you sure you want to delete this post?</h3>
                    <div className='flex px-6 mt-4 flex-row justify-between'>
                        <Button
                            color='failure'
                            onClick={deletePostHandler}>
                            Yes, I'm sure
                        </Button>
                        <Button
                            color='dark'
                            onClick={() => {
                                setShowModal(false)
                                // dispatch(deleteCancel())
                            }}>
                            No, cancel
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}