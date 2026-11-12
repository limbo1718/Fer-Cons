// Datos simulados hasta conectar el backend (Django REST Framework)
import {
  IconUsers, IconBox, IconTruck, IconShoppingCart, IconFileText, IconCash,
  IconBuildingWarehouse, IconFileDescription, IconUserCheck, IconUserX,
} from '@tabler/icons-react'

// 1. PAISES
export const paises = [
  { ID_Paises: 1, Nombre_Pais: 'Argentina' }
];

// 2. PROVINCIAS
export const provincias = [
  { ID_Provincias: 1, ID_Paises: 1, Nombre_Prov: 'Salta' }
];

// 3. LOCALIDADES
export const localidades = [
  { ID_Localidades: 1, ID_Provincias: 1, Codigo_Postal: '4400', Nombre_Localidad: 'Salta Capital' },
  { ID_Localidades: 2, ID_Provincias: 1, Codigo_Postal: '4405', Nombre_Localidad: 'San Lorenzo' },
  { ID_Localidades: 3, ID_Provincias: 1, Codigo_Postal: '4401', Nombre_Localidad: 'Vaqueros' }
];

// 4. UBICACIONES
export const ubicaciones = [
  { ID_Ubicaciones: 1, ID_Localidades: 1, Latitud: -24.782120, Longitud: -65.412320, Calle: 'Av. Belgrano', Nro_Calle: 1234 },
  { ID_Ubicaciones: 2, ID_Localidades: 1, Latitud: -24.810500, Longitud: -65.405200, Calle: 'Av. Tavella', Nro_Calle: 800 },
  { ID_Ubicaciones: 3, ID_Localidades: 1, Latitud: -24.765400, Longitud: -65.441200, Calle: 'Parque Industrial', Nro_Calle: 100 },
  { ID_Ubicaciones: 4, ID_Localidades: 1, Latitud: -24.790000, Longitud: -65.410000, Calle: 'Av. Chile', Nro_Calle: 1450 },
  { ID_Ubicaciones: 5, ID_Localidades: 1, Latitud: -24.820000, Longitud: -65.420000, Calle: 'Av. Ex Combatientes de Malvinas', Nro_Calle: 3200 },
  { ID_Ubicaciones: 6, ID_Localidades: 1, Latitud: -24.770000, Longitud: -65.420000, Calle: 'Av. Reyes Católicos', Nro_Calle: 1550 },
  { ID_Ubicaciones: 7, ID_Localidades: 1, Latitud: -24.785000, Longitud: -65.405000, Calle: 'Av. Entre Ríos', Nro_Calle: 920 },
  { ID_Ubicaciones: 8, ID_Localidades: 2, Latitud: -24.740000, Longitud: -65.480000, Calle: 'Av. San Martin', Nro_Calle: 450 },
  { ID_Ubicaciones: 9, ID_Localidades: 1, Latitud: -24.815000, Longitud: -65.390000, Calle: 'Av. Discépolo', Nro_Calle: 600 },
  { ID_Ubicaciones: 10, ID_Localidades: 1, Latitud: -24.795000, Longitud: -65.430000, Calle: 'Av. Perón', Nro_Calle: 2100 },
  { ID_Ubicaciones: 11, ID_Localidades: 1, Latitud: -24.780000, Longitud: -65.415000, Calle: 'España', Nro_Calle: 740 },
  { ID_Ubicaciones: 12, ID_Localidades: 3, Latitud: -24.720000, Longitud: -65.410000, Calle: 'Av. San Martin', Nro_Calle: 120 },
  { ID_Ubicaciones: 13, ID_Localidades: 1, Latitud: -24.830000, Longitud: -65.410000, Calle: 'Av. Banchik', Nro_Calle: 500 }
];

// 5. EMPRESAS
export const empresas = [
  {
    ID_Empresas: 1,
    CUIT: '30-71234567-8',
    Nombre_Emp: 'Fer-Cons S.A.',
    Razon_Social: 'Fer-Cons Materiales S.A.',
    Email: 'contacto@fercons.com',
    Telefono: '3874222222',
    Ingresos_Brutos: '30-71234567-8',
    Fecha_Inicio_Act: '2020-01-15',
    Dir_Fiscal: 'Av. Belgrano 1234, Salta',
    Condicion_IVA: 'Responsable Inscripto'
  }
];

// 6. SUCURSALES (13 sucursales, incluyendo inactividades)
export const sucursales = [
  {
    ID_Sucursales: 1,
    ID_Empresas: 1,
    ID_Ubicaciones: 1,
    Nombre: 'Casa Central',
    Hora_Ap: '08:00:00',
    Hora_C: '18:00:00',
    Contacto: '3874000001',
    Email_Suc: 'casacentral@fercons.com',
    activo: true,
    detalleBaja: ''
  },
  {
    ID_Sucursales: 2,
    ID_Empresas: 1,
    ID_Ubicaciones: 2,
    Nombre: 'Sucursal Sur',
    Hora_Ap: '08:30:00',
    Hora_C: '18:30:00',
    Contacto: '3874000002',
    Email_Suc: 'sucursalsur@fercons.com',
    activo: true,
    detalleBaja: ''
  },
  {
    ID_Sucursales: 3,
    ID_Empresas: 1,
    ID_Ubicaciones: 3,
    Nombre: 'Depósito Norte',
    Hora_Ap: '07:00:00',
    Hora_C: '17:00:00',
    Contacto: '3874000003',
    Email_Suc: 'depositonorte@fercons.com',
    activo: true,
    detalleBaja: ''
  },
  {
    ID_Sucursales: 4,
    ID_Empresas: 1,
    ID_Ubicaciones: 4,
    Nombre: 'Sucursal Chile',
    Hora_Ap: '08:00:00',
    Hora_C: '18:00:00',
    Contacto: '3874000004',
    Email_Suc: 'chile@fercons.com',
    activo: true,
    detalleBaja: ''
  },
  {
    ID_Sucursales: 5,
    ID_Empresas: 1,
    ID_Ubicaciones: 5,
    Nombre: 'Sucursal Intersatambres',
    Hora_Ap: '08:00:00',
    Hora_C: '17:30:00',
    Contacto: '3874000005',
    Email_Suc: 'intersatambres@fercons.com',
    activo: false,
    detalleBaja: 'Cerrada temporalmente por remodelación de depósito e instalaciones eléctricas.'
  },
  {
    ID_Sucursales: 6,
    ID_Empresas: 1,
    ID_Ubicaciones: 6,
    Nombre: 'Sucursal Tres Cerritos',
    Hora_Ap: '08:30:00',
    Hora_C: '19:00:00',
    Contacto: '3874000006',
    Email_Suc: 'trescerritos@fercons.com',
    activo: true,
    detalleBaja: ''
  },
  {
    ID_Sucursales: 7,
    ID_Empresas: 1,
    ID_Ubicaciones: 7,
    Nombre: 'Sucursal Macrocentro',
    Hora_Ap: '08:00:00',
    Hora_C: '18:00:00',
    Contacto: '3874000007',
    Email_Suc: 'macrocentro@fercons.com',
    activo: true,
    detalleBaja: ''
  },
  {
    ID_Sucursales: 8,
    ID_Empresas: 1,
    ID_Ubicaciones: 8,
    Nombre: 'Sucursal San Lorenzo',
    Hora_Ap: '09:00:00',
    Hora_C: '17:00:00',
    Contacto: '3874000008',
    Email_Suc: 'sanlorenzo@fercons.com',
    activo: true,
    detalleBaja: ''
  },
  {
    ID_Sucursales: 9,
    ID_Empresas: 1,
    ID_Ubicaciones: 9,
    Nombre: 'Depósito San Antonio',
    Hora_Ap: '07:30:00',
    Hora_C: '16:30:00',
    Contacto: '3874000009',
    Email_Suc: 'sanantonio@fercons.com',
    activo: false,
    detalleBaja: 'Unificación de stock en el Depósito Norte.'
  },
  {
    ID_Sucursales: 10,
    ID_Empresas: 1,
    ID_Ubicaciones: 10,
    Nombre: 'Sucursal Grand Bourg',
    Hora_Ap: '08:00:00',
    Hora_C: '18:00:00',
    Contacto: '3874000010',
    Email_Suc: 'grandbourg@fercons.com',
    activo: true,
    detalleBaja: ''
  },
  {
    ID_Sucursales: 11,
    ID_Empresas: 1,
    ID_Ubicaciones: 11,
    Nombre: 'Sucursal Centro Peatonal',
    Hora_Ap: '08:30:00',
    Hora_C: '19:30:00',
    Contacto: '3874000011',
    Email_Suc: 'peatonal@fercons.com',
    activo: true,
    detalleBaja: ''
  },
  {
    ID_Sucursales: 12,
    ID_Empresas: 1,
    ID_Ubicaciones: 12,
    Nombre: 'Sucursal Vaqueros',
    Hora_Ap: '08:00:00',
    Hora_C: '17:00:00',
    Contacto: '3874000012',
    Email_Suc: 'vaqueros@fercons.com',
    activo: true,
    detalleBaja: ''
  },
  {
    ID_Sucursales: 13,
    ID_Empresas: 1,
    ID_Ubicaciones: 13,
    Nombre: 'Depósito Aeropuerto',
    Hora_Ap: '07:00:00',
    Hora_C: '16:00:00',
    Contacto: '3874000013',
    Email_Suc: 'aeropuerto@fercons.com',
    activo: true,
    detalleBaja: ''
  }
];

// ==========================================
// 1. ROLES (Sin cambios)
// ==========================================
export const roles = [
  { ID_Roles: 1, Ocupacion: 'Administrador', Descripcion: 'Gestión total del sistema y sucursales' },
  { ID_Roles: 2, Ocupacion: 'Supervisor', Descripcion: 'Supervisión de personal y operaciones' },
  { ID_Roles: 3, Ocupacion: 'Encargado de Stock', Descripcion: 'Control de inventario, ingresos y egresos' },
  { ID_Roles: 4, Ocupacion: 'Cajero', Descripcion: 'Atención de caja y cobros' },
  { ID_Roles: 5, Ocupacion: 'Vendedor', Descripcion: 'Atención al cliente y ventas en salón' },
  { ID_Roles: 6, Ocupacion: 'Repositor', Descripcion: 'Reposición de mercadería en góndolas' },
  { ID_Roles: 7, Ocupacion: 'Administrativo', Descripcion: 'Tareas administrativas generales' }
];

