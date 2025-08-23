import { getPriorityColor } from "../utils/helpers";

const CalendarDay = ({ date, currentMonth, tasks, onSelect }) => {
  const isOtherMonth = date.getMonth() !== currentMonth;
  const isToday = date.toDateString() === new Date().toDateString();
  const dayTasks = tasks.filter(
    (task) =>
      task.dueDate &&
      new Date(task.dueDate).toDateString() === date.toDateString()
  );

  return (
    <div
      className={`calendar-day ${isOtherMonth ? "other-month" : ""} ${
        isToday ? "today" : ""
      } bg-[var(--bg-secondary)] min-h-[120px] p-4 cursor-pointer transition-all duration-300 flex flex-col border border-transparent`}
      onClick={() => onSelect(date)}
    >
      <div className="calendar-day-number font-semibold mb-2 text-lg">
        {date.getDate()}
      </div>

      {dayTasks.length > 0 && (
        <>
          <div className="calendar-task-indicators flex flex-wrap gap-1 mt-2">
            {dayTasks.slice(0, 3).map((task) => (
              <div
                key={task.id}
                className="w-2.5 h-2.5 rounded-full shadow-sm"
                style={{ backgroundColor: getPriorityColor(task.priority) }}
                title={task.title}
              ></div>
            ))}
          </div>

          {dayTasks.length > 3 && (
            <div className="calendar-task-count bg-[var(--brand-gradient)] text-white rounded-full px-3 py-1 text-sm font-semibold shadow-sm mt-auto">
              +{dayTasks.length - 3}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CalendarDay;
