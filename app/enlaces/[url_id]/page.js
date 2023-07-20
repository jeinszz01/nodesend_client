//'use client'
//import { useState } from "react";
import clienteAxios from "@/config/axios"
import Password from "./Password";

// export const dynamicParams = false;

// export async function generateStaticParams() {
//     const enlaces = await clienteAxios.get('/api/enlaces')
//     //console.log(enlaces.data)
//     return enlaces.data.enlaces.map(enlace => ({
//             url_id: enlace.url_id
//         }))
// }

async function getArchivo(url_id) {
    try {
        const resultado = await clienteAxios.get(`/api/enlaces/${url_id}`, { cache: 'no-store' })
        const archivo = resultado.data
        return archivo
    } catch (error) {
        let errorPage = {msg: error.response.data.msg  }
        return errorPage
    }
}
// Renderizamos en el servidor getServerSideProps

export default async function page({params}) {
    const { url_id } = params
    const archivo = await getArchivo(url_id)

    return (
        <>
            <Password archivo={archivo} />
        </>
    )
}

