import '../../styles/FilterTabs.css';

export default function FilterTabs({ tabs, activeTab, onTabChange }) {
  return (
    <div className="filter-tabs-container">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={`filter-tab-btn ${activeTab === tab.id ? 'filter-tab-active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
          {tab.count !== undefined && ` (${tab.count})`}
        </button>
      ))}
    </div>
  );
}