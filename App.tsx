import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { RegisterScreen } from './components/RegisterScreen';
import { ErrorScreen } from './components/ErrorScreen';
import { ForgotPasswordScreen } from './components/ForgotPasswordScreen';
import { VerifyCodeScreen } from './components/VerifyCodeScreen';
import { ResetPasswordScreen } from './components/ResetPasswordScreen';
import { HomeAlunoScreen } from './components/HomeAlunoScreen';
import { HomeAdminScreen } from './components/HomeAdminScreen';
import { VotingScreen } from './components/VotingScreen';
import { CandidatesScreen } from './components/CandidatesScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { CadastrarChapaScreen } from './components/admin/CadastrarChapaScreen';
import { FormChapaScreen } from './components/admin/FormChapaScreen';
import { FormEleicaoScreen } from './components/admin/FormEleicaoScreen';
import { EleicoesAtivasScreen } from './components/admin/EleicoesAtivasScreen';
import { PainelAdminScreen } from './components/admin/PainelAdminScreen';
import { ParticipantesEleicaoScreen } from './components/admin/ParticipantesEleicaoScreen';
import { ResultadosAdminScreen } from './components/admin/ResultadosAdminScreen';
import { DetalhesResultadosScreen } from './components/admin/DetalhesResultadosScreen';

type Screen = 'login' | 'register' | 'error' | 'forgot-password' | 'verify-code' | 'reset-password' | 
  'home-aluno' | 'home-admin' | 'voting' | 'candidates' | 'results' | 
  'cadastrar-chapa' | 'form-chapa' | 'criar-eleicao' | 'form-eleicao' | 'eleicoes-ativas' | 'painel-admin' | 'participantes-eleicao' | 
  'resultados-admin' | 'detalhes-resultados';

export interface Chapa {
  id: string;
  nomeChapa: string;
  nomeCandidato: string;
  nomeVice: string;
  numero: string;
  imagemUrl?: string;
  cargo?: string;
  nomeEleicao?: string;
}

export interface Eleicao {
  id: string;
  nome: string;
  dataInicio: string;
  dataFim: string;
  horaFim: string;
  status: 'ativo' | 'encerrado';
}

export interface Vote {
  eleicaoId: string;
  chapaNumero: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [userType, setUserType] = useState<'usuario' | 'administrador'>('usuario');
  const [electionName, setElectionName] = useState('');
  const [selectedEleicao, setSelectedEleicao] = useState<Eleicao | null>(null);
  
  // Estado global para dados
  const [chapas, setChapas] = useState<Chapa[]>([]);
  const [eleicoes, setEleicoes] = useState<Eleicao[]>([]);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [editingChapa, setEditingChapa] = useState<Chapa | null>(null);
  const [editingEleicao, setEditingEleicao] = useState<Eleicao | null>(null);
  const [viewingEleicaoNome, setViewingEleicaoNome] = useState<string>('');

  const handleLogin = (type: 'usuario' | 'administrador', election?: string) => {
    setUserType(type);
    if (type === 'usuario' && election) {
      setElectionName(election);
      // Buscar eleição se existir
      const eleicaoEncontrada = eleicoes.find(e => 
        e.nome.toLowerCase() === election.toLowerCase()
      );
      if (eleicaoEncontrada) {
        setSelectedEleicao(eleicaoEncontrada);
      }
      setCurrentScreen('home-aluno');
    } else if (type === 'administrador') {
      setCurrentScreen('home-admin');
    }
  };

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleAddChapa = (chapa: Chapa) => {
    setChapas([...chapas, chapa]);
  };

  const handleUpdateChapa = (chapa: Chapa) => {
    setChapas(chapas.map(c => c.id === chapa.id ? chapa : c));
  };

  const handleDeleteChapa = (id: string) => {
    setChapas(chapas.filter(c => c.id !== id));
    navigateTo('cadastrar-chapa');
  };

  const handleAddEleicao = (eleicao: Eleicao) => {
    setEleicoes([...eleicoes, eleicao]);
  };

  const handleUpdateEleicao = (eleicao: Eleicao) => {
    setEleicoes(eleicoes.map(e => e.id === eleicao.id ? eleicao : e));
  };

  const handleDeleteEleicao = (id: string) => {
    setEleicoes(eleicoes.filter(e => e.id !== id));
  };

  const handleVote = (chapaNumero: string) => {
    if (selectedEleicao && selectedEleicao.status === 'ativo') {
      setVotes([...votes, { eleicaoId: selectedEleicao.id, chapaNumero }]);
    }
  };

