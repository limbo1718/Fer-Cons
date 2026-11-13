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

// 5. EMPRESAS (Datos fiscales aquí)
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

// 6. SUCURSALES (Solo datos de la sucursal y FK de empresa/ubicación)
export const sucursales = [
  { ID_Sucursales: 1, ID_Empresas: 1, ID_Ubicaciones: 1, Nombre: 'Casa Central', Hora_Ap: '08:00:00', Hora_C: '18:00:00', Contacto: '3874000001', Email_Suc: 'casacentral@fercons.com', activo: true, detalleBaja: '' },
  { ID_Sucursales: 2, ID_Empresas: 1, ID_Ubicaciones: 2, Nombre: 'Sucursal Sur', Hora_Ap: '08:30:00', Hora_C: '18:30:00', Contacto: '3874000002', Email_Suc: 'sucursalsur@fercons.com', activo: true, detalleBaja: '' },
  { ID_Sucursales: 3, ID_Empresas: 1, ID_Ubicaciones: 3, Nombre: 'Depósito Norte', Hora_Ap: '07:00:00', Hora_C: '17:00:00', Contacto: '3874000003', Email_Suc: 'depositonorte@fercons.com', activo: true, detalleBaja: '' },
  { ID_Sucursales: 4, ID_Empresas: 1, ID_Ubicaciones: 4, Nombre: 'Sucursal Chile', Hora_Ap: '08:00:00', Hora_C: '18:00:00', Contacto: '3874000004', Email_Suc: 'chile@fercons.com', activo: true, detalleBaja: '' },
  { ID_Sucursales: 5, ID_Empresas: 1, ID_Ubicaciones: 5, Nombre: 'Sucursal Intersatambres', Hora_Ap: '08:00:00', Hora_C: '17:30:00', Contacto: '3874000005', Email_Suc: 'intersatambres@fercons.com', activo: false, detalleBaja: 'Cerrada temporalmente por remodelación de depósito e instalaciones eléctricas.' },
  { ID_Sucursales: 6, ID_Empresas: 1, ID_Ubicaciones: 6, Nombre: 'Sucursal Tres Cerritos', Hora_Ap: '08:30:00', Hora_C: '19:00:00', Contacto: '3874000006', Email_Suc: 'trescerritos@fercons.com', activo: true, detalleBaja: '' },
  { ID_Sucursales: 7, ID_Empresas: 1, ID_Ubicaciones: 7, Nombre: 'Sucursal Macrocentro', Hora_Ap: '08:00:00', Hora_C: '18:00:00', Contacto: '3874000007', Email_Suc: 'macrocentro@fercons.com', activo: true, detalleBaja: '' },
  { ID_Sucursales: 8, ID_Empresas: 1, ID_Ubicaciones: 8, Nombre: 'Sucursal San Lorenzo', Hora_Ap: '09:00:00', Hora_C: '17:00:00', Contacto: '3874000008', Email_Suc: 'sanlorenzo@fercons.com', activo: true, detalleBaja: '' },
  { ID_Sucursales: 9, ID_Empresas: 1, ID_Ubicaciones: 9, Nombre: 'Depósito San Antonio', Hora_Ap: '07:30:00', Hora_C: '16:30:00', Contacto: '3874000009', Email_Suc: 'sanantonio@fercons.com', activo: false, detalleBaja: 'Unificación de stock en el Depósito Norte.' },
  { ID_Sucursales: 10, ID_Empresas: 1, ID_Ubicaciones: 10, Nombre: 'Sucursal Grand Bourg', Hora_Ap: '08:00:00', Hora_C: '18:00:00', Contacto: '3874000010', Email_Suc: 'grandbourg@fercons.com', activo: true, detalleBaja: '' },
  { ID_Sucursales: 11, ID_Empresas: 1, ID_Ubicaciones: 11, Nombre: 'Sucursal Centro Peatonal', Hora_Ap: '08:30:00', Hora_C: '19:30:00', Contacto: '3874000011', Email_Suc: 'peatonal@fercons.com', activo: true, detalleBaja: '' },
  { ID_Sucursales: 12, ID_Empresas: 1, ID_Ubicaciones: 12, Nombre: 'Sucursal Vaqueros', Hora_Ap: '08:00:00', Hora_C: '17:00:00', Contacto: '3874000012', Email_Suc: 'vaqueros@fercons.com', activo: true, detalleBaja: '' },
  { ID_Sucursales: 13, ID_Empresas: 1, ID_Ubicaciones: 13, Nombre: 'Depósito Aeropuerto', Hora_Ap: '07:00:00', Hora_C: '16:00:00', Contacto: '3874000013', Email_Suc: 'aeropuerto@fercons.com', activo: true, detalleBaja: '' }
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
  { ID_Proveedores: 1, CUIT: '30-7623345-7', Nombre: 'Ceramica Norte', Razon_Social: 'Ceramica Norte S.A', Contacto: '+54 387 435-3422', Email_Prov: 'contacto@ceramicanorte.com', Estado_Prov: true },
  { ID_Proveedores: 2, CUIT: '30-7346345-7', Nombre: 'Hierros del NOA', Razon_Social: 'Hierros del NOA S.R.L', Contacto: '+54 387 345-3422', Email_Prov: 'ventas@hierrosdelnoa.com.ar', Estado_Prov: false },
  { ID_Proveedores: 3, CUIT: '30-734575-9', Nombre: 'Cementos Salta', Razon_Social: 'Cementos Salta S.A', Contacto: '+54 388 465-7457', Email_Prov: 'info@cementossalta.com', Estado_Prov: true },
  { ID_Proveedores: 4, CUIT: '30-6812345-8', Nombre: 'Distribuidora Cuyo', Razon_Social: 'Distribuidora Cuyo S.R.L', Contacto: '+54 387 421-8899', Email_Prov: 'pedidos@distribuidoracuyo.com', Estado_Prov: true },
  { ID_Proveedores: 5, CUIT: '30-7112233-4', Nombre: 'Pinturas del Norte', Razon_Social: 'Pinturas del Norte S.A', Contacto: '+54 387 498-1122', Email_Prov: 'administracion@pinturasdelnorte.com', Estado_Prov: false },
  { ID_Proveedores: 6, CUIT: '30-7145678-9', Nombre: 'Bulonera Salta', Razon_Social: 'Bulonera Salta S.R.L', Contacto: '+54 387 423-5566', Email_Prov: 'ventas@bulonerasalta.com.ar', Estado_Prov: true },
  { ID_Proveedores: 7, CUIT: '30-7234112-3', Nombre: 'Sanitarios del Valle', Razon_Social: 'Sanitarios del Valle S.A', Contacto: '+54 388 471-9988', Email_Prov: 'info@sanitariosdelvalle.com', Estado_Prov: true },
  { ID_Proveedores: 8, CUIT: '30-6987412-5', Nombre: 'Electricidad Andina', Razon_Social: 'Electricidad Andina S.R.L', Contacto: '+54 387 409-3322', Email_Prov: 'contacto@electricidadandina.com.ar', Estado_Prov: false },
  { ID_Proveedores: 9, CUIT: '30-7055441-2', Nombre: 'Maderas del Norte', Razon_Social: 'Maderas del Norte S.A', Contacto: '+54 387 455-7890', Email_Prov: 'pedidos@maderasdelnorte.com', Estado_Prov: true },
  { ID_Proveedores: 10, CUIT: '30-7412389-1', Nombre: 'Ferretería Industrial Güemes', Razon_Social: 'Ferretería Güemes S.R.L', Contacto: '+54 388 488-2233', Email_Prov: 'administracion@ferreteria-guemes.com.ar', Estado_Prov: true },
  { ID_Proveedores: 11, CUIT: '30-7198822-4', Nombre: 'Áridos del Sur', Razon_Social: 'Áridos del Sur S.A', Contacto: '+54 387 444-1122', Email_Prov: 'ventas@aridosdelsur.com', Estado_Prov: true },
  { ID_Proveedores: 12, CUIT: '30-7331199-8', Nombre: 'Yesos y Cielorrasos NOA', Razon_Social: 'Yesos NOA S.R.L', Contacto: '+54 387 477-3344', Email_Prov: 'contacto@yesosnoa.com.ar', Estado_Prov: true },
  { ID_Proveedores: 13, CUIT: '30-7044556-3', Nombre: 'Herramientas Profesionales Salta', Razon_Social: 'Herramientas Salta S.A', Contacto: '+54 388 422-9900', Email_Prov: 'info@herramientassalta.com', Estado_Prov: false },
  { ID_Proveedores: 14, CUIT: '30-7266778-1', Nombre: 'Aberturas de Aluminio Norte', Razon_Social: 'Aluminio Norte S.R.L', Contacto: '+54 387 466-5533', Email_Prov: 'pedidos@aluminionorte.com.ar', Estado_Prov: true },
  { ID_Proveedores: 15, CUIT: '30-7155443-9', Nombre: 'Caños y Conexiones del Valle', Razon_Social: 'Caños Valle S.A', Contacto: '+54 387 411-2244', Email_Prov: 'ventas@canosvalle.com', Estado_Prov: true },
  { ID_Proveedores: 16, CUIT: '30-6922334-5', Nombre: 'Impermeabilizantes Cuyo', Razon_Social: 'Impermeabilizantes S.R.L', Contacto: '+54 388 433-7788', Email_Prov: 'contacto@impercuyo.com', Estado_Prov: true },
  { ID_Proveedores: 17, CUIT: '30-7488991-2', Nombre: 'Mallas y Metales Güemes', Razon_Social: 'Metales Güemes S.A', Contacto: '+54 387 488-6655', Email_Prov: 'info@metalesguemes.com.ar', Estado_Prov: false },
  { ID_Proveedores: 18, CUIT: '30-7211223-6', Nombre: 'Ladrillos Cerámicos San Cayetano', Razon_Social: 'Cerámica San Cayetano S.R.L', Contacto: '+54 387 499-4411', Email_Prov: 'pedidos@sancayetano.com', Estado_Prov: true },
  { ID_Proveedores: 19, CUIT: '30-7399884-7', Nombre: 'Pinturería Industrial Centro', Razon_Social: 'Pinturas Centro S.A', Contacto: '+54 388 455-1199', Email_Prov: 'ventas@pinturascentro.com.ar', Estado_Prov: true },
  { ID_Proveedores: 20, CUIT: '30-7133445-0', Nombre: 'Techitos y Chapas del Norte', Razon_Social: 'Chapas Norte S.R.L', Contacto: '+54 387 422-7766', Email_Prov: 'contacto@chapasnorte.com', Estado_Prov: true },
  { ID_Proveedores: 21, CUIT: '30-7088776-4', Nombre: 'Adhesivos y Pegamentos Salta', Razon_Social: 'Pegamentos Salta S.A', Contacto: '+54 387 433-8899', Email_Prov: 'info@pegamentosalta.com', Estado_Prov: true },
  { ID_Proveedores: 22, CUIT: '30-7455667-8', Nombre: 'Ferretería Mayorista Andina', Razon_Social: 'Andina Mayorista S.R.L', Contacto: '+54 388 411-3322', Email_Prov: 'ventas@andinamayorista.com.ar', Estado_Prov: false },
  { ID_Proveedores: 23, CUIT: '30-7244332-1', Nombre: 'Construcciones Secundarias SRL', Razon_Social: 'Secundarias S.R.L', Contacto: '+54 387 466-9900', Email_Prov: 'pedidos@secundarias.com', Estado_Prov: true },
  { ID_Proveedores: 24, CUIT: '30-7311225-9', Nombre: 'Equipamientos para Obra', Razon_Social: 'Equipamientos Obra S.A', Contacto: '+54 387 477-1133', Email_Prov: 'contacto@equipamientosobra.com', Estado_Prov: true },
  { ID_Proveedores: 25, CUIT: '30-6899443-2', Nombre: 'Maderas y Derivados del Litoral', Razon_Social: 'Derivados Litoral S.R.L', Contacto: '+54 388 499-2244', Email_Prov: 'info@litoralmaderas.com.ar', Estado_Prov: true },
  { ID_Proveedores: 26, CUIT: '30-7166554-3', Nombre: 'Cerrajería y Herrajes Salta', Razon_Social: 'Herrajes Salta S.A', Contacto: '+54 387 444-5566', Email_Prov: 'ventas@herrajessalta.com', Estado_Prov: true },
  { ID_Proveedores: 27, CUIT: '30-7299881-6', Nombre: 'Grifería y Sanitarios del Norte', Razon_Social: 'Sanitarios Norte S.R.L', Contacto: '+54 387 411-7788', Email_Prov: 'contacto@sanitariosnorte.com.ar', Estado_Prov: false },
  { ID_Proveedores: 28, CUIT: '30-7377665-2', Nombre: 'Cables y Materiales Eléctricos', Razon_Social: 'Materiales Eléctricos S.A', Contacto: '+54 388 422-3344', Email_Prov: 'pedidos@matelectricos.com', Estado_Prov: true },
  { ID_Proveedores: 29, CUIT: '30-7422119-5', Nombre: 'Placas de Yeso Durlock Salta', Razon_Social: 'Durlock Salta S.R.L', Contacto: '+54 387 455-6677', Email_Prov: 'info@durlocksalta.com.ar', Estado_Prov: true },
  { ID_Proveedores: 30, CUIT: '30-7033221-8', Nombre: 'Estructuras Metálicas del NOA', Razon_Social: 'Estructuras NOA S.A', Contacto: '+54 387 488-9900', Email_Prov: 'ventas@estructurasnoa.com', Estado_Prov: true },
  { ID_Proveedores: 31, CUIT: '30-7188774-1', Nombre: 'Áridos y Cementos Güemes', Razon_Social: 'Güemes Materiales S.R.L', Contacto: '+54 388 433-2211', Email_Prov: 'contacto@guemesmateriales.com.ar', Estado_Prov: true },
  { ID_Proveedores: 32, CUIT: '30-7255446-7', Nombre: 'Pisos y Revestimientos Cerámicos', Razon_Social: 'Pisos Cerámicos S.A', Contacto: '+54 387 466-1122', Email_Prov: 'pedidos@pisosceramicos.com', Estado_Prov: false },
  { ID_Proveedores: 33, CUIT: '30-7322114-9', Nombre: 'Aislaciones Térmicas y Acústicas', Razon_Social: 'Aislaciones Salta S.R.L', Contacto: '+54 387 499-5566', Email_Prov: 'info@aislacionsalta.com.ar', Estado_Prov: true },
  { ID_Proveedores: 34, CUIT: '30-7411993-2', Nombre: 'Herramientas Eléctricas del Valle', Razon_Social: 'Herramientas Valle S.A', Contacto: '+54 388 477-8899', Email_Prov: 'ventas@herramientasvalle.com', Estado_Prov: true },
  { ID_Proveedores: 35, CUIT: '30-7099221-5', Nombre: 'Distribuidora General Ferretera', Razon_Social: 'Distri Ferretera S.R.L', Contacto: '+54 387 422-1144', Email_Prov: 'contacto@distriferretera.com.ar', Estado_Prov: true }
];

