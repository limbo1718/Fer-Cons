import PropTypes from 'prop-types';
import '../styles/ModuloCard.css';

export default function ModuloCard({ nombre, detalle, icono: Icono, onClick }) {
  return (
    <button onClick={onClick} className="tarjeta-modulo-boton">
      <span className="caja-icono-modulo">
        <Icono size={30} stroke={2} />
      </span>
      <span>
        <span className="texto-nombre-modulo">{nombre}</span>
        <span className="texto-detalle-modulo">{detalle}</span>
      </span>
    </button>
  );
}

ModuloCard.propTypes = {
  nombre: PropTypes.string.isRequired,
  detalle: PropTypes.string,
  icono: PropTypes.elementType,
  onClick: PropTypes.func,
};
