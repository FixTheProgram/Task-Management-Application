import axios from 'axios';

// Create a reusable instance pre-configured with your Spring Boot URL
const API = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true // Links up with our backend SecurityConfig CORS policy
});

// Authentication Network Requests
export const registerUser = async (email, password) => {
    try {
        const response = await API.post('/auth/register', { email, password });
        return response.data; 
    } catch (error) {
        throw error.response?.data || 'Registration failed';
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await API.post('/auth/login', { email, password });
        return response.data; // This returns the User object with its ID from MySQL
    } catch (error) {
        throw error.response?.data || 'Invalid email or password';
    }
};

// Add these to the bottom of frontend/src/services/api.js

export const getAllTasks = async () => {
    try {
        const response = await API.get('/tasks');
        return response.data; // Fetches the array of tasks from MySQL
    } catch (error) {
        throw error.response?.data || 'Failed to fetch tasks';
    }
};

export const createTask = async (taskData) => {
    try {
        const response = await API.post('/tasks', taskData);
        return response.data; // Saves task and returns it with its MySQL ID
    } catch (error) {
        throw error.response?.data || 'Failed to create task';
    }
};

// Add these to src/services/api.js if they aren't there already
// Remove "/tasks" so it sends to http://localhost:8080/5 instead of /tasks/5
// Update Task Status (PUT)
// Update Task Status (PUT)
export const updateTask = async (id, updatedTask) => {
    try {
        // CRUCIAL: Make sure "return" is right here!
        const response = await API.put(`/tasks/${id}`, updatedTask); 
        return response.data; 
    } catch (error) {
        throw error.response?.data || 'Failed to update task';
    }
};
// Delete Task (DELETE)
export const deleteTask = async (id) => {
  try {
    // Appends '/tasks/{id}' to the baseURL -> http://localhost:8080/api/tasks/5
    const response = await API.delete(`/tasks/${id}`); 
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Failed to delete task';
  }
};
export default API;