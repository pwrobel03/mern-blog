import React from 'react'
import { Button, Spinner } from 'flowbite-react'
import { useState } from 'react'
import { AiFillGoogleCircle } from "react-icons/ai"
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth"
import { app } from "../firebase.js"
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice.js'
import { useNavigate } from 'react-router-dom'

const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const googleHandler = async () => {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" })

        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider)
            console.log(resultsFromGoogle);
            const saveUserData = await fetch("/api/auth/google", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoUrl: resultsFromGoogle.user.photoURL
                })
            })

            const result = await saveUserData.json()
            if (result) {
                dispatch(signInSuccess(result))
                navigate("/")
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Button
            outline
            className='text-white font-bold bg-gradient-to-r from-slate-800 to-slate-600 hover:bg-gradient-to-br focus:ring-0 focus:outline-none focus:ring-none px-1 py-1 text-center mb-2'
            type='button'
            onClick={googleHandler}>
            <> <AiFillGoogleCircle className='w-6 h-6 mr-2' />Continue with google</>
        </Button >
    )
}

export default OAuth