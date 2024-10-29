import { ProtectedRouteAdmin } from "../auth/ProtectedRoute";
import Usuarios from "../pages/admin/Usuarios";
import VerCodigos from "../pages/admin/VerCodigos";
import Registro from "../pages/users/Registro";

export const rutasAdmin = [
    {
        path: '/admin-registro',
        element: <Registro isAdmin={true} />
    },
    {
        path: '/admin',
        element: <ProtectedRouteAdmin />,
        children: [
            {
                path: 'usuarios',
                element: <Usuarios />
            },
            {
                path: 'codigos',
                element: <VerCodigos />
            }
        ]
    }
]