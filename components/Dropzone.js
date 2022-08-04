import { useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { BsFileEarmark, BsLink } from "react-icons/bs";
import appContext from "../context/app/appContext";
import authContext from "../context/auth/authContext";
import { Form } from "./Form";
import { Spinner } from "./Spinner";


export function Dropzone () {

    // Context App
    const AppContext = useContext( appContext );
    const { loadingFile, uploadFiles, createLink, showAlert } = AppContext;

    // Context Auth
    const AuthContext = useContext( authContext );
    const { user, authenticated } = AuthContext;

    // Si no se puedo subir un archivo
    const onDropRejected = () => {
        showAlert('El límite de tamaño de archivos para cuentas gratuitas es de 1MB, crea una cuenta para subir archivos sin limite de peso');
    };

    // si se subio un archivo correctamente
    const onDropAccepted = useCallback( async ( acceptedFiles ) => {

        // FormData para poder manipular archivos
        const formData = new FormData();
        formData.append('file', acceptedFiles[0]);

        const originalNameFile = acceptedFiles[0].path;

        // Subir archivo
        uploadFiles( formData, originalNameFile );
               
    },[]);


    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone( { 
        onDropAccepted, 
        onDropRejected,
        maxSize: 1000000
    } );

    const files = acceptedFiles.map( file => (
        <li className="bg-white flex-1 px-5 py-2 mt-4 mb-4 shadow-lg rounded border" key={ file.lastModified }>
            <p className="text-blue-500 text-base"> 
                <span className="inline-block"> <BsFileEarmark/> </span> { file.path } 
            </p>
            <p className="text-sm text-gray-500"> { ( file.size / Math.pow( 1024, 2 ) ).toFixed(2) } MB </p>
        </li>
    ));

    
    
    return(
        
        <div className='md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-blue-400 border-2 bg-gray-100 rounded-lg'>

            { acceptedFiles.length > 0 ? (

                    <div className="mt-10">
                        <h4 className="text-base text-center mb-4 uppercase"> Tus archivos </h4>
                        <ul>
                            { files }
                        </ul>

                        {
                            authenticated ? <Form/> : 'No logueado'
                        }

                        {
                            loadingFile ? <Spinner/> : (

                                <button type="button"
                                className="bg-[#fb265e] w-full py-1 px-5 rounded-lg text-white my-10 flex items-center gap-2"
                                onClick={ () => createLink() }>
                                    Crear enlace de descarga <span className="inline-block"> <BsLink/> </span>
                                </button>

                            )
                        }

                        
                    </div>

                ) : (

                    <div { ...getRootProps( { className:'dropzone w-full p-10' } ) }>
                        <input className="h-100"  { ...getInputProps() }/>
                        
                            {
                                isDragActive ?

                                <p className="text-lg text-center text-gray-600">
                                    Suelta los archivos aquí...
                                </p> :

                                <div className="text-center">
                                        <p className="text-lg text-center text-gray-600">
                                            Selecciona un archivo o arrastralo aquí
                                        </p>
                                        <button className="bg-blue-700 w-full py-1 px-5 rounded-lg text-white my-10"
                                                type="button">
                                                Selecciona archivos para subir 
                                        </button>
                                </div>
                            }
                
                    </div>

                )
            }
            
        </div>
    )
}