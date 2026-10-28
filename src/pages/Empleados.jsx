import { useState } from 'react'
import Swal from 'sweetalert2'
import { IconPhone, IconPencil } from '@tabler/icons-react'
import Encabezado from '../components/Encabezado.jsx'
import { empleados as datos } from '../data/mock.js'

const iniciales = (nombre) => nombre.split(' ').slice(0, 2).map((p) => p[0]).join('').toUpperCase()

export default function Empleados() {
  const [empleados] = useState(datos)
  const activos = empleados.filter((e) => e.activo).length

  const justificar = async (e) => {
    const { value } = await Swal.fire({
      title: `Justificación - ${e.nombre}`,
      input: 'textarea',
      inputPlaceholder: 'Escribí el motivo...',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#4a9da8',
      inputValidator: (v) => (!v.trim() ? 'Ingresá un motivo' : null),
    })
    if (value) Swal.fire({ icon: 'success', title: 'Justificación guardada', timer: 1500, showConfirmButton: false })
  }

  return (
    <>
      <Encabezado titulo="Empleados" subtitulo={`${empleados.length} registrados. ${activos} activos`} />
      <div className="mx-4 mt-8 md:mx-12 overflow-x-auto rounded-2xl bg-white shadow-sm">
        <table className="w-full min-w-[800px] text-center">
          <thead>
            <tr className="border-b border-oscuro/20">
              {['Legajo', 'Empleado', 'Teléfono', 'Rol', 'Sucursal', 'Estado', 'Justificación'].map((c) => (
                <th key={c} className="px-4 py-4 text-lg font-normal">{c === 'Teléfono' ? <span className="inline-flex items-center gap-1"><IconPhone size={16} />{c}</span> : c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {empleados.map((e) => (
              <tr key={e.id} className="border-b border-oscuro/10 last:border-0">
                <td className="px-4 py-4 text-oscuro/70">N.° {e.legajo}</td>
                <td className="px-4 py-4">
                  <span className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-lg bg-sidebar text-sm text-white">{iniciales(e.nombre)}</span>
                    {e.nombre}
                  </span>
                </td>
                <td className="px-4 py-4">{e.telefono}</td>
                <td className="px-4 py-4 text-oscuro/70">{e.rol}</td>
                <td className="px-4 py-4">{e.sucursal}</td>
                <td className="px-4 py-4">
                  <span className={`rounded-full px-3 py-1 text-sm ${e.activo ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                    {e.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <button onClick={() => justificar(e)} className="w-full rounded-lg bg-tarjeta px-4 py-2 hover:bg-circulo">
                    <span className="inline-flex items-center justify-center gap-2"><IconPencil size={16} />Justificación</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
