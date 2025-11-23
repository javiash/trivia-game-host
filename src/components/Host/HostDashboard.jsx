import { useGame } from '../../context/GameContext';
import { QuestionPanel } from './QuestionPanel';
import { PlayersList } from './PlayersList';
import { Ranking } from './Ranking';

export function HostDashboard() {
  const { setMode } = useGame();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Panel Principal */}
          <div className="lg:col-span-2 space-y-4">
            <QuestionPanel />
          </div>

          {/* Panel Lateral de Jugadores */}
          <div className="lg:col-span-1 space-y-4">
            {/* Lista de Jugadores Activos */}
            <div className="bg-white rounded-3xl shadow-2xl p-6">
              <PlayersList />
            </div>

            {/* Tabla de Puntuación */}
            <div className="bg-white rounded-3xl shadow-2xl p-6">
              <Ranking />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

