import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
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

const CreatePost = () => {
    // const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const submitHandler = async (event) => {
        event.preventDefault()

        try {
            // image provided
            if (!file) {
                return
            }

            // content provided
            if (!value) {
                return
            }


        } catch (error) {

        }

    }

    const handleUploadImage = async () => {
        try {
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

    const [content, setContent] = useState('');
    return (
        <div className='p-3 px-6 max-w-3xl w-full mx-auto min-h-screen'>
            <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
            <form
                onSubmit={submitHandler}
                className='w-full flex flex-col gap-4'>
                <div className="w-full flex gap-4 sm:flex-row flex-col justify-between">
                    <TextInput
                        className='w-full'
                        type='text'
                        placeholder="Title"
                        name='title'
                        id='title'
                        required
                    />
                    <Select id='postCategory'>
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
                        className='w-full max-h-96 bg-auto object-cover'
                    />
                }
                <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    placeholder='Write something'
                    color="red"
                    className='h-80 mb-12 dark:text-white' />
                <Button color='emerald' className='text-white customUploadImageButton dark:customUploadImageButtonDark bg-gradient-to-r from-emerald-400 to-emerald-200 dark:bg-gradient-to-r'>Publish</Button>
            </form>
        </div>
    )
}

export default CreatePost