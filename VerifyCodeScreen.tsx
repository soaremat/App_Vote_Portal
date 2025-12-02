import { useState, useRef, KeyboardEvent } from 'react';

interface VerifyCodeScreenProps {
  onVerified: () => void;
  onBack: () => void;
}

export function VerifyCodeScreen({ onVerified, onBack }: VerifyCodeScreenProps) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length === 6) {
      onVerified();
    }
  };

  return (
    <div className="min-h-screen bg-[#002169] flex items-center justify-center p-6 md:p-8">
      <div className="w-full max-w-2xl">
        <h2 className="text-white mb-8 text-center" style={{ fontSize: '40px', fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
          Verificar código
        </h2>

        <p className="text-white mb-8 opacity-90 text-center text-lg">
          Digite o código de 6 dígitos enviado para seu email
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex justify-center gap-3">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-14 h-14 bg-transparent border-2 border-white text-white text-center text-2xl rounded focus:outline-none focus:border-[#FF3333]"
                style={{ fontWeight: 700 }}
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded hover:bg-gray-900 transition-colors text-xl"
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