import { Link } from 'react-router-dom';
import { IconActivity } from '@tabler/icons-react';
import { useAuth } from '../context/AuthContext.jsx';
import Encabezado from '../components/Encabezado.jsx';
import ActividadItem from '../components/ActividadItem.jsx';
import { actividad } from '../data/mock.js';
import '../styles/Inicio.css';

export default function Inicio() {
  const { user } = useAuth();
  
  // OPTIMIZACIÓN: Usamos ?. por si el user llega a ser null en algún momento
  const nombreCompleto = user?.nombre || 'Usuario';
  const nombre = nombreCompleto.split(' ')[0];
  const rolActual = user?.rol || 'Sin Rol';

  return (
    <>
      <Encabezado 
        titulo={`¡Hola, ${nombre}!`} 
        subtitulo={`Rol: ${rolActual} · ¿Qué necesitás gestionar hoy?`} 
      />

      <section className="seccion-actividad" style={{ marginTop: '2rem' }}>
        <div className="cabecera-actividad">
          <h2 className="titulo-actividad">
            <IconActivity className="icono-actividad-recent" size={30} />
            Actividad reciente
          </h2>
          <Link to="/actividad" className="enlace-ver-todo">Ver todo</Link>
        </div>
        <ul>
          {actividad.slice(0, 4).map((a) => (
            <ActividadItem key={a.id} item={a} />
          ))}
        </ul>
      </section>
    </>
  );
}