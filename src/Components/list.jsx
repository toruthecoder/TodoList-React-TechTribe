// import { useState } from 'react';
import { useTodos } from "../context/todoContext";
import Trash from '../assets/trash-solid-full.svg'

const List = ({ onDelete }) => {
    // const [editId, setEditId] = useState(null);
    // const [editText, setEditText] = useState('')
    const { todos, toggleTodos } = useTodos()

    return (
        <>
            {
                todos.map((todo) => (
                    <li key={todo.id} className='font-normal text-[30px] leading-[100%] tracking-0 flex flex-row items-start justify-between mt-5 w-[735px]  break-word text-white border bg-white/10 backdrop-blur-[32px] rounded-[85px] shadow-xl border-white/20 p-2 px-10 py-4' style={{
                        fontFamily: 'Baloo Tammudu 2, sans-serif'
                    }}>
                        <span
                            className={`cursor-pointer text-[26px] max-w-119.25 w-full break-words block ${todo.completed ? 'line-through' : ''}`}
                        >
                            {todo.text}
                            <span className='hidden text-[14px] text-white underline cursor-pointer hover:text-gray-300 ml-4 w-[90px] p-1 rounded-sm'>Show More</span>
                        </span>
                        <div className='flex items-center justify-center gap-2'>
                            <input type="checkbox" className='inputCheck cursor-pointer w-[18px] h-[18px] appearance-none rounded-lg bg-white' onClick={() => toggleTodos(todo.id)} />
                            <button className="delBtn cursor-pointer" onClick={() => onDelete(todo.id)} >
                                <img src={Trash} className='w-7.5' />
                            </button>
                        </div>
                    </li >
                ))
            }
        </>
    )
}

export default List

// Comment for simmulating push