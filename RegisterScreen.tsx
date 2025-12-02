import { useState } from 'react';

interface RegisterScreenProps {
  onBack: () => void;
}

export function RegisterScreen({ onBack }: RegisterScreenProps) {
  const [accountType, setAccountType] = useState<'usuario' | 'administrador'>('usuario');
  
  // Campos para usuário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmeSenha, setConfirmeSenha] = useState('');
  
  // Campos adicionais para administrador
  const [dataNascimento, setDataNascimento] = useState('');
  const [emailAdmin, setEmailAdmin] = useState('');
  const [nomeInstituicao, setNomeInstituicao] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (senha !== confirmeSenha) {
      alert('As senhas não coincidem!');
      return;
    }
    
    if (accountType === 'usuario') {
      if (nome && email && matricula && senha && confirmeSenha) {
        alert('Cadastro realizado com sucesso!');
        onBack();
      }
    } else {
      if (nome && dataNascimento && emailAdmin && nomeInstituicao && senha && confirmeSenha) {
        alert('Cadastro de administrador realizado com sucesso!');
        onBack();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, nextField?: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (nextField) {
        const nextElement = document.querySelector(`[data-field="${nextField}"]`) as HTMLInputElement;
        if (nextElement) {
          nextElement.focus();
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#002169] flex items-center justify-center p-6 md:p-8 overflow-y-auto">
      <div className="w-full max-w-2xl py-8">
        <h2 className="text-white mb-8" style={{ fontSize: '40px', fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
          Cadastre-se
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tipo de conta */}
          <div>
            <p className="text-white mb-4 text-lg">Tipo de conta</p>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <div className={`w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${accountType === 'administrador' ? 'bg-black' : 'bg-transparent'}`}>
                  {accountType === 'administrador' && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
                </div>
                <span className="text-white">Administrador</span>
                <input
                  type="radio"
                  name="accountType"
                  value="administrador"
                  checked={accountType === 'administrador'}
                  onChange={(e) => setAccountType(e.target.value as 'administrador')}
                  className="sr-only"
                />
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <div className={`w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${accountType === 'usuario' ? 'bg-black' : 'bg-transparent'}`}>
                  {accountType === 'usuario' && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
                </div>
                <span className="text-white">Usuário</span>
                <input
                  type="radio"
                  name="accountType"
                  value="usuario"
                  checked={accountType === 'usuario'}
                  onChange={(e) => setAccountType(e.target.value as 'usuario')}
                  className="sr-only"
                />
              </label>
            </div>
          </div>

          {/* Campos para Usuário */}
          {accountType === 'usuario' && (
            <>
              <div>
                <input
                  type="text"
                  placeholder="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, 'email')}
                  data-field="nome"
                  className="w-full bg-transparent border-b border-white/30 text-white placeholder-white/60 py-3 px-0 focus:outline-none focus:border-white text-lg"
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, 'matricula')}
                  data-field="email"
                  className="w-full bg-transparent border-b border-white/30 text-white placeholder-white/60 py-3 px-0 focus:outline-none focus:border-white text-lg"
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="matrícula"
                  value={matricula}
                  onChange={(e) => setMatricula(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, 'senha')}
                  data-field="matricula"
                  className="w-full bg-transparent border-b border-white/30 text-white placeholder-white/60 py-3 px-0 focus:outline-none focus:border-white text-lg"
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, 'confirmeSenha')}
                  data-field="senha"
                  className="w-full bg-transparent border-b border-white/30 text-white placeholder-white/60 py-3 px-0 focus:outline-none focus:border-white text-lg"
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="confirme a senha"
                  value={confirmeSenha}
                  onChange={(e) => setConfirmeSenha(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e)}
                  data-field="confirmeSenha"
                  className="w-full bg-transparent border-b border-white/30 text-white placeholder-white/60 py-3 px-0 focus:outline-none focus:border-white text-lg"
                  required
                />
              </div>
            </>
          )}

          {/* Campos para Administrador */}
          {accountType === 'administrador' && (
            <>
              <div>
                <input
                  type="text"
                  placeholder="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, 'dataNascimento')}
                  data-field="nomeAdmin"
                  className="w-full bg-transparent border-b border-white/30 text-white placeholder-white/60 py-3 px-0 focus:outline-none focus:border-white text-lg"
                  required
                />
              </div>

              <div>
                <input
                  type="date"
                  placeholder="data de nascimento"
                  value={dataNascimento}
                  onChange={(e) => setDataNascimento(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, 'emailAdmin')}
                  data-field="dataNascimento"
                  className="w-full bg-transparent border-b border-white/30 text-white placeholder-white/60 py-3 px-0 focus:outline-none focus:border-white text-lg [color-scheme:dark]"
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="email"
                  value={emailAdmin}
                  onChange={(e) => setEmailAdmin(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, 'nomeInstituicao')}
                  data-field="emailAdmin"
                  className="w-full bg-transparent border-b border-white/30 text-white placeholder-white/60 py-3 px-0 focus:outline-none focus:border-white text-lg"
                  required
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
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, 'confirmeSenhaAdmin')}
                  data-field="senhaAdmin"
                  className="w-full bg-transparent border-b border-white/30 text-white placeholder-white/60 py-3 px-0 focus:outline-none focus:border-white text-lg"
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="confirme a senha"
                  value={confirmeSenha}
                  onChange={(e) => setConfirmeSenha(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e)}
                  data-field="confirmeSenhaAdmin"
                  className="w-full bg-transparent border-b border-white/30 text-white placeholder-white/60 py-3 px-0 focus:outline-none focus:border-white text-lg"
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded hover:bg-gray-900 transition-colors mt-8 text-xl"
            style={{ fontWeight: 700, fontFamily: 'Poppins, sans-serif' }}
          >
            Cadastrar
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