import { LogOut } from 'lucide-react';
import { useState } from 'react';

interface HomeAlunoScreenProps {
  onNavigate: (screen: any) => void;
  onLogout: () => void;
  electionName: string;
}

export function HomeAlunoScreen({ onNavigate, onLogout, electionName }: HomeAlunoScreenProps) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const options = [
    { label: 'Votar', screen: 'voting', color: '#FFC107', hoverColor: '#FFB300' },
    { label: 'Ver candidatos', screen: 'candidates', color: '#4CAF50', hoverColor: '#45A049' },
    { label: 'Ver resultados', screen: 'results', color: '#1976D2', hoverColor: '#1565C0' }
  ];

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    onLogout();
  };

  return (
    <div className="min-h-screen bg-[#002169] p-[10px]">
      <div className="min-h-screen bg-[#F6F6F6] rounded-[10px] overflow-hidden">
        <div className="bg-[#002B5C] p-6 flex justify-between items-center">
          <div className="flex-1 flex justify-center">
            <h1 style={{ fontFamily: 'Poppins, sans-serif' }}>
              <span className="text-white text-2xl md:text-3xl" style={{ fontWeight: 700 }}>Portal do </span>
              <span className="text-[#FF3333] text-2xl md:text-3xl" style={{ fontWeight: 700 }}>Voto</span>
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="text-white hover:text-gray-300 transition-colors"
            title="Sair"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 md:p-8 max-w-2xl mx-auto min-h-[calc(100vh-80px)] flex flex-col">
          <div className="space-y-4">{options.map((option, index) => (
            <button
              key={index}
              onClick={() => onNavigate(option.screen)}
              className="w-full bg-[#FFC107] text-black py-12 rounded-[10px] hover:bg-[#FFB300] transition-colors text-left px-8"
              style={{ backgroundColor: option.color, borderColor: option.color }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = option.hoverColor}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = option.color}
            >
              <span className="text-2xl md:text-3xl" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                {option.label}
              </span>
            </button>
          ))}</div>
        </div>

        {showLogoutConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-[20px] p-8 max-w-md w-full">
              <h3 className="text-2xl mb-4 text-center" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                Confirmar saída?
              </h3>
              <p className="text-center text-gray-700 mb-6">
                Deseja realmente sair do sistema?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 bg-gray-300 text-black py-3 rounded-lg hover:bg-gray-400 transition-colors"
                  style={{ fontWeight: 600 }}
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmLogout}
                  className="flex-1 bg-[#E74C3C] text-white py-3 rounded-lg hover:bg-[#C0392B] transition-colors"
                  style={{ fontWeight: 600 }}
                >
                  Sair
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}