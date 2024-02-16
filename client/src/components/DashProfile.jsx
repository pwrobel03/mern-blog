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
                <div className="backdrop-blur-lg absolute max-w-[90%] h-[100%] top-[100%] left-[50%] translate-x-[-50%] translate-y-[-50%] isolate aspect-video rounded-xl bg-white/20 shadow-lg ring-1 ring-black/5">

                </div>
            </div>
            <div className='flex  flex-1 min-h-[50vh] w-full'>

            </div>
        </div>
    )
}

export default DashProfile