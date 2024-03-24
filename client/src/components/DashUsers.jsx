import { Modal, Table, Button, Toast } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { CiWarning } from 'react-icons/ci';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { set } from 'mongoose';

export default function DashUsers() {
    const { currentUser } = useSelector((state) => state.user);
    const [users, setUsers] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState('');

    // get users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`/api/user/get-users?userId=${currentUser._id}`);
                const data = await res.json();
                if (res.ok) {
                    setUsers(data.users);
                    if (data.users.length < 10) {
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        if (currentUser.isAdmin) {
            fetchUsers();
        }
    }, [currentUser._id]);

    //  get more users
    const handleShowMore = async () => {
        const startIndex = users.length;
        try {
            const res = await fetch(
                `/api/user/get-users?userId=${currentUser._id}&startIndex=${startIndex}`
            );
            const data = await res.json();
            if (res.ok) {
                setUsers((prev) => [...prev, ...data.users]);
                if (data.users.length < 10) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const deleteUserHandler = async () => {
        setShowModal(false)
        try {
            const res = await fetch(`/api/user/delete/${userIdToDelete}`,
                { method: "DELETE" }
            )

            const data = await res.json()
            if (!res.ok) {
                console.log(data.message);
            } else {
                setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete))
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='mt-4 min-h-screen table-auto overflow-x-scroll p-3 scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-200 dark:scrollbar-track-[#313134] dark:scrollbar-thumb-[#27272A]'>
            {currentUser.isAdmin && users.length > 0 ? (
                <>
                    <Table hoverable className='shadow-md'>
                        <Table.Head className='text-center'>
                            <Table.HeadCell>Date created</Table.HeadCell>
                            <Table.HeadCell>User image</Table.HeadCell>
                            <Table.HeadCell>Username</Table.HeadCell>
                            <Table.HeadCell>Email</Table.HeadCell>
                            <Table.HeadCell>Admin</Table.HeadCell>
                            <Table.HeadCell>Delete</Table.HeadCell>
                        </Table.Head>
                        {users.map((user) => (
                            <Table.Body key={user._id} className='divide-y'>
                                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                    <Table.Cell className='text-center'>
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </Table.Cell>
                                    <Table.Cell className='flex items-center justify-center'>
                                        <img
                                            src={user.profilePicture}
                                            alt='profile picture'
                                            className='w-10 h-10 rounded-full object-cover' />
                                    </Table.Cell>
                                    <Table.Cell className='text-black dark:text-white'>
                                        {user.username}
                                    </Table.Cell>
                                    <Table.Cell >
                                        {user.email}
                                    </Table.Cell>
                                    <Table.Cell className=''>
                                        <div className='flex items-start justify-center'>
                                            {user.isAdmin ? <FaCheck color='green'></FaCheck> : <FaTimes color='red'></FaTimes>}
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell className='text-center'>
                                        <span
                                            onClick={() => {
                                                setShowModal(true)
                                                setUserIdToDelete(user._id)
                                            }}
                                            className='text-red-500 cursor-pointer uppercase underline-offset-2 underline hover:underline-offset-4'
                                        >
                                            Delete
                                        </span>
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
                    ) : <p className='mt-2 font-bold text-center'>All users was loaded.</p>}
                </>
            ) : (
                <p>You have no users to show!</p>
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
                    <h3 className='text-center font-semibold text-lg text-zinc-500'>Are you sure you want to delete selected user?</h3>
                    <div className='flex px-6 mt-4 flex-row justify-between'>
                        <Button
                            color='failure'
                            onClick={deleteUserHandler}>
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