// ==========================================
// 2. USUARIOS (Solo Autenticación)
// ==========================================
export const usuarios = [
  { ID_Usuarios: 1, Username: 'daniel.perez', Password: '1234', Email: 'daniel.perez@ferreteria.com' },
  { ID_Usuarios: 2, Username: 'santiago.alvarez', Password: '1234', Email: 'santiago.alvarez@ferreteria.com' },
  { ID_Usuarios: 3, Username: 'alan.maita', Password: '1234', Email: 'alan.maita@ferreteria.com' },
  { ID_Usuarios: 4, Username: 'valeria.gimenez', Password: '1234', Email: 'valeria.gimenez@ferreteria.com' },
  { ID_Usuarios: 5, Username: 'lucas.rojas', Password: '1234', Email: 'lucas.rojas@ferreteria.com' },
  { ID_Usuarios: 6, Username: 'sofia.benitez', Password: '1234', Email: 'sofia.benitez@ferreteria.com' },
  { ID_Usuarios: 7, Username: 'martin.gomez', Password: '1234', Email: 'martin.gomez@ferreteria.com' },
  { ID_Usuarios: 8, Username: 'lucia.torres', Password: '1234', Email: 'lucia.torres@ferreteria.com' },
  { ID_Usuarios: 9, Username: 'carlos.navarro', Password: '1234', Email: 'carlos.navarro@ferreteria.com' },
  { ID_Usuarios: 10, Username: 'yamila.morales', Password: '1234', Email: 'yamila.morales@ferreteria.com' },
  { ID_Usuarios: 11, Username: 'rodrigo.paz', Password: '1234', Email: 'rodrigo.paz@ferreteria.com' },
  { ID_Usuarios: 12, Username: 'florencia.soria', Password: '1234', Email: 'florencia.soria@ferreteria.com' },
  { ID_Usuarios: 13, Username: 'esteban.vargas', Password: '1234', Email: 'esteban.vargas@ferreteria.com' },
  { ID_Usuarios: 14, Username: 'camila.medina', Password: '1234', Email: 'camila.medina@ferreteria.com' },
  { ID_Usuarios: 15, Username: 'gonzalo.rios', Password: '1234', Email: 'gonzalo.rios@ferreteria.com' },
  { ID_Usuarios: 16, Username: 'natalia.flores', Password: '1234', Email: 'natalia.flores@ferreteria.com' },
  { ID_Usuarios: 17, Username: 'hernan.acosta', Password: '1234', Email: 'hernan.acosta@ferreteria.com' },
  { ID_Usuarios: 18, Username: 'romina.diaz', Password: '1234', Email: 'romina.diaz@ferreteria.com' },
  { ID_Usuarios: 19, Username: 'facundo.juarez', Password: '1234', Email: 'facundo.juarez@ferreteria.com' },
  { ID_Usuarios: 20, Username: 'antonella.herrera', Password: '1234', Email: 'antonella.herrera@ferreteria.com' },
  { ID_Usuarios: 21, Username: 'maximiliano.luna', Password: '1234', Email: 'maximiliano.luna@ferreteria.com' },
  { ID_Usuarios: 22, Username: 'julieta.castro', Password: '1234', Email: 'julieta.castro@ferreteria.com' },
  { ID_Usuarios: 23, Username: 'marcos.villalba', Password: '1234', Email: 'marcos.villalba@ferreteria.com' },
  { ID_Usuarios: 24, Username: 'daiana.ponce', Password: '1234', Email: 'daiana.ponce@ferreteria.com' },
  { ID_Usuarios: 25, Username: 'cristian.silva', Password: '1234', Email: 'cristian.silva@ferreteria.com' }
];

// ==========================================
// 3. EMPLEADOS (Datos Personales)
// ==========================================
// NOTA: El campo Estado en el DER es CHAR(2), pero para el frontend usamos true/false. 
// Al conectar al backend, se hará la conversión a 'AC'/'IN'.
export const empleados = [
  { ID_Empleados: 1, ID_Usuarios: 1, DNI_Empleados: '38412345', Legajo: '0214', Nombre: 'Daniel', Apellido: 'Pérez Ruiz', Telefono: '+54 387 320-3022', Estado: true },
  { ID_Empleados: 2, ID_Usuarios: 2, DNI_Empleados: '40123987', Legajo: '0215', Nombre: 'Santiago', Apellido: 'Alvarez', Telefono: '+54 387 570-3132', Estado: false },
  { ID_Empleados: 3, ID_Usuarios: 3, DNI_Empleados: '39222333', Legajo: '0216', Nombre: 'Alan', Apellido: 'Maita', Telefono: '+54 387 320-3451', Estado: true },
  { ID_Empleados: 4, ID_Usuarios: 4, DNI_Empleados: '37888999', Legajo: '0217', Nombre: 'Valeria', Apellido: 'Giménez', Telefono: '+54 387 412-9988', Estado: true },
  { ID_Empleados: 5, ID_Usuarios: 5, DNI_Empleados: '41555666', Legajo: '0218', Nombre: 'Lucas', Apellido: 'Rojas Carrizo', Telefono: '+54 387 655-4433', Estado: true },
  { ID_Empleados: 6, ID_Usuarios: 6, DNI_Empleados: '39444111', Legajo: '0219', Nombre: 'Sofía', Apellido: 'Benítez', Telefono: '+54 387 221-1199', Estado: false },
  { ID_Empleados: 7, ID_Usuarios: 7, DNI_Empleados: '35111222', Legajo: '0220', Nombre: 'Martín', Apellido: 'Gómez', Telefono: '+54 387 499-1234', Estado: true },
  { ID_Empleados: 8, ID_Usuarios: 8, DNI_Empleados: '36777888', Legajo: '0221', Nombre: 'Lucía', Apellido: 'Torres', Telefono: '+54 387 611-5678', Estado: true },
  { ID_Empleados: 9, ID_Usuarios: 9, DNI_Empleados: '42333000', Legajo: '0222', Nombre: 'Carlos', Apellido: 'Navarro', Telefono: '+54 387 733-9876', Estado: false },
  { ID_Empleados: 10, ID_Usuarios: 10, DNI_Empleados: '40999111', Legajo: '0223', Nombre: 'Yamila', Apellido: 'Morales', Telefono: '+54 387 522-4321', Estado: true },
  { ID_Empleados: 11, ID_Usuarios: 11, DNI_Empleados: '38888222', Legajo: '0224', Nombre: 'Rodrigo', Apellido: 'Paz', Telefono: '+54 387 411-8877', Estado: true },
  { ID_Empleados: 12, ID_Usuarios: 12, DNI_Empleados: '41222444', Legajo: '0225', Nombre: 'Florencia', Apellido: 'Soria', Telefono: '+54 387 399-2233', Estado: true },
  { ID_Empleados: 13, ID_Usuarios: 13, DNI_Empleados: '39555333', Legajo: '0226', Nombre: 'Esteban', Apellido: 'Vargas', Telefono: '+54 387 688-4455', Estado: true },
  { ID_Empleados: 14, ID_Usuarios: 14, DNI_Empleados: '37666444', Legajo: '0227', Nombre: 'Camila', Apellido: 'Medina', Telefono: '+54 387 500-1122', Estado: false },
  { ID_Empleados: 15, ID_Usuarios: 15, DNI_Empleados: '40333555', Legajo: '0228', Nombre: 'Gonzalo', Apellido: 'Rios', Telefono: '+54 387 311-6677', Estado: true },
  { ID_Empleados: 16, ID_Usuarios: 16, DNI_Empleados: '36444777', Legajo: '0229', Nombre: 'Natalia', Apellido: 'Flores', Telefono: '+54 387 455-9900', Estado: true },
  { ID_Empleados: 17, ID_Usuarios: 17, DNI_Empleados: '38999000', Legajo: '0230', Nombre: 'Hernán', Apellido: 'Acosta', Telefono: '+54 387 622-3344', Estado: true },
  { ID_Empleados: 18, ID_Usuarios: 18, DNI_Empleados: '39111888', Legajo: '0231', Nombre: 'Romina', Apellido: 'Díaz', Telefono: '+54 387 377-5566', Estado: false },
  { ID_Empleados: 19, ID_Usuarios: 19, DNI_Empleados: '41777222', Legajo: '0232', Nombre: 'Facundo', Apellido: 'Juárez', Telefono: '+54 387 488-7788', Estado: true },
  { ID_Empleados: 20, ID_Usuarios: 20, DNI_Empleados: '42888333', Legajo: '0233', Nombre: 'Antonella', Apellido: 'Herrera', Telefono: '+54 387 533-2211', Estado: true },
  { ID_Empleados: 21, ID_Usuarios: 21, DNI_Empleados: '40666999', Legajo: '0234', Nombre: 'Maximiliano', Apellido: 'Luna', Telefono: '+54 387 699-0011', Estado: true },
  { ID_Empleados: 22, ID_Usuarios: 22, DNI_Empleados: '38222777', Legajo: '0235', Nombre: 'Julieta', Apellido: 'Castro', Telefono: '+54 387 344-8899', Estado: true },
  { ID_Empleados: 23, ID_Usuarios: 23, DNI_Empleados: '36111555', Legajo: '0236', Nombre: 'Marcos', Apellido: 'Villalba', Telefono: '+54 387 422-5544', Estado: false },
  { ID_Empleados: 24, ID_Usuarios: 24, DNI_Empleados: '41999444', Legajo: '0237', Nombre: 'Daiana', Apellido: 'Ponce', Telefono: '+54 387 566-7788', Estado: true },
  { ID_Empleados: 25, ID_Usuarios: 25, DNI_Empleados: '42000111', Legajo: '0238', Nombre: 'Cristian', Apellido: 'Silva', Telefono: '+54 387 677-1122', Estado: true }
];

