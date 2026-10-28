import PropTypes from 'prop-types';
import '../styles/ActividadItem.css';

export default function ActividadItem({ item }) {
  const Icono = item.icono;
  
  return (
    <li className="item-actividad">
      <span className={`contenedor-icono-actividad ${item.color}`}>
        <Icono size={28} />
      </span>
      <div>
        <p className="texto-actividad-principal">
          {item.texto.map((s, i) => (
            <span 
              key={i} 
              className={s.fuerte ? 'texto-fuerte' : s.verde ? 'texto-verde' : ''}
            >
              {s.t}
            </span>
          ))}
        </p>
        <p className="subtexto-actividad">{item.modulo} · {item.hora}</p>
      </div>
    </li>
  );
}

ActividadItem.propTypes = {
  item: PropTypes.shape({
    icono: PropTypes.elementType, 
    color: PropTypes.string, 
    modulo: PropTypes.string,
    hora: PropTypes.string, 
    texto: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};