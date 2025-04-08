import React, {createContext, useContext, useReducer} from 'react';
import {userReducer, initialState} from './userReducer.jsx';
import {Login, Register} from '../API/users.js';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    const login = async (email,password) => {
        //dispatch({type});
        try{
            const userData = await Login(email,password);
            //dispatch({type:'LOGIN_SUCCESS', payload:userData});
            dispatch({type:'LOGIN', payload:userData});
        } catch(err){
            //dispatch({type:'LOGIN_ERROR', payload: err.message});
        }
    };

    return (
        <UserContext.Provider value={{state, dispatch, login}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () =>{
    return useContext(UserContext);
}