// ==========================================
// 4. EMPLEADOS_X_ROLES
// ==========================================
export const empleados_x_roles = [
  { ID_Empleados_x_Roles: 1, ID_Empleados: 1, ID_Roles: 5, Hora_Entrada: '08:00', Hora_Salida: '17:00', Estado: true },
  { ID_Empleados_x_Roles: 2, ID_Empleados: 2, ID_Roles: 4, Hora_Entrada: '08:00', Hora_Salida: '16:00', Estado: false, detalleBaja: 'Renuncia voluntaria presentada por motivos personales.' },
  { ID_Empleados_x_Roles: 3, ID_Empleados: 3, ID_Roles: 5, Hora_Entrada: '09:00', Hora_Salida: '18:00', Estado: true },
  { ID_Empleados_x_Roles: 4, ID_Empleados: 4, ID_Roles: 3, Hora_Entrada: '07:00', Hora_Salida: '16:00', Estado: true },
  { ID_Empleados_x_Roles: 5, ID_Empleados: 5, ID_Roles: 6, Hora_Entrada: '08:30', Hora_Salida: '17:30', Estado: true },
  { ID_Empleados_x_Roles: 6, ID_Empleados: 6, ID_Roles: 4, Hora_Entrada: '12:00', Hora_Salida: '20:00', Estado: false, detalleBaja: 'Baja temporal por reestructuración de turnos en sucursal.' },
  { ID_Empleados_x_Roles: 7, ID_Empleados: 7, ID_Roles: 5, Hora_Entrada: '08:00', Hora_Salida: '17:00', Estado: false, detalleBaja: 'Ascenso a Administrador.' },
  { ID_Empleados_x_Roles: 8, ID_Empleados: 7, ID_Roles: 1, Hora_Entrada: '08:00', Hora_Salida: '17:00', Estado: true },
  { ID_Empleados_x_Roles: 9, ID_Empleados: 8, ID_Roles: 2, Hora_Entrada: '08:00', Hora_Salida: '17:00', Estado: true },
  { ID_Empleados_x_Roles: 10, ID_Empleados: 9, ID_Roles: 6, Hora_Entrada: '07:00', Hora_Salida: '16:00', Estado: false, detalleBaja: 'Inasistencias injustificadas reiteradas.' },
  { ID_Empleados_x_Roles: 11, ID_Empleados: 10, ID_Roles: 5, Hora_Entrada: '09:00', Hora_Salida: '18:00', Estado: true },
  { ID_Empleados_x_Roles: 12, ID_Empleados: 11, ID_Roles: 5, Hora_Entrada: '08:00', Hora_Salida: '17:00', Estado: true },
  { ID_Empleados_x_Roles: 13, ID_Empleados: 12, ID_Roles: 4, Hora_Entrada: '08:00', Hora_Salida: '16:00', Estado: true },
  { ID_Empleados_x_Roles: 14, ID_Empleados: 13, ID_Roles: 6, Hora_Entrada: '07:00', Hora_Salida: '16:00', Estado: true },
  { ID_Empleados_x_Roles: 15, ID_Empleados: 14, ID_Roles: 7, Hora_Entrada: '08:00', Hora_Salida: '17:00', Estado: false, detalleBaja: 'Licencia sin goce de sueldo prolongada.' },
  { ID_Empleados_x_Roles: 16, ID_Empleados: 15, ID_Roles: 5, Hora_Entrada: '09:00', Hora_Salida: '18:00', Estado: true },
  { ID_Empleados_x_Roles: 17, ID_Empleados: 16, ID_Roles: 2, Hora_Entrada: '07:00', Hora_Salida: '16:00', Estado: true },
  { ID_Empleados_x_Roles: 18, ID_Empleados: 17, ID_Roles: 4, Hora_Entrada: '08:00', Hora_Salida: '16:00', Estado: true },
  { ID_Empleados_x_Roles: 19, ID_Empleados: 18, ID_Roles: 3, Hora_Entrada: '08:00', Hora_Salida: '17:00', Estado: false, detalleBaja: 'Finalización de contrato temporal.' },
  { ID_Empleados_x_Roles: 20, ID_Empleados: 19, ID_Roles: 5, Hora_Entrada: '09:00', Hora_Salida: '18:00', Estado: true },
  { ID_Empleados_x_Roles: 21, ID_Empleados: 20, ID_Roles: 6, Hora_Entrada: '07:00', Hora_Salida: '16:00', Estado: true },
  { ID_Empleados_x_Roles: 22, ID_Empleados: 21, ID_Roles: 5, Hora_Entrada: '08:00', Hora_Salida: '17:00', Estado: true },
  { ID_Empleados_x_Roles: 23, ID_Empleados: 22, ID_Roles: 4, Hora_Entrada: '12:00', Hora_Salida: '20:00', Estado: true },
  { ID_Empleados_x_Roles: 24, ID_Empleados: 23, ID_Roles: 2, Hora_Entrada: '08:00', Hora_Salida: '17:00', Estado: false, detalleBaja: 'Desvinculación por motivos disciplinarios.' },
  { ID_Empleados_x_Roles: 25, ID_Empleados: 24, ID_Roles: 5, Hora_Entrada: '07:00', Hora_Salida: '16:00', Estado: true },
  { ID_Empleados_x_Roles: 26, ID_Empleados: 25, ID_Roles: 6, Hora_Entrada: '08:30', Hora_Salida: '17:30', Estado: true }
];

// ==========================================
// 5. SUCURSALES_X_EMPLEADOS
// ==========================================
export const sucursales_x_empleados = [
  { ID_Sucursales_x_Empleados: 1, ID_Sucursales: 1, ID_Empleados: 1, Fecha_Asociacion: '10/05/2021', Estado: true },
  { ID_Sucursales_x_Empleados: 2, ID_Sucursales: 1, ID_Empleados: 2, Fecha_Asociacion: '15/08/2020', Estado: false },
  { ID_Sucursales_x_Empleados: 3, ID_Sucursales: 1, ID_Empleados: 3, Fecha_Asociacion: '01/03/2022', Estado: true },
  { ID_Sucursales_x_Empleados: 4, ID_Sucursales: 3, ID_Empleados: 4, Fecha_Asociacion: '20/11/2019', Estado: true },
  { ID_Sucursales_x_Empleados: 5, ID_Sucursales: 2, ID_Empleados: 5, Fecha_Asociacion: '12/07/2023', Estado: true },
  { ID_Sucursales_x_Empleados: 6, ID_Sucursales: 2, ID_Empleados: 6, Fecha_Asociacion: '05/02/2021', Estado: false },
  { ID_Sucursales_x_Empleados: 7, ID_Sucursales: 1, ID_Empleados: 7, Fecha_Asociacion: '01/01/2020', Estado: true },
  { ID_Sucursales_x_Empleados: 8, ID_Sucursales: 2, ID_Empleados: 8, Fecha_Asociacion: '18/09/2018', Estado: true },
  { ID_Sucursales_x_Empleados: 9, ID_Sucursales: 3, ID_Empleados: 9, Fecha_Asociacion: '30/04/2022', Estado: false },
  { ID_Sucursales_x_Empleados: 10, ID_Sucursales: 2, ID_Empleados: 10, Fecha_Asociacion: '14/10/2021', Estado: true },
  { ID_Sucursales_x_Empleados: 11, ID_Sucursales: 1, ID_Empleados: 11, Fecha_Asociacion: '22/02/2023', Estado: true },
  { ID_Sucursales_x_Empleados: 12, ID_Sucursales: 2, ID_Empleados: 12, Fecha_Asociacion: '11/06/2021', Estado: true },
  { ID_Sucursales_x_Empleados: 13, ID_Sucursales: 3, ID_Empleados: 13, Fecha_Asociacion: '09/09/2019', Estado: true },
  { ID_Sucursales_x_Empleados: 14, ID_Sucursales: 1, ID_Empleados: 14, Fecha_Asociacion: '17/12/2020', Estado: false },
  { ID_Sucursales_x_Empleados: 15, ID_Sucursales: 2, ID_Empleados: 15, Fecha_Asociacion: '03/08/2022', Estado: true },
  { ID_Sucursales_x_Empleados: 16, ID_Sucursales: 3, ID_Empleados: 16, Fecha_Asociacion: '25/05/2017', Estado: true },
  { ID_Sucursales_x_Empleados: 17, ID_Sucursales: 1, ID_Empleados: 17, Fecha_Asociacion: '19/01/2024', Estado: true },
  { ID_Sucursales_x_Empleados: 18, ID_Sucursales: 2, ID_Empleados: 18, Fecha_Asociacion: '08/03/2021', Estado: false },
  { ID_Sucursales_x_Empleados: 19, ID_Sucursales: 1, ID_Empleados: 19, Fecha_Asociacion: '14/11/2022', Estado: true },
  { ID_Sucursales_x_Empleados: 20, ID_Sucursales: 3, ID_Empleados: 20, Fecha_Asociacion: '27/10/2023', Estado: true },
  { ID_Sucursales_x_Empleados: 21, ID_Sucursales: 2, ID_Empleados: 21, Fecha_Asociacion: '12/04/2021', Estado: true },
  { ID_Sucursales_x_Empleados: 22, ID_Sucursales: 1, ID_Empleados: 22, Fecha_Asociacion: '05/12/2019', Estado: true },
  { ID_Sucursales_x_Empleados: 23, ID_Sucursales: 1, ID_Empleados: 23, Fecha_Asociacion: '21/07/2020', Estado: false },
  { ID_Sucursales_x_Empleados: 24, ID_Sucursales: 3, ID_Empleados: 24, Fecha_Asociacion: '16/09/2022', Estado: true },
  { ID_Sucursales_x_Empleados: 25, ID_Sucursales: 2, ID_Empleados: 25, Fecha_Asociacion: '29/03/2024', Estado: true }
];

// ==========================================
// 6. USUARIO DEMO (Adaptado a la nueva estructura)
// ==========================================
export const usuarioDemo = { 
  // Datos de Autenticación (USUARIOS)
  ID_Usuarios: 99,
  Username: 'alejandro',
  Email: 'alejandro@fercons.com', 
  Password: '1234', 
  
  // Datos Personales (EMPLEADOS)
  ID_Empleados: 99,
  Nombre: 'Alejandro Carrizo', 
  Legajo: '45974444', 
  DNI_Empleados: '45.974.444',
  Telefono: '+54 387 412-9988',
  Fecha_Asociacion: '14/02/2025',
  Estado: true,
  
  // Rol
  Ocupacion: 'Administrador'
};

