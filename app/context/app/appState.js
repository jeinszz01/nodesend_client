'use client'
import { useReducer } from "react";
import appContext from "./appContext";
import appReducer from "./appReducer";
import clienteAxios from "@/config/axios";
import { 
    MOSTRAR_ALERTA,
    LIMPIAR_ALERTA,
    SUBIR_ARCHIVO_CARGANDO,
    SUBIR_ARCHIVO_EXITO,
    SUBIR_ARCHIVO_ERROR,
    CREAR_ENLACE_EXITO,
    CREAR_ENLACE_ERROR,
    LIMPIAR_STATE,
    AGREGAR_PASSWORD,
    AGREGAR_DESCARGAS
} from "@/types";

const AppState = ({children}) => {

    const initialState = {
        msg_archivo_alert: '',
        nombre: '',
        nombre_original: '',
        cargando: false,
        descargas: 1,
        autor: null,
        cod_seguridad: null,
        url_id: null
    }

    const [state, dispatch] = useReducer(appReducer, initialState)

    const mostrarAlerta = msg => {
        console.log(msg)
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: msg
        })
        setTimeout(() => {
            dispatch({
                type:LIMPIAR_ALERTA
            })
        }, 5800);
    }

    const subirArchivo = async(formData, nombreArchivo) => {

        dispatch({
            type: SUBIR_ARCHIVO_CARGANDO
        })

        try {
            const respuesta = await clienteAxios.post('api/archivos', formData)
            dispatch({
                type: SUBIR_ARCHIVO_EXITO,
                payload: {
                    nombre: respuesta.data.archivo.filename,
                    nombre_original: nombreArchivo
                }
            })
        } catch (error) {
            //console.log(error.response)
            dispatch({
                type: SUBIR_ARCHIVO_ERROR,
                payload: error.response.data.msg
            })
        }
    }

    // Creamos enlaces de descarga
    const crearEnlace = async() => {
        
        const datos = {
            nombre: state.nombre,
            nombre_original: state.nombre_original,
            descargas: state.descargas,
            autor: state.autor,
            cod_seguridad: state.cod_seguridad
        }
  
        try {
            const result = await clienteAxios.post('/api/enlaces', datos)
            dispatch({
                type: CREAR_ENLACE_EXITO,
                payload: result.data.msg
            })
        } catch (error) {
            console.log(error)
        }
    }

    const limpiarState = () => {
        dispatch({
            type: LIMPIAR_STATE
        })
    }

    const agregarPassword = cod_seguridad => {
        dispatch({
            type: AGREGAR_PASSWORD,
            payload: cod_seguridad
        })
    }
    const agregarDescargas = descargas => {
        dispatch({
            type: AGREGAR_DESCARGAS,
            payload: descargas
        })
    }

    return (
        <appContext.Provider
            value={{
                msg_archivo_alert: state.msg_archivo_alert,
                nombre: state.nombre,
                nombre_original: state.nombre_original,
                cargando: state.cargando,
                descargas: state.descargas,
                autor: state.autor,
                cod_seguridad: state.cod_seguridad,
                url_id: state.url_id,
                mostrarAlerta,
                subirArchivo,
                crearEnlace,
                limpiarState,
                agregarPassword,
                agregarDescargas
            }}
        >
            {children}
        </appContext.Provider>
    )
}

export default AppState