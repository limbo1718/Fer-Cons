import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext.jsx';
import { menuCategories } from '../data/menuConfig.js';
import SidebarHeader from './sidebar/SidebarHeader';
import SidebarCategory from './sidebar/SidebarCategory';
import SidebarFooter from './sidebar/SidebarFooter';
import '../styles/MenuDesplegable.css';

const inferior = ({ isActive }) => `item-inferior-base ${isActive ? 'item-inferior-activo' : 'item-inferior-inactivo'}`;

export default function MenuDesplegable() {
  const [abierto, setAbierto] = useState(false);
  
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

  const cerrarMenu = () => {
    setAbierto(false);
  };

  const handleLogoutClick = () => {
    cerrarMenu();
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: '¿Estás seguro de que deseas salir del sistema?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4a9da8',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    });
  };

  const handleModuloClick = (e, modulo) => {
    const modulosEnDesarrollo = ['/ventas', '/pedidos', '/presupuestos', '/stock', '/proveedores', '/facturacion', '/caja', '/perfil'];

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

    cerrarMenu();
  };

  return (
    <div className="layout-contenedor">
      {/* Escritorio: menú lateral desplegable */}
      <aside className={`layout-aside ${abierto ? 'layout-aside-ancho-abierto' : 'layout-aside-ancho-cerrado'}`}>
        <SidebarHeader 
          abierto={abierto} 
          onToggle={() => setAbierto(!abierto)} 
        />

        <nav className="layout-nav-links">
          {menuCategories.map((cat) => {
            const modulosAutorizados = cat.modules.filter(m => user && m.roles.includes(user.rol));
            if (modulosAutorizados.length === 0) return null;

            return (
              <SidebarCategory
                key={cat.id}
                cat={cat}
                modulosAutorizados={modulosAutorizados}
                abierto={abierto}
                isDesplegada={categoriaAbierta[cat.id]}
                onToggleCategoria={toggleCategoria}
                onModuloClick={handleModuloClick}
              />
            );
          })}
        </nav>

        <SidebarFooter 
          abierto={abierto} 
          onLogoutClick={handleLogoutClick} 
        />
      </aside>

      <main className="layout-main">
        <Outlet />
      </main>

      {/* Móvil: barra inferior */}
      <nav className="layout-nav-movil">
        <NavLink to="/actividad" className={inferior}>Actividad</NavLink>
        <NavLink to="/" end className={inferior}>Inicio</NavLink>
        <button onClick={handleLogoutClick} className="item-inferior-base item-inferior-inactivo">Perfil</button>
      </nav>
    </div>
  );
}