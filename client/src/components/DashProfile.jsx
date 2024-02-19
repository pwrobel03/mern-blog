import React, { useEffect, useRef, useState } from 'react'
import { TextInput, Label, Button, Spinner, Alert, Modal } from 'flowbite-react'
import { useDispatch, useSelector } from 'react-redux'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { RiLockPasswordLine } from "react-icons/ri"
import { CiUser } from "react-icons/ci"
import { CiMail } from "react-icons/ci"
import { FaArrowDown } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from "firebase/storage"
import { app } from "../firebase"
import {
    updateStart,
    updateSuccess,
    updateFailure,
    deleteStart,
    deleteSuccess,
    deleteFailure,
    deleteCancel
} from '../redux/user/userSlice';
import { CiWarning } from "react-icons/ci";


const Test = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser, error } = useSelector((state) => state.user);
    const filePickerRef = useRef();
    const [loading, setLoading] = useState();
    const [imageProfile, setImageProfile] = useState();
    const [imageProfileUrl, setImageProfileUrl] = useState();
    const [imageFileUpdateProgress, setImageFileUpdateProgress] = useState(null);
    const [imageFileUpdateError, setImageFileUpdateError] = useState(null);
    const [formData, setFormData] = useState({});
    const [updateUserError, setUpdateUserError] = useState();
    const [updateUserSuccess, setUpdateUserSuccess] = useState();
    const [showModal, setShowModal] = useState(false);

    const [httpRequest, setHttpRequest] = useState();
    const [userData, setUserData] = useState({
        username: currentUser.username,
        email: currentUser.email,
        password: "",
    })

    useEffect(() => {
        console.warn("asdasda");
        console.log(currentUser);
    })

    useEffect(() => {
        console.log(currentUser);
        setHttpRequest("http://" + window.location.host + "/api/assets/lol.png")
        dispatch(deleteCancel())
    }, [])

    const inputChangeHandler = (event) => {
        setUserData({ ...userData, [event.target.id]: event.target.value })
        setFormData({ ...formData, [event.target.id]: event.target.value })
    }

    const submitHandler = async (event) => {
        event.preventDefault()
        setUpdateUserError(null);
        setUpdateUserSuccess(null);
        if (imageFileUpdateError) {
            return
        }

        if (Object.keys(formData).length === 0) {
            setUpdateUserError('No changes made');
            return;
        }

        if (imageFileUpdateProgress) {
            setUpdateUserError('Please wait for image to upload');
            return;
        }
        try {
            dispatch(updateStart());
            console.log(currentUser._id);
            console.log(formData);
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            console.log(res);
            const data = await res.json();
            if (!res.ok) {
                dispatch(updateFailure(data.message));
                setUpdateUserError(data.message);
            } else {
                dispatch(updateSuccess(data));
                setUpdateUserSuccess("User's profile updated successfully");
                setTimeout(() => {
                    setUpdateUserSuccess(null)
                }, 3000);
            }
        } catch (error) {
            console.log("UUUUUUU");
            dispatch(updateFailure(error.message));
            setUpdateUserError(error.message);
        }
    }

    const changeImageHandler = (event) => {
        // console.log(event.target.files[0]);
        const image = event.target.files[0]
        console.log(image);
        if (!image) {
            return
        }


        setImageProfile(image)
        setImageProfileUrl(URL.createObjectURL(image));
    }

    useEffect(() => {
        if (imageProfile) {
            uploadImage()
        }
    }, [imageProfile])

    const uploadImage = async () => {
        // clear
        setImageFileUpdateProgress(null)
        setImageFileUpdateError(null)

        const storage = getStorage(app)
        const fileName = new Date().getTime() + imageProfile.name
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, imageProfile);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageFileUpdateProgress(progress.toFixed(0))
                console.warn(progress);
            },
            (error) => {
                setImageFileUpdateError("Could not update a file (File must be less than 2MB) Please choose another image.")
                setImageFileUpdateProgress(null)
                setImageProfileUrl(null)
                // setTimeout(() => {
                //     setImageFileUpdateError(null)
                // }, 5000)
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                    setImageProfileUrl(downloadUrl)
                    setFormData({ ...formData, profilePicture: downloadUrl })
                }).then(() => {
                    setImageFileUpdateError(null)
                    setImageFileUpdateProgress(null)
                })
            }
        )
    }

    const deleteUserHandler = async () => {
        setShowModal(false)
        try {
            dispatch(deleteStart())
            const result = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: "DELETE",
            })
            const data = await result.json()
            if (!data.ok) {
                dispatch(deleteFailure(data.message))
            } else {
                dispatch(deleteSuccess(data))
            }

        } catch (error) {
            dispatch(deleteFailure(error.message))
        }
    }


    return (
        <>
            <div
                style={{ backgroundImage: `url(${httpRequest})` }}
                className='relative w-full 2xl:max-h-[1000px] max-h-[30vw] min-h-[300px] aspect-video bg-cover bg-center '>

            </div>
            <div className="relative flex flex-col items-center h-full">
                {/* <div className="backdrop-blur-lg max-h-[600px] absolute max-w-[90%] h-[50vh] min-h-[150px] top-[100%] left-[50%] translate-x-[-50%] translate-y-[-50%] isolate aspect-video rounded-xl dark:bg-[rgb(64,64,64)]/40 bg-[rgb(240,240,240)]/40 shadow-lg ring-1 ring-black/5">
                    <img className=' p-1 dark:bg-[rgb(39,39,42)] bg-white absolute translate-y-[-50%] translate-x-[-50%] left-[50%] rounded-full h-[25vw]' src={currentUser.profilePicture} alt="" srcset="" />
                </div> */}
                <div className='select-none md:w-[60vw] w-[90vw] max-w-[1200px] items-center mb-20 max-h-full flex flex-col'>
                    <div className='px-4 pb-4 absolute top-0 backdrop-blur-lg translate-y-[-50%] 2xl:max-h-[400px] max-h-[30vw] flex flex-col items-center aspect-video w-full rounded-2xl dark:bg-[rgb(64,64,64)]/40 bg-[rgb(240,240,240)]/40 shadow-lg ring-1 ring-black/5'>
                        <form hidden>
                            <input
                                type="file"
                                name='profilePicture'
                                accept='image/*'
                                onChange={changeImageHandler}
                                defaultValue={imageProfile}
                                className='absolute'
                                ref={filePickerRef} />
                        </form>
                        <div className='relative translate-y-[-50%] rounded-full h-[50%] aspect-square'>
                            {imageFileUpdateProgress &&
                                <CircularProgressbar
                                    value={imageFileUpdateProgress || null}
                                    text={`${imageFileUpdateProgress}%`}
                                    strokeWidth={5}
                                    styles={{
                                        root: {
                                            width: '100%',
                                            height: '100%',
                                            position: 'absolute',
                                            zIndex: 2
                                        }, path: {
                                            stroke: `#059669`,
                                        },
                                        text: {
                                            // Text color
                                            fill: '#fff',
                                            fontSize: '2em',
                                        }, trail: {
                                            // Trail color
                                            stroke: 'transparent',
                                        }
                                    }}
                                />
                            }
                            <img
                                onClick={() => filePickerRef.current.click()}
                                className='p-1 md:p-2 xl:p-3 dark:bg-[rgb(39,39,42)] bg-white absolute top-0 left-0 h-full w-full rounded-full'
                                src={imageProfileUrl || currentUser.profilePicture}
                                alt="profile picture"

                            />
                        </div>
                        <p className='xs:translate-y-[-50%] text-lg sm:text-3xl text-center'><span className='font-semibold'>Hi chef!</span><br />Nice to see you, <span className='text-emerald-600 font-bold'>{currentUser.username}</span>  </p>
                        <div className='mt-3 p-2 flex items-center gap-2 justify-center flex-col xs:flex-row'>
                            <p className='text-xs sm:text-xl text-center'>Here you can change your profile details </p>
                            <a href="#editData">
                                <FaArrowDown className=' hover:text-emerald-600 rounded-full'></FaArrowDown>
                            </a>
                        </div>
                    </div>
                    <div id="editData" className='max-h-[600px] sm:mt-[calc(25%+4em)] mt-[calc(25%+6em)] aspect-video w-full'>
                        {imageFileUpdateError &&
                            <Alert color='failure'>
                                {imageFileUpdateError}
                            </Alert>
                        }
                        <form className='flex flex-col mt-4 gap-4 text-xl' onSubmit={submitHandler}>
                            <div>
                                <Label value='Your username'></Label>
                                <TextInput
                                    icon={CiUser}
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
                                    icon={CiMail}
                                    type='email'
                                    placeholder='name@company.com'
                                    id='email'
                                    name="email"
                                    onChange={inputChangeHandler}
                                    defaultValue={userData.email}>
                                </TextInput>
                            </div>
                            <div>
                                <Label value='Your password'></Label>
                                <TextInput
                                    icon={RiLockPasswordLine}
                                    type='password'
                                    placeholder='***************'
                                    id='password'
                                    onChange={inputChangeHandler}
                                    defaultValue={userData.password}>
                                </TextInput>
                            </div>
                            <Button
                                className='text-white mt-4 font-bold bg-gradient-to-r from-emerald-400 to-emerald-200 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-emerald-400 dark:focus:ring-green-800 px-2 py-1 text-center'
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
                            <div className='text-red-500 py-2 text-sm uppercase flex flex-row justify-between'>
                                <div
                                    className='hover:text-red-700 cursor-pointer hover:underline'
                                    onClick={() => { setShowModal(true) }}>
                                    Delete Account
                                </div>
                                <div className='hover:text-red-700 cursor-pointer hover:underline'>Sign Out</div>
                            </div>
                            {updateUserError &&
                                <Alert color='failure'>
                                    {updateUserError}
                                </Alert>
                            }
                            {updateUserSuccess &&
                                <Alert color='success'>
                                    {updateUserSuccess}
                                </Alert>
                            }
                            {error &&
                                <Alert color='failure'>
                                    {error}
                                </Alert>
                            }
                        </form>
                    </div>
                </div>
            </div >

            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                popup
                size="md"
                className=''>
                <Modal.Header className='bg-zinc-200' />
                <Modal.Body className='flex flex-col dark:bg-zinc-900 bg-zinc-200'>
                    <div className='text-center'>
                        <CiWarning className='w-64 h-64 text-zinc-400 dark:text-zinc-700 mb-4 mx-auto' />
                    </div>
                    <h3 className='text-center font-semibold text-lg text-zinc-500'>Are you sure you want to delete your account?</h3>
                    <div className='flex px-6 mt-4 flex-row justify-between'>
                        <Button
                            color='failure'
                            onClick={deleteUserHandler}>
                            Yes, I'm sure
                        </Button>
                        <Button
                            color='dark'
                            onClick={() => {
                                setShowModal(false)
                                dispatch(deleteCancel())
                            }}>
                            No, cancel
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </ >
    )
}

export default Test