export const proveedores_x_sucursales = [
  { ID_Proveedores_x_Sucursales: 1, ID_Proveedores: 1, ID_Sucursales: 1, Estado: true },
  { ID_Proveedores_x_Sucursales: 2, ID_Proveedores: 2, ID_Sucursales: 1, Estado: true },
  { ID_Proveedores_x_Sucursales: 3, ID_Proveedores: 3, ID_Sucursales: 1, Estado: true },
  { ID_Proveedores_x_Sucursales: 4, ID_Proveedores: 4, ID_Sucursales: 2, Estado: true },
  { ID_Proveedores_x_Sucursales: 5, ID_Proveedores: 5, ID_Sucursales: 3, Estado: true },
  { ID_Proveedores_x_Sucursales: 6, ID_Proveedores: 6, ID_Sucursales: 2, Estado: true },
  { ID_Proveedores_x_Sucursales: 7, ID_Proveedores: 7, ID_Sucursales: 1, Estado: true },
  { ID_Proveedores_x_Sucursales: 8, ID_Proveedores: 8, ID_Sucursales: 3, Estado: true },
  { ID_Proveedores_x_Sucursales: 9, ID_Proveedores: 9, ID_Sucursales: 2, Estado: true },
  { ID_Proveedores_x_Sucursales: 10, ID_Proveedores: 10, ID_Sucursales: 1, Estado: true },
  { ID_Proveedores_x_Sucursales: 11, ID_Proveedores: 11, ID_Sucursales: 2, Estado: true },
  { ID_Proveedores_x_Sucursales: 12, ID_Proveedores: 12, ID_Sucursales: 3, Estado: true },
  { ID_Proveedores_x_Sucursales: 13, ID_Proveedores: 13, ID_Sucursales: 1, Estado: true },
  { ID_Proveedores_x_Sucursales: 14, ID_Proveedores: 14, ID_Sucursales: 2, Estado: true },
  { ID_Proveedores_x_Sucursales: 15, ID_Proveedores: 15, ID_Sucursales: 3, Estado: true },
  { ID_Proveedores_x_Sucursales: 16, ID_Proveedores: 16, ID_Sucursales: 1, Estado: true },
  { ID_Proveedores_x_Sucursales: 17, ID_Proveedores: 17, ID_Sucursales: 2, Estado: true },
  { ID_Proveedores_x_Sucursales: 18, ID_Proveedores: 18, ID_Sucursales: 1, Estado: true },
  { ID_Proveedores_x_Sucursales: 19, ID_Proveedores: 19, ID_Sucursales: 3, Estado: true },
  { ID_Proveedores_x_Sucursales: 20, ID_Proveedores: 20, ID_Sucursales: 2, Estado: true },
  { ID_Proveedores_x_Sucursales: 21, ID_Proveedores: 21, ID_Sucursales: 1, Estado: true },
  { ID_Proveedores_x_Sucursales: 22, ID_Proveedores: 22, ID_Sucursales: 3, Estado: true },
  { ID_Proveedores_x_Sucursales: 23, ID_Proveedores: 23, ID_Sucursales: 2, Estado: true },
  { ID_Proveedores_x_Sucursales: 24, ID_Proveedores: 24, ID_Sucursales: 1, Estado: true },
  { ID_Proveedores_x_Sucursales: 25, ID_Proveedores: 25, ID_Sucursales: 3, Estado: true },
  { ID_Proveedores_x_Sucursales: 26, ID_Proveedores: 26, ID_Sucursales: 1, Estado: true },
  { ID_Proveedores_x_Sucursales: 27, ID_Proveedores: 27, ID_Sucursales: 2, Estado: true },
  { ID_Proveedores_x_Sucursales: 28, ID_Proveedores: 28, ID_Sucursales: 3, Estado: true },
  { ID_Proveedores_x_Sucursales: 29, ID_Proveedores: 29, ID_Sucursales: 1, Estado: true },
  { ID_Proveedores_x_Sucursales: 30, ID_Proveedores: 30, ID_Sucursales: 2, Estado: true },
  { ID_Proveedores_x_Sucursales: 31, ID_Proveedores: 31, ID_Sucursales: 3, Estado: true },
  { ID_Proveedores_x_Sucursales: 32, ID_Proveedores: 32, ID_Sucursales: 1, Estado: true },
  { ID_Proveedores_x_Sucursales: 33, ID_Proveedores: 33, ID_Sucursales: 2, Estado: true },
  { ID_Proveedores_x_Sucursales: 34, ID_Proveedores: 34, ID_Sucursales: 3, Estado: true },
  { ID_Proveedores_x_Sucursales: 35, ID_Proveedores: 35, ID_Sucursales: 1, Estado: true }
];

