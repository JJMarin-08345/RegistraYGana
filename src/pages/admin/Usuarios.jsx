import { useState, useEffect } from "react";
import Cargando from "../global/Cargando";
import { alerta } from "../../utils/alerts";
import { apiConection } from "../../utils/conection";
import CerrarSesion from "../global/CerrarSesion";
import { useNavigate } from "react-router-dom";
import { format } from "@formkit/tempo";

export default function Usuarios() {
    const navigate = useNavigate();
    const [load, setLoad] = useState(true);
    const [error, setError] = useState(null);
    const [usersData, setUsersData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        apiConection.get('/usuarios/getUsuarios')
            .then(res => {
                if (res.status === 200) {
                    setUsersData(res.data);
                    setLoad(false);
                } else {
                    alerta(res.response.data.message, 'error');
                }
            }).catch(error => {
                setLoad(false);
                setError(error);
            });
    }, []);

    const onHandleClickSelectUser = (user) => {
        apiConection.get(`/codigos/obtenerCodigos/${user._id}`)
            .then(res => {
                if (res.status === 200) {
                    console.log("res.data", res.data);
                    setSelectedUser({ fullName: user.fullName, codes: res.data });
                } else {
                    alerta(res.response.data.message, 'error');
                }
            }).catch(error => {
                setError(error);
                alerta(error.response ? error.response.data.message : error.message, 'error');
            });
    }

    if (load) {
        return (
            <Cargando />
        );
    }

    if (error) {
        return (
            <Error numeroError={error.response?.status || 500} error={error.response?.data || error.message} />
        )
    }

    return (
        <div className="codigos-bg min-h-screen">
            <div className="container mx-auto p-6">
                <div className="fixed left-4 top-2">
                    <button onClick={() => navigate('/admin/codigos')}
                        className="bg-green-700 hover:bg-green-800  text-white px-2 py-1 rounded ">
                        <span className="fa fa-regular fa-eye mr-2" /> Ver Códigos
                    </button>
                </div>
                <CerrarSesion />
                <h1 className="font-lst-usuarios bg-white text-4xl py-2 text-center mt-12 mb-0">Lista de Usuarios</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full rounded-lg bg-gray-100 max-h-[350px] overflow-y-auto">
                        <thead className="text-xl bg-gray-50">
                            <tr>
                                <th className="py-2 px-4 border-b font-general">Nombre Usuario</th>
                                <th className="py-2 px-4 border-b font-general">Códigos Registrados</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersData && usersData.map((user) => (
                                <tr key={user._id} className="items-center text-center hover:bg-gray-100">
                                    <td className="capitalize font-general py-2 px-4 border-b">{user.fullName}</td>
                                    <td className="font-general py-2 px-4 border-b">
                                        <button
                                            onClick={() => { onHandleClickSelectUser(user) }}
                                            className="bg-orange-500 text-white rounded px-2 py-1 hover:bg-orange-700"
                                        >
                                            Ver Códigos
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Cuadro de códigos registrados */}
                {selectedUser && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h2 className="font-lst-codigos-users text-2xl border-b-2 border-gray-400 pb-1 mb-4 capitalize">
                            Códigos Registrados De {selectedUser.fullName}
                        </h2>
                        <ul className="list ">
                            {selectedUser.codes.map((code) => (
                                <li key={code._id} className="font-general text-gray-700 m-2 border-b-2 border-gray-300">
                                    <p className="bg-orange-500 w-fit px-2 py-1/2 rounded text-white"> <i className="fas fa-code" />  <b>Código:</b> {code.code} </p>
                                    <p className="font-user-code ml-3"> <b>Ganador:</b> {code.isWinner ? 'Si' : 'No'} </p>
                                    <p className="font-user-code ml-3"> <b>Fecha Registro:</b> {format(code.date, 'YYYY/MM/DD - hh:mm a')} </p>
                                </li>
                            ))}
                        </ul>

                        {selectedUser.codes.length === 0 && (
                            <p className="error text-gray-700"> {selectedUser.fullName} aún no ha registrado códigos </p>
                        )}

                    </div>
                )}
            </div>
        </div>
    );
}