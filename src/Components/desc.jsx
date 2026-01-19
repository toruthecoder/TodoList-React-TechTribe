import { useState } from 'react'

const Desc = ({ todo, onEdit, onClose, onSave }) => {
    const [tempDesc, setTempDesc] = useState(todo.desc || '')

    return (
        <>
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                <div className="w-100 z-50 text-black p-6 rounded-xl relative  bg-gray-500/30 backdrop-blur-lg rounded-xl shadow-xl border border-white/20">
                    <button
                        onClick={() => onClose()}
                        className="absolute top-2 right-3 text-3xl cursor-pointer text-white hover:text-black"
                    >
                        x
                    </button>

                    <h2 className="text-lg font-semibold mb-2 text-white">Title</h2>
                    <h1
                        className="text-xl font-semibold mb-3 cursor-pointer text-white"
                        onClick={() => onEdit(todo)}
                    >
                        {todo.text}
                    </h1>

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
                        className='bg-[#3085d6] text-white px-10 py-1 mt-4 rounded-[3px] cursor-pointer '>
                        Save
                    </button>
                </div >
            </div >
        </>
    )
}

export default Desc
