import { useState, useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import appContext from "../context/app/appContext";
import authContext from "../context/auth/authContext";
import Formulario from "./Formulario";
import Image from "next/image";

// useCallback y useMemo en general mejoran el performance de tu aplicación.

const Dropzone = () => {

    const [ imagePreview, setImagePreview ] = useState()
    const { mostrarAlerta, subirArchivo, cargando, crearEnlace } = useContext(appContext)
    const { autenticado } = useContext(authContext)
    
    // Ejecutamos Accepted cuando el tamañano es menor a 1MB.
    const onDropRejected = () => {
        mostrarAlerta('No se pudo subir el archivo, el límite es 1MB, obtén una cuenta gratis para subir archivos más grandes.')
    }
    const onDropAccepted = useCallback( async (acceptedFiles) => {
        // Crear un form-data, manera de subir un archivo al servidor
        const formData = new FormData();
        formData.append('archivo', acceptedFiles[0]);

        subirArchivo(formData, acceptedFiles[0].path)
        
        setImagePreview(URL.createObjectURL(acceptedFiles[0]))
    }, [subirArchivo])

    // Extraemos contenido de Dropzone
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({onDropAccepted, onDropRejected, maxSize:1000000});


    const archivo = acceptedFiles.map(archiv => (
        <li key={archiv.lastModified} className="bg-white flex gap-2 items-center p-3 mb-4 shadow-lg rounded">
            <Image src={imagePreview} alt={`${imagePreview}`}  width='60' height='60' />
            <div className="w-full">
                <p className="font-bold text-xl break-words">{ archiv.path }</p>
                <p className="text-sm text-gray-500">{ (archiv.size / Math.pow(1024, 2)).toFixed(2) } MB</p>
            </div>
        </li>
    ))


    return ( 
        <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4">
            { acceptedFiles.length > 0 ? (
                <div className="mt-10 w-full">
                    <h4 className="text-2xl font-bold text-center mb-4">Archivos</h4>
                    <ul>
                        {archivo}
                    </ul>

                    {autenticado ? <Formulario /> : ''}
                    {cargando ? <p className="my-10 text-center text-gray-600">Cargando archivo</p> : (
                        <button 
                            type="button"
                            className="bg-blue-500 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-600"
                            onClick={() => crearEnlace()}
                        >
                            Crear Enlace
                        </button>
                    )}
                    
                </div>
            ) : (
                <div { ...getRootProps({ className: 'dropzone w-full py-32'}) }>
                    <input className="h-100" { ...getInputProps() } />

                    {isDragActive ? 
                        <p className="text-2xl text-center text-gray-600">Suelta el archivo.</p>
                        :
                        <div className="text-center">
                            <p className="text-2xl text-center text-gray-600">Selecciona un archivo y arrastralo aquí</p>
                            <button type="button" className="bg-blue-500 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-600">
                                Selecciona un archivo para subir.
                            </button>
                        </div>
                    }
                </div>
            )}  
        </div>
    );
}
 
export default Dropzone;