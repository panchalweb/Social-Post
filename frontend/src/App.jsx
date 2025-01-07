import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Components/Home'
import Registration from './Components/Registion'
import Login from './Components/Login'
import Socialpost from './Components/Socialpost'
import Singlepost from './Components/Singlepost'
import Post from './Components/Post'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/login" element={<Login />} />
                <Route path="/posts" element={<Socialpost />} />
                <Route path="/post/:id" element={<Singlepost />} />
                <Route path="/create-post" element={<Post />} />
            </Routes>
        </Router>
    )
}

export default App




