import { useState, useMemo, useRef } from 'react';
import Swal from 'sweetalert2';
import { IconPhone, IconEdit, IconPower, IconInfoCircle, IconClock, IconKey } from '@tabler/icons-react';
import Encabezado from '../components/Encabezado.jsx';
import GenericTable from '../components/common/GenericTable.jsx';
import SearchBar from '../components/common/SearchBar.jsx';
import FilterTabs from '../components/common/FilterTabs.jsx';
import FilterSelect from '../components/common/FilterSelect.jsx';
import GenericModalForm from '../components/common/GenericModalForm.jsx';
import ChangePasswordModal from '../components/common/ChangePasswordModal.jsx';
import GenericFab from '../components/common/GenericFab.jsx';
import LoadMoreButton from '../components/common/LoadMoreButton.jsx';
import { showDetailAlert } from '../components/common/showDetailAlert.js';
import { showConfirmInputAlert } from '../components/common/showConfirmInputAlert.js';
import { showReactivateAlert } from '../components/common/showReactivateAlert.js';
import { usePagination } from '../hooks/usePagination.js';
import { useAuth } from '../context/AuthContext.jsx';
import { 
  empleados as datosEmpleados, 
  usuarios as datosUsuarios,
  roles, 
  sucursales, 
  empleados_x_roles, 
  sucursales_x_empleados 
} from '../data/mock.js';
import '../styles/Empleados.css';

// ==========================================
// CONSTANTES Y HELPERS
// ==========================================
const ITEMS_POR_PAGINA = 10;
const LEGAJO_BASE = 218;

const obtenerFechaHoy = () => {
  const hoy = new Date();
  return `${String(hoy.getDate()).padStart(2, '0')}/${String(hoy.getMonth() + 1).padStart(2, '0')}/${hoy.getFullYear()}`;
};

const obtenerIniciales = (nombre = '') => 
  nombre.split(' ').slice(0, 2).map((p) => p[0] || '').join('').toUpperCase();

const separarNombre = (completo = '') => {
  const [primero = '', ...resto] = completo.trim().split(' ');
  return { nombre: primero, apellido: resto.join(' ') };
};

const obtenerNombreRol = (idRol) => 
  roles.find(r => r.ID_Roles === Number(idRol))?.Ocupacion || 'Sin Rol';

const obtenerNombreSucursal = (idSucursal) => 
  sucursales.find(s => s.ID_Sucursales === Number(idSucursal))?.Nombre || 'Sin Sucursal';

// ADAPTACIÓN: Función que hace el JOIN con las nuevas tablas
const mapearEmpleadosRelacionales = () => {
  return datosEmpleados.map(emp => {
    const usuarioData = datosUsuarios.find(u => u.ID_Usuarios === emp.ID_Usuarios);
    const rolData = empleados_x_roles.find(er => er.ID_Empleados === emp.ID_Empleados && er.Estado) 
                  || empleados_x_roles.find(er => er.ID_Empleados === emp.ID_Empleados);
    const sucursalData = sucursales_x_empleados.find(se => se.ID_Empleados === emp.ID_Empleados && se.Estado)
                      || sucursales_x_empleados.find(se => se.ID_Empleados === emp.ID_Empleados);

    return {
      id: emp.ID_Empleados, 
      id_usuario: emp.ID_Usuarios, 
      dni: emp.DNI_Empleados,
      legajo: emp.Legajo,
      nombre: emp.Nombre,
      apellido: emp.Apellido,
      username: usuarioData?.Username || '', 
      email: usuarioData?.Email || '',
      telefono: emp.Telefono,
      contrasena: usuarioData?.Password || '',
      activo: emp.Estado,
      detalleBaja: rolData?.detalleBaja || '',
      id_rol: rolData?.ID_Roles || null,
      hora_entrada: rolData?.Hora_Entrada || '',
      hora_salida: rolData?.Hora_Salida || '',
      id_sucursal: sucursalData?.ID_Sucursales || null,
      fechaAsociacion: sucursalData?.Fecha_Asociacion || 'N/A'
    };
  });
};

