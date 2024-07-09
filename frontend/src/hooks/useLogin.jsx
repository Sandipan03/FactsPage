import { useState } from "react";
import {useAuthContext} from "../hooks/useAuthContext";

export const useLogin = () => {
    const [loginerror, setloginerror] = useState(null)
    
    const {user,dispatch} = useAuthContext()
    const login = async (email,password)=> {
        setloginerror(null)
        
        const response = await fetch(`${import.meta.env.VITE_APIURL}/api/users/login`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email,password})
        })
        const json= await response.json()
        if (!response.ok){
            setloginerror(json.error)
            
        }
        if (response.ok){
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({type: 'LOGIN', payload: json})
            
            
        }
    }
    console.log(user)
    return {login, loginerror,setloginerror}
}