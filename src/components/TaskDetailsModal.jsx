import { useState, useEffect } from 'react';

const TaskDetailsModal = ({ show, task, onClose, onUpdate, onDelete }) => {
  const [title, setTitle] = useState(task ? task.title : '');
  const [description, setDescription] = useState(task ? task.description || '' : '');
  const [priority, setPriority] = useState(task ? task.priority : 'medium');
  const [status, setStatus] = useState(task ? task.status : 'todo');
  const [dueDate, setDueDate] = useState(task ? (task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '') : '');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setPriority(task.priority);
      setStatus(task.status);
      // Format date for HTML date input (YYYY-MM-DD)
      setDueDate(task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '');
    }
  }, [task]);

  const handleUpdate = () => {
    if (!title.trim()) {
      window.showToast('Please enter a task title', 'error');
      return;
    }
    onUpdate({ title, description, priority, status, dueDate });
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete();
      onClose();
    }
  };

  return (
    <div className={`modal fixed inset-0 bg-[rgba(0,0,0,0.8)] backdrop-blur-lg flex justify-center items-center ${show ? 'active' : ''} transition-all duration-[var(--transition-slow)] z-[1000]`}>
      <div className="modal-content bg-[var(--bg-card)] p-8 rounded-2xl w-[90%] max-w-[500px] flex flex-col gap-6 shadow-[var(--shadow-xl)] border border-[rgba(255,255,255,0.1)] relative">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <i className="fas fa-edit"></i> Edit Task
        </h2>
        <input
          type="text"
          className="p-4 rounded-lg border border-[rgba(255,255,255,0.1)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:border-[var(--brand-primary)] focus:bg-[var(--bg-tertiary)] transition-all duration-[var(--transition-normal)]"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="p-4 rounded-lg border border-[rgba(255,255,255,0.1)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:border-[var(--brand-primary)] focus:bg-[var(--bg-tertiary)] transition-all duration-[var(--transition-normal)] resize-y min-h-[100px]"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="p-4 rounded-lg border border-[rgba(255,255,255,0.1)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:border-[var(--brand-primary)] focus:bg-[var(--bg-tertiary)] transition-all duration-[var(--transition-normal)]"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="highest">🔴 Highest Priority</option>
          <option value="high">🟠 High Priority</option>
          <option value="medium">🟡 Medium Priority</option>
          <option value="low">🟢 Low Priority</option>
          <option value="lowest">⚪ Lowest Priority</option>
        </select>
        <select
          className="p-4 rounded-lg border border-[rgba(255,255,255,0.1)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:border-[var(--brand-primary)] focus:bg-[var(--bg-tertiary)] transition-all duration-[var(--transition-normal)]"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="todo">📝 To-Do</option>
          <option value="inprogress">⚡ In Progress</option>
          <option value="review">👁️ In Review</option>
          <option value="completed">✅ Completed</option>
        </select>
        <input
          type="date"
          className="p-4 rounded-lg border border-[rgba(255,255,255,0.1)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:border-[var(--brand-primary)] focus:bg-[var(--bg-tertiary)] transition-all duration-[var(--transition-normal)]"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <div className="modal-buttons flex justify-end gap-4 mt-4">
          <button
            className="btn-cancel bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[rgba(255,255,255,0.1)] px-8 py-3 rounded-lg font-semibold transition-all duration-[var(--transition-normal)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
            onClick={onClose}
          >
            <i className="fas fa-times mr-2"></i> Cancel
          </button>
          <button
            className="btn-delete bg-[var(--status-error)] text-[var(--text-primary)] px-8 py-3 rounded-lg font-semibold transition-all duration-[var(--transition-normal)] hover:bg-[#dc2626] hover:shadow-[var(--shadow-md)] hover:-translate-y-px"
            onClick={handleDelete}
          >
            <i className="fas fa-trash mr-2"></i> Delete
          </button>
          <button
            className="btn-save bg-[var(--status-success)] text-[var(--text-primary)] px-8 py-3 rounded-lg font-semibold transition-all duration-[var(--transition-normal)] hover:bg-[#059669] hover:shadow-[var(--shadow-md)] hover:-translate-y-px"
            onClick={handleUpdate}
          >
            <i className="fas fa-save mr-2"></i> Update Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsModal;