import { useState, useMemo, useRef } from 'react';
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
import { 
    proveedores as datosProveedores, 
    proveedores_x_sucursales as datosProveedoresXSucursales, 
    sucursales 
} from '../data/mock.js';
import '../styles/Proveedores.css';

const iniciales = (nombre = '') => nombre.split(' ').slice(0, 2).map((p) => p[0] || '').join('').toUpperCase();

// Función para cruzar proveedores con sus sucursales
const mapearProveedoresRelacionales = () => {
    return datosProveedores.map(prov => {
        // Buscamos la sucursal activa en la tabla intermedia
        const relacionSucursal = datosProveedoresXSucursales.find(r => r.ID_Proveedores === prov.ID_Proveedores && r.Estado);

        return {
            id: prov.ID_Proveedores,
            cuit: prov.CUIT,
            nombre: prov.Nombre,
            razonSocial: prov.Razon_Social,
            contacto: prov.Contacto,
            email: prov.Email_Prov,
            activo: prov.Estado_Prov,
            detalleBaja: '', // Mantenemos el estado para la UI
            id_sucursal: relacionSucursal ? relacionSucursal.ID_Sucursales : null
        };
    });
};

export default function Proveedores() {
    // Estado inicial con el JOIN ya hecho
    const [proveedores, setProveedores] = useState(mapearProveedoresRelacionales);
    const [busqueda, setBusqueda] = useState('');
    const [tabActiva, setTabActiva] = useState('todos');
    const [sucursalSeleccionada, setSucursalSeleccionada] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [proveedorEditando, setProveedorEditando] = useState(null);
    
    // Ref para bloquear el cierre del modal si hay error de validación
    const bloquearCierreRef = useRef(false);

    const activos = proveedores.filter((p) => p.activo).length;
    const inactivos = proveedores.filter((p) => !p.activo).length;

    // Obtener nombres de sucursales para el filtro
    const sucursalesDisponibles = useMemo(() => {
        return sucursales.map((s) => s.Nombre);
    }, []);

    const valoresIniciales = useMemo(() => {
        if (!proveedorEditando) {
            return { id_sucursal: sucursales[0]?.Nombre || '' };
        }
        
        const { nombre, razonSocial, cuit, contacto, email, id_sucursal } = proveedorEditando;
        const sucObj = sucursales.find(s => s.ID_Sucursales === id_sucursal);
        
        return { 
            nombre: nombre || '',
            razonSocial: razonSocial || '', 
            cuit: cuit || '', 
            contacto: contacto || '', 
            email: email || '', 
            id_sucursal: sucObj ? sucObj.Nombre : sucursales[0]?.Nombre || '' 
        };
    }, [proveedorEditando]);

    const abrirNuevo = () => {
        setProveedorEditando(null);
        setIsModalOpen(true);
    };

    const abrirEdicion = (p) => {
        setProveedorEditando(p);
        setIsModalOpen(true);
    };

    const cerrarModal = () => {
        if (bloquearCierreRef.current) {
            bloquearCierreRef.current = false;
            return;
        }
        setIsModalOpen(false);
        setProveedorEditando(null);
    };

    const verDetalleBaja = (p) => {
        showDetailAlert({
            title: p.nombre,
            details: [
                { label: 'Razón Social', value: p.razonSocial },
                { label: 'CUIT', value: p.cuit }
            ],
            description: p.detalleBaja || 'Este proveedor fue dado de baja sin especificar un motivo detallado.'
        });
    };

    // Configuración de campos adaptados al DER (sin código)
    const camposProveedor = [
        { name: 'nombre', label: 'Nombre', placeholder: 'Ej: Ceramica Norte', required: true },
        { name: 'razonSocial', label: 'Razón Social', placeholder: 'Ej: Ceramica Norte S.A', required: true },
        { name: 'cuit', label: 'CUIT', placeholder: '30-XXXXXXXX-X', required: true },
        { name: 'contacto', label: 'Contacto', placeholder: '+54 387 000-0000', required: true },
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
                title: `Motivo de baja - ${p.nombre}`,
                subtitle: 'Gestión de Proveedores',
                inputValue: p.detalleBaja || '',
                confirmButtonText: 'Dar de baja'
            });

            if (!motivo) return;
            motivoBaja = motivo;
        } else {
            const confirmado = await showReactivateAlert({
                entity: 'proveedor',
                name: p.nombre
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
            text: `El estado de ${p.nombre} se actualizó correctamente.`,
            timer: 1800,
            showConfirmButton: false
        });
    };

    const handleGuardarProveedor = (data) => {
        const sucEncontrada = sucursales.find(s => s.Nombre === data.id_sucursal);
        const idSucursalNum = sucEncontrada ? sucEncontrada.ID_Sucursales : 1;
        const cuitLimpio = data.cuit.trim();

        // VALIDACIÓN: CUIT duplicado
        const cuitExiste = proveedores.some(
            (p) => p.cuit.trim() === cuitLimpio && (!proveedorEditando || p.id !== proveedorEditando.id)
        );

        if (cuitExiste) {
            bloquearCierreRef.current = true;
            Swal.fire({
                icon: 'warning',
                title: 'CUIT duplicado',
                text: 'El CUIT ingresado ya está registrado por otro proveedor.',
                confirmButtonColor: '#326f7a',
                customClass: { container: 'swal-alto-z-index' }
            });
            return;
        }

        if (proveedorEditando) {
            const actualizado = {
                ...proveedorEditando,
                nombre: data.nombre,
                razonSocial: data.razonSocial,
                cuit: data.cuit,
                contacto: data.contacto,
                email: data.email,
                id_sucursal: idSucursalNum,
            };
            setProveedores((prev) => prev.map((prov) => (prov.id === actualizado.id ? actualizado : prov)));
            Swal.fire({
                icon: 'success',
                title: '¡Proveedor actualizado!',
                text: `Los datos de ${actualizado.nombre} se guardaron correctamente.`,
                timer: 1800,
                showConfirmButton: false
            });
            return;
        }

        const nuevoProveedor = {
            id: Date.now(), // Simula ID_Proveedores
            nombre: data.nombre,
            razonSocial: data.razonSocial,
            cuit: data.cuit,
            contacto: data.contacto,
            email: data.email,
            id_sucursal: idSucursalNum,
            activo: true,
            detalleBaja: ''
        };

        setProveedores((prev) => [...prev, nuevoProveedor]);
        Swal.fire({
            icon: 'success',
            title: '¡Proveedor agregado!',
            text: `${nuevoProveedor.nombre} se registró correctamente.`,
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
            p.nombre.toLowerCase().includes(query) ||
            p.razonSocial.toLowerCase().includes(query) ||
            p.cuit.toLowerCase().includes(query) ||
            (p.contacto && p.contacto.toLowerCase().includes(query)) ||
            (p.email && p.email.toLowerCase().includes(query)) ||
            nombreSucursal.toLowerCase().includes(query);

        return cumpleTab && cumpleBusqueda;
    });

    const { datosVisibles, tieneMas, cargarMas } = usePagination(
        proveedoresFiltrados, 
        10, 
        [busqueda, tabActiva, sucursalSeleccionada]
    );

    // MODIFICADO: Quitamos la columna 'Justificación'
    const columnas = [
        'Proveedor', 
        'Razón Social',
        'CUIT',
        <span key="tel" className="columna-con-icono"><IconPhone size={16} />Contacto</span>, 
        'Email',
        'Sucursal', 
        'Estado', 
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
            placeholder="Buscar por nombre, razón social, cuit o email..." 
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
                        <td className="celda-tabla-info">
                            <span className="info-empleado-flex">
                                <span className="avatar-iniciales">{iniciales(p.nombre)}</span>
                                <div className="proveedor-info-detalles">
                                    <strong>{p.nombre}</strong>
                                </div>
                            </span>
                        </td>
                        <td className="celda-tabla-gris">{p.razonSocial}</td>
                        <td className="celda-tabla-texto">{p.cuit}</td>
                        <td className="celda-tabla-texto">{p.contacto}</td>
                        <td className="celda-tabla-gris">{p.email || '-'}</td>
                        <td className="celda-tabla-gris">{nombreSucursal}</td>
                        <td className="celda-tabla-texto">
                            <span className={`etiqueta-estado ${p.activo ? 'estado-activo' : 'estado-inactivo'}`}>
                                {p.activo ? 'Activo' : 'Inactivo'}
                            </span>
                        </td>
                        
                        {/* MODIFICADO: Botón de info movido a Acciones, condicionado y sin clase extra */}
                        <td className="celda-tabla-info">
                            <span className="acciones-fila">
                                {!p.activo && (
                                    <button 
                                        type="button" 
                                        onClick={() => verDetalleBaja(p)} 
                                        className="boton-accion-icono"
                                        title="Ver motivo de baja"
                                        aria-label={`Ver detalle de ${p.nombre}`}
                                    >
                                        <IconInfoCircle size={18} />
                                    </button>
                                )}
                                
                                <button
                                    type="button"
                                    className="boton-accion-icono"
                                    onClick={() => abrirEdicion(p)}
                                    title="Editar proveedor"
                                    aria-label={`Editar ${p.nombre}`}
                                >
                                    <IconEdit size={18} />
                                </button>
                                <button
                                    type="button"
                                    className={`boton-accion-icono ${p.activo ? 'accion-desactivar' : 'accion-activar'}`}
                                    onClick={() => cambiarEstado(p)}
                                    title={p.activo ? 'Desactivar proveedor' : 'Activar proveedor'}
                                    aria-label={`${p.activo ? 'Desactivar' : 'Activar'} ${p.nombre}`}
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