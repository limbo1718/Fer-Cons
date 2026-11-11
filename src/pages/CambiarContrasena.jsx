import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IconUser, IconLock, IconSettings, IconKey } from '@tabler/icons-react';
import Encabezado from '../components/Encabezado.jsx';
import InputField from '../components/common/InputField';
import InputPassword from '../components/common/InputPassword';
import ButtonSubmit from '../components/common/ButtonSubmit';
import { useAuth } from '../context/AuthContext.jsx'; // NUEVO
import { usuarioDemo, usuarios } from '../data/mock';
import '../styles/CambiarContrasena.css';

export default function CambiarContrasena() {
  const location = useLocation();
  const navigate = useNavigate();
  // NUEVO: Traemos la función del contexto
  const { actualizarContrasena } = useAuth(); 

  // Si venimos desde la tabla de empleados, recibimos el correo por el estado de la ruta
  const emailPrefill = location.state?.email || '';

  const [usuario, setUsuario] = useState(emailPrefill);
  const [nuevaContra, setNuevaContra] = useState('');
  const [confirContra, setConfirContra] = useState('');
  const [esEdicionDesdeTabla, setEsEdicionDesdeTabla] = useState(!!emailPrefill);

  useEffect(() => {
    if (emailPrefill) {
      setUsuario(emailPrefill);
      setEsEdicionDesdeTabla(true);
    }
  }, [emailPrefill]);

  const mostrarAlerta = (icon, title, text) =>
    Swal.fire({ icon, title, text, confirmButtonColor: '#326f7a' });

  const coincide = (cuenta, valor) => {
    if (!cuenta) return false;
    const legajoMatch = String(cuenta.Legajo) === valor;
    const emailMatch = cuenta.Email && cuenta.Email.toLowerCase() === valor.toLowerCase();
    return legajoMatch || emailMatch;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuarioLimpio = usuario.trim();

    // 1. Campos vacíos
    if (!usuarioLimpio || !nuevaContra.trim() || !confirContra.trim()) {
      mostrarAlerta('warning', 'Campos incompletos', 'Por favor, complete todos los campos.');
      return;
    }

    // 2. Existencia del usuario (legajo o correo)
    const esAdminDemo = usuarioDemo && coincide(usuarioDemo, usuarioLimpio);
    const usuarioEncontrado = usuarios.find((usu) => coincide(usu, usuarioLimpio));

    if (!esAdminDemo && !usuarioEncontrado) {
      mostrarAlerta('error', 'Usuario no encontrado', 'El legajo o correo ingresado no existe en el sistema.');
      return;
    }

    // 3. Longitud mínima de la contraseña
    if (nuevaContra.length < 4) {
      mostrarAlerta('warning', 'Contraseña muy corta', 'La nueva contraseña debe tener al menos 4 caracteres.');
      return;
    }

    // 4. Coincidencia de contraseñas
    if (nuevaContra !== confirContra) {
      mostrarAlerta('error', 'Error de validación', 'Las nuevas contraseñas no coinciden.');
      return;
    }

    // 5. NUEVO: Guardamos la contraseña en el contexto (y en el localStorage)
    if (usuarioEncontrado) {
      actualizarContrasena(usuarioEncontrado.Email, nuevaContra);
    } else if (esAdminDemo) {
      actualizarContrasena(usuarioDemo.correo, nuevaContra);
    }

    // 6. Éxito
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'La contraseña se actualizó correctamente.',
      confirmButtonText: 'Volver a Empleados',
      confirmButtonColor: '#326f7a',
    }).then(() => {
      // Siempre redirigimos a empleados, ya que es un flujo interno
      navigate('/empleados');
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Encabezado igual que en Empleados */}
      <Encabezado 
        titulo="Cambiar Contraseña" 
        subtitulo="Actualizar credenciales de acceso del empleado" 
      />

      {/* Contenedor original con los círculos y fondo verde */}
      <main className="contenedor-login" style={{ flex: 1, minHeight: 'auto' }}>
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
            disabled={esEdicionDesdeTabla} 
          />

          <InputPassword
            name="nuevaContra"
            placeholder="Ingrese la nueva contraseña"
            value={nuevaContra}
            onChange={(e) => setNuevaContra(e.target.value)}
            icon={IconLock}
          />

          <InputPassword
            name="confirContra"
            placeholder="Repita la nueva contraseña"
            value={confirContra}
            onChange={(e) => setConfirContra(e.target.value)}
            icon={IconKey}
          />

          <div className="contenedor-boton">
            <ButtonSubmit text="Actualizar Contraseña" />
          </div>

          <Link to="/empleados" className="enlace-olvido">
            Volver a Empleados
          </Link>

          {usuarioDemo && (
            <p className="texto-demo">
              Demo: legajo {usuarioDemo.legajo} · correo {usuarioDemo.correo} · contraseña {usuarioDemo.password}
            </p>
          )}
        </form>
      </main>
    </div>
  );
}