import { 
  IconHome2, 
  IconUsers, 
  IconBox, 
  IconTruck, 
  IconShoppingCart, 
  IconFileText, 
  IconCash, 
  IconBuildingWarehouse, 
  IconFileDescription, 
  IconRefresh,
  IconShoppingBag,
  IconPackage,
  IconReceipt,
  IconForms,
  IconUser,
  IconTags,
  IconBuildingStore 
} from '@tabler/icons-react';

// NUEVO: Definimos un array con todos los roles (excepto Admin) para no repetirlos tanto
const EMPLEADOS_GENERALES = [
  'Supervisor', 
  'Encargado de Stock', 
  'Cajero', 
  'Vendedor', 
  'Repositor', 
  'Administrativo'
];

// Roles que tienen acceso a la mayoría de las cosas de salón
const ROLES_VENTAS = ['Administrador', 'Vendedor', 'Cajero', 'Supervisor'];
// Roles que tienen acceso al inventario
const ROLES_INVENTARIO = ['Administrador', 'Encargado de Stock', 'Supervisor', 'Repositor'];

export const menuCategories = [
  {
    id: 'principal',
    title: 'Principal',
    icono: IconHome2,
    modules: [
      { name: 'Inicio', path: '/', detalle: 'Pantalla principal y actividad', icono: IconHome2, roles: ['Administrador', ...EMPLEADOS_GENERALES] }
    ]
  },
  {
    id: 'comercial',
    title: 'Comercial',
    icono: IconShoppingBag,
    modules: [
      { name: 'Ventas', path: '/ventas', detalle: 'Seguimiento de ventas', icono: IconShoppingCart, roles: ROLES_VENTAS },
      { name: 'Compras', path: '/compras', detalle: 'Gestión y seguimiento de compras a proveedores', icono: IconBox, roles: ['Administrador', ...EMPLEADOS_GENERALES] },
      { name: 'Presupuestos', path: '/presupuestos', detalle: 'Crear y consultar', icono: IconFileDescription, roles: ROLES_VENTAS }
    ]
  },
  {
    id: 'inventario',
    title: 'Inventario',
    icono: IconPackage,
    modules: [
      { name: 'Productos', path: '/productos', detalle: 'Gestionar inventario, precios y artículos', icono: IconTags, roles: ['Administrador', ...EMPLEADOS_GENERALES] },
      { name: 'Stock', path: '/stock', detalle: 'Controlar stock y depósitos', icono: IconBuildingWarehouse, roles: ROLES_INVENTARIO },
      { name: 'Proveedores', path: '/proveedores', detalle: 'Gestionar información y estado de proveedores', icono: IconTruck, roles: ['Administrador', 'Encargado de Stock'] }
    ]
  },
  {
    id: 'administracion',
    title: 'Administración',
    icono: IconReceipt,
    modules: [
      { name: 'Facturación', path: '/facturacion', detalle: 'Seguimiento de facturas', icono: IconFileText, roles: ['Administrador', 'Cajero'] },
      { name: 'Caja', path: '/caja', detalle: 'Seguimiento de caja', icono: IconCash, roles: ['Administrador', 'Cajero'] },
      // Empleados y Sucursales siguen siendo exclusivos del Administrador
      { name: 'Empleados', path: '/empleados', detalle: 'Gestionar usuarios y permisos', icono: IconUser, roles: ['Administrador'] },
      { name: 'Sucursales', path: '/sucursales', detalle: 'Gestionar información y estado de las sucursales', icono: IconBuildingStore, roles: ['Administrador'] }
    ]
  },
  {
    id: 'sistema',
    title: 'Sistema',
    icono: IconForms,
    modules: [
      { name: 'Perfil', path: '/perfil', detalle: 'Gestión de cuenta y datos personales', icono: IconUser, roles: ['Administrador', ...EMPLEADOS_GENERALES] },
      { name: 'Actividad', path: '/actividad', detalle: 'Registro de movimientos', icono: IconRefresh, roles: ['Administrador'] }
    ]
  }
];