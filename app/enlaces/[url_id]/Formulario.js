'use client'
import clienteAxios from "@/config/axios"
import { useState, useContext } from "react"
import appContext from '../../context/app/appContext'

const Formulario = ({archivo, setTienePassword}) => {
    
    const { mostrarAlerta } = useContext(appContext)
    const [ codigo, setCodigo ] = useState('')

    const verificarPassword = async e => {
        e.preventDefault()

        const data = {
            codigo
        }
        
        try {
            const resultado = await clienteAxios.post(`/api/enlaces/${archivo.enlace}`, data)
            setTienePassword(resultado.data.password)
        } catch (error) {
            mostrarAlerta(error.response.data.msg)
        }
    }
    return ( 
        <form onSubmit={e => verificarPassword(e)} className='bg.white rounded shadow-md px-8 pt-6 pb-8 mb-4'>
            <div className='mb-4'>
                <label className='block text-black text-sm font-bold mb-2' htmlFor='codigo'>Código</label>
                <input type='password' autoComplete="none"
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-none'
                    placeholder='Código del enlace' id='codigo'
                    value={codigo}
                    onChange={e => setCodigo(e.target.value)}
                />
            </div>
            <input type='submit'
                className='bg-red-500 hover:bg-red-700 w-full p-2 text-white uppercase font-bold'
                value='Validar código...'
            />
        </form>
    );
}

export default Formulario;