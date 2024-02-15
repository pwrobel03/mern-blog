import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { HiUser, HiArrowSmRight } from "react-icons/hi"
import { Sidebar } from 'flowbite-react'

const DashSideBar = () => {
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

    return (
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup className=''>
                    <Link to="/dashboard?tab=profile">
                        <Sidebar.Item
                            active={tab === "profile"}
                            icon={HiUser}
                            label="User"
                            labelColor="green"
                            className="dark:hover:bg-emerald-400 dark:hover:bg-opacity-80" >
                            Profile
                        </Sidebar.Item>
                    </Link>
                    <Sidebar.Item
                        icon={HiArrowSmRight}
                        className="dark:hover:bg-emerald-400 dark:hover:bg-opacity-80" >
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}

export default DashSideBar