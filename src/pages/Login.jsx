import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IconUser, IconLock, IconSettings } from '@tabler/icons-react';
import { useAuth } from '../context/AuthContext.jsx';
import { usuarioDemo, usuarios, empleados, roles, empleados_x_roles } from '../data/mock.js';
import InputField from '../components/common/InputField';
import InputPassword from '../components/common/InputPassword';
import ButtonSubmit from '../components/common/ButtonSubmit';
import '../styles/Login.css';
  //login.jsx
export default function Login() {
  const { user, login, passwordOverrides } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  if (user) return <Navigate to="/" replace />;

  const mostrarErrorGenerico = () => {
    return Swal.fire({
      icon: 'error',
      title: 'Datos incorrectos',
      text: 'El legajo, usuario, correo o contraseña son incorrectos.',
      confirmButtonColor: '#326f7a',
    });
  };

  const onSubmit = (data) => {
    // 🚨 RADAR: Si ves esto en la consola, el formulario funciona perfecto
    console.log("Datos recibidos del formulario:", data);

    if (!data.usuario || !data.password) return;
    const valor = data.usuario.trim().toLowerCase();

    // 1. Verificamos si es el Admin Demo
    const esAdminDemo =
      valor === String(usuarioDemo.Legajo).toLowerCase() ||
      valor === String(usuarioDemo.Email).toLowerCase() ||
      valor === String(usuarioDemo.Username || '').toLowerCase();

    if (esAdminDemo) {
      const passDemoActual = passwordOverrides[String(usuarioDemo.Email).toLowerCase()] || usuarioDemo.Password;
      
      if (data.password !== passDemoActual) {
        return mostrarErrorGenerico();
      }

      login({
        nombre: usuarioDemo.Nombre,
        legajo: usuarioDemo.Legajo,
        correo: usuarioDemo.Email,
        rol: usuarioDemo.Ocupacion,
      });

      return Swal.fire({
        icon: 'success',
        title: '¡Bienvenido!',
        text: `Ingreso exitoso, bienvenido ${usuarioDemo.Nombre}`,
        timer: 1800,
        showConfirmButton: false,
      }).then(() => navigate('/'));
    }

    // 2. Buscamos en las tablas reales
    let empEncontrado = empleados.find(
      (e) => String(e.Legajo).trim() === valor || String(Number(e.Legajo)) === valor
    );

    let usrEncontrado = usuarios.find(
      (u) => String(u.Email).toLowerCase() === valor || String(u.Username).toLowerCase() === valor
    );

    // 3. Cruzamos los datos
    if (usrEncontrado && !empEncontrado) {
      empEncontrado = empleados.find((e) => e.ID_Usuarios === usrEncontrado.ID_Usuarios);
    } else if (empEncontrado && !usrEncontrado) {
      usrEncontrado = usuarios.find((u) => u.ID_Usuarios === empEncontrado.ID_Usuarios);
    }

    if (!empEncontrado || !usrEncontrado) {
      return mostrarErrorGenerico(); 
    }

    // 4. Verificamos si está Activo
    if (!empEncontrado.Estado) {
      return mostrarErrorGenerico(); 
    }

    // 5. Validamos la contraseña
    const passRealActual = passwordOverrides[String(usrEncontrado.Email).toLowerCase()] || usrEncontrado.Password;
    if (data.password !== passRealActual) {
      return mostrarErrorGenerico();
    }

    // 6. Buscamos su Rol
    const rolRelacion = empleados_x_roles.find(
      (er) => er.ID_Empleados === empEncontrado.ID_Empleados && er.Estado === true
    );
    const rolObj = rolRelacion ? roles.find((r) => r.ID_Roles === rolRelacion.ID_Roles) : null;
    const nombreRol = rolObj ? rolObj.Ocupacion : 'Sin Rol';

    // 7. Iniciamos sesión
    login({
      nombre: `${empEncontrado.Nombre} ${empEncontrado.Apellido}`,
      legajo: empEncontrado.Legajo,
      correo: usrEncontrado.Email,
      rol: nombreRol,
    });

    Swal.fire({
      icon: 'success',
      title: '¡Bienvenido!',
      text: `Ingreso exitoso, bienvenido ${empEncontrado.Nombre}`,
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
          placeholder="Legajo, usuario o correo"
          registro={register('usuario', { required: 'Ingresá tu legajo, usuario o correo' })}
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
          <ButtonSubmit type="submit" text="Ingresar" disabled={isSubmitting} />
        </div>

        <p className="texto-demo">
          Demo: usuario {usuarioDemo.Username} · legajo {usuarioDemo.Legajo} · correo {usuarioDemo.Email} · contraseña {usuarioDemo.Password}
        </p>
      </form>
    </main>
  );
}