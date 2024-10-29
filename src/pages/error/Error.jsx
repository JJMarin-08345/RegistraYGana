import { useNavigate } from "react-router-dom";

export default function Error({ numeroError = 500, error = 'Error en el Servidor', mensaje = 'Lo sentimos, algo salió mal', showRefresh = true }) {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full  rounded-lg p-6 text-center">
                <h1 className="text-9xl font-extrabold text-gray-800 mb-4">{numeroError}</h1>
                <h2 className="text-2xl font-bold text-gray-700 mb-6">{error}</h2>
                <p className="text-gray-600 mb-8">
                    {mensaje}
                </p>
                <div className="flex justify-center space-x-2">
                    <button
                        onClick={() => navigate('/login')}
                        className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <i className="fas fa-home mr-2"></i> Regresar
                    </button>
                    {showRefresh && (
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <i className="fas fa-refresh mr-2"></i> Recargar
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
