import { useState } from 'react';

interface ResetPasswordScreenProps {
  onReset: () => void;
  onBack: () => void;
}

export function ResetPasswordScreen({ onReset, onBack }: ResetPasswordScreenProps) {
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }
    if (senha) {
      alert('Senha redefinida com sucesso!');
      onReset();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <div className="min-h-screen bg-[#002169] flex items-center justify-center p-6 md:p-8">
      <div className="w-full max-w-2xl">
        <h2 className="text-white mb-8 text-center" style={{ fontSize: '40px', fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
          Redefinir senha
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              placeholder="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full bg-transparent border-b border-white/30 text-white placeholder-white/60 py-3 px-0 focus:outline-none focus:border-white text-lg"
              required
              onKeyDown={handleKeyDown}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="confirmar senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              className="w-full bg-transparent border-b border-white/30 text-white placeholder-white/60 py-3 px-0 focus:outline-none focus:border-white text-lg"
              required
              onKeyDown={handleKeyDown}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded hover:bg-gray-900 transition-colors text-xl mt-8"
            style={{ fontWeight: 700 }}
          >
            OK
          </button>

          <button
            type="button"
            onClick={onBack}
            className="w-full text-white py-4 rounded hover:bg-white/10 transition-colors text-lg"
            style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}
          >
            Voltar
          </button>
        </form>
      </div>
    </div>
  );
}