export const proveedores = [
  { id: 1, codigo: '001', nombreFantasia: 'Ceramica Norte', razonSocial: 'Ceramica Norte S.A', cuit: '30-7623345-7', telefono: '+54 387 435-3422', email: 'contacto@ceramicanorte.com', id_sucursal: 1, activo: true },
  { id: 2, codigo: '002', nombreFantasia: 'Hierros del NOA', razonSocial: 'Hierros del NOA S.R.L', cuit: '30-7346345-7', telefono: '+54 387 345-3422', email: 'ventas@hierrosdelnoa.com.ar', id_sucursal: 1, activo: false },
  { id: 3, codigo: '003', nombreFantasia: 'Cementos Salta', razonSocial: 'Cementos Salta S.A', cuit: '30-734575-9', telefono: '+54 388 465-7457', email: 'info@cementossalta.com', id_sucursal: 1, activo: true },
  { id: 4, codigo: '004', nombreFantasia: 'Distribuidora Cuyo', razonSocial: 'Distribuidora Cuyo S.R.L', cuit: '30-6812345-8', telefono: '+54 387 421-8899', email: 'pedidos@distribuidoracuyo.com', id_sucursal: 2, activo: true },
  { id: 5, codigo: '005', nombreFantasia: 'Pinturas del Norte', razonSocial: 'Pinturas del Norte S.A', cuit: '30-7112233-4', telefono: '+54 387 498-1122', email: 'administracion@pinturasdelnorte.com', id_sucursal: 3, activo: false },
  { id: 6, codigo: '006', nombreFantasia: 'Bulonera Salta', razonSocial: 'Bulonera Salta S.R.L', cuit: '30-7145678-9', telefono: '+54 387 423-5566', email: 'ventas@bulonerasalta.com.ar', id_sucursal: 2, activo: true },
  { id: 7, codigo: '007', nombreFantasia: 'Sanitarios del Valle', razonSocial: 'Sanitarios del Valle S.A', cuit: '30-7234112-3', telefono: '+54 388 471-9988', email: 'info@sanitariosdelvalle.com', id_sucursal: 1, activo: true },
  { id: 8, codigo: '008', nombreFantasia: 'Electricidad Andina', razonSocial: 'Electricidad Andina S.R.L', cuit: '30-6987412-5', telefono: '+54 387 409-3322', email: 'contacto@electricidadandina.com.ar', id_sucursal: 3, activo: false },
  { id: 9, codigo: '009', nombreFantasia: 'Maderas del Norte', razonSocial: 'Maderas del Norte S.A', cuit: '30-7055441-2', telefono: '+54 387 455-7890', email: 'pedidos@maderasdelnorte.com', id_sucursal: 2, activo: true },
  { id: 10, codigo: '010', nombreFantasia: 'Ferretería Industrial Güemes', razonSocial: 'Ferretería Güemes S.R.L', cuit: '30-7412389-1', telefono: '+54 388 488-2233', email: 'administracion@ferreteria-guemes.com.ar', id_sucursal: 1, activo: true },
  { id: 11, codigo: '011', nombreFantasia: 'Áridos del Sur', razonSocial: 'Áridos del Sur S.A', cuit: '30-7198822-4', telefono: '+54 387 444-1122', email: 'ventas@aridosdelsur.com', id_sucursal: 2, activo: true },
  { id: 12, codigo: '012', nombreFantasia: 'Yesos y Cielorrasos NOA', razonSocial: 'Yesos NOA S.R.L', cuit: '30-7331199-8', telefono: '+54 387 477-3344', email: 'contacto@yesosnoa.com.ar', id_sucursal: 3, activo: true },
  { id: 13, codigo: '013', nombreFantasia: 'Herramientas Profesionales Salta', razonSocial: 'Herramientas Salta S.A', cuit: '30-7044556-3', telefono: '+54 388 422-9900', email: 'info@herramientassalta.com', id_sucursal: 1, activo: false },
  { id: 14, codigo: '014', nombreFantasia: 'Aberturas de Aluminio Norte', razonSocial: 'Aluminio Norte S.R.L', cuit: '30-7266778-1', telefono: '+54 387 466-5533', email: 'pedidos@aluminionorte.com.ar', id_sucursal: 2, activo: true },
  { id: 15, codigo: '015', nombreFantasia: 'Caños y Conexiones del Valle', razonSocial: 'Caños Valle S.A', cuit: '30-7155443-9', telefono: '+54 387 411-2244', email: 'ventas@canosvalle.com', id_sucursal: 3, activo: true },
  { id: 16, codigo: '016', nombreFantasia: 'Impermeabilizantes Cuyo', razonSocial: 'Impermeabilizantes S.R.L', cuit: '30-6922334-5', telefono: '+54 388 433-7788', email: 'contacto@impercuyo.com', id_sucursal: 1, activo: true },
  { id: 17, codigo: '017', nombreFantasia: 'Mallas y Metales Güemes', razonSocial: 'Metales Güemes S.A', cuit: '30-7488991-2', telefono: '+54 387 488-6655', email: 'info@metalesguemes.com.ar', id_sucursal: 2, activo: false },
  { id: 18, codigo: '018', nombreFantasia: 'Ladrillos Cerámicos San Cayetano', razonSocial: 'Cerámica San Cayetano S.R.L', cuit: '30-7211223-6', telefono: '+54 387 499-4411', email: 'pedidos@sancayetano.com', id_sucursal: 1, activo: true },
  { id: 19, codigo: '019', nombreFantasia: 'Pinturería Industrial Centro', razonSocial: 'Pinturas Centro S.A', cuit: '30-7399884-7', telefono: '+54 388 455-1199', email: 'ventas@pinturascentro.com.ar', id_sucursal: 3, activo: true },
  { id: 20, codigo: '020', nombreFantasia: 'Techitos y Chapas del Norte', razonSocial: 'Chapas Norte S.R.L', cuit: '30-7133445-0', telefono: '+54 387 422-7766', email: 'contacto@chapasnorte.com', id_sucursal: 2, activo: true },
  { id: 21, codigo: '021', nombreFantasia: 'Adhesivos y Pegamentos Salta', razonSocial: 'Pegamentos Salta S.A', cuit: '30-7088776-4', telefono: '+54 387 433-8899', email: 'info@pegamentosalta.com', id_sucursal: 1, activo: true },
  { id: 22, codigo: '022', nombreFantasia: 'Ferretería Mayorista Andina', razonSocial: 'Andina Mayorista S.R.L', cuit: '30-7455667-8', telefono: '+54 388 411-3322', email: 'ventas@andinamayorista.com.ar', id_sucursal: 3, activo: false },
  { id: 23, codigo: '023', nombreFantasia: 'Construcciones Secundarias SRL', razonSocial: 'Secundarias S.R.L', cuit: '30-7244332-1', telefono: '+54 387 466-9900', email: 'pedidos@secundarias.com', id_sucursal: 2, activo: true },
  { id: 24, codigo: '024', nombreFantasia: 'Equipamientos para Obra', razonSocial: 'Equipamientos Obra S.A', cuit: '30-7311225-9', telefono: '+54 387 477-1133', email: 'contacto@equipamientosobra.com', id_sucursal: 1, activo: true },
  { id: 25, codigo: '025', nombreFantasia: 'Maderas y Derivados del Litoral', razonSocial: 'Derivados Litoral S.R.L', cuit: '30-6899443-2', telefono: '+54 388 499-2244', email: 'info@litoralmaderas.com.ar', id_sucursal: 3, activo: true },
  { id: 26, codigo: '026', nombreFantasia: 'Cerrajería y Herrajes Salta', razonSocial: 'Herrajes Salta S.A', cuit: '30-7166554-3', telefono: '+54 387 444-5566', email: 'ventas@herrajessalta.com', id_sucursal: 1, activo: true },
  { id: 27, codigo: '027', nombreFantasia: 'Grifería y Sanitarios del Norte', razonSocial: 'Sanitarios Norte S.R.L', cuit: '30-7299881-6', telefono: '+54 387 411-7788', email: 'contacto@sanitariosnorte.com.ar', id_sucursal: 2, activo: false },
  { id: 28, codigo: '028', nombreFantasia: 'Cables y Materiales Eléctricos', razonSocial: 'Materiales Eléctricos S.A', cuit: '30-7377665-2', telefono: '+54 388 422-3344', email: 'pedidos@matelectricos.com', id_sucursal: 3, activo: true },
  { id: 29, codigo: '029', nombreFantasia: 'Placas de Yeso Durlock Salta', razonSocial: 'Durlock Salta S.R.L', cuit: '30-7422119-5', telefono: '+54 387 455-6677', email: 'info@durlocksalta.com.ar', id_sucursal: 1, activo: true },
  { id: 30, codigo: '030', nombreFantasia: 'Estructuras Metálicas del NOA', razonSocial: 'Estructuras NOA S.A', cuit: '30-7033221-8', telefono: '+54 387 488-9900', email: 'ventas@estructurasnoa.com', id_sucursal: 2, activo: true },
  { id: 31, codigo: '031', nombreFantasia: 'Áridos y Cementos Güemes', razonSocial: 'Güemes Materiales S.R.L', cuit: '30-7188774-1', telefono: '+54 388 433-2211', email: 'contacto@guemesmateriales.com.ar', id_sucursal: 3, activo: true },
  { id: 32, codigo: '032', nombreFantasia: 'Pisos y Revestimientos Cerámicos', razonSocial: 'Pisos Cerámicos S.A', cuit: '30-7255446-7', telefono: '+54 387 466-1122', email: 'pedidos@pisosceramicos.com', id_sucursal: 1, activo: false },
  { id: 33, codigo: '033', nombreFantasia: 'Aislaciones Térmicas y Acústicas', razonSocial: 'Aislaciones Salta S.R.L', cuit: '30-7322114-9', telefono: '+54 387 499-5566', email: 'info@aislacionsalta.com.ar', id_sucursal: 2, activo: true },
  { id: 34, codigo: '034', nombreFantasia: 'Herramientas Eléctricas del Valle', razonSocial: 'Herramientas Valle S.A', cuit: '30-7411993-2', telefono: '+54 388 477-8899', email: 'ventas@herramientasvalle.com', id_sucursal: 3, activo: true },
  { id: 35, codigo: '035', nombreFantasia: 'Distribuidora General Ferretera', razonSocial: 'Distri Ferretera S.R.L', cuit: '30-7099221-5', telefono: '+54 387 422-1144', email: 'contacto@distriferretera.com.ar', id_sucursal: 1, activo: true }
];

export const metodosPago = [
    { id: 1, nombre: 'Efectivo' },
    { id: 2, nombre: 'Transferencia Bancaria' },
    { id: 3, nombre: 'Tarjeta de Crédito' },
    { id: 4, nombre: 'Cuenta Corriente' }
];

export const marcasOpciones = [
    'Genérica',    // 1
    'Cortines',    // 2
    'Weber',       // 3
    'Holcim',      // 4
    'Andina',      // 5
    'Cacique',     // 6
    'Sika',        // 7
    'Ferrum',      // 8
    'FV',          // 9
    'Eternit'      // 10
];

export const unidadesOpciones = [
    { id: 1, label: 'Unidad' },
    { id: 2, label: 'Bolsa' },
    { id: 3, label: 'Metro / Barra' },
    { id: 4, label: 'm²' },
    { id: 5, label: 'Bolsón / m³' }
];

export const getMarcaNombre = (idMarca) => {
    return marcasOpciones[idMarca - 1] || 'Genérica';
};

export const getUnidadLabel = (idUnidad) => {
    const unidad = unidadesOpciones.find(u => u.id === idUnidad);
    return unidad ? unidad.label : 'Unidad';
};

