// Datos simulados hasta conectar el backend (Django REST Framework)
import {
  IconUsers, IconBox, IconTruck, IconShoppingCart, IconFileText, IconCash,
  IconBuildingWarehouse, IconFileDescription, IconUserCheck, IconUserX,
} from '@tabler/icons-react'

export const usuarioDemo = { 
  legajo: '45974444', 
  correo: 'alejandro@fercons.com', 
  password: '1234', 
  nombre: 'Alejandro Carrizo', 
  rol: 'Administrador',
  dni: '45.974.444',
  telefono: '+54 387 412-9988',
  fechaAsociacion: '14/02/2025',
  activo: true
};

export const roles = [
  { id: 1, ocupacion: 'Administrador', descripcion: 'Gestión total del sistema y sucursales' },
  { id: 2, ocupacion: 'Supervisor', descripcion: 'Supervisión de personal y operaciones' },
  { id: 3, ocupacion: 'Encargado de Stock', descripcion: 'Control de inventario, ingresos y egresos' },
  { id: 4, ocupacion: 'Cajero', descripcion: 'Atención de caja y cobros' },
  { id: 5, ocupacion: 'Vendedor', descripcion: 'Atención al cliente y ventas en salón' },
  { id: 6, ocupacion: 'Repositor', descripcion: 'Reposición de mercadería en góndolas' },
  { id: 7, ocupacion: 'Administrativo', descripcion: 'Tareas administrativas generales' }
];

export const sucursales = [
  { id: 1, nombre: 'Casa Central', direccion: 'Av. Belgrano 1234, Salta' },
  { id: 2, nombre: 'Sucursal Sur', direccion: 'Av. Tavella 800, Salta' },
  { id: 3, nombre: 'Depósito Norte', direccion: 'Parque Industrial, Salta' }
];

