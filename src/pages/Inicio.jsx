import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IconActivity } from '@tabler/icons-react';
import { useAuth } from '../context/AuthContext.jsx';
import Encabezado from '../components/Encabezado.jsx';
import ModuloCard from '../components/ModuloCard.jsx';
import ActividadItem from '../components/ActividadItem.jsx';
import { modulos, actividad } from '../data/mock.js';
import '../styles/Inicio.css';

export default function Inicio() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const nombre = user.nombre.split(' ')[0];

  const abrir = (m) =>
    m.ruta
      ? navigate(m.ruta)
      : Swal.fire({ 
          icon: 'info', 
          title: m.nombre, 
          text: 'Este módulo todavía está en desarrollo.', 
          confirmButtonColor: '#4a9da8' 
        });

  return (
    <>
      <Encabezado 
        titulo={`¡Hola, ${nombre}!`} 
        subtitulo={`Rol: ${user.rol} · ¿Qué necesitás gestionar hoy?`} 
      />

      <section className="grilla-modulos">
        {modulos.map((m) => (
          <ModuloCard key={m.nombre} {...m} onClick={() => abrir(m)} />
        ))}
      </section>

      <section className="seccion-actividad">
        <div className="cabecera-actividad">
          <h2 className="titulo-actividad">
            <IconActivity className="icono-actividad-recent" size={30} />
            Actividad reciente
          </h2>
          <Link to="/actividad" className="enlace-ver-todo">Ver todo</Link>
        </div>
        <ul>
          {actividad.slice(0, 2).map((a) => (
            <ActividadItem key={a.id} item={a} />
          ))}
        </ul>
      </section>
    </>
  );
}