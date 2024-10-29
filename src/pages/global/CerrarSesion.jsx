import { useAuth } from "../../auth/AuthProvider";

export default function CerrarSesion() {
    const { setIsAuth } = useAuth();
    
    return (
        <div className="fixed right-4 top-2">
            <button onClick={() => setIsAuth(false)}
                className="logout bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700">
                <span className="fas fa-right-from-bracket mr-2" />  Cerrar Sesión
            </button>
        </div>
    );
}