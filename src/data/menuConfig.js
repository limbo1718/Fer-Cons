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
  IconUser
} from '@tabler/icons-react';

export const menuCategories = [
  {
    id: 'principal',
    title: 'Principal',
    icono: IconHome2,
    modules: [
      { name: 'Inicio', path: '/', detalle: 'Pantalla principal y actividad', icono: IconHome2, roles: ['Administrador', 'Empleado'] }
    ]
  },
  {
    id: 'comercial',
    title: 'Comercial',
    icono: IconShoppingBag,
    modules: [
      { name: 'Ventas', path: '/ventas', detalle: 'Seguimiento de ventas', icono: IconShoppingCart, roles: ['Administrador', 'Empleado'] },
      { name: 'Pedidos', path: '/pedidos', detalle: 'Gestión y seguimiento', icono: IconBox, roles: ['Administrador', 'Empleado'] },
      { name: 'Presupuestos', path: '/presupuestos', detalle: 'Crear y consultar', icono: IconFileDescription, roles: ['Administrador', 'Empleado'] }
    ]
  },
  {
    id: 'inventario',
    title: 'Inventario',
    icono: IconPackage,
    modules: [
      { name: 'Stock', path: '/stock', detalle: 'Controlar stock y depósitos', icono: IconBuildingWarehouse, roles: ['Administrador', 'Empleado'] },
      { name: 'Proveedores', path: '/proveedores', detalle: 'Crear y gestionar', icono: IconTruck, roles: ['Administrador'] }
    ]
  },
  {
    id: 'administracion',
    title: 'Administración',
    icono: IconReceipt,
    modules: [
      { name: 'Facturación', path: '/facturacion', detalle: 'Seguimiento de facturas', icono: IconFileText, roles: ['Administrador'] },
      { name: 'Caja', path: '/caja', detalle: 'Seguimiento de caja', icono: IconCash, roles: ['Administrador', 'Empleado'] },
      { name: 'Empleados', path: '/empleados', detalle: 'Gestionar usuarios y permisos', icono: IconUsers, roles: ['Administrador'] }
    ]
  },
  {
    id: 'sistema',
    title: 'Sistema',
    icono: IconForms,
    modules: [
      { name: 'Perfil', path: '/perfil', detalle: 'Gestión de cuenta y datos personales', icono: IconUser, roles: ['Administrador', 'Empleado'] },
      { name: 'Actividad', path: '/actividad', detalle: 'Registro de movimientos', icono: IconRefresh, roles: ['Administrador'] }
    ]
  }
];