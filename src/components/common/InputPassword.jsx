import { useState } from 'react';
import { IconLock, IconEye, IconEyeOff } from '@tabler/icons-react';

export default function InputPassword({
    placeholder = 'Contraseña',
    registro,
    error,
    icon: Icon = IconLock,
    name,
    value,
    onChange,
    ...props
}) {
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
            />

            <button
            type="button"
            onClick={toggleVisibilidad}
            className="boton-toggle-password"
            aria-label={verPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            tabIndex={-1}
            >
            {/* Si verPassword es TRUE (se ve el texto), mostramos el ojo normal para indicar que se puede ocultar. */}
            {/* Si verPassword es FALSE (está oculto con puntos), mostramos el ojo tachado para indicar que está oculto. */}
            {verPassword ? <IconEye size={20} /> : <IconEyeOff size={20} />}
            </button>
        </div>

        {error && <p className="mensaje-error-input">{error.message}</p>}
        </div>
    );
}