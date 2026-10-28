import '../../styles/GenericTable.css';

export default function GenericTable({ columnas, datos, renderFila, clasePersonalizada = '' }) {
  return (
    <div className={`contenedor-tabla-generica ${clasePersonalizada}`}>
      <table className="tabla-generica">
        <thead>
          <tr className="cabecera-fila-generica">
            {columnas.map((columna, index) => (
              <th key={index} className="celda-cabecera-generica">
                {columna}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datos.map((item, index) => renderFila(item, index))}
        </tbody>
      </table>
    </div>
  );
}