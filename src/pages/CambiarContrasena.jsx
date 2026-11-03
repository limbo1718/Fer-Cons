import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IconUser, IconLock, IconSettings, IconKey } from '@tabler/icons-react';
import InputField from '../components/common/InputField';
import InputPassword from '../components/common/InputPassword';
import ButtonSubmit from '../components/common/ButtonSubmit';
import '../styles/CambiarContrasena.css';

export default function CambiarContrasena() {
  const [usuario, setUsuario] = useState('');
  const [nuevaContra, setNuevaContra] = useState('');
  const [confirContra, setConfirContra] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Consumo de la API de FakeStore
  const getUsers = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const mostrarAlerta = (icon, title, text) =>
    Swal.fire({ icon, title, text, confirmButtonColor: '#326f7a' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usuarioLimpio = usuario.trim();

    // 1. Verificar si los datos se cargaron
    if (users.length === 0) {
      mostrarAlerta('info', 'Espera un momento', 'Los datos se están cargando...');
      return;
    }

    // 2. Campos vacíos
    if (!usuarioLimpio || !nuevaContra.trim() || !confirContra.trim()) {
      mostrarAlerta('warning', 'Campos incompletos', 'Por favor, complete todos los campos.');
      return;
    }

    // 3. Coincidencia de contraseñas
    if (nuevaContra !== confirContra) {
      mostrarAlerta('error', 'Error de validación', 'Las nuevas contraseñas no coinciden.');
      return;
    }

    // 4. Longitud mínima
    if (nuevaContra.length < 4) {
      mostrarAlerta(
        'warning',
        'Contraseña muy corta',
        'La nueva contraseña debe tener al menos 4 caracteres.'
      );
      return;
    }

    // 5. Existencia de usuario (por username o correo)
    const usuarioEncontrado = users.find(
      (use) => use.username === usuarioLimpio || use.email === usuarioLimpio
    );

    if (!usuarioEncontrado) {
      mostrarAlerta(
        'error',
        'Usuario no encontrado',
        'El nombre de usuario o correo ingresado no existe.'
      );
      return;
    }

    // 6. Petición PUT a la API
    try {
      const response = await fetch(
        `https://fakestoreapi.com/users/${usuarioEncontrado.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            password: nuevaContra,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('El servicio del backend no funciona.');
      }

      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'La contraseña se actualizó correctamente.',
        confirmButtonText: 'Ir al Login',
        confirmButtonColor: '#326f7a',
      }).then(() => {
        navigate('/login');
      });
    } catch (error) {
      mostrarAlerta('warning', 'Servicio no disponible', 'No se pudo conectar con el servidor.');
    }
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
          placeholder="Usuario o correo electrónico"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          icon={IconUser}
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

        <Link to="/login" className="enlace-olvido">
          Volver al inicio de sesión
        </Link>

        {users.length > 0 && (
          <p className="texto-demo">
            Demo API: usuario <strong>{users[0].username}</strong> · correo <strong>{users[0].email}</strong>
          </p>
        )}
      </form>
    </main>
  );
}