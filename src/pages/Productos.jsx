import { useState, useMemo } from 'react';
import Swal from 'sweetalert2';
import { IconTag, IconPencil, IconEdit, IconPower, IconCash, IconInfoCircle } from '@tabler/icons-react';
import Encabezado from '../components/Encabezado.jsx';
import GenericTable from '../components/common/GenericTable.jsx';
import SearchBar from '../components/common/SearchBar.jsx';
import FilterTabs from '../components/common/FilterTabs.jsx';
import FilterSelect from '../components/common/FilterSelect.jsx';
import GenericModalForm from '../components/common/GenericModalForm.jsx';
import GenericFab from '../components/common/GenericFab.jsx';
import LoadMoreButton from '../components/common/LoadMoreButton.jsx';
import { showDetailAlert } from '../components/common/showDetailAlert.js'; // Helper reutilizable compartido
import { usePagination } from '../hooks/usePagination.js';
// Importamos datos y opciones centralizadas directamente desde mock.js
import { productos as datosMock, categorias, marcasOpciones, unidadesOpciones } from '../data/mock.js';
import '../styles/Productos.css'; 

// Genera iniciales decorativas para la tabla si no tienen avatar (ej: "Porcellanato 60x60" -> "PO")
const iniciales = (nombre = '') => 
    nombre.split(' ').slice(0, 2).map((p) => p[0] || '').join('').toUpperCase();

