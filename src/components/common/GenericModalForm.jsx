import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { IconX } from '@tabler/icons-react';
import '../../styles/GenericModalForm.css';

export default function GenericModalForm({
    isOpen,
    onClose,
    title,
    subtitle,
    fields,          // Configuración de los campos (nombre, etiqueta, tipo, opciones, etc.)
    initialValues,   // Valores iniciales (ej: legajo autogenerado)
    onSubmit,        // Función que procesa los datos al enviar
    submitText = 'Guardar'
    }) {
    const [formData, setFormData] = useState({});

    // Sincroniza los valores iniciales cada vez que se abre el modal
    useEffect(() => {
        if (initialValues) {
        setFormData(initialValues);
        }
    }, [initialValues, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validamos que los campos obligatorios estén llenos antes de enviar
        for (const field of fields) {
            const isRequired = field.required !== false && !field.disabled;
            const valorActual = formData[field.name];

            if (isRequired && (!valorActual || String(valorActual).trim() === '')) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Campo incompleto',
                    text: `Por favor, completá el campo "${field.label}".`,
                    confirmButtonColor: '#0d9488', // Sincronizado con el color principal del sistema
                    target: document.body,         // Asegura que se monte en el body
                    didOpen: () => {
                        // Forzamos un z-index superior al del modal para que aparezca por encima
                        const swalContainer = document.querySelector('.swal2-container');
                        if (swalContainer) {
                            swalContainer.style.zIndex = '9999';
                        }
                    }
                });
                return; // Frena el envío si encuentra un campo vacío
            }
        }

        onSubmit(formData);
        onClose();
    };

    return (
        <div className="modal-overlay">
        <div className="modal-container">
            <div className="modal-header">
            <h2>{title}</h2>
            <button type="button" className="modal-close-btn" onClick={onClose}>
                <IconX size={20} />
            </button>
            </div>
            {subtitle && <p className="modal-subtitle">{subtitle}</p>}

            <form onSubmit={handleSubmit} className="modal-form">
            {fields.map((field) => (
                <div key={field.name} className="form-group">
                <label>
                    {field.label}
                    {field.badge && (
                    <span className="autogenerado-badge">{field.badge}</span>
                    )}
                </label>

                {field.type === 'select' ? (
                    <select
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    >
                    <option value="">{field.placeholder || 'Seleccionar...'}</option>
                    {field.options.map((opt) => {
                        const val = typeof opt === 'object' ? opt.value : opt;
                        const lbl = typeof opt === 'object' ? opt.label : opt;
                        return (
                        <option key={val} value={val}>
                            {lbl}
                        </option>
                        );
                    })}
                    </select>
                ) : (
                    <input
                    type={field.type || 'text'}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    disabled={field.disabled}
                    className={field.disabled ? 'input-disabled' : ''}
                    />
                )}
                </div>
            ))}

            <div className="modal-actions">
                <button type="button" className="btn-cancelar" onClick={onClose}>
                Cancelar
                </button>
                <button type="submit" className="btn-guardar">
                {submitText}
                </button>
            </div>
            </form>
        </div>
        </div>
    );
}