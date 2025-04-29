import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChartBig, 
  Wallet, 
  Users, 
  Settings,
  LogOut,
  LineChart,
  Zap
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <div className="w-16 md:w-20 bg-card-bg h-screen fixed left-0 top-0 border-r border-border flex flex-col items-center py-8">
      <div className="mb-10">
        <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
          <Zap size={20} className="text-background" />
        </div>
      </div>
      
      <nav className="flex flex-col items-center gap-8 flex-1">
        <button 
          onClick={() => navigate('/')}
          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
            isActive('/') ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:bg-card-bg-light'
          }`}
        >
          <LayoutDashboard size={20} />
        </button>
        
        <button 
          onClick={() => navigate('/analytics')}
          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
            isActive('/analytics') ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:bg-card-bg-light'
          }`}
        >
          <BarChartBig size={20} />
        </button>
        
        <button 
          onClick={() => navigate('/reports')}
          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
            isActive('/reports') ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:bg-card-bg-light'
          }`}
        >
          <LineChart size={20} />
        </button>
        
        <button 
          onClick={() => navigate('/wallet')}
          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
            isActive('/wallet') ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:bg-card-bg-light'
          }`}
        >
          <Wallet size={20} />
        </button>
        
        <button 
          onClick={() => navigate('/users')}
          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
            isActive('/users') ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:bg-card-bg-light'
          }`}
        >
          <Users size={20} />
        </button>
      </nav>
      
      <div className="flex flex-col gap-6 mb-4">
        <button 
          onClick={() => navigate('/settings')}
          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
            isActive('/settings') ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:bg-card-bg-light'
          }`}
        >
          <Settings size={20} />
        </button>
        
        <button 
          onClick={handleLogout}
          className="w-10 h-10 rounded-lg flex items-center justify-center text-text-secondary transition-all hover:bg-card-bg-light"
        >
          <LogOut size={20} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;