// ==========================================
// 1. CATEGORÍAS
// ==========================================
export const categorias = [
    { ID_Categoria: 1, Categorias: 'Cerámicos y Revestimientos' },
    { ID_Categoria: 2, Categorias: 'Hierros y Aceros' },
    { ID_Categoria: 3, Categorias: 'Cementos, Cales y Áridos' },
    { ID_Categoria: 4, Categorias: 'Sanitarios y Plomería' }
];

// ==========================================
// 2. MARCAS
// ==========================================
export const marcas = [
    { ID_Marca: 1, Marcas: 'Genérica' },
    { ID_Marca: 2, Marcas: 'Cortines' },
    { ID_Marca: 3, Marcas: 'Weber' },
    { ID_Marca: 4, Marcas: 'Holcim' },
    { ID_Marca: 5, Marcas: 'Andina' },
    { ID_Marca: 6, Marcas: 'Cacique' },
    { ID_Marca: 7, Marcas: 'Sika' },
    { ID_Marca: 8, Marcas: 'Ferrum' },
    { ID_Marca: 9, Marcas: 'FV' },
    { ID_Marca: 10, Marcas: 'Eternit' }
];

// ==========================================
// 3. UNIDADES
// ==========================================
export const unidades = [
    { ID_Unidad: 1, Unidades: 'Unidad' },
    { ID_Unidad: 2, Unidades: 'Bolsa' },
    { ID_Unidad: 3, Unidades: 'Metro / Barra' },
    { ID_Unidad: 4, Unidades: 'm²' },
    { ID_Unidad: 5, Unidades: 'Bolsón / m³' }
];

