import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

// post create
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
    const dispatch = useDispatch()
    const submitHandler = (event) => {
        event.preventDefault()
    }
    const [value, setValue] = useState('');
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
                <div className="flex gap-4 items-center justify-between border-y-2 dark:border-stone-600 p-3">
                    <FileInput className=' bg-transparent border-transparent dark:border-transparent dark:bg-transparent' type='file' accept='image/*' />
                    <Button outline className='text-white customUploadImageButton dark:customUploadImageButtonDark bg-gradient-to-r from-emerald-400 to-emerald-200 dark:bg-gradient-to-r'>Upload Image</Button>
                </div>
                <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={setValue}
                    placeholder='Write something'
                    color="red"
                    className='h-80 mb-12 dark:text-white' />
                <Button color='emerald' className='text-white customUploadImageButton dark:customUploadImageButtonDark bg-gradient-to-r from-emerald-400 to-emerald-200 dark:bg-gradient-to-r'>Upload Image</Button>
            </form>
        </div>
    )
}

export default CreatePost