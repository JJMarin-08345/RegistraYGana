import Registro from "../pages/users/Registro";
import Login from "../pages/users/Login";
import Codigos from "../pages/users/Codigos";
import Error from "../pages/error/Error";
import { ProtectedRoute } from "../auth/ProtectedRoute";

export const rutasGlobales = [
    {
        path: '*',
        element: <Error numeroError={404} error="Not Found" mensaje="La página que buscas, no se encuentra disponible" showRefresh={false} />
    },
    {
        path: '/',
        element: <Registro />
    },
    {
        path: '/login',
        element: <Login />
    },
    /* Inicio Rutas Usuario */
    {
        path: '/user',
        element: <ProtectedRoute />,
        children: [
            {
                path: 'registrar-codigos',
                element: <Codigos />
            }
        ]
    }
]