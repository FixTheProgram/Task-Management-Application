import React from 'react';

export default function TaskCard({ task, onUpdate, onDelete }) {
  // Determine button text based on status
  const nextStatus = task.status === 'IN_PROGRESS' ? 'COMPLETED' : 'IN_PROGRESS';

  return (
    <div className="task-item">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong style={{ fontSize: '16px' }}>{task.title}</strong>
        <span style={{ 
          fontSize: '11px', 
          padding: '3px 6px', 
          backgroundColor: task.status === 'COMPLETED' ? '#d1e7dd' : '#e2e3e5', 
          color: task.status === 'COMPLETED' ? '#0f5132' : '#333',
          borderRadius: '4px',
          fontWeight: 'bold'
        }}>
          {task.status}
        </span>
      </div>
      
      {task.description && (
        <p style={{ margin: '8px 0 12px 0', color: '#666', fontSize: '14px' }}>
          {task.description}
        </p>
      )}

      {/* Action Buttons Panel */}
      {/* Inside src/components/TaskCard.jsx */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        {/* <button 
            onClick={() => onUpdate(task.id, { ...task, status: task.status === 'IN_PROGRESS' ? 'COMPLETED' : 'IN_PROGRESS' })}
            style={{ marginTop: 0, padding: '4px 8px', fontSize: '12px', backgroundColor: '#198754' }}
        >
            Mark Done
        </button> */}
        
        <button 
            onClick={() => onDelete(task.id)} // <-- Must be written exactly like this!
            style={{ marginTop: 0, padding: '4px 8px', fontSize: '12px', backgroundColor: '#dc3545' }}
        >
            Delete
        </button>
        </div>
    </div>
  );
}