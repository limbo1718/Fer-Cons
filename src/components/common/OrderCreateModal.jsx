import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { IconX, IconTrash, IconPlus, IconMinus, IconSearch, IconBox, IconCreditCard } from '@tabler/icons-react';
import { categorias, proveedores as listaProveedores, metodosPago } from '../../data/mock.js';
import '../../styles/OrderCreateModal.css';

export default function OrderCreateModal({ isOpen, onClose, catalog = [], onSave, siguienteNumeroPedido }) {
    // Estados principales del formulario de nuevo pedido
    const [proveedorSeleccionado, setProveedorSeleccionado] = useState('');
    const [numeroPedido, setNumeroPedido] = useState('');
    const [destino, setDestino] = useState('Casa Central');
    const [fecha, setFecha] = useState('');
    const [items, setItems] = useState([]);
    
    // Estado para los pagos de la compra (array de { idMetodoPago, nombreMetodo, monto })
    const [pagos, setPagos] = useState([]);
    
    // Estados para la búsqueda y filtrado de productos del catálogo
    const [busquedaProducto, setBusquedaProducto] = useState('');
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('TODAS');

    // Inicializar valores al abrir el modal
    useEffect(() => {
        if (isOpen) {
            setProveedorSeleccionado('');
            setNumeroPedido(siguienteNumeroPedido || '571');
            setDestino('Casa Central');
            const hoy = new Date().toISOString().split('T')[0];
            setFecha(hoy);
            setItems([]);
            setPagos([]);
            setBusquedaProducto('');
            setCategoriaSeleccionada('TODAS');
        }
    }, [isOpen, siguienteNumeroPedido]);

    if (!isOpen) return null;

    const proveedorObj = listaProveedores.find((p) => p.nombreFantasia === proveedorSeleccionado);

    const nombresCategoriasMap = categorias.reduce((acc, cat) => {
        acc[cat.id] = cat.nombre;
        return acc;
    }, {});

    const catalogNormalizado = catalog.map((p) => ({
        ...p,
        nombreCategoria: p.categoria || nombresCategoriasMap[p.idCategoria] || 'General'
    }));

    const categoriasDisponibles = ['TODAS', ...new Set(catalogNormalizado.map(p => p.nombreCategoria))];

    const productosFiltrados = catalogNormalizado.filter((p) => {
        const textoBusqueda = busquedaProducto.toLowerCase();
        const coincideTexto = (p.nombre && p.nombre.toLowerCase().includes(textoBusqueda)) ||
                                (p.codigo && p.codigo.toLowerCase().includes(textoBusqueda));
        const coincideCategoria = categoriaSeleccionada === 'TODAS' || p.nombreCategoria === categoriaSeleccionada;
        return coincideTexto && coincideCategoria;
    });

    const agregarProducto = (prodCatalogo) => {
        setItems((prev) => {
            const indexExistente = prev.findIndex((item) => item.producto === prodCatalogo.nombre || item.codigo === prodCatalogo.codigo);
            if (indexExistente >= 0) {
                const nuevosItems = [...prev];
                nuevosItems[indexExistente] = {
                    ...nuevosItems[indexExistente],
                    cantidad: nuevosItems[indexExistente].cantidad + 1
                };
                return nuevosItems;
            } else {
                return [
                    ...prev,
                    {
                        codigo: prodCatalogo.codigo || '',
                        producto: prodCatalogo.nombre,
                        precioUnidad: prodCatalogo.precioUnidad,
                        categoria: prodCatalogo.nombreCategoria,
                        cantidad: 1
                    }
                ];
            }
        });
        setBusquedaProducto('');
    };

    const actualizarCantidad = (index, delta) => {
        setItems((prev) => {
            const nuevosItems = [...prev];
            const nuevaCantidad = nuevosItems[index].cantidad + delta;
            if (nuevaCantidad > 0) {
                nuevosItems[index].cantidad = nuevaCantidad;
            }
            return nuevosItems;
        });
    };

    const handleCantidadChange = (index, value) => {
        const val = parseInt(value, 10);
        setItems((prev) => {
            const nuevosItems = [...prev];
            nuevosItems[index].cantidad = isNaN(val) || val < 1 ? 1 : val;
            return nuevosItems;
        });
    };

    const eliminarItem = (index) => {
        setItems((prev) => prev.filter((_, i) => i !== index));
    };

    const totalCalculado = items.reduce((acc, curr) => acc + curr.precioUnidad * curr.cantidad, 0);

    // --- Lógica de Métodos de Pago ---
    const agregarMetodoPago = () => {
        const totalPagadoActual = pagos.reduce((acc, p) => acc + (parseFloat(p.monto) || 0), 0);
        const resto = Math.max(0, totalCalculado - totalPagadoActual);

        setPagos((prev) => [
            ...prev,
            {
                idMetodoPago: metodosPago[0]?.id || 1,
                nombreMetodo: metodosPago[0]?.nombre || 'Efectivo',
                monto: resto > 0 ? resto : 0
            }
        ]);
    };

    const actualizarPago = (index, campo, valor) => {
        setPagos((prev) => {
            const nuevosPagos = [...prev];
            if (campo === 'idMetodoPago') {
                const metodoEncontrado = metodosPago.find(m => m.id === parseInt(valor));
                nuevosPagos[index] = {
                    ...nuevosPagos[index],
                    idMetodoPago: parseInt(valor),
                    nombreMetodo: metodoEncontrado ? metodoEncontrado.nombre : ''
                };
            } else if (campo === 'monto') {
                nuevosPagos[index] = {
                    ...nuevosPagos[index],
                    monto: valor === '' ? '' : parseFloat(valor) || 0
                };
            }
            return nuevosPagos;
        });
    };

    const eliminarPago = (index) => {
        setPagos((prev) => prev.filter((_, i) => i !== index));
    };

    const totalPagos = pagos.reduce((acc, curr) => acc + (parseFloat(curr.monto) || 0), 0);

    const handleCrearPedido = (e) => {
        e.preventDefault();

        if (!proveedorSeleccionado) {
            Swal.fire({
                icon: 'warning',
                title: 'Campo requerido',
                text: 'Por favor, seleccioná un proveedor para el pedido.',
                confirmButtonColor: '#0d9488'
            });
            return;
        }

        if (items.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Sin productos',
                text: 'El pedido debe contener al menos un producto agregado.',
                confirmButtonColor: '#0d9488'
            });
            return;
        }

        const nuevoPedidoCompleto = {
            id: Date.now(),
            numeroPedido: String(numeroPedido),
            numeroProveedor: proveedorObj ? String(proveedorObj.codigo) : '001',
            proveedor: proveedorSeleccionado,
            telefono: proveedorObj ? proveedorObj.telefono : '+54 388 000-0000',
            destino: destino,
            estado: 'En espera',
            fecha: fecha,
            detalles: items,
            pagos: pagos
        };

        onSave(nuevoPedidoCompleto);
        onClose();
    };

    return (
        <div className="order-modal-overlay">
            <div className="order-modal-container">
                <div className="order-modal-header">
                    <div>
                        <h2>Crear Nuevo Pedido</h2>
                        <span className="order-modal-subtitle">Generá una nueva orden de compra a proveedor</span>
                    </div>
                    <button type="button" className="order-modal-close-btn" onClick={onClose}>
                        <IconX size={20} />
                    </button>
                </div>

                <form onSubmit={handleCrearPedido} className="order-modal-form">
                    {/* Sección de Datos Generales del Pedido */}
                    <div className="order-buscador-container order-grid-generales">
                        <div>
                            <label className="order-label">Proveedor:</label>
                            <select
                                value={proveedorSeleccionado}
                                onChange={(e) => setProveedorSeleccionado(e.target.value)}
                                className="order-select-categoria"
                                required
                            >
                                <option value="">Seleccionar proveedor...</option>
                                {listaProveedores.map((prov) => (
                                    <option key={prov.id} value={prov.nombreFantasia}>
                                        {prov.nombreFantasia} (N.° {prov.codigo})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="order-label">Número de Pedido:</label>
                            <input
                                type="text"
                                value={numeroPedido}
                                onChange={(e) => setNumeroPedido(e.target.value)}
                                className="order-input-search"
                                required
                            />
                        </div>

                        <div>
                            <label className="order-label">Destino:</label>
                            <select
                                value={destino}
                                onChange={(e) => setDestino(e.target.value)}
                                className="order-select-categoria"
                            >
                                <option value="Casa Central">Casa Central</option>
                                <option value="Sucursal - Zona Norte">Sucursal - Zona Norte</option>
                                <option value="Sucursal - Sur">Sucursal - Sur</option>
                                <option value="Depósito Norte">Depósito Norte</option>
                            </select>
                        </div>

                        <div>
                            <label className="order-label">Fecha del Pedido:</label>
                            <input
                                type="date"
                                value={fecha}
                                onChange={(e) => setFecha(e.target.value)}
                                className="order-input-search"
                                required
                            />
                        </div>
                    </div>

                    {/* Sección de Búsqueda y Filtro de Productos */}
                    <div className="order-buscador-container">
                        <label className="order-label">Agregar productos al pedido:</label>
                        
                        <div className="order-filtros-agregar-row">
                            <select
                                value={categoriaSeleccionada}
                                onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                                className="order-select-categoria"
                            >
                                {categoriasDisponibles.map((cat, idx) => (
                                    <option key={idx} value={cat}>
                                        {cat === 'TODAS' ? '📁 Todas las categorías' : cat}
                                    </option>
                                ))}
                            </select>

                            <div className="order-input-search-wrapper">
                                <IconSearch size={18} className="order-search-icon" />
                                <input
                                    type="text"
                                    placeholder="Buscar por nombre o código..."
                                    value={busquedaProducto}
                                    onChange={(e) => setBusquedaProducto(e.target.value)}
                                    className="order-input-search"
                                />
                            </div>
                        </div>

                        {busquedaProducto.trim() !== '' && (
                            <div className="order-sugerencias-dropdown">
                                {productosFiltrados.length > 0 ? (
                                    productosFiltrados.map((prod) => (
                                        <div
                                            key={prod.id || prod.codigo}
                                            className="order-sugerencia-item"
                                            onClick={() => agregarProducto(prod)}
                                        >
                                            <div>
                                                <strong>{prod.nombre}</strong>
                                                <div className="order-sugerencia-detalles">
                                                    <span className="order-sugerencia-codigo">🏷️ [{prod.codigo}] - {prod.nombreCategoria}</span>
                                                    <span className="order-sugerencia-precio">${prod.precioUnidad.toLocaleString()} c/u</span>
                                                </div>
                                            </div>
                                            <span className="order-badge-add">+ Agregar</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="order-sugerencia-vacia">No se encontraron productos</div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Lista de productos agregados */}
                    <div className="order-lista-items">
                        <label className="order-label">Productos en la orden:</label>
                        {items.length > 0 ? (
                            <div className="order-items-scroll">
                                {items.map((item, index) => (
                                    <div key={index} className="order-item-fila">
                                        <div className="order-item-icon">
                                            <IconBox size={20} />
                                        </div>
                                        <div className="order-item-info">
                                            <strong>{item.producto}</strong>
                                            <div className="order-item-precio">
                                                {item.codigo && <span className="order-item-codigo-tag">[{item.codigo}]</span>}
                                                Unitario: ${item.precioUnidad.toLocaleString()}
                                            </div>
                                        </div>

                                        <div className="order-item-controles">
                                            <div className="order-qty-controls">
                                                <button
                                                    type="button"
                                                    onClick={() => actualizarCantidad(index, -1)}
                                                    className="order-qty-btn"
                                                >
                                                    <IconMinus size={14} />
                                                </button>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={item.cantidad}
                                                    onChange={(e) => handleCantidadChange(index, e.target.value)}
                                                    className="order-qty-input"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => actualizarCantidad(index, 1)}
                                                    className="order-qty-btn"
                                                >
                                                    <IconPlus size={14} />
                                                </button>
                                            </div>
                                            <span className="order-item-subtotal">
                                                ${(item.precioUnidad * item.cantidad).toLocaleString()}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => eliminarItem(index)}
                                                className="order-delete-btn"
                                                title="Eliminar producto"
                                            >
                                                <IconTrash size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="order-sin-items">El pedido aún no contiene productos. Buscá y agregá arriba.</p>
                        )}
                    </div>

                    {/* Sección: Métodos de Pago */}
                    <div className="order-buscador-container order-pagos-seccion-wrapper">
                        <div className="order-pagos-header-row">
                            <label className="order-label order-pagos-label-main">
                                <IconCreditCard size={18} /> Métodos de Pago:
                            </label>
                            <button
                                type="button"
                                onClick={agregarMetodoPago}
                                className="order-btn-agregar-pago"
                            >
                                <IconPlus size={14} /> Agregar Pago
                            </button>
                        </div>

                        {pagos.length > 0 ? (
                            <div className="order-pagos-lista-items">
                                {pagos.map((pago, index) => (
                                    <div key={index} className="order-pago-fila">
                                        <select
                                            value={pago.idMetodoPago}
                                            onChange={(e) => actualizarPago(index, 'idMetodoPago', e.target.value)}
                                            className="order-select-categoria order-select-pago"
                                        >
                                            {metodosPago.map((m) => (
                                                <option key={m.id} value={m.id}>{m.nombre}</option>
                                            ))}
                                        </select>
                                        
                                        <input
                                            type="number"
                                            placeholder="Monto"
                                            value={pago.monto}
                                            onChange={(e) => actualizarPago(index, 'monto', e.target.value)}
                                            className="order-input-search order-input-pago"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => eliminarPago(index)}
                                            className="order-delete-btn"
                                            title="Eliminar método de pago"
                                        >
                                            <IconTrash size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="order-sin-items order-sin-pagos-text">No se agregaron métodos de pago (opcional).</p>
                        )}
                    </div>

                    {/* Footer con cálculo total y acciones */}
                    <div className="order-modal-footer">
                        <div className="order-total-box order-total-box-flex">
                            <div className="order-total-texto-linea">
                                <span>TOTAL NUEVO PEDIDO: </span>
                                <span className="order-total-monto">${totalCalculado.toLocaleString()}</span>
                            </div>
                            {pagos.length > 0 && (
                                <div className={`order-pagos-estado-badge ${totalPagos === totalCalculado ? 'badge-coincide' : 'badge-diferencia'}`}>
                                    Pagado: ${totalPagos.toLocaleString()} {totalPagos !== totalCalculado && '(Diferencia con el total)'}
                                </div>
                            )}
                        </div>

                        <div className="order-modal-actions">
                            <button type="button" className="order-btn-cancelar" onClick={onClose}>
                                Cancelar
                            </button>
                            <button type="submit" className="order-btn-guardar">
                                Guardar Pedido
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}