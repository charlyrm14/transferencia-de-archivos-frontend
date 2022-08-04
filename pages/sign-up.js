import { useContext, useEffect } from "react";
import { Layout } from "../components/Layout";
import { BsCheck2Square } from "react-icons/bs";
import { useFormik } from "formik";
import * as Yup from "yup";
import authContext from "../context/auth/authContext";
import { Alert } from "../components/Alert";


export default function SignUp() {

    const AuthContext = useContext( authContext );
    const { registerUser, message } = AuthContext;

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            name:       Yup.string()
                            .required('El nombre es obligatorio'),
            email:      Yup.string()
                            .email('Ingresa un correo electrónico valido')
                            .required('El email es obligatorio'),
            password:   Yup.string()
                            .required('La contraseña es obligatoria')
                            .min(6, 'La contraseña debe contener al menos 6 caracteres')
        }),
        onSubmit: ( data ) => {
            registerUser( data );
        }
    });

    return (
        <Layout>
            <div className='md:w-4/5 xl:w-3/5 mx-auto mb-32 font-Rubik font-light'>
                
                <div className='flex justify-center mt-5 drop-shadow-lg'>

                    <div className='bg-black w-full max-w-lg rounded-l-lg '>
                        <h2 className='text-2xl text-white text-center p-4 mt-4 uppercase font-Rubik font-light'>
                            Regístrate
                        </h2>

                        <ul className='text-white p-10'>
                            <li className='mt-6'> 
                                <span className='inline-block mr-2'> <BsCheck2Square/> </span>
                                    Archivos sin límite de tamaño
                            </li>
                            <li className='mt-6'> 
                                <span className='inline-block mr-2'> <BsCheck2Square/> </span>
                                    Almacenamiento ilimitado 
                            </li>
                            <li className='mt-6'> 
                                <span className='inline-block mr-2'> <BsCheck2Square/> </span>
                                    Archivos disponibles durante 30 días 
                            </li>
                            <li className='mt-6'> 
                                <span className='inline-block mr-2'> <BsCheck2Square/> </span>
                                    Descarga de archivos ilimitados 
                            </li>
                        </ul>
                    </div>

                    <div className='bg-white w-full max-w-lg rounded-r-lg border'>

                        
                        <form   className='px-8 pt-6 pb-8 mb-4'
                                onSubmit={ formik.handleSubmit }>

                            {
                                message && ( <Alert/> )
                            }

                            <div>
                                <label  className='block text-sm mb-2 uppercase'
                                        htmlFor='name'> 
                                    Nombre 
                                </label>

                                <input  type="text"
                                        className='border border-transparent border-b-black w-full caret-[#fb265e] appeareance-none p-2 focus:outline-none'
                                        id='name'
                                        placeholder='Nombre completo'
                                        value={ formik.values.name }
                                        onChange={ formik.handleChange }
                                        onBlur={ formik.handleBlur }/>
                                
                                { formik.touched.name && formik.errors.name ? (
                                    <div>
                                        <p className="text-red-600 p-2"> { formik.errors.name } </p>
                                    </div>
                                ): null }

                            </div>

                            <div className='mt-5'>
                                <label  className='block text-sm mb-2 uppercase'
                                        htmlFor='email'> 
                                    Correo electrónico 
                                </label>

                                <input  className='border border-transparent border-b-black w-full caret-[#fb265e] appeareance-none p-2 focus:outline-none'
                                        id='email'
                                        placeholder='correo@correo.com'
                                        value={ formik.values.email }
                                        onChange={ formik.handleChange }
                                        onBlur={ formik.handleBlur }/>

                                { formik.touched.email && formik.errors.email ? (
                                    <div>
                                        <p className="text-red-600 p-2"> { formik.errors.email } </p>
                                    </div>
                                ): null }

                            </div>

                            <div className='mt-5'>
                                <label  className='block text-sm mb-2 uppercase'
                                        htmlFor='password'> 
                                    Contraseña 
                                </label>

                                <input  type="password"
                                        className='border border-transparent border-b-black w-full caret-[#fb265e] appeareance-none p-2 focus:outline-none'
                                        id='password'
                                        placeholder='Contraseña'
                                        value={ formik.values.password }
                                        onChange={ formik.handleChange }
                                        onBlur={ formik.handleBlur }/>

                                { formik.touched.password && formik.errors.password ? (
                                    <div>
                                        <p className="text-red-600 p-2"> { formik.errors.password } </p>
                                    </div>
                                ): null }

                            </div>

                            <button type='submit'
                                    className='bg-black text-white w-full p-2 text-center uppercase rounded-lg cursor-default mt-8'>
                                    Regístrarme
                            </button>

                        </form>
                    </div>

                </div>

            </div>
        </Layout>
    )
}
