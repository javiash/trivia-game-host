import { useState } from 'react';
import { useGame } from '../../context/GameContext';

export function PlayersList() {
  const {
    gameState,
    isEditMode,
    setIsEditMode,
    editingPlayer,
    setEditingPlayer,
    updatePlayer,
    removePlayer,
  } = useGame();

  const [editName, setEditName] = useState('');
  const [editScore, setEditScore] = useState(0);

  const handleStartEdit = (player) => {
    setEditingPlayer(player);
    setEditName(player);
    setEditScore(gameState.scores[player] || 0);
  };

  const handleSaveEdit = (oldName) => {
    if (editName.trim()) {
      updatePlayer(oldName, editName.trim(), editScore);
      setEditingPlayer(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingPlayer(null);
  };

  const handleDelete = (name) => {
    if (window.confirm(`¿Eliminar a ${name}?`)) {
      removePlayer(name);
    }
  };

  if (gameState.players.length === 0) {
    return (
      <p className="text-gray-500 text-center py-4 text-sm">
        No hay jugadores conectados
      </p>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          👥 Jugadores Conectados
        </h3>
        <button
          onClick={() => {
            setIsEditMode(!isEditMode);
            setEditingPlayer(null);
          }}
          className={`px-3 py-1 ${
            isEditMode ? 'bg-orange-500' : 'bg-blue-500'
          } text-white rounded-lg hover:opacity-80 text-sm font-semibold`}
        >
          {isEditMode ? '🔓 Bloquear' : '🔒 Editar'}
        </button>
      </div>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {gameState.players.map((player) => {
          const isEditing = editingPlayer === player;

          if (isEditing) {
            return (
              <div
                key={player}
                className="p-3 bg-orange-50 border-2 border-orange-400 rounded-lg"
              >
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-2 py-1 border-2 border-orange-300 rounded focus:border-orange-500 focus:outline-none text-sm"
                    placeholder="Nombre"
                  />
                  <input
                    type="number"
                    value={editScore}
                    onChange={(e) => setEditScore(parseInt(e.target.value) || 0)}
                    className="w-full px-2 py-1 border-2 border-orange-300 rounded focus:border-orange-500 focus:outline-none text-sm"
                    placeholder="Puntos"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSaveEdit(player)}
                      className="flex-1 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm font-semibold"
                    >
                      ✓ Guardar
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="flex-1 px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 text-sm font-semibold"
                    >
                      ✗ Cancelar
                    </button>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div
              key={player}
              className="p-3 bg-blue-50 border border-blue-200 rounded-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-semibold text-gray-800">{player}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-purple-600 font-bold">
                    {gameState.scores[player] || 0} pts
                  </span>
                  {isEditMode && (
                    <>
                      <button
                        onClick={() => handleStartEdit(player)}
                        className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(player)}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                      >
                        🗑️
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

