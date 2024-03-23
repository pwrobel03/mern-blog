import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import DashSideBar from '../components/DashSideBar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';

const Dashboard = () => {
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
        <div className='min-h-screen relative flex flex-col  md:flex-row'>
            {/* Sidebar */}
            <div className='flex md:w-[20vw] md:max-w-[260px]'>
                <DashSideBar />
            </div>
            {/* Content area */}
            {/* Profile */}
            <div className='overflow-hidden relative w-full flex-col flex items-center justify-center'>
                {tab === "profile" &&
                    <DashProfile />
                }
                {tab === "posts" &&
                    <DashPosts />
                }
            </div>
        </div >
    )
}

export default Dashboard
