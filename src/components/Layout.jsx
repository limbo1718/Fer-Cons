import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import {
  IconAdjustments, IconSettings, IconHome2, IconRefresh, IconUser, IconLogout,
} from '@tabler/icons-react'
import { useAuth } from '../context/AuthContext.jsx'

const itemBase = 'flex items-center gap-4 rounded-xl px-4 py-3 text-white text-lg'
const lateral = ({ isActive }) => `${itemBase} ${isActive ? 'bg-white/30' : 'hover:bg-white/10'}`
const inferior = ({ isActive }) => `flex flex-col items-center gap-1 text-sm font-bold ${isActive ? 'text-navy' : 'text-oscuro'}`

export default function Layout() {
  const [abierto, setAbierto] = useState(false)
  const { logout } = useAuth()

  return (
    <div className="flex min-h-screen bg-fondo">
      {/* Escritorio: menú lateral */}
      <aside className={`${abierto ? 'w-64' : 'w-24'} hidden shrink-0 flex-col bg-sidebar p-4 transition-all md:flex`}>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAbierto(!abierto)}
            aria-label="Abrir o cerrar menú"
            className="grid size-12 shrink-0 place-items-center rounded-xl bg-white text-sidebar focus-visible:outline-2"
          >
            {abierto ? <IconSettings size={28} /> : <IconAdjustments size={28} />}
          </button>
          {abierto && <span className="rounded-xl bg-white px-3 py-2 text-xl font-bold text-sidebar">FER-CONS</span>}
        </div>

        <nav className="mt-12 flex flex-col gap-3">
          <NavLink to="/" end className={lateral}><IconHome2 size={28} />{abierto && 'Inicio'}</NavLink>
          <NavLink to="/actividad" className={lateral}><IconRefresh size={28} />{abierto && 'Actividad'}</NavLink>
          <span className={itemBase}><IconUser size={28} />{abierto && 'Perfil'}</span>
        </nav>

        <button onClick={logout} className={`${itemBase} mt-auto hover:bg-white/20`}>
          <IconLogout size={28} />{abierto && 'Cerrar sesión'}
        </button>
      </aside>

      <main className="min-w-0 flex-1 pb-28 md:pb-8">
        <Outlet />
      </main>

      {/* Móvil: barra inferior */}
      <nav className="fixed inset-x-0 bottom-0 flex justify-around bg-circulo/60 px-6 py-3 backdrop-blur md:hidden">
        <NavLink to="/actividad" className={inferior}><IconRefresh size={34} />Actividad</NavLink>
        <NavLink to="/" end className={inferior}><IconHome2 size={34} />Inicio</NavLink>
        <button onClick={logout} className="flex flex-col items-center gap-1 text-sm font-bold"><IconUser size={34} />Perfil</button>
      </nav>
    </div>
  )
}
