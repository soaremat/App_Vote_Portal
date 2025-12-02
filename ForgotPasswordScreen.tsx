import { useState, useEffect } from 'react';

interface ForgotPasswordScreenProps {
  onBack: () => void;
  onCodeSent: () => void;
}

export function ForgotPasswordScreen({ onBack, onCodeSent }: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState('');
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setTimer(60);
      onCodeSent();
    }
  };

  const handleResendCode = () => {
    if (timer === 0 && email) {
      setTimer(60);
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
          Redefinição de senha
        </h2>

        <p className="text-white mb-8 opacity-90 text-center text-lg">
          Informe seu email para que seja enviado um link para redefinição de senha
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent border-b border-white/30 text-white placeholder-white/60 py-3 px-0 focus:outline-none focus:border-white text-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded hover:bg-gray-900 transition-colors text-xl"
            style={{ fontWeight: 700 }}
          >
            Enviar código
          </button>
        </form>

        <div className="flex items-center justify-center gap-4 mt-8 text-white">
          <button
            onClick={handleResendCode}
            disabled={timer > 0}
            className={`text-sm hover:underline ${timer > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            enviar código novamente {timer > 0 && `(${timer}s)`}
          </button>
          <span className="text-white/60">|</span>
          <button
            onClick={onBack}
            className="text-sm hover:underline"
          >
            voltar ao login
          </button>
        </div>
      </div>
    </div>
  );
}