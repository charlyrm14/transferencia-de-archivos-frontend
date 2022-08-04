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

export default ( state, action ) => {

    switch ( action.type ) {
        case SHOW_ALERT:
            return {
                ...state,
                fileMessage: action.payload
            }
    
        case CLEAN_ALERT:
            return {
                ...state,
                fileMessage: null
            }

        case UPLOAD_FILE: 
            return {
                ...state,
                loadingFile: true
            }
        
        case UPLOAD_FILE_SUCCESSFUL:
            return {
                ...state,
                name: action.payload.name,
                original_name: action.payload.original_name,
                loadingFile: false
            }
        
        case UPLOAD_FILE_ERROR: 
            return {
                ...state,
                original_name: action.payload,
                loadingFile: false
            }
        
        case CREATE_LINK_SUCCESSFUL:
            return {
                ...state,
                url: action.payload
            }

        case CLEAN_STATE:
            return {
                ...state,
                fileMessage: null,
                name: "",
                original_name: "",
                loadingFile: false,
                downloads: 1,
                password: "",
                author: null,
                url: ""
            }

        case ADD_PASSWORD_TO_LINK:
            return {
                ...state,
                password: action.payload
            }

        case ADD_DOWNLOADS_NUMBER:
            return {
                ...state,
                downloads: action.payload
            }

        default:
            return state;
    }
}