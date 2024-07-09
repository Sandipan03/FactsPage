import {useState,React, useEffect} from 'react'
import Post from '../components/post'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenNib } from '@fortawesome/free-solid-svg-icons'
import { useFactsContext } from '../hooks/useFactContext'
import {useAuthContext} from '../hooks/useAuthContext'

function Home() {
  const [addOpen, setaddOpen] = useState(false)
  const {facts,dispatch} = useFactsContext()
  const [title, settitle] = useState('')
  const [description, setdescription] = useState('')
  const [error, seterror] = useState(null)
  // const [facts, setfacts] = useState([])
  const {user} = useAuthContext()
  useEffect(()=>{
      const fetchfacts= async()=>{
        const response = await fetch (`${import.meta.env.VITE_APIURL}/api/facts/`)
        const json= await response.json()
        if (response.ok){
          dispatch({type:'SET_FACTS',payload:json})
          // setfacts(json)
        }
      }
      if (user){
        fetchfacts()
        console.log(facts)
      }
  },[])
  const handleAdd = async(e)=>{
    e.preventDefault()
    seterror(null)
    if (!title || !description){
      seterror('Please fill in all fields')
      return
    }
    const username= user.username
    const fact={username,title,description}
    const response= await fetch(`${import.meta.env.VITE_APIURL}/api/facts`,{
      method: 'POST',
      body: JSON.stringify(fact),
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
      dispatch({type:'ADD_FACT',payload:json})
      setaddOpen(false)
      settitle('')
      setdescription('')
    }
  }
  return (
    <div className=''>
        {!addOpen && <div className="w-3/4 sm:w-1/2 mx-auto flex justify-end">
      <button onClick={()=>{setaddOpen(true)}}className='text-white bg-orange-400 border-slate-3600 p-2 rounded-lg my-1 '>New Fact <FontAwesomeIcon icon={faPenNib} /></button>
      </div>}
      {addOpen && 
        <div className="w-3/4 sm:w-1/2 mx-auto flex flex-col mt-32">
            <div className="text-orange-400 text-2xl">Add a new fact</div>
            <input type="text" value={title} onChange={(e)=>{settitle(e.target.value)}}placeholder='Title' className='bg-gray-800 border border-white rounded-lg my-3 py-2 px-4 text-white focus:border-blue-500' autoComplete="off"/>
            <input type="text" value={description} onChange={(e)=>{setdescription(e.target.value)}} placeholder='Description' className='bg-gray-800 border border-white rounded-lg my-3 py-2 px-4 text-white focus:border-blue-500' autoComplete="off"/>
            <div className="flex ">
            <button className="text-white border border-white rounded-lg my-3 py-2 px-4 " onClick={()=>{setaddOpen(false); settitle(''); setdescription('');seterror(null)}}>Discard</button>
            <button className='bg-orange-400  py-2 px-4 rounded-lg my-3 ml-5 text-white' onClick={handleAdd}>Add  <FontAwesomeIcon icon={faPenNib} /></button>
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
        </div>
      }
      
      {facts && facts.map((fact)=>(
        <Post key={fact._id} fact={fact}/>
      ))}
      
      
    </div>
  )
}

export default Home