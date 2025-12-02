interface ErrorScreenProps {
  onTryAgain: () => void;
  onNavigateToForgotPassword: () => void;
}

export function ErrorScreen({ onTryAgain, onNavigateToForgotPassword }: ErrorScreenProps) {
  return (
    <div className="min-h-screen bg-[#002169] flex items-center justify-center p-6 md:p-8">
      <div className="w-full max-w-2xl">
        <h2 className="text-white mb-8" style={{ fontSize: '40px', fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
          Matrícula ou senha inválida
        </h2>

        <button
          onClick={onTryAgain}
          className="w-full bg-black text-white py-4 rounded hover:bg-gray-900 transition-colors mb-4 text-xl"
          style={{ fontWeight: 700 }}
        >
          Tentar novamente
        </button>

        <div className="text-center">
          <button
            onClick={onNavigateToForgotPassword}
            className="text-white text-sm hover:underline"
          >
            esqueceu a senha?
          </button>
        </div>
      </div>
    </div>
  );
}