export default function Productos() {
    // Añadimos una propiedad 'activo: true' por defecto a los mocks para mantener el mismo flujo que empleados
    const [productos, setProductos] = useState(
        datosMock.map(p => ({ ...p, activo: p.activo ?? true }))
    );
    const [busqueda, setBusqueda] = useState('');
    const [tabActiva, setTabActiva] = useState('todos');
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productoEditando, setProductoEditando] = useState(null); // null = modo "nuevo"

    const activos = productos.filter((p) => p.activo).length;
    const inactivos = productos.filter((p) => !p.activo).length;

    // Extraemos las categorías del mock para usarlas en los filtros y selects
    const categoriasDisponibles = categorias.map((c) => c.nombre);

    // Cálculo del siguiente código autogenerado para el formulario de prueba
    const siguienteCodigo = useMemo(() => {
        const ultimo = productos.length > 0 ? productos[productos.length - 1].codigo : 'PROD-000';
        return `PROD-${String(productos.length + 101)}`;
    }, [productos]);

    // Valores iniciales del modal: datos del producto (editar) o código nuevo (agregar)
    const valoresIniciales = useMemo(() => {
        if (!productoEditando) return { codigo: siguienteCodigo };
        
        // Buscar nombre de categoría, marca y unidad según sus IDs en el mock
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

    const abrirNuevo = () => {
        setProductoEditando(null);
        setIsModalOpen(true);
    };

    const abrirEdicion = (p) => {
        setProductoEditando(p);
        setIsModalOpen(true);
    };

    const cerrarModal = () => {
        setIsModalOpen(false);
        setProductoEditando(null);
    };

    // Función simplificada para mostrar únicamente la descripción limpia en la alerta
    const verDescripcion = (p) => {
        showDetailAlert({
            title: p.nombre,
            details: [], // Sin datos redundantes, la tabla ya muestra código, marca, categoría y unidad
            description: p.descripcion
        });
    };

    // Configuración de campos para el formulario genérico de productos (incluye descripción)
    const camposProducto = [
        { name: 'codigo', label: 'Código', placeholder: 'Ej: CER-6060-MB', required: true },
        { name: 'nombre', label: 'Nombre del Producto', placeholder: 'Ej: Porcellanato 60x60', required: true },
        { name: 'descripcion', label: 'Descripción', placeholder: 'Detalles del producto...', required: false },
        { name: 'precioUnidad', label: 'Precio de Venta ($)', type: 'number', placeholder: '37050', required: true },
        { 
            name: 'categoria', 
            label: 'Categoría', 
            type: 'select', 
            options: categoriasDisponibles,
            required: true 
        },
        { 
            name: 'idMarca', 
            label: 'Marca', 
            type: 'select', 
            options: marcasOpciones,
            required: true 
        },
        { 
            name: 'idUnidad', 
            label: 'Unidad de Medida', 
            type: 'select', 
            options: unidadesOpciones.map(u => u.label),
            required: true 
        }
    ];

    const cambiarEstado = async (p) => {
        const desactivar = p.activo;
        const { isConfirmed } = await Swal.fire({
            icon: 'question',
            title: desactivar ? '¿Desactivar producto?' : '¿Activar producto?',
            text: `${p.nombre} pasará a estar ${desactivar ? 'inactivo' : 'activo'}.`,
            showCancelButton: true,
            confirmButtonText: desactivar ? 'Desactivar' : 'Activar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#4a9da8',
        });
        if (!isConfirmed) return;
        setProductos((prev) => prev.map((prod) => (prod.id === p.id ? { ...prod, activo: !prod.activo } : prod)));
    };

    const handleGuardarProducto = (data) => {
        // Encontrar ID de categoría basada en el texto seleccionado
        const catEncontrada = categorias.find(c => c.nombre === data.categoria);
        const idCategoria = catEncontrada ? catEncontrada.id : 1;

        // Encontrar ID de marca basado en el índice de la opción
        const idMarca = marcasOpciones.indexOf(data.idMarca) + 1 || 1;

        // Encontrar ID de unidad basada en el texto seleccionado
        const unidadEncontrada = unidadesOpciones.find(u => u.label === data.idUnidad);
        const idUnidad = unidadEncontrada ? unidadEncontrada.id : 1;

        // Modo edición
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
            Swal.fire({
                icon: 'success',
                title: '¡Producto actualizado!',
                text: `Los cambios en ${actualizado.nombre} se guardaron correctamente.`,
                timer: 1800,
                showConfirmButton: false,
            });
            return;
        }

        // Modo creación
        const nuevoProducto = {
            id: Date.now(),
            codigo: data.codigo,
            nombre: data.nombre,
            descripcion: data.descripcion,
            precioUnidad: Number(data.precioUnidad),
            idCategoria,
            idMarca,
            idUnidad,
            activo: true
        };

        setProductos((prev) => [...prev, nuevoProducto]);
        Swal.fire({
            icon: 'success',
            title: '¡Producto agregado!',
            text: `${nuevoProducto.nombre} se registró correctamente en el inventario.`,
            timer: 1800,
            showConfirmButton: false
        });
    };

    // Pestañas superiores de filtro
    const tabs = [
        { id: 'todos', label: 'Todos', count: productos.length },
        { id: 'activos', label: 'Activos', count: activos },
        { id: 'inactivos', label: 'Inactivos', count: inactivos },
        { id: 'categoria', label: 'Por categoría' }
    ];

    // Lógica de filtrado por pestañas, categoría seleccionada y barra de búsqueda
    const productosFiltrados = productos.filter((p) => {
        let cumpleTab = true;
        const catObj = categorias.find(c => c.id === p.idCategoria);
        const nombreCategoria = catObj ? catObj.nombre : '';

        if (tabActiva === 'activos') {
            cumpleTab = p.activo;
        } else if (tabActiva === 'inactivos') {
            cumpleTab = !p.activo;
        } else if (tabActiva === 'categoria') {
            cumpleTab = categoriaSeleccionada ? nombreCategoria === categoriaSeleccionada : true;
        }

        const query = busqueda.toLowerCase().trim();
        const marcaNombre = (marcasOpciones[p.idMarca - 1] || '').toLowerCase();
        const cumpleBusqueda =
            !query ||
            String(p.codigo).toLowerCase().includes(query) ||
            p.nombre.toLowerCase().includes(query) ||
            nombreCategoria.toLowerCase().includes(query) ||
            marcaNombre.includes(query);

        return cumpleTab && cumpleBusqueda;
    });

    // Paginación progresiva (bloques de 10)
    const { datosVisibles, tieneMas, cargarMas } = usePagination(
        productosFiltrados, 
        10, 
        [busqueda, tabActiva, categoriaSeleccionada]
    );

    // Columnas de la tabla de productos (incluyendo Marca)
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
        <Encabezado 
            titulo="Productos" 
            subtitulo="Gestionar inventario, precios y artículos" 
        />
        
        {/* Barra de Búsqueda */}
        <SearchBar 
            value={busqueda} 
            onChange={setBusqueda} 
            placeholder="Buscar por código, nombre, categoría o marca..." 
        />

        {/* Pestañas de Filtro */}
        <FilterTabs 
            tabs={tabs} 
            activeTab={tabActiva} 
            onTabChange={(id) => {
                setTabActiva(id);
                if (id !== 'categoria') setCategoriaSeleccionada(''); 
            }} 
        />

        {/* Selector condicional para filtrar por categoría */}
        {tabActiva === 'categoria' && (
            <FilterSelect
                value={categoriaSeleccionada}
                onChange={setCategoriaSeleccionada}
                options={categoriasDisponibles}
                placeholder="Seleccioná una categoría..."
            />
        )}
        
        {/* Tabla Genérica */}
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
                                <div>
                                    <span className="block font-medium">{p.nombre}</span>
                                </div>
                            </span>
                        </td>
                        <td className="celda-tabla-texto font-semibold text-emerald-600">
                            ${Number(p.precioUnidad).toLocaleString('es-AR')}
                        </td>
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
                                {/* Botón para ver la descripción detallada */}
                                <button
                                    type="button"
                                    className="boton-accion-icono"
                                    onClick={() => verDescripcion(p)}
                                    title="Ver descripción"
                                    aria-label={`Ver descripción de ${p.nombre}`}
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

        {/* Botón "Ver más" condicional */}
        {tieneMas && (
            <LoadMoreButton 
                onClick={cargarMas} 
                text="Ver más productos" 
            />
        )}

        {/* Botón flotante para agregar nuevo producto */}
        <GenericFab 
            onClick={abrirNuevo} 
            title="Agregar nuevo producto" 
        />

        {/* Instancia del Modal Genérico */}
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