export const productos = [
  // --- Categoría 1: Cerámicos y Revestimientos ---
  { ID_Productos: 101, Codigo: 'CER-6060-MB', ID_Categoria: 1, ID_Marca: 1, ID_Unidad: 4, Nombre: 'Porcellanato 60x60 Mármol Blanco', Precio_Unidad: 37050, Descripcion: 'Porcellanato brillante de alto tránsito' },
  { ID_Productos: 102, Codigo: 'CER-4545-COR', ID_Categoria: 1, ID_Marca: 2, ID_Unidad: 4, Nombre: 'Cerámica 45x45 Cortines Hueso', Precio_Unidad: 18460, Descripcion: 'Cerámica esmaltada para pisos interiores' },
  { ID_Productos: 103, Codigo: 'REV-3060-GRIS', ID_Categoria: 1, ID_Marca: 1, ID_Unidad: 4, Nombre: 'Revestimiento Pared 30x60 Gris', Precio_Unidad: 24570, Descripcion: 'Cerámica texturada para paredes' },
  { ID_Productos: 104, Codigo: 'POR-20120-MAD', ID_Categoria: 1, ID_Marca: 1, ID_Unidad: 4, Nombre: 'Porcellanato 20x120 Símil Madera', Precio_Unidad: 41600, Descripcion: 'Placa símil madera rectificada' },
  { ID_Productos: 105, Codigo: 'ZOC-1045', ID_Categoria: 1, ID_Marca: 1, ID_Unidad: 1, Nombre: 'Zócalo Cerámico 10x45', Precio_Unidad: 4030, Descripcion: 'Zócalo coordinado' },
  { ID_Productos: 106, Codigo: 'PEG-WEB-25', ID_Categoria: 1, ID_Marca: 3, ID_Unidad: 2, Nombre: 'Pegamento Weber Porcellanato 25kg', Precio_Unidad: 16250, Descripcion: 'Adhesivo impermeable flexible' },
  { ID_Productos: 107, Codigo: 'PAS-IMP-1KG', ID_Categoria: 1, ID_Marca: 1, ID_Unidad: 2, Nombre: 'Pastina Impermeable 1kg Blanco', Precio_Unidad: 3640, Descripcion: 'Pastina antihongo' },
  { ID_Productos: 108, Codigo: 'LIS-ALU-25', ID_Categoria: 1, ID_Marca: 1, ID_Unidad: 1, Nombre: 'Listón Decorativo Aluminio 2.5m', Precio_Unidad: 11570, Descripcion: 'Perfil terminación canto' },
  { ID_Productos: 109, Codigo: 'MOS-VEN-3030', ID_Categoria: 1, ID_Marca: 1, ID_Unidad: 4, Nombre: 'Mosaico Veneciano Malla 30x30', Precio_Unidad: 12350, Descripcion: 'Venecitas para piscinas y baños' },
  { ID_Productos: 110, Codigo: 'GUA-CUR-10', ID_Categoria: 1, ID_Marca: 1, ID_Unidad: 1, Nombre: 'Guardacanto Curvo Aluminio 10mm', Precio_Unidad: 9620, Descripcion: 'Protector de esquinas' },

  // --- Categoría 2: Hierros y Aceros ---
  { ID_Productos: 201, Codigo: 'HIE-RET-6', ID_Categoria: 2, ID_Marca: 1, ID_Unidad: 3, Nombre: 'Hierro Retorcido 6mm x 12m', Precio_Unidad: 7020, Descripcion: 'Hierro ADN retorcido para construcción' },
  { ID_Productos: 202, Codigo: 'HIE-RET-8', ID_Categoria: 2, ID_Marca: 1, ID_Unidad: 3, Nombre: 'Hierro Retorcido 8mm x 12m', Precio_Unidad: 11050, Descripcion: 'Hierro ADN retorcido para construcción' },
  { ID_Productos: 203, Codigo: 'HIE-RET-10', ID_Categoria: 2, ID_Marca: 1, ID_Unidad: 3, Nombre: 'Hierro Retorcido 10mm x 12m', Precio_Unidad: 17160, Descripcion: 'Hierro ADN retorcido para construcción' },
  { ID_Productos: 204, Codigo: 'HIE-RET-12', ID_Categoria: 2, ID_Marca: 1, ID_Unidad: 3, Nombre: 'Hierro Retorcido 12mm x 12m', Precio_Unidad: 24570, Descripcion: 'Hierro ADN retorcido para construcción' },
  { ID_Productos: 205, Codigo: 'MAL-CIM-42', ID_Categoria: 2, ID_Marca: 1, ID_Unidad: 1, Nombre: 'Malla Cima 15x15 4.2mm (2x3m)', Precio_Unidad: 31850, Descripcion: 'Malla acanalada electrosoldada' },
  { ID_Productos: 206, Codigo: 'MAL-CIM-55', ID_Categoria: 2, ID_Marca: 1, ID_Unidad: 1, Nombre: 'Malla Cima 15x15 5.5mm (2x3m)', Precio_Unidad: 46800, Descripcion: 'Malla acanalada electrosoldada' },
  { ID_Productos: 207, Codigo: 'ALA-REC-16', ID_Categoria: 2, ID_Marca: 1, ID_Unidad: 2, Nombre: 'Alambre Recocido N° 16 x 1kg', Precio_Unidad: 4940, Descripcion: 'Alambre para atar hierro' },
  { ID_Productos: 208, Codigo: 'PER-C-100', ID_Categoria: 2, ID_Marca: 1, ID_Unidad: 3, Nombre: 'Perfil C 100x50x2mm x 6m', Precio_Unidad: 54600, Descripcion: 'Perfil estructural abierto' },
  { ID_Productos: 209, Codigo: 'PER-C-120', ID_Categoria: 2, ID_Marca: 1, ID_Unidad: 3, Nombre: 'Perfil C 120x50x2mm x 6m', Precio_Unidad: 64350, Descripcion: 'Perfil estructural abierto' },
  { ID_Productos: 210, Codigo: 'CHA-NEG-18', ID_Categoria: 2, ID_Marca: 1, ID_Unidad: 1, Nombre: 'Chapa Negra 18 (1x2m)', Precio_Unidad: 40300, Descripcion: 'Chapa laminada en caliente' },

  // --- Categoría 3: Cementos, Cales y Áridos ---
  { ID_Productos: 301, Codigo: 'CEM-HOL-25', ID_Categoria: 3, ID_Marca: 4, ID_Unidad: 2, Nombre: 'Cemento en bolsa x 25kg Holcim', Precio_Unidad: 19500, Descripcion: 'Cemento Portland normal' },
  { ID_Productos: 302, Codigo: 'CAL-VIV-25', ID_Categoria: 3, ID_Marca: 5, ID_Unidad: 2, Nombre: 'Cal viva en bolsa x 25kg Andina', Precio_Unidad: 15600, Descripcion: 'Cal para construcción' },
  { ID_Productos: 303, Codigo: 'CAL-APA-30', ID_Categoria: 3, ID_Marca: 6, ID_Unidad: 2, Nombre: 'Cal apagada en bolsa x 30kg Cacique', Precio_Unidad: 15600, Descripcion: 'Cal hidratada en bolsa' },
  { ID_Productos: 304, Codigo: 'ARE-FIN-25', ID_Categoria: 3, ID_Marca: 1, ID_Unidad: 2, Nombre: 'Arena fina en bolsa x 25kg Fara', Precio_Unidad: 7800, Descripcion: 'Arena zarandeada embolsada' },
  { ID_Productos: 305, Codigo: 'CAN-ROD-25', ID_Categoria: 3, ID_Marca: 1, ID_Unidad: 2, Nombre: 'Canto rodado en bolsa x 25kg', Precio_Unidad: 8450, Descripcion: 'Árido decorativo' },
  { ID_Productos: 306, Codigo: 'CEM-PLA-40', ID_Categoria: 3, ID_Marca: 4, ID_Unidad: 2, Nombre: 'Cemento de albañilería Plasticor 40kg', Precio_Unidad: 17940, Descripcion: 'Mortero premezclado' },
  { ID_Productos: 307, Codigo: 'CAS-MOL-1M3', ID_Categoria: 3, ID_Marca: 1, ID_Unidad: 5, Nombre: 'Cascote molido x bolson 1m³', Precio_Unidad: 36400, Descripcion: 'Material para relleno y contrapisos' },
  { ID_Productos: 308, Codigo: 'ARE-GRU-1M3', ID_Categoria: 3, ID_Marca: 1, ID_Unidad: 5, Nombre: 'Arena gruesa x bolsón 1m³', Precio_Unidad: 44200, Descripcion: 'Árido grueso a granel en bolsón' },
  { ID_Productos: 309, Codigo: 'ACE-SIK-5L', ID_Categoria: 3, ID_Marca: 7, ID_Unidad: 1, Nombre: 'Acelerante de fragüe Sika 5L', Precio_Unidad: 24050, Descripcion: 'Aditivo para hormigón y morteros' },
  { ID_Productos: 310, Codigo: 'HID-SIK-4K', ID_Categoria: 3, ID_Marca: 7, ID_Unidad: 1, Nombre: 'Hidrófugo Pasta Sika 1 x 4kg', Precio_Unidad: 11960, Descripcion: 'Aditivo impermeabilizante' },

  // --- Categoría 4: Sanitarios y Plomería ---
  { ID_Productos: 701, Codigo: 'CAN-PVC-110', ID_Categoria: 4, ID_Marca: 1, ID_Unidad: 3, Nombre: 'Caño PVC 110mm x 4m para Desagüe', Precio_Unidad: 21450, Descripcion: 'Cañería cloacal y pluvial' },
  { ID_Productos: 702, Codigo: 'CAN-TER-20', ID_Categoria: 4, ID_Marca: 1, ID_Unidad: 3, Nombre: 'Caño Termofusión 20mm x 4m Agua', Precio_Unidad: 8060, Descripcion: 'Conducción de agua fría y caliente' },
  { ID_Productos: 703, Codigo: 'CAN-TER-25', ID_Categoria: 4, ID_Marca: 1, ID_Unidad: 3, Nombre: 'Caño Termofusión 25mm x 4m Agua', Precio_Unidad: 11570, Descripcion: 'Conducción de agua fría y caliente' },
  { ID_Productos: 704, Codigo: 'COD-PVC-110', ID_Categoria: 4, ID_Marca: 1, ID_Unidad: 1, Nombre: 'Codo PVC 110mm x 90° con Acometida', Precio_Unidad: 4420, Descripcion: 'Accesorio desagüe cloacal' },
  { ID_Productos: 705, Codigo: 'INO-FER-BAR', ID_Categoria: 4, ID_Marca: 8, ID_Unidad: 1, Nombre: 'Juego Inodoro y Depósito Ferrum Bari', Precio_Unidad: 240500, Descripcion: 'Loza sanitaria completa' },
  { ID_Productos: 706, Codigo: 'BID-FER-BAR', ID_Categoria: 4, ID_Marca: 8, ID_Unidad: 1, Nombre: 'Bidet Ferrum Bari 1 Agujero', Precio_Unidad: 119600, Descripcion: 'Loza sanitaria bidet' },
  { ID_Productos: 707, Codigo: 'GRI-MON-FV', ID_Categoria: 4, ID_Marca: 9, ID_Unidad: 1, Nombre: 'Grifería Monocomando Lavatorio FV', Precio_Unidad: 83200, Descripcion: 'Grifería cromada para baño' },
  { ID_Productos: 708, Codigo: 'SIF-DOB-COC', ID_Categoria: 4, ID_Marca: 1, ID_Unidad: 1, Nombre: 'Sifón Doble para Pileta de Cocina', Precio_Unidad: 11310, Descripcion: 'Desagüe flexible para bacha doble' },
  { ID_Productos: 709, Codigo: 'VAL-DES-INO', ID_Categoria: 4, ID_Marca: 9, ID_Unidad: 1, Nombre: 'Válvula de Descarga para Inodoro FV', Precio_Unidad: 53300, Descripcion: 'Mecanismo de descarga' },
  { ID_Productos: 710, Codigo: 'TAN-AGU-1000', ID_Categoria: 4, ID_Marca: 10, ID_Unidad: 1, Nombre: 'Tanque de Agua 1000L Tricapa Eternit', Precio_Unidad: 253500, Descripcion: 'Tanque reserva domiciliaria' }
];

