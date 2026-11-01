import { IconChevronDown } from '@tabler/icons-react';
import '../../styles/LoadMoreButton.css';

export default function LoadMoreButton({ onClick, text = "Ver más registros" }) {
    return (
        <div className="contenedor-cargar-mas">
        <button onClick={onClick} className="boton-cargar-mas">
            <span>{text}</span>
            <IconChevronDown size={18} />
        </button>
        </div>
    );
}