import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IconUser, IconLock, IconSettings, IconKey } from '@tabler/icons-react';
import InputField from '../components/common/InputField';
import ButtonSubmit from '../components/common/ButtonSubmit';
import { usuarioDemo, empleados } from '../data/mock';
import '../styles/CambiarContrasena.css';

export default function CambiarContrasena() {
  const [usuario, setUsuario] = useState('');
  const [nuevaContra, setNuevaContra] = useState('');
  const [confirContra, setConfirContra] = useState('');
  const navigate = useNavigate();

  const mostrarAlerta = (icon, title, text) =>
    Swal.fire({ icon, title, text, confirmButtonColor: '#326f7a' });

  // Coincide por legajo (exacto) o por correo (sin distinguir mayúsculas)
  const coincide = (cuenta, valor) =>
    String(cuenta.legajo) === valor ||
    (cuenta.correo && cuenta.correo.toLowerCase() === valor.toLowerCase());

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuarioLimpio = usuario.trim();

    // 1. Campos vacíos
    if (!usuarioLimpio || !nuevaContra.trim() || !confirContra.trim()) {
      mostrarAlerta('warning', 'Campos incompletos', 'Por favor, complete todos los campos.');
      return;
    }

    // 2. Existencia del usuario (legajo o correo)
    const esAdminDemo = coincide(usuarioDemo, usuarioLimpio);
    const empleadoEncontrado = empleados.find((emp) => coincide(emp, usuarioLimpio));

    if (!esAdminDemo && !empleadoEncontrado) {
      mostrarAlerta(
        'error',
        'Usuario no encontrado',
        'El legajo o correo ingresado no existe en el sistema.'
      );
      return;
    }

    // 3. Longitud mínima de la contraseña
    if (nuevaContra.length < 4) {
      mostrarAlerta(
        'warning',
        'Contraseña muy corta',
        'La nueva contraseña debe tener al menos 4 caracteres.'
      );
      return;
    }

    // 4. Coincidencia de contraseñas
    if (nuevaContra !== confirContra) {
      mostrarAlerta('error', 'Error de validación', 'Las nuevas contraseñas no coinciden.');
      return;
    }

    // 5. Éxito
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
          name="usuario"
          placeholder="Legajo o correo electrónico"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          icon={IconUser}
        />

        <InputField
          type="password"
          name="nuevaContra"
          placeholder="Ingrese la nueva contraseña"
          value={nuevaContra}
          onChange={(e) => setNuevaContra(e.target.value)}
          icon={IconLock}
        />

        <InputField
          type="password"
          name="confirContra"
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

        <p className="texto-demo">
          Demo: legajo {usuarioDemo.legajo} · correo {usuarioDemo.correo} · contraseña {usuarioDemo.password}
        </p>
      </form>
    </main>
  );
}