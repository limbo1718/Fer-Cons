import { useState, useMemo } from 'react';
import Swal from 'sweetalert2';
import { IconPhone, IconEdit, IconPower, IconInfoCircle, IconClock } from '@tabler/icons-react';
import Encabezado from '../components/Encabezado.jsx';
import GenericTable from '../components/common/GenericTable.jsx';
import SearchBar from '../components/common/SearchBar.jsx';
import FilterTabs from '../components/common/FilterTabs.jsx';
import FilterSelect from '../components/common/FilterSelect.jsx';
import GenericModalForm from '../components/common/GenericModalForm.jsx';
import GenericFab from '../components/common/GenericFab.jsx';
import LoadMoreButton from '../components/common/LoadMoreButton.jsx';
import { showDetailAlert } from '../components/common/showDetailAlert.js';
import { showConfirmInputAlert } from '../components/common/showConfirmInputAlert.js';
import { usePagination } from '../hooks/usePagination.js';
import { empleados as datosEmpleados, roles, sucursales } from '../data/mock.js';
import '../styles/Empleados.css';

const iniciales = (nombre = '') => nombre.split(' ').slice(0, 2).map((p) => p[0] || '').join('').toUpperCase();

const separarNombre = (completo = '') => {
  const [primero = '', ...resto] = completo.trim().split(' ');
  return { nombre: primero, apellido: resto.join(' ') };
};

