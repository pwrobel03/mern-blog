import React from 'react'
import { Link } from 'react-router-dom'
import { Label, TextInput, Button } from 'flowbite-react'

const SignUp = () => {
  return (
    <div className='min-h-screen mt-20 '>
      <div className='flex p-3 gap-10 max-w-4xl mx-auto flex-col md:flex-row md:items-center px-6'>
        {/* Left */}
        <div className="flex flex-1 flex-col">
          <Link
            to={"/"}
            className='text-4xl font-bold dark:text-white'>
            <span className='px-2 py-1 text-white rounded-lg bg-gradient-to-r from-emerald-400 to-emerald-200'>Sahand's</span>Blog
          </Link>
          <p className='text-sm mt-5'>
            This is a demo project. You can sign up with your email and password
            or with Google.
          </p>
        </div>
        {/* right */}
        <div className="flex-1 ">
          <form className='flex flex-col gap-4'>
            <div>
              <Label value='Your username'></Label>
              <TextInput
                type='text'
                placeholder='Username'
                id='username'>
              </TextInput>
            </div>
            <div>
              <Label value='Your Email'></Label>
              <TextInput
                type='email'
                placeholder='name@company.com'
                id='email'>
              </TextInput>
            </div>
            <div>
              <Label value='Your password'></Label>
              <TextInput
                type='password'
                placeholder='Password'
                id='password'>
              </TextInput>
            </div>
            <Button
              className='text-white mt-4 font-bold bg-gradient-to-r from-emerald-400 to-emerald-200 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-emerald-400 dark:focus:ring-green-800 px-2 py-1 text-center mb-2'
              type='submit'>
              Sign Up
            </Button>
          </form>
          <div className='flex gap-3 text-sm'>
            <span >Have an account?</span>
            <Link
              to={"/sign-in"}
              className='text-md font-bold text-emerald-400 dark:text-white'>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
