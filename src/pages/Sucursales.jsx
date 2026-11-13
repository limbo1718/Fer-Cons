import { useState, useMemo, useRef } from 'react';
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
import { sucursales as datos, empresas as datosEmpresas, ubicaciones } from '../data/mock.js';
import '../styles/Sucursales.css';

const iniciales = (nombre) => nombre.split(' ').slice(0, 2).map((p) => p[0]).join('').toUpperCase();

const formatearHora = (horaStr) => {
    if (!horaStr) return '';
    return horaStr.split(':').slice(0, 2).join(':');
};

const formatearFecha = (fechaStr) => {
    if (!fechaStr) return '';
    const [year, month, day] = fechaStr.split('-');
    return `${day}/${month}/${year}`;
};

export default function Sucursales() {
    const [empresas, setEmpresas] = useState(datosEmpresas);
    const [sucursales, setSucursales] = useState(
        datos.map(s => ({ ...s, activo: s.activo ?? true, detalleBaja: s.detalleBaja || '' }))
    );
    const [busqueda, setBusqueda] = useState('');
    const [tabActiva, setTabActiva] = useState('todos');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sucursalEditando, setSucursalEditando] = useState(null);

    const bloquearCierreRef = useRef(false);

    const activas = sucursales.filter((s) => s.activo).length;
    const inactivas = sucursales.filter((s) => !s.activo).length;

    // FIX 4: cálculo robusto del siguiente código
    const ultimoCodigo = sucursales.length > 0
        ? Math.max(...sucursales.map(s => Number(s.ID_Sucursales) || 0))
        : 3;
    const siguienteCodigo = String(ultimoCodigo + 1).padStart(3, '0');

    const valoresIniciales = useMemo(() => {
        if (!sucursalEditando) {
            return {
                ID_Empresas: empresas[0]?.ID_Empresas || 1,
                ID_Ubicaciones: ubicaciones[0]?.ID_Ubicaciones || 1,
                Hora_Ap: '08:00',
                Hora_C: '18:00',
                CUIT: empresas[0]?.CUIT || '',
                Razon_Social: empresas[0]?.Razon_Social || '',
                Ingresos_Brutos: empresas[0]?.Ingresos_Brutos || '',
                Fecha_Inicio_Act: empresas[0]?.Fecha_Inicio_Act || '',
                Condicion_IVA: empresas[0]?.Condicion_IVA || '',
                Dir_Fiscal: empresas[0]?.Dir_Fiscal || ''
            };
        }

        const empObj = empresas.find(e => e.ID_Empresas === sucursalEditando.ID_Empresas);
        const { Nombre, Hora_Ap, Hora_C, Contacto, Email_Suc, ID_Empresas, ID_Ubicaciones } = sucursalEditando;

        return {
            Nombre,
            Hora_Ap: formatearHora(Hora_Ap),
            Hora_C: formatearHora(Hora_C),
            Contacto,
            Email_Suc: Email_Suc || '',
            ID_Empresas,
            ID_Ubicaciones,
            CUIT: empObj?.CUIT || '',
            Razon_Social: empObj?.Razon_Social || '',
            Ingresos_Brutos: empObj?.Ingresos_Brutos || '',
            Fecha_Inicio_Act: empObj?.Fecha_Inicio_Act || '',
            Condicion_IVA: empObj?.Condicion_IVA || '',
            Dir_Fiscal: empObj?.Dir_Fiscal || ''
        };
    }, [sucursalEditando, empresas]);

    const abrirNuevo = () => {
        setSucursalEditando(null);
        setIsModalOpen(true);
    };

    const abrirEdicion = (s) => {
        setSucursalEditando(s);
        setIsModalOpen(true);
    };

    const cerrarModal = () => {
        if (bloquearCierreRef.current) {
            bloquearCierreRef.current = false;
            return;
        }
        setIsModalOpen(false);
        setSucursalEditando(null);
    };

    // Opción A: Detalle ampliado con datos cruzados Empresa ↔ Sucursal
    const verDetalleBaja = (s) => {
        const ubicacionObj = ubicaciones.find(u => u.ID_Ubicaciones === s.ID_Ubicaciones);
        const direccionText = ubicacionObj ? `${ubicacionObj.Calle} ${ubicacionObj.Nro_Calle}` : 'Sin dirección';
        const empObj = empresas.find(e => e.ID_Empresas === s.ID_Empresas);

        showDetailAlert({
            title: s.Nombre,
            details: [
                // Datos de la Empresa
                { label: 'Empresa', value: empObj?.Nombre_Emp || '-' },
                { label: 'Razón Social', value: empObj?.Razon_Social || '-' },
                { label: 'CUIT', value: empObj?.CUIT || '-' },
                { label: 'Dirección Fiscal', value: empObj?.Dir_Fiscal || '-' },
                // Datos de la Sucursal
                { label: 'Dirección Física', value: direccionText },
                { label: 'Horario', value: `${formatearHora(s.Hora_Ap)} - ${formatearHora(s.Hora_C)}` },
                // Contactos claramente identificados
                { label: 'Teléfono Sucursal', value: s.Contacto || '-' },
                { label: 'Email Sucursal', value: s.Email_Suc || '-' },
                { label: 'Teléfono Empresa', value: empObj?.Telefono || '-' },
                { label: 'Email Empresa', value: empObj?.Email || '-' }
            ],
            description: s.detalleBaja || 'Esta sucursal fue dada de baja sin especificar un motivo detallado.'
        });
    };

    // Opción A: sin campo 'ID_Sucursales' (Código)
    // FIX 1: Condicion_IVA con formato {value, label}
    const camposSucursal = [
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
            label: 'Ubicación / Dirección Física',
            type: 'select',
            options: ubicaciones.map(u => ({ value: u.ID_Ubicaciones, label: `${u.Calle} ${u.Nro_Calle}` })),
            required: true
        },
        { name: 'Hora_Ap', label: 'Hora Apertura', type: 'time', required: true },
        { name: 'Hora_C', label: 'Hora Cierre', type: 'time', required: true },
        { name: 'Contacto', label: 'Teléfono / Contacto Sucursal', placeholder: '3874000000', required: true },
        { name: 'Email_Suc', label: 'Email Sucursal', type: 'email', placeholder: 'sucursal@fercons.com', required: true },
        { name: 'CUIT', label: 'CUIT (Empresa)', placeholder: '30-XXXXXXXX-X', required: true },
        { name: 'Razon_Social', label: 'Razón Social (Empresa)', placeholder: 'Ej: Fer-Cons S.A.', required: true },
        { name: 'Ingresos_Brutos', label: 'Ingresos Brutos', placeholder: 'Nro de IIBB', required: true },
        { name: 'Fecha_Inicio_Act', label: 'Fecha Inicio Actividades', type: 'date', required: true },
        {
            name: 'Condicion_IVA',
            label: 'Condición IVA',
            type: 'select',
            options: ['Responsable Inscripto', 'Monotributista', 'Exento', 'Consumidor Final']
                .map(v => ({ value: v, label: v })),
            required: true
        },
        { name: 'Dir_Fiscal', label: 'Dirección Fiscal', placeholder: 'Calle y número (no física)', required: true }
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

        setEmpresas((prevEmpresas) =>
            prevEmpresas.map(emp =>
                emp.ID_Empresas === idEmpresaNum
                    ? {
                        ...emp,
                        CUIT: data.CUIT,
                        Razon_Social: data.Razon_Social,
                        Ingresos_Brutos: data.Ingresos_Brutos,
                        Fecha_Inicio_Act: data.Fecha_Inicio_Act,
                        Condicion_IVA: data.Condicion_IVA,
                        Dir_Fiscal: data.Dir_Fiscal
                      }
                    : emp
            )
        );

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
            ID_Sucursales: Number(siguienteCodigo), // Se genera internamente, el usuario no lo ve
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

    const tabs = [
        { id: 'todos', label: 'Todas', count: sucursales.length },
        { id: 'activas', label: 'Activas', count: activas },
        { id: 'inactivas', label: 'Inactivas', count: inactivas }
    ];

    // FIX 3: la búsqueda ahora también cubre teléfono/email de la empresa
    const sucursalesFiltradas = sucursales.filter((s) => {
        const ubicacionObj = ubicaciones.find(u => u.ID_Ubicaciones === s.ID_Ubicaciones);
        const direccionText = ubicacionObj ? `${ubicacionObj.Calle} ${ubicacionObj.Nro_Calle}` : '';
        const empObj = empresas.find(e => e.ID_Empresas === s.ID_Empresas);

        let cumpleTab = true;
        if (tabActiva === 'activas') {
            cumpleTab = s.activo;
        } else if (tabActiva === 'inactivas') {
            cumpleTab = !s.activo;
        }

        const query = busqueda.toLowerCase().trim();
        const cumpleBusqueda =
            !query ||
            s.Nombre.toLowerCase().includes(query) ||
            s.Contacto.toLowerCase().includes(query) ||
            (s.Email_Suc && s.Email_Suc.toLowerCase().includes(query)) ||
            direccionText.toLowerCase().includes(query) ||
            (empObj && empObj.Nombre_Emp.toLowerCase().includes(query)) ||
            (empObj && empObj.CUIT.toLowerCase().includes(query)) ||
            (empObj && empObj.Razon_Social.toLowerCase().includes(query)) ||
            (empObj && empObj.Telefono && empObj.Telefono.toLowerCase().includes(query)) ||
            (empObj && empObj.Email && empObj.Email.toLowerCase().includes(query));

        return cumpleTab && cumpleBusqueda;
    });

    const { datosVisibles, tieneMas, cargarMas } = usePagination(
        sucursalesFiltradas,
        10,
        [busqueda, tabActiva]
    );

    // Opción A: sin columna 'Código'
    const columnas = [
        'Sucursal',
        'Empresa',
        'Razón Social',
        'CUIT',
        'Ing. Brutos',
        'Condición IVA',
        'F. Inicio Act.',
        'Dirección Fiscal',
        'Dirección Física',
        <span key="horario" className="columna-con-icono"><IconClock size={16} />Horario</span>,
        <span key="tel-emp" className="columna-con-icono"><IconPhone size={16} />Tel. Empresa</span>,
        <span key="tel-suc" className="columna-con-icono"><IconPhone size={16} />Tel. Sucursal</span>,
        'Email Empresa',
        'Email Sucursal',
        'Estado',
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
            placeholder="Buscar por nombre, empresa, CUIT, razón social, dirección, teléfono o email..."
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
                const empObj = empresas.find(e => e.ID_Empresas === s.ID_Empresas);

                return (
                    <tr key={s.ID_Sucursales} className="fila-empleado">
                        {/* Opción A: ya no hay celda del Código */}
                        <td className="celda-tabla-info">
                            <span className="info-empleado-flex">
                                <span className="avatar-iniciales">{iniciales(s.Nombre)}</span>
                                <div className="proveedor-info-detalles">
                                    <strong>{s.Nombre}</strong>
                                </div>
                            </span>
                        </td>

                        <td className="celda-tabla-gris">{empObj?.Nombre_Emp || '-'}</td>
                        <td className="celda-tabla-gris">{empObj?.Razon_Social || '-'}</td>
                        <td className="celda-tabla-texto">{empObj?.CUIT || '-'}</td>
                        <td className="celda-tabla-texto">{empObj?.Ingresos_Brutos || '-'}</td>
                        <td className="celda-tabla-texto">{empObj?.Condicion_IVA || '-'}</td>
                        <td className="celda-tabla-texto">{formatearFecha(empObj?.Fecha_Inicio_Act)}</td>
                        <td className="celda-tabla-gris">{empObj?.Dir_Fiscal || '-'}</td>

                        <td className="celda-tabla-texto">{direccionText}</td>
                        <td className="celda-tabla-texto">{formatearHora(s.Hora_Ap)} - {formatearHora(s.Hora_C)}</td>
                        <td className="celda-tabla-texto">{empObj?.Telefono || '-'}</td>
                        <td className="celda-tabla-texto">{s.Contacto || '-'}</td>
                        <td className="celda-tabla-gris">{empObj?.Email || '-'}</td>
                        <td className="celda-tabla-gris">{s.Email_Suc || '-'}</td>

                        <td className="celda-tabla-texto">
                            <span className={`etiqueta-estado ${s.activo ? 'estado-activo' : 'estado-inactivo'}`}>
                                {s.activo ? 'Activo' : 'Inactivo'}
                            </span>
                        </td>

                        <td className="celda-tabla-info">
                            <span className="acciones-fila">
                                {!s.activo && (
                                    <button
                                        type="button"
                                        onClick={() => verDetalleBaja(s)}
                                        className="boton-accion-icono"
                                        title="Ver motivo de baja"
                                        aria-label={`Ver detalle de ${s.Nombre}`}
                                    >
                                        <IconInfoCircle size={18} />
                                    </button>
                                )}

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
            subtitle={sucursalEditando ? 'Modificá los datos de la sucursal y de la empresa.' : '¡Rellena los campos para añadir una nueva sucursal!'}
            fields={camposSucursal}
            initialValues={valoresIniciales}
            onSubmit={handleGuardarSucursal}
            submitText={sucursalEditando ? 'Guardar cambios' : 'Guardar sucursal'}
        />
        </>
    );
}