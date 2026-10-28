import { useForm } from 'react-hook-form'
import { Navigate, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { IconUser, IconLock, IconSettings } from '@tabler/icons-react'
import { useAuth } from '../context/AuthContext.jsx'
import { usuarioDemo } from '../data/mock.js'

export default function Login() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

  if (user) return <Navigate to="/" replace />

  const onSubmit = ({ usuario, password }) => {
    if (usuario !== usuarioDemo.legajo || password !== usuarioDemo.password) {
      return Swal.fire({ icon: 'error', title: 'Datos incorrectos', text: 'Revisá tu legajo o correo y tu contraseña.', confirmButtonColor: '#326f7a' })
    }
    login({ nombre: usuarioDemo.nombre, legajo: usuarioDemo.legajo, rol: usuarioDemo.rol })
    navigate('/')
  }

  const campo = 'w-full rounded-full bg-campo py-4 pl-14 pr-6 text-white placeholder:text-white/90 focus-visible:outline-2 focus-visible:outline-white'

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-login">
      <div className="absolute -right-20 -top-24 size-96 rounded-full bg-white/20" />
      <div className="absolute right-60 top-16 size-72 rounded-full bg-white/20" />
      <div className="absolute -left-24 bottom-24 size-96 rounded-full bg-white/20" />
      <div className="absolute bottom-16 left-24 size-40 rounded-full bg-white/15" />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative z-10 flex w-full max-w-md flex-col gap-6 px-6">
        <div className="mb-4 flex items-center justify-center gap-3 text-3xl text-white">
          <span className="grid size-14 place-items-center rounded-2xl bg-white text-sidebar"><IconSettings size={34} stroke={1.75} /></span>
          Fer-Cons
        </div>

        <div>
          <div className="relative">
            <IconUser size={22} className="absolute left-5 top-1/2 -translate-y-1/2 text-white" />
            <input aria-label="Legajo o correo electrónico" placeholder="Legajo o correo electrónico" className={campo}
              {...register('usuario', { required: 'Ingresá tu legajo o correo' })} />
          </div>
          {errors.usuario && <p role="alert" className="mt-1 pl-6 text-sm text-red-200">{errors.usuario.message}</p>}
        </div>

        <div>
          <div className="relative">
            <IconLock size={22} className="absolute left-5 top-1/2 -translate-y-1/2 text-white" />
            <input type="password" aria-label="Contraseña" placeholder="Contraseña" className={campo}
              {...register('password', { required: 'Ingresá tu contraseña', minLength: { value: 4, message: 'Mínimo 4 caracteres' } })} />
          </div>
          {errors.password && <p role="alert" className="mt-1 pl-6 text-sm text-red-200">{errors.password.message}</p>}
        </div>

        <button disabled={isSubmitting} className="mx-auto w-72 rounded-full bg-oscuro py-4 text-xl tracking-widest text-white hover:opacity-90 focus-visible:outline-2 focus-visible:outline-white">
          Ingresar
        </button>
        <a href="#" className="text-center text-white hover:underline">¿Olvidaste tu contraseña?</a>
        <p className="text-center text-sm text-white/70">Demo: legajo 45974444 · contraseña 1234</p>
      </form>
    </main>
  )
}
