import { useState, useMemo } from 'react';
import Swal from 'sweetalert2';
import { IconPhone, IconEdit, IconPower, IconInfoCircle, IconClock } from '@tabler/icons-react';
import Encabezado from '../components/Encabezado.jsx';
import GenericTable from '../components/common/GenericTable.jsx';
import SearchBar from '../components/common/SearchBar.jsx';
import FilterTabs from '../components/common/FilterTabs.jsx';
import GenericModalForm from '../components/common/GenericModalForm.jsx';
import GenericFab from '../components/common/GenericFab.jsx';
import LoadMoreButton from '../components/common/LoadMoreButton.jsx';
import { showDetailAlert } from '../components/common/showDetailAlert.js';
import { showConfirmInputAlert } from '../components/common/showConfirmInputAlert.js';
import { showReactivateAlert } from '../components/common/showReactivateAlert.js';
import { usePagination } from '../hooks/usePagination.js';
import { sucursales as datos, empresas, ubicaciones } from '../data/mock.js';
import '../styles/Sucursales.css';

const iniciales = (nombre) => nombre.split(' ').slice(0, 2).map((p) => p[0]).join('').toUpperCase();

// Función auxiliar para recortar los segundos de la hora (ej: '08:00:00' -> '08:00')
const formatearHora = (horaStr) => {
    if (!horaStr) return '';
    return horaStr.split(':').slice(0, 2).join(':');
};

