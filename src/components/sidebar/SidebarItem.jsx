import { NavLink } from 'react-router-dom';

const lateral = ({ isActive }) => `item-base-sidebar ${isActive ? 'item-lateral-activo' : 'item-lateral-inactivo'}`;

export default function SidebarItem({ modulo, abierto, onModuloClick }) {
  const IconComponent = modulo.icono;

  return (
    <NavLink
      to={modulo.path || '#'}
      end={modulo.path === '/'}
      className={lateral}
      title={!abierto ? modulo.name : ''}
      onClick={(e) => onModuloClick(e, modulo)}
    >
      <IconComponent size={abierto ? 22 : 24} />
      {abierto && <span>{modulo.name}</span>}
    </NavLink>
  );
}