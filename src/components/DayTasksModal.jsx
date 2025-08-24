import { getPriorityColor, isOverdue } from "../utils/helpers";

const DayTasksModal = ({ show, date, tasks, onClose, onTaskClick }) => {
  if (!show || !date) return null;

  const dayTasks = tasks.filter(
    (task) =>
      task.dueDate &&
      new Date(task.dueDate).toDateString() === date.toDateString()
  );

  const completedTasks = dayTasks.filter(task => task.status === 'completed');
  const pendingTasks = dayTasks.filter(task => task.status !== 'completed');
  const overdueTasks = pendingTasks.filter(task => isOverdue(task.dueDate));

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return '✅';
      case 'inprogress': return '⚡';
      case 'review': return '👁️';
      default: return '📝';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'inprogress': return 'In Progress';
      case 'review': return 'In Review';
      default: return 'To-Do';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'highest': return '🔴';
      case 'high': return '🟠';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      case 'lowest': return '⚪';
      default: return '🟡';
    }
  };

  return (
    <div className={`modal fixed inset-0 bg-[rgba(0,0,0,0.8)] backdrop-blur-lg flex justify-center items-center ${show ? 'active' : ''} transition-all duration-[var(--transition-slow)] z-[1000]`}>
      <div className="modal-content bg-[var(--bg-card)] p-8 rounded-2xl w-[90%] max-w-[600px] max-h-[80vh] flex flex-col gap-6 shadow-[var(--shadow-xl)] border border-[rgba(255,255,255,0.1)] relative">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <i className="fas fa-calendar-day"></i> 
              Tasks for {formatDate(date)}
            </h2>
            <div className="flex gap-4 mt-2 text-sm text-[var(--text-secondary)]">
              <span>Total: {dayTasks.length}</span>
              {completedTasks.length > 0 && (
                <span className="text-green-400">Completed: {completedTasks.length}</span>
              )}
              {overdueTasks.length > 0 && (
                <span className="text-red-400">Overdue: {overdueTasks.length}</span>
              )}
            </div>
          </div>
          <button
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-2xl"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {/* Tasks List */}
        <div className="flex-1 overflow-y-auto">
          {dayTasks.length === 0 ? (
            <div className="text-center text-[var(--text-secondary)] py-8">
              <i className="fas fa-calendar-times text-4xl mb-4 opacity-50"></i>
              <p>No tasks for this date</p>
            </div>
          ) : (
            <div className="space-y-3">
              {dayTasks.map((task) => (
                <div
                  key={task.id}
                  className={`task-item p-4 rounded-lg border-l-4 bg-[var(--bg-secondary)] cursor-pointer transition-all duration-300 hover:bg-[var(--bg-tertiary)] hover:shadow-md ${
                    task.status === 'completed' ? 'opacity-70' : ''
                  } ${isOverdue(task.dueDate) && task.status !== 'completed' ? 'bg-red-900/20' : ''}`}
                  style={{ borderLeftColor: getPriorityColor(task.priority) }}
                  onClick={() => onTaskClick && onTaskClick(task)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`font-semibold text-lg ${task.status === 'completed' ? 'line-through' : ''}`}>
                      {task.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      {isOverdue(task.dueDate) && task.status !== 'completed' && (
                        <span className="text-red-400 text-sm">⚠️ Overdue</span>
                      )}
                      <span className="text-xs text-[var(--text-secondary)]">
                        {getPriorityIcon(task.priority)} {task.priority}
                      </span>
                    </div>
                  </div>
                  
                  {task.description && (
                    <p className="text-[var(--text-secondary)] mb-3 text-sm">
                      {task.description}
                    </p>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className={`status-badge px-2 py-1 rounded text-xs font-medium ${
                        task.status === 'completed' ? 'bg-green-600' :
                        task.status === 'inprogress' ? 'bg-blue-600' :
                        task.status === 'review' ? 'bg-yellow-600' : 'bg-gray-600'
                      } text-white`}>
                        {getStatusIcon(task.status)} {getStatusText(task.status)}
                      </span>
                    </div>
                    
                    {task.dueDate && (
                      <div className="text-xs text-[var(--text-secondary)]">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end">
          <button
            className="btn-cancel bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[rgba(255,255,255,0.1)] px-6 py-2 rounded-lg font-semibold transition-all duration-[var(--transition-normal)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
            onClick={onClose}
          >
            <i className="fas fa-times mr-2"></i> Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DayTasksModal;