import { useContext, useEffect } from 'react';
import { Layout } from '../components/Layout';
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';
import { BsClipboard, BsShieldLock } from "react-icons/bs";
import Link from "next/link";
import { Dropzone } from "../components/Dropzone";
import { Alert } from '../components/Alert';


export default function Home() {

    // Obtiene usuario autenticado de localstorage a través del token
    const AuthContext = useContext( authContext );
    const { authenticatedUser } = AuthContext;


    // Context archivos
    const AppContext      = useContext( appContext );
    const { url, fileMessage } = AppContext;

    useEffect( () => {

      const token = localStorage.getItem('token');

      if ( token ) {
        authenticatedUser();
      }

    },[]);

    return (
        <Layout>
          <div className='md:w-4/5 xl:w-3/5 mx-auto mb-32'>

            {
              url ? (
                <>
                  <div className='bg-white p-3 shadow-lg rounded-lg border border-t-gray-100 flex flex-col items-center'>
                    <p className='p-5 text-center text-lg'> 
                       Tu enlace para compartir es: 
                        <span className='block mt-3 text-blue-600 font-bold underline underline-offset-1'> 
                          {`${ process.env.frontendURL}/links/${url}`}  
                        </span>
                    </p>

                    <button type='button'
                            className='px-2 py-1 bg-[#fb265e] text-white ml-5 mb-5 rounded flex items-center gap-2'
                            onClick={ () => navigator.clipboard.writeText(`${ process.env.frontendURL}/links/${url}`) }>
                        <span className='inline-block'> <BsClipboard/> </span>
                          Copiar enlace
                    </button>

                  </div>
                </>

              ) : (

                <>
                  { fileMessage && <Alert/> }

                    <div className='lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10 border'>

                      <Dropzone/>

                      <div className='md:flex-1 mb-3 mx-2 mt-4 lg:mt-0'>

                        <h2 className='text-2xl text-gray-800 my-4 text-center'>
                            Comparte archivos de forma sencilla y privada
                        </h2>

                        <p className='text-lg leading-loose text-center'>
                          <span className='text-red-600 font-bold'> Node Send Files </span>
                            te permite compartir archivos con cifrado de extremo a extremo
                        </p>

                        <div className='flex flex-col items-center text-4xl mb-10'>
                          <div>
                            <BsShieldLock/>
                          </div>
                        </div>

                        <div className='flex flex-col items-center'>
                          <Link href="/sign-up">
                            <a className='text-[#fb265e] text-sm underline decoration-1'>
                              Crea una cuenta y obten mayores beneficios
                            </a>
                          </Link>
                        </div>
                        

                      </div>

                    </div>
                </>

              )
            }
            
          </div>
        </Layout>
    )
}
