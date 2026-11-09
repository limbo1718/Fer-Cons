import Swal from 'sweetalert2';

/**
 * Muestra una alerta con un campo de texto (textarea) para capturar motivos de baja u observaciones.
 * 
 * @param {Object} params - Parámetros de configuración
 * @param {string} params.title - Título principal del modal
 * @param {string} [params.subtitle="Gestión de Personal"] - Subtítulo superior o categoría
 * @param {string} [params.placeholder="Escribí detalladamente el motivo..."] - Texto de guía del textarea
 * @param {string} [params.inputValue=""] - Valor inicial (si se está editando)
 * @param {string} [params.confirmButtonText="Dar de baja"] - Texto del botón de confirmación
 * @param {string} [params.confirmButtonColor="#0d9488"] - Color del botón de confirmación
 * @returns {Promise<string|null>} - Devuelve el texto ingresado si confirma, o null si cancela.
 */
export const showConfirmInputAlert = async ({
    title,
    subtitle = 'Gestión de Personal',
    placeholder = 'Escribí detalladamente el motivo de la baja...',
    inputValue = '',
    confirmButtonText = 'Dar de baja',
    confirmButtonColor = '#0d9488'
}) => {
    const { value, isDismissed } = await Swal.fire({
        title: '',
        html: `
            <div style="text-align: left; font-family: inherit;">
                <!-- Header del Modal -->
                <div style="text-align: center; margin-bottom: 1.25rem;">
                    <span style="font-size: 0.75rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700; display: block; margin-bottom: 0.25rem;">
                        ${subtitle}
                    </span>
                    <h2 style="margin: 0; color: #0f2a30; font-size: 1.25rem; font-weight: 600;">
                        ${title}
                    </h2>
                </div>

                <!-- Caja del textarea estilizada -->
                <div style="background: #f8fafc; border: 1px solid rgba(15, 42, 48, 0.08); border-radius: 0.75rem; padding: 1rem; box-sizing: border-box; margin-bottom: 0.5rem;">
                    <label style="display: block; font-size: 0.75rem; font-weight: 700; color: #0d9488; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem;">
                        Detalle del motivo:
                    </label>
                    <textarea 
                        id="swal-input-motivo" 
                        class="swal2-textarea" 
                        placeholder="${placeholder}"
                        style="width: 100%; margin: 0; padding: 0.75rem; border: 1px solid rgba(15, 42, 48, 0.2); border-radius: 0.5rem; font-family: inherit; font-size: 0.9rem; color: #0f2a30; box-sizing: border-box; outline: none; min-height: 110px; resize: vertical; background: #ffffff;"
                    >${inputValue}</textarea>
                </div>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: confirmButtonText,
        cancelButtonText: 'Cancelar',
        buttonsStyling: false, // Desactivamos los estilos por defecto de SweetAlert para controlar los botones con CSS propio
        width: '520px',
        padding: '2rem',
        backdrop: 'rgba(15, 42, 48, 0.65)',
        focusConfirm: false,
        customClass: {
            actions: 'swal-actions-custom',
            confirmButton: 'swal-confirm-btn-custom',
            cancelButton: 'swal-cancel-btn-custom'
        },
        didOpen: () => {
            const confirmBtn = Swal.getConfirmButton();
            const cancelBtn = Swal.getCancelButton();
            const actions = Swal.getActions();

            // Espaciado contenedor de botones
            if (actions) {
                actions.style.display = 'flex';
                actions.style.gap = '0.75rem';
                actions.style.marginTop = '1rem';
            }

            // Estilos profesionales para el botón de confirmación
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

            // Estilos profesionales para el botón de cancelar
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
        },
        preConfirm: () => {
            const textarea = document.getElementById('swal-input-motivo');
            const val = textarea ? textarea.value.trim() : '';
            if (!val) {
                Swal.showValidationMessage('Debes ingresar un motivo obligatorio');
            }
            return val;
        }
    });

    if (isDismissed) return null;
    return value;
};