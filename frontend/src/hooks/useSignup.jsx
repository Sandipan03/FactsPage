import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () =>{
    const [signuperror, setsignuperror] = useState(null)
    const {user,dispatch} = useAuthContext()
    const signup= async (email,fullname,username,password)=>{
        setsignuperror(null)
        const response= await fetch('http://localhost:4000/api/users/signup',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email,fullname,username,password})
        })
        const json= await response.json()
        if (!response.ok){
            setsignuperror(json.error)
        }
        if(response.ok){
            localStorage.setItem('user',JSON.stringify(json))
            dispatch({type: 'LOGIN', payload: json})

        }
    }
    console.log(user)
    return {signup,signuperror,setsignuperror}
}