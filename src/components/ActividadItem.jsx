import PropTypes from 'prop-types'

export default function ActividadItem({ item }) {
  const Icono = item.icono
  return (
    <li className="flex items-center gap-4 border-b border-oscuro/20 py-4 last:border-0">
      <span className={`grid size-14 shrink-0 place-items-center rounded-xl text-white ${item.color}`}>
        <Icono size={28} />
      </span>
      <div>
        <p className="text-oscuro/60">
          {item.texto.map((s, i) => (
            <span key={i} className={s.fuerte ? 'text-oscuro' : s.verde ? 'text-green-600' : ''}>{s.t}</span>
          ))}
        </p>
        <p className="text-sm text-oscuro/60">{item.modulo} · {item.hora}</p>
      </div>
    </li>
  )
}
ActividadItem.propTypes = {
  item: PropTypes.shape({
    icono: PropTypes.elementType, color: PropTypes.string, modulo: PropTypes.string,
    hora: PropTypes.string, texto: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
}
