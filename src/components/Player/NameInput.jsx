import { useState } from 'react';
import { useGame } from '../../context/GameContext';

export function NameInput() {
  const {
    setPlayerName,
    setPreviousPlayerName,
    setHasResponded,
    setMode,
    registerPlayer,
    updatePlayer,
    gameState,
    previousPlayerName,
  } = useGame();
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      const newName = name.trim();

      // Si había un nombre anterior y es diferente, actualizar en lugar de registrar uno nuevo
      if (previousPlayerName && previousPlayerName !== newName) {
        const currentScore = gameState.scores[previousPlayerName] || 0;
        updatePlayer(previousPlayerName, newName, currentScore);
      } else if (previousPlayerName === newName) {
        // Si el nombre es el mismo que tenía, solo restaurar (no hacer nada en el servidor)
      } else if (!previousPlayerName) {
        // Si no había nombre anterior, registrar como nuevo jugador
        registerPlayer(newName);
      }

      setPreviousPlayerName('');
      setPlayerName(newName);
      setHasResponded(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">👤</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">¡Bienvenido!</h2>
          <p className="text-gray-600">Ingresa tu nombre para jugar</p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl mb-4 focus:border-blue-500 focus:outline-none text-lg"
            autoFocus
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-semibold text-lg hover:shadow-lg transition-all"
          >
            Entrar al Juego
          </button>
        </form>

        <button
          onClick={() => {
            setMode('choose');
            setPreviousPlayerName('');
            setPlayerName('');
          }}
          className="w-full mt-3 px-4 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300"
        >
          Volver
        </button>
      </div>
    </div>
  );
}

