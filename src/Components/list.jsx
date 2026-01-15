import { useTodos } from "../context/todoContext";
import Trash from '../assets/trash-solid-full.svg'
import { useState } from 'react'

const List = ({ onDelete, onEdit }) => {
    const { todos, toggleTodos } = useTodos()
    const [expand, setExpand] = useState(null)

    const getTimeAgo = (timestamp) => {
        const now = Date.now();
        // rounding the vlaue getting from the todoContext/useTodo into seconds
        const seconds = Math.floor((now - timestamp) / 1000);

        // Checking if the rounded value is smaller then then 60 seconds and return
        if (seconds < 60) return `${seconds} seconds ago`;

        // rounding the value to from seconds to minutes 
        const minutes = Math.floor(seconds / 60);

        // Checking if the minutes is smaller then 60 seconds
        if (minutes < 60) return `${minutes} minutes ago`;

        // rounding the value to from minutes to hours
        const hours = Math.floor(minutes / 60);

        // checking if the hour is smaller then 24 hours
        if (hours < 24) return `${hours} hours ago`;

        // rounding the value to from hours to days 
        const days = Math.floor(hours / 24);
        // checking if the hours exceeds 24 then return days
        return `${days} days ago`;
    };


    return (
        <>
            {
                // Mapping the todos
                todos.map((todo) => (
                    <li key={todo.id} className="text-white border mt-5 bg-white/10 backdrop-blur-[32px] rounded-[85px] shadow-xl border-white/20 p-2 px-10 py-4" style={{
                        fontFamily: 'Baloo Tammudu 2, sans-serif'
                    }}>
                        <div className='font-normal text-[30px] leading-[100%] tracking-0 flex flex-row items-start justify-between w-[735px]  break-word ' style={{
                            fontFamily: 'Baloo Tammudu 2, sans-serif'
                        }}>
                            {/* OnClick send the edit data */}
                            <span
                                className={`cursor-pointer text-[26px] max-w-119.25 w-full break-words block ${todo.completed ? 'line-through' : ''}`}
                                onClick={() => onEdit(todo)}
                            >
                                {/* Check if the editid match the todoid and then handle the data or sliced data accordingly */}
                                {expand === todo.id ? todo.text : todo.text.slice(0, 30)}
                            </span>
                            {/* Checking if the data is sliced or not and showmore and less accordingly */}
                            {todo.text.length > 30 && (
                                <span className='text-[14px] text-white underline cursor-pointer hover:text-gray-300 w-[90px]'
                                    onClick={() => setExpand(expand === todo.id ? null : todo.id)}
                                >
                                    {expand === todo.id ? 'Show Less' : 'Show More'}
                                </span>

                            )}
                            <div className='flex items-center justify-center gap-2'>
                                <input type="checkbox" className='inputCheck cursor-pointer w-[18px] h-[18px] appearance-none rounded-lg bg-white' checked={todo.completed} onChange={() => toggleTodos(todo.id)} />
                                <button className="delBtn cursor-pointer" onClick={() => onDelete(todo.id)} >
                                    <img src={Trash} className='w-7.5' />
                                </button>
                            </div>
                        </div>
                        <div>
                            <p className="text-[12px]">Last-created: {getTimeAgo(todo.lastCreated)} -- Last-Edit:{getTimeAgo(todo.lastEdit)}</p>
                        </div>
                    </li >
                ))
            }

        </>
    )
}

export default List

// Comment for simmulating push`