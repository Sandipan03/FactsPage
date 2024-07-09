import {createContext,useReducer} from 'react';

export const FactContext= createContext();

export const factsReducer = (state, action)=>{
    switch(action.type){
        case 'SET_FACTS':
            return {facts: action.payload}
        case 'ADD_FACT':
            return {
                facts: [action.payload,...state.facts]
            }
        default:
            return state
    }
}
export const FactContextProvider = ({children})=>{
    const [state,dispatch]= useReducer(factsReducer,{
        facts:[]
    })

return (
    <FactContext.Provider value={{...state,dispatch}}>

        {children}
    </FactContext.Provider>
)
}