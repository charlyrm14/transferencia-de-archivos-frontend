import { useReducer, useState } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import { 
    SUCCESSFUL_REGISTRATION,
    REGISTRATION_ERROR,
    SUCCESSFUL_LOGIN,
    LOGIN_ERROR,
    AUTHENTICATED_USER,
    LOGOUT,
    CLEAN_ALERT
} from "../../types";
import axiosClient from "../../config/axios";
import { tokenAuth } from "../../config/tokenAuth";



export function AuthState ( { children } ) {

    // State inicial
    const initialState = {
        token:          typeof window !== 'undefined' ? localStorage.getItem('token') : "",
        authenticated:  null,
        user:           null,
        message:        null,
    }

    // Se define Reducer
    const [ state, dispatch ] = useReducer( authReducer, initialState );

    // Registra nuevo usuario
    const registerUser = async ( data ) => {
        
        try {

            const response = await axiosClient.post('/api/users/signup', data );
            

            dispatch({
                type:       SUCCESSFUL_REGISTRATION,
                payload:    response.data.message
            })
            
        } catch ( error ) {
            
            dispatch({
                type:       REGISTRATION_ERROR,
                payload:    error.response.data.message
            })

        }

        // Limpia alerta despues de 3 segundos
        setTimeout( () => {
            dispatch({
                type:   CLEAN_ALERT
            })
        }, 3000 );

    };


    // Login usuario
    const loginUser = async ( data ) => {
        
        try {
            
            const response = await axiosClient.post('/api/users/login', data );
            
            dispatch({
                type:       SUCCESSFUL_LOGIN,
                payload:    response.data.token
            })

        } catch (error) {
            
            dispatch({
                type:       LOGIN_ERROR,
                payload:    error.response.data.message
            });
        }

        // Limpia alerta despues de 3 segundos
        setTimeout( () => {
            dispatch({
                type:   CLEAN_ALERT
            })
        }, 3000 );

    };

    // Retornar usuario autenticado en base a json web token
    const authenticatedUser = async () => {
        const getToken = localStorage.getItem('token');

        if ( getToken ) {
            tokenAuth( getToken );
        }

        try {

            const response = await axiosClient('/api/users/login');

            if ( response.data.user ) {

                dispatch({
                    type:       AUTHENTICATED_USER,
                    payload:    response.data.user,
                });
                
            }
            
            
            
        } catch (error) {
            
            dispatch({
                type:       LOGIN_ERROR,
                payload:    error.response.data.message
            })
        }
    };

    // Cerrar sesión 
    const logout = () => {
        dispatch({
            type: LOGOUT
        })
    };


    return (
        <authContext.Provider 
            value={{
                token:          state.token,
                authenticated:  state.authenticated,
                user:           state.user,
                message:        state.message,
                registerUser,
                loginUser,
                authenticatedUser,
                logout
            }}
        >
            { children }
        </authContext.Provider>
    )
    
}
