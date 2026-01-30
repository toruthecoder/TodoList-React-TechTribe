import { useTodos } from '../context/todoContext.jsx'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import api from '../lib/axios.js'
import ToDo from '../Components/ToDo'
// import toast from 'react-hot-toast';

const Home = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([])
    const [username, setUsername] = useState('')
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const { setTodos, resetTodos } = useTodos()

    useEffect(() => {
        axios.post('/api/auth/verify', {}, { withCredentials: true })
            .then(() => navigate('/'))
            .catch(() => { navigate('/login') });
    }, [navigate]);

    useEffect(() => {
        const verifyCookie = async () => {

            try {
                const { data } = await axios.post(`${import.meta.env.VITE_CLIENT_URL}/api/auth/verify`, {}, { withCredentials: true });

                setUsername(data.user);
                setEmail(data.email);

                const todosData = await api.get(`/todos`, { withCredentials: true });
                setTodos(todosData.data.map(todo => ({
                    ...todo,
                    id: todo._id,
                })));

            } catch (error) {
                console.log(error)
                return navigate('/login')
            }
        };
        verifyCookie();
    }, [cookies, navigate, setTodos]);

    const Logout = () => {
        removeCookie("token")
        resetTodos();
        navigate('/login')
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
                        <p className="font-bold mb-1">
                            {username}
                        </p>
                        <p className="mb-2">{email}</p>

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