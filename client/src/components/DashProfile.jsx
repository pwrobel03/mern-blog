import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const DashProfile = () => {
    const { currentUser } = useSelector((state) => state.user);

    const [httpRequest, setHttpRequest] = useState();
    useEffect(() => {
        setHttpRequest("http://" + window.location.host + "/api/assets/lol.png")
    }, [])

    return (
        <div className='flex flex-col w-full'>
            <div
                style={{ backgroundImage: `url(${httpRequest})` }}
                className='relative w-full max-h-[500px] h-[50vh] bg-cover bg-center '>
                <div className="backdrop-blur-lg absolute max-w-[90%] h-[100%] top-[100%] left-[50%] translate-x-[-50%] translate-y-[-50%] isolate aspect-video rounded-xl dark:bg-[rgb(64,64,64)]/60 bg-[rgb(240,240,240)]/60 shadow-lg ring-1 ring-black/5">
                    <img className=' p-1 dark:bg-[rgb(39,39,42)] bg-white absolute translate-y-[-50%] translate-x-[-50%] left-[50%] h-[50%] rounded-full' src={currentUser.profilePicture} alt="" srcset="" />
                </div>
            </div>
            <div className='flex flex-col items-center 2xl:mt-[300px] mt-[25vh] flex-1 mb-10 w-full'>
                <div>content creator</div>
                <div>content creator</div>
            </div>
        </div>
    )
}

export default DashProfile