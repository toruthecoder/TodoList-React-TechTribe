import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import toast from 'react-hot-toast'

const Signup = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        email: '',
        username: '',
        password: '',
    })
    const { email, username, password } = inputValue;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value
        })
    }

    const handleError = (err) => {
        toast.error(err)
    }

    const handleSuccess = (msg) => {
        toast.success(msg)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:3002/signup", { ...inputValue, }, { withCredentials: true })
            const { success, message } = data
            if (success) {
                handleSuccess(message)
                setTimeout(() => {
                    navigate('/')
                }, 1000)
            } else {
                handleError(message)
            }
        } catch (error) {
            console.log(error)
        }
        setInputValue({
            ...inputValue,
            email: '',
            username: '',
            password: '',
        })
    }

    return (
        <div className="absolute flex items-center justify-center inset-0 bg-gradient-to-r from-slate-500 to-slate-800">
            <div className='flex flex-col items-center pt-10 w-120 h-170 text-white bg-gray-500/40 backdrop-blur-lg rounded-xl shadow-xl border border-white/20'>
                <h2 className='text-[30px] mb-5'>Signup Account</h2>
                <form onSubmit={handleSubmit} className='flex flex-col'>
                    <div className='flex flex-col'>
                        <label htmlFor="email" className='text-[23px]'>Email : </label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            className='focus:outline-none font-normal text-[14px] leading-[100%] tracking-0 bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-white/20 px-3.75 w-88 my-4 h-12'
                            placeholder="Enter your email"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='flex flex-col mt-4'>
                        <label htmlFor="email" className='text-[23px]'>Username : </label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            className='focus:outline-none font-normal text-[14px] leading-[100%] tracking-0 bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-white/20 px-3.75 w-90 my-4 h-12'
                            placeholder="Enter your username"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='flex flex-col mt-4'>
                        <label htmlFor="password" className='text-[23px]'>Password : </label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            className='focus:outline-none font-normal text-[14px] leading-[100%] tracking-0 bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-white/20 px-3.75 w-90 my-4 h-12'
                            placeholder="Enter your password"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className='cursor-pointer font-normal text-[18px] leading-[100$] tracking-0 bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-white/20 py-1.5 mt-6'>Submit</button>
                    <span className='mt-10 text-center'>
                        Already have an account? <Link to={"/login"} className='hover:text-black'>Login</Link>
                    </span>
                </form>
            </div>
        </div>
    )
}

export default Signup