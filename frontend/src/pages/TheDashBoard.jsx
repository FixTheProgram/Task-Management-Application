import { useState, useEffect } from 'react';
import { getAllTasks, createTask, updateTask, deleteTask } from '../services/api'; // Added imports
import TaskCard from '../components/TaskCards';

export default function DashboardPage({ user, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getAllTasks();
      setTasks(data.filter(t => t.user && t.user.id === user.id));
    } catch (err) {
      setMsg('Could not load tasks.');
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const newTask = {
        title: title,
        description: description,
        status: 'IN_PROGRESS',
        user: { id: user.id }
      };

      await createTask(newTask);
      setTitle('');
      setDescription('');
      setMsg('Task saved!');
      fetchTasks();
    } catch (err) {
      setMsg('Error saving task.');
    }
  };

  // Handle Changing Status (PUT Request)
 const handleUpdateTask = async (taskId, updatedTaskPayload) => {
  try {
    // Send the original task properties exactly as they came from MySQL, 
    // only modifying the status field.
    const completePayload = {
      ...updatedTaskPayload,
      id: taskId // Ensure the ID is explicitly at the root of the object
    };

    console.log("Sending complete payload to backend:", completePayload);
    
    await updateTask(taskId, completePayload);
    fetchTasks(); 
  } catch (err) {
    setMsg('Failed to update task status.');
  }
};

  // Handle Deleting a Row (DELETE Request)
  const handleDeleteTask = async (taskId) => {
  console.log("Delete button clicked! Target Task ID:", taskId); // <-- Add this debug log
  try {
    await deleteTask(taskId);
    fetchTasks(); 
  } catch (err) {
    setMsg('Failed to delete task.');
  }
};
  return (
    <div className="container dashboard-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Tasks Dashboard</h2>
        <button onClick={onLogout} className="btn-logout">Logout</button>
      </div>
      <p>Logged in as: <b>{user.email}</b> (ID: {user.id})</p>
      <hr />

      <div className="dashboard-layout">
        
        <div className="form-section">
          <h3>Create New Task</h3>
          <form onSubmit={handleCreateTask}>
            <label>Task Title</label>
            <input type="text" placeholder="e.g., Fix database connection" value={title} onChange={e => setTitle(e.target.value)} required />
            
            <label>Description</label>
            <textarea placeholder="Provide details about this assignment..." value={description} onChange={e => setDescription(e.target.value)} />
            
            <button type="submit" style={{ width: '100%' }}>Create Task</button>
          </form>
          {msg && <p style={{ marginTop: '10px', color: '#16a34a' }}><small>{msg}</small></p>}
        </div>

        <div className="tasks-section">
          <h3>Active Tasks</h3>
          {tasks.length === 0 ? (
            <p>No active assignments found for this account.</p>
          ) : (
            <div className="task-list">
              {tasks.map(t => (
                <TaskCard 
                  key={t.id} 
                  task={t} 
                  onUpdate={handleUpdateTask} // Pass reference
                  onDelete={handleDeleteTask} // Pass reference
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}