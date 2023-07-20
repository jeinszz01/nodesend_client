'use client'
import { useState, useContext } from 'react'
import Formulario from "./Formulario"
import appContext from '../../context/app/appContext'
import Alerta from '@/app/components/Alerta'

const Password = ({archivo}) => {
    
    const { msg_archivo_alert } = useContext(appContext)
    const [tienePassword, setTienePassword] = useState(archivo.password)

    return (
        <>
            {archivo.msg ? (
                <p>Este enlace ya fué eliminado, posiblemente llegó al número máximo de descargas.</p>
            ) : (
                <>
                {tienePassword ? (
                <>
                    <p className="text-center">Este enlace esta protegido por un código, colocalo a continuación.</p>
                    {msg_archivo_alert && <Alerta />  }
                    <div className='flex justify-center mt-5'>
                        <div className='w-full max-w-lg'>
                            <Formulario archivo={archivo} setTienePassword={setTienePassword} />
                        </div>
                    </div>
                </>
                ) : (
                    <div>
                        <h1 className="text-4xl text-center text-gray-700">Descarga tu archivo:</h1>
                        <div className="flex items-center justify-center mt-10">
                            <a href={`${process.env.backendURL}/api/archivos/${archivo.archivo}`} className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold cursor-pointer text-white">Aquí</a>
                        </div>
                    </div>
                )}
                </>
            )} 
            
        </>
    )
}

export default Password