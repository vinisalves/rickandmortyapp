import React, {createContext,  useContext } from "react";
import {CharacterProps} from "../services/Character"

const Context = createContext<CharacterProps[] | null>(null);   

export const CharacterProvider  = ({children} : {children: React.ReactNode}) => {
    return (
        <Context.Provider value={null}>
            {children}
        </Context.Provider>
        
    )
}


export const CharacterContext = () => useContext(Context);