import Swal from 'sweetalert2';

/**
 * Muestra una alerta con los detalles y la descripción de un elemento.
 * 
 * @param {Object} params - Parámetros de configuración
 * @param {string} params.title - Título principal (ej: Nombre del producto, empleado o proveedor)
 * @param {Array} [params.details=[]] - Lista de datos secundarios (ej: [{ label: 'Código', value: 'PROD-101' }])
 * @param {string} [params.description=''] - Texto detallado, motivo de baja o descripción larga
 */
export const showDetailAlert = ({ title, details = [], description = '' }) => {
    
    // 1. Generamos las filas de datos secundarios con un diseño de tarjeta sutil y elegante
    const detailsHtml = details.length > 0 
        ? details.map(item => `
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.88rem; color: #475569; padding: 0.5rem 0; border-bottom: 1px dashed rgba(15, 42, 48, 0.08);">
                <span>${item.label}:</span>
                <strong style="color: #0f2a30; font-weight: 600;">${item.value}</strong>
            </div>
        `).join('')
        : '';

    // 2. Disparamos el modal unificado con diseño corporativo
    Swal.fire({
        title: '',
        html: `
            <div style="text-align: left; font-family: inherit;">
                <!-- Header del Modal -->
                <div style="text-align: center; margin-bottom: 1.25rem;">
                    <span style="font-size: 0.75rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700; display: block; margin-bottom: 0.25rem;">
                        Detalle de Registro
                    </span>
                    <h2 style="margin: 0; color: #0f2a30; font-size: 1.25rem; font-weight: 600;">
                        ${title}
                    </h2>
                </div>

                <!-- Caja de Metadatos Secundarios -->
                ${details.length > 0 ? `
                    <div style="background: #f8fafc; border: 1px solid rgba(15, 42, 48, 0.08); border-radius: 0.75rem; padding: 0.85rem 1.1rem; display: flex; flex-direction: column; gap: 0.35rem; margin-bottom: 1rem;">
                        ${detailsHtml}
                    </div>
                ` : ''}

                <!-- Bloque de Descripción / Motivo -->
                <div style="background-color: #f8fafc; border: 1px solid rgba(15, 42, 48, 0.08); border-radius: 0.75rem; padding: 1rem; box-sizing: border-box; margin-bottom: 0.5rem;">
                    <p style="margin: 0 0 0.35rem 0; font-size: 0.75rem; font-weight: 700; color: #0d9488; text-transform: uppercase; letter-spacing: 0.05em;">
                        Información / Motivo:
                    </p>
                    <p style="margin: 0; font-size: 0.9rem; color: #334155; line-height: 1.5; word-break: break-word;">
                        ${description || 'No cuenta con una descripción detallada.'}
                    </p>
                </div>
            </div>
        `,
        showConfirmButton: true,
        confirmButtonText: 'Cerrar',
        buttonsStyling: false, // Controlamos el diseño de los botones por completo
        width: '520px',
        padding: '2rem',
        backdrop: 'rgba(15, 42, 48, 0.65)',
        didOpen: () => {
            const confirmBtn = Swal.getConfirmButton();
            const actions = Swal.getActions();

            // Hacemos que el contenedor de acciones ocupe todo el ancho disponible
            if (actions) {
                actions.style.display = 'flex';
                actions.style.width = '100%';
                actions.style.marginTop = '1rem';
            }

            // Estilizamos el botón de cierre para que sea ancho, elegante y de color corporativo
            if (confirmBtn) {
                confirmBtn.style.backgroundColor = '#0d9488';
                confirmBtn.style.color = '#ffffff';
                confirmBtn.style.border = 'none';
                confirmBtn.style.borderRadius = '0.5rem';
                confirmBtn.style.padding = '0.75rem';
                confirmBtn.style.fontSize = '0.9rem';
                confirmBtn.style.fontWeight = '600';
                confirmBtn.style.width = '100%';
                confirmBtn.style.cursor = 'pointer';
                confirmBtn.style.boxShadow = 'none';
                confirmBtn.style.transition = 'background-color 0.2s';
            }
        }
    });
};