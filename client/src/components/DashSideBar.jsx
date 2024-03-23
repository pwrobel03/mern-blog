import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { HiUser, HiArrowSmRight, HiDocumentText } from "react-icons/hi"
import { Sidebar } from 'flowbite-react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { signOutSuccess } from '../redux/user/userSlice'

const DashSideBar = () => {
    const dispatch = useDispatch()
    const { currentUser } = useSelector(state => state.user)
    const navigate = useNavigate();
    const location = useLocation();
    const [tab, setTab] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get("tab")
        console.log(tabFromUrl);
        if (tabFromUrl) {
            setTab(tabFromUrl)
        }
    }, [location.search])

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
    useEffect(() => {
        console.log(tab);
    })
    return (
        <Sidebar className='w-full'>
            <Sidebar.Items className='custom-dashboard-sidebar' >
                <Sidebar.ItemGroup className=''>
                    <Sidebar.Item
                        active={tab === "profile"}
                        icon={HiUser}
                        label={currentUser.isAdmin ? "Admin" : "User"}
                        labelColor="green"
                        onClick={() => navigate("/dashboard?tab=profile")}
                    >
                        Profile
                    </Sidebar.Item>
                    {currentUser.isAdmin &&
                        <Sidebar.Item
                            active={tab === "posts"}
                            icon={HiDocumentText}
                            onClick={() => navigate("/dashboard?tab=posts")}
                            className="dark:hover:bg-emerald-400 dark:hover:bg-opacity-80 cursor-pointer" >
                            Posts
                        </Sidebar.Item>
                    }
                    <Sidebar.Item
                        icon={HiArrowSmRight}
                        onClick={handleSignOut}
                        className="dark:hover:bg-emerald-400 dark:hover:bg-opacity-80 cursor-pointer" >
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar >
    )
}

export default DashSideBar