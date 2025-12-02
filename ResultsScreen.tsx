import { ArrowLeft, User } from 'lucide-react';
import { Eleicao } from '../App';

interface ResultWithChapa {
  id: string;
  nomeChapa: string;
  nomeCandidato: string;
  numero: string;
  imagemUrl?: string;
  votes: number;
  percentage: number;
}

interface ResultsScreenProps {
  onBack: () => void;
  electionName: string;
  results: ResultWithChapa[];
  eleicao: Eleicao | null;
}

export function ResultsScreen({ onBack, electionName, results, eleicao }: ResultsScreenProps) {
  const isElectionActive = eleicao?.status === 'ativo';
  const electionEndDate = eleicao?.dataFim || '30/10/2025';
  const electionEndTime = eleicao?.horaFim || '23:59';
  
  const endMessage = isElectionActive 
    ? `Encerra em ${electionEndDate} às ${electionEndTime}`
    : `Votação encerrada em ${electionEndDate} às ${electionEndTime}`;

  const titulo = isElectionActive ? 'Resultados parciais' : 'Resultados';
  const vencedor = results.length > 0 ? results[0] : null;

  return (
    <div className="min-h-screen bg-[#002169] p-[10px]">
      <div className="min-h-screen bg-[#F6F6F6] rounded-[10px] overflow-hidden">
        <div className="bg-[#002B5C] p-6 flex items-center justify-center">
          <h1 style={{ fontFamily: 'Poppins, sans-serif' }}>
            <span className="text-white text-2xl md:text-3xl" style={{ fontWeight: 700 }}>Portal do </span>
            <span className="text-[#FF3333] text-2xl md:text-3xl" style={{ fontWeight: 700 }}>Voto</span>
          </h1>
        </div>

        <div className="p-6 md:p-8 max-w-2xl mx-auto min-h-[calc(100vh-80px)] flex flex-col">
          <h2 className="text-black mb-6 text-center" style={{ fontSize: '30px', fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
            {titulo}
          </h2>

          <div className="flex-1 overflow-y-auto">
            {results.length === 0 ? (
              <div className="flex items-center justify-center min-h-[40vh]">
                <p className="text-gray-500 text-xl text-center" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 900 }}>Nenhum voto registrado ainda</p>
              </div>
            ) : (
              <>
                <div className="space-y-6 mb-6">
                  {results.map((result, index) => (
                    <div 
                      key={result.id} 
                      className={`border-b border-gray-300 pb-6 last:border-0 ${
                        !isElectionActive && index === 0 ? 'bg-yellow-50 -mx-4 px-4 py-4 rounded-lg' : ''
                      }`}
                    >
                      {!isElectionActive && index === 0 && (
                        <div className="flex items-center justify-center mb-3">
                          <span className="bg-[#FFD700] text-black px-6 py-2 rounded-full text-lg" style={{ fontWeight: 700, fontFamily: 'Poppins, sans-serif' }}>
                            🏆 VENCEDOR
                          </span>
                        </div>
                      )}
                      
                      <div className="mb-4">
                        <h3 className="text-black text-xl mb-2" style={{ fontWeight: 700 }}>{result.nomeChapa}</h3>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="bg-gray-100 rounded-lg p-6 flex flex-col items-center justify-center">
                          {result.imagemUrl ? (
                            <img src={result.imagemUrl} alt={result.nomeCandidato} className="w-16 h-16 object-cover rounded mb-2" />
                          ) : (
                            <User className="w-16 h-16 text-gray-400 mb-2" />
                          )}
                          <p className="text-black text-center text-sm" style={{ fontWeight: 600 }}>{result.nomeCandidato}</p>
                        </div>

                        <div className="flex-1">
                          <p className="text-black text-right mb-2 text-lg" style={{ fontWeight: 700 }}>
                            {result.percentage}% dos votos
                          </p>
                          <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                index === 0 ? 'bg-[#2ECC71]' : 'bg-gray-400'
                              }`}
                              style={{ width: `${result.percentage}%` }}
                            ></div>
                          </div>
                          <p className="text-gray-600 text-right mt-1 text-sm">
                            {result.votes} {result.votes === 1 ? 'voto' : 'votos'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {eleicao && (
            <p className="text-center text-black mb-6 text-lg" style={{ fontWeight: 700 }}>
              {endMessage}
            </p>
          )}

          <div className="pt-6">
            <button
              onClick={onBack}
              className="w-full bg-[#1976D2] text-white py-4 rounded-lg hover:bg-[#1565C0] transition-colors text-xl"
              style={{ fontWeight: 700, fontFamily: 'Poppins, sans-serif' }}
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}