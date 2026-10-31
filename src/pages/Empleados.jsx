import { useState } from 'react';
import Swal from 'sweetalert2';
import { IconPhone, IconPencil, IconPlus } from '@tabler/icons-react';
import Encabezado from '../components/Encabezado.jsx';
import GenericTable from '../components/common/GenericTable.jsx';
import SearchBar from '../components/common/SearchBar.jsx';
import FilterTabs from '../components/common/FilterTabs.jsx';
import FilterSelect from '../components/common/FilterSelect.jsx';
import GenericModalForm from '../components/common/GenericModalForm.jsx'; // <--- Componente modal genérico
import GenericFab from '../components/common/GenericFab.jsx';
import { empleados as datos } from '../data/mock.js';
import '../styles/Empleados.css';

const iniciales = (nombre) => nombre.split(' ').slice(0, 2).map((p) => p[0]).join('').toUpperCase();

export default function Empleados() {
  const [empleados, setEmpleados] = useState(datos);
  const [busqueda, setBusqueda] = useState('');
  const [tabActiva, setTabActiva] = useState('todos');
  const [rolSeleccionado, setRolSeleccionado] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para abrir/cerrar el modal genérico

  const activos = empleados.filter((e) => e.activo).length;
  const inactivos = empleados.filter((e) => !e.activo).length;

  // Extraemos dinámicamente los roles únicos de los empleados para el selector
  const rolesDisponibles = [...new Set(empleados.map((e) => e.rol))];

  // Cálculo del siguiente legajo autogenerado para el formulario de prueba
  const ultimoLegajo = empleados.length > 0 ? empleados[empleados.length - 1].legajo : '0218';
  const siguienteLegajo = String(Number(ultimoLegajo) + 1).padStart(4, '0');

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

  const justificar = async (e) => {
    const { value } = await Swal.fire({
      title: `Justificación - ${e.nombre}`,
      input: 'textarea',
      inputPlaceholder: 'Escribí el motivo...',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#4a9da8',
      inputValidator: (v) => (!v.trim() ? 'Ingresá un motivo' : null),
    });
    if (value) Swal.fire({ icon: 'success', title: 'Justificación guardada', timer: 1500, showConfirmButton: false });
  };

  const handleGuardarEmpleado = (data) => {
    const nuevoEmpleado = {
      id: Date.now(),
      legajo: data.legajo,
      nombre: `${data.nombre} ${data.apellido}`,
      telefono: data.telefono,
      email: data.email,
      dni: data.dni,
      rol: data.rol,
      sucursal: data.sucursal,
      activo: true
    };

    setEmpleados((prev) => [...prev, nuevoEmpleado]);
    Swal.fire({
      icon: 'success',
      title: '¡Empleado agregado!',
      text: `${nuevoEmpleado.nombre} se registró correctamente (modo prueba).`,
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

  // Lógica de filtrado por pestañas, rol seleccionado y barra de búsqueda
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

  // Definición de columnas de la tabla
  const columnas = [
    'Legajo', 
    'Empleado', 
    <span key="tel" className="inline-flex items-center gap-1"><IconPhone size={16} />Teléfono</span>, 
    'Rol', 
    'Sucursal', 
    'Estado', 
    'Justificación'
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
      
      {/* Tabla Genérica con datos filtrados */}
      <GenericTable
        columnas={columnas}
        datos={empleadosFiltrados}
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
              {/* Lógica condicional: El botón de justificación solo aparece si el empleado está inactivo */}
              {!e.activo ? (
                <button onClick={() => justificar(e)} className="boton-justificacion">
                  <span className="contenido-boton-justificacion">
                    <IconPencil size={16} />Justificación
                  </span>
                </button>
              ) : (
                <span className="celda-tabla-gris">-</span>
              )}
            </td>
          </tr>
        )}
      />

      {/* Botón flotante genérico para abrir el modal */}
      <GenericFab 
        onClick={() => setIsModalOpen(true)} 
        title="Agregar nuevo empleado" 
      />

      {/* Instancia del Modal Genérico para Empleados */}
      <GenericModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nuevo empleado"
        subtitle="¡Rellena los campos para añadir a tu nuevo empleado!"
        fields={camposEmpleado}
        initialValues={{ legajo: siguienteLegajo }}
        onSubmit={handleGuardarEmpleado}
        submitText="Guardar empleado"
      />
    </>
  );
}