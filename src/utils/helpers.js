export const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const isOverdue = (dueDate) => {
  if (!dueDate) return false;
  const today = new Date();
  const due = new Date(dueDate);
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);
  return due < today;
};

export const isDueSoon = (dueDate) => {
  if (!dueDate) return false;
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays >= 0 && diffDays <= 3;
};

export const saveTasks = (tasks) => {
  localStorage.setItem('taskboard-tasks', JSON.stringify(tasks));
};

export const getPriorityColor = (priority) => {
  const colors = {
    highest: '#dc2626',
    high: '#ea580c',
    medium: '#ca8a04',
    low: '#16a34a',
    lowest: '#64748b',
  };
  return colors[priority] || colors.medium;
};