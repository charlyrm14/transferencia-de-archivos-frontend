import { useReducer, useState } from "react";
import appContext from "./appContext";
import appReducer from "./appReducer";
import { 
    UPLOAD_FILE,
    UPLOAD_FILE_SUCCESSFUL,
    UPLOAD_FILE_ERROR,
    CREATE_LINK_SUCCESSFUL,
    CREATE_LINK_ERROR,
    ADD_PASSWORD_TO_LINK,
    ADD_DOWNLOADS_NUMBER,
    SHOW_ALERT,
    CLEAN_ALERT,
    CLEAN_STATE
} from "../../types";
import axiosClient from "../../config/axios";



export function AppState ( { children } ) {

    const initialState = {
        fileMessage: null,
        name: "",
        original_name: "",
        loadingFile: false,
        downloads: 1,
        password: "",
        author: null,
        url: ""
    }

    // Dispatch y state
    const [ state, dispatch ] = useReducer( appReducer, initialState );

    // Mostrar alerta
    const showAlert = ( message ) => {

        dispatch({
            type:       SHOW_ALERT,
            payload:    message
        });

        setTimeout( () => {
            
            dispatch({
                type: CLEAN_ALERT
            });

        }, 5000 );
    };

    // Sube archivos al servidor
    const uploadFiles = async ( formData, originalNameFile ) => {

        dispatch({
            type: UPLOAD_FILE
        });
        
        try {

            const response = await axiosClient.post('/api/files/upload-file', formData);

            dispatch({
                type:       UPLOAD_FILE_SUCCESSFUL,
                payload: {
                    name:               response.data.file,
                    original_name:      originalNameFile
                }
            })
            
        } catch ( error ) {
            
            dispatch({
                type:       UPLOAD_FILE_ERROR,
                payload:    error.response.data.message
            })
        }
    };

    // Se crea enlace una vez que se se sube el archivo con exito
    const createLink = async () => {

        const data = {
            name:           state.name,
            original_name:  state.original_name,
            downloads:      state.downloads,
            password:       state.password,
            author:         state.author
        }

        try {

            const response = await axiosClient.post('/api/links/create', data );

            dispatch({
                type:       CREATE_LINK_SUCCESSFUL,
                payload:    response.data.message
            })
            
        } catch ( error ) {
            console.log( error );
        }
    }

    const cleanState = () => {
        
        dispatch({
            type: CLEAN_STATE
        });
    };

    // Añade un password al enlace
    const addPasswordToLink = ( password ) => {
        
        dispatch({
            type:       ADD_PASSWORD_TO_LINK,
            payload:    password
        })
    };

    // Añade un numero de descargas al enlace
    const addDownloadsNumberToLink = ( downloadsNumber ) => {
        
        dispatch({
            type:       ADD_DOWNLOADS_NUMBER,
            payload:    downloadsNumber
        });
    };


    return (
        <appContext.Provider 
            value={{
                fileMessage:    state.fileMessage,
                name:           state.name,
                original_name:  state.original_name,
                loadingFile:    state.loadingFile,
                downloads:      state.downloads,
                password:       state.password,
                author:         state.author,
                url:            state.url,
                showAlert,
                uploadFiles,
                createLink,
                cleanState,
                addPasswordToLink,
                addDownloadsNumberToLink
            }}
        >
            { children }
        </appContext.Provider>
    )
    
}
