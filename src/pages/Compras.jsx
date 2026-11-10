import { useState, useMemo } from 'react';
import Swal from 'sweetalert2';
import { IconPhone, IconBox, IconEye, IconEdit, IconPower, IconCreditCard, IconX } from '@tabler/icons-react';
import Encabezado from '../components/Encabezado.jsx';
import SearchBar from '../components/common/SearchBar.jsx';
import FilterTabs from '../components/common/FilterTabs.jsx';
import FilterSelect from '../components/common/FilterSelect.jsx';
import GenericFab from '../components/common/GenericFab.jsx';
import LoadMoreButton from '../components/common/LoadMoreButton.jsx';
import OrderEditModal from '../components/common/OrderEditModal.jsx';
import OrderCreateModal from '../components/common/OrderCreateModal.jsx';
import { usePagination } from '../hooks/usePagination.js';
import { compras as datosCompras, productos as catalogoGeneralProductos, cajas, sucursales } from '../data/mock.js';
import '../styles/Compras.css';

const iniciales = (nombre) => nombre.split(' ').slice(0, 2).map((p) => p[0]).join('').toUpperCase();

// Caja que realizó la compra y sucursal a la que pertenece esa caja
const getCaja = (c) => cajas.find((x) => x.id_cajas === c.id_cajas);
const getSucursal = (c) => {
    const caja = getCaja(c);
    return sucursales.find((s) => s.id === (caja ? caja.id_sucursales : c.id_sucursal));
};

const opcionesSucursales = sucursales.map((s) => ({ value: String(s.id), label: s.nombre }));

