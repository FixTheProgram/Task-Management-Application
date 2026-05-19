import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(email, password);
      setMsg('Registered! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setMsg('Registration failed.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required /><br />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required /><br />
        <button type="submit">Sign Up</button>
      </form>
      {msg && <p>{msg}</p>}
      <p><small>Have an account? <button onClick={() => navigate('/login')}>Login</button></small></p>
    </div>
  );
}