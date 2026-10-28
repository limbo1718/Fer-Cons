import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { IconActivity } from '@tabler/icons-react'
import { useAuth } from '../context/AuthContext.jsx'
import Encabezado from '../components/Encabezado.jsx'
import ModuloCard from '../components/ModuloCard.jsx'
import ActividadItem from '../components/ActividadItem.jsx'
import { modulos, actividad } from '../data/mock.js'

export default function Inicio() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const nombre = user.nombre.split(' ')[0]

  const abrir = (m) =>
    m.ruta
      ? navigate(m.ruta)
      : Swal.fire({ icon: 'info', title: m.nombre, text: 'Este módulo todavía está en desarrollo.', confirmButtonColor: '#4a9da8' })

  return (
    <>
      <Encabezado titulo={`¡Hola, ${nombre}!`} subtitulo={`Rol: ${user.rol} · ¿Qué necesitás gestionar hoy?`} />
      <section className="grid grid-cols-2 gap-4 p-6 md:gap-8 md:p-12 md:pb-6 xl:grid-cols-4">
        {modulos.map((m) => (
          <ModuloCard key={m.nombre} {...m} onClick={() => abrir(m)} />
        ))}
      </section>

      <section className="mx-6 rounded-3xl bg-white/60 p-5 md:mx-12">
        <div className="flex items-center justify-between border-b border-oscuro/20 pb-2">
          <h2 className="flex items-center gap-2 text-2xl font-bold"><IconActivity className="text-sidebar" size={30} />Actividad reciente</h2>
          <Link to="/actividad" className="text-sidebar hover:underline">Ver todo</Link>
        </div>
        <ul>{actividad.slice(0, 2).map((a) => <ActividadItem key={a.id} item={a} />)}</ul>
      </section>
    </>
  )
}