export default function Empleados() {
  const [empleados, setEmpleados] = useState(
    datosEmpleados.map(e => ({
      ...e,
      hora_entrada: e.hora_entrada || '',
      hora_salida: e.hora_salida || '',
      detalleBaja: e.detalleBaja || '',
      id_sucursal: e.id_sucursal || sucursales[0]?.ID_Sucursales || 1
    }))
  );
  const [busqueda, setBusqueda] = useState('');
  const [tabActiva, setTabActiva] = useState('todos');
  const [rolSeleccionado, setRolSeleccionado] = useState('');
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [empleadoEditando, setEmpleadoEditando] = useState(null);

  // Mappers dinámicos relacionales corregidos a ID_Sucursales y Nombre
  const getNombreRol = (id_rol) => roles.find(r => r.id === Number(id_rol))?.ocupacion || 'Sin Rol';
  const getNombreSucursal = (id_sucursal) => sucursales.find(s => s.ID_Sucursales === Number(id_sucursal))?.Nombre || 'Sin Sucursal';

  const activos = empleados.filter((e) => e.activo).length;
  const inactivos = empleados.filter((e) => !e.activo).length;

  const rolesDisponibles = roles.map(r => r.ocupacion);
  const sucursalesDisponibles = sucursales.map(s => s.Nombre);

  const ultimoLegajo = empleados.length > 0 ? empleados[empleados.length - 1].legajo : '0218';
  const siguienteLegajo = String(Number(ultimoLegajo) + 1).padStart(4, '0');

  const valoresIniciales = useMemo(() => {
    if (!empleadoEditando) {
      return { 
        legajo: siguienteLegajo,
        hora_entrada: '',
        hora_salida: '',
        sucursal: sucursales[0]?.Nombre || ''
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
      email: empleadoEditando.email || '',
      rol: getNombreRol(empleadoEditando.id_rol),
      sucursal: sucObj ? sucObj.Nombre : sucursales[0]?.Nombre || '',
      hora_entrada: empleadoEditando.hora_entrada || '',
      hora_salida: empleadoEditando.hora_salida || '',
    };
  }, [empleadoEditando, siguienteLegajo]);

  const abrirNuevo = () => {
    setEmpleadoEditando(null);
    setIsModalOpen(true);
  };

  const abrirEdicion = (e) => {
    setEmpleadoEditando(e);
    setIsModalOpen(true);
  };

  const cerrarModal = () => {
    setIsModalOpen(false);
    setEmpleadoEditando(null);
  };

  const verDetalleBaja = (e) => {
    const nombreCompleto = `${e.nombre} ${e.apellido}`;

    showDetailAlert({
      title: nombreCompleto,
      details: [
        { label: 'Legajo', value: `N.° ${e.legajo}` },
        { label: 'Rol', value: getNombreRol(e.id_rol) },
        { label: 'Sucursal', value: getNombreSucursal(e.id_sucursal) }
      ],
      description: e.detalleBaja || 'Este empleado fue dado de baja sin especificar un motivo detallado.'
    });
  };

  const camposEmpleado = [
    { name: 'dni', label: 'DNI', placeholder: 'Ej: 45952361', required: true },
    { name: 'legajo', label: 'Legajo', disabled: true, badge: 'AUTOGENERADO' },
    { name: 'nombre', label: 'Nombre', placeholder: 'Nombre del Empleado', required: true },
    { name: 'apellido', label: 'Apellido', placeholder: 'Apellido del Empleado', required: true },
    { name: 'telefono', label: 'Teléfono', placeholder: '+54 387 000-0000', required: true },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'nombre@gmail.com', required: true },
    { 
      name: 'rol', 
      label: 'Rol', 
      type: 'select', 
      options: rolesDisponibles,
      required: true 
    },
    { 
      name: 'sucursal', 
      label: 'Sucursal', 
      type: 'select', 
      options: sucursalesDisponibles,
      required: true 
    },
    { 
      name: 'hora_entrada', 
      label: 'Hora de Entrada (Opcional)', 
      type: 'time', 
      required: false 
    },
    { 
      name: 'hora_salida', 
      label: 'Hora de Salida (Opcional)', 
      type: 'time', 
      required: false 
    }
  ];

  const cambiarEstado = async (e) => {
    const desactivar = e.activo;
    let motivoBaja = e.detalleBaja || '';
    const nombreCompleto = `${e.nombre} ${e.apellido}`;

    if (desactivar) {
      const motivo = await showConfirmInputAlert({
        title: `Motivo de baja - ${nombreCompleto}`,
        subtitle: 'Gestión de Personal',
        inputValue: e.detalleBaja || '',
        confirmButtonText: 'Dar de baja'
      });

      if (!motivo) return;
      motivoBaja = motivo;
    } else {
      const { isConfirmed } = await Swal.fire({
        title: '',
        html: `
          <div class="swal-reactivacion-wrapper">
            <span class="swal-reactivacion-sub">Reactivación</span>
            <h2 class="swal-reactivacion-titulo">¿Activar empleado?</h2>
            <p class="swal-reactivacion-texto">
              <strong>${nombreCompleto}</strong> pasará a estar activo nuevamente en el sistema.
            </p>
          </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Activar',
        cancelButtonText: 'Cancelar',
        buttonsStyling: false,
        width: '460px',
        padding: '2rem',
        backdrop: 'rgba(15, 42, 48, 0.65)',
        didOpen: () => {
          const confirmBtn = Swal.getConfirmButton();
          const cancelBtn = Swal.getCancelButton();
          const actions = Swal.getActions();
          if (actions) actions.className = 'swal-actions-custom';
          if (confirmBtn) confirmBtn.className = 'swal-btn-confirm-custom';
          if (cancelBtn) cancelBtn.className = 'swal-btn-cancel-custom';
        }
      });
      if (!isConfirmed) return;
    }

    setEmpleados((prev) => 
      prev.map((emp) => 
        emp.id === e.id 
          ? { ...emp, activo: !emp.activo, detalleBaja: desactivar ? motivoBaja : '' } 
          : emp
      )
    );

    Swal.fire({
      icon: 'success',
      title: desactivar ? 'Empleado desactivado' : 'Empleado activado',
      text: `El estado de ${nombreCompleto} se actualizó correctamente.`,
      timer: 1800,
      showConfirmButton: false
    });
  };

  const handleGuardarEmpleado = (data) => {
    const rolObj = roles.find(r => r.ocupacion === data.rol);
    const sucursalObj = sucursales.find(s => s.Nombre === data.sucursal);

    const id_rol = rolObj ? rolObj.id : 1;
    const id_sucursal = sucursalObj ? sucursalObj.ID_Sucursales : 1;
    const nombreCompleto = `${data.nombre} ${data.apellido}`;

    if (empleadoEditando) {
      const actualizado = {
        ...empleadoEditando,
        nombre: data.nombre,
        apellido: data.apellido,
        telefono: data.telefono,
        email: data.email,
        dni: data.dni,
        id_rol,
        id_sucursal,
        hora_entrada: data.hora_entrada || '',
        hora_salida: data.hora_salida || '',
      };
      setEmpleados((prev) => prev.map((emp) => (emp.id === actualizado.id ? actualizado : emp)));
      Swal.fire({
        icon: 'success',
        title: '¡Empleado actualizado!',
        text: `Los datos de ${nombreCompleto} se guardaron correctamente.`,
        timer: 1800,
        showConfirmButton: false,
      });
      return;
    }

    const nuevoEmpleado = {
      id: Date.now(),
      legajo: data.legajo,
      nombre: data.nombre,
      apellido: data.apellido,
      telefono: data.telefono,
      email: data.email,
      dni: data.dni,
      id_rol,
      id_sucursal,
      hora_entrada: data.hora_entrada || '',
      hora_salida: data.hora_salida || '',
      activo: true,
      detalleBaja: ''
    };

    setEmpleados((prev) => [...prev, nuevoEmpleado]);
    Swal.fire({
      icon: 'success',
      title: '¡Empleado agregado!',
      text: `${nombreCompleto} se registró correctamente.`,
      timer: 1800,
      showConfirmButton: false
    });
  };

  const tabs = [
    { id: 'todos', label: 'Todos', count: empleados.length },
    { id: 'activos', label: 'Activos', count: activos },
    { id: 'inactivos', label: 'Inactivos', count: inactivos },
    { id: 'rol', label: 'Por rol' },
    { id: 'sucursal', label: 'Por sucursal' }
  ];

  const empleadosFiltrados = empleados.filter((e) => {
    const nombreCompleto = `${e.nombre} ${e.apellido}`.toLowerCase();
    const nombreRol = getNombreRol(e.id_rol).toLowerCase();
    const nombreSucursal = getNombreSucursal(e.id_sucursal).toLowerCase();

    let cumpleTab = true;
    if (tabActiva === 'activos') {
      cumpleTab = e.activo;
    } else if (tabActiva === 'inactivos') {
      cumpleTab = !e.activo;
    } else if (tabActiva === 'rol') {
      cumpleTab = rolSeleccionado ? nombreRol === rolSeleccionado.toLowerCase() : true;
    } else if (tabActiva === 'sucursal') {
      cumpleTab = sucursalSeleccionada ? nombreSucursal === sucursalSeleccionada.toLowerCase() : true;
    }

    const query = busqueda.toLowerCase().trim();
    const cumpleBusqueda =
      !query ||
      String(e.legajo).toLowerCase().includes(query) ||
      nombreCompleto.includes(query) ||
      nombreSucursal.includes(query) ||
      (e.dni && e.dni.toLowerCase().includes(query));

    return cumpleTab && cumpleBusqueda;
  });

  const { datosVisibles, tieneMas, cargarMas } = usePagination(
    empleadosFiltrados, 
    10, 
    [busqueda, tabActiva, rolSeleccionado, sucursalSeleccionada]
  );

  const columnas = [
    'Legajo', 
    'Empleado', 
    <span key="tel" className="inline-flex items-center gap-1"><IconPhone size={16} />Teléfono</span>, 
    'Rol', 
    'Sucursal', 
    <span key="hor" className="inline-flex items-center gap-1"><IconClock size={16} />Horario</span>,
    'Estado', 
    'Justificación',
    'Acciones'
  ];

  return (
    <>
      <Encabezado 
        titulo="Empleados" 
        subtitulo="Gestionar usuarios y permisos" 
      />
      
      <SearchBar 
        value={busqueda} 
        onChange={setBusqueda} 
        placeholder="Buscar por legajo, nombre, DNI o sucursal..." 
      />

      <FilterTabs 
        tabs={tabs} 
        activeTab={tabActiva} 
        onTabChange={(id) => {
          setTabActiva(id);
          if (id !== 'rol') setRolSeleccionado('');
          if (id !== 'sucursal') setSucursalSeleccionada('');
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
      
      <GenericTable
        columnas={columnas}
        datos={datosVisibles}
        renderFila={(e) => {
          const nombreCompleto = `${e.nombre} ${e.apellido}`;
          const rolTexto = getNombreRol(e.id_rol);
          const sucursalTexto = getNombreSucursal(e.id_sucursal);
          const horarioTexto = (e.hora_entrada && e.hora_salida) 
            ? `${e.hora_entrada} - ${e.hora_salida}` 
            : '-';

          return (
            <tr key={e.id} className="fila-empleado">
              <td className="celda-tabla-legajo">N.° {e.legajo}</td>
              <td className="celda-tabla-info">
                <span className="info-empleado-flex">
                  <span className="avatar-iniciales">{iniciales(nombreCompleto)}</span>
                  {nombreCompleto}
                </span>
              </td>
              <td className="celda-tabla-texto">{e.telefono}</td>
              <td className="celda-tabla-gris">{rolTexto}</td>
              <td className="celda-tabla-texto">{sucursalTexto}</td>
              <td className="celda-tabla-texto">{horarioTexto}</td>
              <td className="celda-tabla-texto">
                <span className={`etiqueta-estado ${e.activo ? 'estado-activo' : 'estado-inactivo'}`}>
                  {e.activo ? 'Activo' : 'Inactivo'}
                </span>
              </td>
              <td className="celda-tabla-info">
                {!e.activo ? (
                  <button 
                    type="button"
                    onClick={() => verDetalleBaja(e)} 
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
                  <button
                    type="button"
                    className="boton-accion-icono"
                    onClick={() => abrirEdicion(e)}
                    title="Editar empleado"
                    aria-label={`Editar ${nombreCompleto}`}
                  >
                    <IconEdit size={18} />
                  </button>
                  <button
                    type="button"
                    className={`boton-accion-icono ${e.activo ? 'accion-desactivar' : 'accion-activar'}`}
                    onClick={() => cambiarEstado(e)}
                    title={e.activo ? 'Desactivar empleado' : 'Activar empleado'}
                    aria-label={`${e.activo ? 'Desactivar' : 'Activar'} ${nombreCompleto}`}
                  >
                    <IconPower size={18} />
                  </button>
                </span>
              </td>
            </tr>
          );
        }}
      />

      {tieneMas && (
        <LoadMoreButton 
          onClick={cargarMas} 
          text="Ver más empleados" 
        />
      )}

      <GenericFab 
        onClick={abrirNuevo} 
        title="Agregar nuevo empleado" 
      />

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
    </>
  );
}