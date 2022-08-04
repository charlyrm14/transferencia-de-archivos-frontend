import { useState, useContext } from "react"
import appContext from "../context/app/appContext";


export function Form() {

    const [ hasPassword, sethasPassword ] = useState(false);

    // Context App
    const AppContext = useContext( appContext );
    const { addPasswordToLink, addDownloadsNumberToLink } = AppContext;


    
    return (
        <div className="w-full mt-5">
            <div>
                <label className="text-base text-gray-800"> Eliminar tras </label>
                <select className="appearance-none w-full mt-2 bg-white border text-black py-2 px-3 rounded-lg leading-none focus:outline-none" 
                        defaultValue={""}
                        onChange={ (e) => addDownloadsNumberToLink( parseInt(e.target.value) ) }>
                    <option value="" disabled> Selecciona </option>
                    <option value="1"> 1 descarga </option>
                    <option value="5"> 5 descargas </option>
                    <option value="10"> 10 descargas </option>
                    <option value="20"> 20 descargas </option>
                </select>
            </div>

            <div className="mt-4">
                <div className="flex justify-between">
                    <label className="text-base text-gray-800 mr-2"> Proteger con contraseña </label>
                    <input  type="checkbox"
                            onChange={ () => sethasPassword(!hasPassword) }/>

                </div>
                {
                    hasPassword ? (
                        <input  type="password"
                                className="appearance-none w-full mt-2 bg-white border text-black py-2 px-3 rounded-lg leading-none focus:outline-none"
                                placeholder="Contraseña"
                                onChange={ ( e ) => addPasswordToLink( e.target.value ) }/>
                    ) : null
                }
                
            </div>  
            
        </div>
    )
}