  const getVoteResults = () => {
    if (!selectedEleicao) return [];
    
    const eleicaoVotes = votes.filter(v => v.eleicaoId === selectedEleicao.id);
    const voteCounts: { [key: string]: number } = {};
    
    eleicaoVotes.forEach(vote => {
      voteCounts[vote.chapaNumero] = (voteCounts[vote.chapaNumero] || 0) + 1;
    });
    
    // Filtrar apenas as chapas vinculadas à eleição selecionada
    const chapasDaEleicao = chapas.filter(c => 
      c.nomeEleicao?.toLowerCase() === selectedEleicao.nome.toLowerCase()
    );
    
    return chapasDaEleicao.map(chapa => ({
      ...chapa,
      votes: voteCounts[chapa.numero] || 0,
      percentage: eleicaoVotes.length > 0 
        ? Math.round(((voteCounts[chapa.numero] || 0) / eleicaoVotes.length) * 100)
        : 0
    })).sort((a, b) => b.votes - a.votes);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6x1">
        {currentScreen === 'login' && (
          <LoginScreen 
            onLogin={handleLogin} 
            onNavigateToRegister={() => navigateTo('register')}
            onNavigateToForgotPassword={() => navigateTo('forgot-password')}
          />
        )}
        {currentScreen === 'register' && (
          <RegisterScreen onBack={() => navigateTo('login')} />
        )}
        {currentScreen === 'error' && (
          <ErrorScreen 
            onTryAgain={() => navigateTo('login')}
            onNavigateToForgotPassword={() => navigateTo('forgot-password')}
          />
        )}
        {currentScreen === 'forgot-password' && (
          <ForgotPasswordScreen 
            onBack={() => navigateTo('login')}
            onCodeSent={() => navigateTo('verify-code')}
          />
        )}
        {currentScreen === 'verify-code' && (
          <VerifyCodeScreen 
            onVerified={() => navigateTo('reset-password')}
            onBack={() => navigateTo('login')}
          />
        )}
        {currentScreen === 'reset-password' && (
          <ResetPasswordScreen 
            onReset={() => navigateTo('login')}
            onBack={() => navigateTo('login')}
          />
        )}
        {currentScreen === 'home-aluno' && (
          <HomeAlunoScreen 
            onNavigate={navigateTo} 
            onLogout={() => navigateTo('login')}
            electionName={electionName}
          />
        )}
        {currentScreen === 'home-admin' && (
          <HomeAdminScreen 
            onNavigate={navigateTo} 
            onLogout={() => navigateTo('login')}
          />
        )}
        {currentScreen === 'voting' && (
          <VotingScreen 
            onBack={() => navigateTo('home-aluno')} 
            electionName={electionName}
            chapas={chapas}
            onVote={handleVote}
            eleicao={selectedEleicao}
          />
        )}
        {currentScreen === 'candidates' && (
          <CandidatesScreen 
            onBack={() => navigateTo('home-aluno')} 
            electionName={electionName}
            chapas={chapas}
          />
        )}
        {currentScreen === 'results' && (
          <ResultsScreen 
            onBack={() => navigateTo(userType === 'administrador' ? 'home-admin' : 'home-aluno')} 
            electionName={electionName}
            results={getVoteResults()}
            eleicao={selectedEleicao}
          />
        )}
        {currentScreen === 'cadastrar-chapa' && (
          <CadastrarChapaScreen 
            onBack={() => navigateTo('home-admin')}
            onCadastrar={() => {
              setEditingChapa(null);
              navigateTo('form-chapa');
            }}
            onEdit={(chapa) => {
              setEditingChapa(chapa);
              navigateTo('form-chapa');
            }}
            chapas={chapas}
          />
        )}
        {currentScreen === 'form-chapa' && (
          <FormChapaScreen 
            onBack={() => navigateTo('cadastrar-chapa')}
            onSave={(chapa) => {
              if (editingChapa) {
                handleUpdateChapa({ ...chapa, id: editingChapa.id });
              } else {
                handleAddChapa({ ...chapa, id: Date.now().toString() });
              }
              setEditingChapa(null);
              navigateTo('cadastrar-chapa');
            }}
            onDelete={handleDeleteChapa}
            initialData={editingChapa}
            allChapas={chapas}
          />
        )}
        {currentScreen === 'eleicoes-ativas' && (
          <EleicoesAtivasScreen 
            onBack={() => navigateTo('home-admin')}
            onCriar={() => {
              setEditingEleicao(null);
              navigateTo('form-eleicao');
            }}
            onEdit={(eleicao) => {
              setEditingEleicao(eleicao);
              navigateTo('form-eleicao');
            }}
            onDelete={handleDeleteEleicao}
            onViewParticipantes={(nomeEleicao) => {
              setViewingEleicaoNome(nomeEleicao);
              navigateTo('participantes-eleicao');
            }}
            eleicoes={eleicoes}
          />
        )}
        {currentScreen === 'form-eleicao' && (
          <FormEleicaoScreen 
            onBack={() => navigateTo('eleicoes-ativas')}
            onSave={(eleicao) => {
              if (editingEleicao) {
                handleUpdateEleicao({ ...eleicao, id: editingEleicao.id });
              } else {
                handleAddEleicao({ ...eleicao, id: Date.now().toString() });
              }
              setEditingEleicao(null);
              navigateTo('eleicoes-ativas');
            }}
            initialData={editingEleicao}
          />
        )}
        {currentScreen === 'painel-admin' && (
          <PainelAdminScreen 
            onBack={() => navigateTo('home-admin')}
            chapas={chapas}
            eleicoes={eleicoes}
            votes={votes}
          />
        )}
        {currentScreen === 'participantes-eleicao' && (
          <ParticipantesEleicaoScreen 
            onBack={() => navigateTo('eleicoes-ativas')}
            nomeEleicao={viewingEleicaoNome}
            chapas={chapas}
          />
        )}
        {currentScreen === 'resultados-admin' && (
          <ResultadosAdminScreen 
            onBack={() => navigateTo('home-admin')}
            eleicoes={eleicoes}
            onSelectEleicao={(eleicao) => {
              setSelectedEleicao(eleicao);
              navigateTo('detalhes-resultados');
            }}
          />
        )}
        {currentScreen === 'detalhes-resultados' && selectedEleicao && (
          <DetalhesResultadosScreen 
            onBack={() => navigateTo('resultados-admin')}
            eleicao={selectedEleicao}
            results={getVoteResults()}
          />
        )}
      </div>
    </div>
  );
}