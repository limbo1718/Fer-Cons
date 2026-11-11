import { useState, useEffect } from 'react';
import { IconX, IconTrash, IconPlus, IconMinus, IconSearch, IconBox, IconCreditCard } from '@tabler/icons-react';
import { categorias, metodosPago, sucursales, cajas } from '../../data/mock.js';
import '../../styles/OrderEditModal.css';

// Filtrar únicamente sucursales activas
const sucursalesActivas = sucursales.filter((s) => s.activo === true || s.activo === undefined);

// Cajas activas de una sucursal
const getCajasActivas = (idSucursal) =>
    cajas.filter((c) => (c.id_sucursales === Number(idSucursal) || c.ID_Sucursales === Number(idSucursal)) && (c.estado === 'Activo' || c.estado === 'activo'));

export default function OrderEditModal({ isOpen, onClose, order, catalog = [], onSave }) {
    const [items, setItems] = useState([]);
    const [pagos, setPagos] = useState([]);
    const [sucursalSeleccionada, setSucursalSeleccionada] = useState('');
    const [cajaSeleccionada, setCajaSeleccionada] = useState('');
    const [busquedaProducto, setBusquedaProducto] = useState('');
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('TODAS');

    // Sincroniza los detalles, pagos, caja y sucursal del pedido seleccionado cuando se abre el modal
    useEffect(() => {
        if (order) {
            if (order.detalles) {
                setItems(JSON.parse(JSON.stringify(order.detalles)));
            } else {
                setItems([]);
            }
            if (order.pagos) {
                setPagos(JSON.parse(JSON.stringify(order.pagos)));
            } else {
                setPagos([]);
            }

            const cajaActual = cajas.find((c) => c.id_cajas === order.id_cajas);
            const idSucursal = cajaActual ? (cajaActual.ID_Sucursales || cajaActual.id_sucursales) : (order.ID_Sucursales || order.id_sucursal);
            setSucursalSeleccionada(idSucursal ? String(idSucursal) : '');
            setCajaSeleccionada(order.id_cajas ? String(order.id_cajas) : '');
        }
        setBusquedaProducto('');
        setCategoriaSeleccionada('TODAS');
    }, [order, isOpen]);

    if (!isOpen || !order) return null;

    const sucursalObj = sucursalesActivas.find((s) => String(s.ID_Sucursales || s.id) === String(sucursalSeleccionada));

    // Cajas activas de la sucursal elegida; si la caja actual de la compra está inactiva
    // y pertenece a esa sucursal, se mantiene en la lista para que no desaparezca
    const cajasActivas = getCajasActivas(sucursalSeleccionada);
    const cajaActual = cajas.find((c) => c.id_cajas === order.id_cajas);
    const cajasOpciones =
        cajaActual &&
        (cajaActual.id_sucursales === Number(sucursalSeleccionada) || cajaActual.ID_Sucursales === Number(sucursalSeleccionada)) &&
        !cajasActivas.some((c) => c.id_cajas === cajaActual.id_cajas)
            ? [cajaActual, ...cajasActivas]
            : cajasActivas;

    // Al cambiar de sucursal se muestran solo sus cajas activas y se preselecciona la primera
    const handleSucursalChange = (idSucursal) => {
        setSucursalSeleccionada(idSucursal);
        const primeraCaja = getCajasActivas(idSucursal)[0];
        setCajaSeleccionada(primeraCaja ? String(primeraCaja.id_cajas) : '');
    };

    // Crear un mapa dinámico utilizando las categorías importadas de mock.js
    const nombresCategoriasMap = categorias.reduce((acc, cat) => {
        acc[cat.id] = cat.nombre;
        return acc;
    }, {});

    // Enriquecer el catálogo con el nombre de categoría legible
    const catalogNormalizado = catalog.map((p) => ({
        ...p,
        nombreCategoria: p.categoria || nombresCategoriasMap[p.idCategoria] || 'General'
    }));

    // Extraer categorías únicas para poblar el selector de forma dinámica
    const categoriasDisponibles = ['TODAS', ...new Set(catalogNormalizado.map(p => p.nombreCategoria))];

    // Filtrar productos del catálogo usando 'nombre', 'codigo' y categoría
    const productosFiltrados = catalogNormalizado.filter((p) => {
        const textoBusqueda = busquedaProducto.toLowerCase();
        const coincideTexto = (p.nombre && p.nombre.toLowerCase().includes(textoBusqueda)) ||
                                (p.codigo && p.codigo.toLowerCase().includes(textoBusqueda));
        
        const coincideCategoria = categoriaSeleccionada === 'TODAS' || p.nombreCategoria === categoriaSeleccionada;
        
        return coincideTexto && coincideCategoria;
    });

    // Agregar producto desde el catálogo al pedido
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

    // Cambiar cantidad de un producto
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

    // Modificar cantidad mediante input manual
    const handleCantidadChange = (index, value) => {
        const val = parseInt(value, 10);
        setItems((prev) => {
            const nuevosItems = [...prev];
            nuevosItems[index].cantidad = isNaN(val) || val < 1 ? 1 : val;
            return nuevosItems;
        });
    };

    // Eliminar producto del pedido
    const eliminarItem = (index) => {
        setItems((prev) => prev.filter((_, i) => i !== index));
    };

    // Cálculo dinámico del total
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

    const handleGuardarCambios = (e) => {
        e.preventDefault();
        const pedidoActualizado = {
            ...order,
            id_cajas: Number(cajaSeleccionada),
            id_sucursal: Number(sucursalSeleccionada),
            destino: sucursalObj ? (sucursalObj.Nombre || sucursalObj.nombre) : order.destino,
            detalles: items,
            pagos: pagos
        };
        onSave(pedidoActualizado);
        onClose();
    };

    return (
        <div className="order-modal-overlay">
            <div className="order-modal-container">
                <div className="order-modal-header">
                    <div>
                        <h2>Modificar Pedido N.º {order.numeroPedido}</h2>
                        <span className="order-modal-subtitle">Proveedor: {order.proveedor}</span>
                    </div>
                    <button type="button" className="order-modal-close-btn" onClick={onClose}>
                        <IconX size={20} />
                    </button>
                </div>

                <form onSubmit={handleGuardarCambios} className="order-modal-form">
                    {/* Sección de Sucursal y Caja de la compra */}
                    <div className="order-buscador-container order-grid-generales">
                        <div>
                            <label className="order-label">Destino (Sucursal):</label>
                            <select
                                value={sucursalSeleccionada}
                                onChange={(e) => handleSucursalChange(e.target.value)}
                                className="order-select-categoria"
                            >
                                {sucursalesActivas.map((s) => {
                                    const idSuc = s.ID_Sucursales || s.id;
                                    const nombreSuc = s.Nombre || s.nombre;
                                    return (
                                        <option key={idSuc} value={idSuc}>{nombreSuc}</option>
                                    );
                                })}
                            </select>
                        </div>

                        <div>
                            <label className="order-label">Caja:</label>
                            <select
                                value={cajaSeleccionada}
                                onChange={(e) => setCajaSeleccionada(e.target.value)}
                                className="order-select-categoria"
                                required
                            >
                                {cajasOpciones.length === 0 && (
                                    <option value="">Sin cajas activas</option>
                                )}
                                {cajasOpciones.map((c) => (
                                    <option key={c.id_cajas} value={c.id_cajas}>
                                        Caja {c.id_cajas}{c.estado !== 'Activo' && c.estado !== 'activo' ? ` (${c.estado})` : ''}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Sección de búsqueda y filtro por categoría */}
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

                        {/* Desplegable de sugerencias */}
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

                    {/* Lista de productos actuales en el pedido */}
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
                            <p className="order-sin-items">El pedido no contiene productos. Agregá algunos arriba.</p>
                        )}
                    </div>

                    {/* Sección: Métodos de Pago en Edición */}
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

                    {/* Footer con cálculo total y validación de pagos */}
                    <div className="order-modal-footer">
                        <div className="order-total-box order-total-box-flex">
                            <div className="order-total-texto-linea">
                                <span>TOTAL ACTUALIZADO: </span>
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
                                Guardar Cambios
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}