import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { 
    IconArrowLeft, 
    IconUser, 
    IconId, 
    IconHash, 
    IconPhone, 
    IconMail, 
    IconCalendarEvent,
    IconShieldCheck,
    IconDeviceFloppy,
    IconLock
} from '@tabler/icons-react';
import { useAuth } from '../context/AuthContext.jsx';
import Encabezado from '../components/Encabezado.jsx';
// ADAPTACIÓN: Importamos las tablas necesarias para el JOIN
import { usuarioDemo, empleados, usuarios, sucursales_x_empleados } from '../data/mock.js';
import '../styles/Perfil.css';

export default function Perfil() {
    const { user } = useAuth();
    const navigate = useNavigate();

    // 1. Cruzamos los datos reales usando el legajo de la sesión
    const perfilData = useMemo(() => {
        if (!user) return null;

        // Si el que entró es el Admin Demo, usamos sus datos fijos
        if (String(user.legajo) === String(usuarioDemo.Legajo)) {
            return {
                nombre: usuarioDemo.Nombre,
                dni: usuarioDemo.DNI_Empleados,
                telefono: usuarioDemo.Telefono,
                email: usuarioDemo.Email,
                legajo: usuarioDemo.Legajo,
                rol: usuarioDemo.Ocupacion,
                activo: usuarioDemo.Estado,
                fechaAsociacion: usuarioDemo.Fecha_Asociacion
            };
        }

        // Si es un empleado real, buscamos en la tabla EMPLEADOS por su legajo
        const empEncontrado = empleados.find(e => String(e.Legajo) === String(user.legajo));
        if (!empEncontrado) return null;

        // Buscamos el email en USUARIOS y la fecha en SUCURSALES_X_EMPLEADOS
        const usrEncontrado = usuarios.find(u => u.ID_Usuarios === empEncontrado.ID_Usuarios);
        const sucursalEncontrada = sucursales_x_empleados.find(s => s.ID_Empleados === empEncontrado.ID_Empleados);

        return {
            nombre: `${empEncontrado.Nombre} ${empEncontrado.Apellido}`,
            dni: empEncontrado.DNI_Empleados,
            telefono: empEncontrado.Telefono,
            email: usrEncontrado?.Email || user.correo || 'Sin email',
            legajo: empEncontrado.Legajo,
            rol: user.rol,
            activo: empEncontrado.Estado,
            fechaAsociacion: sucursalEncontrada?.Fecha_Asociacion || 'N/A'
        };
    }, [user]);

    // 2. Estado editable para los campos
    const [formData, setFormData] = useState({
        nombre: '',
        dni: '',
        telefono: '',
        email: ''
    });

    // Sincronizamos el formulario cuando los datos del perfil estén listos
    useEffect(() => {
        if (perfilData) {
            setFormData({
                nombre: perfilData.nombre,
                dni: perfilData.dni,
                telefono: perfilData.telefono,
                email: perfilData.email
            });
        }
    }, [perfilData]);

    // Si no hay datos (por ejemplo, mientras carga), mostramos un mensaje seguro
    if (!perfilData) return <p>Cargando perfil...</p>;

    const { legajo, rol, activo, fechaAsociacion } = perfilData;

    // 3. Control de permisos
    const esAdmin = rol.toLowerCase() === 'administrador';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleGuardarCambios = (e) => {
        e.preventDefault();
        Swal.fire({
            icon: 'success',
            title: 'Perfil actualizado',
            text: 'Los cambios se guardaron correctamente (modo prueba).',
            timer: 1800,
            showConfirmButton: false,
            confirmButtonColor: '#0d9488'
        });
    };

    return (
        <>
        <Encabezado 
            titulo="Perfil de Usuario" 
            subtitulo={esAdmin ? "Gestión de cuenta y edición de datos de administrador" : "Información personal de la cuenta"}
        >
            <button 
                onClick={() => navigate(-1)} 
                aria-label="Volver" 
                className="boton-volver-movil"
            >
                <IconArrowLeft size={32} />
            </button>
        </Encabezado>

        <section className="seccion-perfil-principal">
            {/* Tarjeta de Encabezado de Perfil */}
            <div className="tarjeta-perfil-cabecera">
            <div className="avatar-perfil-contenedor">
                <span className="avatar-perfil-iniciales">
                {formData.nombre.split(' ').slice(0, 2).map((p) => p[0]).join('').toUpperCase()}
                </span>
            </div>

            <div className="info-perfil-cabecera">
                <h2 className="nombre-perfil">{formData.nombre}</h2>
                <div className="rol-perfil-badge">
                <IconShieldCheck size={16} />
                <span>{rol}</span>
                </div>
            </div>

            {/* Indicador de Estado */}
            <div className="estado-perfil-contenedor">
                <span className="label-estado">Estado:</span>
                <span className={`badge-estado-perfil ${activo ? 'activo' : 'inactivo'}`}>
                <span className="punto-estado"></span>
                {activo ? 'Activo' : 'Inactivo'}
                </span>
            </div>
            </div>

            {/* Formulario de Perfil */}
            <form onSubmit={handleGuardarCambios} className="formulario-perfil">
            <div className="grid-datos-perfil">
                
                {/* Campo: Nombre y Apellido */}
                <div className="campo-perfil-item">
                <div className="icono-campo-perfil">
                    <IconUser size={20} />
                </div>
                <div className="info-campo-perfil">
                    <label>Nombre y Apellido</label>
                    {esAdmin ? (
                    <input 
                        type="text" 
                        name="nombre"
                        value={formData.nombre} 
                        onChange={handleChange}
                        className="input-perfil-editable"
                        required
                    />
                    ) : (
                    <p>{formData.nombre}</p>
                    )}
                </div>
                </div>

                {/* Campo: Fecha de Asociación */}
                <div className="campo-perfil-item lectura-solamente">
                <div className="icono-campo-perfil">
                    <IconCalendarEvent size={20} />
                </div>
                <div className="info-campo-perfil">
                    <label>Fecha de asociación</label>
                    <p>{fechaAsociacion}</p>
                </div>
                </div>

                {/* Campo: DNI */}
                <div className="campo-perfil-item">
                <div className="icono-campo-perfil">
                    <IconId size={20} />
                </div>
                <div className="info-campo-perfil">
                    <label>DNI</label>
                    {esAdmin ? (
                    <input 
                        type="text" 
                        name="dni"
                        value={formData.dni} 
                        onChange={handleChange}
                        className="input-perfil-editable"
                        required
                    />
                    ) : (
                    <p>{formData.dni}</p>
                    )}
                </div>
                </div>

                {/* Campo: Teléfono */}
                <div className="campo-perfil-item">
                <div className="icono-campo-perfil">
                    <IconPhone size={20} />
                </div>
                <div className="info-campo-perfil">
                    <label>Teléfono</label>
                    {esAdmin ? (
                    <input 
                        type="text" 
                        name="telefono"
                        value={formData.telefono} 
                        onChange={handleChange}
                        className="input-perfil-editable"
                        required
                    />
                    ) : (
                    <p>{formData.telefono}</p>
                    )}
                </div>
                </div>

                {/* Campo: Legajo */}
                <div className="campo-perfil-item lectura-solamente">
                <div className="icono-campo-perfil">
                    <IconHash size={20} />
                </div>
                <div className="info-campo-perfil">
                    <label>Legajo</label>
                    <p>N.° {legajo}</p>
                </div>
                </div>

                {/* Campo: Email */}
                <div className="campo-perfil-item">
                <div className="icono-campo-perfil">
                    <IconMail size={20} />
                </div>
                <div className="info-campo-perfil">
                    <label>Email</label>
                    {esAdmin ? (
                    <input 
                        type="email" 
                        name="email"
                        value={formData.email} 
                        onChange={handleChange}
                        className="input-perfil-editable"
                        required
                    />
                    ) : (
                    <p>{formData.email}</p>
                    )}
                </div>
                </div>

            </div>

            {/* Botón Guardar */}
            {esAdmin ? (
                <div className="contenedor-boton-guardar-perfil">
                <button type="submit" className="boton-guardar-perfil">
                    <IconDeviceFloppy size={20} />
                    <span>Guardar cambios</span>
                </button>
                </div>
            ) : (
                <div className="aviso-lectura-perfil">
                <IconLock size={18} />
                <span>Solo los administradores tienen permiso para modificar datos de usuario.</span>
                </div>
            )}
            </form>
        </section>
        </>
    );
}