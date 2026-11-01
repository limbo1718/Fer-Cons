// Datos simulados hasta conectar el backend (Django REST Framework)
import {
  IconUsers, IconBox, IconTruck, IconShoppingCart, IconFileText, IconCash,
  IconBuildingWarehouse, IconFileDescription, IconUserCheck, IconUserX,
} from '@tabler/icons-react'

export const usuarioDemo = { legajo: '45974444', correo: 'alejandro@fercons.com', password: '1234', nombre: 'Alejandro Carrizo', rol: 'Administrador' }

export const empleados = [
  { id: 1, legajo: '0214', nombre: 'Daniel Pérez Ruiz', telefono: '+54 387 320-3022', rol: 'Vendedor', sucursal: 'Casa Central', activo: true },
  { id: 2, legajo: '0215', nombre: 'Alvarez Santiago', telefono: '+54 387 570-3132', rol: 'Cajero', sucursal: 'Casa Central', activo: false },
  { id: 3, legajo: '0216', nombre: 'Maita Alan', telefono: '+54 387 320-3451', rol: 'Vendedor', sucursal: 'Casa Central', activo: true },
  { id: 4, legajo: '0217', nombre: 'Giménez Valeria', telefono: '+54 387 412-9988', rol: 'Encargado de Stock', sucursal: 'Depósito Norte', activo: true },
  { id: 5, legajo: '0218', nombre: 'Rojas Carrizo Lucas', telefono: '+54 387 655-4433', rol: 'Repositor', sucursal: 'Sucursal Sur', activo: true },
  { id: 6, legajo: '0219', nombre: 'Benítez Sofía', telefono: '+54 387 221-1199', rol: 'Cajero', sucursal: 'Sucursal Sur', activo: false },
  { id: 7, legajo: '0220', nombre: 'Gómez Martín', telefono: '+54 387 499-1234', rol: 'Administrador', sucursal: 'Casa Central', activo: true },
  { id: 8, legajo: '0221', nombre: 'Torres Lucía', telefono: '+54 387 611-5678', rol: 'Supervisor', sucursal: 'Sucursal Sur', activo: true },
  { id: 9, legajo: '0222', nombre: 'Navarro Carlos', telefono: '+54 387 733-9876', rol: 'Repositor', sucursal: 'Depósito Norte', activo: false },
  { id: 10, legajo: '0223', nombre: 'Morales Yamila', telefono: '+54 387 522-4321', rol: 'Vendedor', sucursal: 'Sucursal Sur', activo: true }
];

export const proveedores = [
  { id: 1, codigo: '001', nombreFantasia: 'Ceramica Norte', razonSocial: 'Ceramica Norte S.A', cuit: '30-7623345-7', telefono: '+54 387 435-3422', email: 'contacto@ceramicanorte.com', sucursal: 'Casa Central', activo: true },
  { id: 2, codigo: '002', nombreFantasia: 'Hierros del NOA', razonSocial: 'Hierros del NOA S.R.L', cuit: '30-7346345-7', telefono: '+54 387 345-3422', email: 'ventas@hierrosdelnoa.com.ar', sucursal: 'Casa Central', activo: false },
  { id: 3, codigo: '003', nombreFantasia: 'Cementos Salta', razonSocial: 'Cementos Salta S.A', cuit: '30-734575-9', telefono: '+54 388 465-7457', email: 'info@cementossalta.com', sucursal: 'Casa Central', activo: true },
  { id: 4, codigo: '004', nombreFantasia: 'Distribuidora Cuyo', razonSocial: 'Distribuidora Cuyo S.R.L', cuit: '30-6812345-8', telefono: '+54 387 421-8899', email: 'pedidos@distribuidoracuyo.com', sucursal: 'Sucursal Sur', activo: true },
  { id: 5, codigo: '005', nombreFantasia: 'Pinturas del Norte', razonSocial: 'Pinturas del Norte S.A', cuit: '30-7112233-4', telefono: '+54 387 498-1122', email: 'administracion@pinturasdelnorte.com', sucursal: 'Depósito Norte', activo: false },
  { id: 6, codigo: '006', nombreFantasia: 'Bulonera Salta', razonSocial: 'Bulonera Salta S.R.L', cuit: '30-7145678-9', telefono: '+54 387 423-5566', email: 'ventas@bulonerasalta.com.ar', sucursal: 'Sucursal Sur', activo: true },
  { id: 7, codigo: '007', nombreFantasia: 'Sanitarios del Valle', razonSocial: 'Sanitarios del Valle S.A', cuit: '30-7234112-3', telefono: '+54 388 471-9988', email: 'info@sanitariosdelvalle.com', sucursal: 'Casa Central', activo: true },
  { id: 8, codigo: '008', nombreFantasia: 'Electricidad Andina', razonSocial: 'Electricidad Andina S.R.L', cuit: '30-6987412-5', telefono: '+54 387 409-3322', email: 'contacto@electricidadandina.com.ar', sucursal: 'Depósito Norte', activo: false },
  { id: 9, codigo: '009', nombreFantasia: 'Maderas del Norte', razonSocial: 'Maderas del Norte S.A', cuit: '30-7055441-2', telefono: '+54 387 455-7890', email: 'pedidos@maderasdelnorte.com', sucursal: 'Sucursal Sur', activo: true },
  { id: 10, codigo: '010', nombreFantasia: 'Ferretería Industrial Güemes', razonSocial: 'Ferretería Güemes S.R.L', cuit: '30-7412389-1', telefono: '+54 388 488-2233', email: 'administracion@ferreteria-guemes.com.ar', sucursal: 'Casa Central', activo: true }
];

