import { useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import Swal from 'sweetalert2';
import toast from 'react-hot-toast'
import api from '../lib/axios.js'


const Desc = ({ todo, onClose, onSave, modelRef }) => {

    const initialText = todo?.title;
    const [tempDesc, setTempDesc] = useState(todo?.content || '');
    const [tempText, setTempText] = useState(initialText);

    const handleSave = async () => {

        if (!tempText && tempText.length === 0) {
            Swal.fire({
                title: 'Cannot Save',
                text: 'Todo title cannot be empty.',
                icon: 'warning',
                confirmButtonText: 'Close',
            });
        } else {
            try {
                await api.put(`/todos/${todo.id}`, {
                    title: tempText,
                    content: tempDesc,
                    completed: todo.completed,
                })
                toast.success(`Todo Updated.`)
                onSave(todo.id, tempDesc, tempText);
                onClose()
            } catch (error) {
                console.error('Error Updating todo', error)
                toast.error('Error Creating todo')
            }
        }

    }

    return (
        <>
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" >
                <div className="w-100 z-50 text-black p-6 relative bg-gray-500/30 backdrop-blur-lg rounded-xl shadow-xl border border-white/20" ref={modelRef}>
                    <button
                        onClick={() => onClose()}
                        className="absolute top-2 right-3 text-2xl cursor-pointer text-white"
                    >
                        <RxCross2 />
                    </button>

                    <h2 className="text-lg font-semibold mb-2 text-white">Title</h2>
                    <textarea
                        value={tempText}
                        className="text-xl font-semibold mb-3 cursor-pointer text-white border-none bg-white/10 rounded-[3px] px-2 py-2 resize-none outline-none w-[350px]"
                        onChange={(e) => setTempText(e.target.value)}
                    >
                        {todo.title}
                    </textarea>

                    <h2 className="text-lg font-semibold mb-2 text-white">Description</h2>

                    <textarea
                        type="text"
                        value={tempDesc}
                        autoFocus
                        onChange={(e) => setTempDesc(e.target.value)}
                        placeholder="Add description..."
                        className="w-full border text-sm px-2 py-1 rounded h-50 resize-none outline-none text-white border-none bg-white/10"
                    />
                    <button onClick={handleSave}
                        className='hover:bg-[#3085d6] text-white px-10 py-1 mt-2 rounded-[3px] cursor-pointer bg-white/10 backdrop-blur-lg shadow-xl'>
                        Save
                    </button>
                </div >
            </div >
        </>
    )
}

export default Desc
