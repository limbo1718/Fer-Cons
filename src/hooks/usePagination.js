import { useState, useEffect } from 'react';

export function usePagination(datosFiltrados, itemsPorPagina = 10, dependencies = []) {
    const [limite, setLimite] = useState(itemsPorPagina);

    // Resetea el límite a su valor inicial cada vez que cambian las dependencias (ej. búsqueda o pestañas)
    useEffect(() => {
        setLimite(itemsPorPagina);
    }, dependencies);

    // Corta el arreglo de datos según el límite actual
    const datosVisibles = datosFiltrados.slice(0, limite);

    // Comprueba si todavía quedan más registros por mostrar
    const tieneMas = limite < datosFiltrados.length;

    // Incrementa el límite para mostrar más registros
    const cargarMas = () => {
        setLimite((prevLimite) => prevLimite + itemsPorPagina);
    };

    return {
        datosVisibles,
        tieneMas,
        cargarMas,
        limite
    };
}