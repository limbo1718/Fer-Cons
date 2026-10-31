import { IconPlus } from '@tabler/icons-react';
import '../../styles/GenericFab.css';

export default function GenericFab({ 
    onClick, 
    title = 'Agregar', 
    icon = <IconPlus size={28} /> 
    }) {
    return (
        <button 
        className="fab-agregar" 
        onClick={onClick}
        title={title}
        aria-label={title}
        >
        {icon}
        </button>
    );
    }