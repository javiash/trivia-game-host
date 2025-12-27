import { useGame } from '../context/GameContext';

export function ChooseMode() {
  const { setMode, setIsHostAuthenticated } = useGame();

  const handleHostClick = () => {
    setMode('host');
    setIsHostAuthenticated(false);
  };

  const handlePlayerClick = () => {
    setMode('player');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🏆</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            ¡Bienvenido a la trivia!
          </h1>
          <p className="text-gray-600">Elige tu rol para comenzar</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleHostClick}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all"
          >
            🎤 Soy el Anfitrión
          </button>

          <button
            onClick={handlePlayerClick}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all"
          >
            🎮 Soy un Jugador
          </button>
        </div>
      </div>
    </div>
  );
}

