import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Label, TextInput, Button, Toast, Alert, Spinner } from 'flowbite-react'
import { signInStart, signInSuccess, signInFailure, clearError } from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import OAuth from '../components/OAuth'


const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const { loading, error: errorMessage } = useSelector(state => state.user)


    useEffect(() => {
        console.log("Jazda");
        dispatch(clearError())
    }, [])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            return dispatch(signInFailure('Please fill out all fields.'));
        }

        try {
            dispatch(signInStart())
            const res = await fetch("/api/auth/signin", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(signInFailure(data.message))
            }

            if (res.ok) {
                dispatch(signInSuccess(data))
                navigate("/")
            }

        } catch (error) {
            dispatch(signInFailure(error.message))
        }
    }


    return (
        <div className='my-auto'>
            <div className='flex p-3 gap-10 max-w-4xl mx-auto flex-col md:flex-row md:items-center px-6'>
                {/* Left */}
                <div className="flex flex-1 flex-col">
                    <Link
                        to={"/"}
                        className='text-4xl font-bold dark:text-white'>
                        <span className='px-2 py-1 text-white rounded-lg bg-gradient-to-r from-emerald-400 to-emerald-200'>Sahand's</span>Blog
                    </Link>
                    <p className='text-sm mt-5'>
                        This is a demo project. You can sign in with your email and password
                        or with Google.
                    </p>
                </div>
                {/* right */}
                <div className="flex-1 ">
                    <form className='flex flex-col gap-4 text-xl' onSubmit={handleSubmit}>
                        <div>
                            <Label value='Your email'></Label>
                            <TextInput
                                type='email'
                                placeholder='name@company.com'
                                id='email'
                                onChange={handleChange}>
                            </TextInput>
                        </div>
                        <div>
                            <Label value='Your password'></Label>
                            <TextInput
                                type='password'
                                placeholder='***************'
                                id='password'
                                onChange={handleChange}>
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
                                : "Sign In"
                            }
                        </Button>
                        <OAuth />
                    </form>
                    <div className='flex gap-3 text-sm'>
                        <span >You don't have account yet?</span>
                        <Link
                            to={"/sign-up"}
                            className='text-md font-bold text-emerald-600 dark:text-white'>
                            Sign Up
                        </Link>
                    </div>
                    {errorMessage
                        ? <Alert color="failure" className='mt-5 font-bold text-base'>
                            {errorMessage}
                        </Alert>
                        : <Alert color="failure" className='mt-5 font-bold font-bold text-base opacity-0'>
                            "Please fill out all fields"
                        </Alert>
                    }
                </div>
            </div>
        </div>
    )
}

export default SignIn
