import { Navbar, TextInput, Button, Dropdown, Avatar } from 'flowbite-react'
import React, { useEffect } from 'react'
import { AiOutlineSearch } from "react-icons/ai"
import { FaMoon } from "react-icons/fa"
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {
    const path = useLocation().pathname;
    const { currentUser } = useSelector(state => state.user)
    return (
        <Navbar className='border-b-2 py-4 items-center'>
            <div className='flex items-start'>
                <Link
                    to={"/"}
                    className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
                    <span className='px-2 py-1 text-white rounded-lg bg-gradient-to-r from-emerald-400 to-emerald-200'>Sahand's</span>Blog
                </Link>
            </div>
            <form>
                <TextInput
                    type='text'
                    placeholder='Search...'
                    rightIcon={AiOutlineSearch}
                    className='hidden lg:inline '
                    color="green">
                </TextInput>
            </form>
            <Button
                className='w-12 h-10 lg:hidden '
                color='green'>
                <AiOutlineSearch />
            </Button>
            <div className='flex gap-2 md:order-2 items-center'>
                <Button className='rounded-full p-0 hidden sm:inline' color='green' pill>
                    <FaMoon className='text-xl px-0' />
                </Button>
                {currentUser
                    ? <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <img
                                className='h-12 w-12 rounded-full p-0.5'
                                alt="profile picture"
                                src={currentUser.profilePicture}
                            />
                        }
                    >
                        {console.log(currentUser.profilePicture)}
                        <Dropdown.Header>
                            <span className='block text-sm italic'>@{currentUser.username}</span>
                            <span className='block mt-1 text-md truncate'>{currentUser.email}</span>
                        </Dropdown.Header>
                        <Link to={"/dashboard?tab=profile"}>
                            <Dropdown.Item>Profile</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                        <Link to={"/dashboard?tab=profile"}>
                            <Dropdown.Item className='text-red-500 font-semibold'>Sign Out</Dropdown.Item>
                        </Link>
                    </Dropdown>
                    : <Link to="/sign-in">
                        <Button outline className=' text-white bg-gradient-to-r from-emerald-400 to-emerald-200' color='green'>
                            Sign In
                        </Button>
                    </Link>
                }
                <Navbar.Toggle></Navbar.Toggle>
            </div>
            <Navbar.Collapse className='font-bold'>
                <Navbar.Link active={path === "/"} as={"div"} >
                    <Link to="/">Home</Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/about"} as={"div"}>
                    <Link to="/about">About</Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/projects"} as={"div"}>
                    <Link to="/projects">Projects</Link>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header
