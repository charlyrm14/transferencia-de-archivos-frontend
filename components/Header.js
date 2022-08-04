import { useContext, useEffect } from 'react';
import Link from "next/link";
import authContext from '../context/auth/authContext';
import { BsPerson, BsBoxArrowRight } from "react-icons/bs";
import appContext from '../context/app/appContext';
import { useRouter } from "next/router";

export function Header () {

    // Routing
    const router = useRouter();

    // Obtiene usuario autenticado de localstorage a través del token
    const AuthContext = useContext( authContext );
    const { 
        user, 
        authenticatedUser, 
        logout 
    } = AuthContext;


    // Context App
    const AppContext = useContext( appContext );
    const { cleanState } = AppContext;

    useEffect( () => {

        authenticatedUser();
  
    },[]);


    // Redirecccionar
    const redirectToHome = () => {
        router.push('/');
        cleanState();
    };

    return(
        <>
            <header className="py-8 flex flex-col md:flex-row items-center justify-between">
                

                <img    src="/logo.svg" 
                        alt="logo" 
                        className="w-64 mb-8 md:mb-0 cursor-pointer"
                        onClick={ () => redirectToHome() }/>


                <div className="flex gap-4">

                    {
                        user ? (

                            <>
                                <div className='flex justify-between gap-11'>

                                    <p className='flex items-center gap-2 text-blue-600'>
                                        <span className='inline-block'> <BsPerson/> </span> 
                                            !Hola, { user.name }!
                                    </p>

                                    <button type='button' 
                                            className='flex items-center gap-2 border border-red-600 text-red-600 py-1 px-5 rounded-md uppercase cursor-default text-sm hover:bg-red-600 hover:text-white'
                                            onClick={ () => logout() }>
                                        Cerrar sesión 
                                            <span className='inline-block'> <BsBoxArrowRight/> </span>
                                    </button>

                                </div>
                            </>

                        ) : (

                            <>
                                <Link href="/login">
                                    <a className="bg-blue-600 text-white py-1 px-5 rounded-md uppercase cursor-default">
                                        Login
                                    </a>
                                </Link>

                                <Link href="/sign-up">
                                    <a className="bg-black text-white py-1 px-5 rounded-md uppercase cursor-default">
                                        Sign Up
                                    </a>
                                </Link>
                            </>

                        )
                    }

                    

                </div>

            </header>
        </>
    )
}