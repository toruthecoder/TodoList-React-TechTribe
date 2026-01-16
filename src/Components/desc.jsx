import { useState } from 'react'

const Desc = ({ todo, onEditTitle, onEditDesc, onClose }) => {
    const [tempDesc, setTempDesc] = useState(todo.desc || '')
    const [visible, setVisible] = useState(true)

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            onEditDesc(todo.id, tempDesc)
            onClose()
        } else if (e.key === 'Escape') {
            onClose()
        }
    }

    return (
        <>
            {visible && (<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                <div className="w-[400px] bg-white z-50 text-black p-6 rounded-xl relative">
                    <button
                        onClick={() => setVisible(!visible)}
                        className="absolute top-2 right-3 text-xl"
                    >
                        x
                    </button>

                    <h2 className="text-lg font-semibold mb-2">Title</h2>
                    <h1
                        className="text-xl font-semibold mb-3 cursor-pointer"
                        onClick={() => onEditTitle(todo)}
                    >
                        {todo.text}
                    </h1>

                    <h2 className="text-lg font-semibold mb-2">Description</h2>

                    <input
                        type="text"
                        value={tempDesc}
                        autoFocus
                        onChange={(e) => setTempDesc(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Add description..."
                        className="w-full border text-sm px-2 py-1 rounded"
                    />

                    <p className="text-xs mt-2 text-gray-500">
                        PRESS ENTER IN INPUT || ESC TO CANCEL
                    </p>
                </div >
            </div >)}

        </>
    )
}

export default Desc
