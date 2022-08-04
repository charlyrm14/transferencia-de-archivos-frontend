import { useContext } from "react";
import appContext from "../context/app/appContext";
import authContext from "../context/auth/authContext";


export function Alert () {

    const AuthContext = useContext( authContext );
    const { message } = AuthContext;

    // Mensaje de error para usuarios
    const AppContext      = useContext( appContext );
    const { fileMessage } = AppContext;
    
    return (
        <div className="border border-[#fb265e] py-2 px-3 w-full my-3 max-w-lg text-center mx-auto rounded-lg">
            <p className="text-[#fb265e]"> { message || fileMessage } </p>
        </div>
    );
}