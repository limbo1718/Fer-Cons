import { useState, forwardRef } from 'react';
import { IconLock, IconEye, IconEyeOff } from '@tabler/icons-react';

const InputPassword = forwardRef(({
    placeholder = 'Contraseña',
    registro,
    error,
    icon: Icon = IconLock,
    name,
    value,
    onChange,
    ...props
}, ref) => {
    const [verPassword, setVerPassword] = useState(false);

    const toggleVisibilidad = () => {
        setVerPassword((prev) => !prev);
    };

    return (
        <div className="grupo-input">
            <div className="contenedor-input-interno">
                {Icon && <Icon className="icono-campo" size={20} />}

                <input
                    type={verPassword ? 'text' : 'password'}
                    placeholder={placeholder}
                    className="input-personalizado input-password-ojo"
                    {...(registro || { name, value, onChange })}
                    {...props}
                    // CORRECCIÓN: Priorizamos la ref del registro (React Hook Form)
                    ref={registro?.ref || ref} 
                />

                <button
                    type="button"
                    onClick={toggleVisibilidad}
                    className="boton-toggle-password"
                    aria-label={verPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    tabIndex={-1}
                >
                    {verPassword ? <IconEye size={20} /> : <IconEyeOff size={20} />}
                </button>
            </div>

            {error && <p className="mensaje-error-input">{error.message}</p>}
        </div>
    );
});

export default InputPassword;