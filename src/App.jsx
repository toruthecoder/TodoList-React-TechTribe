import { Route, Routes } from "react-router-dom";
import Login from './Pages/login.jsx'
import Signup from './Pages/signup.jsx'
import Home from './Pages/home.jsx'
import AuthRedirect from "./Components/authRedirect.jsx";
import './App.css'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<AuthRedirect><Login /></AuthRedirect>} />
      <Route path="/signup" element={<AuthRedirect><Signup /></AuthRedirect>} />
    </Routes>
  )
}

export default App
