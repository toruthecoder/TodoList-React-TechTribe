import { useState } from 'react'
import { RxCross2 } from "react-icons/rx";

const Desc = ({ todo, onEdit, onClose, onSave, ref }) => {
    const [tempDesc, setTempDesc] = useState(todo.desc || '')

    return (
        <>
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" >
                <div className="w-100 z-50 text-black p-6 rounded-xl relative  bg-gray-500/30 backdrop-blur-lg rounded-xl shadow-xl border border-white/20" ref={ref}>
                    <button
                        onClick={() => onClose()}
                        className="absolute top-2 right-3 text-2xl cursor-pointer text-white"
                    >
                        <RxCross2 />
                    </button>

                    <h2 className="text-lg font-semibold mb-2 text-white">Title</h2>
                    <textarea
                        className="text-xl font-semibold mb-3 cursor-pointer text-white text-white border-none bg-white/10 rounded-[3px] px-2 py-2 resize-none outline-none w-[350px] h-[50px]"
                        onClick={() => onEdit(todo)}
                    >
                        {todo.text}
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
                    <button onClick={() =>
                        onSave(todo.id, tempDesc)
                    }
                        className='hover:bg-[#3085d6] text-white px-10 py-1 mt-2 rounded-[3px] cursor-pointer bg-white/10 backdrop-blur-lg shadow-xl'>
                        Save
                    </button>
                </div >
            </div >
        </>
    )
}

export default Desc
