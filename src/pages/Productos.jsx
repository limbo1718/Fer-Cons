import { useState, useMemo } from 'react';
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
import { usePagination } from '../hooks/usePagination.js';
import { 
    productos as datosMock, 
    categorias, 
    marcasOpciones, 
    unidadesOpciones, 
    sucursales, 
    proveedores, 
    productosXProveedores as datosPxP 
} from '../data/mock.js';
import '../styles/Productos.css'; 

const iniciales = (nombre = '') => 
    nombre.split(' ').slice(0, 2).map((p) => p[0] || '').join('').toUpperCase();

export default function Productos() {
    const [productos, setProductos] = useState(
        datosMock.map(p => ({ 
            ...p, 
            activo: p.activo ?? true, 
            detalleBaja: p.detalleBaja || '',
            idSucursal: p.idSucursal || 1 
        }))
    );
    
    // Estado para manejar la relación con proveedores (productosXProveedores)
    const [prodXProv, setProdXProv] = useState(datosPxP);

    const [busqueda, setBusqueda] = useState('');
    const [tabActiva, setTabActiva] = useState('todos');
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const [sucursalSeleccionada, setSucursalSeleccionada] = useState('');
    const [proveedorSeleccionado, setProveedorSeleccionado] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productoEditando, setProductoEditando] = useState(null);

    const activos = productos.filter((p) => p.activo).length;
    const inactivos = productos.filter((p) => !p.activo).length;
    const categoriasDisponibles = categorias.map((c) => c.nombre);
    const sucursalesDisponibles = sucursales.map((s) => s.Nombre);
    const proveedoresDisponibles = proveedores.map((p) => p.nombreFantasia);

    const siguienteCodigoInterno = useMemo(() => {
        return `PROD-${String(productos.length + 101)}`;
    }, [productos]);

    // Valores iniciales para el formulario de Creación / Edición
    const valoresIniciales = useMemo(() => {
        if (!productoEditando) {
            return { 
                codigo: siguienteCodigoInterno, 
                codigo_Producto_Proveedor: '',
                precio_Lista: '',
                idProveedor: proveedores[0]?.nombreFantasia || '',
                idSucursal: sucursales[0]?.Nombre || '' 
            };
        }

        const catObj = categorias.find(c => c.id === productoEditando.idCategoria);
        const marcaNombre = marcasOpciones[productoEditando.idMarca - 1] || 'Genérica';
        const unidadObj = unidadesOpciones.find(u => u.id === productoEditando.idUnidad);
        const sucObj = sucursales.find(s => s.ID_Sucursales === productoEditando.idSucursal);
        
        // Buscar datos en la tabla intermedia productosXProveedores
        const pxp = prodXProv.find(item => item.id_Productos === productoEditando.id);
        const provObj = pxp ? proveedores.find(p => p.id === pxp.id_Proveedores) : null;
        
        return {
            codigo: productoEditando.codigo || '',
            codigo_Producto_Proveedor: pxp ? pxp.codigo_Producto_Proveedor : '',
            precio_Lista: pxp ? pxp.precio_Lista : '',
            nombre: productoEditando.nombre || '',
            descripcion: productoEditando.descripcion || '',
            precioUnidad: productoEditando.precioUnidad || '',
            idProveedor: provObj ? provObj.nombreFantasia : proveedores[0]?.nombreFantasia || '',
            categoria: catObj ? catObj.nombre : categorias[0]?.nombre || '',
            idMarca: marcaNombre,
            idUnidad: unidadObj ? unidadObj.label : 'Unidad',
            idSucursal: sucObj ? sucObj.Nombre : sucursales[0]?.Nombre || '',
        };
    }, [productoEditando, siguienteCodigoInterno, prodXProv]);

    const abrirNuevo = () => { setProductoEditando(null); setIsModalOpen(true); };
    const abrirEdicion = (p) => { setProductoEditando(p); setIsModalOpen(true); };
    const cerrarModal = () => { setIsModalOpen(false); setProductoEditando(null); };

    // Mostrar detalles incluyendo el proveedor y el código del proveedor
    const verDescripcion = (p) => {
        const sucObj = sucursales.find(s => s.ID_Sucursales === p.idSucursal);
        const pxp = prodXProv.find(item => item.id_Productos === p.id);
        const provObj = pxp ? proveedores.find(prov => prov.id === pxp.id_Proveedores) : null;

        showDetailAlert({
            title: p.nombre,
            details: [
                { label: 'Código Interno', value: p.codigo },
                { label: 'Cód. Proveedor', value: pxp ? pxp.codigo_Producto_Proveedor : 'No asignado' },
                { label: 'Proveedor', value: provObj ? provObj.nombreFantasia : 'Sin proveedor' },
                { label: 'Precio Lista (Prov.)', value: pxp ? `$${Number(pxp.precio_Lista).toLocaleString('es-AR')}` : 'N/A' },
                { label: 'Precio Venta', value: `$${Number(p.precioUnidad).toLocaleString('es-AR')}` },
                { label: 'Sucursal', value: sucObj ? sucObj.Nombre : 'No especificada' }
            ],
            description: p.activo 
                ? (p.descripcion || 'No cuenta con una descripción detallada.')
                : (p.detalleBaja || 'Este producto fue dado de baja sin especificar un motivo detallado.')
        });
    };

    // Campos del formulario actualizados con Proveedor y Código de Proveedor
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
        { name: 'idMarca', label: 'Marca', type: 'select', options: marcasOpciones, required: true },
        { name: 'idUnidad', label: 'Unidad de Medida', type: 'select', options: unidadesOpciones.map(u => u.label), required: true }
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
            const { isConfirmed } = await Swal.fire({
                title: '',
                html: `
                    <div class="swal-reactivacion-wrapper">
                        <span class="swal-reactivacion-sub">Reactivación</span>
                        <h2 class="swal-reactivacion-titulo">¿Activar producto?</h2>
                        <p class="swal-reactivacion-texto"><strong>${p.nombre}</strong> pasará a estar activo nuevamente.</p>
                    </div>
                `,
                showCancelButton: true,
                confirmButtonText: 'Activar',
                cancelButtonText: 'Cancelar',
                buttonsStyling: false,
                width: '460px',
                padding: '2rem',
                backdrop: 'rgba(15, 42, 48, 0.65)',
            });
            if (!isConfirmed) return;
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

    // Guardar o Actualizar producto sincronizando la tabla intermedia productosXProveedores
    const handleGuardarProducto = (data) => {
        const catEncontrada = categorias.find(c => c.nombre === data.categoria);
        const idCategoria = catEncontrada ? catEncontrada.id : 1;
        const idMarca = marcasOpciones.indexOf(data.idMarca) + 1 || 1;
        const unidadEncontrada = unidadesOpciones.find(u => u.label === data.idUnidad);
        const idUnidad = unidadEncontrada ? unidadEncontrada.id : 1;
        const sucEncontrada = sucursales.find(s => s.Nombre === data.idSucursal);
        const idSucursal = sucEncontrada ? sucEncontrada.ID_Sucursales : 1;

        const provEncontrado = proveedores.find(p => p.nombreFantasia === data.idProveedor);
        const id_Proveedores = provEncontrado ? provEncontrado.id : 1;

        if (productoEditando) {
            const actualizado = {
                ...productoEditando,
                codigo: data.codigo,
                nombre: data.nombre,
                descripcion: data.descripcion,
                precioUnidad: Number(data.precioUnidad),
                idCategoria,
                idMarca,
                idUnidad,
                idSucursal,
            };
            setProductos((prev) => prev.map((prod) => (prod.id === actualizado.id ? actualizado : prod)));

            // Actualizar o crear registro en productosXProveedores
            setProdXProv((prev) => {
                const existe = prev.find(item => item.id_Productos === productoEditando.id);
                if (existe) {
                    return prev.map(item => item.id_Productos === productoEditando.id ? {
                        ...item,
                        id_Proveedores,
                        codigo_Producto_Proveedor: data.codigo_Producto_Proveedor,
                        precio_Lista: Number(data.precio_Lista)
                    } : item);
                } else {
                    return [...prev, {
                        id: Date.now(),
                        id_Productos: productoEditando.id,
                        id_Proveedores,
                        codigo_Producto_Proveedor: data.codigo_Producto_Proveedor,
                        precio_Lista: Number(data.precio_Lista),
                        estado: true
                    }];
                }
            });

            Swal.fire({ icon: 'success', title: '¡Producto actualizado!', timer: 1800, showConfirmButton: false });
            return;
        }

        const nuevoId = Date.now();
        const nuevoProducto = {
            id: nuevoId,
            codigo: data.codigo,
            nombre: data.nombre,
            descripcion: data.descripcion,
            precioUnidad: Number(data.precioUnidad),
            idCategoria,
            idMarca,
            idUnidad,
            idSucursal,
            activo: true,
            detalleBaja: ''
        };

        const nuevaRelacionPxP = {
            id: Date.now() + 1,
            id_Productos: nuevoId,
            id_Proveedores,
            codigo_Producto_Proveedor: data.codigo_Producto_Proveedor,
            precio_Lista: Number(data.precio_Lista),
            estado: true
        };

        setProductos((prev) => [...prev, nuevoProducto]);
        setProdXProv((prev) => [...prev, nuevaRelacionPxP]);

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
        const catObj = categorias.find(c => c.id === p.idCategoria);
        const nombreCategoria = catObj ? catObj.nombre : '';
        const sucObj = sucursales.find(s => s.ID_Sucursales === p.idSucursal);
        const nombreSucursal = sucObj ? sucObj.Nombre : '';

        const pxp = prodXProv.find(item => item.id_Productos === p.id);
        const provObj = pxp ? proveedores.find(prov => prov.id === pxp.id_Proveedores) : null;
        const nombreProveedor = provObj ? provObj.nombreFantasia : '';
        const codigoProveedor = pxp ? pxp.codigo_Producto_Proveedor : '';

        if (tabActiva === 'activos') cumpleTab = p.activo;
        else if (tabActiva === 'inactivos') cumpleTab = !p.activo;
        else if (tabActiva === 'categoria') cumpleTab = categoriaSeleccionada ? nombreCategoria === categoriaSeleccionada : true;
        else if (tabActiva === 'sucursal') cumpleTab = sucursalSeleccionada ? nombreSucursal === sucursalSeleccionada : true;
        else if (tabActiva === 'proveedor') cumpleTab = proveedorSeleccionado ? nombreProveedor === proveedorSeleccionado : true;

        const query = busqueda.toLowerCase().trim();
        const marcaNombre = (marcasOpciones[p.idMarca - 1] || '').toLowerCase();
        
        const cumpleBusqueda = !query || 
            String(p.codigo).toLowerCase().includes(query) || 
            String(codigoProveedor).toLowerCase().includes(query) ||
            p.nombre.toLowerCase().includes(query) || 
            nombreCategoria.toLowerCase().includes(query) || 
            marcaNombre.includes(query) || 
            nombreSucursal.toLowerCase().includes(query) ||
            nombreProveedor.toLowerCase().includes(query);

        return cumpleTab && cumpleBusqueda;
    });

    const { datosVisibles, tieneMas, cargarMas } = usePagination(productosFiltrados, 10, [busqueda, tabActiva, categoriaSeleccionada, sucursalSeleccionada, proveedorSeleccionado]);

    const columnas = [
        'Cód. / Prov.', 
        'Producto', 
        <span key="prec" className="inline-flex items-center gap-1"><IconCash size={16} />Precio Venta</span>, 
        <span key="prov" className="inline-flex items-center gap-1"><IconTruckDelivery size={16} />Proveedor</span>,
        <span key="suc" className="inline-flex items-center gap-1"><IconBuildingStore size={16} />Sucursal</span>,
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
                const catObj = categorias.find(c => c.id === p.idCategoria);
                const marcaNombre = marcasOpciones[p.idMarca - 1] || 'Genérica';
                const sucObj = sucursales.find(s => s.ID_Sucursales === p.idSucursal);
                
                const pxp = prodXProv.find(item => item.id_Productos === p.id);
                const provObj = pxp ? proveedores.find(prov => prov.id === pxp.id_Proveedores) : null;

                return (
                    <tr key={p.id} className="fila-empleado">
                        <td className="celda-tabla-legajo">
                            <div className="font-semibold">{p.codigo}</div>
                            <div className="text-xs text-gray-500">{pxp ? pxp.codigo_Producto_Proveedor : '-'}</div>
                        </td>
                        <td className="celda-tabla-info">
                            <span className="info-empleado-flex">
                                <span className="avatar-iniciales">{iniciales(p.nombre)}</span>
                                <span className="producto-nombre-span">{p.nombre}</span>
                            </span>
                        </td>
                        <td className="celda-tabla-texto producto-precio-celda">${Number(p.precioUnidad).toLocaleString('es-AR')}</td>
                        <td className="celda-tabla-gris">{provObj ? provObj.nombreFantasia : 'Sin proveedor'}</td>
                        <td className="celda-tabla-gris">{sucObj ? sucObj.Nombre : 'Sin sucursal'}</td>
                        <td className="celda-tabla-gris">{catObj ? catObj.nombre : 'Sin categoría'}</td>
                        <td className="celda-tabla-texto">{marcaNombre}</td>
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