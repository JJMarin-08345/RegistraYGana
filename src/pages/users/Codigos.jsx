import React, { useEffect, useState } from 'react';
import { useAuth } from '../../auth/AuthProvider';
import { useFormik } from 'formik';
import { alerta, alertaCargandoProceso } from '../../utils/alerts';
import * as Yup from 'yup';
import { apiConection } from '../../utils/conection';
import Error from '../error/Error';
import Cargando from "../global/Cargando";
import CerrarSesion from "../global/CerrarSesion";
import { format } from '@formkit/tempo';

export default function Codigos() {
    const { fullName, userId, setIsAuth } = useAuth();
    const [codigos, setCodigos] = useState([]);
    const [load, setLoad] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        apiConection.get(`/codigos/obtenerCodigos/${userId}`)
            .then(res => {
                if (res.status === 200) {
                    setCodigos(res.data);
                    setLoad(false);
                }
            }).catch(error => {
                console.log(error)
                setLoad(false);
                setError(error);
            })
    }, []);

    const formik = useFormik({
        initialValues: {
            code: ''
        },
        validationSchema: Yup.object(validatioSchema()),
        onSubmit(code) {
            alertaCargandoProceso({
                mensaje: 'Registrando Código...',
                funcionAsync: () => {
                    apiConection.put(`/codigos/registrarCodigo/${userId}`, code)
                        .then(res => {
                            if (res.status  === 201) {
                                alerta('Código registrado', 'success');
                                setCodigos([...codigos, res.data]);
                                formik.values.code = '';
                            } else {
                                alerta(res.data, 'error');
                            }
                        }).catch(error => {
                            alerta(error.response? error.response.data.message : error.message, 'error');
                        })
                }
            })
        }
    });

    if (load) {
        return (
            <Cargando />
        )
    }

    if (error) {
        return (
            <Error numeroError={error.response?.status || 500} error={error.response?.data || error.message} />
        )
    }

    return (
        <div className="codigos-bg min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <CerrarSesion />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Formulario de registro */}
                <div className="bg-white rounded p-8 h-min">
                    <h2 className="font-diferent text-3xl mb-6">Registrar Códigos</h2>
                    <form onSubmit={formik.handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="codigo" className="block text-sm font-medium text-gray-700">
                                Insertar Código
                            </label>
                            <div className="mt-1 relative rounded-md">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center align-middle">
                                    <i className="fas fa-code text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="code"
                                    className="border-2 border-gray-200 focus:border-orange-200 p-1 uppercase w-full  pl-10 sm:text-sm focus:outline-none rounded-md"
                                    placeholder="WJU87RH0"
                                    title="Ingrese el código de 8 caracteres"
                                    maxLength={8}
                                    value={formik.values.code}
                                    onFocus={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    required
                                />
                            </div>
                            {formik.errors.code && formik.touched.code && (
                                <span className="error text-red-500 text-sm">{formik.errors.code}</span>
                            )}
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                            >
                                <i className="fas fa-plus mr-2" /> Registrar Código
                            </button>
                        </div>
                    </form>
                </div>

                {/* Lista de códigos registrados */}
                <div className="p-6 lg:p-12 bg-white rounded  overflow-y-auto">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Códigos Registrados de {fullName}</h3>
                    <div className="flow-root mt-6">
                        <ul className="-my-5 divide-y divide-gray-200">
                            {codigos && codigos.length > 0 && codigos.map((codigo) => (
                                <li key={codigo._id} className="py-2">
                                    <div className="flex space-x-2">
                                        <i className="fas mt-1 fa-code text-orange-500" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 uppercase truncate">{codigo.code}</p>
                                            <p className="text-sm text-gray-500 truncate"> {format(codigo.date, 'YYYY-MM-DD - hh:mm')} </p>
                                            <p className="text-sm text-gray-500 truncate"> {codigo.isWinner ? 'Ganador' : 'No Ganador'} </p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {codigos.length === 0 && (
                        <p className="text-center text-gray-500 mt-4">No hay códigos registrados aún.</p>
                    )}
                </div>
            </div>
        </div>

    );

    function validatioSchema() {
        return {
            code: Yup.string().min(8, 'El código es de 8 caracteres').required('El código es requerido'),
        }
    }
}