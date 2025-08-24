import { removeAuthToken } from '../api';

const TopBar = ({ setSearchTerm, setShowTaskModal, user, onLogout }) => {
  const handleLogout = () => {
    removeAuthToken();
    onLogout();
  };

  return (
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

      <div className="user-info flex items-center gap-4 ml-auto">
        <div className="user-details text-right">
          <div className="text-[var(--text-primary)] font-medium">
            <i className="fas fa-user mr-2"></i>
            {user?.username}
          </div>
          <div className="text-[var(--text-muted)] text-sm">{user?.email}</div>
        </div>
        
        <button
          onClick={handleLogout}
          className="logout-btn bg-[var(--status-error)] text-[var(--text-primary)] px-4 py-2 rounded-lg font-medium text-sm transition-all duration-[var(--transition-normal)] hover:bg-[#dc2626] hover:shadow-[var(--shadow-md)] hover:-translate-y-px flex items-center gap-2"
        >
          <i className="fas fa-sign-out-alt"></i>
          Logout
        </button>
      </div>
    </div>
  );
};

export default TopBar;