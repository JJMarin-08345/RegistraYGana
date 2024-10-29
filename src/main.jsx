import './index.css'
import { createRoot } from 'react-dom/client';
import { rutasGlobales } from './rutas/globales';
import { rutasAdmin } from './rutas/admin';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider';


let rutas = [].concat(rutasGlobales, rutasAdmin);

rutas = createBrowserRouter(rutas);

createRoot(document.getElementById('root')).render(
  <>
    <AuthProvider>
      <RouterProvider router={rutas} />
    </AuthProvider>
  </>
)
