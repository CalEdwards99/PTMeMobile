import React, {createContext, useContext, useReducer} from 'react';
import {userReducer, initialState} from './userReducer.jsx';
import {Login, Register} from '../API/users.js';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    const login = async (email,password) => {
        dispatch({type:'LOADING'});
        try{
            const userData = await Login(email,password);
            dispatch({type:'LOGIN_SUCCESS', payload:userData});
        } catch(err){
            dispatch({type:'LOGIN_ERROR', payload: err.message});
        }
    };

    const register = async (email, password) => {
        dispatch({type:'LOADING'});
        try{
            const result = await Register(email,password); 
            console.log("register success");
            dispatch({type:'REGISTER_SUCCESS'});
        }
        catch(err){
            console.log("register failed", err.message);
            dispatch({type:'REGISTER_FAILURE', payload: err.message})
        }
    }

    return (
        <UserContext.Provider value={{state, dispatch, login, register}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () =>{
    return useContext(UserContext);
}