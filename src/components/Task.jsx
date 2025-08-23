import { formatDate, isOverdue, isDueSoon, getPriorityColor } from "../utils/helpers";

const Task = ({ task, onDragStart, onDragEnd, onClick }) => {
  const dueDateClass = task.dueDate
    ? isOverdue(task.dueDate)
      ? "overdue"
      : isDueSoon(task.dueDate)
      ? "due-soon"
      : ""
    : "";

  const dueDateIcon = task.dueDate
    ? isOverdue(task.dueDate)
      ? '<i class="fas fa-exclamation-triangle"></i>'
      : isDueSoon(task.dueDate)
      ? '<i class="fas fa-clock"></i>'
      : '<i class="fas fa-calendar"></i>'
    : "";

  return (
    <div
      className="task bg-gradient-to-br from-[var(--bg-tertiary)] to-[var(--bg-secondary)] border border-[rgba(255,255,255,0.1)] rounded-lg p-4 mb-4 cursor-grab relative overflow-hidden backdrop-blur-sm transition-all duration-[var(--transition-normal)] hover:shadow-[var(--shadow-lg)]"
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
      data-task-id={task.id} // ✅ Safe reference
    >
      <div className="task-title font-semibold text-lg mb-2 text-[var(--text-primary)]">
        {task.title}
      </div>

      {task.description && (
        <div className="task-description text-sm text-[var(--text-muted)] mb-4">{task.description}</div>
      )}

      {task.dueDate && (
        <div
          className={`task-due-date ${dueDateClass} text-sm flex items-center gap-1`}
          dangerouslySetInnerHTML={{ __html: `${dueDateIcon} ${formatDate(task.dueDate)}` }}
        />
      )}

      <div
        className={`priority-label ${task.priority} uppercase text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1`}
        style={{ background: `linear-gradient(135deg, var(--priority-${task.priority}) 0%, ${getPriorityColor(task.priority)} 100%)` }}
      >
        {task.priority}
      </div>
    </div>
  );
};

export default Task;
