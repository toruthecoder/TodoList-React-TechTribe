import { Route, Routes } from "react-router-dom";
import Login from './Pages/login.jsx'
import Signup from './Pages/signup.jsx'
import Home from './Pages/home.jsx'
import './App.css'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}

export default App
