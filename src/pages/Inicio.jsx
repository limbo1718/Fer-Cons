import { Link } from 'react-router-dom';
import { IconActivity } from '@tabler/icons-react';
import { useAuth } from '../context/AuthContext.jsx';
import Encabezado from '../components/Encabezado.jsx';
import ActividadItem from '../components/ActividadItem.jsx';
import { actividad } from '../data/mock.js';
import '../styles/Inicio.css';

export default function Inicio() {
  const { user } = useAuth();
  const nombre = user.nombre.split(' ')[0];

  return (
    <>
      <Encabezado 
        titulo={`¡Hola, ${nombre}!`} 
        subtitulo={`Rol: ${user.rol} · ¿Qué necesitás gestionar hoy?`} 
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