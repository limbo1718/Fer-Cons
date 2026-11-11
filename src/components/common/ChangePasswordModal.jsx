import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { IconX, IconEye, IconEyeOff } from '@tabler/icons-react';
import { useAuth } from '../../context/AuthContext.jsx';
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

export default function ChangePasswordModal({ isOpen, onClose, email = '', nombre = '' }) {
    const { actualizarContrasena } = useAuth();
    const [nuevaContra, setNuevaContra] = useState('');
    const [confirContra, setConfirContra] = useState('');

    // Limpia los campos cada vez que se abre el modal
    useEffect(() => {
        if (isOpen) {
            setNuevaContra('');
            setConfirContra('');
        }
    }, [isOpen, email]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        // 1. Campos vacíos
        if (!nuevaContra.trim() || !confirContra.trim()) {
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

        // 4. Guardar en el contexto (y en localStorage)
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