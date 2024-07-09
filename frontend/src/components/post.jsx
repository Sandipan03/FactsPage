import React from 'react'

function post({fact}) {
  return (
    <div className=' border-transparent rounded-lg bg-gray-900 w-3/4 sm:w-1/2 text-white mt-10 mx-auto h-auto pl-4 py-3 shadow-lg shadow-black'>
        <div className='text-orange-400 font-mono font-semibold'>{fact.username}</div>
        <div className="text-white font-bold">{fact.title}</div>
        <div className="text-white ">{fact.description}</div>
        
    </div>
  )
}

export default post