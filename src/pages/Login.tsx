import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export function Login() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) {
        throw error;
      }

      setMessage({
        type: 'success',
        text: 'Link de acesso enviado! Verifique seu email.'
      });
    } catch (err) {
      console.error('Erro ao enviar email:', err);
      setMessage({
        type: 'error',
        text: 'Erro ao enviar o link de acesso. Tente novamente.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121214] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-[#1E1E1E] rounded-xl p-8">
          <h1 className="text-2xl font-bold text-center mb-8 text-[#00FF94]">
            ZapyCash
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-[#2A2A2A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00FF94]"
                required
              />
            </div>

            {message && (
              <div className={`text-sm text-center ${
                message.type === 'success' ? 'text-green-500' : 'text-red-500'
              }`}>
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-lg bg-[#00FF94] text-black font-medium transition-colors
                ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#00E676]'}`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
                  Enviando...
                </div>
              ) : (
                'Entrar com Email'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 