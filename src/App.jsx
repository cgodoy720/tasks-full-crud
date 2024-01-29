import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import NavBar from './Components/NavBar'
import Signup from './Pages/Signup'
import Login from './Pages/Login'

function App() {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  return (
    <div>
      <NavBar user={user} setUser={setUser} setToken={setToken}/>
      <Routes>
        <Route path="/" element={<Home user={user} token={token}/>} />
        <Route path='/signup' element={<Signup setUser={setUser} setToken={setToken} />} />
        <Route path='/login' element={<Login setUser={setUser} setToken={setToken}/>} />
      </Routes>
    </div>
  )
}

export default App
