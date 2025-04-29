import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Pega o token da URL
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');

        if (!accessToken) {
          throw new Error('Token não encontrado na URL');
        }

        // Configura a sessão com os tokens
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken || ''
        });

        if (error) throw error;

        if (data.session) {
          // Se a sessão foi estabelecida com sucesso, redireciona para o dashboard
          navigate('/', { replace: true });
        } else {
          throw new Error('Sessão não estabelecida');
        }
      } catch (error) {
        console.error('Erro na autenticação:', error);
        // Em caso de erro, redireciona para o login com uma mensagem
        navigate('/login?error=auth_failed', { replace: true });
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#00FF94] border-r-2 mx-auto mb-4"></div>
        <h2 className="text-[#00FF94] text-xl font-bold mb-2">Autenticando...</h2>
        <p className="text-gray-400">Aguarde um momento enquanto processamos seu login.</p>
      </div>
    </div>
  );
};

export default AuthCallback; 