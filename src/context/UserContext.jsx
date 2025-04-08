import React, {createContext, useContext, useReducer} from 'react';
import {userReducer, initialState} from './userReducer.jsx';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    return (
        <UserContext.Provider value={{state, dispatch}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () =>{
    return useContext(UserContext);
}