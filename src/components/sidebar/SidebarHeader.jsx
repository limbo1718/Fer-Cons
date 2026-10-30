import { IconAdjustments, IconSettings } from '@tabler/icons-react';

export default function SidebarHeader({ abierto, onToggle }) {
  return (
    <div className="layout-header-sidebar">
      <button
        onClick={onToggle}
        aria-label="Abrir o cerrar menú"
        className="layout-boton-toggle"
      >
        {abierto ? <IconSettings size={28} /> : <IconAdjustments size={28} />}
      </button>
      {abierto && <span className="layout-logo-texto">FER-CONS</span>}
    </div>
  );
}