import React, { useEffect } from 'react'
import {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faPen } from '@fortawesome/free-solid-svg-icons'
import Post from '../components/post'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useFactsContext } from '../hooks/useFactContext'

function Profile() {
  const {logout} = useLogout()
  const {user,dispatch:dispatchauth} = useAuthContext()
  const {facts,dispatch}= useFactsContext()
  const [yourfacts, setyourfacts] = useState([])
  const [openedit, setopenedit] = useState(false)
  const [newname, setnewname] = useState(user.fullname)
  const [newmail, setnewmail] = useState(user.email)
  const [error, seterror] = useState(null)
  useEffect(()=>{
    setyourfacts([])
    setyourfacts(facts.filter(fact=>{return fact.username===user.username}))
  },[facts])
  // const yourfacts= facts.filter(fact=>{return fact.username===user.username})
  const handleLogout = ()=>{
    logout()
  }
  const handleEdit = async (e)=>{
    e.preventDefault()
    seterror(null)
    if (!newname || !newmail){
      seterror('Please fill in all fields')
      return
    }
    const data={fullname:newname,email:newmail}
    const response= await fetch('http://localhost:4000/api/users/update/'+user.uid,{
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json= await response.json()
    if (!response.ok){
      seterror(json.error)
      console.log(json.error)
    }
    if(response.ok){
      seterror(null)
      setopenedit(false)
      dispatchauth({type:'LOGIN',payload:json})
    
    }
  }
  return (
    <div className=''>
        
        <div className=' border-transparent rounded-lg bg-gray-900 w-3/4 sm:w-1/2 text-white mt-10 mx-auto h-auto pl-4 py-3 shadow-lg shadow-black flex justify-between'>     
        {user && <div>
        <div className='text-orange-400 font-mono font-semibold text-2xl'>{user.username}</div>
        <div className='text-xl font-semibold my-3'>{user.fullname}</div>
        <div className="text-lg">{user.email} </div>
        {/* <div className="text-sm">{user.uid}</div> */}
        </div>}
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 mr-4 mt-2">
                <span className="font-medium text-gray-600 dark:text-gray-300">{user.username.charAt(0)}</span>
            </div>
        </div>
        <div className=" w-3/4 sm:w-1/2 mx-auto flex justify-center my-8 ">
        <button onClick={handleLogout} className=" bg-orange-400 text-white p-2 rounded-lg mr-2 ">Log Out <FontAwesomeIcon icon={faRightFromBracket} /></button>
        {!openedit && 
        <button onClick={()=>{setopenedit(true)}} className=" bg-orange-400 text-white p-2 rounded-lg ml-2">Edit Profile </button>
        }
        </div>
       {openedit && <div className='mx-auto  w-3/4 sm:w-1/2 mb-4 flex flex-col'>
          <input type="text" onChange={(e)=>{setnewname(e.target.value)}} placeholder='Full Name' value={newname} className='bg-gray-800 border border-white rounded-lg my-3 py-2 px-4 text-white focus:border-blue-500'/>
          <input type="text" onChange={(e)=>{setnewmail(e.target.value)}} placeholder='Email'value={newmail} className='bg-gray-800 border border-white rounded-lg my-3 py-2 px-4 text-white focus:border-blue-500'/>
          <div className="flex flex-row justify-end mt-2">
          <button onClick={()=>{setopenedit(false); setnewmail(user.email); setnewname(user.fullname);seterror(null)}} className=" text-white border border-white rounded-lg  py-2 px-4 mr-2 ">Cancel </button>
          <button onClick={handleEdit} className=" bg-orange-400 text-white p-2 rounded-lg ml-2">Update </button>
          </div>
          {error && 
              <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800 mt-10" role="alert">
              <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">Error! </span> {error}
              </div>
            </div>
            }
        </div>}
        <div className=" w-3/4 sm:w-1/2 mx-auto text-white">
         <div className="text-orange-400 text-xl">Your Posts</div>
        </div>
        <div className=" mx-auto ">
       { yourfacts.length?(yourfacts.map((fact)=>(
        <Post key={fact._id} fact={fact}/>
      ))):(
        <div className='text-white w-1/2 mx-auto flex justify-center text-xl mt-8 font-semibold text-opacity-50' >
          You haven't posted anything yet : &#x29;
        </div>)
      }
        {/* <Post />
        <Post />
        <Post />
        <Post /> */}
        </div>
    </div>
  )
}

export default Profile