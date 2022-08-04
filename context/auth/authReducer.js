import { 
    SUCCESSFUL_REGISTRATION,
    REGISTRATION_ERROR,
    SUCCESSFUL_LOGIN,
    LOGIN_ERROR,
    AUTHENTICATED_USER,
    LOGOUT,
    CLEAN_ALERT  
} from "../../types";

export default ( state, action ) => {

    switch ( action.type ) {

        case SUCCESSFUL_REGISTRATION:
        case REGISTRATION_ERROR:
        case LOGIN_ERROR:
            return {
                ...state,
                message: action.payload
            }
        
        case SUCCESSFUL_LOGIN:
            localStorage.setItem('token', action.payload);
            return {
                ...state,
                token: action.payload,
                authenticated: true
            }
        
        case AUTHENTICATED_USER:
            return {
                ...state,
                user: action.payload,
                authenticated: true
            }
        
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                user: null,
                token: null,
                authenticated: null
            }

        case CLEAN_ALERT: 
            return {
                ...state,
                message: null
            }

            

        default:
            return state;
    }
}