export default function Compras() {
    const [compras, setCompras] = useState(
        datosCompras.map((c) => ({ ...c, id: c.id_compras, fecha: c.fecha_compra.slice(0, 10) }))
    );
    const [busqueda, setBusqueda] = useState('');
    const [tabActiva, setTabActiva] = useState('todos');
    const [fechaFiltro, setFechaFiltro] = useState('');
    const [sucursalFiltro, setSucursalFiltro] = useState('');
    
    // Estado para el modal de detalle de la compra
    const [compraSeleccionada, setCompraSeleccionada] = useState(null);

    // Estado para el modal reutilizable de edición (OrderEditModal)
    const [compraEditando, setCompraEditando] = useState(null);

    // Estado para el modal de creación de nueva compra (OrderCreateModal)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // Contadores para pestañas
    const totalCompras = compras.length;
    const entregadosCount = compras.filter((c) => c.estado === 'Entregado').length;
    const enEsperaCount = compras.filter((c) => c.estado === 'En espera').length;

    // Cálculo dinámico del siguiente número de compra/pedido
    const siguienteNumeroCompra = useMemo(() => {
        if (compras.length === 0) return '571';
        const ultimoNum = parseInt(compras[0].numeroPedido, 10);
        return isNaN(ultimoNum) ? '571' : String(ultimoNum + 1);
    }, [compras]);

    // Configuración de Pestañas
    const tabs = [
        { id: 'todos', label: 'Todos', count: totalCompras },
        { id: 'entregados', label: 'Entregados', count: entregadosCount },
        { id: 'en_espera', label: 'En espera', count: enEsperaCount },
        { id: 'por_fecha', label: 'Por fecha' },
        { id: 'por_sucursal', label: 'Por sucursal' }
    ];

    // Lógica de Filtrado
    const comprasFiltradas = compras.filter((c) => {
        let cumpleTab = true;
        if (tabActiva === 'entregados') {
            cumpleTab = c.estado === 'Entregado';
        } else if (tabActiva === 'en_espera') {
            cumpleTab = c.estado === 'En espera';
        } else if (tabActiva === 'por_fecha') {
            cumpleTab = fechaFiltro ? c.fecha === fechaFiltro : true;
        } else if (tabActiva === 'por_sucursal') {
            const suc = getSucursal(c);
            cumpleTab = sucursalFiltro ? String(suc ? suc.id : '') === sucursalFiltro : true;
        }

        const query = busqueda.toLowerCase().trim();
        const cumpleBusqueda =
            !query ||
            c.proveedor.toLowerCase().includes(query) ||
            c.numeroPedido.toLowerCase().includes(query) ||
            c.numeroProveedor.toLowerCase().includes(query);

        return cumpleTab && cumpleBusqueda;
    });

    // Paginación progresiva configurada de 10 en 10
    const { datosVisibles, tieneMas, cargarMas } = usePagination(
        comprasFiltradas, 
        10, 
        [busqueda, tabActiva, fechaFiltro, sucursalFiltro]
    );

    const abrirDetalle = (compra) => {
        setCompraSeleccionada(compra);
    };

    const cerrarDetalle = () => {
        setCompraSeleccionada(null);
    };

    // Función para manejar la apertura del modal de edición con validación de estado
    const abrirEdicionCompra = (c) => {
        if (c.estado === 'Entregado') {
            Swal.fire({
                icon: 'warning',
                title: 'No se puede modificar',
                text: `La compra N.º ${c.numeroPedido} ya figura como "Entregado" y no admite modificaciones.`,
                confirmButtonColor: '#0d9488',
                confirmButtonText: 'Entendido'
            });
            return;
        }

        setCompraEditando(c);
    };

    // Función para actualizar la compra modificada en el estado global
    const handleGuardarCompraEditada = (compraActualizada) => {
        setCompras((prev) =>
            prev.map((item) => (item.id === compraActualizada.id ? compraActualizada : item))
        );

        Swal.fire({
            icon: 'success',
            title: '¡Compra actualizada!',
            text: `Los cambios en la compra N.º ${compraActualizada.numeroPedido} se guardaron correctamente.`,
            timer: 1800,
            showConfirmButton: false
        });
    };

    // Función para guardar la nueva compra creada
    const handleGuardarNuevaCompra = (nuevaCompra) => {
        setCompras((prev) => [nuevaCompra, ...prev]);

        Swal.fire({
            icon: 'success',
            title: '¡Compra creada!',
            text: `La compra N.º ${nuevaCompra.numeroPedido} para ${nuevaCompra.proveedor} se registró con éxito.`,
            timer: 1800,
            showConfirmButton: false
        });
    };

    // Función para cambiar el estado de la compra (Entregado <-> En espera)
    const cambiarEstadoCompra = async (c) => {
        const nuevoEstado = c.estado === 'Entregado' ? 'En espera' : 'Entregado';
        const { isConfirmed } = await Swal.fire({
            icon: 'question',
            title: '¿Cambiar estado de la compra?',
            text: `La compra N.º ${c.numeroPedido} pasará a estar "${nuevoEstado}".`,
            showCancelButton: true,
            confirmButtonText: 'Sí, cambiar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#0d9488',
        });
        
        if (!isConfirmed) return;

        setCompras((prev) => 
            prev.map((item) => (item.id === c.id ? { ...item, estado: nuevoEstado } : item))
        );

        Swal.fire({
            icon: 'success',
            title: '¡Estado actualizado!',
            timer: 1400,
            showConfirmButton: false
        });
    };

    // Caja y sucursal de la compra abierta en el detalle
    const cajaDetalle = compraSeleccionada ? getCaja(compraSeleccionada) : null;
    const sucursalDetalle = compraSeleccionada ? getSucursal(compraSeleccionada) : null;

    return (
        <div className="contenedor-compras-page">
            <Encabezado 
                titulo="Compras" 
                subtitulo="Gestión y seguimiento de compras a proveedores" 
            />
            
            {/* Buscador */}
            <SearchBar 
                value={busqueda} 
                onChange={setBusqueda} 
                placeholder="Buscar por proveedor o número de compra..." 
            />

            {/* Pestañas de Filtro */}
            <FilterTabs 
                tabs={tabs} 
                activeTab={tabActiva} 
                onTabChange={(id) => {
                    setTabActiva(id);
                    if (id !== 'por_fecha') setFechaFiltro('');
                    if (id !== 'por_sucursal') setSucursalFiltro('');
                }} 
            />

            {/* Selector de fecha condicional */}
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

            {/* Selector de sucursal condicional */}
            {tabActiva === 'por_sucursal' && (
                <FilterSelect
                    value={sucursalFiltro}
                    onChange={setSucursalFiltro}
                    options={opcionesSucursales}
                    placeholder="Seleccioná una sucursal..."
                />
            )}

            {/* Listado de Tarjetas de Compras */}
            <div className="lista-tarjetas-pedidos">
                {datosVisibles.length > 0 ? (
                    datosVisibles.map((c) => {
                        const esEntregado = c.estado === 'Entregado';
                        return (
                            <div key={c.id} className="tarjeta-pedido">
                                <div className="tarjeta-pedido-header">
                                    <div className="tarjeta-proveedor-info">
                                        <span className="avatar-iniciales-pedido">{iniciales(c.proveedor)}</span>
                                        <div>
                                            <strong>Proveedor: {c.proveedor}</strong>
                                            <div className="sub-texto-pedido">N.º Proveedor: {c.numeroProveedor}</div>
                                            <div className="sub-texto-pedido">Compra N.º: {c.numeroPedido}</div>
                                        </div>
                                    </div>
                                    <div className="fecha-tarjeta-pedido">
                                        {c.fecha}
                                    </div>
                                </div>

                                <div className="tarjeta-pedido-body">
                                    <div className="info-bloque">
                                        <span className="label-tel">TELÉFONO PROVEEDOR</span>
                                        <div className="telefono-flex">
                                            <IconPhone size={16} /> {c.telefono}
                                        </div>
                                    </div>
                                    <div className="info-bloque text-right">
                                        <span className="label-tel">Destino</span>
                                        <div className="destino-texto">{c.destino}</div>
                                    </div>
                                </div>

                                <div className="tarjeta-pedido-footer">
                                    <div className="tarjeta-footer-acciones-izq">
                                        <span className={`etiqueta-estado-pedido ${esEntregado ? 'estado-entregado' : 'estado-espera'}`}>
                                            <span className="punto-estado"></span> {c.estado}
                                        </span>
                                        <button className="boton-detalle-pedido" onClick={() => abrirDetalle(c)}>
                                            <IconEye size={16} /> Detalle
                                        </button>
                                    </div>

                                    <span className="acciones-fila">
                                        <button
                                            type="button"
                                            className={`boton-accion-icono ${esEntregado ? 'accion-deshabilitada' : ''}`}
                                            onClick={() => abrirEdicionCompra(c)}
                                            title={esEntregado ? 'No se puede modificar una compra entregada' : 'Modificar compra'}
                                            aria-label={`Modificar compra ${c.numeroPedido}`}
                                        >
                                            <IconEdit size={16} />
                                        </button>
                                        <button
                                            type="button"
                                            className={`boton-accion-icono ${esEntregado ? 'accion-desactivar' : 'accion-activar'}`}
                                            onClick={() => cambiarEstadoCompra(c)}
                                            title={esEntregado ? 'Marcar en espera' : 'Marcar entregado'}
                                            aria-label="Cambiar estado de la compra"
                                        >
                                            <IconPower size={16} />
                                        </button>
                                    </span>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="sin-resultados">No se encontraron compras registradas.</p>
                )}
            </div>

            {tieneMas && (
                <LoadMoreButton onClick={cargarMas} text="Ver más compras" />
            )}

            {/* Botón Flotante para Crear Compra */}
            <GenericFab 
                onClick={() => setIsCreateModalOpen(true)} 
                title="Crear nueva compra" 
            />

            {/* Modal de Detalle de la Compra */}
            {compraSeleccionada && (
                <div className="modal-overlay-detalle">
                    <div className="modal-detalle-contenido">
                        <div className="detalle-header">
                            <div>
                                <h2>Detalle de Compra N.º {compraSeleccionada.numeroPedido}</h2>
                                <span className="detalle-subtitle">
                                    {compraSeleccionada.fecha} · {compraSeleccionada.estado}
                                </span>
                            </div>
                            <button type="button" className="detalle-close-btn" onClick={cerrarDetalle} aria-label="Cerrar detalle">
                                <IconX size={20} />
                            </button>
                        </div>

                        <div className="detalle-body">
                            <div className="detalle-grid">
                                <div className="detalle-dato detalle-dato-full">
                                    <span className="detalle-label">Proveedor</span>
                                    <span className="detalle-valor">{compraSeleccionada.proveedor}</span>
                                </div>
                                <div className="detalle-dato">
                                    <span className="detalle-label">Sucursal</span>
                                    <span className="detalle-valor">
                                        {sucursalDetalle ? sucursalDetalle.nombre : compraSeleccionada.destino}
                                    </span>
                                </div>
                                <div className="detalle-dato">
                                    <span className="detalle-label">Caja</span>
                                    <span className="detalle-valor">
                                        {cajaDetalle ? `Caja ${cajaDetalle.id_cajas} (${cajaDetalle.estado})` : 'Sin caja asignada'}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <span className="detalle-label">Productos en la orden</span>
                                <div className="lista-productos-detalle">
                                    {compraSeleccionada.detalles && compraSeleccionada.detalles.length > 0 ? (
                                        compraSeleccionada.detalles.map((item, index) => (
                                            <div key={index} className="producto-item-fila">
                                                <div className="icono-producto-caja">
                                                    <IconBox size={20} />
                                                </div>
                                                <div className="producto-item-info">
                                                    <strong>{item.producto}</strong>
                                                    {item.codigo && <div className="producto-item-codigo">Código: {item.codigo}</div>}
                                                    <div>Precio unidad: ${item.precioUnidad.toLocaleString()}</div>
                                                    <div>Cantidad: {item.cantidad} bultos</div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="producto-vacio-msg">
                                            <IconBox size={32} className="producto-vacio-icon" />
                                            No hay productos registrados en esta orden.
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Sección de Métodos de Pago en el Detalle */}
                            {compraSeleccionada.pagos && compraSeleccionada.pagos.length > 0 && (
                                <div className="detalle-pagos-seccion">
                                    <span className="detalle-label detalle-label-icono">
                                        <IconCreditCard size={16} /> Métodos de pago
                                    </span>
                                    <div className="detalle-pagos-lista">
                                        {compraSeleccionada.pagos.map((p, idx) => (
                                            <div key={idx} className="detalle-pago-fila">
                                                <span>{p.nombreMetodo}</span>
                                                <span className="detalle-pago-monto">${Number(p.monto).toLocaleString()}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="modal-detalle-total">
                                <span>TOTAL :</span>
                                <span className="monto-total-caja">
                                    ${compraSeleccionada.detalles
                                        ? compraSeleccionada.detalles.reduce((acc, curr) => acc + (curr.precioUnidad * curr.cantidad), 0).toLocaleString()
                                        : '0'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Edición de Compras */}
            <OrderEditModal
                isOpen={!!compraEditando}
                onClose={() => setCompraEditando(null)}
                order={compraEditando}
                catalog={catalogoGeneralProductos}
                onSave={handleGuardarCompraEditada}
            />

            {/* Modal de Creación de Nueva Compra */}
            <OrderCreateModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                catalog={catalogoGeneralProductos}
                siguienteNumeroPedido={siguienteNumeroCompra}
                onSave={handleGuardarNuevaCompra}
            />
        </div>
    );
}