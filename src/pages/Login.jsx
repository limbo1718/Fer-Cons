import { useForm } from 'react-hook-form';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IconUser, IconLock, IconSettings } from '@tabler/icons-react';
import { useAuth } from '../context/AuthContext.jsx';
import { usuarioDemo } from '../data/mock.js';
import InputField from '../components/common/InputField';
import ButtonSubmit from '../components/common/ButtonSubmit';
import '../styles/Login.css';

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  if (user) return <Navigate to="/" replace />;

  const onSubmit = ({ usuario, password }) => {
    if (usuario !== usuarioDemo.legajo || password !== usuarioDemo.password) {
      return Swal.fire({ 
        icon: 'error', 
        title: 'Datos incorrectos', 
        text: 'Revisá tu legajo o correo y tu contraseña.', 
        confirmButtonColor: '#326f7a' 
      });
    }
    login({ nombre: usuarioDemo.nombre, legajo: usuarioDemo.legajo, rol: usuarioDemo.rol });
    navigate('/');
  };

  return (
    <main className="contenedor-login">
      {/* Círculos decorativos de fondo */}
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
          placeholder="Legajo o correo electrónico"
          registro={register('usuario', { required: 'Ingresá tu legajo o correo' })}
          error={errors.usuario}
          icon={IconUser}
        />

        <InputField
          type="password"
          placeholder="Contraseña"
          registro={register('password', { 
            required: 'Ingresá tu contraseña', 
            minLength: { value: 4, message: 'Mínimo 4 caracteres' } 
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

        <p className="texto-demo">
          Demo: legajo {usuarioDemo.legajo} · contraseña {usuarioDemo.password}
        </p>
      </form>
    </main>
  );
}