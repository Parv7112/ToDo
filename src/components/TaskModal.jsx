import { useState } from 'react';

const TaskModal = ({ show, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [status, setStatus] = useState('todo');
  const [dueDate, setDueDate] = useState('');

  const handleSave = () => {
    if (!title.trim()) {
      window.showToast('Please enter a task title', 'error');
      return;
    }
    onSave({ title, description, priority, status, dueDate });
    setTitle('');
    setDescription('');
    setPriority('medium');
    setStatus('todo');
    setDueDate('');
    onClose();
  };

  return (
    <div className={`modal fixed inset-0 bg-[rgba(0,0,0,0.8)] backdrop-blur-lg flex justify-center items-center ${show ? 'active' : ''} transition-all duration-[var(--transition-slow)] z-[1000]`}>
      <div className="modal-content bg-[var(--bg-card)] p-8 rounded-2xl w-[90%] max-w-[500px] flex flex-col gap-6 shadow-[var(--shadow-xl)] border border-[rgba(255,255,255,0.1)] relative">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <i className="fas fa-plus-circle"></i> Create New Task
        </h2>
        <input
          type="text"
          className="p-4 rounded-lg border border-[rgba(255,255,255,0.1)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:border-[var(--brand-primary)] focus:bg-[var(--bg-tertiary)] transition-all duration-[var(--transition-normal)]"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="p-4 rounded-lg border border-[rgba(255,255,255,0.1)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:border-[var(--brand-primary)] focus:bg-[var(--bg-tertiary)] transition-all duration-[var(--transition-normal)] resize-none"
          placeholder="Task Description (optional)"
          rows="3"
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
            className="btn-save bg-[var(--status-success)] text-[var(--text-primary)] px-8 py-3 rounded-lg font-semibold transition-all duration-[var(--transition-normal)] hover:bg-[#059669] hover:shadow-[var(--shadow-md)] hover:-translate-y-px"
            onClick={handleSave}
          >
            <i className="fas fa-save mr-2"></i> Save Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;