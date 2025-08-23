import Task from "./Task";

const Column = ({ status, title, tasks, onDrop, onDragOver, setCurrentTaskId }) => {
  return (
    <div
      className="column bg-[var(--bg-card)] rounded-lg p-6 w-[320px] min-h-[600px] shadow-[var(--shadow-lg)] flex-shrink-0 border border-[rgba(255,255,255,0.05)] backdrop-blur-md transition-all duration-[var(--transition-normal)] hover:shadow-[var(--shadow-xl)]"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, status)}
      id={status}
    >
      <h3 className="text-center mb-6 text-xl font-semibold border-b-2 border-[rgba(255,255,255,0.1)] pb-4 uppercase tracking-wide relative">
        {title}
      </h3>

      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDragStart={(e) => e.dataTransfer.setData("text/taskId", task.id)}
          onDragEnd={(e) => e.dataTransfer.clearData()}
          onClick={() => setCurrentTaskId(task.id)}
        />
      ))}
    </div>
  );
};

export default Column;
