import { REGISTRO_EXITOSO,
    REGISTRO_FAILED,
    LIMPIAR_ALERTA,
    LOGIN_EXITOSO,
    USUARIO_INCORRECTO,
    USUARIO_AUTENTICADO,
    CERRAR_SESION
} from "@/types"

const AuthReducer = (state, action) => {

    switch(action.type) {

        case REGISTRO_EXITOSO:
        case REGISTRO_FAILED:
            return {
                ...state,
                mensaje: action.payload
            }
        case LIMPIAR_ALERTA:
            return {
                ...state,
                mensaje: null
            }

        case LOGIN_EXITOSO:
            localStorage.setItem('ns_token', action.payload)
            return {
                ...state,
                token: action.payload,
                autenticado: true
            }
        case USUARIO_AUTENTICADO:
            return {
                ...state,
                usuario: action.payload,
                autenticado: true
            }
        case CERRAR_SESION:
            localStorage.removeItem('ns_token')
            return {
                ...state,
                usuario: null,
                autenticado: null,
                token: null
            }
        case USUARIO_INCORRECTO:
            localStorage.removeItem('ns_token')
            return {
                ...state,
                mensaje: action.payload,
                token: null
            }
        default:
            return state
    }
}

export default AuthReducer