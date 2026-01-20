import { useTodos } from "../context/todoContext";
import SML from '../Components/SML'
import Trash from '../assets/trash-solid-full.svg'

const List = ({ onDelete, openDescTodo }) => {
    const { todos, toggleTodos } = useTodos()

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
                    <li key={todo.id} className="text-white border mt-5 bg-white/10 backdrop-blur-[32px] rounded-[85px] shadow-xl border-white/20 p-2 px-10 py-4 z-0" style={{
                        fontFamily: 'Baloo Tammudu 2, sans-serif'
                    }}>
                        <div className="flex items-start justify-between w-185.75 ">
                            <div className='font-normal text-[30px] leading-[100%] tracking-0 flex flex-col items-start justify-between w-120.75  break-word ' style={{
                                fontFamily: 'Baloo Tammudu 2, sans-serif'
                            }}>
                                {/* OnClick send the edit data */}
                                <span
                                    className={`cursor-pointer text-[26px] max-w-119.25 w-full break-words block ${todo.completed ? 'line-through' : ''}`}
                                    onClick={() => openDescTodo(todo)}
                                >
                                    {/* Check if the editid match the todoid and then handle the data or sliced data accordingly */}
                                    <SML text={todo.text || 'Write Title'} />
                                </span>

                                {/* Description text */}
                                <span onClick={() => openDescTodo(todo)} className="cursor-pointer text-[14px]">
                                    {/* The || is for desc that is empty because if I dont define it like this it gives me undefined*/}
                                    {(todo.desc || "").length < 20 ? (todo.desc || "") : (todo.desc || "").slice(0, 60) + '...'}

                                </span>
                            </div>

                            {/* This is the trash input */}
                            <div className='flex items-center justify-center gap-2' >
                                <input type="checkbox" className='inputCheck cursor-pointer w-4.5 h-4.5 rounded-lg bg-white' checked={todo.completed} onChange={() => toggleTodos(todo.id)} />
                                <button className="delBtn cursor-pointer" onClick={() => {
                                    onDelete(todo.id);
                                }} >
                                    <img src={Trash} className='w-7.5' />
                                </button>
                            </div>
                        </div>

                        {/* This is the last-edit and last-created section */}
                        <div>
                            <p className="mt-1 text-[12px]">Last-created: {getTimeAgo(todo.lastCreated)} -- Last-Edited: {todo.lastEdit ? getTimeAgo(todo.lastEdit) : 'Never'}</p>
                        </div>
                    </li >
                ))
            }

        </>
    )
}

export default List

// Comment for simmulating push