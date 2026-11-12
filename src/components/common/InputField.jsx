import { forwardRef } from 'react';

const InputField = forwardRef(({ 
  type = "text",
  placeholder,
  registro,
  error,
  icon: Icon,
  ...props
}, ref) => {
  return (
    <div className="grupo-input">
      <div className="contenedor-input-interno">
        {Icon && <Icon size={22} className="icono-campo" />}
        <input
          type={type}
          placeholder={placeholder}
          className="input-personalizado"
          {...registro}
          {...props}
          // SOLUCIÓN: Priorizamos la ref de React Hook Form (registro.ref)
          ref={registro?.ref || ref} 
        />
      </div>
      {error && <p role="alert" className="mensaje-error-input">{error.message}</p>}
    </div>
  );
});

export default InputField;