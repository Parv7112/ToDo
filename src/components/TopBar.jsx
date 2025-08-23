const TopBar = ({ setSearchTerm, setShowTaskModal }) => (
  <div className="top-bar flex gap-4 mb-8 flex-wrap items-center bg-[var(--bg-card)] p-4 rounded-lg shadow-[var(--shadow-md)] border border-[rgba(255,255,255,0.05)] backdrop-blur-md">
    <button
      className="create-task-btn bg-[var(--brand-gradient)] text-[var(--text-primary)] px-6 py-4 rounded-lg font-semibold text-sm transition-all duration-[var(--transition-normal)] shadow-[var(--shadow-sm)] relative overflow-hidden flex items-center gap-2 hover:shadow-[var(--shadow-lg)] hover:-translate-y-0.5"
      onClick={() => setShowTaskModal(true)}
    >
      <i className="fas fa-plus"></i> Create Task
    </button>
    <input
      type="text"
      className="search-input p-4 rounded-lg border border-[rgba(255,255,255,0.1)] bg-[var(--bg-secondary)] text-[var(--text-primary)] flex-grow min-w-[250px] text-sm placeholder-[var(--text-muted)] transition-all duration-[var(--transition-normal)]"
      placeholder="Search tasks..."
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>
);

export default TopBar;