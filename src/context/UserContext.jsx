import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { userReducer, initialState } from './userReducer.jsx';
import { Login, Register, Logout } from '../API/users.js';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    const login = async (email, password) => {
        dispatch({ type: 'LOADING' });
        try {
            const { token } = await Login(email, password);
            console.log("token = " + token);
            // Save token locally
            await AsyncStorage.setItem('token', token);

            dispatch({ type: 'LOGIN_SUCCESS' });
        } catch (err) {
            dispatch({ type: 'LOGIN_FAILURE', payload: err.message });
        }
    };

    const register = async (email, password) => {
        dispatch({ type: 'LOADING' });
        try {
            const result = await Register(email, password);
            console.log("register success");
            dispatch({ type: 'REGISTER_SUCCESS' });
        }
        catch (err) {
            console.log("register failed", err.message);
            dispatch({ type: 'REGISTER_FAILURE', payload: err.message })
        }
    };

    const logout = async () => {
        console.log("logging out");
        const result = await Logout();
        dispatch({ type: 'USER_LOGOUT' })
    };

    const tryAutoLogin = async () => {
        dispatch({ type: 'LOADING' });
        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                dispatch({ type: 'LOGIN_SUCCESS' });
            }
            else{
                dispatch({ type: 'USER_LOGOUT' })
            }

        }
        catch (err) {
            dispatch({ type: 'LOGIN_FAILURE', payload: err.message });
        }
    }

    //runs once on app load.
    useEffect(() => {
        tryAutoLogin();
      }, []);

    return (
        <UserContext.Provider value={{ state, dispatch, login, register, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
}