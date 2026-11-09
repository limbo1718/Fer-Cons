import { useState, useMemo } from 'react';
import Swal from 'sweetalert2';
import { IconEdit, IconPower, IconCash, IconInfoCircle } from '@tabler/icons-react';
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
import { productos as datosMock, categorias, marcasOpciones, unidadesOpciones } from '../data/mock.js';
import '../styles/Productos.css'; 

const iniciales = (nombre = '') => 
    nombre.split(' ').slice(0, 2).map((p) => p[0] || '').join('').toUpperCase();

export default function Productos() {
    const [productos, setProductos] = useState(
        datosMock.map(p => ({ ...p, activo: p.activo ?? true, detalleBaja: p.detalleBaja || '' }))
    );
    const [busqueda, setBusqueda] = useState('');
    const [tabActiva, setTabActiva] = useState('todos');
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productoEditando, setProductoEditando] = useState(null);

    const activos = productos.filter((p) => p.activo).length;
    const inactivos = productos.filter((p) => !p.activo).length;
    const categoriasDisponibles = categorias.map((c) => c.nombre);

    const siguienteCodigo = useMemo(() => {
        return `PROD-${String(productos.length + 101)}`;
    }, [productos]);

    const valoresIniciales = useMemo(() => {
        if (!productoEditando) return { codigo: siguienteCodigo };
        const catObj = categorias.find(c => c.id === productoEditando.idCategoria);
        const marcaNombre = marcasOpciones[productoEditando.idMarca - 1] || 'Genérica';
        const unidadObj = unidadesOpciones.find(u => u.id === productoEditando.idUnidad);
        
        return {
            codigo: productoEditando.codigo || '',
            nombre: productoEditando.nombre || '',
            descripcion: productoEditando.descripcion || '',
            precioUnidad: productoEditando.precioUnidad || '',
            categoria: catObj ? catObj.nombre : categorias[0]?.nombre || '',
            idMarca: marcaNombre,
            idUnidad: unidadObj ? unidadObj.label : 'Unidad',
        };
    }, [productoEditando, siguienteCodigo]);

    const abrirNuevo = () => { setProductoEditando(null); setIsModalOpen(true); };
    const abrirEdicion = (p) => { setProductoEditando(p); setIsModalOpen(true); };
    const cerrarModal = () => { setIsModalOpen(false); setProductoEditando(null); };

    const verDescripcion = (p) => {
        showDetailAlert({
            title: p.nombre,
            details: [
                { label: 'Código', value: p.codigo },
                { label: 'Precio', value: `$${Number(p.precioUnidad).toLocaleString('es-AR')}` }
            ],
            description: p.activo 
                ? (p.descripcion || 'No cuenta con una descripción detallada.')
                : (p.detalleBaja || 'Este producto fue dado de baja sin especificar un motivo detallado.')
        });
    };

    const camposProducto = [
        { name: 'codigo', label: 'Código', placeholder: 'Ej: CER-6060-MB', required: true },
        { name: 'nombre', label: 'Nombre del Producto', placeholder: 'Ej: Porcellanato 60x60', required: true },
        { name: 'descripcion', label: 'Descripción', placeholder: 'Detalles del producto...', required: false },
        { name: 'precioUnidad', label: 'Precio de Venta ($)', type: 'number', placeholder: '37050', required: true },
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
                        <span class="swal-reactivacion-sub">
                            Reactivación
                        </span>
                        <h2 class="swal-reactivacion-titulo">
                            ¿Activar producto?
                        </h2>
                        <p class="swal-reactivacion-texto">
                            <strong>${p.nombre}</strong> pasará a estar activo nuevamente.
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
                        actions.className = 'swal-actions-custom'; 
                    }
                    if (confirmBtn) { 
                        confirmBtn.className = 'swal-btn-confirm-custom'; 
                    }
                    if (cancelBtn) { 
                        cancelBtn.className = 'swal-btn-cancel-custom'; 
                    }
                }
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

    const handleGuardarProducto = (data) => {
        const catEncontrada = categorias.find(c => c.nombre === data.categoria);
        const idCategoria = catEncontrada ? catEncontrada.id : 1;
        const idMarca = marcasOpciones.indexOf(data.idMarca) + 1 || 1;
        const unidadEncontrada = unidadesOpciones.find(u => u.label === data.idUnidad);
        const idUnidad = unidadEncontrada ? unidadEncontrada.id : 1;

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
            idCategoria,
            idMarca,
            idUnidad,
            activo: true,
            detalleBaja: ''
        };

        setProductos((prev) => [...prev, nuevoProducto]);
        Swal.fire({ icon: 'success', title: '¡Producto agregado!', timer: 1800, showConfirmButton: false });
    };

    const tabs = [
        { id: 'todos', label: 'Todos', count: productos.length },
        { id: 'activos', label: 'Activos', count: activos },
        { id: 'inactivos', label: 'Inactivos', count: inactivos },
        { id: 'categoria', label: 'Por categoría' }
    ];

    const productosFiltrados = productos.filter((p) => {
        let cumpleTab = true;
        const catObj = categorias.find(c => c.id === p.idCategoria);
        const nombreCategoria = catObj ? catObj.nombre : '';

        if (tabActiva === 'activos') cumpleTab = p.activo;
        else if (tabActiva === 'inactivos') cumpleTab = !p.activo;
        else if (tabActiva === 'categoria') cumpleTab = categoriaSeleccionada ? nombreCategoria === categoriaSeleccionada : true;

        const query = busqueda.toLowerCase().trim();
        const marcaNombre = (marcasOpciones[p.idMarca - 1] || '').toLowerCase();
        const cumpleBusqueda = !query || String(p.codigo).toLowerCase().includes(query) || p.nombre.toLowerCase().includes(query) || nombreCategoria.toLowerCase().includes(query) || marcaNombre.includes(query);

        return cumpleTab && cumpleBusqueda;
    });

    const { datosVisibles, tieneMas, cargarMas } = usePagination(productosFiltrados, 10, [busqueda, tabActiva, categoriaSeleccionada]);

    const columnas = [
        'Código', 
        'Producto', 
        <span key="prec" className="inline-flex items-center gap-1"><IconCash size={16} />Precio Unitario</span>, 
        'Categoría', 
        'Marca',
        'Unidad', 
        'Estado', 
        'Acciones'
    ];

    return (
        <>
        <Encabezado titulo="Productos" subtitulo="Gestionar inventario, precios y artículos" />
        <SearchBar value={busqueda} onChange={setBusqueda} placeholder="Buscar por código, nombre, categoría o marca..." />
        <FilterTabs tabs={tabs} activeTab={tabActiva} onTabChange={(id) => { setTabActiva(id); if (id !== 'categoria') setCategoriaSeleccionada(''); }} />

        {tabActiva === 'categoria' && (
            <FilterSelect value={categoriaSeleccionada} onChange={setCategoriaSeleccionada} options={categoriasDisponibles} placeholder="Seleccioná una categoría..." />
        )}
        
        <GenericTable
            columnas={columnas}
            datos={datosVisibles}
            renderFila={(p) => {
                const catObj = categorias.find(c => c.id === p.idCategoria);
                const marcaNombre = marcasOpciones[p.idMarca - 1] || 'Genérica';
                const unidadObj = unidadesOpciones.find(u => u.id === p.idUnidad);

                return (
                    <tr key={p.id} className="fila-empleado">
                        <td className="celda-tabla-legajo">{p.codigo}</td>
                        <td className="celda-tabla-info">
                            <span className="info-empleado-flex">
                                <span className="avatar-iniciales">{iniciales(p.nombre)}</span>
                                <span className="producto-nombre-span">{p.nombre}</span>
                            </span>
                        </td>
                        <td className="celda-tabla-texto producto-precio-celda">${Number(p.precioUnidad).toLocaleString('es-AR')}</td>
                        <td className="celda-tabla-gris">{catObj ? catObj.nombre : 'Sin categoría'}</td>
                        <td className="celda-tabla-texto">{marcaNombre}</td>
                        <td className="celda-tabla-texto">{unidadObj ? unidadObj.label : 'Unidad'}</td>
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
            subtitle={productoEditando ? 'Modificá los datos del artículo y guardá los cambios.' : '¡Rellena los campos para añadir un nuevo producto al stock!'}
            fields={camposProducto}
            initialValues={valoresIniciales}
            onSubmit={handleGuardarProducto}
            submitText={productoEditando ? 'Guardar cambios' : 'Guardar producto'}
        />
        </>
    );
}