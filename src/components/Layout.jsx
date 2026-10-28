import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  IconAdjustments, IconSettings, IconHome2, IconRefresh, IconUser, IconLogout,
} from '@tabler/icons-react';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/Layout.css';

const lateral = ({ isActive }) => `item-base-sidebar ${isActive ? 'item-lateral-activo' : 'item-lateral-inactivo'}`;
const inferior = ({ isActive }) => `item-inferior-base ${isActive ? 'item-inferior-activo' : 'item-inferior-inactivo'}`;

export default function Layout() {
  const [abierto, setAbierto] = useState(false);
  const { logout } = useAuth();

  return (
    <div className="layout-contenedor">
      {/* Escritorio: menú lateral */}
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
          <NavLink to="/" end className={lateral}><IconHome2 size={28} />{abierto && 'Inicio'}</NavLink>
          <NavLink to="/actividad" className={lateral}><IconRefresh size={28} />{abierto && 'Actividad'}</NavLink>
          <span className="item-base-sidebar"><IconUser size={28} />{abierto && 'Perfil'}</span>
        </nav>

        <button onClick={logout} className="item-base-sidebar layout-boton-logout">
          <IconLogout size={28} />{abierto && 'Cerrar sesión'}
        </button>
      </aside>

      <main className="layout-main">
        <Outlet />
      </main>

      {/* Móvil: barra inferior */}
      <nav className="layout-nav-movil">
        <NavLink to="/actividad" className={inferior}><IconRefresh size={34} />Actividad</NavLink>
        <NavLink to="/" end className={inferior}><IconHome2 size={34} />Inicio</NavLink>
        <button onClick={logout} className="item-inferior-base item-inferior-inactivo"><IconUser size={34} />Perfil</button>
      </nav>
    </div>
  );
}