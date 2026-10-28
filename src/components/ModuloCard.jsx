import PropTypes from 'prop-types'

export default function ModuloCard({ nombre, detalle, icono: Icono, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex h-40 items-center gap-3 rounded-3xl border border-oscuro/50 bg-tarjeta p-4 text-left transition hover:-translate-y-0.5 hover:bg-circulo/60 focus-visible:outline-2 md:h-44 md:gap-4 md:p-5"
    >
      <span className="grid size-14 shrink-0 place-items-center rounded-full bg-circulo text-navy md:size-16">
        <Icono size={30} stroke={2} />
      </span>
      <span>
        <span className="block text-lg font-bold md:text-xl">{nombre}</span>
        <span className="block text-sm">{detalle}</span>
      </span>
    </button>
  )
}
ModuloCard.propTypes = {
  nombre: PropTypes.string.isRequired,
  detalle: PropTypes.string,
  icono: PropTypes.elementType,
  onClick: PropTypes.func,
}
