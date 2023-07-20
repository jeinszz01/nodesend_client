
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
//----
function AppReducer (state, action) {
    switch(action.type) {
        case MOSTRAR_ALERTA:
            return {
                ...state,
                msg_archivo_alert: action.payload
            }
        case LIMPIAR_ALERTA:
            return {
                ...state,
                msg_archivo_alert: null,
            }
        case SUBIR_ARCHIVO_CARGANDO:
            return {
                ...state,
                cargando: true
            }
        case SUBIR_ARCHIVO_EXITO:
            return {
                ...state,
                nombre: action.payload.nombre,
                nombre_original: action.payload.nombre_original,
                cargando: false
            }
        case SUBIR_ARCHIVO_ERROR:
            return {
                ...state,
                msg_archivo_alert: action.payload,
                cargando: false
            }
        case CREAR_ENLACE_EXITO:
            return {
                ...state,
                url_id: action.payload
            }
        case LIMPIAR_STATE:
            return {
                ...state,
                msg_archivo_alert: '',
                nombre: '',
                nombre_original: '',
                cargando: false,
                descargas: 1,
                autor: null,
                cod_seguridad: null,
                url_id: null
            }
        case AGREGAR_PASSWORD:
            return {
                ...state,
                cod_seguridad: action.payload
            }
        case AGREGAR_DESCARGAS:
            return {
                ...state,
                descargas: action.payload
            }

        default:
            return state
    }
}

export default AppReducer