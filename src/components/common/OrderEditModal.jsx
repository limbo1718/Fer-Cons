import { useState, useEffect } from 'react';
import { IconX, IconTrash, IconPlus, IconMinus, IconSearch, IconBox } from '@tabler/icons-react';
import { categorias } from '../../data/mock.js';
import '../../styles/OrderEditModal.css';

export default function OrderEditModal({ isOpen, onClose, order, catalog = [], onSave }) {
    const [items, setItems] = useState([]);
    const [busquedaProducto, setBusquedaProducto] = useState('');
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('TODAS');

    // Sincroniza los detalles del pedido seleccionado cuando se abre el modal
    useEffect(() => {
        if (order && order.detalles) {
            setItems(JSON.parse(JSON.stringify(order.detalles)));
        }
        setBusquedaProducto('');
        setCategoriaSeleccionada('TODAS');
    }, [order, isOpen]);

    if (!isOpen || !order) return null;

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

    const handleGuardarCambios = (e) => {
        e.preventDefault();
        const pedidoActualizado = {
            ...order,
            detalles: items
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
                                            key={prod.id}
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
                                                {item.codigo && <span style={{ marginRight: '6px' }}>[{item.codigo}]</span>}
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

                    {/* Footer con cálculo total */}
                    <div className="order-modal-footer">
                        <div className="order-total-box">
                            <span>TOTAL ACTUALIZADO:</span>
                            <span className="order-total-monto">${totalCalculado.toLocaleString()}</span>
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