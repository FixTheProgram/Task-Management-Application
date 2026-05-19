import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userObj = await loginUser(email, password);
      onLogin(userObj); // Save user state globally in App.jsx
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required /><br />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required /><br />
        <button type="submit">Sign In</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p><small>Don't have an account? <button onClick={() => navigate('/register')}>Register</button></small></p>
    </div>
  );
}