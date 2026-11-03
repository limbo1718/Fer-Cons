import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IconUser, IconLock, IconSettings } from '@tabler/icons-react';
import { useAuth } from '../context/AuthContext.jsx';
import InputField from '../components/common/InputField';
import InputPassword from '../components/common/InputPassword';
import ButtonSubmit from '../components/common/ButtonSubmit';
import '../styles/Login.css';

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const [users, setUsers] = useState([]);

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

  if (user) return <Navigate to="/" replace />;

  const onSubmit = ({ usuario, password }) => {
    const valorIngresado = usuario.trim();

    // Validación sobre la lista de usuarios proveniente de la API
    const usuarioEncontrado = users.find(
      (use) =>
        (use.username === valorIngresado || use.email === valorIngresado) &&
        use.password === password
    );

    if (!usuarioEncontrado) {
      return Swal.fire({
        icon: 'error',
        title: 'Datos incorrectos',
        text: 'Revisá tu usuario o correo y tu contraseña.',
        confirmButtonColor: '#326f7a',
      });
    }

    // Inicio de sesión exitoso con los datos retornados por la API
    login({
      nombre: `${usuarioEncontrado.name.firstname} ${usuarioEncontrado.name.lastname}`,
      legajo: String(usuarioEncontrado.id),
      correo: usuarioEncontrado.email,
      username: usuarioEncontrado.username,
      rol: 'Administrador',
    });

    Swal.fire({
      icon: 'success',
      title: '¡Bienvenido!',
      text: `Ingreso exitoso, bienvenido ${usuarioEncontrado.username}`,
      timer: 1800,
      showConfirmButton: false,
    });

    navigate('/');
  };

  return (
    <main className="contenedor-login">
      <div className="circulo circulo-1" />
      <div className="circulo circulo-2" />
      <div className="circulo circulo-3" />
      <div className="circulo circulo-4" />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="formulario-tarjeta-login">
        <div className="encabezado-logo">
          <span className="caja-icono-logo">
            <IconSettings size={34} stroke={1.75} />
          </span>
          Fer-Cons
        </div>

        <InputField
          type="text"
          placeholder="Usuario o correo electrónico"
          registro={register('usuario', { required: 'Ingresá tu usuario o correo' })}
          error={errors.usuario}
          icon={IconUser}
        />

        <InputPassword
          placeholder="Contraseña"
          registro={register('password', {
            required: 'Ingresá tu contraseña',
            minLength: { value: 4, message: 'Mínimo 4 caracteres' },
          })}
          error={errors.password}
          icon={IconLock}
        />

        <div className="contenedor-boton">
          <ButtonSubmit text="Ingresar" disabled={isSubmitting} />
        </div>

        <Link to="/cambiar-contrasena" className="enlace-olvido">
          ¿Olvidaste tu contraseña?
        </Link>

        {users.length > 0 && (
          <p className="texto-demo">
            Demo API: usuario <strong>{users[0].username}</strong> · correo <strong>{users[0].email}</strong> · contraseña <strong>{users[0].password}</strong>
          </p>
        )}
      </form>
    </main>
  );
}