'use client';
import { useContext, useEffect } from "react"
import authContext from "../context/auth/authContext"
import appContext from "../context/app/appContext";
import Image from "next/image"
import { useRouter } from "next/navigation";
import Link from "next/link";

const Header = () => {
    const router = useRouter()
    const { usuarioAutenticado, usuario, cerrarSesion } = useContext(authContext)
    const { limpiarState } = useContext(appContext)

    useEffect(() => {
        const token = localStorage.getItem('ns_token')
        if(token) {
            usuarioAutenticado()
        }
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    const redireccionar = () => {
        router.push('/')
        limpiarState()
    }

    return (
        <header className='py-8 flex flex-col md:flex-row items-center justify-between'>
            
            <Image onClick={()=>redireccionar()} src='/logo.svg' width={300} height={300} className='w-64 mb-8 md:mb-0' alt="logo-svg" />
            
            
            <div className="flex ">
                
                {usuario ? (
                    <div className="flex items-center gap-2">
                        <p>Hola: {usuario.nombre}</p>
                        <button type="button"
                            className="bg-black px-5 py-3 rounded-md text-white font-bold uppercase flex"
                            onClick={() => cerrarSesion()}
                        >Cerrar Sesión</button>
                    </div>
                ) : (
                    <>
                        <Link href='/login' className='bg-red-500 px-5 py-3 rounded-md text-white font-bold uppercase mr-2 flex' >
                            Iniciar Sesión &nbsp;
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-auto">
                                <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                        </Link>
                        <Link href='/crearcuenta' className='bg-black px-5 py-3 rounded-md text-white font-bold uppercase flex' >
                            Crear Cuenta &nbsp;
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-auto">
                                <path d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </Link>
                    </>
                )}
                
            </div>
            
        </header>
    )
}

export default Header