const ViewToggle = ({ currentView, setCurrentView }) => (
  <div className="view-toggle flex gap-1 mb-8 bg-[var(--bg-card)] p-1 rounded-lg shadow-[var(--shadow-sm)] border border-[rgba(255,255,255,0.05)] w-fit">
    <button
      className={`px-6 py-4 rounded-lg font-medium transition-all duration-[var(--transition-normal)] ${currentView === 'board' ? 'bg-[var(--brand-primary)] text-[var(--text-primary)] shadow-[var(--shadow-sm)]' : 'text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-secondary)]'}`}
      onClick={() => setCurrentView('board')}
    >
      <i className="fas fa-columns mr-2"></i> Board View
    </button>
    <button
      className={`px-6 py-4 rounded-lg font-medium transition-all duration-[var(--transition-normal)] ${currentView === 'calendar' ? 'bg-[var(--brand-primary)] text-[var(--text-primary)] shadow-[var(--shadow-sm)]' : 'text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-secondary)]'}`}
      onClick={() => setCurrentView('calendar')}
    >
      <i className="fas fa-calendar-alt mr-2"></i> Calendar View
    </button>
  </div>
);

export default ViewToggle;