export const modulos = [
  { nombre: 'Empleados', detalle: 'Gestionar usuarios y permisos', icono: IconUsers, ruta: '/empleados' },
  { nombre: 'Pedidos', detalle: 'Gestión y seguimiento', icono: IconBox },
  { nombre: 'Proveedores', detalle: 'Gestionar información y estado de proveedores', icono: IconTruck },
  { nombre: 'Ventas', detalle: 'Seguimiento de ventas', icono: IconShoppingCart },
  { nombre: 'Facturación', detalle: 'Seguimiento de facturas', icono: IconFileText },
  { nombre: 'Caja', detalle: 'Seguimiento de caja', icono: IconCash },
  { nombre: 'Stock', detalle: 'Controlar stock y depósitos', icono: IconBuildingWarehouse },
  { nombre: 'Presupuestos', detalle: 'Crear y consultar', icono: IconFileDescription },
]

// fuerte: texto en negrita; verde/rojo: color del texto destacado
export const actividad = [
  { id: 1, dia: 'Hoy', icono: IconUserCheck, color: 'bg-sidebar', modulo: 'Empleados', hora: '19:24',
    texto: [{ t: 'Alejandro Carrizo', fuerte: true }, { t: ' creó un nuevo empleado: ' }, { t: 'Daniel Pérez Ruiz', fuerte: true }] },
  { id: 2, dia: 'Hoy', icono: IconBuildingWarehouse, color: 'bg-emerald-800', modulo: 'Stock', hora: '10:45',
    texto: [{ t: 'Stock actualizado en ' }, { t: 'Depósito Central', fuerte: true }, { t: ': ' }, { t: 'Cemento Loma Negra x50', verde: true }] },
  { id: 3, dia: 'Hoy', icono: IconShoppingCart, color: 'bg-cyan-400', modulo: 'Ventas', hora: '19:24',
    texto: [{ t: 'Venta N.°1042 registrada por ' }, { t: 'Santiago Alvarez', fuerte: true }, { t: ' por ' }, { t: '$48.500', fuerte: true }] },
  { id: 4, dia: 'Hoy', icono: IconCash, color: 'bg-yellow-400', modulo: 'Caja', hora: '19:32',
    texto: [{ t: 'Santiago Alvarez', fuerte: true }, { t: ' cerró la Caja N.°2 con una diferencia de ' }, { t: '-$1200', fuerte: true }] },
  { id: 5, dia: 'Hoy', icono: IconUserX, color: 'bg-red-600', modulo: 'Empleados', hora: '15:20',
    texto: [{ t: 'Alejandro Carrizo', fuerte: true }, { t: ' dio de baja al empleado: ' }, { t: 'Alvarez Santiago', fuerte: true }] },
  { id: 6, dia: 'Ayer', icono: IconTruck, color: 'bg-navy', modulo: 'Proveedores', hora: '12:30',
    texto: [{ t: 'Nuevo proveedor vinculado: ' }, { t: 'Venta de Áridos Norte S.A', fuerte: true }] },
  { id: 7, dia: 'Ayer', icono: IconFileText, color: 'bg-sidebar', modulo: 'Facturación', hora: '09:15',
    texto: [{ t: 'Valeria Giménez generó la Factura ' }, { t: 'A-0001-00045892', fuerte: true }, { t: ' por ' }, { t: '$124.900', verde: true }] },
  { id: 8, dia: 'Ayer', icono: IconBuildingWarehouse, color: 'bg-emerald-800', modulo: 'Stock', hora: '08:00',
    texto: [{ t: 'Ingreso de mercadería por compra al proveedor ' }, { t: 'Corralón Del Valle', fuerte: true }] },
  { id: 9, dia: 'Días anteriores', icono: IconUserCheck, color: 'bg-sidebar', modulo: 'Empleados', hora: '14:10',
    texto: [{ t: 'Alejandro Carrizo', fuerte: true }, { t: ' actualizó los permisos del rol ' }, { t: 'Cajero', fuerte: true }] },
];