// ==========================================
// 6. PRODUCTOS_X_SUCURSALES (Nueva tabla del DER)
// ==========================================
// Aquí mapeamos el idSucursal y el activo que antes tenía el producto
export const productos_x_sucursales = [
    { ID_PRODUCTOSXSUCURS: 1, ID_Sucursales: 1, ID_Productos: 101, Estado: true },
    { ID_PRODUCTOSXSUCURS: 2, ID_Sucursales: 2, ID_Productos: 102, Estado: true },
    { ID_PRODUCTOSXSUCURS: 3, ID_Sucursales: 3, ID_Productos: 103, Estado: true },
    { ID_PRODUCTOSXSUCURS: 4, ID_Sucursales: 1, ID_Productos: 104, Estado: true },
    { ID_PRODUCTOSXSUCURS: 5, ID_Sucursales: 2, ID_Productos: 105, Estado: false }, // Inactivo
    { ID_PRODUCTOSXSUCURS: 6, ID_Sucursales: 3, ID_Productos: 106, Estado: true },
    { ID_PRODUCTOSXSUCURS: 7, ID_Sucursales: 1, ID_Productos: 107, Estado: true },
    { ID_PRODUCTOSXSUCURS: 8, ID_Sucursales: 2, ID_Productos: 108, Estado: true },
    { ID_PRODUCTOSXSUCURS: 9, ID_Sucursales: 3, ID_Productos: 109, Estado: true },
    { ID_PRODUCTOSXSUCURS: 10, ID_Sucursales: 1, ID_Productos: 110, Estado: true },
    
    { ID_PRODUCTOSXSUCURS: 11, ID_Sucursales: 3, ID_Productos: 201, Estado: true },
    { ID_PRODUCTOSXSUCURS: 12, ID_Sucursales: 3, ID_Productos: 202, Estado: true },
    { ID_PRODUCTOSXSUCURS: 13, ID_Sucursales: 3, ID_Productos: 203, Estado: true },
    { ID_PRODUCTOSXSUCURS: 14, ID_Sucursales: 3, ID_Productos: 204, Estado: true },
    { ID_PRODUCTOSXSUCURS: 15, ID_Sucursales: 3, ID_Productos: 205, Estado: true },
    { ID_PRODUCTOSXSUCURS: 16, ID_Sucursales: 3, ID_Productos: 206, Estado: true },
    { ID_PRODUCTOSXSUCURS: 17, ID_Sucursales: 1, ID_Productos: 207, Estado: false }, // Inactivo
    { ID_PRODUCTOSXSUCURS: 18, ID_Sucursales: 3, ID_Productos: 208, Estado: true },
    { ID_PRODUCTOSXSUCURS: 19, ID_Sucursales: 3, ID_Productos: 209, Estado: true },
    { ID_PRODUCTOSXSUCURS: 20, ID_Sucursales: 3, ID_Productos: 210, Estado: true },

    { ID_PRODUCTOSXSUCURS: 21, ID_Sucursales: 1, ID_Productos: 301, Estado: true },
    { ID_PRODUCTOSXSUCURS: 22, ID_Sucursales: 2, ID_Productos: 302, Estado: true },
    { ID_PRODUCTOSXSUCURS: 23, ID_Sucursales: 1, ID_Productos: 303, Estado: true },
    { ID_PRODUCTOSXSUCURS: 24, ID_Sucursales: 2, ID_Productos: 304, Estado: false }, // Inactivo
    { ID_PRODUCTOSXSUCURS: 25, ID_Sucursales: 3, ID_Productos: 305, Estado: true },
    { ID_PRODUCTOSXSUCURS: 26, ID_Sucursales: 1, ID_Productos: 306, Estado: true },
    { ID_PRODUCTOSXSUCURS: 27, ID_Sucursales: 3, ID_Productos: 307, Estado: true },
    { ID_PRODUCTOSXSUCURS: 28, ID_Sucursales: 3, ID_Productos: 308, Estado: true },
    { ID_PRODUCTOSXSUCURS: 29, ID_Sucursales: 1, ID_Productos: 309, Estado: true },
    { ID_PRODUCTOSXSUCURS: 30, ID_Sucursales: 2, ID_Productos: 310, Estado: true },

    { ID_PRODUCTOSXSUCURS: 31, ID_Sucursales: 2, ID_Productos: 701, Estado: true },
    { ID_PRODUCTOSXSUCURS: 32, ID_Sucursales: 1, ID_Productos: 702, Estado: true },
    { ID_PRODUCTOSXSUCURS: 33, ID_Sucursales: 1, ID_Productos: 703, Estado: true },
    { ID_PRODUCTOSXSUCURS: 34, ID_Sucursales: 2, ID_Productos: 704, Estado: true },
    { ID_PRODUCTOSXSUCURS: 35, ID_Sucursales: 1, ID_Productos: 705, Estado: true },
    { ID_PRODUCTOSXSUCURS: 36, ID_Sucursales: 1, ID_Productos: 706, Estado: true },
    { ID_PRODUCTOSXSUCURS: 37, ID_Sucursales: 2, ID_Productos: 707, Estado: true },
    { ID_PRODUCTOSXSUCURS: 38, ID_Sucursales: 2, ID_Productos: 708, Estado: false }, // Inactivo
    { ID_PRODUCTOSXSUCURS: 39, ID_Sucursales: 1, ID_Productos: 709, Estado: true },
    { ID_PRODUCTOSXSUCURS: 40, ID_Sucursales: 3, ID_Productos: 710, Estado: true }
];

