import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { IconX, IconEye, IconEyeOff } from '@tabler/icons-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { usuarioDemo, usuarios } from '../../data/mock.js';
import '../../styles/GenericModalForm.css';
import '../../styles/ChangePasswordModal.css';

const LARGO_MINIMO = 4;

// Aviso de validación por encima del modal
const mostrarAlerta = (icon, title, text) =>
    Swal.fire({
        icon,
        title,
        text,
        confirmButtonColor: '#0d9488',
        customClass: { container: 'swal-alto-z-index' }
    });

// Campo de contraseña con botón para mostrar/ocultar
function CampoPassword({ id, label, placeholder, value, onChange }) {
    const [ver, setVer] = useState(false);

    return (
        <div className="form-group">
            <label htmlFor={id}>{label}</label>
            <div className="cp-input-wrapper">
                <input
                    id={id}
                    name={id}
                    type={ver ? 'text' : 'password'}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    autoComplete="new-password"
                />
                <button
                    type="button"
                    className="cp-btn-ojo"
                    onClick={() => setVer((prev) => !prev)}
                    aria-label={ver ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    tabIndex={-1}
                >
                    {ver ? <IconEye size={18} /> : <IconEyeOff size={18} />}
                </button>
            </div>
        </div>
    );
}

// ADAPTACIÓN: Recibimos requireCurrentPassword para exigir la clave actual
export default function ChangePasswordModal({ isOpen, onClose, email = '', nombre = '', id_usuario = null, requireCurrentPassword = false }) {
    const { actualizarContrasena, passwordOverrides } = useAuth();
    const [nuevaContra, setNuevaContra] = useState('');
    const [confirContra, setConfirContra] = useState('');
    const [contraActual, setContraActual] = useState(''); // NUEVO

    // Limpia los campos cada vez que se abre el modal
    useEffect(() => {
        if (isOpen) {
            setNuevaContra('');
            setConfirContra('');
            setContraActual(''); // NUEVO
        }
    }, [isOpen, email]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        // 1. Campos vacíos (incluyendo la contraseña actual si se requiere)
        if (!nuevaContra.trim() || !confirContra.trim() || (requireCurrentPassword && !contraActual.trim())) {
            mostrarAlerta('warning', 'Campos incompletos', 'Por favor, complete todos los campos.');
            return;
        }

        // 2. Longitud mínima
        if (nuevaContra.length < LARGO_MINIMO) {
            mostrarAlerta('warning', 'Contraseña muy corta', `La nueva contraseña debe tener al menos ${LARGO_MINIMO} caracteres.`);
            return;
        }

        // 3. Coincidencia
        if (nuevaContra !== confirContra) {
            mostrarAlerta('error', 'Error de validación', 'Las nuevas contraseñas no coinciden.');
            return;
        }

        // 4. Obtener la contraseña actual real (del override o del mock)
        let contrasenaReal = passwordOverrides[email.toLowerCase()];
        if (!contrasenaReal) {
            if (email.toLowerCase() === usuarioDemo.Email.toLowerCase()) {
                contrasenaReal = usuarioDemo.Password;
            } else {
                const userObj = usuarios.find(u => u.Email.toLowerCase() === email.toLowerCase());
                contrasenaReal = userObj ? userObj.Password : null;
            }
        }

        // 5. NUEVO: Validar contraseña actual si el componente lo requiere
        if (requireCurrentPassword) {
            if (contraActual !== contrasenaReal) {
                mostrarAlerta('error', 'Contraseña incorrecta', 'La contraseña actual que ingresó no es correcta.');
                return;
            }
        }

        // 6. Validar que la nueva no sea igual a la actual
        if (nuevaContra === contrasenaReal) {
            mostrarAlerta('warning', 'Contraseña sin cambios', 'La nueva contraseña no puede ser igual a la anterior. Por favor, ingrese una diferente.');
            return;
        }

        // 7. Guardar en el contexto (y en localStorage)
        actualizarContrasena(email, nuevaContra);
        onClose();

        Swal.fire({
            icon: 'success',
            title: '¡Contraseña actualizada!',
            text: `La contraseña de ${nombre || email} se actualizó correctamente.`,
            timer: 1800,
            showConfirmButton: false
        });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h2>Cambiar contraseña</h2>
                    <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Cerrar">
                        <IconX size={20} />
                    </button>
                </div>
                <p className="modal-subtitle">
                    Actualizá las credenciales de acceso{nombre ? ` de ${nombre}` : ''}.
                </p>

                <form onSubmit={handleSubmit} noValidate className="modal-form">
                    <div className="form-group">
                        <label htmlFor="cp-email">
                            Correo del empleado
                            <span className="autogenerado-badge">NO EDITABLE</span>
                        </label>
                        <input
                            id="cp-email"
                            type="text"
                            value={email}
                            disabled
                            className="input-disabled"
                            readOnly
                        />
                    </div>

                    {/* NUEVO: Campo de contraseña actual (solo se muestra si requireCurrentPassword es true) */}
                    {requireCurrentPassword && (
                        <CampoPassword
                            id="cp-actual"
                            label="Contraseña Actual"
                            placeholder="Ingrese su contraseña actual por seguridad"
                            value={contraActual}
                            onChange={(e) => setContraActual(e.target.value)}
                        />
                    )}

                    <CampoPassword
                        id="cp-nueva"
                        label="Nueva contraseña"
                        placeholder="Ingrese la nueva contraseña"
                        value={nuevaContra}
                        onChange={(e) => setNuevaContra(e.target.value)}
                    />

                    <CampoPassword
                        id="cp-confirmar"
                        label="Repetir contraseña"
                        placeholder="Repita la nueva contraseña"
                        value={confirContra}
                        onChange={(e) => setConfirContra(e.target.value)}
                    />

                    <p className="cp-ayuda">La contraseña debe tener al menos {LARGO_MINIMO} caracteres.</p>

                    <div className="modal-actions">
                        <button type="button" className="btn-cancelar" onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn-guardar">
                            Actualizar contraseña
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}