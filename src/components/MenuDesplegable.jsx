import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  IconAdjustments, IconSettings, IconLogout,
} from '@tabler/icons-react';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext.jsx';
import { menuModules } from '../data/menuConfig.js';
import '../styles/MenuDesplegable.css';

const lateral = ({ isActive }) => `item-base-sidebar ${isActive ? 'item-lateral-activo' : 'item-lateral-inactivo'}`;
const inferior = ({ isActive }) => `item-inferior-base ${isActive ? 'item-inferior-activo' : 'item-inferior-inactivo'}`;

export default function Layout() {
  const [abierto, setAbierto] = useState(false);
  const { user, logout } = useAuth();

  // Filtrar los módulos dinámicamente según el rol del usuario (Administrador ve todo)
  const modulosVisibles = menuModules.filter(item => 
    user && item.roles.includes(user.rol)
  );

  // Manejador para los módulos que aún no tienen ruta y deben mostrar el SweetAlert2
  const handleModuloClick = (e, modulo) => {
    if (!modulo.path) {
      e.preventDefault();
      Swal.fire({
        icon: 'info',
        title: modulo.name,
        text: 'Este módulo todavía está en desarrollo.',
        confirmButtonColor: '#4a9da8'
      });
    }
  };

  return (
    <div className="layout-contenedor">
      {/* Escritorio: menú lateral desplegable */}
      <aside className={`layout-aside ${abierto ? 'layout-aside-ancho-abierto' : 'layout-aside-ancho-cerrado'}`}>
        <div className="layout-header-sidebar">
          <button
            onClick={() => setAbierto(!abierto)}
            aria-label="Abrir o cerrar menú"
            className="layout-boton-toggle"
          >
            {abierto ? <IconSettings size={28} /> : <IconAdjustments size={28} />}
          </button>
          {abierto && <span className="layout-logo-texto">FER-CONS</span>}
        </div>

        <nav className="layout-nav-links">
          {modulosVisibles.map((modulo) => {
            const IconComponent = modulo.icono;
            return (
              <NavLink
                key={modulo.name}
                to={modulo.path || '#'}
                end={modulo.path === '/'}
                className={lateral}
                onClick={(e) => handleModuloClick(e, modulo)}
              >
                <IconComponent size={28} />
                {abierto && <span>{modulo.name}</span>}
              </NavLink>
            );
          })}
        </nav>

        <button onClick={logout} className="item-base-sidebar layout-boton-logout">
          <IconLogout size={28} />
          {abierto && <span>Cerrar sesión</span>}
        </button>
      </aside>

      <main className="layout-main">
        <Outlet />
      </main>

      {/* Móvil: barra inferior */}
      <nav className="layout-nav-movil">
        <NavLink to="/actividad" className={inferior}>Actividad</NavLink>
        <NavLink to="/" end className={inferior}>Inicio</NavLink>
        <button onClick={logout} className="item-inferior-base item-inferior-inactivo">Perfil</button>
      </nav>
    </div>
  );
}