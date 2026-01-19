import { useState } from 'react'

const Desc = ({ todo, onEdit, onClose, onSave }) => {
    const [tempDesc, setTempDesc] = useState(todo.desc || '')

    return (
        <>
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                <div className="w-[400px] bg-white z-50 text-black p-6 rounded-xl relative">
                    <button
                        onClick={() => onClose()}
                        className="absolute top-2 right-3 text-xl"
                    >
                        x
                    </button>

                    <h2 className="text-lg font-semibold mb-2">Title</h2>
                    <h1
                        className="text-xl font-semibold mb-3 cursor-pointer"
                        onClick={() => onEdit(todo)}
                    >
                        {todo.text}
                    </h1>

                    <h2 className="text-lg font-semibold mb-2">Description</h2>

                    <textarea
                        type="text"
                        value={tempDesc}
                        autoFocus
                        onChange={(e) => setTempDesc(e.target.value)}
                        placeholder="Add description..."
                        className="w-full border text-sm px-2 py-1 rounded h-[200px] resize-none"
                    />
                    <button onClick={() =>
                        onSave(todo.id, tempDesc)
                    }
                        className='bg-[#3085d6] text-white px-10 py-1 mt-4 rounded-[3px]'>
                        Save
                    </button>
                </div >
            </div >
        </>
    )
}

export default Desc
