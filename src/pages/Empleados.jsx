import { useState, useMemo, useRef } from 'react';
import Swal from 'sweetalert2';
import { IconPhone, IconEdit, IconPower, IconInfoCircle, IconClock, IconKey } from '@tabler/icons-react';
import Encabezado from '../components/Encabezado.jsx';
import GenericTable from '../components/common/GenericTable.jsx';
import SearchBar from '../components/common/SearchBar.jsx';
import FilterTabs from '../components/common/FilterTabs.jsx';
import FilterSelect from '../components/common/FilterSelect.jsx';
import GenericModalForm from '../components/common/GenericModalForm.jsx';
import ChangePasswordModal from '../components/common/ChangePasswordModal.jsx'; // NUEVO
import GenericFab from '../components/common/GenericFab.jsx';
import LoadMoreButton from '../components/common/LoadMoreButton.jsx';
import { showDetailAlert } from '../components/common/showDetailAlert.js';
import { showConfirmInputAlert } from '../components/common/showConfirmInputAlert.js';
import { showReactivateAlert } from '../components/common/showReactivateAlert.js';
import { usePagination } from '../hooks/usePagination.js';
import { useAuth } from '../context/AuthContext.jsx';
import { 
  usuarios as datosUsuarios, 
  roles, 
  sucursales, 
  usuarios_x_roles, 
  sucursales_x_usuarios 
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

const mapearUsuariosRelacionales = () => {
  return datosUsuarios.map(usu => {
    const rolData = usuarios_x_roles.find(ur => ur.ID_Usuarios === usu.ID_Usuarios && ur.Estado) 
                  || usuarios_x_roles.find(ur => ur.ID_Usuarios === usu.ID_Usuarios);

    const sucursalData = sucursales_x_usuarios.find(su => su.ID_Usuarios === usu.ID_Usuarios && su.Estado)
                      || sucursales_x_usuarios.find(su => su.ID_Usuarios === usu.ID_Usuarios);

    return {
      id: usu.ID_Usuarios,
      dni: usu.DNI_Usuarios,
      legajo: usu.Legajo,
      nombre: usu.Nombre,
      apellido: usu.Apellido,
      email: usu.Email,
      telefono: usu.Telefono,
      contrasena: usu.Contrasena,
      activo: usu.Estado,
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
  <span key="tel" className="columna-con-icono"><IconPhone size={16} />Teléfono</span>, 
  'Rol', 
  'Sucursal', 
  'Asociación',
  <span key="hor" className="columna-con-icono"><IconClock size={16} />Horario</span>,
  'Estado', 
  'Justificación',
  'Acciones'
];

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================
export default function Empleados() {
  const { user } = useAuth(); 
  
  const esAdmin = user?.rol === 'Administrador';

  const [usuarios, setUsuarios] = useState(mapearUsuariosRelacionales);
  const [busqueda, setBusqueda] = useState('');
  const [tabActiva, setTabActiva] = useState('todos');
  const [rolSeleccionado, setRolSeleccionado] = useState('');
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState('');
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [usuarioClave, setUsuarioClave] = useState(null); // NUEVO
  
  const bloquearCierreRef = useRef(false);

  // Valores derivados
  const activos = useMemo(() => usuarios.filter(u => u.activo).length, [usuarios]);
  const inactivos = useMemo(() => usuarios.filter(u => !u.activo).length, [usuarios]);
  
  const rolesDisponibles = useMemo(() => roles.map(r => r.Ocupacion), []);
  const sucursalesDisponibles = useMemo(() => sucursales.map(s => s.Nombre), []);

  const siguienteLegajo = useMemo(() => {
    const maxLegajo = usuarios.length > 0 
      ? Math.max(...usuarios.map(u => Number(u.legajo) || 0)) 
      : LEGAJO_BASE;
    return String(maxLegajo + 1).padStart(4, '0');
  }, [usuarios]);

  const usuariosFiltrados = useMemo(() => {
    return usuarios.filter((usuario) => {
      const nombreCompleto = `${usuario.nombre} ${usuario.apellido}`.toLowerCase();
      const nombreRol = obtenerNombreRol(usuario.id_rol).toLowerCase();
      const nombreSucursal = obtenerNombreSucursal(usuario.id_sucursal).toLowerCase();
      const query = busqueda.toLowerCase().trim();

      let cumpleTab = true;
      if (tabActiva === 'activos') cumpleTab = usuario.activo;
      else if (tabActiva === 'inactivos') cumpleTab = !usuario.activo;
      else if (tabActiva === 'rol') cumpleTab = rolSeleccionado ? nombreRol === rolSeleccionado.toLowerCase() : true;
      else if (tabActiva === 'sucursal') cumpleTab = sucursalSeleccionada ? nombreSucursal === sucursalSeleccionada.toLowerCase() : true;
      else if (tabActiva === 'fecha') {
        if (fechaSeleccionada) {
          const [year, month, day] = fechaSeleccionada.split('-');
          const fechaFormateada = `${day}/${month}/${year}`;
          cumpleTab = usuario.fechaAsociacion === fechaFormateada;
        } else {
          cumpleTab = true;
        }
      }

      const cumpleBusqueda = !query ||
        String(usuario.legajo).toLowerCase().includes(query) ||
        nombreCompleto.includes(query) ||
        nombreSucursal.includes(query) ||
        (usuario.dni && String(usuario.dni).toLowerCase().includes(query));

      return cumpleTab && cumpleBusqueda;
    });
  }, [usuarios, busqueda, tabActiva, rolSeleccionado, sucursalSeleccionada, fechaSeleccionada]);

  const { datosVisibles, tieneMas, cargarMas } = usePagination(
    usuariosFiltrados, 
    ITEMS_POR_PAGINA, 
    [usuariosFiltrados]
  );

  const tabs = [
    { id: 'todos', label: 'Todos', count: usuarios.length },
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
      { name: 'email', label: 'Email', type: 'email', placeholder: 'nombre@gmail.com', required: true },
      { name: 'rol', label: 'Rol', type: 'select', options: rolesDisponibles, required: true },
      { name: 'sucursal', label: 'Sucursal', type: 'select', options: sucursalesDisponibles, required: true },
      { name: 'hora_entrada', label: 'Hora de Entrada (Opcional)', type: 'time', required: false },
      { name: 'hora_salida', label: 'Hora de Salida (Opcional)', type: 'time', required: false }
    ];

    if (!usuarioEditando) {
      camposBase.splice(7, 0, { 
        name: 'contrasena', 
        label: 'Contraseña Inicial', 
        type: 'password', 
        placeholder: 'Mínimo 4 caracteres', 
        required: true,
        minLength: 4 
      });
    }

    return camposBase;
  }, [usuarioEditando, rolesDisponibles, sucursalesDisponibles]);

  const valoresIniciales = useMemo(() => {
    if (!usuarioEditando) {
      return { 
        legajo: siguienteLegajo,
        hora_entrada: '',
        hora_salida: '',
        sucursal: sucursales[0]?.Nombre || '',
        fechaAsociacion: obtenerFechaHoy(),
        contrasena: ''
      };
    }

    const { nombre, apellido } = usuarioEditando.apellido
      ? { nombre: usuarioEditando.nombre, apellido: usuarioEditando.apellido }
      : separarNombre(usuarioEditando.nombre);

    const sucObj = sucursales.find(s => s.ID_Sucursales === usuarioEditando.id_sucursal);

    return {
      legajo: usuarioEditando.legajo,
      dni: usuarioEditando.dni || '',
      nombre,
      apellido,
      telefono: usuarioEditando.telefono || '',
      email: usuarioEditando.email || '',
      rol: obtenerNombreRol(usuarioEditando.id_rol),
      sucursal: sucObj ? sucObj.Nombre : sucursales[0]?.Nombre || '',
      hora_entrada: usuarioEditando.hora_entrada || '',
      hora_salida: usuarioEditando.hora_salida || '',
      fechaAsociacion: usuarioEditando.fechaAsociacion || 'N/A'
    };
  }, [usuarioEditando, siguienteLegajo]);

  // ==========================================
  // MANEJADORES DE EVENTOS
  // ==========================================
  const abrirModalNuevo = () => {
    setUsuarioEditando(null);
    setIsModalOpen(true);
  };

  const abrirModalEdicion = (usuario) => {
    setUsuarioEditando(usuario);
    setIsModalOpen(true);
  };

  const cerrarModal = () => {
    if (bloquearCierreRef.current) {
      bloquearCierreRef.current = false;
      return;
    }
    setIsModalOpen(false);
    setUsuarioEditando(null);
  };

  // NUEVO: Abre el modal de contraseña
  const abrirCambioContrasena = (usuario) => setUsuarioClave(usuario);

  const verDetalleBaja = (usuario) => {
    showDetailAlert({
      title: `${usuario.nombre} ${usuario.apellido}`,
      details: [
        { label: 'Legajo', value: `N.° ${usuario.legajo}` },
        { label: 'DNI', value: usuario.dni }, 
        { label: 'Rol', value: obtenerNombreRol(usuario.id_rol) },
        { label: 'Sucursal', value: obtenerNombreSucursal(usuario.id_sucursal) },
        { label: 'Asociación', value: usuario.fechaAsociacion }
      ],
      description: usuario.detalleBaja || 'Este empleado fue dado de baja sin especificar un motivo detallado.'
    });
  };

  const cambiarEstado = async (usuario) => {
    const desactivar = usuario.activo;
    let motivoBaja = usuario.detalleBaja || '';
    const nombreCompleto = `${usuario.nombre} ${usuario.apellido}`;

    if (desactivar) {
      const motivo = await showConfirmInputAlert({
        title: `Motivo de baja - ${nombreCompleto}`,
        subtitle: 'Gestión de Personal',
        inputValue: usuario.detalleBaja || '',
        confirmButtonText: 'Dar de baja'
      });
      if (!motivo) return;
      motivoBaja = motivo;
    } else {
      const confirmado = await showReactivateAlert({ entity: 'empleado', name: nombreCompleto });
      if (!confirmado) return;
    }

    setUsuarios(prev => prev.map(u => 
      u.id === usuario.id 
        ? { ...u, activo: !u.activo, detalleBaja: desactivar ? motivoBaja : '' } 
        : u
    ));

    Swal.fire({
      icon: 'success',
      title: desactivar ? 'Empleado desactivado' : 'Empleado activado',
      text: `El estado de ${nombreCompleto} se actualizó correctamente.`,
      timer: 1800,
      showConfirmButton: false
    });
  };

  const crearUsuario = (data) => {
    const rolObj = roles.find(r => r.Ocupacion === data.rol);
    const sucursalObj = sucursales.find(s => s.Nombre === data.sucursal);
    const nombreCompleto = `${data.nombre} ${data.apellido}`;

    const nuevoUsuario = {
      id: Date.now(),
      legajo: data.legajo,
      nombre: data.nombre,
      apellido: data.apellido,
      telefono: data.telefono,
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

    setUsuarios(prev => [...prev, nuevoUsuario]);
    Swal.fire({
      icon: 'success',
      title: '¡Empleado agregado!',
      text: `${nombreCompleto} se registró correctamente.`,
      timer: 1800,
      showConfirmButton: false
    });
  };

  const actualizarUsuario = (data) => {
    const rolObj = roles.find(r => r.Ocupacion === data.rol);
    const sucursalObj = sucursales.find(s => s.Nombre === data.sucursal);
    const nombreCompleto = `${data.nombre} ${data.apellido}`;

    const actualizado = {
      ...usuarioEditando,
      nombre: data.nombre,
      apellido: data.apellido,
      telefono: data.telefono,
      email: data.email,
      dni: data.dni,
      id_rol: rolObj ? rolObj.ID_Roles : 1,
      id_sucursal: sucursalObj ? sucursalObj.ID_Sucursales : 1,
      hora_entrada: data.hora_entrada || '',
      hora_salida: data.hora_salida || '',
    };

    setUsuarios(prev => prev.map(u => (u.id === actualizado.id ? actualizado : u)));
    
    Swal.fire({
      icon: 'success',
      title: '¡Empleado actualizado!',
      text: `Los datos de ${nombreCompleto} se guardaron correctamente.`,
      timer: 1800,
      showConfirmButton: false,
    });
  };

  const handleGuardarUsuario = (data) => {
    // VALIDACIÓN DE CONTRASEÑA CORTA CON SWEETALERT
    if (!usuarioEditando && data.contrasena && data.contrasena.length < 4) {
      bloquearCierreRef.current = true; 
      
      Swal.fire({
        icon: 'warning',
        title: 'Contraseña muy corta',
        text: 'La contraseña debe tener al menos 4 caracteres.',
        confirmButtonColor: '#326f7a',
        customClass: {
          container: 'swal-alto-z-index' 
        }
      });
      return; 
    }

    if (usuarioEditando) {
      actualizarUsuario(data);
    } else {
      crearUsuario(data);
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
        placeholder="Buscar por legajo, DNI, nombre o sucursal..." 
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
        renderFila={(usuario) => {
          const nombreCompleto = `${usuario.nombre} ${usuario.apellido}`;
          const horarioTexto = (usuario.hora_entrada && usuario.hora_salida) 
            ? `${usuario.hora_entrada} - ${usuario.hora_salida}` 
            : '-';

          return (
            <tr key={usuario.id} className="fila-empleado">
              <td className="celda-tabla-legajo">N.° {usuario.legajo}</td>
              <td className="celda-tabla-texto">{usuario.dni}</td> 
              <td className="celda-tabla-info">
                <span className="info-empleado-flex">
                  <span className="avatar-iniciales">{obtenerIniciales(nombreCompleto)}</span>
                  {nombreCompleto}
                </span>
              </td>
              <td className="celda-tabla-texto">{usuario.telefono}</td>
              <td className="celda-tabla-gris">{obtenerNombreRol(usuario.id_rol)}</td>
              <td className="celda-tabla-texto">{obtenerNombreSucursal(usuario.id_sucursal)}</td>
              <td className="celda-tabla-texto">{usuario.fechaAsociacion}</td>
              <td className="celda-tabla-texto">{horarioTexto}</td>
              <td className="celda-tabla-texto">
                <span className={`etiqueta-estado ${usuario.activo ? 'estado-activo' : 'estado-inactivo'}`}>
                  {usuario.activo ? 'Activo' : 'Inactivo'}
                </span>
              </td>
              <td className="celda-tabla-info">
                {!usuario.activo ? (
                  <button 
                    type="button"
                    onClick={() => verDetalleBaja(usuario)} 
                    className="boton-justificacion"
                    title="Ver motivo de baja"
                  >
                    <span className="contenido-boton-justificacion">
                      <IconInfoCircle size={16} />Detalle
                    </span>
                  </button>
                ) : (
                  <span className="celda-tabla-gris">-</span>
                )}
              </td>
              <td className="celda-tabla-info">
                <span className="acciones-fila">
                  {esAdmin && (
                    <button
                      type="button"
                      className="boton-accion-icono"
                      // NUEVO: Llama a la función del modal
                      onClick={() => abrirCambioContrasena(usuario)}
                      title="Cambiar contraseña"
                      aria-label={`Cambiar contraseña de ${nombreCompleto}`}
                    >
                      <IconKey size={18} />
                    </button>
                  )}
                  <button
                    type="button"
                    className="boton-accion-icono"
                    onClick={() => abrirModalEdicion(usuario)}
                    title="Editar empleado"
                    aria-label={`Editar ${nombreCompleto}`}
                  >
                    <IconEdit size={18} />
                  </button>
                  <button
                    type="button"
                    className={`boton-accion-icono ${usuario.activo ? 'accion-desactivar' : 'accion-activar'}`}
                    onClick={() => cambiarEstado(usuario)}
                    title={usuario.activo ? 'Desactivar empleado' : 'Activar empleado'}
                    aria-label={`${usuario.activo ? 'Desactivar' : 'Activar'} ${nombreCompleto}`}
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
        title={usuarioEditando ? 'Editar empleado' : 'Nuevo empleado'}
        subtitle={usuarioEditando ? 'Modificá los datos del empleado y guardá los cambios.' : '¡Rellena los campos para añadir a tu nuevo empleado!'}
        fields={camposEmpleado}
        initialValues={valoresIniciales}
        onSubmit={handleGuardarUsuario}
        submitText={usuarioEditando ? 'Guardar cambios' : 'Guardar empleado'}
      />

      {/* NUEVO: Modal de Cambiar Contraseña */}
      <ChangePasswordModal
        isOpen={!!usuarioClave}
        onClose={() => setUsuarioClave(null)}
        email={usuarioClave?.email || ''}
        nombre={usuarioClave ? `${usuarioClave.nombre} ${usuarioClave.apellido}` : ''}
      />
    </>
  );
}