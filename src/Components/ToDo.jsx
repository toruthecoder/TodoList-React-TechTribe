import { useTodos } from '../context/todoContext'
import { useState } from 'react';
import ChillhopVideo from '../assets/Chillhop.mp4';
import Swal from 'sweetalert2'
import { Rings } from 'react-loader-spinner'
import List from "../Components/List"
import Desc from './desc'

const ToDo = () => {
    const [value, setValue] = useState('')
    const { addTodo, setfiltered, deleteTodo, editTodo, setSortBy, editTodoDesc } = useTodos()
    const [editId, setEditId] = useState(null)
    const [loading, setLoading] = useState(true)
    const [openDescTodo, setOpenDescTodo] = useState(null)

    const handleAdd = () => {
        if (!value.trim()) {
            return
        }
        if (editId) {
            editTodo(editId.id, value)
            setEditId(null)
            setValue('')
        } else {
            addTodo(value.trim())
            setValue('')
        }
    }

    // Creating handleDelete function for 
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteTodo(id)

                Swal.fire({
                    title: "Deleted!",
                    text: "Your todo has been deleted.",
                    icon: "success",
                })
            }
        })
    }


    return (
        <>
            {/* loader*/}

            {loading && (
                <div className='absolute inset-0 h-screen w-scrren z-100 bg-white'>
                    <div className='absolute z-100 top-[50%] left-[45%]'>
                        <Rings
                            visible={true}
                            height="80"
                            width="80"
                            color="#4fa94d"
                            ariaLabel="rings-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        />
                    </div>
                </div>
            )}

            {/* Video */}
            <video
                autoPlay loop playsInline muted className="absolute inset-0 h-full w-full object-cover z-0" onCanPlay={() => { setLoading(false) }}>
                <source src={ChillhopVideo} type="video/mp4" />
            </video>

            {/* Main div */}
            <div className="relative container text-white w-full">
                <div className='wrapper relative z-20 flex flex-col items-center'>
                    <div className="head">
                        <h1 className='mt-14.5 mb-11 text-[36px] leading-[100%] tracking-[0] font-normal bg-[linear-gradient(20deg,_rgba(196, 86, 77, 1)_0%,_rgba(134, 75, 73, 1)_100%)] bg-clip-text  bg-white/30 backdrop-blur-lg rounded-xl shadow-xl border border-white/20 px-12 py-1.5 max-w-sm' style={{ fontFamily: 'Baloo 2, sans-serif' }}
                        >TODO-List</h1>
                    </div>
                    {/* The data div */}
                    <div className="inputArea px-5 max-w-286 w-full flex">
                        <input autoFocus type="text" name='input'
                            className='input focus:outline-none font-normal text-[20px] leading-[100%] tracking-0 bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-white/20 px-3.75 w-153.5 h-15'
                            placeholder='Enter ToDo' value={value} onChange={(e) => { setValue(e.target.value) }} />
                        <button
                            className='addBtn cursor-pointer ml-2.5 font-normal text-[18px] leading-[100$] tracking-0 bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-white/20 px-5'
                            onClick={handleAdd} style={{ fontFamily: 'Baloo Bhaina 2, sans-serif' }}
                        >{editId ? 'Update' : 'Add'}</button>

                        <div>
                            <select name="" id="select"
                                className='relative focus:outline-none appearance-none ml-11.5 w-65.5 h-15 font-normal text-[20px] leading-[100$] tracking-0 bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-white/20 pl-6.25' onChange={(e) => setfiltered(e.target.value)} style={{ fontFamily: 'Baloo Bhaina 2, sans-serif' }}>
                                <option className='all bg-black text-white' value="all">All</option>
                                <option className='complete bg-black text-white' value="complete">
                                    Completed</option>
                                <option className='incomplete bg-black text-white' value="incomplete">Pending
                                </option>
                            </select>
                        </div>

                        <div>
                            <select name="" id="select"
                                className='relative focus:outline-none ml-11.5 w-50 h-15 font-normal text-[20px] leading-[100$] tracking-0 bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-white/20 pl-3' onChange={(e) => setSortBy(e.target.value)} style={{ fontFamily: 'Baloo Bhaina 2, sans-serif' }}>
                                <option className='Sort bg-black text-white' value="Sort">Sort By</option>
                                <option className='alphabet bg-black text-white' value="alphabet">Alphabet</option>
                                <option className='Last-Edited bg-black text-white' value="last-edited">
                                    Last Edited</option>
                                <option className='recently-created bg-black text-white' value="recently-created">Recently Created
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="list">
                        <ul className='mt-18.5 break-word h-[63vh] overflow-auto flex flex-col items-start px-5'>{
                            <List
                                onDelete={(id) => handleDelete(id)}
                                onEdit={(todo) => {
                                    setValue(todo.text)
                                    setEditId(todo)
                                }}
                                openDescTodo={todo => setOpenDescTodo(todo)}
                            />
                        }
                        </ul>
                    </div>


                    {/* Description */}

                    <div className=''>
                        {openDescTodo && (
                            <Desc
                                todo={openDescTodo}
                                onEdit={(todo) => {
                                    setValue(todo.text)
                                    setEditId(todo)
                                    setOpenDescTodo(null)
                                }}
                                onSave={(id, desc) => {
                                    editTodoDesc(id, desc)
                                    setOpenDescTodo(null)
                                }}
                                onClose={() => setOpenDescTodo(null)}
                            />
                        )}
                    </div>

                </div>
            </div >
        </>
    )
}

export default ToDo