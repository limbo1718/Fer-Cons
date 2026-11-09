import { useState, useMemo } from 'react';
import Swal from 'sweetalert2';
import { IconPhone, IconEdit, IconPower, IconInfoCircle } from '@tabler/icons-react';
import Encabezado from '../components/Encabezado.jsx';
import GenericTable from '../components/common/GenericTable.jsx';
import SearchBar from '../components/common/SearchBar.jsx';
import FilterTabs from '../components/common/FilterTabs.jsx';
import FilterSelect from '../components/common/FilterSelect.jsx';
import GenericModalForm from '../components/common/GenericModalForm.jsx';
import GenericFab from '../components/common/GenericFab.jsx';
import LoadMoreButton from '../components/common/LoadMoreButton.jsx';
import { showDetailAlert } from '../components/common/showDetailAlert.js'; // Helper compartido de detalles
import { usePagination } from '../hooks/usePagination.js';
import { empleados as datos } from '../data/mock.js';
import '../styles/Empleados.css';

const iniciales = (nombre) => nombre.split(' ').slice(0, 2).map((p) => p[0]).join('').toUpperCase();

// Separa "Daniel Pérez Ruiz" en nombre ("Daniel") y apellido ("Pérez Ruiz") para precargar el formulario
const separarNombre = (completo = '') => {
  const [primero = '', ...resto] = completo.trim().split(' ');
  return { nombre: primero, apellido: resto.join(' ') };
};

