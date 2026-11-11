import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IconUser, IconLock, IconSettings } from '@tabler/icons-react';
import { useAuth } from '../context/AuthContext.jsx';
import { usuarioDemo, usuarios, roles, usuarios_x_roles } from '../data/mock.js';
import InputField from '../components/common/InputField';
import InputPassword from '../components/common/InputPassword';
import ButtonSubmit from '../components/common/ButtonSubmit';
import '../styles/Login.css';

export default function Login() {
  // NUEVO: Extraemos passwordOverrides del contexto
  const { user, login, passwordOverrides } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  if (user) return <Navigate to="/" replace />;

  const mostrarErrorGenerico = () => {
    return Swal.fire({
      icon: 'error',
      title: 'Datos incorrectos',
      text: 'El legajo, correo o contraseña son incorrectos.',
      confirmButtonColor: '#326f7a',
    });
  };

  const onSubmit = ({ usuario, password }) => {
    const valor = usuario.trim();

    // 1. Verificamos si es el Admin Demo
    const esAdminDemo =
      valor === usuarioDemo.legajo ||
      valor.toLowerCase() === usuarioDemo.correo.toLowerCase();

    if (esAdminDemo) {
      // NUEVO: Buscamos si el admin demo tiene una contraseña actualizada
      const passDemoActual = passwordOverrides[usuarioDemo.correo.toLowerCase()] || usuarioDemo.password;
      
      if (password !== passDemoActual) {
        return mostrarErrorGenerico();
      }

      login({
        nombre: usuarioDemo.nombre,
        legajo: usuarioDemo.legajo,
        correo: usuarioDemo.correo,
        rol: usuarioDemo.rol,
      });

      return Swal.fire({
        icon: 'success',
        title: '¡Bienvenido!',
        text: `Ingreso exitoso, bienvenido ${usuarioDemo.nombre}`,
        timer: 1800,
        showConfirmButton: false,
      }).then(() => navigate('/'));
    }

    // 2. Si no es el Demo, buscamos en la tabla de usuarios reales
    const usuarioEncontrado = usuarios.find(
      (u) =>
        String(u.Legajo) === valor ||
        (u.Email && u.Email.toLowerCase() === valor.toLowerCase())
    );

    if (!usuarioEncontrado || !usuarioEncontrado.Estado) {
      return mostrarErrorGenerico(); 
    }

    // NUEVO: Buscamos si el usuario tiene una contraseña actualizada en el contexto
    const passRealActual = passwordOverrides[usuarioEncontrado.Email.toLowerCase()] || usuarioEncontrado.Contrasena;
    
    if (password !== passRealActual) {
      return mostrarErrorGenerico();
    }

    // Si pasó todo, buscamos su Rol Activo para guardarlo en la sesión
    const rolRelacion = usuarios_x_roles.find(
      (ur) => ur.ID_Usuarios === usuarioEncontrado.ID_Usuarios && ur.Estado === true
    );
    const rolObj = rolRelacion ? roles.find((r) => r.ID_Roles === rolRelacion.ID_Roles) : null;
    const nombreRol = rolObj ? rolObj.Ocupacion : 'Sin Rol';

    login({
      nombre: `${usuarioEncontrado.Nombre} ${usuarioEncontrado.Apellido}`,
      legajo: usuarioEncontrado.Legajo,
      correo: usuarioEncontrado.Email,
      rol: nombreRol,
    });

    Swal.fire({
      icon: 'success',
      title: '¡Bienvenido!',
      text: `Ingreso exitoso, bienvenido ${usuarioEncontrado.Nombre}`,
      timer: 1800,
      showConfirmButton: false,
    }).then(() => navigate('/'));
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
          placeholder="Legajo o correo electrónico"
          registro={register('usuario', { required: 'Ingresá tu legajo o correo' })}
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

        <p className="texto-demo">
          Demo: legajo {usuarioDemo.legajo} · correo {usuarioDemo.correo} · contraseña {usuarioDemo.password}
        </p>
      </form>
    </main>
  );
}