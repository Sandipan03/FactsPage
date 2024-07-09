import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faHouse} from '@fortawesome/free-solid-svg-icons'
import { useAuthContext } from '../hooks/useAuthContext'
import { Link , useLocation} from 'react-router-dom'
function navbar() {
  const {user} = useAuthContext()
  const location= useLocation()
  return (
    <nav className='bg-gray-900 text-white h-16 flex justify-between mb-10'>
      <Link to='/'>
        <div className='text-3xl ml-7 py-3 '>
            <span className='text-orange-400'>F</span>acts<span className='text-orange-400'>P</span>age
        </div> </Link>
        {user && location.pathname!='/profile' && <div >
         <Link to="/profile"> <button className='bg-orange-400 border-slate-3600 p-2 rounded-lg my-3 mr-5'>My Profile <FontAwesomeIcon icon={faUser} /></button></Link>
        </div>}
        {user && location.pathname==='/profile' && <div >
         <Link to="/"> <button className='bg-orange-400 border-slate-3600 p-2 rounded-lg my-3 mr-5'> Home <FontAwesomeIcon icon={faHouse} /></button></Link>
        </div>}
        
    </nav>
  )
}

export default navbar