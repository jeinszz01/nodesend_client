'use client'
import { useContext, useEffect } from "react"
import Link from "next/link"
import authContext from "./context/auth/authContext"
import appContext from "./context/app/appContext"
import Dropzone from "./components/Dropzone"
import Alerta from "./components/Alerta"

export default function Home() {

  const { usuarioAutenticado, usuario } = useContext(authContext)
  const { msg_archivo_alert, url_id } = useContext(appContext)

  useEffect(() => {
    const token = localStorage.getItem('ns_token')
    if(token) {
      usuarioAutenticado()
    }
  }, [])// eslint-disable-line react-hooks/exhaustive-deps
  //-------------

  return (
    <div className="md:w-4/5 xl:w-4/5 mx-auto mb-32">
      {url_id ? (
        <>
          <p className="text-center text-2xl mt-10">
            <span className="font-bold text-red-700 text-3xl uppercase">Tu URL es: </span>
            {`${process.env.frontendURL}/enlaces/${url_id}`}
          </p>
          <button type="button"
            className="w-full p-2 font-bold mt-10 bg-red-500 hover:bg-red-800 text-white uppercase"
            onClick={() => navigator.clipboard.writeText(`${process.env.frontendURL}/enlaces/${url_id}`)}
          >Copiar URL</button>
        </>
      ) : (
        <>
          { msg_archivo_alert && <Alerta /> }
          
          <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
            
            <Dropzone />
            
            <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
              <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">
                Comparte archivos de forma sencilla y privada
              </h2>
              <p className="text-lg leading-loose">
                <span className="text-red-500 font-bold">ReactNodeSend </span>
                Te permite compartir archivos con cifrado de extremo a extremo agregandole una contraseña, 
                definir un número total de descargas y al subir un archivo te genera un enlace que 
                lo puedes compartir. Puedes compartir archivos (de 1MB hasta 10MB) de forma segura. 
                *Las imágenes no pierden calidad.
              </p>
              <Link href={'/crearcuenta'} className="text-red-500 font-bold text-lg hover:text-red-700" >
                Crea una cuenta para mayores beneficios.
              </Link>
            </div>

          </div>
        </>
      )}

    </div>
  )
}
