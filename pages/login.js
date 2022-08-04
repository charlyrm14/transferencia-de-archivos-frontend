import { useContext, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { BsCheck2Square } from "react-icons/bs";
import { useFormik } from "formik";
import * as Yup from "yup";
import authContext from '../context/auth/authContext';
import { Alert } from '../components/Alert';
import { useRouter } from 'next/router';   


export default function Login() {

    // Definir context
    const AuthContext = useContext( authContext );

    const { 
        authenticated, 
        message, 
        loginUser 
    } = AuthContext;

    const router = useRouter();

    useEffect( () => {

        if ( authenticated ) {
            router.push('/');
        }

    }, [ authenticated ]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email:      Yup.string()
                            .email('Ingresa un correo electrónico valido')
                            .required('El email es obligatorio'),
            password:   Yup.string()
                            .required('La contraseña es obligatoria')
        }),
        onSubmit: ( data ) => {
            loginUser( data );
        }
    });

  return (
    <Layout>
      <div className='md:w-4/5 xl:w-3/5 mx-auto mb-32 font-Rubik font-light'>
              
            <div className='flex justify-center mt-5 drop-shadow-lg'>

              <div className='bg-black w-full max-w-lg rounded-l-lg '>
                  <h2 className='text-2xl text-white text-center p-4 mt-4 uppercase font-Rubik font-light'>
                      Inicia Sesión
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
                              className='bg-blue-600 text-white w-full p-2 text-center uppercase rounded-lg cursor-default mt-10'>
                              Iniciar sesión
                      </button>

                  </form>
              </div>

            </div>

          </div>
    </Layout>
  )
}