export const categorias = [
    { id: 1, nombre: 'Cerámicos y Revestimientos' },
    { id: 2, nombre: 'Hierros y Aceros' },
    { id: 3, nombre: 'Cementos, Cales y Áridos' },
    { id: 4, nombre: 'Sanitarios y Plomería' }
];

// Tabla intermedia simulada: PRODUCTOS_X_PROVEEDORES
// Relaciona cada producto con su(s) proveedor(es), código de proveedor y precio de lista correspondiente[cite: 7].
export const productosXProveedores = [
  // --- Cerámicos y Revestimientos (Cat 1) ---
  { id: 1, id_Productos: 101, id_Proveedores: 1, codigo_Producto_Proveedor: '001-CER-6060-MB', precio_Lista: 35000, estado: true },
  { id: 2, id_Productos: 102, id_Proveedores: 1, codigo_Producto_Proveedor: '001-CER-4545-COR', precio_Lista: 17500, estado: true },
  { id: 3, id_Productos: 103, id_Proveedores: 1, codigo_Producto_Proveedor: '001-REV-3060-GRIS', precio_Lista: 23000, estado: true },
  { id: 4, id_Productos: 104, id_Proveedores: 1, codigo_Producto_Proveedor: '001-POR-20120-MAD', precio_Lista: 40000, estado: true },
  { id: 5, id_Productos: 105, id_Proveedores: 1, codigo_Producto_Proveedor: '001-ZOC-1045', precio_Lista: 3800, estado: false },
  { id: 6, id_Productos: 106, id_Proveedores: 10, codigo_Producto_Proveedor: '010-PEG-WEB-25', precio_Lista: 15500, estado: true },
  { id: 7, id_Productos: 107, id_Proveedores: 21, codigo_Producto_Proveedor: '021-PAS-IMP-1KG', precio_Lista: 3400, estado: true },
  { id: 8, id_Productos: 108, id_Proveedores: 14, codigo_Producto_Proveedor: '014-LIS-ALU-25', precio_Lista: 11000, estado: true },
  { id: 9, id_Productos: 109, id_Proveedores: 7, codigo_Producto_Proveedor: '007-MOS-VEN-3030', precio_Lista: 11800, estado: true },
  { id: 10, id_Productos: 110, id_Proveedores: 14, codigo_Producto_Proveedor: '014-GUA-CUR-10', precio_Lista: 9200, estado: true },

  // --- Hierros y Aceros (Cat 2) ---
  { id: 11, id_Productos: 201, id_Proveedores: 2, codigo_Producto_Proveedor: '002-HIE-RET-6', precio_Lista: 6700, estado: true },
  { id: 12, id_Productos: 202, id_Proveedores: 2, codigo_Producto_Proveedor: '002-HIE-RET-8', precio_Lista: 10500, estado: true },
  { id: 13, id_Productos: 203, id_Proveedores: 2, codigo_Producto_Proveedor: '002-HIE-RET-10', precio_Lista: 16500, estado: true },
  { id: 14, id_Productos: 204, id_Proveedores: 2, codigo_Producto_Proveedor: '002-HIE-RET-12', precio_Lista: 23500, estado: true },
  { id: 15, id_Productos: 205, id_Proveedores: 17, codigo_Producto_Proveedor: '017-MAL-CIM-42', precio_Lista: 30000, estado: true },
  { id: 16, id_Productos: 206, id_Proveedores: 17, codigo_Producto_Proveedor: '017-MAL-CIM-55', precio_Lista: 45000, estado: true },
  { id: 17, id_Productos: 207, id_Proveedores: 6, codigo_Producto_Proveedor: '006-ALA-REC-16', precio_Lista: 4700, estado: false },
  { id: 18, id_Productos: 208, id_Proveedores: 30, codigo_Producto_Proveedor: '030-PER-C-100', precio_Lista: 52000, estado: true },
  { id: 19, id_Productos: 209, id_Proveedores: 30, codigo_Producto_Proveedor: '030-PER-C-120', precio_Lista: 61000, estado: true },
  { id: 20, id_Productos: 210, id_Proveedores: 20, codigo_Producto_Proveedor: '020-CHA-NEG-18', precio_Lista: 38500, estado: true },

  // --- Cementos, Cales y Áridos (Cat 3) ---
  { id: 21, id_Productos: 301, id_Proveedores: 3, codigo_Producto_Proveedor: '003-CEM-HOL-25', precio_Lista: 18500, estado: true },
  { id: 22, id_Productos: 302, id_Proveedores: 31, codigo_Producto_Proveedor: '031-CAL-VIV-25', precio_Lista: 14800, estado: true },
  { id: 23, id_Productos: 303, id_Proveedores: 3, codigo_Producto_Proveedor: '003-CAL-APA-30', precio_Lista: 14800, estado: true },
  { id: 24, id_Productos: 304, id_Proveedores: 11, codigo_Producto_Proveedor: '011-ARE-FIN-25', precio_Lista: 7400, estado: false },
  { id: 25, id_Productos: 305, id_Proveedores: 11, codigo_Producto_Proveedor: '011-CAN-ROD-25', precio_Lista: 8000, estado: true },
  { id: 26, id_Productos: 306, id_Proveedores: 3, codigo_Producto_Proveedor: '003-CEM-PLA-40', precio_Lista: 17000, estado: true },
  { id: 27, id_Productos: 307, id_Proveedores: 11, codigo_Producto_Proveedor: '011-CAS-MOL-1M3', precio_Lista: 35000, estado: true },
  { id: 28, id_Productos: 308, id_Proveedores: 11, codigo_Producto_Proveedor: '011-ARE-GRU-1M3', precio_Lista: 42000, estado: true },
  { id: 29, id_Productos: 309, id_Proveedores: 16, codigo_Producto_Proveedor: '016-ACE-SIK-5L', precio_Lista: 23000, estado: true },
  { id: 30, id_Productos: 310, id_Proveedores: 16, codigo_Producto_Proveedor: '016-HID-SIK-4K', precio_Lista: 11400, estado: true },

  // --- Sanitarios y Plomería (Cat 4) ---
  { id: 31, id_Productos: 701, id_Proveedores: 15, codigo_Producto_Proveedor: '015-CAN-PVC-110', precio_Lista: 20500, estado: true },
  { id: 32, id_Productos: 702, id_Proveedores: 15, codigo_Producto_Proveedor: '015-CAN-TER-20', precio_Lista: 7700, estado: true },
  { id: 33, id_Productos: 703, id_Proveedores: 15, codigo_Producto_Proveedor: '015-CAN-TER-25', precio_Lista: 11100, estado: true },
  { id: 34, id_Productos: 704, id_Proveedores: 15, codigo_Producto_Proveedor: '015-COD-PVC-110', precio_Lista: 4200, estado: true },
  { id: 35, id_Productos: 705, id_Proveedores: 7, codigo_Producto_Proveedor: '007-INO-FER-BAR', precio_Lista: 230000, estado: true },
  { id: 36, id_Productos: 706, id_Proveedores: 7, codigo_Producto_Proveedor: '007-BID-FER-BAR', precio_Lista: 114000, estado: true },
  { id: 37, id_Productos: 707, id_Proveedores: 27, codigo_Producto_Proveedor: '027-GRI-MON-FV', precio_Lista: 80000, estado: true },
  { id: 38, id_Productos: 708, id_Proveedores: 27, codigo_Producto_Proveedor: '027-SIF-DOB-COC', precio_Lista: 10800, estado: false },
  { id: 39, id_Productos: 709, id_Proveedores: 27, codigo_Producto_Proveedor: '027-VAL-DES-INO', precio_Lista: 51000, estado: true },
  { id: 40, id_Productos: 710, id_Proveedores: 28, codigo_Producto_Proveedor: '028-TAN-AGU-1000', precio_Lista: 245000, estado: true }
];

