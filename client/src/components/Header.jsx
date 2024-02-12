import { Navbar, TextInput, Button } from 'flowbite-react'
import React from 'react'
import { AiOutlineSearch } from "react-icons/ai"
import { FaMoon } from "react-icons/fa"
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
    const path = useLocation().pathname;
    return (
        <Navbar className='border-b-2'>
            <Link
                to={"/"}
                className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
                <span className='px-2 py-1 text-white rounded-lg bg-gradient-to-r from-emerald-400 to-emerald-200'>Sahand's</span>Blog
            </Link>
            <form >
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
                <Button className='w-12 h-10 hidden sm:inline' color='green' pill>
                    <FaMoon />
                </Button>
                <Link>
                    <Button className='text-white bg-gradient-to-r from-emerald-400 to-emerald-200' color='green'>
                        Sign In
                    </Button>
                </Link>
                <Navbar.Toggle></Navbar.Toggle>
            </div>
            <Navbar.Collapse>
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
