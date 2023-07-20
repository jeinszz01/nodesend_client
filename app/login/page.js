'use client'
import { useContext, useEffect } from "react";
import Formulario from "./Formulario"
import authContext from "../context/auth/authContext";
import Alerta from "../components/Alerta";
import { useRouter } from "next/navigation";

const Login = () => {
    
    const router = useRouter()
    const { mensaje, autenticado } = useContext(authContext)

    useEffect(() => {
        if(autenticado) {
            router.push('/')
        }
    }, [autenticado, router])
    //----

    return (
        <div className='md:w-4/5 xl:w-3/5 mx-auto mb-32'>
            <h2 className='text-4xl font-sans font-bold text-gray-800 text-center my-4'>Iniciar Sesión</h2>
            { mensaje && <Alerta />}
            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-lg'>
                    
                    <Formulario />

                </div>
            </div>
        </div>
    )
}

export default Login