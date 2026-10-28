import { useNavigate } from 'react-router-dom'
import { IconArrowLeft } from '@tabler/icons-react'
import { useAuth } from '../context/AuthContext.jsx'
import Encabezado from '../components/Encabezado.jsx'
import ActividadItem from '../components/ActividadItem.jsx'
import { actividad } from '../data/mock.js'

export default function Actividad() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const dias = [...new Set(actividad.map((a) => a.dia))]

  return (
    <>
      <Encabezado titulo="Actividad" subtitulo={`¡${user.nombre.split(' ')[0]}! ¿Qué estuvo pasando recientemente?`}>
        <button onClick={() => navigate(-1)} aria-label="Volver" className="md:hidden"><IconArrowLeft size={32} /></button>
      </Encabezado>
      <section className="p-6 md:px-12">
        <h2 className="mb-3 text-2xl text-oscuro/60">Actividad reciente</h2>
        <div className="rounded-2xl border border-oscuro/30 bg-fondo/60 px-6 py-2 md:bg-white">
          {dias.map((dia) => (
            <div key={dia}>
              {dia !== 'Hoy' && <p className="mt-4 uppercase">{dia}</p>}
              <ul>{actividad.filter((a) => a.dia === dia).map((a) => <ActividadItem key={a.id} item={a} />)}</ul>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
