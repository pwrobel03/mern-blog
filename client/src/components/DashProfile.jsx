import React from 'react'
import { useSelector } from 'react-redux'

const DashProfile = () => {
    const { currentUser } = useSelector((state) => state.user)
    return (
        <div className='flex flex-col w-full'>
            <div className='relative w-full h-[32vh] bg-gradient-to-r from-emerald-400 to-emerald-200 '>
                <div className="absolute h-[calc(100% - 3rem)] w-[80%] top-[100%] left-[50%] translate-x-[-50%] translate-y-[-50%] isolate aspect-video rounded-xl bg-white/20 shadow-lg ring-1 ring-black/5"></div>
            </div>
            <div className='h-full'></div>
        </div>
    )
}

export default DashProfile