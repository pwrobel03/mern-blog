import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Label, TextInput, Button, Toast, Alert, Spinner } from 'flowbite-react'

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, SetLoading] = useState(false)
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }

    try {
      setErrorMessage(null);
      SetLoading(true)
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      SetLoading(false)
      if (data.success === false) {
        setErrorMessage(data.message)
      }

      if (res.ok) {
        navigate("/sign-in")
      }

    } catch (error) {
      setErrorMessage(error.message)
      SetLoading(false)
    }
  }


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
          <form className='flex flex-col gap-4 text-xl' onSubmit={handleSubmit}>
            <div>
              <Label value='Your username'></Label>
              <TextInput
                type='text'
                placeholder='Username'
                id='username'
                onChange={handleChange}>
              </TextInput>
            </div>
            <div>
              <Label value='Your Email'></Label>
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
                placeholder='Password'
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
                : "Sign Up"
              }
            </Button>
          </form>
          <div className='flex gap-3 text-sm'>
            <span >Have an account?</span>
            <Link
              to={"/sign-in"}
              className='text-md font-bold text-emerald-600 dark:text-white'>
              Sign In
            </Link>
          </div>
          {errorMessage &&
            <Alert color="failure" className='mt-5'>
              {errorMessage}
            </Alert>
          }
        </div>
      </div>
    </div>
  )
}

export default SignUp
