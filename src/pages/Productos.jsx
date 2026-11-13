import { useState, useMemo, useRef } from 'react';
import Swal from 'sweetalert2';
import { IconEdit, IconPower, IconCash, IconInfoCircle, IconBuildingStore, IconTruckDelivery } from '@tabler/icons-react';
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
    productos as datosProductos, 
    productos_x_sucursales as datosProductosXSucursales,
    categorias, 
    marcas, 
    unidades, 
    sucursales, 
    proveedores as datosProveedores, 
    productosXProveedores as datosPxP 
} from '../data/mock.js';
import '../styles/Productos.css'; 

const iniciales = (nombre = '') => 
    nombre.split(' ').slice(0, 2).map((p) => p[0] || '').join('').toUpperCase();

// Función que hace el JOIN de todas las tablas
const mapearProductosRelacionales = () => {
    return datosProductos.map(prod => {
        // 1. JOIN con productos_x_sucursales (para traer sucursal y estado)
        const relacionSucursal = datosProductosXSucursales.find(r => r.ID_Productos === prod.ID_Productos);
        
        // 2. JOIN con productosXProveedores y proveedores
        const pxp = datosPxP.find(item => item.ID_Productos === prod.ID_Productos);
        const provObj = pxp ? datosProveedores.find(p => p.ID_Proveedores === pxp.ID_Proveedores) : null;

        // 3. JOIN con categorias, marcas y unidades
        const catObj = categorias.find(c => c.ID_Categoria === prod.ID_Categoria);
        const marcaObj = marcas.find(m => m.ID_Marca === prod.ID_Marca);
        const unidadObj = unidades.find(u => u.ID_Unidad === prod.ID_Unidad);

        return {
            id: prod.ID_Productos,
            codigo: prod.Codigo,
            nombre: prod.Nombre,
            descripcion: prod.Descripcion,
            precioUnidad: prod.Precio_Unidad,
            
            idCategoria: prod.ID_Categoria,
            nombreCategoria: catObj ? catObj.Categorias : 'Sin Categoría',
            
            idMarca: prod.ID_Marca,
            nombreMarca: marcaObj ? marcaObj.Marcas : 'Genérica',
            
            idUnidad: prod.ID_Unidad,
            nombreUnidad: unidadObj ? unidadObj.Unidades : 'Unidad',
            
            idSucursal: relacionSucursal ? relacionSucursal.ID_Sucursales : null,
            activo: relacionSucursal ? relacionSucursal.Estado : false,
            detalleBaja: '', 
            
            idProveedor: pxp ? pxp.ID_Proveedores : null,
            nombreProveedor: provObj ? provObj.Nombre : 'Sin proveedor',
            codigo_Producto_Proveedor: pxp ? pxp.Codigo_Producto_Proveedor : '-',
            precio_Lista: pxp ? pxp.Precio_Lista : 0
        };
    });
};