// ==========================================
// 7. PRODUCTOS_X_PROVEEDORES
// ==========================================
export const productosXProveedores = [
  { ID_Productos_X_Proveedores: 1, ID_Productos: 101, ID_Proveedores: 1, Codigo_Producto_Proveedor: '001-CER-6060-MB', Precio_Lista: 35000, Estado: true },
  { ID_Productos_X_Proveedores: 2, ID_Productos: 102, ID_Proveedores: 1, Codigo_Producto_Proveedor: '001-CER-4545-COR', Precio_Lista: 17500, Estado: true },
  { ID_Productos_X_Proveedores: 3, ID_Productos: 103, ID_Proveedores: 1, Codigo_Producto_Proveedor: '001-REV-3060-GRIS', Precio_Lista: 23000, Estado: true },
  { ID_Productos_X_Proveedores: 4, ID_Productos: 104, ID_Proveedores: 1, Codigo_Producto_Proveedor: '001-POR-20120-MAD', Precio_Lista: 40000, Estado: true },
  { ID_Productos_X_Proveedores: 5, ID_Productos: 105, ID_Proveedores: 1, Codigo_Producto_Proveedor: '001-ZOC-1045', Precio_Lista: 3800, Estado: false },
  { ID_Productos_X_Proveedores: 6, ID_Productos: 106, ID_Proveedores: 10, Codigo_Producto_Proveedor: '010-PEG-WEB-25', Precio_Lista: 15500, Estado: true },
  { ID_Productos_X_Proveedores: 7, ID_Productos: 107, ID_Proveedores: 21, Codigo_Producto_Proveedor: '021-PAS-IMP-1KG', Precio_Lista: 3400, Estado: true },
  { ID_Productos_X_Proveedores: 8, ID_Productos: 108, ID_Proveedores: 14, Codigo_Producto_Proveedor: '014-LIS-ALU-25', Precio_Lista: 11000, Estado: true },
  { ID_Productos_X_Proveedores: 9, ID_Productos: 109, ID_Proveedores: 7, Codigo_Producto_Proveedor: '007-MOS-VEN-3030', Precio_Lista: 11800, Estado: true },
  { ID_Productos_X_Proveedores: 10, ID_Productos: 110, ID_Proveedores: 14, Codigo_Producto_Proveedor: '014-GUA-CUR-10', Precio_Lista: 9200, Estado: true },

  { ID_Productos_X_Proveedores: 11, ID_Productos: 201, ID_Proveedores: 2, Codigo_Producto_Proveedor: '002-HIE-RET-6', Precio_Lista: 6700, Estado: true },
  { ID_Productos_X_Proveedores: 12, ID_Productos: 202, ID_Proveedores: 2, Codigo_Producto_Proveedor: '002-HIE-RET-8', Precio_Lista: 10500, Estado: true },
  { ID_Productos_X_Proveedores: 13, ID_Productos: 203, ID_Proveedores: 2, Codigo_Producto_Proveedor: '002-HIE-RET-10', Precio_Lista: 16500, Estado: true },
  { ID_Productos_X_Proveedores: 14, ID_Productos: 204, ID_Proveedores: 2, Codigo_Producto_Proveedor: '002-HIE-RET-12', Precio_Lista: 23500, Estado: true },
  { ID_Productos_X_Proveedores: 15, ID_Productos: 205, ID_Proveedores: 17, Codigo_Producto_Proveedor: '017-MAL-CIM-42', Precio_Lista: 30000, Estado: true },
  { ID_Productos_X_Proveedores: 16, ID_Productos: 206, ID_Proveedores: 17, Codigo_Producto_Proveedor: '017-MAL-CIM-55', Precio_Lista: 45000, Estado: true },
  { ID_Productos_X_Proveedores: 17, ID_Productos: 207, ID_Proveedores: 6, Codigo_Producto_Proveedor: '006-ALA-REC-16', Precio_Lista: 4700, Estado: false },
  { ID_Productos_X_Proveedores: 18, ID_Productos: 208, ID_Proveedores: 30, Codigo_Producto_Proveedor: '030-PER-C-100', Precio_Lista: 52000, Estado: true },
  { ID_Productos_X_Proveedores: 19, ID_Productos: 209, ID_Proveedores: 30, Codigo_Producto_Proveedor: '030-PER-C-120', Precio_Lista: 61000, Estado: true },
  { ID_Productos_X_Proveedores: 20, ID_Productos: 210, ID_Proveedores: 20, Codigo_Producto_Proveedor: '020-CHA-NEG-18', Precio_Lista: 38500, Estado: true },

  { ID_Productos_X_Proveedores: 21, ID_Productos: 301, ID_Proveedores: 3, Codigo_Producto_Proveedor: '003-CEM-HOL-25', Precio_Lista: 18500, Estado: true },
  { ID_Productos_X_Proveedores: 22, ID_Productos: 302, ID_Proveedores: 31, Codigo_Producto_Proveedor: '031-CAL-VIV-25', Precio_Lista: 14800, Estado: true },
  { ID_Productos_X_Proveedores: 23, ID_Productos: 303, ID_Proveedores: 3, Codigo_Producto_Proveedor: '003-CAL-APA-30', Precio_Lista: 14800, Estado: true },
  { ID_Productos_X_Proveedores: 24, ID_Productos: 304, ID_Proveedores: 11, Codigo_Producto_Proveedor: '011-ARE-FIN-25', Precio_Lista: 7400, Estado: false },
  { ID_Productos_X_Proveedores: 25, ID_Productos: 305, ID_Proveedores: 11, Codigo_Producto_Proveedor: '011-CAN-ROD-25', Precio_Lista: 8000, Estado: true },
  { ID_Productos_X_Proveedores: 26, ID_Productos: 306, ID_Proveedores: 3, Codigo_Producto_Proveedor: '003-CEM-PLA-40', Precio_Lista: 17000, Estado: true },
  { ID_Productos_X_Proveedores: 27, ID_Productos: 307, ID_Proveedores: 11, Codigo_Producto_Proveedor: '011-CAS-MOL-1M3', Precio_Lista: 35000, Estado: true },
  { ID_Productos_X_Proveedores: 28, ID_Productos: 308, ID_Proveedores: 11, Codigo_Producto_Proveedor: '011-ARE-GRU-1M3', Precio_Lista: 42000, Estado: true },
  { ID_Productos_X_Proveedores: 29, ID_Productos: 309, ID_Proveedores: 16, Codigo_Producto_Proveedor: '016-ACE-SIK-5L', Precio_Lista: 23000, Estado: true },
  { ID_Productos_X_Proveedores: 30, ID_Productos: 310, ID_Proveedores: 16, Codigo_Producto_Proveedor: '016-HID-SIK-4K', Precio_Lista: 11400, Estado: true },

  { ID_Productos_X_Proveedores: 31, ID_Productos: 701, ID_Proveedores: 15, Codigo_Producto_Proveedor: '015-CAN-PVC-110', Precio_Lista: 20500, Estado: true },
  { ID_Productos_X_Proveedores: 32, ID_Productos: 702, ID_Proveedores: 15, Codigo_Producto_Proveedor: '015-CAN-TER-20', Precio_Lista: 7700, Estado: true },
  { ID_Productos_X_Proveedores: 33, ID_Productos: 703, ID_Proveedores: 15, Codigo_Producto_Proveedor: '015-CAN-TER-25', Precio_Lista: 11100, Estado: true },
  { ID_Productos_X_Proveedores: 34, ID_Productos: 704, ID_Proveedores: 15, Codigo_Producto_Proveedor: '015-COD-PVC-110', Precio_Lista: 4200, Estado: true },
  { ID_Productos_X_Proveedores: 35, ID_Productos: 705, ID_Proveedores: 7, Codigo_Producto_Proveedor: '007-INO-FER-BAR', Precio_Lista: 230000, Estado: true },
  { ID_Productos_X_Proveedores: 36, ID_Productos: 706, ID_Proveedores: 7, Codigo_Producto_Proveedor: '007-BID-FER-BAR', Precio_Lista: 114000, Estado: true },
  { ID_Productos_X_Proveedores: 37, ID_Productos: 707, ID_Proveedores: 27, Codigo_Producto_Proveedor: '027-GRI-MON-FV', Precio_Lista: 80000, Estado: true },
  { ID_Productos_X_Proveedores: 38, ID_Productos: 708, ID_Proveedores: 27, Codigo_Producto_Proveedor: '027-SIF-DOB-COC', Precio_Lista: 10800, Estado: false },
  { ID_Productos_X_Proveedores: 39, ID_Productos: 709, ID_Proveedores: 27, Codigo_Producto_Proveedor: '027-VAL-DES-INO', Precio_Lista: 51000, Estado: true },
  { ID_Productos_X_Proveedores: 40, ID_Productos: 710, ID_Proveedores: 28, Codigo_Producto_Proveedor: '028-TAN-AGU-1000', Precio_Lista: 245000, Estado: true }
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

export const metodosPago = [
    { id: 1, nombre: 'Efectivo' },
    { id: 2, nombre: 'Transferencia Bancaria' },
    { id: 3, nombre: 'Tarjeta de Crédito' },
    { id: 4, nombre: 'Cuenta Corriente' }
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
