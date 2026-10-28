import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext.jsx'
import Layout from './components/Layout.jsx'
import Login from './pages/Login.jsx'
import CambiarContrasena from './pages/CambiarContrasena.jsx'
import Inicio from './pages/Inicio.jsx'
import Actividad from './pages/Actividad.jsx'
import Empleados from './pages/Empleados.jsx'


function RutaProtegida() {
  const { user } = useAuth()
  return user ? <Layout /> : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cambiar-contrasena" element={<CambiarContrasena />} />
      <Route element={<RutaProtegida />}>
        <Route index element={<Inicio />} />
        <Route path="actividad" element={<Actividad />} />
        <Route path="empleados" element={<Empleados />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
