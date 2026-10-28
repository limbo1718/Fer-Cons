import { useNavigate } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';
import { useAuth } from '../context/AuthContext.jsx';
import Encabezado from '../components/Encabezado.jsx';
import ActividadItem from '../components/ActividadItem.jsx';
import { actividad } from '../data/mock.js';
import '../styles/Actividad.css';

export default function Actividad() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const dias = [...new Set(actividad.map((a) => a.dia))];

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
                {actividad.filter((a) => a.dia === dia).map((a) => (
                  <ActividadItem key={a.id} item={a} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}