import Swal from 'sweetalert2';

// Escapa el texto antes de insertarlo en el HTML del cartel
const escapeHtml = (text = '') =>
    String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

/**
 * Muestra una alerta de confirmación para reactivar un registro (empleado, producto, proveedor, sucursal...).
 *
 * @param {Object} params - Parámetros de configuración
 * @param {string} params.entity - Sustantivo en minúscula (ej: "sucursal", "empleado")
 * @param {string} params.name - Nombre del registro a reactivar
 * @param {boolean} [params.feminine=false] - true para sustantivos femeninos (activa) / false para masculinos (activo)
 * @param {string} [params.subtitle="Reactivación"] - Subtítulo superior
 * @param {string} [params.confirmButtonText="Activar"] - Texto del botón de confirmación
 * @param {string} [params.confirmButtonColor="#0d9488"] - Color del botón de confirmación
 * @returns {Promise<boolean>} - true si confirma, false si cancela.
 */
export const showReactivateAlert = async ({
    entity,
    name,
    feminine = false,
    subtitle = 'Reactivación',
    confirmButtonText = 'Activar',
    confirmButtonColor = '#0d9488'
}) => {
    const { isConfirmed } = await Swal.fire({
        title: '',
        html: `
            <div style="text-align: center; font-family: inherit; padding: 0.5rem 0;">
                <span style="font-size: 0.75rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700; display: block; margin-bottom: 0.25rem;">
                    ${escapeHtml(subtitle)}
                </span>
                <h2 style="margin: 0 0 0.75rem 0; color: #0f2a30; font-size: 1.25rem; font-weight: 600;">
                    ¿Activar ${escapeHtml(entity)}?
                </h2>
                <p style="margin: 0; color: #475569; font-size: 0.95rem;">
                    <strong>${escapeHtml(name)}</strong> pasará a estar ${feminine ? 'activa' : 'activo'} nuevamente en el sistema.
                </p>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: confirmButtonText,
        cancelButtonText: 'Cancelar',
        buttonsStyling: false,
        width: '460px',
        padding: '2rem',
        backdrop: 'rgba(15, 42, 48, 0.65)',
        didOpen: () => {
            const confirmBtn = Swal.getConfirmButton();
            const cancelBtn = Swal.getCancelButton();
            const actions = Swal.getActions();

            if (actions) {
                actions.style.display = 'flex';
                actions.style.gap = '0.75rem';
                actions.style.marginTop = '1rem';
            }

            if (confirmBtn) {
                confirmBtn.style.backgroundColor = confirmButtonColor;
                confirmBtn.style.color = '#ffffff';
                confirmBtn.style.border = 'none';
                confirmBtn.style.borderRadius = '0.5rem';
                confirmBtn.style.padding = '0.65rem 1.25rem';
                confirmBtn.style.fontSize = '0.9rem';
                confirmBtn.style.fontWeight = '600';
                confirmBtn.style.cursor = 'pointer';
                confirmBtn.style.boxShadow = 'none';
                confirmBtn.style.transition = 'background-color 0.2s';
            }

            if (cancelBtn) {
                cancelBtn.style.backgroundColor = '#f1f5f9';
                cancelBtn.style.color = '#334155';
                cancelBtn.style.border = '1px solid #cbd5e1';
                cancelBtn.style.borderRadius = '0.5rem';
                cancelBtn.style.padding = '0.65rem 1.25rem';
                cancelBtn.style.fontSize = '0.9rem';
                cancelBtn.style.fontWeight = '600';
                cancelBtn.style.cursor = 'pointer';
                cancelBtn.style.boxShadow = 'none';
                cancelBtn.style.transition = 'background-color 0.2s';
            }
        }
    });

    return isConfirmed;
};