export default function Empleados() {
  const [empleados, setEmpleados] = useState(
    datos.map(e => ({ ...e, detalleBaja: e.detalleBaja || '' }))
  );
  const [busqueda, setBusqueda] = useState('');
  const [tabActiva, setTabActiva] = useState('todos');
  const [rolSeleccionado, setRolSeleccionado] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [empleadoEditando, setEmpleadoEditando] = useState(null); // null = modo "nuevo"

  const activos = empleados.filter((e) => e.activo).length;
  const inactivos = empleados.filter((e) => !e.activo).length;

  // Extraemos dinámicamente los roles únicos de los empleados para el selector
  const rolesDisponibles = [...new Set(empleados.map((e) => e.rol))];

  // Cálculo del siguiente legajo autogenerado para el formulario de prueba
  const ultimoLegajo = empleados.length > 0 ? empleados[empleados.length - 1].legajo : '0218';
  const siguienteLegajo = String(Number(ultimoLegajo) + 1).padStart(4, '0');

  // Valores con los que se abre el modal: datos del empleado (editar) o legajo nuevo (agregar)
  const valoresIniciales = useMemo(() => {
    if (!empleadoEditando) return { legajo: siguienteLegajo };
    const { nombre, apellido } = empleadoEditando.apellido
      ? { nombre: empleadoEditando.nombrePila, apellido: empleadoEditando.apellido }
      : separarNombre(empleadoEditando.nombre);
    return {
      legajo: empleadoEditando.legajo,
      dni: empleadoEditando.dni || '',
      nombre,
      apellido,
      telefono: empleadoEditando.telefono,
      email: empleadoEditando.email || '',
      rol: empleadoEditando.rol,
      sucursal: empleadoEditando.sucursal,
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

  // Función para mostrar el motivo de la baja usando el modal unificado de detalles
  const verDetalleBaja = (e) => {
    showDetailAlert({
      title: e.nombre,
      details: [
        { label: 'Legajo', value: `N.° ${e.legajo}` },
        { label: 'Rol', value: e.rol },
        { label: 'Sucursal', value: e.sucursal }
      ],
      description: e.detalleBaja || 'Este empleado fue dado de baja sin especificar un motivo detallado.'
    });
  };

  // Configuración de los campos obligatorios para el formulario genérico de empleados
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
      options: ['Vendedor', 'Cajero', 'Encargado de Stock', 'Repositor', 'Administrador', 'Supervisor'],
      required: true 
    },
    { 
      name: 'sucursal', 
      label: 'Sucursal', 
      type: 'select', 
      options: ['Casa Central', 'Sucursal Sur', 'Depósito Norte'],
      required: true 
    }
  ];

  const cambiarEstado = async (e) => {
    const desactivar = e.activo;
    let motivoBaja = e.detalleBaja || '';

    if (desactivar) {
      const { value, isDismissed } = await Swal.fire({
        title: `Motivo de baja - ${e.nombre}`,
        input: 'textarea',
        inputPlaceholder: 'Escribí detalladamente el motivo de la baja...',
        inputValue: e.detalleBaja || '',
        showCancelButton: true,
        confirmButtonText: 'Dar de baja',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#0d9488',
        inputValidator: (v) => (!v.trim() ? 'Debes ingresar un motivo de baja' : null),
        backdrop: 'rgba(15, 42, 48, 0.65)'
      });

      if (isDismissed) return;
      motivoBaja = value;
    } else {
      const { isConfirmed } = await Swal.fire({
        icon: 'question',
        title: '¿Activar empleado?',
        text: `${e.nombre} pasará a estar activo.`,
        showCancelButton: true,
        confirmButtonText: 'Activar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#0d9488',
        backdrop: 'rgba(15, 42, 48, 0.65)'
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
      text: `El estado de ${e.nombre} se actualizó correctamente.`,
      timer: 1800,
      showConfirmButton: false
    });
  };

  const handleGuardarEmpleado = (data) => {
    // Modo edición: actualiza el empleado existente en lugar de agregar uno nuevo
    if (empleadoEditando) {
      const actualizado = {
        ...empleadoEditando,
        nombre: `${data.nombre} ${data.apellido}`,
        nombrePila: data.nombre,
        apellido: data.apellido,
        telefono: data.telefono,
        email: data.email,
        dni: data.dni,
        rol: data.rol,
        sucursal: data.sucursal,
      };
      setEmpleados((prev) => prev.map((emp) => (emp.id === actualizado.id ? actualizado : emp)));
      Swal.fire({
        icon: 'success',
        title: '¡Empleado actualizado!',
        text: `Los datos de ${actualizado.nombre} se guardaron correctamente.`,
        timer: 1800,
        showConfirmButton: false,
      });
      return;
    }

    const nuevoEmpleado = {
      id: Date.now(),
      legajo: data.legajo,
      nombre: `${data.nombre} ${data.apellido}`,
      nombrePila: data.nombre,
      apellido: data.apellido,
      telefono: data.telefono,
      email: data.email,
      dni: data.dni,
      rol: data.rol,
      sucursal: data.sucursal,
      activo: true,
      detalleBaja: ''
    };

    setEmpleados((prev) => [...prev, nuevoEmpleado]);
    Swal.fire({
      icon: 'success',
      title: '¡Empleado agregado!',
      text: `${nuevoEmpleado.nombre} se registró correctamente.`,
      timer: 1800,
      showConfirmButton: false
    });
  };

  // Configuración de las pestañas de filtro superior
  const tabs = [
    { id: 'todos', label: 'Todos', count: empleados.length },
    { id: 'activos', label: 'Activos', count: activos },
    { id: 'inactivos', label: 'Inactivos', count: inactivos },
    { id: 'rol', label: 'Por rol' }
  ];

  // 1. Lógica de filtrado por pestañas, rol seleccionado y barra de búsqueda
  const empleadosFiltrados = empleados.filter((e) => {
    let cumpleTab = true;
    if (tabActiva === 'activos') {
      cumpleTab = e.activo;
    } else if (tabActiva === 'inactivos') {
      cumpleTab = !e.activo;
    } else if (tabActiva === 'rol') {
      cumpleTab = rolSeleccionado ? e.rol === rolSeleccionado : true;
    }

    const query = busqueda.toLowerCase().trim();
    const cumpleBusqueda =
      !query ||
      String(e.legajo).toLowerCase().includes(query) ||
      e.nombre.toLowerCase().includes(query) ||
      e.sucursal.toLowerCase().includes(query);

    return cumpleTab && cumpleBusqueda;
  });

  // 2. Aplicamos el hook de paginación progresiva (bloques de 10)
  const { datosVisibles, tieneMas, cargarMas } = usePagination(
    empleadosFiltrados, 
    10, 
    [busqueda, tabActiva, rolSeleccionado]
  );

  // Definición de columnas de la tabla
  const columnas = [
    'Legajo', 
    'Empleado', 
    <span key="tel" className="inline-flex items-center gap-1"><IconPhone size={16} />Teléfono</span>, 
    'Rol', 
    'Sucursal', 
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
      
      {/* Componente de Búsqueda */}
      <SearchBar 
        value={busqueda} 
        onChange={setBusqueda} 
        placeholder="Buscar por legajo, nombre o sucursal..." 
      />

      {/* Componente de Pestañas de Filtro */}
      <FilterTabs 
        tabs={tabs} 
        activeTab={tabActiva} 
        onTabChange={(id) => {
          setTabActiva(id);
          if (id !== 'rol') setRolSeleccionado(''); // Resetea el rol si se cambia de pestaña
        }} 
      />

      {/* Selector reutilizable condicional para filtrar por rol cuando la pestaña activa es 'rol' */}
      {tabActiva === 'rol' && (
        <FilterSelect
          value={rolSeleccionado}
          onChange={setRolSeleccionado}
          options={rolesDisponibles}
          placeholder="Seleccioná un rol..."
        />
      )}
      
      {/* Tabla Genérica con datos filtrados (ahora usando datosVisibles) */}
      <GenericTable
        columnas={columnas}
        datos={datosVisibles}
        renderFila={(e) => (
          <tr key={e.id} className="fila-empleado">
            <td className="celda-tabla-legajo">N.° {e.legajo}</td>
            <td className="celda-tabla-info">
              <span className="info-empleado-flex">
                <span className="avatar-iniciales">{iniciales(e.nombre)}</span>
                {e.nombre}
              </span>
            </td>
            <td className="celda-tabla-texto">{e.telefono}</td>
            <td className="celda-tabla-gris">{e.rol}</td>
            <td className="celda-tabla-texto">{e.sucursal}</td>
            <td className="celda-tabla-texto">
              <span className={`etiqueta-estado ${e.activo ? 'estado-activo' : 'estado-inactivo'}`}>
                {e.activo ? 'Activo' : 'Inactivo'}
              </span>
            </td>
            <td className="celda-tabla-info">
              {/* Lógica condicional: El botón de detalle solo aparece si el empleado está inactivo */}
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
                  aria-label={`Editar ${e.nombre}`}
                >
                  <IconEdit size={18} />
                </button>
                <button
                  type="button"
                  className={`boton-accion-icono ${e.activo ? 'accion-desactivar' : 'accion-activar'}`}
                  onClick={() => cambiarEstado(e)}
                  title={e.activo ? 'Desactivar empleado' : 'Activar empleado'}
                  aria-label={`${e.activo ? 'Desactivar' : 'Activar'} ${e.nombre}`}
                >
                  <IconPower size={18} />
                </button>
              </span>
            </td>
          </tr>
        )}
      />

      {/* Botón "Ver más" condicional */}
      {tieneMas && (
        <LoadMoreButton 
          onClick={cargarMas} 
          text="Ver más empleados" 
        />
      )}

      {/* Botón flotante genérico para abrir el modal */}
      <GenericFab 
        onClick={abrirNuevo} 
        title="Agregar nuevo empleado" 
      />

      {/* Instancia del Modal Genérico para Empleados */}
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