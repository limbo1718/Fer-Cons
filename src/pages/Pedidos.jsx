import { useState } from 'react';
import Swal from 'sweetalert2';
import { IconPhone, IconBox, IconEye, IconEdit, IconPower } from '@tabler/icons-react';
import Encabezado from '../components/Encabezado.jsx';
import SearchBar from '../components/common/SearchBar.jsx';
import FilterTabs from '../components/common/FilterTabs.jsx';
import GenericFab from '../components/common/GenericFab.jsx';
import LoadMoreButton from '../components/common/LoadMoreButton.jsx';
import { usePagination } from '../hooks/usePagination.js';
import { pedidos as datosPedidos } from '../data/mock.js';
import '../styles/Pedidos.css';

const iniciales = (nombre) => nombre.split(' ').slice(0, 2).map((p) => p[0]).join('').toUpperCase();

export default function Pedidos() {
    const [pedidos, setPedidos] = useState(datosPedidos);
    const [busqueda, setBusqueda] = useState('');
    const [tabActiva, setTabActiva] = useState('todos');
    const [fechaFiltro, setFechaFiltro] = useState('');
    
    // Estado para el modal de detalle del pedido
    const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);

    // Contadores para pestañas
    const totalPedidos = pedidos.length;
    const entregadosCount = pedidos.filter((p) => p.estado === 'Entregado').length;
    const enEsperaCount = pedidos.filter((p) => p.estado === 'En espera').length;

    // Configuración de Pestañas
    const tabs = [
        { id: 'todos', label: 'Todos', count: totalPedidos },
        { id: 'entregados', label: 'Entregados', count: entregadosCount },
        { id: 'en_espera', label: 'En espera', count: enEsperaCount },
        { id: 'por_fecha', label: 'Por fecha' }
    ];

    // Lógica de Filtrado
    const pedidosFiltrados = pedidos.filter((p) => {
        let cumpleTab = true;
        if (tabActiva === 'entregados') {
            cumpleTab = p.estado === 'Entregado';
        } else if (tabActiva === 'en_espera') {
            cumpleTab = p.estado === 'En espera';
        } else if (tabActiva === 'por_fecha') {
            cumpleTab = fechaFiltro ? p.fecha === fechaFiltro : true;
        }

        const query = busqueda.toLowerCase().trim();
        const cumpleBusqueda =
            !query ||
            p.proveedor.toLowerCase().includes(query) ||
            p.numeroPedido.toLowerCase().includes(query) ||
            p.numeroProveedor.toLowerCase().includes(query);

        return cumpleTab && cumpleBusqueda;
    });

    // Paginación progresiva
    const { datosVisibles, tieneMas, cargarMas } = usePagination(
        pedidosFiltrados, 
        5, 
        [busqueda, tabActiva, fechaFiltro]
    );

    const abrirDetalle = (pedido) => {
        setPedidoSeleccionado(pedido);
    };

    const cerrarDetalle = () => {
        setPedidoSeleccionado(null);
    };

    // Función para manejar la edición / modificación de un pedido
    const abrirEdicionPedido = (p) => {
        Swal.fire({
            title: `Modificar pedido N.º ${p.numeroPedido}`,
            text: `Aquí podrás actualizar los datos del pedido para ${p.proveedor}.`,
            icon: 'info',
            confirmButtonColor: '#0d9488',
            confirmButtonText: 'Entendido'
        });
    };

    // Función para cambiar el estado del pedido (Entregado <-> En espera)
    const cambiarEstadoPedido = async (p) => {
        const nuevoEstado = p.estado === 'Entregado' ? 'En espera' : 'Entregado';
        const { isConfirmed } = await Swal.fire({
            icon: 'question',
            title: '¿Cambiar estado del pedido?',
            text: `El pedido N.º ${p.numeroPedido} pasará a estar "${nuevoEstado}".`,
            showCancelButton: true,
            confirmButtonText: 'Sí, cambiar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#0d9488',
        });
        
        if (!isConfirmed) return;

        setPedidos((prev) => 
            prev.map((item) => (item.id === p.id ? { ...item, estado: nuevoEstado } : item))
        );

        Swal.fire({
            icon: 'success',
            title: '¡Estado actualizado!',
            timer: 1400,
            showConfirmButton: false
        });
    };

    return (
        <div className="contenedor-pedidos-page">
            <Encabezado 
                titulo="Pedidos" 
                subtitulo="Gestión y seguimiento de pedidos a proveedores" 
            />
            
            {/* Buscador */}
            <SearchBar 
                value={busqueda} 
                onChange={setBusqueda} 
                placeholder="Buscar por proveedor o numero de pedido..." 
            />

            {/* Pestañas de Filtro */}
            <FilterTabs 
                tabs={tabs} 
                activeTab={tabActiva} 
                onTabChange={(id) => {
                    setTabActiva(id);
                    if (id !== 'por_fecha') setFechaFiltro('');
                }} 
            />

            {/* Selector de fecha condicional centrado y estilizado */}
            {tabActiva === 'por_fecha' && (
                <div className="filtro-fecha-container">
                    <span className="label-filtro-fecha">Filtrar por fecha específica:</span>
                    <input 
                        type="date" 
                        value={fechaFiltro} 
                        onChange={(e) => setFechaFiltro(e.target.value)} 
                        className="input-fecha-filtro"
                    />
                </div>
            )}

            {/* Listado de Tarjetas de Pedidos */}
            <div className="lista-tarjetas-pedidos">
                {datosVisibles.length > 0 ? (
                    datosVisibles.map((p) => (
                        <div key={p.id} className="tarjeta-pedido">
                            <div className="tarjeta-pedido-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div className="tarjeta-proveedor-info">
                                    <span className="avatar-iniciales-pedido">{iniciales(p.proveedor)}</span>
                                    <div>
                                        <strong>Proveedor: {p.proveedor}</strong>
                                        <div className="sub-texto-pedido">N.º Proveedor: {p.numeroProveedor}</div>
                                        <div className="sub-texto-pedido">Pedido N.º: {p.numeroPedido}</div>
                                    </div>
                                </div>
                                {/* Fecha visible a simple vista en la tarjeta */}
                                <div className="fecha-tarjeta-pedido" style={{ fontSize: '0.8rem', fontWeight: '600', color: '#0f766e', background: '#f0fdfa', padding: '0.3rem 0.6rem', borderRadius: '0.5rem', border: '1px solid #ccfbf1', whiteSpace: 'nowrap' }}>
                                        {p.fecha}
                                </div>
                            </div>

                            <div className="tarjeta-pedido-body">
                                <div className="info-bloque">
                                    <span className="label-tel">TELÉFONO PROVEEDOR</span>
                                    <div className="telefono-flex">
                                        <IconPhone size={16} /> {p.telefono}
                                    </div>
                                </div>
                                <div className="info-bloque text-right">
                                    <span className="label-tel">Destino</span>
                                    <div className="destino-texto">{p.destino}</div>
                                </div>
                            </div>

                            <div className="tarjeta-pedido-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    <span className={`etiqueta-estado-pedido ${p.estado === 'Entregado' ? 'estado-entregado' : 'estado-espera'}`}>
                                        <span className="punto-estado"></span> {p.estado}
                                    </span>
                                    <button className="boton-detalle-pedido" onClick={() => abrirDetalle(p)}>
                                        <IconEye size={16} /> Detalle
                                    </button>
                                </div>

                                {/* Acciones de fila (Modificar y Cambiar Estado) */}
                                <span className="acciones-fila" style={{ display: 'flex', gap: '0.4rem' }}>
                                    <button
                                        type="button"
                                        className="boton-accion-icono"
                                        onClick={() => abrirEdicionPedido(p)}
                                        title="Modificar pedido"
                                        aria-label={`Modificar pedido ${p.numeroPedido}`}
                                        style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '0.4rem', padding: '0.4rem', cursor: 'pointer', display: 'grid', placeItems: 'center', color: '#0f2a30' }}
                                    >
                                        <IconEdit size={16} />
                                    </button>
                                    <button
                                        type="button"
                                        className="boton-accion-icono"
                                        onClick={() => cambiarEstadoPedido(p)}
                                        title={p.estado === 'Entregado' ? 'Marcar en espera' : 'Marcar entregado'}
                                        aria-label="Cambiar estado del pedido"
                                        style={{ background: p.estado === 'Entregado' ? '#fee2e2' : '#bbf7d0', border: 'none', borderRadius: '0.4rem', padding: '0.4rem', cursor: 'pointer', display: 'grid', placeItems: 'center', color: p.estado === 'Entregado' ? '#991b1b' : '#166534' }}
                                    >
                                        <IconPower size={16} />
                                    </button>
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="sin-resultados">No se encontraron pedidos registrados.</p>
                )}
            </div>

            {tieneMas && (
                <LoadMoreButton onClick={cargarMas} text="Ver más pedidos" />
            )}

            {/* Botón Flotante para Crear Pedido */}
            <GenericFab 
                onClick={() => Swal.fire({
                    icon: 'info',
                    title: 'Nuevo Pedido',
                    text: 'Aquí se abrirá el formulario para seleccionar proveedor y productos de la tabla intermedia.',
                    confirmButtonColor: '#0d9488'
                })} 
                title="Crear nuevo pedido" 
            />

            {/* Modal de Detalle del Pedido */}
            {pedidoSeleccionado && (
                <div className="modal-overlay-detalle">
                    <div className="modal-detalle-contenido">
                        <button className="boton-volver-modal" onClick={cerrarDetalle}>
                            ← Volver
                        </button>
                        
                        <div className="modal-proveedor-header">
                            <h3>Proveedor</h3>
                            <div className="proveedor-caja-seleccionada">
                                    {pedidoSeleccionado.proveedor}
                            </div>
                        </div>

                        <div className="lista-productos-detalle">
                            {pedidoSeleccionado.detalles.map((item, index) => (
                                <div key={index} className="producto-item-fila">
                                    <div className="icono-producto-caja">
                                        <IconBox size={20} />
                                    </div>
                                    <div className="producto-item-info">
                                        <strong>{item.producto}</strong>
                                        <div>Precio unidad: ${item.precioUnidad.toLocaleString()}</div>
                                        <div>Cantidad: {item.cantidad} bultos</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="modal-detalle-total">
                            <span>TOTAL :</span>
                            <span className="monto-total-caja">
                                ${pedidoSeleccionado.detalles.reduce((acc, curr) => acc + (curr.precioUnidad * curr.cantidad), 0).toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}