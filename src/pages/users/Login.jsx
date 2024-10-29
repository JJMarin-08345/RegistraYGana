import { useFormik } from "formik"
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { apiConection } from "../../utils/conection";
import { alerta, alertaCargandoProceso } from "../../utils/alerts";
import Swal from "sweetalert2";
import { useAuth } from "../../auth/AuthProvider";
import { useEffect, useState } from "react";

export default function Login() {
    const { isAuth, setIsAuth, role } = useAuth();
    const location  = useLocation();
    const user = location.state ? location.state.username : '';
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            username: user || '',
            password: '',
        },
        validationSchema: Yup.object(validationSchema()),
        onSubmit: (user) => {
            alertaCargandoProceso({
                mensaje: 'Iniciando Sesión...',
                funcionAsync: () => {
                    apiConection.post('/usuarios/login', user)
                        .then(response => {
                            if (response.status === 201) {
                                Swal.close();
                                localStorage.setItem('token', response.data.token);
                                setIsAuth(true);
                            } else if (response.status === 200) {
                                alerta('Usuario o contraseña incorrectos', 'error');
                            }
                        }).catch(error => {
                            console.log(error);
                            alerta(error.response ? error.response.data.message : error.message, 'error');
                        })
                }
            })
        }
    })

    useEffect(() => {
        if (isAuth) {
            if (role === 'admin') {
                navigate('/admin/usuarios');
            } else {
                navigate(`/user/registrar-codigos`);
            }
        }
    }, [isAuth, role]);

    return (
        <div className="login-registro min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl transform transition duration-500 hover:scale-105">
                <div>
                    <h2 className="titulo mt-6 text-center text-4xl font-extrabold text-gray-900">
                        Iniciar Sesión
                    </h2>
                </div>
                <form className="mt-6 space-y-6" onSubmit={formik.handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-3">
                        <div className="flex items-center border-b border-gray-300 py-2">
                            <i className="fas fa-envelope h-5 w-5 text-gray-400" />
                            <input
                                name="username"
                                type="email"
                                autoComplete="on"
                                required
                                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                placeholder="Correo Electrónico"
                                defaultValue={user}
                                onFocus={formik.handleBlur}
                                onChange={formik.handleChange}
                            />
                        </div>
                        {formik.touched.username && formik.errors.username && (
                            <span className="error text-red-500 text-xs">{formik.errors.username}</span>
                        )}
                        <div className="flex items-center border-b border-gray-300 py-2">
                            <i className="fas fa-key h-5 w-5 text-gray-400" />
                            <input
                                name="password"
                                type="password"
                                required
                                className="apparance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                placeholder="Contraseña"
                                onFocus={formik.handleBlur}
                                onChange={formik.handleChange}
                            />
                        </div>
                        {formik.touched.password && formik.errors.password && (
                            <span className="error text-red-500 text-xs">{formik.errors.password}</span>
                        )}
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 text-sm font-medium rounded-md text-white bg-gradient-to-r from-orange-200 to-orange-600 hover:from-orange-500 hover:to-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-orange-500 transform transition duration-150 hover:scale-105"
                        >
                            Iniciar Sesión
                        </button>
                        <button
                            type="submit"
                            className="group mt-2 relative w-full flex justify-center py-3 px-4 text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-purple-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-purple-500 transform transition duration-150 hover:scale-105"
                            onClick={() => navigate('/')}
                        >
                            Ir A Registrarse
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )

    function validationSchema() {
        return {
            username: Yup.string().email('Ingrese un correo válido').required('El usuario es obligatorio'),
            password: Yup.string().min(3, 'Mínimo 5 caracteres').required('La contraseña es obligatoria')
        }
    }
}