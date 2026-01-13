import ChillhopVideo from '../assets/Chillhop.mp4';

function ToDo() {
    return (
        <>
            <div className='noti absolute  w-full h-full z-100 hidden'>
                <div
                    className='get hidden relative w-75 top-[50%] left-[40%] bg-[white] px-10 py-10 z-100 text-center flex flex-col rounded-[10px]'>
                    <p>Are You Sure?</p>
                    <div className='flex gap-2 mt-4 justify-center'>
                        <button className='yesBtn bg-red-400 rounded-[5px] cursor-pointer px-5 text-white py-1'>Delete</button>
                        <button className='noBtn bg-green-400 rounded-[5px] cursor-pointer px-5 text-white py-1'>Cancel</button>
                    </div>
                </div>
            </div>

            <div className='goo'>
                <div className="loader"></div>
            </div>
            <video autoPlay loop playsInline muted className="absolute inset-0 h-full w-full object-cover -z-100">
                <source src={ChillhopVideo} type="video/mp4" />
            </video>
            <div className="container text-white w-full">
                <div className='wrapper relative z-10 flex flex-col items-center'>
                    <div className="head">
                        <h1 className='mt-14.5 mb-11 text-[36px] leading-[100%] tracking-[0] font-normal bg-[linear-gradient(20deg,_rgba(196, 86, 77, 1)_0%,_rgba(134, 75, 73, 1)_100%)] bg-clip-text  bg-white/30 backdrop-blur-lg rounded-xl shadow-xl border border-white/20 px-12 py-1.5 max-w-sm'
                        >TODO-List</h1>
                    </div>
                    <div className="inputArea px-5 max-w-286 w-full flex">
                        <input type="text" name='input'
                            className='input focus:outline-none font-normal text-[20px] leading-[100%] tracking-0 bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-white/20 px-3.75 w-153.5 h-15'
                            placeholder='Enter ToDo' />
                        <button
                            className='addBtn cursor-pointer ml-2.5 font-normal text-[18px] leading-[100$] tracking-0 bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-white/20 px-5'
                        >Add</button>
                        <div>
                            <select name="" id="select"
                                className='relative focus:outline-none appearance-none ml-11.5 w-87.5 h-15 font-normal text-[20px] leading-[100$] tracking-0 bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-white/20 pl-6.25'>
                                <option className='all bg-black text-white' value="all">All</option>
                                <option className='complete bg-black text-white' value="complete">
                                    Completed</option>
                                <option className='incomplete bg-black text-white' value="incomplete">Pending
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="list">
                        <ul className='mt-18.5 wrap-break-word h-[63vh] overflow-auto flex flex-col items-start px-5'></ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ToDo