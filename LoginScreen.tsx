import { useState } from 'react';

interface LoginScreenProps {
  onLogin: (type: 'usuario' | 'administrador', election?: string) => void;
  onNavigateToRegister: () => void;
  onNavigateToForgotPassword: () => void;
}

export function LoginScreen({ onLogin, onNavigateToRegister, onNavigateToForgotPassword }: LoginScreenProps) {
  const [userType, setUserType] = useState<'usuario' | 'administrador'>('usuario');
  
  // Campos para usuário
  const [matricula, setMatricula] = useState('');
  const [nomeEleicao, setNomeEleicao] = useState('');
  const [senhaUsuario, setSenhaUsuario] = useState('');
  
  // Campos para administrador
  const [nomeAdmin, setNomeAdmin] = useState('');
  const [nomeInstituicao, setNomeInstituicao] = useState('');
  const [senhaAdmin, setSenhaAdmin] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(userType, nomeEleicao);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, nextField: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const nextElement = document.querySelector(`[data-field="${nextField}"]`) as HTMLInputElement;
      if (nextElement) {
        nextElement.focus();
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#002169] flex items-center justify-center p-6 md:p-8">
      <div className="w-full max-w-2xl">
        <h1 className="text-center mb-12" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <span className="text-white text-5xl md:text-6xl" style={{ fontWeight: 700 }}>Portal Do </span>
          <span className="text-[#FF3333] text-5xl md:text-6xl" style={{ fontWeight: 700 }}>Voto</span>
        </h1>

        <h2 className="text-white mb-8" style={{ fontSize: '40px', fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
          Login
        </h2>

        <div className="flex justify-end gap-6 mb-8">
          <label className="flex items-center gap-2 cursor-pointer">
            <div className={`w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${userType === 'administrador' ? 'bg-black' : 'bg-transparent'}`}>
              {userType === 'administrador' && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
            </div>
            <span className="text-white">Administrador</span>
            <input
              type="radio"
              name="userType"
              value="administrador"
              checked={userType === 'administrador'}
              onChange={(e) => setUserType(e.target.value as 'administrador')}
              className="sr-only"
            />
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <div className={`w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${userType === 'usuario' ? 'bg-black' : 'bg-transparent'}`}>
              {userType === 'usuario' && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
            </div>
            <span className="text-white">Usuário</span>
            <input
              type="radio"
              name="userType"
              value="usuario"
              checked={userType === 'usuario'}
              onChange={(e) => setUserType(e.target.value as 'usuario')}
              className="sr-only"
            />
          </label>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {userType === 'usuario' ? (
            <>
              <div>
                <input
                  type="text"
                  placeholder="matrícula"
                  value={matricula}
                  onChange={(e) => setMatricula(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, 'nomeEleicao')}
                  data-field="matricula"
                  className="w-full bg-transparent border-b border-white/30 text-white placeholder-white/60 py-3 px-0 focus:outline-none focus:border-white text-lg"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="nome da eleição"
                  value={nomeEleicao}
                  onChange={(e) => setNomeEleicao(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, 'senhaUsuario')}
                  data-field="nomeEleicao"
                  className="w-full bg-transparent border-b border-white/30 text-white placeholder-white/60 py-3 px-0 focus:outline-none focus:border-white text-lg"
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="senha"
                  value={senhaUsuario}
                  onChange={(e) => setSenhaUsuario(e.target.value)}
                  data-field="senhaUsuario"
                  className="w-full bg-transparent border-b border-white/30 text-white placeholder-white/60 py-3 px-0 focus:outline-none focus:border-white text-lg"
                />
                <div className="text-right mt-3">
                  <button
                    type="button"
                    onClick={onNavigateToForgotPassword}
                    className="text-white text-sm hover:underline"
                  >
                    esqueceu a senha?
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <input
                  type="text"
                  placeholder="nome"
                  value={nomeAdmin}
                  onChange={(e) => setNomeAdmin(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, 'nomeInstituicao')}
                  data-field="nomeAdmin"
                  className="w-full bg-transparent border-b border-white/30 text-white placeholder-white/60 py-3 px-0 focus:outline-none focus:border-white text-lg"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="nome da instituição"
                  value={nomeInstituicao}
                  onChange={(e) => setNomeInstituicao(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, 'senhaAdmin')}
                  data-field="nomeInstituicao"
                  className="w-full bg-transparent border-b border-white/30 text-white placeholder-white/60 py-3 px-0 focus:outline-none focus:border-white text-lg"
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="senha"
                  value={senhaAdmin}
                  onChange={(e) => setSenhaAdmin(e.target.value)}
                  data-field="senhaAdmin"
                  className="w-full bg-transparent border-b border-white/30 text-white placeholder-white/60 py-3 px-0 focus:outline-none focus:border-white text-lg"
                />
                <div className="text-right mt-3">
                  <button
                    type="button"
                    onClick={onNavigateToForgotPassword}
                    className="text-white text-sm hover:underline"
                  >
                    esqueceu a senha?
                  </button>
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded hover:bg-gray-900 transition-colors mt-8 text-xl"
            style={{ fontWeight: 700 }}
          >
            Entrar
          </button>
        </form>

        <p className="text-center text-white mt-8">
          Ainda não possui uma conta?{' '}
          <button onClick={onNavigateToRegister} className="underline hover:text-gray-300">
            Cadastre-se
          </button>
        </p>
      </div>
    </div>
  );
}