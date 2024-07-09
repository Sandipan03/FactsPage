import { useAuthContext } from "./useAuthContext";
import { useFactsContext } from "./useFactContext";

export const useLogout =()=>{
    const {dispatch} = useAuthContext()
    const {dispatch:dispatchFacts} = useFactsContext()
    const logout = ()=>{
        localStorage.removeItem('user')
        dispatch({type: 'LOGOUT'})
        dispatchFacts({type:'SET_FACTS',payload:null})
    }
    return {logout}
}