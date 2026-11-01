import { useState } from 'react';
import Swal from 'sweetalert2';
import { IconPhone, IconPencil, IconPlus } from '@tabler/icons-react';
import Encabezado from '../components/Encabezado.jsx';
import GenericTable from '../components/common/GenericTable.jsx';
import SearchBar from '../components/common/SearchBar.jsx';
import FilterTabs from '../components/common/FilterTabs.jsx';
import FilterSelect from '../components/common/FilterSelect.jsx';
import GenericModalForm from '../components/common/GenericModalForm.jsx';
import GenericFab from '../components/common/GenericFab.jsx';
import { proveedores as datos } from '../data/mock.js';
import '../styles/Empleados.css'; // Mantenemos la consistencia de estilos compartidos

const iniciales = (nombre) => nombre.split(' ').slice(0, 2).map((p) => p[0]).join('').toUpperCase();

export default function Proveedores() {
    const [proveedores, setProveedores] = useState(datos);
    const [busqueda, setBusqueda] = useState('');
    const [tabActiva, setTabActiva] = useState('todos');
    const [sucursalSeleccionada, setSucursalSeleccionada] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const activos = proveedores.filter((p) => p.activo).length;
    const inactivos = proveedores.filter((p) => !p.activo).length;

    // Extraemos dinámicamente las sucursales únicas para el selector de filtro
    const sucursalesDisponibles = [...new Set(proveedores.map((p) => p.sucursal))];

    // Cálculo del siguiente código autogenerado
    const ultimoCodigo = proveedores.length > 0 ? proveedores[proveedores.length - 1].codigo : '003';
    const siguienteCodigo = String(Number(ultimoCodigo) + 1).padStart(3, '0');

    // Configuración de los campos obligatorios para el formulario genérico de proveedores
    const camposProveedor = [
        { name: 'codigo', label: 'Código', disabled: true, badge: 'AUTOGENERADO' },
        { name: 'nombreFantasia', label: 'Nombre de Fantasía', placeholder: 'Ej: Ceramica Norte', required: true },
        { name: 'razonSocial', label: 'Razón Social', placeholder: 'Ej: Ceramica Norte S.A', required: true },
        { name: 'cuit', label: 'CUIT', placeholder: '30-XXXXXXXX-X', required: true },
        { name: 'telefono', label: 'Teléfono', placeholder: '+54 387 000-0000', required: true },
        { name: 'email', label: 'Email', type: 'email', placeholder: 'nombre@gmail.com', required: true },
        { 
        name: 'sucursal', 
        label: 'Sucursal', 
        type: 'select', 
        options: ['Casa Central', 'Sucursal Sur', 'Depósito Norte'],
        required: true 
        }
    ];

    const justificar = async (p) => {
        const { value } = await Swal.fire({
        title: `Detalle / Motivo - ${p.nombreFantasia}`,
        input: 'textarea',
        inputPlaceholder: 'Escribí el motivo...',
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#0d9488',
        inputValidator: (v) => (!v.trim() ? 'Ingresá un motivo' : null),
        });
        if (value) Swal.fire({ icon: 'success', title: 'Información guardada', timer: 1500, showConfirmButton: false });
    };

    const handleGuardarProveedor = (data) => {
        const nuevoProveedor = {
        id: Date.now(),
        codigo: data.codigo,
        nombreFantasia: data.nombreFantasia,
        razonSocial: data.razonSocial,
        cuit: data.cuit,
        telefono: data.telefono,
        email: data.email,
        sucursal: data.sucursal,
        activo: true
        };

        setProveedores((prev) => [...prev, nuevoProveedor]);
        Swal.fire({
        icon: 'success',
        title: '¡Proveedor agregado!',
        text: `${nuevoProveedor.nombreFantasia} se registró correctamente.`,
        timer: 1800,
        showConfirmButton: false
        });
    };

    // Configuración de las pestañas de filtro superior
    const tabs = [
        { id: 'todos', label: 'Todos', count: proveedores.length },
        { id: 'activos', label: 'Activos', count: activos },
        { id: 'inactivos', label: 'Inactivos', count: inactivos },
        { id: 'sucursal', label: 'Por sucursal' }
    ];

    // Lógica de filtrado por pestañas, sucursal seleccionada y barra de búsqueda
    const proveedoresFiltrados = proveedores.filter((p) => {
        let cumpleTab = true;
        if (tabActiva === 'activos') {
        cumpleTab = p.activo;
        } else if (tabActiva === 'inactivos') {
        cumpleTab = !p.activo;
        } else if (tabActiva === 'sucursal') {
        cumpleTab = sucursalSeleccionada ? p.sucursal === sucursalSeleccionada : true;
        }

        const query = busqueda.toLowerCase().trim();
        const cumpleBusqueda =
        !query ||
        String(p.codigo).toLowerCase().includes(query) ||
        p.nombreFantasia.toLowerCase().includes(query) ||
        p.razonSocial.toLowerCase().includes(query) ||
        p.cuit.toLowerCase().includes(query) ||
        (p.email && p.email.toLowerCase().includes(query)) ||
        p.sucursal.toLowerCase().includes(query);

        return cumpleTab && cumpleBusqueda;
    });

    // Definición de columnas de la tabla de proveedores
    const columnas = [
        'Código', 
        'Proveedor', 
        'CUIT',
        <span key="tel" className="inline-flex items-center gap-1"><IconPhone size={16} />Teléfono</span>, 
        'Email',
        'Sucursal', 
        'Estado', 
        'Acción'
    ];

    return (
        <>
        <Encabezado 
            titulo="Proveedores" 
            subtitulo="Gestionar información y estado de proveedores" 
        />
        
        {/* Componente de Búsqueda */}
        <SearchBar 
            value={busqueda} 
            onChange={setBusqueda} 
            placeholder="Buscar por código, nombre, razón social, cuit o email..." 
        />

        {/* Componente de Pestañas de Filtro */}
        <FilterTabs 
            tabs={tabs} 
            activeTab={tabActiva} 
            onTabChange={(id) => {
            setTabActiva(id);
            if (id !== 'sucursal') setSucursalSeleccionada(''); // Resetea el filtro si cambia de pestaña
            }} 
        />

        {/* Selector reutilizable condicional para filtrar por sucursal */}
        {tabActiva === 'sucursal' && (
            <FilterSelect
            value={sucursalSeleccionada}
            onChange={setSucursalSeleccionada}
            options={sucursalesDisponibles}
            placeholder="Seleccioná una sucursal..."
            />
        )}
        
        {/* Tabla Genérica con datos filtrados */}
        <GenericTable
            columnas={columnas}
            datos={proveedoresFiltrados}
            renderFila={(p) => (
            <tr key={p.id} className="fila-empleado">
                <td className="celda-tabla-legajo">N.° {p.codigo}</td>
                <td className="celda-tabla-info">
                <span className="info-empleado-flex">
                    <span className="avatar-iniciales">{iniciales(p.nombreFantasia)}</span>
                    <div style={{ textAlign: 'left' }}>
                    <strong>{p.nombreFantasia}</strong>
                    <div style={{ fontSize: '0.8rem', color: 'rgba(15,42,48,0.6)' }}>{p.razonSocial}</div>
                    </div>
                </span>
                </td>
                <td className="celda-tabla-texto">{p.cuit}</td>
                <td className="celda-tabla-texto">{p.telefono}</td>
                <td className="celda-tabla-gris">{p.email || '-'}</td>
                <td className="celda-tabla-gris">{p.sucursal}</td>
                <td className="celda-tabla-texto">
                <span className={`etiqueta-estado ${p.activo ? 'estado-activo' : 'estado-inactivo'}`}>
                    {p.activo ? 'Activo' : 'Inactivo'}
                </span>
                </td>
                <td className="celda-tabla-info">
                {!p.activo ? (
                    <button onClick={() => justificar(p)} className="boton-justificacion">
                    <span className="contenido-boton-justificacion">
                        <IconPencil size={16} />Detalle
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
            title="Agregar nuevo proveedor" 
        />

        {/* Instancia del Modal Genérico para Proveedores */}
        <GenericModalForm
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Nuevo proveedor"
            subtitle="¡Rellena los campos para añadir a tu nuevo proveedor!"
            fields={camposProveedor}
            initialValues={{ codigo: siguienteCodigo }}
            onSubmit={handleGuardarProveedor}
            submitText="Guardar proveedor"
        />
        </>
    );
}