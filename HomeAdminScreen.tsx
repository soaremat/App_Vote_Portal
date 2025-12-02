import { LogOut } from 'lucide-react';
import { useState } from 'react';

interface HomeAdminScreenProps {
  onNavigate: (screen: any) => void;
  onLogout: () => void;
}

export function HomeAdminScreen({ onNavigate, onLogout }: HomeAdminScreenProps) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    onLogout();
  };

  const options = [
    {
      label: 'Cadastrar chapas e candidatos',
      color: '#FFC107',
      hoverColor: '#FFB300',
      action: 'cadastrar-chapa'
    },
    {
      label: 'Criar eleição',
      color: '#4CAF50',
      hoverColor: '#45A049',
      action: 'eleicoes-ativas'
    },
    {
      label: 'Resultados',
      color: '#1976D2',
      hoverColor: '#1565C0',
      action: 'resultados-admin'
    },
    {
      label: 'Painel Administrativo',
      color: '#9C27B0',
      hoverColor: '#7B1FA2',
      action: 'painel-admin'
    }
  ];

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{options.map((option, index) => (
            <button
              key={index}
              onClick={() => onNavigate(option.action)}
              className="w-full bg-[#FFC107] text-black py-12 rounded-[10px] hover:bg-[#FFB300] transition-colors text-left px-8"
              style={{ backgroundColor: option.color, hoverBackgroundColor: option.hoverColor }}
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