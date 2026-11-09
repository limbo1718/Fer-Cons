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
import { showConfirmInputAlert } from '../components/common/showConfirmInputAlert.js'; // Helper compartido de confirmación con input
import { usePagination } from '../hooks/usePagination.js';
import { proveedores as datos } from '../data/mock.js';
import '../styles/Proveedores.css';

const iniciales = (nombre) => nombre.split(' ').slice(0, 2).map((p) => p[0]).join('').toUpperCase();

export default function Proveedores() {
    const [proveedores, setProveedores] = useState(
        datos.map(p => ({ ...p, detalleBaja: p.detalleBaja || '' }))
    );
    const [busqueda, setBusqueda] = useState('');
    const [tabActiva, setTabActiva] = useState('todos');
    const [sucursalSeleccionada, setSucursalSeleccionada] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [proveedorEditando, setProveedorEditando] = useState(null); // null = modo "nuevo"

    const activos = proveedores.filter((p) => p.activo).length;
    const inactivos = proveedores.filter((p) => !p.activo).length;

    // Extraemos dinámicamente las sucursales únicas para el selector de filtro
    const sucursalesDisponibles = [...new Set(proveedores.map((p) => p.sucursal))];

    // Cálculo del siguiente código autogenerado
    const ultimoCodigo = proveedores.length > 0 ? proveedores[proveedores.length - 1].codigo : '003';
    const siguienteCodigo = String(Number(ultimoCodigo) + 1).padStart(3, '0');

    // Valores con los que se abre el modal: datos del proveedor (editar) o código nuevo (agregar)
    const valoresIniciales = useMemo(() => {
        if (!proveedorEditando) return { codigo: siguienteCodigo };
        const { codigo, nombreFantasia, razonSocial, cuit, telefono, email, sucursal } = proveedorEditando;
        return { codigo, nombreFantasia, razonSocial, cuit, telefono, email: email || '', sucursal };
    }, [proveedorEditando, siguienteCodigo]);

    const abrirNuevo = () => {
        setProveedorEditando(null);
        setIsModalOpen(true);
    };

    const abrirEdicion = (p) => {
        setProveedorEditando(p);
        setIsModalOpen(true);
    };

    const cerrarModal = () => {
        setIsModalOpen(false);
        setProveedorEditando(null);
    };

    // Función para mostrar el motivo de la baja usando el modal unificado de detalles
    const verDetalleBaja = (p) => {
        showDetailAlert({
            title: p.nombreFantasia,
            details: [
                { label: 'Razón Social', value: p.razonSocial },
                { label: 'CUIT', value: p.cuit }
            ],
            description: p.detalleBaja || 'Este proveedor fue dado de baja sin especificar un motivo detallado.'
        });
    };

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

    const cambiarEstado = async (p) => {
        const desactivar = p.activo;
        let motivoBaja = p.detalleBaja || '';

        // Si va a pasar a inactivo, solicitamos el motivo mediante el helper unificado
        if (desactivar) {
            const motivo = await showConfirmInputAlert({
                title: `Motivo de baja - ${p.nombreFantasia}`,
                subtitle: 'Gestión de Proveedores',
                inputValue: p.detalleBaja || '',
                confirmButtonText: 'Dar de baja'
            });

            if (!motivo) return; // Si canceló o cerró, no hace nada
            motivoBaja = motivo;
        } else {
            // Si se va a activar, confirmamos con el diseño corporativo simétrico
            const { isConfirmed } = await Swal.fire({
                title: '',
                html: `
                    <div style="text-align: center; font-family: inherit; padding: 0.5rem 0;">
                        <span style="font-size: 0.75rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700; display: block; margin-bottom: 0.25rem;">
                            Reactivación
                        </span>
                        <h2 style="margin: 0 0 0.75rem 0; color: #0f2a30; font-size: 1.25rem; font-weight: 600;">
                            ¿Activar proveedor?
                        </h2>
                        <p style="margin: 0; color: #475569; font-size: 0.95rem;">
                            <strong>${p.nombreFantasia}</strong> pasará a estar activo nuevamente en el sistema.
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

                    if (actions) {
                        actions.style.display = 'flex';
                        actions.style.gap = '0.75rem';
                        actions.style.marginTop = '1rem';
                    }

                    if (confirmBtn) {
                        confirmBtn.style.backgroundColor = '#0d9488';
                        confirmBtn.style.color = '#ffffff';
                        confirmBtn.style.border = 'none';
                        confirmBtn.style.borderRadius = '0.5rem';
                        confirmBtn.style.padding = '0.65rem 1.25rem';
                        confirmBtn.style.fontSize = '0.9rem';
                        confirmBtn.style.fontWeight = '600';
                        confirmBtn.style.cursor = 'pointer';
                        confirmBtn.style.boxShadow = 'none';
                    }

                    if (cancelBtn) {
                        cancelBtn.style.backgroundColor = '#f1f5f9';
                        cancelBtn.style.color = '#334155';
                        cancelBtn.style.border = '1px solid #cbd5e1';
                        cancelBtn.style.borderRadius = '0.5rem';
                        cancelBtn.style.padding = '0.65rem 1.25rem';
                        cancelBtn.style.fontSize = '0.9rem';
                        cancelBtn.style.fontWeight = '600';
                        cancelBtn.style.cursor = 'pointer';
                        cancelBtn.style.boxShadow = 'none';
                    }
                }
            });
            if (!isConfirmed) return;
        }

        setProveedores((prev) => 
            prev.map((prov) => 
                prov.id === p.id 
                    ? { ...prov, activo: !prov.activo, detalleBaja: desactivar ? motivoBaja : '' } 
                    : prov
            )
        );

        Swal.fire({
            icon: 'success',
            title: desactivar ? 'Proveedor desactivado' : 'Proveedor activado',
            text: `El estado de ${p.nombreFantasia} se actualizó correctamente.`,
            timer: 1800,
            showConfirmButton: false
        });
    };

    const handleGuardarProveedor = (data) => {
        // Modo edición: actualiza el proveedor existente en lugar de agregar uno nuevo
        if (proveedorEditando) {
            const actualizado = {
                ...proveedorEditando,
                nombreFantasia: data.nombreFantasia,
                razonSocial: data.razonSocial,
                cuit: data.cuit,
                telefono: data.telefono,
                email: data.email,
                sucursal: data.sucursal,
            };
            setProveedores((prev) => prev.map((prov) => (prov.id === actualizado.id ? actualizado : prov)));
            Swal.fire({
                icon: 'success',
                title: '¡Proveedor actualizado!',
                text: `Los datos de ${actualizado.nombreFantasia} se guardaron correctamente.`,
                timer: 1800,
                showConfirmButton: false
            });
            return;
        }

        const nuevoProveedor = {
            id: Date.now(),
            codigo: data.codigo,
            nombreFantasia: data.nombreFantasia,
            razonSocial: data.razonSocial,
            cuit: data.cuit,
            telefono: data.telefono,
            email: data.email,
            sucursal: data.sucursal,
            activo: true,
            detalleBaja: ''
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

    // Aplicamos el hook de paginación progresiva (bloques de 10)
    const { datosVisibles, tieneMas, cargarMas } = usePagination(
        proveedoresFiltrados, 
        10, 
        [busqueda, tabActiva, sucursalSeleccionada]
    );

    // Definición de columnas de la tabla de proveedores
    const columnas = [
        'Código', 
        'Proveedor', 
        'CUIT',
        <span key="tel" className="inline-flex items-center gap-1"><IconPhone size={16} />Teléfono</span>, 
        'Email',
        'Sucursal', 
        'Estado', 
        'Detalle',
        'Acciones'
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
        
        {/* Tabla Genérica con datos filtrados (ahora usando datosVisibles) */}
        <GenericTable
            columnas={columnas}
            datos={datosVisibles}
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
                            <button 
                                type="button" 
                                onClick={() => verDetalleBaja(p)} 
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
                                onClick={() => abrirEdicion(p)}
                                title="Editar proveedor"
                                aria-label={`Editar ${p.nombreFantasia}`}
                            >
                                <IconEdit size={18} />
                            </button>
                            <button
                                type="button"
                                className={`boton-accion-icono ${p.activo ? 'accion-desactivar' : 'accion-activar'}`}
                                onClick={() => cambiarEstado(p)}
                                title={p.activo ? 'Desactivar proveedor' : 'Activar proveedor'}
                                aria-label={`${p.activo ? 'Desactivar' : 'Activar'} ${p.nombreFantasia}`}
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
                text="Ver más proveedores" 
            />
        )}

        {/* Botón flotante genérico para abrir el modal */}
        <GenericFab 
            onClick={abrirNuevo} 
            title="Agregar nuevo proveedor" 
        />

        {/* Instancia del Modal Genérico para Proveedores */}
        <GenericModalForm
            isOpen={isModalOpen}
            onClose={cerrarModal}
            title={proveedorEditando ? 'Editar proveedor' : 'Nuevo proveedor'}
            subtitle={proveedorEditando ? 'Modificá los datos del proveedor y guardá los cambios.' : '¡Rellena los campos para añadir a tu nuevo proveedor!'}
            fields={camposProveedor}
            initialValues={valoresIniciales}
            onSubmit={handleGuardarProveedor}
            submitText={proveedorEditando ? 'Guardar cambios' : 'Guardar proveedor'}
        />
        </>
    );
}