import { useNavigate } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';
import { useAuth } from '../context/AuthContext.jsx';
import Encabezado from '../components/Encabezado.jsx';
import ActividadItem from '../components/ActividadItem.jsx';
import LoadMoreButton from '../components/common/LoadMoreButton.jsx';
import { usePagination } from '../hooks/usePagination.js';
import { actividad } from '../data/mock.js';
import '../styles/Actividad.css';

export default function Actividad() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // 1. Usamos nuestro hook de paginación configurado para mostrar de 10 en 10
  const { datosVisibles, tieneMas, cargarMas } = usePagination(actividad, 10);

  // 2. Extraemos los días únicos únicamente de los elementos que se están mostrando actualmente
  const dias = [...new Set(datosVisibles.map((a) => a.dia))];

  return (
    <>
      <Encabezado 
        titulo="Actividad" 
        subtitulo={`¡${user.nombre.split(' ')[0]}! ¿Qué estuvo pasando recientemente?`}
      >
        <button 
          onClick={() => navigate(-1)} 
          aria-label="Volver" 
          className="boton-volver-movil"
        >
          <IconArrowLeft size={32} />
        </button>
      </Encabezado>

      <section className="seccion-actividad-principal">
        <h2 className="titulo-seccion-actividad">Actividad reciente</h2>
        <div className="contenedor-lista-actividad">
          {dias.map((dia) => (
            <div key={dia}>
              {dia !== 'Hoy' && <p className="etiqueta-dia-actividad">{dia}</p>}
              <ul>
                {datosVisibles.filter((a) => a.dia === dia).map((a) => (
                  <ActividadItem key={a.id} item={a} />
                ))}
              </ul>
            </div>
          ))}

          {/* 3. El botón aparece automáticamente solo si 'tieneMas' es verdadero */}
          {tieneMas && (
            <LoadMoreButton 
              onClick={cargarMas} 
              text="Ver más actividades" 
            />
          )}
        </div>
      </section>
    </>
  );
}