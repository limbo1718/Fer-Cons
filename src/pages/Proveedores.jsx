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
import { showDetailAlert } from '../components/common/showDetailAlert.js';
import { showConfirmInputAlert } from '../components/common/showConfirmInputAlert.js';
import { showReactivateAlert } from '../components/common/showReactivateAlert.js';
import { usePagination } from '../hooks/usePagination.js';
import { proveedores as datos, sucursales } from '../data/mock.js';
import '../styles/Proveedores.css';

const iniciales = (nombre = '') => nombre.split(' ').slice(0, 2).map((p) => p[0] || '').join('').toUpperCase();

export default function Proveedores() {
    const [proveedores, setProveedores] = useState(
        datos.map(p => ({ 
            ...p, 
            detalleBaja: p.detalleBaja || '',
            id_sucursal: p.id_sucursal || sucursales[0]?.ID_Sucursales || 1 
        }))
    );
    const [busqueda, setBusqueda] = useState('');
    const [tabActiva, setTabActiva] = useState('todos');
    const [sucursalSeleccionada, setSucursalSeleccionada] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [proveedorEditando, setProveedorEditando] = useState(null);

    const activos = proveedores.filter((p) => p.activo).length;
    const inactivos = proveedores.filter((p) => !p.activo).length;

    // Obtener nombres de sucursales únicas basadas en su Nombre para el filtro
    const sucursalesDisponibles = useMemo(() => {
        return sucursales.map((s) => s.Nombre);
    }, []);

    const ultimoCodigo = proveedores.length > 0 ? proveedores[proveedores.length - 1].codigo : '003';
    const siguienteCodigo = String(Number(ultimoCodigo) + 1).padStart(3, '0');

    const valoresIniciales = useMemo(() => {
        if (!proveedorEditando) return { codigo: siguienteCodigo, id_sucursal: sucursales[0]?.Nombre || '' };
        const { codigo, nombreFantasia, razonSocial, cuit, telefono, email, id_sucursal } = proveedorEditando;
        const sucObj = sucursales.find(s => s.ID_Sucursales === id_sucursal);
        return { 
            codigo, 
            nombreFantasia, 
            razonSocial, 
            cuit, 
            telefono, 
            email: email || '', 
            id_sucursal: sucObj ? sucObj.Nombre : sucursales[0]?.Nombre || '' 
        };
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

    // Configuración de campos del formulario adaptada a select de opciones con nombres de sucursales
    const camposProveedor = [
        { name: 'codigo', label: 'Código', disabled: true, badge: 'AUTOGENERADO' },
        { name: 'nombreFantasia', label: 'Nombre de Fantasía', placeholder: 'Ej: Ceramica Norte', required: true },
        { name: 'razonSocial', label: 'Razón Social', placeholder: 'Ej: Ceramica Norte S.A', required: true },
        { name: 'cuit', label: 'CUIT', placeholder: '30-XXXXXXXX-X', required: true },
        { name: 'telefono', label: 'Teléfono', placeholder: '+54 387 000-0000', required: true },
        { name: 'email', label: 'Email', type: 'email', placeholder: 'nombre@gmail.com', required: true },
        { 
            name: 'id_sucursal', 
            label: 'Sucursal', 
            type: 'select', 
            options: sucursales.map(s => s.Nombre),
            required: true 
        }
    ];

    const cambiarEstado = async (p) => {
        const desactivar = p.activo;
        let motivoBaja = p.detalleBaja || '';

        if (desactivar) {
            const motivo = await showConfirmInputAlert({
                title: `Motivo de baja - ${p.nombreFantasia}`,
                subtitle: 'Gestión de Proveedores',
                inputValue: p.detalleBaja || '',
                confirmButtonText: 'Dar de baja'
            });

            if (!motivo) return;
            motivoBaja = motivo;
        } else {
            const confirmado = await showReactivateAlert({
                entity: 'proveedor',
                name: p.nombreFantasia
            });
            if (!confirmado) return;
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
        const sucEncontrada = sucursales.find(s => s.Nombre === data.id_sucursal);
        const idSucursalNum = sucEncontrada ? sucEncontrada.ID_Sucursales : 1;

        if (proveedorEditando) {
            const actualizado = {
                ...proveedorEditando,
                nombreFantasia: data.nombreFantasia,
                razonSocial: data.razonSocial,
                cuit: data.cuit,
                telefono: data.telefono,
                email: data.email,
                id_sucursal: idSucursalNum,
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
            id_sucursal: idSucursalNum,
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

    const tabs = [
        { id: 'todos', label: 'Todos', count: proveedores.length },
        { id: 'activos', label: 'Activos', count: activos },
        { id: 'inactivos', label: 'Inactivos', count: inactivos },
        { id: 'sucursal', label: 'Por sucursal' }
    ];

    const proveedoresFiltrados = proveedores.filter((p) => {
        const sucursalObj = sucursales.find(s => s.ID_Sucursales === p.id_sucursal);
        const nombreSucursal = sucursalObj ? sucursalObj.Nombre : '';

        let cumpleTab = true;
        if (tabActiva === 'activos') {
            cumpleTab = p.activo;
        } else if (tabActiva === 'inactivos') {
            cumpleTab = !p.activo;
        } else if (tabActiva === 'sucursal') {
            cumpleTab = sucursalSeleccionada ? nombreSucursal === sucursalSeleccionada : true;
        }

        const query = busqueda.toLowerCase().trim();
        const cumpleBusqueda =
            !query ||
            String(p.codigo).toLowerCase().includes(query) ||
            p.nombreFantasia.toLowerCase().includes(query) ||
            p.razonSocial.toLowerCase().includes(query) ||
            p.cuit.toLowerCase().includes(query) ||
            (p.email && p.email.toLowerCase().includes(query)) ||
            nombreSucursal.toLowerCase().includes(query);

        return cumpleTab && cumpleBusqueda;
    });

    const { datosVisibles, tieneMas, cargarMas } = usePagination(
        proveedoresFiltrados, 
        10, 
        [busqueda, tabActiva, sucursalSeleccionada]
    );

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
        
        <SearchBar 
            value={busqueda} 
            onChange={setBusqueda} 
            placeholder="Buscar por código, nombre, razón social, cuit o email..." 
        />

        <FilterTabs 
            tabs={tabs} 
            activeTab={tabActiva} 
            onTabChange={(id) => {
                setTabActiva(id);
                if (id !== 'sucursal') setSucursalSeleccionada('');
            }} 
        />

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
            renderFila={(p) => {
                const sucursalObj = sucursales.find(s => s.ID_Sucursales === p.id_sucursal);
                const nombreSucursal = sucursalObj ? sucursalObj.Nombre : 'Sin Sucursal';

                return (
                    <tr key={p.id} className="fila-empleado">
                        <td className="celda-tabla-legajo">N.° {p.codigo}</td>
                        <td className="celda-tabla-info">
                            <span className="info-empleado-flex">
                                <span className="avatar-iniciales">{iniciales(p.nombreFantasia)}</span>
                                <div className="proveedor-info-detalles">
                                    <strong>{p.nombreFantasia}</strong>
                                    <div className="proveedor-razon-social">{p.razonSocial}</div>
                                </div>
                            </span>
                        </td>
                        <td className="celda-tabla-texto">{p.cuit}</td>
                        <td className="celda-tabla-texto">{p.telefono}</td>
                        <td className="celda-tabla-gris">{p.email || '-'}</td>
                        <td className="celda-tabla-gris">{nombreSucursal}</td>
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
                );
            }}
        />

        {tieneMas && (
            <LoadMoreButton 
                onClick={cargarMas} 
                text="Ver más proveedores" 
            />
        )}

        <GenericFab 
            onClick={abrirNuevo} 
            title="Agregar nuevo proveedor" 
        />

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