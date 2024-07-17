import React, { useState } from 'react';
import './App.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isEditing, setIsEditing] = useState(null);
  const [currentTask, setCurrentTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() === '') return;
    setTasks([...tasks, { text: newTask, id: Date.now() }]);
    setNewTask('');
  };

  const handleEditTask = (id) => {
    setIsEditing(id);
    const task = tasks.find((task) => task.id === id);
    setCurrentTask(task.text);
  };

  const handleUpdateTask = (id) => {
    const updatedTasks = tasks.map((task) => (task.id === id ? { ...task, text: currentTask } : task));
    setTasks(updatedTasks);
    setIsEditing(null);
    setCurrentTask('');
  };

  const handleRemoveTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter a task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            {isEditing === task.id ? (
              <>
                <input
                  type="text"
                  value={currentTask}
                  onChange={(e) => setCurrentTask(e.target.value)}
                />
                <button onClick={() => handleUpdateTask(task.id)}>Update</button>
              </>
            ) : (
              <>
                <span>{task.text}</span>
                <button onClick={() => handleEditTask(task.id)}>Edit</button>
                <button onClick={() => handleRemoveTask(task.id)}>Remove</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
