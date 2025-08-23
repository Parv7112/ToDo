const Toast = ({ message, type, show }) => {
  const icons = {
    success: 'fas fa-check-circle',
    error: 'fas fa-exclamation-circle',
    warning: 'fas fa-exclamation-triangle',
    info: 'fas fa-info-circle',
  };
  return (
    <div className={`toast ${type} ${show ? 'show' : ''} fixed bottom-8 right-8 bg-[var(--bg-card)] text-[var(--text-primary)] p-6 rounded-lg shadow-[var(--shadow-xl)] border border-[rgba(255,255,255,0.1)] backdrop-blur-md min-w-[300px] flex items-center gap-4 z-[10000]`}>
      <div className={`toast-icon ${icons[type] || icons.info} text-lg`}></div>
      <div className="toast-message">{message}</div>
    </div>
  );
};

export default Toast;