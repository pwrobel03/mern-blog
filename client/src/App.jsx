import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignOut from './pages/SignOut'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'
import FooterCom from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import AdminPrivateRoute from './components/AdminPrivateRoute'
import CreatePost from './pages/CreatePost'
import UpdatePost from './pages/UpdatePost'
import PostPage from './pages/PostPage'

const App = () => {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoute />} >
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<AdminPrivateRoute />} >
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:postId" element={<UpdatePost />} />
        </Route>
        <Route path="/post/:postSlug" element={<PostPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-out" element={<SignOut />} />
      </Routes>
      <FooterCom></FooterCom>
    </BrowserRouter>
  )
}

export default App
