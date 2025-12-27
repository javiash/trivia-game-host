import { useGame } from '../../context/GameContext';

export function Ranking({isPlayer = false}) {
  const { gameState, resetGame, removeAllPlayers } = useGame();

  const sortedScores = Object.entries(gameState.scores).sort(
    (a, b) => b[1] - a[1]
  );

  const handleReset = () => {
    if (window.confirm('¿Reiniciar el juego y los puntos?')) {
      resetGame();
    }
  };

  const handleRemoveAll = () => {
    if (window.confirm('¿Quitar a todos los jugadores?')) {
      removeAllPlayers();
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          🏆 Ranking
        </h3>
        <div className="flex gap-2">
          {!isPlayer && (
          <button
            onClick={handleRemoveAll}
            className="px-3 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-sm"
          >
            🗑️ Todos
          </button>
          )}
          {!isPlayer && (
          <button
            onClick={handleReset}
            className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
          >
            🔄 Reiniciar
          </button>
          )}
        </div>
      </div>
      {sortedScores.length === 0 ? (
        <p className="text-gray-500 text-center py-4 text-sm">
          No hay puntuaciones aún
        </p>
      ) : (
        <div className="space-y-2">
          {sortedScores.slice(0, 10).map(([name, score], index) => (
            <div
              key={name}
              className={`flex items-center gap-2 p-2 rounded-lg ${
                index === 0
                  ? 'bg-gradient-to-r from-yellow-200 to-yellow-100'
                  : index === 1
                  ? 'bg-gradient-to-r from-gray-200 to-gray-100'
                  : index === 2
                  ? 'bg-gradient-to-r from-orange-200 to-orange-100'
                  : 'bg-gray-50'
              }`}
            >
              <span className="text-lg font-bold w-6">{index + 1}</span>
              <span className="font-semibold text-gray-800 flex-1 text-sm truncate">
                {name}
              </span>
              <span className="text-lg font-bold text-purple-600">{score}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

