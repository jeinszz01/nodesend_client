import { useState, useContext } from "react";
import appContext from "../context/app/appContext";

const Formulario = () => {

    const { agregarPassword, agregarDescargas } = useContext(appContext);
    const [inputPassword, setInputPassword] = useState(false)

    return ( 
        <div className="w-full mt-20">
            <div>
                <label className="text-lg text-gray-800">Eliminar tras:</label>
                <select onChange={e => agregarDescargas(parseInt(e.target.value))} defaultValue={'1'} className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline focus:border-gray-500">
                    <option value="DEFAULT" disabled>-- Seleccione --</option>
                    <option value="1">1 Descarga</option>
                    <option value="5">5 Descargas</option>
                    <option value="10">10 Descargas</option>
                    <option value="20">20 Descargas</option>
                </select>
            </div>
            <div className="mt-4">
                
                <div className="flex items-center justify-between">
                    <label className="text-lg text-gray-800 mr-2">Proteger con Contraseña</label>
                    <input type="checkbox"
                        onChange={() => setInputPassword(!inputPassword)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 dark:focus:ring-blue-600"
                    />
                </div>
                {inputPassword && (
                    <input type="password"
                        onChange={e => agregarPassword(e.target.value)}
                        className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline focus:border-gray-500"
                    />
                )}
                
            </div>
        </div>
    );
}
 
export default Formulario;