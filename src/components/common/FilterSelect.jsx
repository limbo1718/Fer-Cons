import '../../styles/FilterSelect.css';

export default function FilterSelect({ value, onChange, options, placeholder = 'Seleccionar opción...' }) {
    return (
        <div className="filter-select-container">
        <select 
            className="filter-select-input"
            value={value} 
            onChange={(e) => onChange(e.target.value)}
        >
            <option value="">{placeholder}</option>
            {options.map((opt) => {
            // Soporta tanto array de strings ['Vendedor', 'Cajero'] como array de objetos [{value: '1', label: 'Caja 1'}]
            const optionValue = typeof opt === 'object' ? opt.value : opt;
            const optionLabel = typeof opt === 'object' ? opt.label : opt;

            return (
                <option key={optionValue} value={optionValue}>
                {optionLabel}
                </option>
            );
            })}
        </select>
        </div>
    );
    }