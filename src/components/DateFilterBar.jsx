import { formatDate } from '../utils/helpers';

const DateFilterBar = ({ selectedDate, setSelectedDate }) => (
  <div className={`date-filter-bar bg-gradient-to-br from-[var(--bg-tertiary)] to-[var(--bg-card)] p-4 rounded-lg mb-8 flex items-center gap-4 shadow-[var(--shadow-md)] border border-[rgba(255,255,255,0.1)] ${selectedDate ? 'active animate-[slideInDown_0.3s_ease-out]' : ''}`}>
    <i className="fas fa-filter"></i>
    <span className="date-filter-text font-semibold text-[var(--text-secondary)]">
      Showing tasks for: <span>{selectedDate && formatDate(selectedDate)}</span>
    </span>
    <button
      className="clear-filter-btn bg-[var(--status-error)] text-[var(--text-primary)] px-4 py-2 rounded font-medium text-sm transition-all duration-[var(--transition-normal)] shadow-[var(--shadow-sm)] hover:bg-[#dc2626] hover:shadow-[var(--shadow-md)] hover:-translate-y-px"
      onClick={() => setSelectedDate(null)}
    >
      <i className="fas fa-times mr-2"></i> Clear Filter
    </button>
  </div>
);

export default DateFilterBar;