export default function Sucursales() {
    const [sucursales, setSucursales] = useState(
        datos.map(s => ({ ...s, activo: s.activo ?? true, detalleBaja: s.detalleBaja || '' }))
    );
    const [busqueda, setBusqueda] = useState('');
    const [tabActiva, setTabActiva] = useState('todos');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sucursalEditando, setSucursalEditando] = useState(null);

    const activas = sucursales.filter((s) => s.activo).length;
    const inactivas = sucursales.filter((s) => !s.activo).length;

    const ultimoCodigo = sucursales.length > 0 ? String(sucursales[sucursales.length - 1].ID_Sucursales) : '3';
    const siguienteCodigo = String(Number(ultimoCodigo) + 1).padStart(3, '0');

    const valoresIniciales = useMemo(() => {
        if (!sucursalEditando) {
            return { 
                ID_Sucursales: siguienteCodigo, 
                ID_Empresas: empresas[0]?.ID_Empresas || 1,
                ID_Ubicaciones: ubicaciones[0]?.ID_Ubicaciones || 1,
                Hora_Ap: '08:00',
                Hora_C: '18:00'
            };
        }
        const { ID_Sucursales, Nombre, Hora_Ap, Hora_C, Contacto, Email_Suc, ID_Empresas, ID_Ubicaciones } = sucursalEditando;
        return { 
            ID_Sucursales, 
            Nombre, 
            Hora_Ap: formatearHora(Hora_Ap), 
            Hora_C: formatearHora(Hora_C), 
            Contacto, 
            Email_Suc: Email_Suc || '', 
            ID_Empresas, 
            ID_Ubicaciones 
        };
    }, [sucursalEditando, siguienteCodigo]);

    const abrirNuevo = () => {
        setSucursalEditando(null);
        setIsModalOpen(true);
    };

    const abrirEdicion = (s) => {
        setSucursalEditando(s);
        setIsModalOpen(true);
    };

    const cerrarModal = () => {
        setIsModalOpen(false);
        setSucursalEditando(null);
    };

    const verDetalleBaja = (s) => {
        const ubicacionObj = ubicaciones.find(u => u.ID_Ubicaciones === s.ID_Ubicaciones);
        const direccionText = ubicacionObj ? `${ubicacionObj.Calle} ${ubicacionObj.Nro_Calle}` : 'Sin dirección';

        showDetailAlert({
            title: s.Nombre,
            details: [
                { label: 'Dirección', value: direccionText },
                { label: 'Horario', value: `${formatearHora(s.Hora_Ap)} - ${formatearHora(s.Hora_C)}` },
                { label: 'Contacto', value: s.Contacto }
            ],
            description: s.detalleBaja || 'Esta sucursal fue dada de baja sin especificar un motivo detallado.'
        });
    };

    const camposSucursal = [
        { name: 'ID_Sucursales', label: 'Código', disabled: true, badge: 'AUTOGENERADO' },
        { name: 'Nombre', label: 'Nombre de Sucursal', placeholder: 'Ej: Casa Central', required: true },
        { 
            name: 'ID_Empresas', 
            label: 'Empresa', 
            type: 'select', 
            options: empresas.map(e => ({ value: e.ID_Empresas, label: e.Nombre_Emp })),
            required: true 
        },
        { 
            name: 'ID_Ubicaciones', 
            label: 'Ubicación / Dirección', 
            type: 'select', 
            options: ubicaciones.map(u => ({ value: u.ID_Ubicaciones, label: `${u.Calle} ${u.Nro_Calle}` })),
            required: true 
        },
        { name: 'Hora_Ap', label: 'Hora Apertura', type: 'time', required: true },
        { name: 'Hora_C', label: 'Hora Cierre', type: 'time', required: true },
        { name: 'Contacto', label: 'Teléfono / Contacto', placeholder: '3874000000', required: true },
        { name: 'Email_Suc', label: 'Email Sucursal', type: 'email', placeholder: 'sucursal@fercons.com', required: true }
    ];

    const cambiarEstado = async (s) => {
        const desactivar = s.activo;
        let motivoBaja = s.detalleBaja || '';

        if (desactivar) {
            const motivo = await showConfirmInputAlert({
                title: `Motivo de baja - ${s.Nombre}`,
                subtitle: 'Gestión de Sucursales',
                inputValue: s.detalleBaja || '',
                confirmButtonText: 'Dar de baja'
            });

            if (!motivo) return;
            motivoBaja = motivo;
        } else {
            const confirmado = await showReactivateAlert({
                entity: 'sucursal',
                name: s.Nombre,
                feminine: true
            });
            if (!confirmado) return;
        }

        setSucursales((prev) => 
            prev.map((suc) => 
                suc.ID_Sucursales === s.ID_Sucursales 
                    ? { ...suc, activo: !suc.activo, detalleBaja: desactivar ? motivoBaja : '' } 
                    : suc
            )
        );

        Swal.fire({
            icon: 'success',
            title: desactivar ? 'Sucursal desactivada' : 'Sucursal activada',
            text: `El estado de ${s.Nombre} se actualizó correctamente.`,
            timer: 1800,
            showConfirmButton: false
        });
    };

    const handleGuardarSucursal = (data) => {
        const idEmpresaNum = Number(data.ID_Empresas);
        const idUbicacionNum = Number(data.ID_Ubicaciones);

        if (sucursalEditando) {
            const actualizada = {
                ...sucursalEditando,
                Nombre: data.Nombre,
                Hora_Ap: data.Hora_Ap,
                Hora_C: data.Hora_C,
                Contacto: data.Contacto,
                Email_Suc: data.Email_Suc,
                ID_Empresas: idEmpresaNum,
                ID_Ubicaciones: idUbicacionNum,
            };
            setSucursales((prev) => prev.map((suc) => (suc.ID_Sucursales === actualizada.ID_Sucursales ? actualizada : suc)));
            Swal.fire({
                icon: 'success',
                title: '¡Sucursal actualizada!',
                text: `Los datos de ${actualizada.Nombre} se guardaron correctamente.`,
                timer: 1800,
                showConfirmButton: false
            });
            return;
        }

        const nuevaSucursal = {
            ID_Sucursales: Number(siguienteCodigo),
            Nombre: data.Nombre,
            Hora_Ap: data.Hora_Ap,
            Hora_C: data.Hora_C,
            Contacto: data.Contacto,
            Email_Suc: data.Email_Suc,
            ID_Empresas: idEmpresaNum,
            ID_Ubicaciones: idUbicacionNum,
            activo: true,
            detalleBaja: ''
        };

        setSucursales((prev) => [...prev, nuevaSucursal]);
        Swal.fire({
            icon: 'success',
            title: '¡Sucursal agregada!',
            text: `${nuevaSucursal.Nombre} se registró correctamente.`,
            timer: 1800,
            showConfirmButton: false
        });
    };

    // Solución del filtrado duplicado: Se pasa únicamente el texto base en 'label' y el número en 'count'
    const tabs = [
        { id: 'todos', label: 'Todas', count: sucursales.length },
        { id: 'activas', label: 'Activas', count: activas },
        { id: 'inactivas', label: 'Inactivas', count: inactivas }
    ];

    const sucursalesFiltradas = sucursales.filter((s) => {
        const ubicacionObj = ubicaciones.find(u => u.ID_Ubicaciones === s.ID_Ubicaciones);
        const direccionText = ubicacionObj ? `${ubicacionObj.Calle} ${ubicacionObj.Nro_Calle}` : '';

        let cumpleTab = true;
        if (tabActiva === 'activas') {
            cumpleTab = s.activo;
        } else if (tabActiva === 'inactivas') {
            cumpleTab = !s.activo;
        }

        const query = busqueda.toLowerCase().trim();
        const cumpleBusqueda =
            !query ||
            String(s.ID_Sucursales).toLowerCase().includes(query) ||
            s.Nombre.toLowerCase().includes(query) ||
            s.Contacto.toLowerCase().includes(query) ||
            (s.Email_Suc && s.Email_Suc.toLowerCase().includes(query)) ||
            direccionText.toLowerCase().includes(query);

        return cumpleTab && cumpleBusqueda;
    });

    const { datosVisibles, tieneMas, cargarMas } = usePagination(
        sucursalesFiltradas, 
        10, 
        [busqueda, tabActiva]
    );

    const columnas = [
        'Código', 
        'Sucursal', 
        'Dirección',
        <span key="horario" className="inline-flex items-center gap-1"><IconClock size={16} />Horario</span>,
        <span key="tel" className="inline-flex items-center gap-1"><IconPhone size={16} />Teléfono</span>, 
        'Email', 
        'Estado', 
        'Justificación',
        'Acciones'
    ];

    return (
        <>
        <Encabezado 
            titulo="Sucursales" 
            subtitulo="Gestionar información y estado de las sucursales" 
        />
        
        <SearchBar 
            value={busqueda} 
            onChange={setBusqueda} 
            placeholder="Buscar por código, nombre, dirección, teléfono o email..." 
        />

        <FilterTabs 
            tabs={tabs} 
            activeTab={tabActiva} 
            onTabChange={setTabActiva} 
        />
        
        <GenericTable
            columnas={columnas}
            datos={datosVisibles}
            renderFila={(s) => {
                const ubicacionObj = ubicaciones.find(u => u.ID_Ubicaciones === s.ID_Ubicaciones);
                const direccionText = ubicacionObj ? `${ubicacionObj.Calle} ${ubicacionObj.Nro_Calle}` : 'Sin dirección';

                return (
                    <tr key={s.ID_Sucursales} className="fila-empleado">
                        <td className="celda-tabla-legajo">N.° {String(s.ID_Sucursales).padStart(3, '0')}</td>
                        <td className="celda-tabla-info">
                            <span className="info-empleado-flex">
                                <span className="avatar-iniciales">{iniciales(s.Nombre)}</span>
                                <div className="proveedor-info-detalles">
                                    <strong>{s.Nombre}</strong>
                                </div>
                            </span>
                        </td>
                        <td className="celda-tabla-texto">{direccionText}</td>
                        <td className="celda-tabla-texto">{formatearHora(s.Hora_Ap)} - {formatearHora(s.Hora_C)}</td>
                        <td className="celda-tabla-texto">{s.Contacto}</td>
                        <td className="celda-tabla-gris">{s.Email_Suc || '-'}</td>
                        <td className="celda-tabla-texto">
                            <span className={`etiqueta-estado ${s.activo ? 'estado-activo' : 'estado-inactivo'}`}>
                                {s.activo ? 'Activo' : 'Inactivo'}
                            </span>
                        </td>
                        <td className="celda-tabla-info">
                            {!s.activo ? (
                                <button 
                                    type="button" 
                                    onClick={() => verDetalleBaja(s)} 
                                    className="boton-justificacion"
                                    title="Ver motivo de baja"
                                >
                                    <span className="contenido-boton-justificacion">
                                        <IconInfoCircle size={16} />Detalle
                                    </span>
                                </button>
                            ) : (
                                <span className="celda-tabla-gris">-</span>
                            )}
                        </td>
                        <td className="celda-tabla-info">
                            <span className="acciones-fila">
                                <button
                                    type="button"
                                    className="boton-accion-icono"
                                    onClick={() => abrirEdicion(s)}
                                    title="Editar sucursal"
                                    aria-label={`Editar ${s.Nombre}`}
                                >
                                    <IconEdit size={18} />
                                </button>
                                <button
                                    type="button"
                                    className={`boton-accion-icono ${s.activo ? 'accion-desactivar' : 'accion-activar'}`}
                                    onClick={() => cambiarEstado(s)}
                                    title={s.activo ? 'Desactivar sucursal' : 'Activar sucursal'}
                                    aria-label={`${s.activo ? 'Desactivar' : 'Activar'} ${s.Nombre}`}
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
                text="Ver más sucursales" 
            />
        )}

        <GenericFab 
            onClick={abrirNuevo} 
            title="Agregar nueva sucursal" 
        />

        <GenericModalForm
            isOpen={isModalOpen}
            onClose={cerrarModal}
            title={sucursalEditando ? 'Editar sucursal' : 'Nueva sucursal'}
            subtitle={sucursalEditando ? 'Modificá los datos de la sucursal y guardá los cambios.' : '¡Rellena los campos para añadir una nueva sucursal!'}
            fields={camposSucursal}
            initialValues={valoresIniciales}
            onSubmit={handleGuardarSucursal}
            submitText={sucursalEditando ? 'Guardar cambios' : 'Guardar sucursal'}
        />
        </>
    );
}