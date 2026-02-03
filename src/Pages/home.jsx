import { useTodos } from '../context/todoContext.jsx'
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from '../lib/axios.js'
import ToDo from '../Components/ToDo'
// import toast from 'react-hot-toast';

const Home = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const { setTodos, resetTodos } = useTodos()
    const inforef = useRef(null);
    const avatarRef = useRef(null);

    useEffect(() => {
        const closeInfo = (e) => {
            if (inforef.current && !inforef.current.contains(e.target) &&
                avatarRef.current && !avatarRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', closeInfo);

        return () => document.removeEventListener('mousedown', closeInfo);
    }, [inforef]);

    useEffect(() => {
        const fetchTodos = async () => {
            const user = JSON.parse(localStorage.getItem('user'))
            if (!user) {
                navigate('/login')
                return
            }

            if (user) {
                setUsername(user.username);
                setEmail(user.email);
            }

            try {
                const todosData = await api.get(`/todos`, { withCredentials: true });
                setTodos(todosData.data.map(todo => ({
                    ...todo,
                    id: todo._id,
                })));
            } catch (error) {
                console.log(error)
                localStorage.removeItem('user')
                navigate('/login')
            }
        };
        fetchTodos();
    }, [navigate, setTodos]);

    const Logout = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_CLIENT_URL}/api/auth/logout`, {}, { withCredentials: true });
            localStorage.removeItem('user')
            resetTodos();
            navigate('/login');
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <div>
            <div className="absolute z-100 top-5 right-5">
                <div
                    onClick={() => setOpen(!open)} ref={avatarRef}
                    className="w-12.5 h-12.5 rounded-4xl cursor-pointer text-white bg-[#4f46e5] flex items-center justify-center text-[20px]"
                >
                    {username?.charAt(0).toUpperCase()}
                </div>

                {/* Dropdown */}
                {open && (
                    <div
                        className="absolute top-15 right-0 w-62.5 p-3.75 bg-white rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.1)]" ref={inforef}>
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