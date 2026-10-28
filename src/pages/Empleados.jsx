import { useState } from 'react';
import Swal from 'sweetalert2';
import { IconPhone, IconPencil } from '@tabler/icons-react';
import Encabezado from '../components/Encabezado.jsx';
import GenericTable from '../components/common/GenericTable.jsx';
import { empleados as datos } from '../data/mock.js';
import '../styles/Empleados.css';

const iniciales = (nombre) => nombre.split(' ').slice(0, 2).map((p) => p[0]).join('').toUpperCase();

export default function Empleados() {
  const [empleados] = useState(datos);
  const activos = empleados.filter((e) => e.activo).length;

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
    });
    if (value) Swal.fire({ icon: 'success', title: 'Justificación guardada', timer: 1500, showConfirmButton: false });
  };

  // Definimos las columnas que faltaban declarar
  const columnas = [
    'Legajo', 
    'Empleado', 
    <span key="tel" className="inline-flex items-center gap-1"><IconPhone size={16} />Teléfono</span>, 
    'Rol', 
    'Sucursal', 
    'Estado', 
    'Justificación'
  ];

  return (
    <>
      <Encabezado titulo="Empleados" subtitulo={`${empleados.length} registrados. ${activos} activos`} />
      
      <GenericTable
        columnas={columnas}
        datos={empleados}
        renderFila={(e) => (
          <tr key={e.id} className="fila-empleado">
            <td className="celda-tabla-legajo">N.° {e.legajo}</td>
            <td className="celda-tabla-info">
              <span className="info-empleado-flex">
                <span className="avatar-iniciales">{iniciales(e.nombre)}</span>
                {e.nombre}
              </span>
            </td>
            <td className="celda-tabla-texto">{e.telefono}</td>
            <td className="celda-tabla-gris">{e.rol}</td>
            <td className="celda-tabla-texto">{e.sucursal}</td>
            <td className="celda-tabla-texto">
              <span className={`etiqueta-estado ${e.activo ? 'estado-activo' : 'estado-inactivo'}`}>
                {e.activo ? 'Activo' : 'Inactivo'}
              </span>
            </td>
            <td className="celda-tabla-info">
              <button onClick={() => justificar(e)} className="boton-justificacion">
                <span className="contenido-boton-justificacion">
                  <IconPencil size={16} />Justificación
                </span>
              </button>
            </td>
          </tr>
        )}
      />
    </>
  );
}