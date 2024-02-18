import React, { useEffect, useRef, useState } from 'react'
import { TextInput, Label, Button, Spinner } from 'flowbite-react'
import { useSelector } from 'react-redux'
import { RiLockPasswordLine } from "react-icons/ri"
import { CiUser } from "react-icons/ci"
import { CiMail } from "react-icons/ci"
import { FaArrowDown } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'

const Test = () => {
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);
    const filePickerRef = useRef();
    const [loading, setLoading] = useState();
    const [imageProfile, setImageProfile] = useState();
    const [imageProfileUrl, setImageProfileUrl] = useState();
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

    const submitHandler = async (event) => {
        event.preventDefault()
        // const res = await fetch("/api/auth/signup", {
        //     method: "POST",
        //     headers: { "Content-type": "application/json" },
        //     body: JSON.stringify(formData)
        // });
        // console.log(res);

        // if (res) {

        // }
    }

    const changeImageHandler = (event) => {
        // console.log(event.target.files[0]);
        const image = event.target.files[0]
        console.log(image);
        if (!image) {
            console.log("return");
            return
        }

        const imageUrl = URL.createObjectURL(image);
        setImageProfileUrl(imageUrl)
        console.log(imageUrl);
    }

    return (
        <>
            <div
                style={{ backgroundImage: `url(${httpRequest})` }}
                className='relative w-full max-h-[600px] min-h-[300px] aspect-video bg-cover bg-center '>

            </div>
            <div className="relative flex flex-col items-center h-full">
                {/* <div className="backdrop-blur-lg max-h-[600px] absolute max-w-[90%] h-[50vh] min-h-[150px] top-[100%] left-[50%] translate-x-[-50%] translate-y-[-50%] isolate aspect-video rounded-xl dark:bg-[rgb(64,64,64)]/40 bg-[rgb(240,240,240)]/40 shadow-lg ring-1 ring-black/5">
                    <img className=' p-1 dark:bg-[rgb(39,39,42)] bg-white absolute translate-y-[-50%] translate-x-[-50%] left-[50%] rounded-full h-[25vw]' src={currentUser.profilePicture} alt="" srcset="" />
                </div> */}
                <div className='select-none md:w-[60vw] w-[90vw] max-w-[1200px] items-center mb-20 max-h-full flex flex-col'>
                    <div className='px-4 pb-4 absolute top-0 backdrop-blur-lg translate-y-[-50%] max-h-[600px] flex flex-col items-center aspect-video w-full rounded-2xl dark:bg-[rgb(64,64,64)]/40 bg-[rgb(240,240,240)]/40 shadow-lg ring-1 ring-black/5'>
                        <form hidden>
                            <input
                                type="file"
                                accept='image/*'
                                onChange={changeImageHandler}
                                defaultValue={imageProfile}
                                className='absolute'
                                ref={filePickerRef} />
                        </form>
                        <img
                            onClick={() => filePickerRef.current.click()}
                            className=' p-1 dark:bg-[rgb(39,39,42)] bg-white translate-y-[-50%] rounded-full h-[50%] aspect-square'
                            src={imageProfileUrl || currentUser.profilePicture}
                            alt="profile picture"
                        />
                        <p className='xs:translate-y-[-50%] text-lg sm:text-3xl text-center'><span className='font-semibold'>Hi chef!</span><br />Nice to see you, <span className='text-emerald-600 font-bold'>{currentUser.username}</span>  </p>
                        <div className='mt-3 p-2 flex items-center gap-2 justify-center'>
                            <p className='text-xs sm:text-xl text-center'>Here you can change your profile details </p>
                            <a href="#editData">
                                <FaArrowDown className=' hover:text-emerald-600 rounded-full'></FaArrowDown>
                            </a>
                        </div>
                    </div>
                    <div id="editData" className='max-h-[600px] sm:mt-[calc(25%+4em)] mt-[calc(25%+6em)] aspect-video w-full'>
                        <form className='flex flex-col gap-4 text-xl' onSubmit={submitHandler}>
                            <div>
                                <Label value='Your username'></Label>
                                <TextInput
                                    type='text'
                                    placeholder='username'
                                    id='username'
                                    onChange={inputChangeHandler}
                                    defaultValue={userData.username}>
                                </TextInput>
                            </div>
                            <div>
                                <Label value='Your email'></Label>
                                <TextInput
                                    type='email'
                                    placeholder='name@company.com'
                                    id='email'
                                    onChange={inputChangeHandler}
                                    defaultValue={userData.email}>
                                </TextInput>
                            </div>
                            <div>
                                <Label value='Your password'></Label>
                                <TextInput
                                    type='password'
                                    placeholder='***************'
                                    id='password'
                                    onChange={inputChangeHandler}
                                    defaultValue={userData.password}>
                                </TextInput>
                            </div>
                            <Button
                                className='text-white mt-4 font-bold bg-gradient-to-r from-emerald-400 to-emerald-200 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-emerald-400 dark:focus:ring-green-800 px-2 py-1 text-center mb-2'
                                disabled={loading}
                                type='submit'>
                                {loading
                                    ? <><Spinner
                                        size="sm"
                                        color={"emerald"}
                                        className='mr-4' />
                                        <span>Loading...</span></>
                                    : "Update"
                                }
                            </Button>
                        </form>
                    </div>
                </div>
            </div >
        </ >
    )
}

export default Test