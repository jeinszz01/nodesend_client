'use client';
import React, { useReducer } from 'react'
import authContext from './authContext'
import AuthReducer from './authReducer';
import clienteAxios from '@/config/axios';
import { useRouter } from 'next/navigation';

// types
import { REGISTRO_EXITOSO, 
    REGISTRO_FAILED,
    LIMPIAR_ALERTA,
    USUARIO_INCORRECTO,
    LOGIN_EXITOSO,
    USUARIO_AUTENTICADO,
    CERRAR_SESION
} from '@/types';
import tokenAuth from '@/config/tokenAuth';

const AuthState = ({children}) => {
    // Comprobamos q estamos en el cliente y obtenemos el ls.
    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('ns_token') : '',
        autenticado: null,
        usuario: null,
        mensaje: null
    }

    const [ state, dispach ] = useReducer(AuthReducer, initialState)// state y dispach no necesariamente esos nombres.
    
    const router = useRouter()

    // Registrar nuevos usuarios
    const registrarUsuario = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos)
            dispach({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data.msg
            })
            // Limpiar Alerta
            setTimeout(() => {
                dispach({
                    type: LIMPIAR_ALERTA
                })
            }, 3000);
            setTimeout(() => {
                router.push('/login')
            }, 3000);
            
        } catch (error) {
            dispach({
                type: REGISTRO_FAILED,
                payload: error.response.data.msg
            })
            // capturar error 400 con 'response'
            // Limpiar Alerta
            setTimeout(() => {
                dispach({
                    type: LIMPIAR_ALERTA
                })
            }, 3000);
        }
        
    }

    // Autenticar usuario
    const iniciarSesion = async usuario =>{
        try {
            const respuesta = await clienteAxios.post('/api/auth', usuario)
            dispach({
                type: LOGIN_EXITOSO,
                payload: respuesta.data.token
            })
        } catch (error) {
            dispach({
                type: USUARIO_INCORRECTO,
                payload: error.response.data.msg
            })
        }
        // Limpiar Alerta
        setTimeout(() => {
            dispach({
                type: LIMPIAR_ALERTA
            })
        }, 3000);
    }
    
    // Usuario Autenticado mediante JWToken
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('ns_token')
        //console.log(token)///-------
        if(token) {
            tokenAuth(token)
            try {
                const respuesta = await clienteAxios.get('/api/auth')
                if(respuesta.data.usuario) {
                    dispach({
                        type: USUARIO_AUTENTICADO,
                        payload: respuesta.data.usuario
                    })
                }
            } catch (error) {
                dispach({
                    type: USUARIO_INCORRECTO,
                    payload: error.response.data.msg
                })
            }
        }
    }

    // Cerrar Sesión
    const cerrarSesion = () => {
        dispach({
            type: CERRAR_SESION
        })
    }

    return (
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export default AuthState
