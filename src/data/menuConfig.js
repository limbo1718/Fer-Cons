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
  IconRefresh 
} from '@tabler/icons-react';

export const menuModules = [
  { 
    name: 'Inicio', 
    path: '/', 
    detalle: 'Pantalla principal y actividad', 
    icono: IconHome2, 
    roles: ['Administrador', 'Empleado'] 
  },
  { 
    name: 'Empleados', 
    path: '/empleados', 
    detalle: 'Gestionar usuarios y permisos', 
    icono: IconUsers, 
    roles: ['Administrador'] 
  },
  { 
    name: 'Pedidos', 
    path: '/pedidos', 
    detalle: 'Gestión y seguimiento', 
    icono: IconBox, 
    roles: ['Administrador', 'Empleado'] 
  },
  { 
    name: 'Proveedores', 
    path: '/proveedores', 
    detalle: 'Crear y gestionar', 
    icono: IconTruck, 
    roles: ['Administrador'] 
  },
  { 
    name: 'Ventas', 
    path: '/ventas', 
    detalle: 'Seguimiento de ventas', 
    icono: IconShoppingCart, 
    roles: ['Administrador', 'Empleado'] 
  },
  { 
    name: 'Facturación', 
    path: '/facturacion', 
    detalle: 'Seguimiento de facturas', 
    icono: IconFileText, 
    roles: ['Administrador'] 
  },
  { 
    name: 'Caja', 
    path: '/caja', 
    detalle: 'Seguimiento de caja', 
    icono: IconCash, 
    roles: ['Administrador', 'Empleado'] 
  },
  { 
    name: 'Stock', 
    path: '/stock', 
    detalle: 'Controlar stock y depósitos', 
    icono: IconBuildingWarehouse, 
    roles: ['Administrador', 'Empleado'] 
  },
  { 
    name: 'Presupuestos', 
    path: '/presupuestos', 
    detalle: 'Crear y consultar', 
    icono: IconFileDescription, 
    roles: ['Administrador', 'Empleado'] 
  },
  { 
    name: 'Actividad', 
    path: '/actividad', 
    detalle: 'Registro de movimientos', 
    icono: IconRefresh, 
    roles: ['Administrador'] 
  },
];