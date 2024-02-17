import React, { useEffect, useState } from 'react'
import { TextInput } from 'flowbite-react'
import { useSelector } from 'react-redux'
import { RiLockPasswordLine } from "react-icons/ri"
import { CiUser } from "react-icons/ci"
import { CiMail } from "react-icons/ci"

const DashProfile = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [httpRequest, setHttpRequest] = useState();
    const [userData, setUserData] = useState({
        username: currentUser.username,
        email: currentUser.email,
        password: "",
    })

    useEffect(() => {
        console.log(currentUser);
        setHttpRequest("http://" + window.location.host + "/api/assets/lol.png")
    }, [])

    const inputChangeHandler = (event) => {
        setUserData({ ...userData, [event.target.id]: event.target.value })
        console.log(userData);
    }

    return (
        <div className='flex flex-col flex-1'>
            {/* image section */}
            <div
                style={{ backgroundImage: `url(${httpRequest})` }}
                className='relative w-full max-h-[600px] min-h-[300px] h-[50vh] bg-cover bg-center '>
                <div className="backdrop-blur-lg max-h-[600px] absolute max-w-[90%] h-[50vh] min-h-[150px] top-[100%] left-[50%] translate-x-[-50%] translate-y-[-50%] isolate aspect-video rounded-xl dark:bg-[rgb(64,64,64)]/40 bg-[rgb(240,240,240)]/40 shadow-lg ring-1 ring-black/5">
                    <img className=' p-1 dark:bg-[rgb(39,39,42)] bg-white absolute translate-y-[-50%] translate-x-[-50%] left-[50%] h-[50%] rounded-full' src={currentUser.profilePicture} alt="" srcset="" />
                </div>
            </div>
            {/* bottom section */}
            <div className='overflow-x-hidden relative flex flex-col flex-1 items-center mt-[30vh] xs:mt-[30vh] xl:mt-[350px] mb-10'>
                <form className='flex flex-1 gap-4 flex-col xl:max-w-[1060px] max-w-[65vw] md:max-w-[65vw] xl:w-[90vh] w-[70vh] min-w-[120px] text-3xl' >
                    <TextInput
                        type='email'
                        placeholder='name@company.com'
                        id='email'
                        onChange={inputChangeHandler}
                        value={userData.email}
                        icon={CiMail}>
                    </TextInput>
                    <TextInput
                        type='text'
                        placeholder='username'
                        id='username'
                        onChange={inputChangeHandler}
                        value={userData.username}
                        icon={CiUser}>
                    </TextInput>
                    <TextInput
                        type='password'
                        placeholder='password'
                        id='password'
                        onChange={inputChangeHandler}
                        value={userData.password}
                        icon={RiLockPasswordLine}>
                    </TextInput>
                </form>
            </div>
        </div >
    )
}

export default DashProfile