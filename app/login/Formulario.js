"use client";   // componente del lado del cliente
import { useContext } from "react";
import { useFormik } from "formik"
import * as Yup from "yup"
import authContext from "../context/auth/authContext";

const Formulario = () => {

    const { iniciarSesion } = useContext(authContext)
    
    const formik = useFormik({
        initialValues: {
            correo: '',
            password: ''
        },
        validationSchema: Yup.object({
            correo: Yup.string().email('No es un correo válido').required('El email es obligatorio'),
            password: Yup.string().required('El password es obligatorio')
        }),
        onSubmit:(usuario) => {
            iniciarSesion(usuario)
        }
    })

    return (

        <form onSubmit={formik.handleSubmit} className='bg.white rounded shadow-md px-8 pt-6 pb-8 mb-4'>
            
            <div className='mb-4'>
                <label className='block text-black text-sm font-bold mb-2' htmlFor='correo'>Email</label>
                <input type='email'
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-none'
                    placeholder='Correo electrónico' id='correo'
                    value={formik.values.correo}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.correo && formik.errors.correo && (
                    <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="font-bold">Error</p>
                        <p>{formik.errors.correo}</p>
                    </div>
                )}
            </div>
            <div className='mb-4'>
                <label className='block text-black text-sm font-bold mb-2' htmlFor='password'>Password</label>
                <input type='password'
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-none'
                    placeholder='contraseña' id='password' autoComplete="none"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                    <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="font-bold">Error</p>
                        <p>{formik.errors.password}</p>
                    </div>
                )}
            </div>
            
            <input type='submit'
                className='bg-red-500 hover:bg-red-700 w-full p-2 text-white uppercase font-bold'
                value='Iniciar Sesión'
            />
        </form>
    )
}

export default Formulario