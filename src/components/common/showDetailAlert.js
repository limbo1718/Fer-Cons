import Swal from 'sweetalert2';

/**
 * Muestra una alerta con los detalles y la descripción de un elemento.
 * 
 * @param {Object} params - Parámetros de configuración
 * @param {string} params.title - Título principal (ej: Nombre del producto, empleado o proveedor)
 * @param {Array} [params.details=[]] - Lista de datos secundarios (ej: [{ label: 'Código', value: 'PROD-101' }])
 * @param {string} [params.description=''] - Texto detallado o descripción larga
 */
export const showDetailAlert = ({ title, details = [], description = '' }) => {
    
    // 1. Generamos las filas de datos secundarios de forma segura
    const detailsHtml = details.length > 0 
        ? details.map(item => `
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.9rem; color: rgba(15, 42, 48, 0.75); padding: 0.35rem 0; border-bottom: 1px dashed rgba(15, 42, 48, 0.08);">
                <span>${item.label}:</span>
                <strong style="color: var(--color-oscuro, #0f2a30);">${item.value}</strong>
            </div>
        `).join('')
        : '';

    // 2. Disparamos el modal aplicando el fondo oscuro profundo y blur mediante una clase global de SweetAlert
    Swal.fire({
        title: `<span style="color: var(--color-oscuro, #0f2a30); font-size: 1.3rem; font-weight: 600;">${title}</span>`,
        html: `
            <div style="text-align: left; margin-top: 0.5rem; font-family: inherit;">
                <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem;">
                    ${detailsHtml}
                </div>
                <div style="background-color: #f8fafc; border: 1px solid rgba(15, 42, 48, 0.08); border-radius: 0.75rem; padding: 1rem; box-sizing: border-box;">
                    <p style="margin: 0 0 0.35rem 0; font-size: 0.75rem; font-weight: 700; color: #0d9488; text-transform: uppercase; letter-spacing: 0.05em;">
                        Descripción:
                    </p>
                    <p style="margin: 0; font-size: 0.92rem; color: #334155; line-height: 1.5; word-break: break-word;">
                        ${description || 'No cuenta con una descripción detallada.'}
                    </p>
                </div>
            </div>
        `,
        showConfirmButton: true,
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#0d9488',
        width: '450px',
        padding: '2rem',
        // Forzamos el color oscuro del fondo mediante color RGBA directo en el backdrop
        backdrop: 'rgba(15, 42, 48, 0.65)'
    });
};