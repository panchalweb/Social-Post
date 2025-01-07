import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Registration from './Components/Registion'
import Login from './Components/Login'
import Socialpost from './Components/Socialpost'
import Singlepost from './Components/Singlepost'


function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Registration/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/posts' element={<Socialpost/>} />
                <Route path='/post/:id' element={<Singlepost/>} />
               
            </Routes>
        </Router>
    )
}

export default App




