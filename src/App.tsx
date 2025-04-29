import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';
import Wallet from './pages/Wallet';
import Users from './pages/Users';
import Settings from './pages/Settings';
import { Login } from './pages/Login';
import { AuthCallback } from './components/AuthCallback';

const AppContent = () => {
  const { user } = useAuth();

  // Renderiza as rotas públicas sem o Sidebar
  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  // Renderiza as rotas protegidas com o Sidebar
  return (
    <div className="flex min-h-screen bg-[#121214] font-poppins text-white">
      <Sidebar />
      <main className="flex-1">
        <Routes>
          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wallet"
            element={
              <ProtectedRoute>
                <Wallet />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;