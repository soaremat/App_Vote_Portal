import { useState } from 'react';
import { ArrowLeft, User } from 'lucide-react';
import { Chapa, Eleicao } from '../App';

interface VotingScreenProps {
  onBack: () => void;
  electionName: string;
  chapas: Chapa[];
  onVote: (chapaNumero: string) => void;
  eleicao: Eleicao | null;
}

export function VotingScreen({ onBack, electionName, chapas, onVote, eleicao }: VotingScreenProps) {
  const [voteNumber, setVoteNumber] = useState('');
  const [candidateInfo, setCandidateInfo] = useState<Chapa | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showFinished, setShowFinished] = useState(false);
  const [isVotoBranco, setIsVotoBranco] = useState(false);

  const isElectionClosed = eleicao?.status === 'encerrado';

  const handleNumberClick = (num: string) => {
    if (isElectionClosed) return;
    if (voteNumber.length < 2) {
      const newNumber = voteNumber + num;
      setVoteNumber(newNumber);
      
      // Busca candidato assim que digita (1 ou 2 dígitos)
      const candidate = chapas.find(c => c.numero === newNumber);
      setCandidateInfo(candidate || null);
      setIsVotoBranco(false);
    }
  };

  const handleBranco = () => {
    if (isElectionClosed) return;
    setVoteNumber('');
    setCandidateInfo(null);
    setIsVotoBranco(true);
  };

  const handleCorrige = () => {
    if (isElectionClosed) return;
    setVoteNumber('');
    setCandidateInfo(null);
    setIsVotoBranco(false);
  };

  const handleConfirmar = () => {
    if (isElectionClosed) return;
    if (candidateInfo || isVotoBranco) {
      console.log('Abrindo modal de confirmação', { candidateInfo, isVotoBranco });
      setShowConfirmation(true);
    } else {
      console.log('Nenhum voto para confirmar', { candidateInfo, isVotoBranco });
    }
  };

  const handleConfirmVote = () => {
    if (candidateInfo) {
      onVote(candidateInfo.numero);
    } else if (isVotoBranco) {
      onVote('BRANCO');
    }
    setShowConfirmation(false);
    setShowFinished(true);
  };

  const handleCancelVote = () => {
    setShowConfirmation(false);
  };

  if (showFinished) {
    return (
      <div className="min-h-screen bg-[#002169] p-[10px]">
        <div className="min-h-screen bg-[#F6F6F6] rounded-[10px] overflow-hidden flex flex-col">
          <div className="bg-[#002B5C] p-6">
            <div className="flex-1 flex justify-center">
              <h1 style={{ fontFamily: 'Poppins, sans-serif' }}>
                <span className="text-white text-2xl md:text-3xl" style={{ fontWeight: 700 }}>Portal do </span>
                <span className="text-[#FF3333] text-2xl md:text-3xl" style={{ fontWeight: 700 }}>Voto</span>
              </h1>
            </div>
          </div>

          <div className="flex-1 p-6 md:p-8 max-w-2xl mx-auto flex flex-col items-center justify-center">
            <div className="bg-[#48CF4D] rounded-full p-8 mb-6">
              <svg className="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-[#48CF4D] text-3xl md:text-4xl mb-8" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
              Voto Confirmado!
            </h2>
          </div>

          <div className="p-6 flex justify-center">
            <button
              onClick={onBack}
              className="w-full max-w-md bg-[#4CAF50] text-white py-4 rounded-lg hover:bg-[#45A049] transition-colors text-xl"
              style={{ fontWeight: 700, fontFamily: 'Poppins, sans-serif' }}
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#002169] flex flex-col">
      {/* Header */}
      <div className="bg-[#001B4D] p-6 flex items-center relative">
        <button onClick={onBack} className="text-white hover:text-gray-300 transition-colors absolute left-4">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1 flex justify-center">
          <h1 style={{ fontFamily: 'Poppins, sans-serif' }}>
            <span className="text-white text-2xl md:text-3xl" style={{ fontWeight: 700 }}>Portal do </span>
            <span className="text-[#FF3333] text-2xl md:text-3xl" style={{ fontWeight: 700 }}>Voto</span>
          </h1>
        </div>
        <div className="w-5"></div>
      </div>

      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center p-6">
        {isElectionClosed ? (
          <div className="bg-white rounded-lg p-12 max-w-md text-center">
            <h2 className="text-2xl mb-4 text-red-600" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
              Eleição Encerrada
            </h2>
            <p className="text-gray-700 text-lg mb-8">
              Esta eleição já foi encerrada e não é mais possível votar.
            </p>
            <button
              onClick={onBack}
              className="w-full bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition-colors text-xl"
              style={{ fontWeight: 700, fontFamily: 'Poppins, sans-serif' }}
            >
              Voltar
            </button>
          </div>
        ) : (
        <div className="w-full max-w-2xl flex flex-col gap-5">
          {/* Candidate Info Card */}
          <div className="bg-white rounded-lg p-6">
            <p className="text-gray-700 text-xl mb-6">
              voto para <strong>{candidateInfo?.cargo || 'Cargo'}</strong>
            </p>
            
            <div className="flex justify-between items-start mb-8">
              <div className="flex-1 pr-6">
                <h3 className="text-black text-2xl" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                  {isVotoBranco ? 'VOTO EM BRANCO' : (candidateInfo?.nomeCandidato || 'Nome Sobrenome')}
                </h3>
              </div>
              <div className="bg-gray-200 rounded w-32 h-32 flex items-center justify-center flex-shrink-0">
                {candidateInfo?.imagemUrl ? (
                  <img src={candidateInfo.imagemUrl} alt={candidateInfo.nomeCandidato} className="w-full h-full object-cover rounded" />
                ) : (
                  <span className="text-sm text-gray-500 text-center px-2">foto do candidato</span>
                )}
              </div>
            </div>

            {/* Number Display */}
            <div className="flex gap-4 justify-center">
              <div className="w-16 h-16 border-2 border-black flex items-center justify-center text-2xl" style={{ fontFamily: 'Poppins', fontWeight: 700, borderRadius: '20px' }}>
                {voteNumber[0] || ''}
              </div>
              <div className="w-16 h-16 border-2 border-black flex items-center justify-center text-2xl" style={{ fontFamily: 'Poppins', fontWeight: 700, borderRadius: '20px' }}>
                {voteNumber[1] || ''}
              </div>
            </div>
          </div>

          {/* Number Pad */}
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => handleNumberClick(num.toString())}
                className="bg-black text-white py-6 rounded-[10px] border-[3px] border-white hover:bg-gray-900 transition-colors text-2xl"
                style={{ fontFamily: 'Poppins', fontWeight: 700 }}
              >
                {num}
              </button>
            ))}
          </div>

          {/* Zero Button */}
          <div className="grid grid-cols-3 gap-4">
            <div></div>
            <button
              onClick={() => handleNumberClick('0')}
              className="bg-black text-white py-6 rounded-[10px] border-[3px] border-white hover:bg-gray-900 transition-colors text-2xl"
              style={{ fontFamily: 'Poppins', fontWeight: 700 }}
            >
              0
            </button>
            <div></div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={handleBranco}
              className="bg-white text-black py-5 rounded hover:bg-gray-100 transition-colors text-lg"
              style={{ fontFamily: 'Poppins', fontWeight: 700 }}
            >
              Branco
            </button>
            <button
              onClick={handleCorrige}
              className="bg-[#E00000] text-white py-5 rounded hover:bg-[#C00000] transition-colors text-lg"
              style={{ fontFamily: 'Poppins', fontWeight: 700 }}
            >
              Corrige
            </button>
            <button
              onClick={handleConfirmar}
              className="bg-[#4CAF50] text-white py-5 rounded hover:bg-[#45A049] transition-colors text-lg"
              style={{ fontFamily: 'Poppins', fontWeight: 700 }}
            >
              Confirmar
            </button>
          </div>
        </div>
        )}
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50" onClick={(e) => {
          // Previne fechar ao clicar no overlay
          if (e.target === e.currentTarget) {
            console.log('Clicou no overlay');
          }
        }}>
          <div className="bg-white rounded-[20px] p-8 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl mb-6 text-center" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
              Confirmar seu voto?
            </h3>
            <p className="text-center text-gray-600 mb-6 text-lg">
              Você está prestes a votar em:
            </p>
            <div className="bg-[#002169] rounded-lg p-6 mb-8 text-center">
              {isVotoBranco ? (
                <p className="text-xl text-white" style={{ fontWeight: 700, fontFamily: 'Poppins' }}>VOTO EM BRANCO</p>
              ) : candidateInfo ? (
                <>
                  <p className="text-sm text-gray-300 mb-2">Candidato a {candidateInfo.cargo}</p>
                  <p className="text-2xl mb-2 text-white" style={{ fontWeight: 700, fontFamily: 'Poppins' }}>{candidateInfo.nomeCandidato}</p>
                  <p className="text-white mb-3">{candidateInfo.nomeChapa}</p>
                  <p className="text-3xl text-[#FFC107]" style={{ fontWeight: 700, fontFamily: 'Poppins' }}>Nº {candidateInfo.numero}</p>
                </>
              ) : null}
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleCancelVote}
                className="flex-1 bg-gray-500 text-white py-4 rounded-lg hover:bg-gray-600 transition-colors text-lg"
                style={{ fontWeight: 700, fontFamily: 'Poppins' }}
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmVote}
                className="flex-1 bg-[#4CAF50] text-white py-4 rounded-lg hover:bg-[#45A049] transition-colors text-lg"
                style={{ fontWeight: 700, fontFamily: 'Poppins' }}
              >
                Confirmar Voto
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}