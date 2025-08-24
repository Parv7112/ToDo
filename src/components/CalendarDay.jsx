import { isOverdue } from "../utils/helpers";

const CalendarDay = ({ date, currentMonth, tasks, onSelect }) => {
  const isOtherMonth = date.getMonth() !== currentMonth;
  const isToday = date.toDateString() === new Date().toDateString();
  const dayTasks = tasks.filter(
    (task) =>
      task.dueDate &&
      new Date(task.dueDate).toDateString() === date.toDateString()
  );

  const overdueTasks = dayTasks.filter(task =>
    task.status !== 'completed' && isOverdue(task.dueDate)
  );

  const handleClick = (e) => {
    e.preventDefault();
    onSelect(date, dayTasks);
  };

  return (
    <div
      className={`calendar-day ${isOtherMonth ? "other-month" : ""} ${
        isToday ? "today" : ""
      } ${dayTasks.length > 0 ? "has-tasks" : ""} bg-[var(--bg-secondary)] min-h-[120px] p-3 cursor-pointer transition-all duration-300 flex flex-col justify-between border border-transparent hover:border-[var(--brand-primary)] hover:bg-[var(--bg-tertiary)]`}
      onClick={handleClick}
    >
      {/* Date number */}
      <div className="calendar-day-number font-semibold text-lg flex justify-between items-start">
        <span className={isOtherMonth ? "text-[var(--text-tertiary)]" : ""}>{date.getDate()}</span>
        {overdueTasks.length > 0 && (
          <span className="text-red-400 text-xs">⚠️</span>
        )}
      </div>

      {/* Task count indicator */}
      {dayTasks.length > 0 && (
        <div className="flex justify-center items-center mt-auto">
          <div className="task-count-badge bg-[var(--brand-primary)] text-white rounded-full px-3 py-1 text-sm font-semibold shadow-md hover:bg-[var(--brand-secondary)] transition-colors duration-200">
            {dayTasks.length} {dayTasks.length === 1 ? 'task' : 'tasks'}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarDay;
