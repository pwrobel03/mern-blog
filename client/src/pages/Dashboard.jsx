import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import DashSideBar from '../components/DashSideBar';
import Profile from '../components/Profile';

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
        <div className='max-w-3xl flex my-auto min-h-screen flex-col md:flex-row'>
            {/* Sidebar */}
            <div className='md:min-w-56'>
                <DashSideBar />
            </div>
            {/* Content area */}
            {/* Profile */}
            {tab === "profile" && <Profile />}
        </div>
    )
}

export default Dashboard
