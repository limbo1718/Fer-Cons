export default function ButtonSubmit({ text, disabled, className = '', ...props }) {
  return (
    <button 
      disabled={disabled} 
      className={`boton-enviar ${className}`.trim()} 
      {...props} 
    >
      {text}
    </button>
  );
}