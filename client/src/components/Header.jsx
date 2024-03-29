import { Navbar, TextInput, Button, Dropdown, Avatar } from 'flowbite-react'
import React, { useEffect } from 'react'
import { AiOutlineSearch } from "react-icons/ai"
import { FaMoon, FaSun } from "react-icons/fa"
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signOutSuccess } from '../redux/user/userSlice'
import { toggleTheme } from "../redux/theme/themeSlice"

const Header = () => {
    const path = useLocation().pathname;
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user)
    const { theme } = useSelector((state) => state.theme)

    const changeTheme = () => {
        dispatch(toggleTheme())
        // if (theme === "dark") {
        //     document.documentElement.classList.add("dark");
        // } else {
        //     document.documentElement.classList.remove("dark");
        // }

    }

    useEffect(() => {
        console.info("Navbar monitor changes of path and theme ------------> Header.jsx: line 21");
    }, [path, theme])

    const handleSignOut = async () => {
        try {
            const result = await fetch('/api/user/signout', {
                method: "POST",
            })
            const data = await result.json()
            if (!data) {
                console.log("SignOut error" + data.message);
            } else {
                dispatch(signOutSuccess())
            }

        } catch (error) {
            console.log("SignOut error" + error.message);
        }
    }

    return (
        <Navbar className='border-b-2 dark:border-zinc-700 shadow-sm dark:shadow-zinc-600 py-4 items-center dark:bg-zinc-800'>
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
                outline
                className='focus:ring-transparent shadow-none ring-0 w-12 h-10 lg:hidden p-0 bg-transparent dark:bg-transparent border-2 border-[rgb(128,128,128)] enabled:hover:bg-gray-500 dark:enabled:hover:bg-[rgba(0,0,0,0.2)] dark:focus:ring-0 rounded-lg'>
                <AiOutlineSearch />
            </Button>
            <div className='flex gap-2 md:order-2 items-center'>
                <Button
                    onClick={changeTheme}
                    className=' outline-none dark:bg-transparent bg-transparent rounded-full w-10 h-10 focus:ring-0 enabled:hover:bg-transparent dark:enabled:hover:bg-transparent'>
                    {theme === "light"
                        ? <FaMoon className='text-xl text-gray-500 px-0' />
                        : <FaSun className='text-xl px-0' />
                    }
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
                        className="dark:bg-gray-700 dark:border-2 dark:border-pink-200"
                    >
                        <Dropdown.Header>
                            <span className='block text-sm italic'>@{currentUser.username}</span>
                            <span className='block mt-1 text-md truncate'>{currentUser.email}</span>
                        </Dropdown.Header>
                        <Link to={"/dashboard?tab=profile"}>
                            <Dropdown.Item className='dark:hover:bg-[rgba(0,0,0,0.3)] dark:focus:bg-[rgba(0,0,0,0.3)]'>Profile</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                        <Link to={"/dashboard?tab=profile"}>
                            <Dropdown.Item
                                onClick={handleSignOut}
                                className='dark:text-red-500 dark:hover:text-red-400 dark:hover:focus:text-red-400 text-red-500 font-semibold dark:hover:bg-[rgba(0,0,0,0.3)] dark:focus:bg-[rgba(0,0,0,0.3)]'>Sign Out</Dropdown.Item>
                        </Link>
                    </Dropdown>
                    : <Link to="/sign-in">
                        <Button outline className='dark:focus:ring-transparent focus:ring-transparent ring-0 text-white bg-gradient-to-r from-emerald-400 to-emerald-200'>
                            Sign In
                        </Button>
                    </Link>
                }
                <Navbar.Toggle className='text-gray-500 focus:ring-0 dark:text-[rgb(128,128,128)] dark:hover:bg-zinc-900 dark:focus:ring-0'></Navbar.Toggle>
            </div>
            <Navbar.Collapse className='font-bold'>
                <Navbar.Link active={path === "/"} as={"div"} className={(path === "/" ? theme === "light" ? "custom-navbar-active-light" : "custom-navbar-active-dark" : theme === "light" ? "custom-navbar-light" : "custom-navbar-dark")} >
                    <Link to="/">Home</Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/about"} as={"div"} className={(path === "/about" ? theme === "light" ? "custom-navbar-active-light" : "custom-navbar-active-dark" : theme === "light" ? "custom-navbar-light" : "custom-navbar-dark")} >
                    <Link to="/about">About</Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/projects"} as={"div"} className={(path === "/projects" ? theme === "light" ? "custom-navbar-active-light" : "custom-navbar-active-dark" : theme === "light" ? "custom-navbar-light" : "custom-navbar-dark")} >
                    <Link to="/projects">Projects</Link>
                </Navbar.Link>

                {/* <Navbar.Link active={path === "/home"} as={"div"} className='active:bg-red-900  hover:bg-neutral-50 bg-transparent border-neutral-100 text-neutral-400 dark:bg-zinc-800 border-b-2 dark:border-zinc-700' >
                    <Link to="/home">Home</Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/about"} as={"div"} className='  hover:bg-neutral-50 bg-transparent border-neutral-100 text-neutral-400 dark:bg-zinc-800 border-b-2 dark:border-zinc-700' >
                    <Link to="/about">Home</Link>
                </Navbar.Link> */}

                {/* <Navbar.Link active={path === "/about"} as={"div"}>
                    <Link to="/about">About</Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/projects"} as={"div"}>
                    <Link to="/projects">Projects</Link>
                </Navbar.Link> */}
            </Navbar.Collapse>
        </Navbar >
    )
}

export default Header
