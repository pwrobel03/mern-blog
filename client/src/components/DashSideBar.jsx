import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { HiUser, HiArrowSmRight } from "react-icons/hi"
import { Sidebar } from 'flowbite-react'
import { useDispatch } from 'react-redux'
import { signOutSuccess } from '../redux/user/userSlice'

const DashSideBar = () => {
    const dispatch = useDispatch()
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
    return (
        <Sidebar className='w-full'>
            <Sidebar.Items >
                <Sidebar.ItemGroup >
                    <Sidebar.Item
                        active={tab === "profile"}
                        icon={HiUser}
                        label="User"
                        labelColor="green"
                        onClick={() => navigate("/dashboard?tab=profile")}
                        className="dark:hover:bg-emerald-400 dark:hover:bg-opacity-80 cursor-pointer" >
                        Profile
                    </Sidebar.Item>
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