import { IconLogout } from '@tabler/icons-react';

export default function SidebarFooter({ abierto, onLogoutClick }) {
  return (
    <button onClick={onLogoutClick} className="item-base-sidebar layout-boton-logout">
      <IconLogout size={28} />
      {abierto && <span>Cerrar sesión</span>}
    </button>
  );
}