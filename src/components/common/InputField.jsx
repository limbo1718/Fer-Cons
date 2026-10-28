import { IconUser, IconLock } from '@tabler/icons-react';

export default function InputField({ type = "text", placeholder, registro, error, icon: Icon }) {
  return (
    <div className="grupo-input">
      <div className="contenedor-input-interno">
        {Icon && <Icon size={22} className="icono-campo" />}
        <input
          type={type}
          placeholder={placeholder}
          className="input-personalizado"
          {...registro}
        />
      </div>
      {error && <p role="alert" className="mensaje-error-input">{error.message}</p>}
    </div>
  );
}