const COLUMNAS_TABLA = [
  'Legajo', 
  'DNI',
  'Empleado', 
  'Usuario',
  'Email',
  <span key="tel" className="columna-con-icono"><IconPhone size={16} />Teléfono</span>, 
  'Rol', 
  'Sucursal', 
  'Asociación',
  <span key="hor" className="columna-con-icono"><IconClock size={16} />Horario</span>,
  'Estado', 
  'Acciones'
];

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================
export default function Empleados() {
  const { user } = useAuth(); 
  
  const esAdmin = user?.rol === 'Administrador';

  const [empleados, setEmpleados] = useState(mapearEmpleadosRelacionales);
  const [busqueda, setBusqueda] = useState('');
  const [tabActiva, setTabActiva] = useState('todos');
  const [rolSeleccionado, setRolSeleccionado] = useState('');
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState('');
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [empleadoEditando, setEmpleadoEditando] = useState(null);
  const [empleadoClave, setEmpleadoClave] = useState(null); 
  
  const bloquearCierreRef = useRef(false);

  // Valores derivados
  const activos = useMemo(() => empleados.filter(e => e.activo).length, [empleados]);
  const inactivos = useMemo(() => empleados.filter(e => !e.activo).length, [empleados]);
  
  const rolesDisponibles = useMemo(() => roles.map(r => r.Ocupacion), []);
  const sucursalesDisponibles = useMemo(() => sucursales.map(s => s.Nombre), []);

  const siguienteLegajo = useMemo(() => {
    const maxLegajo = empleados.length > 0 
      ? Math.max(...empleados.map(e => Number(e.legajo) || 0)) 
      : LEGAJO_BASE;
    return String(maxLegajo + 1).padStart(4, '0');
  }, [empleados]);

  const empleadosFiltrados = useMemo(() => {
    return empleados.filter((empleado) => {
      const nombreCompleto = `${empleado.nombre} ${empleado.apellido}`.toLowerCase();
      const nombreRol = obtenerNombreRol(empleado.id_rol).toLowerCase();
      const nombreSucursal = obtenerNombreSucursal(empleado.id_sucursal).toLowerCase();
      const query = busqueda.toLowerCase().trim();

      let cumpleTab = true;
      if (tabActiva === 'activos') cumpleTab = empleado.activo;
      else if (tabActiva === 'inactivos') cumpleTab = !empleado.activo;
      else if (tabActiva === 'rol') cumpleTab = rolSeleccionado ? nombreRol === rolSeleccionado.toLowerCase() : true;
      else if (tabActiva === 'sucursal') cumpleTab = sucursalSeleccionada ? nombreSucursal === sucursalSeleccionada.toLowerCase() : true;
      else if (tabActiva === 'fecha') {
        if (fechaSeleccionada) {
          const [year, month, day] = fechaSeleccionada.split('-');
          const fechaFormateada = `${day}/${month}/${year}`;
          cumpleTab = empleado.fechaAsociacion === fechaFormateada;
        } else {
          cumpleTab = true;
        }
      }

      const cumpleBusqueda = !query ||
        String(empleado.legajo).toLowerCase().includes(query) ||
        nombreCompleto.includes(query) ||
        nombreSucursal.includes(query) ||
        (empleado.username && empleado.username.toLowerCase().includes(query)) ||
        (empleado.email && empleado.email.toLowerCase().includes(query)) ||
        (empleado.dni && String(empleado.dni).toLowerCase().includes(query));

      return cumpleTab && cumpleBusqueda;
    });
  }, [empleados, busqueda, tabActiva, rolSeleccionado, sucursalSeleccionada, fechaSeleccionada]);

  const { datosVisibles, tieneMas, cargarMas } = usePagination(
    empleadosFiltrados, 
    ITEMS_POR_PAGINA, 
    [empleadosFiltrados]
  );

  const tabs = [
    { id: 'todos', label: 'Todos', count: empleados.length },
    { id: 'activos', label: 'Activos', count: activos },
    { id: 'inactivos', label: 'Inactivos', count: inactivos },
    { id: 'rol', label: 'Por rol' },
    { id: 'sucursal', label: 'Por sucursal' },
    { id: 'fecha', label: 'Por fecha' }
  ];

  const camposEmpleado = useMemo(() => {
    const camposBase = [
      { name: 'dni', label: 'DNI', placeholder: 'Ej: 45952361', required: true, type: 'number', pattern: '[0-9]*' },
      { name: 'legajo', label: 'Legajo', disabled: true, badge: 'AUTOGENERADO' },
      { name: 'fechaAsociacion', label: 'Fecha de Asociación', disabled: true, badge: 'AUTOGENERADO' },
      { name: 'nombre', label: 'Nombre', placeholder: 'Nombre del Empleado', required: true },
      { name: 'apellido', label: 'Apellido', placeholder: 'Apellido del Empleado', required: true },
      { name: 'telefono', label: 'Teléfono', placeholder: '+54 387 000-0000', required: true },
      { name: 'username', label: 'Usuario (Username)', placeholder: 'ej: juan.perez', required: true },
      { name: 'email', label: 'Email', type: 'email', placeholder: 'nombre@gmail.com', required: true },
      { name: 'rol', label: 'Rol', type: 'select', options: rolesDisponibles, required: true },
      { name: 'sucursal', label: 'Sucursal', type: 'select', options: sucursalesDisponibles, required: true },
      { name: 'hora_entrada', label: 'Hora de Entrada (Opcional)', type: 'time', required: false },
      { name: 'hora_salida', label: 'Hora de Salida (Opcional)', type: 'time', required: false }
    ];

    if (!empleadoEditando) {
      camposBase.splice(8, 0, { 
        name: 'contrasena', 
        label: 'Contraseña Inicial', 
        type: 'password', 
        placeholder: 'Mínimo 4 caracteres', 
        required: true,
        minLength: 4 
      });
    }

    return camposBase;
  }, [empleadoEditando, rolesDisponibles, sucursalesDisponibles]);

  const valoresIniciales = useMemo(() => {
    if (!empleadoEditando) {
      return { 
        legajo: siguienteLegajo,
        username: '',
        hora_entrada: '',
        hora_salida: '',
        sucursal: sucursales[0]?.Nombre || '',
        fechaAsociacion: obtenerFechaHoy(),
        contrasena: ''
      };
    }

    const { nombre, apellido } = empleadoEditando.apellido
      ? { nombre: empleadoEditando.nombre, apellido: empleadoEditando.apellido }
      : separarNombre(empleadoEditando.nombre);

    const sucObj = sucursales.find(s => s.ID_Sucursales === empleadoEditando.id_sucursal);

    return {
      legajo: empleadoEditando.legajo,
      dni: empleadoEditando.dni || '',
      nombre,
      apellido,
      telefono: empleadoEditando.telefono || '',
      username: empleadoEditando.username || '',
      email: empleadoEditando.email || '',
      rol: obtenerNombreRol(empleadoEditando.id_rol),
      sucursal: sucObj ? sucObj.Nombre : sucursales[0]?.Nombre || '',
      hora_entrada: empleadoEditando.hora_entrada || '',
      hora_salida: empleadoEditando.hora_salida || '',
      fechaAsociacion: empleadoEditando.fechaAsociacion || 'N/A'
    };
  }, [empleadoEditando, siguienteLegajo]);

  // ==========================================
  // MANEJADORES DE EVENTOS
  // ==========================================
  const abrirModalNuevo = () => {
    setEmpleadoEditando(null);
    setIsModalOpen(true);
  };

  const abrirModalEdicion = (empleado) => {
    setEmpleadoEditando(empleado);
    setIsModalOpen(true);
  };

  const cerrarModal = () => {
    if (bloquearCierreRef.current) {
      bloquearCierreRef.current = false;
      return;
    }
    setIsModalOpen(false);
    setEmpleadoEditando(null);
  };

  const abrirCambioContrasena = (empleado) => setEmpleadoClave(empleado);

  const verDetalleBaja = (empleado) => {
    showDetailAlert({
      title: `${empleado.nombre} ${empleado.apellido}`,
      details: [
        { label: 'Legajo', value: `N.° ${empleado.legajo}` },
        { label: 'DNI', value: empleado.dni }, 
        { label: 'Usuario', value: empleado.username },
        { label: 'Rol', value: obtenerNombreRol(empleado.id_rol) },
        { label: 'Sucursal', value: obtenerNombreSucursal(empleado.id_sucursal) },
        { label: 'Asociación', value: empleado.fechaAsociacion }
      ],
      description: empleado.detalleBaja || 'Este empleado fue dado de baja sin especificar un motivo detallado.'
    });
  };

  const cambiarEstado = async (empleado) => {
    const desactivar = empleado.activo;
    let motivoBaja = empleado.detalleBaja || '';
    const nombreCompleto = `${empleado.nombre} ${empleado.apellido}`;

    if (desactivar) {
      const motivo = await showConfirmInputAlert({
        title: `Motivo de baja - ${nombreCompleto}`,
        subtitle: 'Gestión de Personal',
        inputValue: empleado.detalleBaja || '',
        confirmButtonText: 'Dar de baja'
      });
      if (!motivo) return;
      motivoBaja = motivo;
    } else {
      const confirmado = await showReactivateAlert({ entity: 'empleado', name: nombreCompleto });
      if (!confirmado) return;
    }

    setEmpleados(prev => prev.map(e => 
      e.id === empleado.id 
        ? { ...e, activo: !e.activo, detalleBaja: desactivar ? motivoBaja : '' } 
        : e
    ));

    Swal.fire({
      icon: 'success',
      title: desactivar ? 'Empleado desactivado' : 'Empleado activado',
      text: `El estado de ${nombreCompleto} se actualizó correctamente.`,
      timer: 1800,
      showConfirmButton: false
    });
  };

  const crearEmpleado = (data) => {
    const rolObj = roles.find(r => r.Ocupacion === data.rol);
    const sucursalObj = sucursales.find(s => s.Nombre === data.sucursal);
    const nombreCompleto = `${data.nombre} ${data.apellido}`;

    const nuevoId = Date.now();
    const nuevoEmpleado = {
      id: nuevoId, 
      id_usuario: nuevoId + 1, 
      legajo: data.legajo,
      nombre: data.nombre,
      apellido: data.apellido,
      telefono: data.telefono,
      username: data.username, 
      email: data.email,
      dni: data.dni,
      contrasena: data.contrasena,
      id_rol: rolObj ? rolObj.ID_Roles : 1,
      id_sucursal: sucursalObj ? sucursalObj.ID_Sucursales : 1,
      hora_entrada: data.hora_entrada || '',
      hora_salida: data.hora_salida || '',
      activo: true,
      detalleBaja: '',
      fechaAsociacion: data.fechaAsociacion
    };

    setEmpleados(prev => [...prev, nuevoEmpleado]);
    Swal.fire({
      icon: 'success',
      title: '¡Empleado agregado!',
      text: `${nombreCompleto} se registró correctamente.`,
      timer: 1800,
      showConfirmButton: false
    });
  };

  const actualizarEmpleado = (data) => {
    const rolObj = roles.find(r => r.Ocupacion === data.rol);
    const sucursalObj = sucursales.find(s => s.Nombre === data.sucursal);
    const nombreCompleto = `${data.nombre} ${data.apellido}`;

    const actualizado = {
      ...empleadoEditando,
      nombre: data.nombre,
      apellido: data.apellido,
      telefono: data.telefono,
      username: data.username, 
      email: data.email,
      dni: data.dni,
      id_rol: rolObj ? rolObj.ID_Roles : 1,
      id_sucursal: sucursalObj ? sucursalObj.ID_Sucursales : 1,
      hora_entrada: data.hora_entrada || '',
      hora_salida: data.hora_salida || '',
    };

    setEmpleados(prev => prev.map(e => (e.id === actualizado.id ? actualizado : e)));
    
    Swal.fire({
      icon: 'success',
      title: '¡Empleado actualizado!',
      text: `Los datos de ${nombreCompleto} se guardaron correctamente.`,
      timer: 1800,
      showConfirmButton: false,
    });
  };

  const handleGuardarEmpleado = (data) => {
    const dniLimpio = String(data.dni).trim();
    const usernameLimpio = data.username.trim().toLowerCase();

    const dniExiste = empleados.some(
      (e) => String(e.dni) === dniLimpio && 
      (!empleadoEditando || e.id !== empleadoEditando.id)
    );

    if (dniExiste) {
      bloquearCierreRef.current = true; 
      Swal.fire({
        icon: 'warning',
        title: 'DNI duplicado',
        text: 'El número de documento (DNI) ya está registrado por otro empleado.',
        confirmButtonColor: '#326f7a',
        customClass: { container: 'swal-alto-z-index' }
      });
      return; 
    }

    const usernameExiste = datosUsuarios.some(
      (u) => u.Username.toLowerCase() === usernameLimpio && 
      (!empleadoEditando || u.ID_Usuarios !== empleadoEditando.id_usuario)
    );

    if (usernameExiste) {
      bloquearCierreRef.current = true; 
      Swal.fire({
        icon: 'warning',
        title: 'Usuario duplicado',
        text: 'El nombre de usuario (Username) ya está en uso por otro empleado. Por favor, elegí uno diferente.',
        confirmButtonColor: '#326f7a',
        customClass: { container: 'swal-alto-z-index' }
      });
      return; 
    }

    if (!empleadoEditando && data.contrasena && data.contrasena.length < 4) {
      bloquearCierreRef.current = true; 
      Swal.fire({
        icon: 'warning',
        title: 'Contraseña muy corta',
        text: 'La contraseña debe tener al menos 4 caracteres.',
        confirmButtonColor: '#326f7a',
        customClass: { container: 'swal-alto-z-index' }
      });
      return; 
    }

    if (empleadoEditando) {
      actualizarEmpleado(data);
    } else {
      crearEmpleado(data);
    }
  };

  // ==========================================
  // RENDERIZADO
  // ==========================================
  return (
    <>
      <Encabezado titulo="Empleados" subtitulo="Gestionar usuarios y permisos" />
      
      <SearchBar 
        value={busqueda} 
        onChange={setBusqueda} 
        placeholder="Buscar por legajo, DNI, nombre, usuario, correo o sucursal..." 
      />

      <FilterTabs 
        tabs={tabs} 
        activeTab={tabActiva} 
        onTabChange={(id) => {
          setTabActiva(id);
          if (id !== 'rol') setRolSeleccionado('');
          if (id !== 'sucursal') setSucursalSeleccionada('');
          if (id !== 'fecha') setFechaSeleccionada('');
        }} 
      />

      {tabActiva === 'rol' && (
        <FilterSelect
          value={rolSeleccionado}
          onChange={setRolSeleccionado}
          options={rolesDisponibles}
          placeholder="Seleccioná un rol..."
        />
      )}

      {tabActiva === 'sucursal' && (
        <FilterSelect
          value={sucursalSeleccionada}
          onChange={setSucursalSeleccionada}
          options={sucursalesDisponibles}
          placeholder="Seleccioná una sucursal..."
        />
      )}

      {tabActiva === 'fecha' && (
        <div className="filtro-fecha-container">
          <span className="label-filtro-fecha">Filtrar por fecha específica:</span>
          <input 
            type="date" 
            value={fechaSeleccionada} 
            onChange={(e) => setFechaSeleccionada(e.target.value)} 
            className="input-fecha-filtro"
          />
        </div>
      )}
      
      <GenericTable
        columnas={COLUMNAS_TABLA}
        datos={datosVisibles}
        renderFila={(empleado) => {
          const nombreCompleto = `${empleado.nombre} ${empleado.apellido}`;
          const horarioTexto = (empleado.hora_entrada && empleado.hora_salida) 
            ? `${empleado.hora_entrada} - ${empleado.hora_salida}` 
            : '-';

          return (
            <tr key={empleado.id} className="fila-empleado">
              <td className="celda-tabla-legajo">N.° {empleado.legajo}</td>
              <td className="celda-tabla-texto">{empleado.dni}</td> 
              <td className="celda-tabla-info">
                <span className="info-empleado-flex">
                  <span className="avatar-iniciales">{obtenerIniciales(nombreCompleto)}</span>
                  {nombreCompleto}
                </span>
              </td>
              <td className="celda-tabla-texto">{empleado.username}</td>
              <td className="celda-tabla-texto">{empleado.email}</td>
              <td className="celda-tabla-texto">{empleado.telefono}</td>
              <td className="celda-tabla-gris">{obtenerNombreRol(empleado.id_rol)}</td>
              <td className="celda-tabla-texto">{obtenerNombreSucursal(empleado.id_sucursal)}</td>
              <td className="celda-tabla-texto">{empleado.fechaAsociacion}</td>
              <td className="celda-tabla-texto">{horarioTexto}</td>
              <td className="celda-tabla-texto">
                <span className={`etiqueta-estado ${empleado.activo ? 'estado-activo' : 'estado-inactivo'}`}>
                  {empleado.activo ? 'Activo' : 'Inactivo'}
                </span>
              </td>
              
              <td className="celda-tabla-info">
                <span className="acciones-fila">
                  {/* CAMBIADO: Botón de info sin 'accion-info' para que se vea gris por defecto */}
                  {!empleado.activo && (
                    <button 
                      type="button"
                      onClick={() => verDetalleBaja(empleado)} 
                      className="boton-accion-icono"
                      title="Ver motivo de baja"
                      aria-label={`Ver detalle de ${nombreCompleto}`}
                    >
                      <IconInfoCircle size={18} />
                    </button>
                  )}

                  {esAdmin && (
                    <button
                      type="button"
                      className="boton-accion-icono"
                      onClick={() => abrirCambioContrasena(empleado)}
                      title="Cambiar contraseña"
                      aria-label={`Cambiar contraseña de ${nombreCompleto}`}
                    >
                      <IconKey size={18} />
                    </button>
                  )}
                  <button
                    type="button"
                    className="boton-accion-icono"
                    onClick={() => abrirModalEdicion(empleado)}
                    title="Editar empleado"
                    aria-label={`Editar ${nombreCompleto}`}
                  >
                    <IconEdit size={18} />
                  </button>
                  <button
                    type="button"
                    className={`boton-accion-icono ${empleado.activo ? 'accion-desactivar' : 'accion-activar'}`}
                    onClick={() => cambiarEstado(empleado)}
                    title={empleado.activo ? 'Desactivar empleado' : 'Activar empleado'}
                    aria-label={`${empleado.activo ? 'Desactivar' : 'Activar'} ${nombreCompleto}`}
                  >
                    <IconPower size={18} />
                  </button>
                </span>
              </td>
            </tr>
          );
        }}
      />

      {tieneMas && <LoadMoreButton onClick={cargarMas} text="Ver más empleados" />}

      <GenericFab onClick={abrirModalNuevo} title="Agregar nuevo empleado" />

      <GenericModalForm
        isOpen={isModalOpen}
        onClose={cerrarModal}
        title={empleadoEditando ? 'Editar empleado' : 'Nuevo empleado'}
        subtitle={empleadoEditando ? 'Modificá los datos del empleado y guardá los cambios.' : '¡Rellena los campos para añadir a tu nuevo empleado!'}
        fields={camposEmpleado}
        initialValues={valoresIniciales}
        onSubmit={handleGuardarEmpleado}
        submitText={empleadoEditando ? 'Guardar cambios' : 'Guardar empleado'}
      />

      <ChangePasswordModal
        isOpen={!!empleadoClave}
        onClose={() => setEmpleadoClave(null)}
        email={empleadoClave?.email || ''}
        id_usuario={empleadoClave?.id_usuario || null}
        nombre={empleadoClave ? `${empleadoClave.nombre} ${empleadoClave.apellido}` : ''}
      />
    </>
  );
}