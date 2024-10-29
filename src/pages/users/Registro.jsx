import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { apiConection } from "../../utils/conection";
import { alertaCargandoProceso, alerta } from "../../utils/alerts";
import { useAuth } from "../../auth/AuthProvider";

export default function Registro({ isAdmin = false }) {
    const { isAuth } = useAuth();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: (dataUser) => {
            if (isAdmin) {
                dataUser.role = 'admin';
            }
            alertaCargandoProceso({
                mensaje: 'Registrando usuario...',
                funcionAsync: () => {
                    apiConection.post('/usuarios/registro', dataUser)
                        .then((res) => {
                            if (res.status === 201) {
                                alerta('Usuario registrado', 'success');
                                navigate('/login', {state: {username: dataUser.username}});
                            }
                        }).catch((error) => {
                            console.log(error);
                            alerta(error.response? error.data.message : error.message, 'error');
                        })
                }
            })

        }
    });

    if (isAuth) {
        localStorage.clear();
    }


    return (
        <div className={`${!isAdmin && 'login-registro'} min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8`}>
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl transform transition duration-500 hover:scale-105">
                <div>
                    <h2 className="titulo mt-6 text-center text-4xl text-gray-900">
                        {!isAdmin ? 'Únete Para Ganar' : 'Registro Administrador'}
                    </h2>
                    {!isAdmin && (
                        <p className="mt-2 text-center text-sm text-gray-600">
                            ¡Regístrate e ingresa tús códigos!
                        </p>
                    )}
                </div>
                <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-2">
                        <div className="flex items-center border-b border-gray-300 py-2">
                            <i className="fas fa-envelope text-gray-400" aria-hidden="true" />
                            <input
                                name="username"
                                type="email"
                                required
                                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                placeholder="Correo Electrónico"
                                onFocus={formik.handleBlur}
                                onChange={formik.handleChange}
                            />
                        </div>
                        {formik.touched.username && formik.errors.username && (
                            <span className="error text-red-500 text-xs">{formik.errors.username}</span>
                        )}

                        <div className="flex items-center border-b border-gray-300 py-2">
                            <i className="fas fa-key text-gray-400" aria-hidden="true" />
                            <input
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                placeholder="Contraseña"
                                onFocus={formik.handleBlur}
                                onChange={formik.handleChange}
                            />
                        </div>
                        {formik.touched.password && formik.errors.password && (
                            <span className="error text-red-500 text-xs">{formik.errors.password}</span>
                        )}

                        <div className="flex items-center border-b border-gray-300 py-2">
                            <i className="fas fa-user text-gray-400" />
                            <input
                                name="fullName"
                                type="text"
                                required
                                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                placeholder="Nombre Completo"
                                onFocus={formik.handleBlur}
                                onChange={formik.handleChange}
                            />
                        </div>
                        {formik.touched.fullName && formik.errors.fullName && (
                            <span className="error text-red-500 text-xs">{formik.errors.fullName}</span>
                        )}

                        <div className="flex items-center border-b border-gray-300 py-2">
                            <i className="fas fa-id-card text-gray-400" aria-hidden="true" />
                            <input
                                name="document"
                                type="text"
                                required
                                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                placeholder="Documento Identidad"
                                onFocus={formik.handleBlur}
                                onChange={formik.handleChange}
                            />
                        </div>
                        {formik.touched.document && formik.errors.document && (
                            <span className="error text-red-500 text-xs">{formik.errors.document}</span>
                        )}

                        <div className="flex items-center border-b border-gray-300 py-2">
                            <i className="fas fa-phone text-gray-400" aria-hidden="true" />
                            <input
                                name="phone"
                                type="tel"
                                required
                                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                placeholder="Teléfono"
                                onFocus={formik.handleBlur}
                                onChange={formik.handleChange}
                            />
                        </div>
                        {formik.touched.phone && formik.errors.phone && (
                            <span className="error text-red-500 text-xs">{formik.errors.phone}</span>
                        )}
                        {isAdmin && (
                            <div className="flex items-center border-b border-gray-300 py-2">
                                <i className="fas fa-user-tie text-gray-400" aria-hidden="true" />
                                <input
                                    disabled={true}
                                    placeholder="Administrador"
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                />
                            </div>
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 text-sm font-medium rounded-md text-white bg-gradient-to-r from-orange-200 to-orange-600 hover:from-orange-500 hover:to-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-orange-500 transform transition duration-150 hover:scale-105"
                        >
                            Registrarse
                        </button>
                        <button
                            type="submit"
                            className="group mt-2 relative w-full flex justify-center py-3 px-4 text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-purple-500 transform transition duration-150 hover:scale-105"
                            onClick={() => navigate('/login')}
                        >
                            Ir A Iniciar Sesión
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )

    function initialValues() {
        return {
            username: '',
            password: '',
            fullName: '',
            document: '',
            phone: ''
        }
    }

    function validationSchema() {
        return {
            username: Yup.string().email('El email no es valido').required('El email es obligatorio'),
            password: Yup.string().min(5, 'Mínimo 8 caractéres').required('La contraseña es obligatoria'),
            fullName: Yup.string().required('El nombre es obligatorio'),
            document: Yup.string().required('El documento es obligatorio'),
            phone: Yup.string().required('El telefono es obligatorio')
        }
    }
}