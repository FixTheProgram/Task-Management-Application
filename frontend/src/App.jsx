import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/TheDashBoard';

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <Routes>
          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Auth Pages */}
          <Route path="/login" element={!user ? <LoginPage onLogin={setUser} /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/dashboard" />} />

          {/* Dashboard Page */}
          <Route path="/dashboard" element={user ? <DashboardPage user={user} onLogout={() => setUser(null)} /> : <Navigate to="/login" />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}