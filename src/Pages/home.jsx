import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import toast from 'react-hot-toast'
import ToDo from '../Components/ToDo'

const Home = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([])
    const [username, setUsername] = useState('')
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const verifyCookie = async () => {
            if (!cookies.token) {
                navigate('/login')
            }
            const { data } = await axios.post("http://localhost:3002", {}, { withCredentials: true })
            const { status, user } = data
            setUsername(user)
            return status ? toast.success(`Hello ${user}`) : (removeCookie("token"), navigate('/login'));
        }
        verifyCookie()
    }, [cookies, navigate, removeCookie])

    const Logout = () => {
        removeCookie("token")
        navigate('/signup')
    }

    return (
        <div>
            <div className="absolute z-100 top-5 right-5">
                <div
                    onClick={() => setOpen(!open)}
                    className="w-12.5 h-12.5 rounded-4xl cursor-pointer text-white bg-[#4f46e5] flex items-center justify-center text-[20px]"
                >
                    {username?.charAt(0).toUpperCase()}
                </div>

                {/* Dropdown */}
                {open && (
                    <div
                        className="absolute top-15 right-0 w-62.5 p-3.75 bg-white rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
                        <p className="font-bold mb-2.5">
                            {username}
                        </p>

                        <button
                            onClick={Logout}
                            className="w-full p-2 mb-2.5 bg-[#ef4444] text-white rounded-[5px] cursor-pointer border-none">
                            Logout
                        </button>
                    </div>
                )}
            </div>

            <ToDo />
        </div>
    )
}

export default Home