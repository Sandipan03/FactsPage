import React, { useEffect } from 'react'
import { useState } from 'react'
import {useLogin} from '../hooks/useLogin'
import {useSignup} from '../hooks/useSignup'
function Welcome() {
    const [openLogin, setopenLogin] = useState(false)
    const [openSignup, setopenSignup] = useState(false)
    const [error, seterror] = useState(null)
    const {login,loginerror,setloginerror} = useLogin()
    const {signup,signuperror,setsignuperror}= useSignup()
    const [email, setemail] = useState('')
    const [fullname, setfullname] = useState('')
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const [confirmpassword, setconfirmpassword] = useState('')
    useEffect(()=>{
      setemail('')
      setusername('')
      setfullname('')
      setpassword('')
      setconfirmpassword('')
      seterror(null)
      setsignuperror(null)
      setloginerror(null)
    },[])
    const handleSignup = async(e) =>{
        e.preventDefault()
        seterror(null)
        if (password !== confirmpassword){
            seterror('Passwords do not match')
            return
        
        }
      
      await signup(email,fullname,username,password);
      // seterror(signuperror)
      
    }
    const handleLogin = async(e) =>{
      e.preventDefault()
        await login(email,password)
        // seterror(loginerror)
       
        
    }
  return (
    <div className=''>
        
        {!openLogin && !openSignup &&
        <div className=" w-3/4 sm:w-1/2 mx-auto mt-40">
                <div className='font-bold text-white text-4xl'>Welcome to the world of facts !</div>
                <div className='text-white text-2xl my-3'>Please login or signup to continue</div>
            <div className="flex ">
            <button className="text-white border border-white rounded-lg my-3 py-2 px-4 " onClick={()=>{setopenSignup(true)}}>SignUp</button>
            <button className='bg-orange-400  py-2 px-4 rounded-lg my-3 ml-5 text-white' onClick={()=>{setopenLogin(true)}}>Log in </button>
            </div>
        </div>
        }
        {openSignup && 
        <div  className="w-3/4 sm:w-1/2 mx-auto  flex flex-col mt-32">
            <div className="text-white text-3xl font-semibold mb-5">Sign up</div>
            <input type="text" placeholder='Full Name' value={fullname} onChange={(e)=>{setfullname(e.target.value)}} className='bg-gray-800 border border-white rounded-lg my-3 py-2 px-4 text-white focus:border-blue-500' autoComplete="off"/>
            <input type="text" placeholder='Email' value={email} onChange={(e)=>{setemail(e.target.value)}} className='bg-gray-800 border border-white rounded-lg my-3 py-2 px-4 text-white focus:border-blue-500' autoComplete="off"/>
            <input type="text" placeholder='Username' value={username} onChange={(e)=>{setusername(e.target.value)}} className='bg-gray-800 border border-white rounded-lg my-3 py-2 px-4 text-white focus:border-blue-500' autoComplete="off"/>
            <input type="password" placeholder='Password' value={password} onChange={(e)=>{setpassword(e.target.value)}} className='bg-gray-800 border border-white rounded-lg my-3 py-2 px-4 text-white focus:border-blue-500' autoComplete="off"/>
            <input type="password" placeholder='Confirm Password' value={confirmpassword} onChange={(e)=>{setconfirmpassword(e.target.value)}} className='bg-gray-800 border border-white rounded-lg my-3 py-2 px-4 text-white focus:border-blue-500 ' autoComplete="off"/>
            <div className="flex justify-end">
                <button className='bg-orange-400  py-2 px-4 rounded-lg my-2 ml-5 text-white' onClick={handleSignup}>Sign up </button>
            </div>
            <div className="flex justify-start">
            <button className="text-white border border-white rounded-lg  py-2 px-4 " onClick={()=>{setopenSignup(false);setemail('');setpassword('');setconfirmpassword('');setusername('');setfullname('');seterror(null);setsignuperror(null)}}>Back</button>
            </div>
            {(error || signuperror) && 
            <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800 mt-10" role="alert">
            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Error! </span> {error? error:signuperror}
            </div>
          </div>
            }
        </div>
        }
        {openLogin && 
        <div  className=" w-3/4 sm:w-1/2 mx-auto  flex flex-col mt-32">
            <div className="text-white text-3xl font-semibold mb-5">Log in</div>
            <input type="text" placeholder='Email' value={email} onChange={(e)=>{setemail(e.target.value)}}className='bg-gray-800 border border-white rounded-lg my-3 py-2 px-4 text-white focus:border-blue-500' autoComplete="off"/>
            <input type="password" placeholder='Password' value={password} onChange={(e)=>{setpassword(e.target.value)}} className='bg-gray-800 border border-white rounded-lg my-3 py-2 px-4 text-white focus:border-blue-500' autoComplete="off"/>
            <div className="flex justify-end">
                <button className='bg-orange-400  py-2 px-4 rounded-lg my-2 ml-5 text-white' onClick={handleLogin}>Log in </button>
            </div>
            <div className="flex justify-start">
            <button className="text-white border border-white rounded-lg  py-2 px-4 " onClick={()=>{setopenLogin(false); setemail('');setpassword('');seterror(null);setloginerror(null)}}>Back</button>
            </div>
            {loginerror && 
            <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800 mt-10" role="alert">
            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Error !</span>{loginerror}
            </div>
          </div>
            }
        </div>
        }
    </div>
  )
}

export default Welcome