import { useContext } from 'react'
import authContext from '../context/auth/authContext'
import appContext from '../context/app/appContext'

const Alerta = () => {

    const { mensaje } = useContext(authContext) // mensaje de error para usuarios.
    const { msg_archivo_alert } = useContext(appContext)    // mensaje de error al subir archivos.

    return ( 
        <div className='bg-red-500 py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto'>
            {mensaje || msg_archivo_alert}
        </div>
    );
}

export default Alerta;