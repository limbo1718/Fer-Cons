import { IconSearch } from '@tabler/icons-react';
import '../../styles/SearchBar.css';

export default function SearchBar({ value, onChange, placeholder = 'Buscar por legajo, nombre o sucursal...' }) {
  return (
    <div className="search-bar-container">
      <span className="search-icon-wrapper">
        <IconSearch size={20} />
      </span>
      <input
        type="text"
        className="search-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}