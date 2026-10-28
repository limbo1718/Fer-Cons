import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IconUser, IconLock, IconSettings, IconKey } from '@tabler/icons-react';
import InputField from '../components/common/InputField';
import ButtonSubmit from '../components/common/ButtonSubmit';
import { usuarioDemo, empleados } from '../data/mock';
import '../styles/CambiarContrasena.css';

export default function CambiarContrasena() {
  const [legajo, setLegajo] = useState('');
  const [nuevaContra, setNuevaContra] = useState('');
  const [confirContra, setConfirContra] = useState('');
  const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // 1. Validar campos vacíos
        if (!legajo.trim() || !nuevaContra.trim() || !confirContra.trim()) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos incompletos',
            text: 'Por favor, complete todos los campos.',
            confirmButtonColor: '#326f7a',
        });
        return;
        }

        // 2. Validar coincidencia de contraseñas
        if (nuevaContra !== confirContra) {
        Swal.fire({
            icon: 'error',
            title: 'Error de validación',
            text: 'Las nuevas contraseñas no coinciden.',
            confirmButtonColor: '#326f7a',
        });
        return;
        }

        // 3. Validar existencia del usuario/legajo localmente
        const esAdminDemo = usuarioDemo.legajo === legajo.trim();
        const empleadoEncontrado = empleados.find((emp) => emp.legajo === legajo.trim());

        if (!esAdminDemo && !empleadoEncontrado) {
        Swal.fire({
            icon: 'error',
            title: 'Usuario no encontrado',
            text: 'El número de legajo ingresado no existe en el sistema.',
            confirmButtonColor: '#326f7a',
        });
        return;
        }

        // 4. Si todo es correcto, actualizar con éxito
        Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'La contraseña se actualizó correctamente.',
        confirmButtonText: 'Ir al Login',
        confirmButtonColor: '#326f7a',
        }).then(() => {
        navigate('/login');
        });
    };

    return (
        <main className="contenedor-login">
        {/* Círculos decorativos de fondo idénticos al Login */}
        <div className="circulo circulo-1" />
        <div className="circulo circulo-2" />
        <div className="circulo circulo-3" />
        <div className="circulo circulo-4" />

        <form onSubmit={handleSubmit} noValidate className="formulario-tarjeta-login">
            <div className="encabezado-logo">
            <span className="caja-icono-logo">
                <IconSettings size={34} stroke={1.75} />
            </span>
            Fer-Cons
            </div>

            <h2 className="titulo-recuperar">Recuperar Contraseña</h2>

            <InputField
            type="text"
            placeholder="Ingrese su legajo"
            value={legajo}
            onChange={(e) => setLegajo(e.target.value)}
            icon={IconUser}
            />

            <InputField
            type="password"
            placeholder="Ingrese la nueva contraseña"
            value={nuevaContra}
            onChange={(e) => setNuevaContra(e.target.value)}
            icon={IconLock}
            />

            <InputField
            type="password"
            placeholder="Repita la nueva contraseña"
            value={confirContra}
            onChange={(e) => setConfirContra(e.target.value)}
            icon={IconKey}
            />

            <div className="contenedor-boton">
            <ButtonSubmit text="Actualizar Contraseña" />
            </div>

            <Link to="/login" className="enlace-olvido">
            Volver al inicio de sesión
            </Link>
        </form>
        </main>
    );
}