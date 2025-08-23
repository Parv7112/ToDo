import CalendarDay from "./CalendarDay";

const Calendar = ({
  currentDate,
  tasks,
  setCurrentDate,
  setSelectedDate,
  setCurrentView,
}) => {
  const firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  // Start from the first Sunday before first day
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());

  // Generate 42 days (6 weeks grid)
  const days = Array.from({ length: 42 }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    return date;
  });

  return (
    <div className="calendar-container bg-[var(--bg-card)] rounded-lg p-8 mb-8 shadow-lg border border-[rgba(255,255,255,0.05)] backdrop-blur-md animate-fadeIn">
      {/* Header */}
      <div className="calendar-header flex justify-between items-center mb-8">
        <button
          className="calendar-nav bg-[var(--bg-tertiary)] text-[var(--text-primary)] p-3 rounded-lg cursor-pointer hover:bg-[var(--brand-primary)]"
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
            )
          }
        >
          ◀
        </button>

        <div className="calendar-title text-2xl font-semibold bg-[var(--brand-gradient)] bg-clip-text text-transparent">
          {currentDate.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </div>

        <button
          className="calendar-nav bg-[var(--bg-tertiary)] text-[var(--text-primary)] p-3 rounded-lg cursor-pointer hover:bg-[var(--brand-primary)]"
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
            )
          }
        >
          ▶
        </button>
      </div>

      {/* Days grid */}
      <div className="calendar-grid grid grid-cols-7 gap-0.5 bg-[rgba(255,255,255,0.05)] rounded-lg overflow-hidden">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="calendar-day-header bg-[var(--bg-tertiary)] p-4 text-center font-semibold text-sm text-[var(--text-secondary)] uppercase"
          >
            {day}
          </div>
        ))}

        {days.map((date) => (
          <CalendarDay
            key={date.getTime()}
            date={date}
            currentMonth={currentDate.getMonth()}
            tasks={tasks}
            onSelect={(d) => {
              setSelectedDate(d);
              setCurrentView("board");
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Calendar;