export default function Productos() {
    const [productos, setProductos] = useState(mapearProductosRelacionales);
    
    const [busqueda, setBusqueda] = useState('');
    const [tabActiva, setTabActiva] = useState('todos');
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const [sucursalSeleccionada, setSucursalSeleccionada] = useState('');
    const [proveedorSeleccionado, setProveedorSeleccionado] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productoEditando, setProductoEditando] = useState(null);
    
    const bloquearCierreRef = useRef(false);

    const activos = productos.filter((p) => p.activo).length;
    const inactivos = productos.filter((p) => !p.activo).length;
    
    const categoriasDisponibles = categorias.map((c) => c.Categorias);
    const sucursalesDisponibles = sucursales.map((s) => s.Nombre);
    const proveedoresDisponibles = datosProveedores.map((p) => p.Nombre);
    const marcasDisponibles = marcas.map(m => m.Marcas);
    const unidadesDisponibles = unidades.map(u => u.Unidades);

    const siguienteCodigoInterno = useMemo(() => {
        return `PROD-${String(productos.length + 101)}`;
    }, [productos]);

    const valoresIniciales = useMemo(() => {
        if (!productoEditando) {
            return { 
                codigo: siguienteCodigoInterno, 
                codigo_Producto_Proveedor: '',
                precio_Lista: '',
                idProveedor: proveedoresDisponibles[0] || '',
                idSucursal: sucursalesDisponibles[0] || '',
                categoria: categoriasDisponibles[0] || '',
                idMarca: marcasDisponibles[0] || '',
                idUnidad: unidadesDisponibles[0] || ''
            };
        }

        return {
            codigo: productoEditando.codigo || '',
            codigo_Producto_Proveedor: productoEditando.codigo_Producto_Proveedor || '',
            precio_Lista: productoEditando.precio_Lista || '',
            nombre: productoEditando.nombre || '',
            descripcion: productoEditando.descripcion || '',
            precioUnidad: productoEditando.precioUnidad || '',
            idProveedor: productoEditando.nombreProveedor || proveedoresDisponibles[0] || '',
            categoria: productoEditando.nombreCategoria || categoriasDisponibles[0] || '',
            idMarca: productoEditando.nombreMarca || marcasDisponibles[0] || '',
            idUnidad: productoEditando.nombreUnidad || unidadesDisponibles[0] || '',
            idSucursal: sucursalesDisponibles.find(s => s === (sucursales.find(suc => suc.ID_Sucursales === productoEditando.idSucursal)?.Nombre)) || sucursalesDisponibles[0] || '',
        };
    }, [productoEditando, siguienteCodigoInterno, proveedoresDisponibles, sucursalesDisponibles, categoriasDisponibles, marcasDisponibles, unidadesDisponibles]);

    const abrirNuevo = () => { setProductoEditando(null); setIsModalOpen(true); };
    const abrirEdicion = (p) => { setProductoEditando(p); setIsModalOpen(true); };
    
    const cerrarModal = () => { 
        if (bloquearCierreRef.current) {
            bloquearCierreRef.current = false;
            return;
        }
        setIsModalOpen(false); 
        setProductoEditando(null); 
    };

    const verDescripcion = (p) => {
        showDetailAlert({
            title: p.nombre,
            details: [
                { label: 'Código Interno', value: p.codigo },
                { label: 'Cód. Proveedor', value: p.codigo_Producto_Proveedor },
                { label: 'Proveedor', value: p.nombreProveedor },
                { label: 'Precio Lista (Prov.)', value: `$${Number(p.precio_Lista).toLocaleString('es-AR')}` },
                { label: 'Precio Venta', value: `$${Number(p.precioUnidad).toLocaleString('es-AR')}` },
                { label: 'Sucursal', value: sucursales.find(s => s.ID_Sucursales === p.idSucursal)?.Nombre || 'No especificada' }
            ],
            description: p.activo 
                ? (p.descripcion || 'No cuenta con una descripción detallada.')
                : (p.detalleBaja || 'Este producto fue dado de baja sin especificar un motivo detallado.')
        });
    };

    const camposProducto = [
        { name: 'codigo', label: 'Código Interno', placeholder: 'Ej: CER-6060-MB', required: true },
        { name: 'nombre', label: 'Nombre del Producto', placeholder: 'Ej: Porcellanato 60x60', required: true },
        { name: 'descripcion', label: 'Descripción', placeholder: 'Detalles del producto...', required: false },
        { name: 'idProveedor', label: 'Proveedor Principal', type: 'select', options: proveedoresDisponibles, required: true },
        { name: 'codigo_Producto_Proveedor', label: 'Código del Proveedor', placeholder: 'Ej: CER-6060-MB-01', required: true },
        { name: 'precio_Lista', label: 'Precio de Lista del Proveedor ($)', type: 'number', placeholder: '35000', required: true },
        { name: 'precioUnidad', label: 'Precio de Venta Sugerido ($)', type: 'number', placeholder: '37050', required: true },
        { name: 'idSucursal', label: 'Sucursal Asignada', type: 'select', options: sucursalesDisponibles, required: true },
        { name: 'categoria', label: 'Categoría', type: 'select', options: categoriasDisponibles, required: true },
        { name: 'idMarca', label: 'Marca', type: 'select', options: marcasDisponibles, required: true },
        { name: 'idUnidad', label: 'Unidad de Medida', type: 'select', options: unidadesDisponibles, required: true }
    ];

    const cambiarEstado = async (p) => {
        const desactivar = p.activo;
        let motivoBaja = p.detalleBaja || '';

        if (desactivar) {
            const motivo = await showConfirmInputAlert({
                title: `Motivo de baja - ${p.nombre}`,
                subtitle: 'Gestión de Inventario',
                inputValue: p.detalleBaja || '',
                confirmButtonText: 'Dar de baja'
            });
            if (!motivo) return;
            motivoBaja = motivo;
        } else {
            const confirmado = await showReactivateAlert({
                entity: 'producto',
                name: p.nombre
            });
            if (!confirmado) return;
        }

        setProductos((prev) => 
            prev.map((prod) => 
                prod.id === p.id 
                    ? { ...prod, activo: !prod.activo, detalleBaja: desactivar ? motivoBaja : '' } 
                    : prod
            )
        );

        Swal.fire({
            icon: 'success',
            title: desactivar ? 'Producto desactivado' : 'Producto activado',
            text: `El estado de ${p.nombre} se actualizó correctamente.`,
            timer: 1800,
            showConfirmButton: false
        });
    };

    const handleGuardarProducto = (data) => {
        const catObj = categorias.find(c => c.Categorias === data.categoria);
        const marcaObj = marcas.find(m => m.Marcas === data.idMarca);
        const unidadObj = unidades.find(u => u.Unidades === data.idUnidad);
        const sucursalObj = sucursales.find(s => s.Nombre === data.idSucursal);
        const provObj = datosProveedores.find(p => p.Nombre === data.idProveedor);

        if (productoEditando) {
            const actualizado = {
                ...productoEditando,
                codigo: data.codigo,
                nombre: data.nombre,
                descripcion: data.descripcion,
                precioUnidad: Number(data.precioUnidad),
                idCategoria: catObj ? catObj.ID_Categoria : 1,
                nombreCategoria: data.categoria,
                idMarca: marcaObj ? marcaObj.ID_Marca : 1,
                nombreMarca: data.idMarca,
                idUnidad: unidadObj ? unidadObj.ID_Unidad : 1,
                nombreUnidad: data.idUnidad,
                idSucursal: sucursalObj ? sucursalObj.ID_Sucursales : 1,
                idProveedor: provObj ? provObj.ID_Proveedores : 1,
                nombreProveedor: data.idProveedor,
                codigo_Producto_Proveedor: data.codigo_Producto_Proveedor,
                precio_Lista: Number(data.precio_Lista)
            };
            
            setProductos((prev) => prev.map((prod) => (prod.id === actualizado.id ? actualizado : prod)));
            Swal.fire({ icon: 'success', title: '¡Producto actualizado!', timer: 1800, showConfirmButton: false });
            return;
        }

        const nuevoProducto = {
            id: Date.now(),
            codigo: data.codigo,
            nombre: data.nombre,
            descripcion: data.descripcion,
            precioUnidad: Number(data.precioUnidad),
            
            idCategoria: catObj ? catObj.ID_Categoria : 1,
            nombreCategoria: data.categoria,
            
            idMarca: marcaObj ? marcaObj.ID_Marca : 1,
            nombreMarca: data.idMarca,
            
            idUnidad: unidadObj ? unidadObj.ID_Unidad : 1,
            nombreUnidad: data.idUnidad,
            
            idSucursal: sucursalObj ? sucursalObj.ID_Sucursales : 1,
            activo: true,
            detalleBaja: '',
            
            idProveedor: provObj ? provObj.ID_Proveedores : 1,
            nombreProveedor: data.idProveedor,
            codigo_Producto_Proveedor: data.codigo_Producto_Proveedor,
            precio_Lista: Number(data.precio_Lista)
        };

        setProductos((prev) => [...prev, nuevoProducto]);
        Swal.fire({ icon: 'success', title: '¡Producto agregado!', timer: 1800, showConfirmButton: false });
    };

    const tabs = [
        { id: 'todos', label: 'Todos', count: productos.length },
        { id: 'activos', label: 'Activos', count: activos },
        { id: 'inactivos', label: 'Inactivos', count: inactivos },
        { id: 'categoria', label: 'Por categoría' },
        { id: 'sucursal', label: 'Por sucursal' },
        { id: 'proveedor', label: 'Por proveedor' }
    ];

    const productosFiltrados = productos.filter((p) => {
        let cumpleTab = true;
        if (tabActiva === 'activos') cumpleTab = p.activo;
        else if (tabActiva === 'inactivos') cumpleTab = !p.activo;
        else if (tabActiva === 'categoria') cumpleTab = categoriaSeleccionada ? p.nombreCategoria === categoriaSeleccionada : true;
        else if (tabActiva === 'sucursal') cumpleTab = sucursalSeleccionada ? (sucursales.find(s => s.ID_Sucursales === p.idSucursal)?.Nombre === sucursalSeleccionada) : true;
        else if (tabActiva === 'proveedor') cumpleTab = proveedorSeleccionado ? p.nombreProveedor === proveedorSeleccionado : true;

        const query = busqueda.toLowerCase().trim();
        const cumpleBusqueda = !query || 
            String(p.codigo).toLowerCase().includes(query) || 
            String(p.codigo_Producto_Proveedor).toLowerCase().includes(query) ||
            p.nombre.toLowerCase().includes(query) || 
            p.nombreCategoria.toLowerCase().includes(query) || 
            p.nombreMarca.toLowerCase().includes(query) || 
            (sucursales.find(s => s.ID_Sucursales === p.idSucursal)?.Nombre || '').toLowerCase().includes(query) ||
            p.nombreProveedor.toLowerCase().includes(query);

        return cumpleTab && cumpleBusqueda;
    });

    const { datosVisibles, tieneMas, cargarMas } = usePagination(productosFiltrados, 10, [busqueda, tabActiva, categoriaSeleccionada, sucursalSeleccionada, proveedorSeleccionado]);

    // MODIFICADO: Cambiamos las clases de Tailwind por columna-con-icono
    const columnas = [
        'Códigos', 
        'Producto', 
        'Unidad', 
        <span key="prec" className="columna-con-icono"><IconCash size={16} />P. Venta</span>, 
        <span key="prec-prov" className="columna-con-icono"><IconCash size={16} />P. Lista</span>, 
        <span key="prov" className="columna-con-icono"><IconTruckDelivery size={16} />Proveedor</span>,
        <span key="suc" className="columna-con-icono"><IconBuildingStore size={16} />Sucursal</span>,
        'Categoría', 
        'Marca', 
        'Estado', 
        'Acciones'
    ];

    return (
        <>
        <Encabezado titulo="Productos" subtitulo="Gestionar inventario, precios y artículos" />
        <SearchBar value={busqueda} onChange={setBusqueda} placeholder="Buscar por código, proveedor, nombre, categoría o sucursal..." />
        <FilterTabs 
            tabs={tabs} 
            activeTab={tabActiva} 
            onTabChange={(id) => { 
                setTabActiva(id); 
                if (id !== 'categoria') setCategoriaSeleccionada(''); 
                if (id !== 'sucursal') setSucursalSeleccionada(''); 
                if (id !== 'proveedor') setProveedorSeleccionado(''); 
            }} 
        />

        {tabActiva === 'categoria' && (
            <FilterSelect value={categoriaSeleccionada} onChange={setCategoriaSeleccionada} options={categoriasDisponibles} placeholder="Seleccioná una categoría..." />
        )}

        {tabActiva === 'sucursal' && (
            <FilterSelect value={sucursalSeleccionada} onChange={setSucursalSeleccionada} options={sucursalesDisponibles} placeholder="Seleccioná una sucursal..." />
        )}

        {tabActiva === 'proveedor' && (
            <FilterSelect value={proveedorSeleccionado} onChange={setProveedorSeleccionado} options={proveedoresDisponibles} placeholder="Seleccioná un proveedor..." />
        )}
        
        <GenericTable
            columnas={columnas}
            datos={datosVisibles}
            renderFila={(p) => {
                return (
                    <tr key={p.id} className="fila-empleado">
                        {/* MODIFICADO: Le agregamos "Prov: " para que se entienda */}
                        <td className="celda-tabla-legajo">
                            <div className="codigo-interno">{p.codigo}</div>
                            <div className="codigo-proveedor">Prov: {p.codigo_Producto_Proveedor}</div>
                        </td>
                        <td className="celda-tabla-info">
                            <span className="info-empleado-flex">
                                <span className="avatar-iniciales">{iniciales(p.nombre)}</span>
                                <span className="producto-nombre-span">{p.nombre}</span>
                            </span>
                        </td>
                        <td className="celda-tabla-texto">{p.nombreUnidad}</td>
                        
                        <td className="celda-tabla-texto producto-precio-celda">${Number(p.precioUnidad).toLocaleString('es-AR')}</td>
                        
                        <td className="celda-tabla-texto producto-precio-lista">${Number(p.precio_Lista).toLocaleString('es-AR')}</td>
                        
                        <td className="celda-tabla-gris">{p.nombreProveedor}</td>
                        <td className="celda-tabla-gris">{sucursales.find(s => s.ID_Sucursales === p.idSucursal)?.Nombre || 'Sin sucursal'}</td>
                        <td className="celda-tabla-gris">{p.nombreCategoria}</td>
                        <td className="celda-tabla-texto">{p.nombreMarca}</td>
                        <td className="celda-tabla-texto">
                            <span className={`etiqueta-estado ${p.activo ? 'estado-activo' : 'estado-inactivo'}`}>
                                {p.activo ? 'Activo' : 'Inactivo'}
                            </span>
                        </td>
                        <td className="celda-tabla-info">
                            <span className="acciones-fila">
                                <button
                                    type="button"
                                    className="boton-accion-icono"
                                    onClick={() => verDescripcion(p)}
                                    title={p.activo ? "Ver descripción" : "Ver motivo de baja"}
                                    aria-label={`Ver detalle de ${p.nombre}`}
                                >
                                    <IconInfoCircle size={18} />
                                </button>
                                <button
                                    type="button"
                                    className="boton-accion-icono"
                                    onClick={() => abrirEdicion(p)}
                                    title="Editar producto"
                                    aria-label={`Editar ${p.nombre}`}
                                >
                                    <IconEdit size={18} />
                                </button>
                                <button
                                    type="button"
                                    className={`boton-accion-icono ${p.activo ? 'accion-desactivar' : 'accion-activar'}`}
                                    onClick={() => cambiarEstado(p)}
                                    title={p.activo ? 'Desactivar producto' : 'Activar producto'}
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

        {tieneMas && <LoadMoreButton onClick={cargarMas} text="Ver más productos" />}
        <GenericFab onClick={abrirNuevo} title="Agregar nuevo producto" />

        <GenericModalForm
            isOpen={isModalOpen}
            onClose={cerrarModal}
            title={productoEditando ? 'Editar producto' : 'Nuevo producto'}
            subtitle={productoEditando ? 'Modificá los datos del artículo y su relación con el proveedor.' : '¡Rellena los campos para añadir un nuevo producto y vincularlo con su proveedor!'}
            fields={camposProducto}
            initialValues={valoresIniciales}
            onSubmit={handleGuardarProducto}
            submitText={productoEditando ? 'Guardar cambios' : 'Guardar producto'}
        />
        </>
    );
}