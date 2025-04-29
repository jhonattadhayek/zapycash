import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/dashboard');
      } else {
        navigate('/login');
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#121214] text-white flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-8 h-8 border-4 border-[#00FF94] border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-400">Redirecionando...</p>
      </div>
    </div>
  );
} 