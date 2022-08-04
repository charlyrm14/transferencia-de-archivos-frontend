import axiosClient from "./axios";

export function tokenAuth ( token ) {
    
    if ( token ) {
        
        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${ token }`;        

    } else {

        delete axiosClient.defaults.headers.common['Authorization']
    }

}