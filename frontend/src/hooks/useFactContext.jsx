import { FactContext } from "../context/FactContext";
import {useContext} from 'react';

export const useFactsContext = () =>{
    const context = useContext(FactContext)
    if (!context){
        throw Error('useFactsContext must be used within FactContextProvider')
    }
    return context
}