export const productos = [
  // --- Categoría 1: Cerámicos y Revestimientos ---
  {
    id: 101,
    codigo: 'CER-6060-MB',
    idCategoria: 1,
    idMarca: 1, // Genérica
    idUnidad: 4, // m²
    idSucursal: 1, // Casa Central
    nombre: 'Porcellanato 60x60 Mármol Blanco',
    precioUnidad: 37050,
    descripcion: 'Porcellanato brillante de alto tránsito',
    activo: true
  },
  {
    id: 102,
    codigo: 'CER-4545-COR',
    idCategoria: 1,
    idMarca: 2, // Cortines
    idUnidad: 4,
    idSucursal: 2, // Sucursal Sur
    nombre: 'Cerámica 45x45 Cortines Hueso',
    precioUnidad: 18460,
    descripcion: 'Cerámica esmaltada para pisos interiores',
    activo: true
  },
  {
    id: 103,
    codigo: 'REV-3060-GRIS',
    idCategoria: 1,
    idMarca: 1, // Genérica
    idUnidad: 4,
    idSucursal: 3, // Depósito Norte
    nombre: 'Revestimiento Pared 30x60 Gris',
    precioUnidad: 24570,
    descripcion: 'Cerámica texturada para paredes',
    activo: true
  },
  {
    id: 104,
    codigo: 'POR-20120-MAD',
    idCategoria: 1,
    idMarca: 1, // Genérica
    idUnidad: 4,
    idSucursal: 1, // Casa Central
    nombre: 'Porcellanato 20x120 Símil Madera',
    precioUnidad: 41600,
    descripcion: 'Placa símil madera rectificada',
    activo: true
  },
  {
    id: 105,
    codigo: 'ZOC-1045',
    idCategoria: 1,
    idMarca: 1, // Genérica
    idUnidad: 1,
    idSucursal: 2, // Sucursal Sur
    nombre: 'Zócalo Cerámico 10x45',
    precioUnidad: 4030,
    descripcion: 'Zócalo coordinado',
    activo: false // Inactivo de prueba
  },
  {
    id: 106,
    codigo: 'PEG-WEB-25',
    idCategoria: 1,
    idMarca: 3, // Weber
    idUnidad: 2, // Bolsa
    idSucursal: 3, // Depósito Norte
    nombre: 'Pegamento Weber Porcellanato 25kg',
    precioUnidad: 16250,
    descripcion: 'Adhesivo impermeable flexible',
    activo: true
  },
  {
    id: 107,
    codigo: 'PAS-IMP-1KG',
    idCategoria: 1,
    idMarca: 1, // Genérica
    idUnidad: 2,
    idSucursal: 1, // Casa Central
    nombre: 'Pastina Impermeable 1kg Blanco',
    precioUnidad: 3640,
    descripcion: 'Pastina antihongo',
    activo: true
  },
  {
    id: 108,
    codigo: 'LIS-ALU-25',
    idCategoria: 1,
    idMarca: 1, // Genérica
    idUnidad: 1,
    idSucursal: 2, // Sucursal Sur
    nombre: 'Listón Decorativo Aluminio 2.5m',
    precioUnidad: 11570,
    descripcion: 'Perfil terminación canto',
    activo: true
  },
  {
    id: 109,
    codigo: 'MOS-VEN-3030',
    idCategoria: 1,
    idMarca: 1, // Genérica
    idUnidad: 4,
    idSucursal: 3, // Depósito Norte
    nombre: 'Mosaico Veneciano Malla 30x30',
    precioUnidad: 12350,
    descripcion: 'Venecitas para piscinas y baños',
    activo: true
  },
  {
    id: 110,
    codigo: 'GUA-CUR-10',
    idCategoria: 1,
    idMarca: 1, // Genérica
    idUnidad: 1,
    idSucursal: 1, // Casa Central
    nombre: 'Guardacanto Curvo Aluminio 10mm',
    precioUnidad: 9620,
    descripcion: 'Protector de esquinas',
    activo: true
  },

  // --- Categoría 2: Hierros y Aceros ---
  {
    id: 201,
    codigo: 'HIE-RET-6',
    idCategoria: 2,
    idMarca: 1, // Genérica
    idUnidad: 3,
    idSucursal: 3, // Depósito Norte
    nombre: 'Hierro Retorcido 6mm x 12m',
    precioUnidad: 7020,
    descripcion: 'Hierro ADN retorcido para construcción',
    activo: true
  },
  {
    id: 202,
    codigo: 'HIE-RET-8',
    idCategoria: 2,
    idMarca: 1, // Genérica
    idUnidad: 3,
    idSucursal: 3, // Depósito Norte
    nombre: 'Hierro Retorcido 8mm x 12m',
    precioUnidad: 11050,
    descripcion: 'Hierro ADN retorcido para construcción',
    activo: true
  },
  {
    id: 203,
    codigo: 'HIE-RET-10',
    idCategoria: 2,
    idMarca: 1, // Genérica
    idUnidad: 3,
    idSucursal: 3, // Depósito Norte
    nombre: 'Hierro Retorcido 10mm x 12m',
    precioUnidad: 17160,
    descripcion: 'Hierro ADN retorcido para construcción',
    activo: true
  },
  {
    id: 204,
    codigo: 'HIE-RET-12',
    idCategoria: 2,
    idMarca: 1, // Genérica
    idUnidad: 3,
    idSucursal: 3, // Depósito Norte
    nombre: 'Hierro Retorcido 12mm x 12m',
    precioUnidad: 24570,
    descripcion: 'Hierro ADN retorcido para construcción',
    activo: true
  },
  {
    id: 205,
    codigo: 'MAL-CIM-42',
    idCategoria: 2,
    idMarca: 1, // Genérica
    idUnidad: 1,
    idSucursal: 3, // Depósito Norte
    nombre: 'Malla Cima 15x15 4.2mm (2x3m)',
    precioUnidad: 31850,
    descripcion: 'Malla acanalada electrosoldada',
    activo: true
  },
  {
    id: 206,
    codigo: 'MAL-CIM-55',
    idCategoria: 2,
    idMarca: 1, // Genérica
    idUnidad: 1,
    idSucursal: 3, // Depósito Norte
    nombre: 'Malla Cima 15x15 5.5mm (2x3m)',
    precioUnidad: 46800,
    descripcion: 'Malla acanalada electrosoldada',
    activo: true
  },
  {
    id: 207,
    codigo: 'ALA-REC-16',
    idCategoria: 2,
    idMarca: 1, // Genérica
    idUnidad: 2,
    idSucursal: 1, // Casa Central
    nombre: 'Alambre Recocido N° 16 x 1kg',
    precioUnidad: 4940,
    descripcion: 'Alambre para atar hierro',
    activo: false // Inactivo de prueba
  },
  {
    id: 208,
    codigo: 'PER-C-100',
    idCategoria: 2,
    idMarca: 1, // Genérica
    idUnidad: 3,
    idSucursal: 3, // Depósito Norte
    nombre: 'Perfil C 100x50x2mm x 6m',
    precioUnidad: 54600,
    descripcion: 'Perfil estructural abierto',
    activo: true
  },
  {
    id: 209,
    codigo: 'PER-C-120',
    idCategoria: 2,
    idMarca: 1, // Genérica
    idUnidad: 3,
    idSucursal: 3, // Depósito Norte
    nombre: 'Perfil C 120x50x2mm x 6m',
    precioUnidad: 64350,
    descripcion: 'Perfil estructural abierto',
    activo: true
  },
  {
    id: 210,
    codigo: 'CHA-NEG-18',
    idCategoria: 2,
    idMarca: 1, // Genérica
    idUnidad: 1,
    idSucursal: 3, // Depósito Norte
    nombre: 'Chapa Negra 18 (1x2m)',
    precioUnidad: 40300,
    descripcion: 'Chapa laminada en caliente',
    activo: true
  },

  // --- Categoría 3: Cementos, Cales y Áridos ---
  {
    id: 301,
    codigo: 'CEM-HOL-25',
    idCategoria: 3,
    idMarca: 4, // Holcim
    idUnidad: 2,
    idSucursal: 1, // Casa Central
    nombre: 'Cemento en bolsa x 25kg Holcim',
    precioUnidad: 19500,
    descripcion: 'Cemento Portland normal',
    activo: true
  },
  {
    id: 302,
    codigo: 'CAL-VIV-25',
    idCategoria: 3,
    idMarca: 5, // Andina
    idUnidad: 2,
    idSucursal: 2, // Sucursal Sur
    nombre: 'Cal viva en bolsa x 25kg Andina',
    precioUnidad: 15600,
    descripcion: 'Cal para construcción',
    activo: true
  },
  {
    id: 303,
    codigo: 'CAL-APA-30',
    idCategoria: 3,
    idMarca: 6, // Cacique
    idUnidad: 2,
    idSucursal: 1, // Casa Central
    nombre: 'Cal apagada en bolsa x 30kg Cacique',
    precioUnidad: 15600,
    descripcion: 'Cal hidratada en bolsa',
    activo: true
  },
  {
    id: 304,
    codigo: 'ARE-FIN-25',
    idCategoria: 3,
    idMarca: 1, // Genérica
    idUnidad: 2,
    idSucursal: 2, // Sucursal Sur
    nombre: 'Arena fina en bolsa x 25kg Fara',
    precioUnidad: 7800,
    descripcion: 'Arena zarandeada embolsada',
    activo: false // Inactivo de prueba
  },
  {
    id: 305,
    codigo: 'CAN-ROD-25',
    idCategoria: 3,
    idMarca: 1, // Genérica
    idUnidad: 2,
    idSucursal: 3, // Depósito Norte
    nombre: 'Canto rodado en bolsa x 25kg',
    precioUnidad: 8450,
    descripcion: 'Árido decorativo',
    activo: true
  },
  {
    id: 306,
    codigo: 'CEM-PLA-40',
    idCategoria: 3,
    idMarca: 4, // Holcim
    idUnidad: 2,
    idSucursal: 1, // Casa Central
    nombre: 'Cemento de albañilería Plasticor 40kg',
    precioUnidad: 17940,
    descripcion: 'Mortero premezclado',
    activo: true
  },
  {
    id: 307,
    codigo: 'CAS-MOL-1M3',
    idCategoria: 3,
    idMarca: 1, // Genérica
    idUnidad: 5, // Bolsón / m³
    idSucursal: 3, // Depósito Norte
    nombre: 'Cascote molido x bolson 1m³',
    precioUnidad: 36400,
    descripcion: 'Material para relleno y contrapisos',
    activo: true
  },
  {
    id: 308,
    codigo: 'ARE-GRU-1M3',
    idCategoria: 3,
    idMarca: 1, // Genérica
    idUnidad: 5,
    idSucursal: 3, // Depósito Norte
    nombre: 'Arena gruesa x bolsón 1m³',
    precioUnidad: 44200,
    descripcion: 'Árido grueso a granel en bolsón',
    activo: true
  },
  {
    id: 309,
    codigo: 'ACE-SIK-5L',
    idCategoria: 3,
    idMarca: 7, // Sika
    idUnidad: 1,
    idSucursal: 1, // Casa Central
    nombre: 'Acelerante de fragüe Sika 5L',
    precioUnidad: 24050,
    descripcion: 'Aditivo para hormigón y morteros',
    activo: true
  },
  {
    id: 310,
    codigo: 'HID-SIK-4K',
    idCategoria: 3,
    idMarca: 7, // Sika
    idUnidad: 1,
    idSucursal: 2, // Sucursal Sur
    nombre: 'Hidrófugo Pasta Sika 1 x 4kg',
    precioUnidad: 11960,
    descripcion: 'Aditivo impermeabilizante',
    activo: true
  },

  // --- Categoría 4: Sanitarios y Plomería ---
  {
    id: 701,
    codigo: 'CAN-PVC-110',
    idCategoria: 4,
    idMarca: 1, // Genérica
    idUnidad: 3,
    idSucursal: 2, // Sucursal Sur
    nombre: 'Caño PVC 110mm x 4m para Desagüe',
    precioUnidad: 21450,
    descripcion: 'Cañería cloacal y pluvial',
    activo: true
  },
  {
    id: 702,
    codigo: 'CAN-TER-20',
    idCategoria: 4,
    idMarca: 1, // Genérica
    idUnidad: 3,
    idSucursal: 1, // Casa Central
    nombre: 'Caño Termofusión 20mm x 4m Agua',
    precioUnidad: 8060,
    descripcion: 'Conducción de agua fría y caliente',
    activo: true
  },
  {
    id: 703,
    codigo: 'CAN-TER-25',
    idCategoria: 4,
    idMarca: 1, // Genérica
    idUnidad: 3,
    idSucursal: 1, // Casa Central
    nombre: 'Caño Termofusión 25mm x 4m Agua',
    precioUnidad: 11570,
    descripcion: 'Conducción de agua fría y caliente',
    activo: true
  },
  {
    id: 704,
    codigo: 'COD-PVC-110',
    idCategoria: 4,
    idMarca: 1, // Genérica
    idUnidad: 1,
    idSucursal: 2, // Sucursal Sur
    nombre: 'Codo PVC 110mm x 90° con Acometida',
    precioUnidad: 4420,
    descripcion: 'Accesorio desagüe cloacal',
    activo: true
  },
  {
    id: 705,
    codigo: 'INO-FER-BAR',
    idCategoria: 4,
    idMarca: 8, // Ferrum
    idUnidad: 1,
    idSucursal: 1, // Casa Central
    nombre: 'Juego Inodoro y Depósito Ferrum Bari',
    precioUnidad: 240500,
    descripcion: 'Loza sanitaria completa',
    activo: true
  },
  {
    id: 706,
    codigo: 'BID-FER-BAR',
    idCategoria: 4,
    idMarca: 8, // Ferrum
    idUnidad: 1,
    idSucursal: 1, // Casa Central
    nombre: 'Bidet Ferrum Bari 1 Agujero',
    precioUnidad: 119600,
    descripcion: 'Loza sanitaria bidet',
    activo: true
  },
  {
    id: 707,
    codigo: 'GRI-MON-FV',
    idCategoria: 4,
    idMarca: 9, // FV
    idUnidad: 1,
    idSucursal: 2, // Sucursal Sur
    nombre: 'Grifería Monocomando Lavatorio FV',
    precioUnidad: 83200,
    descripcion: 'Grifería cromada para baño',
    activo: true
  },
  {
    id: 708,
    codigo: 'SIF-DOB-COC',
    idCategoria: 4,
    idMarca: 1, // Genérica
    idUnidad: 1,
    idSucursal: 2, // Sucursal Sur
    nombre: 'Sifón Doble para Pileta de Cocina',
    precioUnidad: 11310,
    descripcion: 'Desagüe flexible para bacha doble',
    activo: false // Inactivo de prueba
  },
  {
    id: 709,
    codigo: 'VAL-DES-INO',
    idCategoria: 4,
    idMarca: 9, // FV
    idUnidad: 1,
    idSucursal: 1, // Casa Central
    nombre: 'Válvula de Descarga para Inodoro FV',
    precioUnidad: 53300,
    descripcion: 'Mecanismo de descarga',
    activo: true
  },
  {
    id: 710,
    codigo: 'TAN-AGU-1000',
    idCategoria: 4,
    idMarca: 10, // Eternit
    idUnidad: 1,
    idSucursal: 3, // Depósito Norte
    nombre: 'Tanque de Agua 1000L Tricapa Eternit',
    precioUnidad: 253500,
    descripcion: 'Tanque reserva domiciliaria',
    activo: true
  }
];

