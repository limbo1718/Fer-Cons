import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  IconAdjustments, IconSettings, IconLogout, IconChevronDown, IconChevronUp
} from '@tabler/icons-react';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext.jsx';
import { menuCategories } from '../data/menuConfig.js';
import '../styles/MenuDesplegable.css';

const lateral = ({ isActive }) => `item-base-sidebar ${isActive ? 'item-lateral-activo' : 'item-lateral-inactivo'}`;
const inferior = ({ isActive }) => `item-inferior-base ${isActive ? 'item-inferior-activo' : 'item-inferior-inactivo'}`;

export default function MenuDesplegable() {
  const [abierto, setAbierto] = useState(false);
  
  // Estado inicial en false para que todas las categorías comiencen cerradas por defecto
  const [categoriaAbierta, setCategoriaAbierta] = useState({
    comercial: false,
    inventario: false,
    administracion: false,
    sistema: false
  });

  const { user, logout } = useAuth();

  const toggleCategoria = (catId) => {
    setCategoriaAbierta(prev => ({ ...prev, [catId]: !prev[catId] }));
  };

  // Cierra el menú al hacer clic en una opción (UX: reduce choque visual)
  const cerrarMenu = () => {
    setAbierto(false);
  };

  // Manejador de clics en los módulos (Alerta SweetAlert2 + Cierre de menú)
  const handleModuloClick = (e, modulo) => {
    // Definimos las rutas operativas actuales (ej. Inicio, Empleados o las que ya tengas lista)
    // Si la ruta del módulo no existe o está pendiente de desarrollo:
    const modulosEnDesarrollo = ['/ventas', '/pedidos', '/presupuestos', '/stock', '/proveedores', '/facturacion', '/caja', '/perfil', '/actividad'];

    if (!modulo.path || modulosEnDesarrollo.includes(modulo.path)) {
      e.preventDefault();
      Swal.fire({
        icon: 'info',
        title: modulo.name,
        text: 'Este módulo todavía está en desarrollo.',
        confirmButtonColor: '#4a9da8',
        timer: 2000,
        timerProgressBar: true
      });
    }

    // Cerramos el menú lateral automáticamente para limpiar la vista
    cerrarMenu();
  };

  return (
    <div className="layout-contenedor">
      {/* Escritorio: menú lateral desplegable por categorías */}
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
          {menuCategories.map((cat) => {
            // Filtrar módulos autorizados según el rol del usuario
            const modulosAutorizados = cat.modules.filter(m => user && m.roles.includes(user.rol));
            if (modulosAutorizados.length === 0) return null;

            const CatIcon = cat.icono;
            const isDesplegada = categoriaAbierta[cat.id];

            // Si es la categoría principal o el menú está colapsado
            if (cat.id === 'principal' || !abierto) {
              return modulosAutorizados.map(modulo => {
                const IconComponent = modulo.icono;
                return (
                  <NavLink
                    key={modulo.name}
                    to={modulo.path || '#'}
                    end={modulo.path === '/'}
                    className={lateral}
                    title={!abierto ? modulo.name : ''}
                    onClick={(e) => handleModuloClick(e, modulo)}
                  >
                    <IconComponent size={24} />
                    {abierto && <span>{modulo.name}</span>}
                  </NavLink>
                );
              });
            }

            return (
              <div key={cat.id} className="menu-categoria-grupo">
                {/* Cabecera desplegable de la Categoría */}
                <button 
                  className="menu-categoria-boton"
                  onClick={() => toggleCategoria(cat.id)}
                >
                  <div className="categoria-titulo-icono">
                    <CatIcon size={20} />
                    <span>{cat.title}</span>
                  </div>
                  {isDesplegada ? <IconChevronUp size={18} /> : <IconChevronDown size={18} />}
                </button>

                {/* Submódulos pertenecientes a la Categoría */}
                {isDesplegada && (
                  <div className="menu-submodulos">
                    {modulosAutorizados.map(modulo => {
                      const IconComponent = modulo.icono;
                      return (
                        <NavLink
                          key={modulo.name}
                          to={modulo.path || '#'}
                          end={modulo.path === '/'}
                          className={lateral}
                          onClick={(e) => handleModuloClick(e, modulo)}
                        >
                          <IconComponent size={22} />
                          <span>{modulo.name}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
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