import React from 'react'
import { useState } from 'react'

import { useDispatch } from 'react-redux'
import { add } from '../redux/appSlice'

const Add = () => {

  const [title, setTitle] = useState("")
  const [value, setValue] = useState("")

  const dispatch = useDispatch()

  function create() {
    const note = {
        title: title,
        content: value,
        id: Date.now().toString(10),
        date: new Date().toISOString()
    }

    dispatch(add(note))
    setTitle('')
    setValue('')
  }

  return (
    <div className='flex justify-center px-4'>
      <div className='flex flex-col w-[90vw] md:w-[70vw]'>
        {/* Input + Button */}
        <div className='flex items-center justify-between mt-6 gap-3 flex-wrap'>
          <input
            style={{ backgroundColor: '#1c1b1b' }}
            placeholder='Enter title...'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-[60vw] md:w-[55vw] rounded-xl p-4 text-[#8a9db8] outline-none'
          />

          <button 
           style={{borderRadius: '1rem'}}
           onClick={create}
           className='py-3 px-6 bg-[#1c1b1b] text-[#8a9db8] hover:bg-[#002b52] transition-all duration-300'>
            Create
          </button>

          {/* Content */}
          <textarea
            style={{ backgroundColor: '#1c1b1b' }}
            placeholder='Type something...'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={8}
            className='w-[90vw] md:w-[70vw] rounded-xl p-4 text-[#8a9db8] outline-none'
          />
        </div>
      </div>
    </div>
  )
}

export default Add