export const cajas = [
  // Cajas de Casa Central (ID_Sucursal: 1)
  { id_cajas: 1, id_sucursales: 1, estado: 'Activo' },
  { id_cajas: 2, id_sucursales: 1, estado: 'Activo' },
  { id_cajas: 3, id_sucursales: 1, estado: 'Inactivo' },

  // Cajas de Sucursal Sur (ID_Sucursal: 2)
  { id_cajas: 4, id_sucursales: 2, estado: 'Activo' },
  { id_cajas: 5, id_sucursales: 2, estado: 'Activo' },
  { id_cajas: 6, id_sucursales: 2, estado: 'Inactivo' },

  // Cajas de Depósito Norte (ID_Sucursal: 3)
  { id_cajas: 7, id_sucursales: 3, estado: 'Activo' },
  { id_cajas: 8, id_sucursales: 3, estado: 'Inactivo' },
  { id_cajas: 9, id_sucursales: 3, estado: 'Inactivo' }
];

export const compras = [
  {
    id_compras: 1,
    id_cajas: 1,           // Caja 1 (Casa Central)
    id_sucursal: 1,        // Casa Central
    numeroPedido: '570',
    numeroProveedor: '003',
    proveedor: 'Áridos Norte S.A',
    telefono: '+54 388 754-7777',
    destino: 'Casa Central',
    estado: 'En espera',
    fecha_compra: '2026-11-05 10:00:00',
    monto_compra: 39000.00, // 5 x 7800
    detalles: [
      { codigo: 'ARE-25-FAR', producto: 'Arena fina en bolsa x 25kg Fara', precioUnidad: 7800, categoria: 'Áridos', cantidad: 5 }
    ]
  },
  {
    id_compras: 2,
    id_cajas: 1,
    id_sucursal: 1,
    numeroPedido: '569',
    numeroProveedor: '007',
    proveedor: 'HierroNor',
    telefono: '+54 388 385-2932',
    destino: 'Casa Central',
    estado: 'Entregado',
    fecha_compra: '2026-11-04 11:30:00',
    monto_compra: 110500.00, // 10 x 11050
    detalles: [
      { codigo: 'HIE-RET-8', producto: 'Hierro Retorcido 8mm x 12m', precioUnidad: 11050, categoria: 'Hierros y Aceros', cantidad: 10 }
    ]
  },
  {
    id_compras: 3,
    id_cajas: 7,           // Caja 7 (Depósito Norte)
    id_sucursal: 3,        // Depósito Norte
    numeroPedido: '568',
    numeroProveedor: '002',
    proveedor: 'Bulonera City',
    telefono: '+54 388 235-5632',
    destino: 'Depósito Norte',
    estado: 'Entregado',
    fecha_compra: '2026-11-02 09:15:00',
    monto_compra: 45000.00, // Monto genérico estimado / calculado
    detalles: []
  },
  {
    id_compras: 4,
    id_cajas: 2,
    id_sucursal: 1,
    numeroPedido: '567',
    numeroProveedor: '012',
    proveedor: 'Cerámicos Del Norte',
    telefono: '+54 387 421-9988',
    destino: 'Casa Central',
    estado: 'En espera',
    fecha_compra: '2026-11-06 15:45:00',
    monto_compra: 555750.00, // 15 x 37050
    detalles: [
      { codigo: 'CER-6060-MB', producto: 'Porcellanato 60x60 Mármol Blanco', precioUnidad: 37050, categoria: 'Cerámicos y Revestimientos', cantidad: 15 }
    ]
  },
  {
    id_compras: 5,
    id_cajas: 4,           // Caja 4 (Sucursal Sur)
    id_sucursal: 2,        // Sucursal Sur
    numeroPedido: '566',
    numeroProveedor: '005',
    proveedor: 'Cementos del Valle',
    telefono: '+54 388 456-1122',
    destino: 'Sucursal Sur',
    estado: 'Entregado',
    fecha_compra: '2026-11-01 08:30:00',
    monto_compra: 92000.00,
    detalles: []
  },
  {
    id_compras: 6,
    id_cajas: 3,
    id_sucursal: 1,
    numeroPedido: '565',
    numeroProveedor: '008',
    proveedor: 'Pinturerías Integral',
    telefono: '+54 387 499-1020',
    destino: 'Casa Central',
    estado: 'En espera',
    fecha_compra: '2026-11-07 14:00:00',
    monto_compra: 64000.00,
    detalles: []
  },
  {
    id_compras: 7,
    id_cajas: 8,
    id_sucursal: 3,
    numeroPedido: '564',
    numeroProveedor: '003',
    proveedor: 'Áridos Norte S.A',
    telefono: '+54 388 754-7777',
    destino: 'Depósito Norte',
    estado: 'Entregado',
    fecha_compra: '2026-10-30 16:20:00',
    monto_compra: 120000.00,
    detalles: []
  },
  {
    id_compras: 8,
    id_cajas: 1,
    id_sucursal: 1,
    numeroPedido: '563',
    numeroProveedor: '004',
    proveedor: 'Sanitarios del Litoral',
    telefono: '+54 387 512-3344',
    destino: 'Casa Central',
    estado: 'En espera',
    fecha_compra: '2026-11-06 11:10:00',
    monto_compra: 78000.00,
    detalles: []
  },
  {
    id_compras: 9,
    id_cajas: 5,
    id_sucursal: 2,
    numeroPedido: '562',
    numeroProveedor: '007',
    proveedor: 'HierroNor',
    telefono: '+54 388 385-2932',
    destino: 'Sucursal Sur',
    estado: 'Entregado',
    fecha_compra: '2026-10-28 10:00:00',
    monto_compra: 210000.00,
    detalles: []
  },
  {
    id_compras: 10,
    id_cajas: 2,
    id_sucursal: 1,
    numeroPedido: '561',
    numeroProveedor: '009',
    proveedor: 'Distribuidora Fara',
    telefono: '+54 388 600-9988',
    destino: 'Casa Central',
    estado: 'En espera',
    fecha_compra: '2026-11-05 17:00:00',
    monto_compra: 54000.00,
    detalles: []
  },
  {
    id_compras: 11,
    id_cajas: 1,
    id_sucursal: 1,
    numeroPedido: '560',
    numeroProveedor: '002',
    proveedor: 'Bulonera City',
    telefono: '+54 388 235-5632',
    destino: 'Casa Central',
    estado: 'Entregado',
    fecha_compra: '2026-10-25 12:30:00',
    monto_compra: 33000.00,
    detalles: []
  },
  {
    id_compras: 12,
    id_cajas: 7,
    id_sucursal: 3,
    numeroPedido: '559',
    numeroProveedor: '012',
    proveedor: 'Cerámicos Del Norte',
    telefono: '+54 387 421-9988',
    destino: 'Depósito Norte',
    estado: 'En espera',
    fecha_compra: '2026-11-03 09:45:00',
    monto_compra: 185000.00,
    detalles: []
  },
  {
    id_compras: 13,
    id_cajas: 3,
    id_sucursal: 1,
    numeroPedido: '558',
    numeroProveedor: '005',
    proveedor: 'Cementos del Valle',
    telefono: '+54 388 456-1122',
    destino: 'Casa Central',
    estado: 'Entregado',
    fecha_compra: '2026-10-24 14:10:00',
    monto_compra: 95000.00,
    detalles: []
  },
  {
    id_compras: 14,
    id_cajas: 1,
    id_sucursal: 1,
    numeroPedido: '557',
    numeroProveedor: '003',
    proveedor: 'Áridos Norte S.A',
    telefono: '+54 388 754-7777',
    destino: 'Casa Central',
    estado: 'En espera',
    fecha_compra: '2026-11-04 15:00:00',
    monto_compra: 48000.00,
    detalles: []
  },
  {
    id_compras: 15,
    id_cajas: 4,
    id_sucursal: 2,
    numeroPedido: '556',
    numeroProveedor: '008',
    proveedor: 'Pinturerías Integral',
    telefono: '+54 387 499-1020',
    destino: 'Sucursal Sur',
    estado: 'Entregado',
    fecha_compra: '2026-10-20 11:00:00',
    monto_compra: 67000.00,
    detalles: []
  },
  {
    id_compras: 16,
    id_cajas: 2,
    id_sucursal: 1,
    numeroPedido: '555',
    numeroProveedor: '007',
    proveedor: 'HierroNor',
    telefono: '+54 388 385-2932',
    destino: 'Casa Central',
    estado: 'En espera',
    fecha_compra: '2026-11-02 16:30:00',
    monto_compra: 145000.00,
    detalles: []
  },
  {
    id_compras: 17,
    id_cajas: 1,
    id_sucursal: 1,
    numeroPedido: '554',
    numeroProveedor: '004',
    proveedor: 'Sanitarios del Litoral',
    telefono: '+54 387 512-3344',
    destino: 'Casa Central',
    estado: 'Entregado',
    fecha_compra: '2026-10-18 10:15:00',
    monto_compra: 83000.00,
    detalles: []
  },
  {
    id_compras: 18,
    id_cajas: 7,
    id_sucursal: 3,
    numeroPedido: '553',
    numeroProveedor: '002',
    proveedor: 'Bulonera City',
    telefono: '+54 388 235-5632',
    destino: 'Depósito Norte',
    estado: 'En espera',
    fecha_compra: '2026-11-01 13:20:00',
    monto_compra: 29000.00,
    detalles: []
  },
  {
    id_compras: 19,
    id_cajas: 3,
    id_sucursal: 1,
    numeroPedido: '552',
    numeroProveedor: '005',
    proveedor: 'Cementos del Valle',
    telefono: '+54 388 456-1122',
    destino: 'Casa Central',
    estado: 'Entregado',
    fecha_compra: '2026-10-15 09:00:00',
    monto_compra: 91000.00,
    detalles: []
  },
  {
    id_compras: 20,
    id_cajas: 2,
    id_sucursal: 1,
    numeroPedido: '551',
    numeroProveedor: '012',
    proveedor: 'Cerámicos Del Norte',
    telefono: '+54 387 421-9988',
    destino: 'Casa Central',
    estado: 'En espera',
    fecha_compra: '2026-10-31 15:10:00',
    monto_compra: 230000.00,
    detalles: []
  },
  {
    id_compras: 21,
    id_cajas: 5,
    id_sucursal: 2,
    numeroPedido: '550',
    numeroProveedor: '003',
    proveedor: 'Áridos Norte S.A',
    telefono: '+54 388 754-7777',
    destino: 'Sucursal Sur',
    estado: 'Entregado',
    fecha_compra: '2026-10-12 10:45:00',
    monto_compra: 75000.00,
    detalles: []
  },
  {
    id_compras: 22,
    id_cajas: 1,
    id_sucursal: 1,
    numeroPedido: '549',
    numeroProveedor: '007',
    proveedor: 'HierroNor',
    telefono: '+54 388 385-2932',
    destino: 'Casa Central',
    estado: 'En espera',
    fecha_compra: '2026-10-29 14:30:00',
    monto_compra: 160000.00,
    detalles: []
  },
  {
    id_compras: 23,
    id_cajas: 3,
    id_sucursal: 1,
    numeroPedido: '548',
    numeroProveedor: '008',
    proveedor: 'Pinturerías Integral',
    telefono: '+54 387 499-1020',
    destino: 'Casa Central',
    estado: 'Entregado',
    fecha_compra: '2026-10-10 16:00:00',
    monto_compra: 52000.00,
    detalles: []
  },
  {
    id_compras: 24,
    id_cajas: 7,
    id_sucursal: 3,
    numeroPedido: '547',
    numeroProveedor: '002',
    proveedor: 'Bulonera City',
    telefono: '+54 388 235-5632',
    destino: 'Depósito Norte',
    estado: 'En espera',
    fecha_compra: '2026-10-27 11:20:00',
    monto_compra: 41000.00,
    detalles: []
  },
  {
    id_compras: 25,
    id_cajas: 1,
    id_sucursal: 1,
    numeroPedido: '546',
    numeroProveedor: '004',
    proveedor: 'Sanitarios del Litoral',
    telefono: '+54 387 512-3344',
    destino: 'Casa Central',
    estado: 'Entregado',
    fecha_compra: '2026-10-05 09:30:00',
    monto_compra: 88000.00,
    detalles: []
  }
];

