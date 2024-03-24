import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgressbar } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"
import {
    getStorage,
    uploadBytesResumable,
    getDownloadURL,
    ref,
} from "firebase/storage"
import { app } from "../firebase"

// post create
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const UpdatePost = () => {
    // const dispatch = useDispatch();
    const navigate = useNavigate()
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState();
    const { postId } = useParams();
    const { currentUser } = useSelector(state => state.user);

    const submitHandler = async (event) => {
        event.preventDefault()
        setPublishError(null)
        try {
            console.log(currentUser);
            console.log(formData);
            const res = await fetch(`/api/post/update-post/${formData._id}/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
                if (data.message.includes("title")) {
                    setPublishError("Article with this title already exist")
                } else {
                    setPublishError(data.message);
                }
                return;
            }
            navigate(`/post/${data.slug}`);
        } catch (error) {
            setPublishError('Something went wrong');
        }
    }

    useEffect(() => {
        try {
            const fetchPost = async () => {
                console.log(postId);
                const res = await fetch(`/api/post/get-posts?postId=${postId}`)
                const data = await res.json()
                if (!res.ok) {
                    console.log(data.message);
                    setPublishError(data.message)
                    return
                }

                if (res.ok) {
                    setPublishError(null);
                    setFormData(data.posts[0]);
                }
            }
            fetchPost()
        } catch (error) {
            setPublishError(error)
        }
    }, [postId])

    const handleUploadImage = async () => {
        try {
            // image provided
            if (!file) {
                setImageUploadError('Please select an image');
                return;
            }
            setImageUploadError(null);
            const storage = getStorage(app);
            const fileName = new Date().getTime() + '-' + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageUploadProgress(progress.toFixed(0));
                },
                (error) => {
                    setImageUploadError('Image upload failed');
                    setImageUploadProgress(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUploadProgress(0);
                        setImageUploadError(null);
                        setFormData({ ...formData, image: downloadURL });
                    });
                }
            );
        } catch (error) {
            setImageUploadError('Image upload failed');
            setImageUploadProgress(0);
            console.log(error);
        }
    };

    return (
        <div className='p-3 px-6 max-w-3xl w-full mx-auto min-h-screen'>
            <h1 className='text-center text-3xl my-7 font-semibold'>Update a post</h1>
            <form
                onSubmit={submitHandler}
                className='w-full flex flex-col gap-4'>
                <div className="w-full flex gap-4 sm:flex-row flex-col justify-between">
                    <TextInput
                        className='w-full'
                        value={formData.title}
                        type='text'
                        placeholder="Title"
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        name='title'
                        id='title'
                        required
                    />
                    <Select
                        id='postCategory'
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                        <option value={"uncategorized"}>Select a category</option>
                        <option value={"javascript"}>Javascript</option>
                        <option value={"reactjs"}>React.js</option>
                        <option value={"nextjs"}>Next.js</option>
                    </Select>
                </div>
                <div className="md:flex-row flex-col flex flex-1 gap-4 md:items-center justify-between border-y-2 dark:border-stone-600 p-3">
                    <FileInput
                        className=' bg-transparent border-transparent dark:border-transparent dark:bg-transparent'
                        type='file'
                        accept='image/*'
                        onChange={(e) => setFile(e.target.files[0])} />
                    {!imageUploadProgress
                        ?
                        <Button
                            outline
                            className='text-white customUploadImageButton dark:customUploadImageButtonDark bg-gradient-to-r from-emerald-400 to-emerald-200 dark:bg-gradient-to-r'
                            onClick={() => handleUploadImage()}
                        >Upload Image</Button>
                        :
                        <div className='flex md:w-auto w-full gap-4 items-center'>
                            <Button
                                outline
                                className='w-full text-white customUploadImageButton dark:customUploadImageButtonDark bg-gradient-to-r from-emerald-400 to-emerald-200 dark:bg-gradient-to-r'
                                onClick={() => handleUploadImage()}
                                disabled
                            >Upload Image</Button>
                            <CircularProgressbar
                                circleRatio={1}
                                className='h-16 w-16'
                                value={imageUploadProgress}
                                text={`${imageUploadProgress}%`}
                                strokeWidth={3}
                                styles={{
                                    root: {
                                        zIndex: 2
                                    }, path: {
                                        stroke: `#059669`,
                                    },
                                    text: {
                                        // Text color
                                        fill: '#059669',
                                        fontSize: '2em',
                                    }, trail: {
                                        // Trail color
                                        stroke: 'transparent',
                                    }
                                }} />
                        </div>
                    }
                </div>
                {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
                {formData.image &&
                    <img
                        src={formData.image}
                        alt='upload image'
                        className='w-full max-h-64 md:max-h-96 bg-auto object-cover'
                    />
                }
                <ReactQuill
                    theme="snow"
                    value={formData.content}
                    onChange={(value) => setFormData({ ...formData, content: value })}
                    placeholder='Write something'
                    required
                    color="red"
                    className='h-80 mb-12 dark:text-white' />
                <Button
                    type='submit'
                    color='emerald'
                    className='text-white customUploadImageButton dark:customUploadImageButtonDark bg-gradient-to-r from-emerald-400 to-emerald-200 dark:bg-gradient-to-r'>Update</Button>
                {publishError && (
                    <Alert color='failure'>
                        {publishError}
                    </Alert>
                )}
            </form>
        </div>
    )
}

export default UpdatePost