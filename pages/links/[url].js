import { Layout } from "../../components/Layout";
import axiosClient from "../../config/axios";
import { BsCloudDownload, BsLock } from "react-icons/bs";
import { useState, useContext } from "react";
import appContext from "../../context/app/appContext";
import { Alert } from "../../components/Alert";


export async function getServerSidePaths() {
    

    if (process.env.backendURL) {
        return {
          paths: [],
          fallback: 'blocking',
        }
    }

    const response  = await axiosClient('/api/links/get-links');
    const links     = await response.json();

    const paths     = links.map( link => ({
        params: { 
            url: link.url 
        },
    }))
    
}

export async function getServerSideProps ( props ) {

    const { url } = props.params;

    const response  = await axiosClient(`api/links/get-link/${ url }`);

    return {
        props: {
            link: response.data
        }
    }

}



export default function  ( { link } ) {

    const [ hasPassword, setHasPassword ]   = useState(link.password);
    const [ password, setPassword ]         = useState('');


    // Context archivos
    const AppContext = useContext( appContext );
    const { showAlert, fileMessage } = AppContext;

    
    const handleVerifyPassword = async ( e ) => {
        e.preventDefault();

        const data = {
            password
        };
        
        try {

            const result = await axiosClient.post(`api/links/compare-password/${link.link}`, data );
            setHasPassword( result.data.password );
            link.file = result.data.file;
            
        } catch ( error ) {
            showAlert( error.response.data.message );
        }

        
    }
    
    return (
        <Layout>

            {
                hasPassword ? (
                    <>
                        <h1 className="text-2xl text-center text-gray-700 flex flex-col items-center"> 
                            Este enlace esta protegido, ingresa la contraseña para poder descargar el archivo
                                <span className="block"> <BsLock/> </span> 
                        </h1>

                        <div className='flex justify-center mt-5 drop-shadow-lg'>

                            <div className="w-full max-w-lg bg-white border">

                                

                                <form   className="px-8 pt-6 pb-8 mb-4"
                                        onSubmit={ e => handleVerifyPassword( e ) }>

                                    { fileMessage && <Alert/> }

                                    <div>
                                        <label  className='block text-sm mb-2 uppercase'
                                                htmlFor='password'> 
                                            Contraseña 
                                        </label>

                                        <input  type="password"
                                                className='border border-transparent border-b-black w-full caret-[#fb265e] appeareance-none p-2 focus:outline-none'
                                                id="password"
                                                placeholder="contraseña del enlace"
                                                required
                                                value={ password }
                                                onChange={ e => setPassword( e.target.value ) }/>

                                    </div>

                                    <button type='submit'
                                        className='bg-black text-white w-full p-2 text-center uppercase rounded-lg cursor-default mt-8'>
                                        Validar contraseña
                                    </button>

                                </form>
                            </div>

                        </div>
                        
                    </>
                ) : 
                (
                    <>
                        <h1 className="text-2xl text-center text-gray-700"> 
                                Descarga tu archivo 
                        </h1>
                        <div className="flex items-center justify-center mt-10">
                            
                            <a  className="bg-[#fb265e] text-center px-10 py-3 text-white flex items-center gap-4 uppercase rounded shadow-lg text-2xl"
                                href={`${ process.env.backendURL }/api/files/${ link.file }`}
                                download>
                                Descargar
                                    <span className="inline-block"> <BsCloudDownload/> </span>  
                            </a>
                        </div>
                    </>
                )
            }

            
        </Layout>
    );

}