export const modulos = [
  { nombre: 'Empleados', detalle: 'Gestionar usuarios y permisos', icono: IconUsers, ruta: '/empleados' },
  { nombre: 'Compras', detalle: 'Gestión y seguimiento de pedidos a proveedores', icono: IconBox },
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
  { id: 10, dia: 'Días anteriores', icono: IconShoppingCart, color: 'bg-cyan-400', modulo: 'Ventas', hora: '18:50',
    texto: [{ t: 'Venta N.°1041 registrada por ' }, { t: 'Maita Alan', fuerte: true }, { t: ' por ' }, { t: '$15.300', fuerte: true }] },
  { id: 11, dia: 'Días anteriores', icono: IconCash, color: 'bg-yellow-400', modulo: 'Caja', hora: '20:00',
    texto: [{ t: 'Apertura de Caja N.°1 realizada por ' }, { t: 'Giménez Valeria', fuerte: true }] },
  { id: 12, dia: 'Días anteriores', icono: IconTruck, color: 'bg-navy', modulo: 'Proveedores', hora: '11:20',
    texto: [{ t: 'Modificación de datos del proveedor ' }, { t: 'Ceramica Norte S.A', fuerte: true }] },
  { id: 13, dia: 'Días anteriores', icono: IconBuildingWarehouse, color: 'bg-emerald-800', modulo: 'Stock', hora: '16:40',
    texto: [{ t: 'Ajuste de inventario en ' }, { t: 'Sucursal Sur', fuerte: true }, { t: ': Ladrillos huecos -10 un.' }] },
  { id: 14, dia: 'Días anteriores', icono: IconUserCheck, color: 'bg-sidebar', modulo: 'Empleados', hora: '09:30',
    texto: [{ t: 'Se registró un nuevo usuario: ' }, { t: 'Gómez Martín', fuerte: true }] },
  { id: 15, dia: 'Días anteriores', icono: IconFileText, color: 'bg-sidebar', modulo: 'Facturación', hora: '17:15',
    texto: [{ t: 'Nota de crédito emitida a favor de ' }, { t: 'Constructora del NOA', fuerte: true }] },
  { id: 16, dia: 'Días anteriores', icono: IconShoppingCart, color: 'bg-cyan-400', modulo: 'Ventas', hora: '14:05',
    texto: [{ t: 'Venta N.°1040 registrada por ' }, { t: 'Santiago Alvarez', fuerte: true }, { t: ' por ' }, { t: '$92.000', fuerte: true }] },
  { id: 17, dia: 'Días anteriores', icono: IconCash, color: 'bg-yellow-400', modulo: 'Caja', hora: '13:50',
    texto: [{ t: 'Retiro de efectivo de caja por ' }, { t: '$30.000', fuerte: true }, { t: ' (Pago de servicios)' }] },
  { id: 18, dia: 'Días anteriores', icono: IconTruck, color: 'bg-navy', modulo: 'Proveedores', hora: '10:00',
    texto: [{ t: 'Nuevo proveedor vinculado: ' }, { t: 'Hierros del NOA S.R.L', fuerte: true }] },
  { id: 19, dia: 'Días anteriores', icono: IconBuildingWarehouse, color: 'bg-emerald-800', modulo: 'Stock', hora: '09:10',
    texto: [{ t: 'Ingreso de mercadería: ' }, { t: 'Hierro retorcido 8mm x100', verde: true }] },
  { id: 20, dia: 'Días anteriores', icono: IconUserX, color: 'bg-red-600', modulo: 'Empleados', hora: '18:25',
    texto: [{ t: 'Se suspendió temporalmente al empleado: ' }, { t: 'Benítez Sofía', fuerte: true }] },
  { id: 21, dia: 'Días anteriores', icono: IconFileText, color: 'bg-sidebar', modulo: 'Facturación', hora: '16:00',
    texto: [{ t: 'Factura B-0001-00012450 anulada por sistema.' }] },
  { id: 22, dia: 'Días anteriores', icono: IconShoppingCart, color: 'bg-cyan-400', modulo: 'Ventas', hora: '12:15',
    texto: [{ t: 'Venta N.°1039 registrada por ' }, { t: 'Maita Alan', fuerte: true }, { t: ' por ' }, { t: '$7.800', fuerte: true }] },
  { id: 23, dia: 'Días anteriores', icono: IconCash, color: 'bg-yellow-400', modulo: 'Caja', hora: '21:00',
    texto: [{ t: 'Arqueo de caja finalizado sin discrepancias por ' }, { t: 'Gómez Martín', fuerte: true }] },
  { id: 24, dia: 'Días anteriores', icono: IconTruck, color: 'bg-navy', modulo: 'Proveedores', hora: '15:45',
    texto: [{ t: 'Actualización de CUIT del proveedor ' }, { t: 'Cementos Salta S.A', fuerte: true }] },
  { id: 25, dia: 'Días anteriores', icono: IconBuildingWarehouse, color: 'bg-emerald-800', modulo: 'Stock', hora: '11:30',
    texto: [{ t: 'Transferencia de stock entre depósitos: ' }, { t: 'Casa Central -> Sucursal Sur', fuerte: true }] },
  { id: 26, dia: 'Días anteriores', icono: IconUserCheck, color: 'bg-sidebar', modulo: 'Empleados', hora: '08:45',
    texto: [{ t: 'Actualización de datos de contacto de ' }, { t: 'Torres Lucía', fuerte: true }] },
  { id: 27, dia: 'Días anteriores', icono: IconFileText, color: 'bg-sidebar', modulo: 'Facturación', hora: '14:20',
    texto: [{ t: 'Valeria Giménez generó la Factura ' }, { t: 'A-0001-00045891', fuerte: true }, { t: ' por ' }, { t: '$34.000', verde: true }] },
  { id: 28, dia: 'Días anteriores', icono: IconShoppingCart, color: 'bg-cyan-400', modulo: 'Ventas', hora: '17:05',
    texto: [{ t: 'Venta N.°1038 registrada por ' }, { t: 'Santiago Alvarez', fuerte: true }, { t: ' por ' }, { t: '$115.000', fuerte: true }] },
  { id: 29, dia: 'Días anteriores', icono: IconCash, color: 'bg-yellow-400', modulo: 'Caja', hora: '09:00',
    texto: [{ t: 'Cambio de fondo fijo en Caja N.°1' }] },
  { id: 30, dia: 'Días anteriores', icono: IconTruck, color: 'bg-navy', modulo: 'Proveedores', hora: '10:15',
    texto: [{ t: 'Baja lógica del proveedor inactivo ' }, { t: 'Pinturas del Norte S.A', fuerte: true }] }
];
