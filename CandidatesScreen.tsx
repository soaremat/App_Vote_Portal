import { ArrowLeft, User } from 'lucide-react';
import { Chapa } from '../App';

interface CandidatesScreenProps {
  onBack: () => void;
  electionName: string;
  chapas: Chapa[];
}

export function CandidatesScreen({ onBack, electionName, chapas }: CandidatesScreenProps) {
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
            Candidatos
          </h2>

          <div className="flex-1">
            {chapas.length === 0 ? (
              <div className="flex items-center justify-center min-h-[40vh]">
                <p className="text-gray-500 text-xl text-center" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 900 }}>Ainda não existe chapas criadas para esta eleição</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                {chapas.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#80A4F0] rounded-lg p-6 hover:bg-[#6B8FDB] transition-colors"
                  >
                    <div className="flex items-start gap-6">
                      <div className="flex-1 space-y-3">
                        <div>
                          <p className="text-white text-sm mb-1 opacity-80">Chapa</p>
                          <h3 className="text-white text-xl" style={{ fontWeight: 700 }}>{item.nomeChapa}</h3>
                        </div>
                        
                        <div>
                          <p className="text-white text-sm mb-1 opacity-80">Candidato</p>
                          <p className="text-white text-lg" style={{ fontWeight: 600 }}>{item.nomeCandidato}</p>
                          {item.cargo && <p className="text-white text-sm opacity-90">{item.cargo}</p>}
                        </div>
                        
                        <div>
                          <p className="text-white text-sm mb-1 opacity-80">Número de voto</p>
                          <p className="text-white text-2xl" style={{ fontWeight: 700 }}>{item.numero}</p>
                        </div>
                      </div>

                      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-8 flex items-center justify-center">
                        {item.imagemUrl ? (
                          <img src={item.imagemUrl} alt={item.nomeCandidato} className="w-20 h-20 object-cover rounded" />
                        ) : (
                          <User className="w-20 h-20 text-white" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onBack}
            className="w-full bg-[#4CAF50] text-white py-4 rounded-lg hover:bg-[#45A049] transition-colors mt-6 text-xl"
            style={{ fontWeight: 700, fontFamily: 'Poppins, sans-serif' }}
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}