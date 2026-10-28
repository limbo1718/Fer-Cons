import PropTypes from 'prop-types'
import { useAuth } from '../context/AuthContext.jsx'

export default function Encabezado({ titulo, subtitulo, children }) {
  const { user } = useAuth()
  return (
    <header className="flex items-center justify-between gap-4 rounded-b-[2.5rem] bg-sidebar px-6 py-6 text-white md:rounded-none md:bg-white md:px-12 md:text-oscuro">
      <div className="flex items-center gap-3">
        {children}
        <div>
          <h1 className="text-3xl md:text-4xl">{titulo}</h1>
          <p className="mt-1 text-lg md:text-2xl md:text-oscuro/70">{subtitulo}</p>
        </div>
      </div>
      <div className="hidden rounded-xl bg-fondo px-8 py-3 text-right text-lg text-sidebar sm:block">
        <p>{user.nombre}</p>
        <p>{user.legajo}</p>
      </div>
    </header>
  )
}
Encabezado.propTypes = { titulo: PropTypes.string.isRequired, subtitulo: PropTypes.string, children: PropTypes.node }