export const empleados = [
  {
    id: 1,
    dni: '38412345',
    legajo: '0214',
    nombre: 'Daniel',
    apellido: 'Pérez Ruiz',
    email: 'daniel.perez@ferreteria.com',
    telefono: '+54 387 320-3022',
    id_rol: 5,
    id_sucursal: 1,
    hora_entrada: '08:00',
    hora_salida: '17:00',
    activo: true,
    detalleBaja: ''
  },
  {
    id: 2,
    dni: '40123987',
    legajo: '0215',
    nombre: 'Santiago',
    apellido: 'Alvarez',
    email: 'santiago.alvarez@ferreteria.com',
    telefono: '+54 387 570-3132',
    id_rol: 4,
    id_sucursal: 1,
    hora_entrada: '08:00',
    hora_salida: '16:00',
    activo: false,
    detalleBaja: 'Renuncia voluntaria presentada por motivos personales.'
  },
  {
    id: 3,
    dni: '39222333',
    legajo: '0216',
    nombre: 'Alan',
    apellido: 'Maita',
    email: 'alan.maita@ferreteria.com',
    telefono: '+54 387 320-3451',
    id_rol: 5,
    id_sucursal: 1,
    hora_entrada: '09:00',
    hora_salida: '18:00',
    activo: true,
    detalleBaja: ''
  },
  {
    id: 4,
    dni: '37888999',
    legajo: '0217',
    nombre: 'Valeria',
    apellido: 'Giménez',
    email: 'valeria.gimenez@ferreteria.com',
    telefono: '+54 387 412-9988',
    id_rol: 3,
    id_sucursal: 3,
    hora_entrada: '07:00',
    hora_salida: '16:00',
    activo: true,
    detalleBaja: ''
  },
  {
    id: 5,
    dni: '41555666',
    legajo: '0218',
    nombre: 'Lucas',
    apellido: 'Rojas Carrizo',
    email: 'lucas.rojas@ferreteria.com',
    telefono: '+54 387 655-4433',
    id_rol: 6,
    id_sucursal: 2,
    hora_entrada: '08:30',
    hora_salida: '17:30',
    activo: true,
    detalleBaja: ''
  },
  {
    id: 6,
    dni: '39444111',
    legajo: '0219',
    nombre: 'Sofía',
    apellido: 'Benítez',
    email: 'sofia.benitez@ferreteria.com',
    telefono: '+54 387 221-1199',
    id_rol: 4,
    id_sucursal: 2,
    hora_entrada: '12:00',
    hora_salida: '20:00',
    activo: false,
    detalleBaja: 'Baja temporal por reestructuración de turnos en sucursal.'
  },
  {
    id: 7,
    dni: '35111222',
    legajo: '0220',
    nombre: 'Martín',
    apellido: 'Gómez',
    email: 'martin.gomez@ferreteria.com',
    telefono: '+54 387 499-1234',
    id_rol: 1,
    id_sucursal: 1,
    hora_entrada: '08:00',
    hora_salida: '17:00',
    activo: true,
    detalleBaja: ''
  },
  {
    id: 8,
    dni: '36777888',
    legajo: '0221',
    nombre: 'Lucía',
    apellido: 'Torres',
    email: 'lucia.torres@ferreteria.com',
    telefono: '+54 387 611-5678',
    id_rol: 2,
    id_sucursal: 2,
    hora_entrada: '08:00',
    hora_salida: '17:00',
    activo: true,
    detalleBaja: ''
  },
  {
    id: 9,
    dni: '42333000',
    legajo: '0222',
    nombre: 'Carlos',
    apellido: 'Navarro',
    email: 'carlos.navarro@ferreteria.com',
    telefono: '+54 387 733-9876',
    id_rol: 6,
    id_sucursal: 3,
    hora_entrada: '07:00',
    hora_salida: '16:00',
    activo: false,
    detalleBaja: 'Inasistencias injustificadas reiteradas.'
  },
  {
    id: 10,
    dni: '40999111',
    legajo: '0223',
    nombre: 'Yamila',
    apellido: 'Morales',
    email: 'yamila.morales@ferreteria.com',
    telefono: '+54 387 522-4321',
    id_rol: 5,
    id_sucursal: 2,
    hora_entrada: '09:00',
    hora_salida: '18:00',
    activo: true,
    detalleBaja: ''
  },
  {
    id: 11,
    dni: '38888222',
    legajo: '0224',
    nombre: 'Rodrigo',
    apellido: 'Paz',
    email: 'rodrigo.paz@ferreteria.com',
    telefono: '+54 387 411-8877',
    id_rol: 5,
    id_sucursal: 1,
    hora_entrada: '08:00',
    hora_salida: '17:00',
    activo: true,
    detalleBaja: ''
  },
  {
    id: 12,
    dni: '41222444',
    legajo: '0225',
    nombre: 'Florencia',
    apellido: 'Soria',
    email: 'florencia.soria@ferreteria.com',
    telefono: '+54 387 399-2233',
    id_rol: 4,
    id_sucursal: 2,
    hora_entrada: '08:00',
    hora_salida: '16:00',
    activo: true,
    detalleBaja: ''
  },
  {
    id: 13,
    dni: '39555333',
    legajo: '0226',
    nombre: 'Esteban',
    apellido: 'Vargas',
    email: 'esteban.vargas@ferreteria.com',
    telefono: '+54 387 688-4455',
    id_rol: 6,
    id_sucursal: 3,
    hora_entrada: '07:00',
    hora_salida: '16:00',
    activo: true,
    detalleBaja: ''
  },
  {
    id: 14,
    dni: '37666444',
    legajo: '0227',
    nombre: 'Camila',
    apellido: 'Medina',
    email: 'camila.medina@ferreteria.com',
    telefono: '+54 387 500-1122',
    id_rol: 7,
    id_sucursal: 1,
    hora_entrada: '08:00',
    hora_salida: '17:00',
    activo: false,
    detalleBaja: 'Licencia sin goce de sueldo prolongada.'
  },
  {
    id: 15,
    dni: '40333555',
    legajo: '0228',
    nombre: 'Gonzalo',
    apellido: 'Rios',
    email: 'gonzalo.rios@ferreteria.com',
    telefono: '+54 387 311-6677',
    id_rol: 5,
    id_sucursal: 2,
    hora_entrada: '09:00',
    hora_salida: '18:00',
    activo: true,
    detalleBaja: ''
  },
  {
    id: 16,
    dni: '36444777',
    legajo: '0229',
    nombre: 'Natalia',
    apellido: 'Flores',
    email: 'natalia.flores@ferreteria.com',
    telefono: '+54 387 455-9900',
    id_rol: 2,
    id_sucursal: 3,
    hora_entrada: '07:00',
    hora_salida: '16:00',
    activo: true,
    detalleBaja: ''
  },
  {
    id: 17,
    dni: '38999000',
    legajo: '0230',
    nombre: 'Hernán',
    apellido: 'Acosta',
    email: 'hernan.acosta@ferreteria.com',
    telefono: '+54 387 622-3344',
    id_rol: 4,
    id_sucursal: 1,
    hora_entrada: '08:00',
    hora_salida: '16:00',
    activo: true,
    detalleBaja: ''
  },
  {
    id: 18,
    dni: '39111888',
    legajo: '0231',
    nombre: 'Romina',
    apellido: 'Díaz',
    email: 'romina.diaz@ferreteria.com',
    telefono: '+54 387 377-5566',
    id_rol: 3,
    id_sucursal: 2,
    hora_entrada: '08:00',
    hora_salida: '17:00',
    activo: false,
    detalleBaja: 'Finalización de contrato temporal.'
  },
  {
    id: 19,
    dni: '41777222',
    legajo: '0232',
    nombre: 'Facundo',
    apellido: 'Juárez',
    email: 'facundo.juarez@ferreteria.com',
    telefono: '+54 387 488-7788',
    id_rol: 5,
    id_sucursal: 1,
    hora_entrada: '09:00',
    hora_salida: '18:00',
    activo: true,
    detalleBaja: ''
  },
  {
    id: 20,
    dni: '42888333',
    legajo: '0233',
    nombre: 'Antonella',
    apellido: 'Herrera',
    email: 'antonella.herrera@ferreteria.com',
    telefono: '+54 387 533-2211',
    id_rol: 6,
    id_sucursal: 3,
    hora_entrada: '07:00',
    hora_salida: '16:00',
    activo: true,
    detalleBaja: ''
  },
  {
    id: 21,
    dni: '40666999',
    legajo: '0234',
    nombre: 'Maximiliano',
    apellido: 'Luna',
    email: 'maximiliano.luna@ferreteria.com',
    telefono: '+54 387 699-0011',
    id_rol: 5,
    id_sucursal: 2,
    hora_entrada: '08:00',
    hora_salida: '17:00',
    activo: true,
    detalleBaja: ''
  },
  {
    id: 22,
    dni: '38222777',
    legajo: '0235',
    nombre: 'Julieta',
    apellido: 'Castro',
    email: 'julieta.castro@ferreteria.com',
    telefono: '+54 387 344-8899',
    id_rol: 4,
    id_sucursal: 1,
    hora_entrada: '12:00',
    hora_salida: '20:00',
    activo: true,
    detalleBaja: ''
  },
  {
    id: 23,
    dni: '36111555',
    legajo: '0236',
    nombre: 'Marcos',
    apellido: 'Villalba',
    email: 'marcos.villalba@ferreteria.com',
    telefono: '+54 387 422-5544',
    id_rol: 2,
    id_sucursal: 1,
    hora_entrada: '08:00',
    hora_salida: '17:00',
    activo: false,
    detalleBaja: 'Desvinculación por motivos disciplinarios.'
  },
  {
    id: 24,
    dni: '41999444',
    legajo: '0237',
    nombre: 'Daiana',
    apellido: 'Ponce',
    email: 'daiana.ponce@ferreteria.com',
    telefono: '+54 387 566-7788',
    id_rol: 5,
    id_sucursal: 3,
    hora_entrada: '07:00',
    hora_salida: '16:00',
    activo: true,
    detalleBaja: ''
  },
  {
    id: 25,
    dni: '42000111',
    legajo: '0238',
    nombre: 'Cristian',
    apellido: 'Silva',
    email: 'cristian.silva@ferreteria.com',
    telefono: '+54 387 677-1122',
    id_rol: 6,
    id_sucursal: 2,
    hora_entrada: '08:30',
    hora_salida: '17:30',
    activo: true,
    detalleBaja: ''
  }
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
  { id: 10, codigo: '010', nombreFantasia: 'Ferretería Industrial Güemes', razonSocial: 'Ferretería Güemes S.R.L', cuit: '30-7412389-1', telefono: '+54 388 488-2233', email: 'administracion@ferreteria-guemes.com.ar', sucursal: 'Casa Central', activo: true },
  { id: 11, codigo: '011', nombreFantasia: 'Áridos del Sur', razonSocial: 'Áridos del Sur S.A', cuit: '30-7198822-4', telefono: '+54 387 444-1122', email: 'ventas@aridosdelsur.com', sucursal: 'Sucursal Sur', activo: true },
  { id: 12, codigo: '012', nombreFantasia: 'Yesos y Cielorrasos NOA', razonSocial: 'Yesos NOA S.R.L', cuit: '30-7331199-8', telefono: '+54 387 477-3344', email: 'contacto@yesosnoa.com.ar', sucursal: 'Depósito Norte', activo: true },
  { id: 13, codigo: '013', nombreFantasia: 'Herramientas Profesionales Salta', razonSocial: 'Herramientas Salta S.A', cuit: '30-7044556-3', telefono: '+54 388 422-9900', email: 'info@herramientassalta.com', sucursal: 'Casa Central', activo: false },
  { id: 14, codigo: '014', nombreFantasia: 'Aberturas de Aluminio Norte', razonSocial: 'Aluminio Norte S.R.L', cuit: '30-7266778-1', telefono: '+54 387 466-5533', email: 'pedidos@aluminionorte.com.ar', sucursal: 'Sucursal Sur', activo: true },
  { id: 15, codigo: '015', nombreFantasia: 'Caños y Conexiones del Valle', razonSocial: 'Caños Valle S.A', cuit: '30-7155443-9', telefono: '+54 387 411-2244', email: 'ventas@canosvalle.com', sucursal: 'Depósito Norte', activo: true },
  { id: 16, codigo: '016', nombreFantasia: 'Impermeabilizantes Cuyo', razonSocial: 'Impermeabilizantes S.R.L', cuit: '30-6922334-5', telefono: '+54 388 433-7788', email: 'contacto@impercuyo.com', sucursal: 'Casa Central', activo: true },
  { id: 17, codigo: '017', nombreFantasia: 'Mallas y Metales Güemes', razonSocial: 'Metales Güemes S.A', cuit: '30-7488991-2', telefono: '+54 387 488-6655', email: 'info@metalesguemes.com.ar', sucursal: 'Sucursal Sur', activo: false },
  { id: 18, codigo: '018', nombreFantasia: 'Ladrillos Cerámicos San Cayetano', razonSocial: 'Cerámica San Cayetano S.R.L', cuit: '30-7211223-6', telefono: '+54 387 499-4411', email: 'pedidos@sancayetano.com', sucursal: 'Casa Central', activo: true },
  { id: 19, codigo: '019', nombreFantasia: 'Pinturería Industrial Centro', razonSocial: 'Pinturas Centro S.A', cuit: '30-7399884-7', telefono: '+54 388 455-1199', email: 'ventas@pinturascentro.com.ar', sucursal: 'Depósito Norte', activo: true },
  { id: 20, codigo: '020', nombreFantasia: 'Techitos y Chapas del Norte', razonSocial: 'Chapas Norte S.R.L', cuit: '30-7133445-0', telefono: '+54 387 422-7766', email: 'contacto@chapasnorte.com', sucursal: 'Sucursal Sur', activo: true },
  { id: 21, codigo: '021', nombreFantasia: 'Adhesivos y Pegamentos Salta', razonSocial: 'Pegamentos Salta S.A', cuit: '30-7088776-4', telefono: '+54 387 433-8899', email: 'info@pegamentosalta.com', sucursal: 'Casa Central', activo: true },
  { id: 22, codigo: '022', nombreFantasia: 'Ferretería Mayorista Andina', razonSocial: 'Andina Mayorista S.R.L', cuit: '30-7455667-8', telefono: '+54 388 411-3322', email: 'ventas@andinamayorista.com.ar', sucursal: 'Depósito Norte', activo: false },
  { id: 23, codigo: '023', nombreFantasia: 'Construcciones Secundarias SRL', razonSocial: 'Secundarias S.R.L', cuit: '30-7244332-1', telefono: '+54 387 466-9900', email: 'pedidos@secundarias.com', sucursal: 'Sucursal Sur', activo: true },
  { id: 24, codigo: '024', nombreFantasia: 'Equipamientos para Obra', razonSocial: 'Equipamientos Obra S.A', cuit: '30-7311225-9', telefono: '+54 387 477-1133', email: 'contacto@equipamientosobra.com', sucursal: 'Casa Central', activo: true },
  { id: 25, codigo: '025', nombreFantasia: 'Maderas y Derivados del Litoral', razonSocial: 'Derivados Litoral S.R.L', cuit: '30-6899443-2', telefono: '+54 388 499-2244', email: 'info@litoralmaderas.com.ar', sucursal: 'Depósito Norte', activo: true },
  { id: 26, codigo: '026', nombreFantasia: 'Cerrajería y Herrajes Salta', razonSocial: 'Herrajes Salta S.A', cuit: '30-7166554-3', telefono: '+54 387 444-5566', email: 'ventas@herrajessalta.com', sucursal: 'Casa Central', activo: true },
  { id: 27, codigo: '027', nombreFantasia: 'Grifería y Sanitarios del Norte', razonSocial: 'Sanitarios Norte S.R.L', cuit: '30-7299881-6', telefono: '+54 387 411-7788', email: 'contacto@sanitariosnorte.com.ar', sucursal: 'Sucursal Sur', activo: false },
  { id: 28, codigo: '028', nombreFantasia: 'Cables y Materiales Eléctricos', razonSocial: 'Materiales Eléctricos S.A', cuit: '30-7377665-2', telefono: '+54 388 422-3344', email: 'pedidos@matelectricos.com', sucursal: 'Depósito Norte', activo: true },
  { id: 29, codigo: '029', nombreFantasia: 'Placas de Yeso Durlock Salta', razonSocial: 'Durlock Salta S.R.L', cuit: '30-7422119-5', telefono: '+54 387 455-6677', email: 'info@durlocksalta.com.ar', sucursal: 'Casa Central', activo: true },
  { id: 30, codigo: '030', nombreFantasia: 'Estructuras Metálicas del NOA', razonSocial: 'Estructuras NOA S.A', cuit: '30-7033221-8', telefono: '+54 387 488-9900', email: 'ventas@estructurasnoa.com', sucursal: 'Sucursal Sur', activo: true },
  { id: 31, codigo: '031', nombreFantasia: 'Áridos y Cementos Güemes', razonSocial: 'Güemes Materiales S.R.L', cuit: '30-7188774-1', telefono: '+54 388 433-2211', email: 'contacto@guemesmateriales.com.ar', sucursal: 'Depósito Norte', activo: true },
  { id: 32, codigo: '032', nombreFantasia: 'Pisos y Revestimientos Cerámicos', razonSocial: 'Pisos Cerámicos S.A', cuit: '30-7255446-7', telefono: '+54 387 466-1122', email: 'pedidos@pisosceramicos.com', sucursal: 'Casa Central', activo: false },
  { id: 33, codigo: '033', nombreFantasia: 'Aislaciones Térmicas y Acústicas', razonSocial: 'Aislaciones Salta S.R.L', cuit: '30-7322114-9', telefono: '+54 387 499-5566', email: 'info@aislacionsalta.com.ar', sucursal: 'Sucursal Sur', activo: true },
  { id: 34, codigo: '034', nombreFantasia: 'Herramientas Eléctricas del Valle', razonSocial: 'Herramientas Valle S.A', cuit: '30-7411993-2', telefono: '+54 388 477-8899', email: 'ventas@herramientasvalle.com', sucursal: 'Depósito Norte', activo: true },
  { id: 35, codigo: '035', nombreFantasia: 'Distribuidora General Ferretera', razonSocial: 'Distri Ferretera S.R.L', cuit: '30-7099221-5', telefono: '+54 387 422-1144', email: 'contacto@distriferretera.com.ar', sucursal: 'Casa Central', activo: true }
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

// Funciones auxiliares opcionales para consultar marcas o unidades de forma limpia
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
