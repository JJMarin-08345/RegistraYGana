import { useEffect, useState } from "react"
import { apiConection } from "../../utils/conection";
import CerrarSesion from "../global/CerrarSesion";
import { useNavigate } from "react-router-dom";

export default function VerCodigos() {
    const navigate = useNavigate();
    const [codes, setCodes] = useState([]);

    useEffect(() => {
        apiConection.get('/codigos/obtenerCodigos')
            .then(res => {
                if (res.status === 200) {
                    setCodes(res.data);
                } else {
                    alerta(res.response.data.message, 'error');
                }
            }).catch(error => {
                alerta(error.response ? error.response.data.message : error.message, 'error');
            });
    })

    return (
        <div className="p-6 max-h-[100vh] overflow-x-auto overflow-y-auto">
            <div className="fixed left-4 top-2">
                <button onClick={() => navigate('/admin/usuarios')}
                    className="bg-green-700 hover:bg-green-800  text-white px-2 py-1 rounded ">
                    <span className="fas fa-arrow-left mr-2" /> Regresar
                </button>
            </div>
            <CerrarSesion />
            <table className="min-w-full rounded-lg bg-gray-100 overflow-y-auto">
                <thead className="text-xl bg-gray-50">
                    <tr>
                        <th className="py-2 px-4 border-b font-general">Código</th>
                        <th className="py-2 px-4 border-b font-general">En Uso</th>
                    </tr>
                </thead>
                <tbody>
                    {codes && codes.map((code) => (
                        <tr key={code._id} className="items-center text-center hover:bg-gray-100">
                            <td className="capitalize font-general py-2 px-4 border-b">{code.code}</td>
                            <td className="capitalize font-general py-2 px-4 border-b">{code.used ? 'En Uso' : 'Sin Usar'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}