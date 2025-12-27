import { useGame } from "../../context/GameContext";
import { Ranking } from "../Host/Ranking";

export function PlayerDashboard() {
  const {
    playerName,
    setPlayerName,
    setPreviousPlayerName,
    gameState,
    hasResponded,
    playerResponse,
  } = useGame();

  const myResponse = gameState.responses.find((r) => r.name === playerName);
  const myPosition =
    gameState.responses.findIndex((r) => r.name === playerName) + 1;

  const handleChangeName = () => {
    setPreviousPlayerName(playerName);
    setPlayerName("");
  };

  const handleResponse = () => {
    playerResponse(playerName);
  };

  const getStatusIcon = () => {
    if (!myResponse) return null;
    if (myResponse.status === "correct") return "✓";
    if (myResponse.status === "incorrect") return "✗";
    if (myPosition === 1) return "🥇";
    if (myPosition === 2) return "🥈";
    if (myPosition === 3) return "🥉";
    return `${myPosition}°`;
  };

  const getStatusText = () => {
    if (!myResponse) return "";
    if (myResponse.status === "correct") return "¡Respuesta Correcta!";
    if (myResponse.status === "incorrect") return "Respuesta Incorrecta";
    return `Posición: ${myPosition}°`;
  };

  const getStatusSubtext = () => {
    if (!myResponse) return "";
    if (myResponse.status === "waiting")
      return "Esperando validación del anfitrión...";
    if (myResponse.status === "correct") return "¡Sumaste puntos!";
    return "Sigue participando";
  };

  const getStatusBgColor = () => {
    if (!myResponse) return "bg-white";
    if (myResponse.status === "correct") return "bg-green-500";
    if (myResponse.status === "incorrect") return "bg-red-500";
    return "bg-white";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-400 flex flex-col gap-4 md:flex-row items-start justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Hola, {playerName}! 👋
          </h2>
          <button
            onClick={handleChangeName}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            Cambiar nombre
          </button>
        </div>

        {!gameState.isQuestionActive && !gameState.currentQuestion && (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">⚡</div>
            <p className="text-gray-600 text-lg">
              Esperando la primera pregunta...
            </p>
          </div>
        )}

        {gameState.currentQuestion && (
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl">
            <p className="text-sm text-gray-600 mb-2">Pregunta Actual:</p>
            <p className="text-xl font-bold text-gray-800">
              {gameState.currentQuestion}
            </p>
          </div>
        )}

        {gameState.isQuestionActive ? (
          hasResponded && myResponse ? (
            <div className="text-center py-6">
              <div
                className={`w-20 h-20 border-2 border-blue-500 ${getStatusBgColor()} rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <span className="text-4xl">{getStatusIcon()}</span>
              </div>
              <p className="text-xl font-bold text-gray-800 mb-2">
                {getStatusText()}
              </p>
              <p className="text-gray-600">{getStatusSubtext()}</p>
            </div>
          ) : (
            <button
              onClick={handleResponse}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-8 rounded-2xl font-bold text-2xl hover:shadow-2xl transform hover:scale-105 transition-all active:scale-95"
            >
              🚀 ¡RESPONDER!
            </button>
          )
        ) : null}

        <div className="mt-6 p-4 bg-purple-100 rounded-xl text-center">
          <p className="text-gray-700 mb-1">Tu Puntuación</p>
          <p className="text-3xl font-bold text-purple-600">
            {gameState.scores[playerName] || 0} pts
          </p>
        </div>
      </div>
      <div className="bg-white rounded-3xl shadow-2xl  p-8 max-w-md w-full">
        <Ranking isPlayer={true} />
      </div>
    </div>
  );
}
