import { useGame } from "../../context/GameContext";

export function QuestionPanel() {
  const {
    gameState,
    startQuestion,
    endQuestion,
    markCorrect,
    markIncorrect,
    setMode,
  } = useGame();

  const handleLaunchQuestion = () => {
    startQuestion(`Pregunta #${gameState.questionNumber + 1}`);
  };

  const getMedal = (index) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `${index + 1}°`;
  };

  const getCurrentTurnIndex = () => {
    return gameState.responses.findIndex((r) => r.status === "waiting");
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          🎤 Tablón de puntuaciones
        </h1>
        <button
          onClick={() => setMode("choose")}
          className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300"
        >
          Salir
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">
          Pregunta #{gameState.questionNumber + 1}
        </label>
        <div className="flex gap-2">
          <button
            onClick={handleLaunchQuestion}
            disabled={gameState.isQuestionActive}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
          >
            {gameState.isQuestionActive
              ? "⏳ Pregunta Activa"
              : "🚀 Iniciar Pregunta"}
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Haz la pregunta verbalmente a los participantes
        </p>
      </div>

      {gameState.currentQuestion && (
        <div className="mb-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-lg font-bold text-gray-800">
                Pregunta #{gameState.questionNumber}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {gameState.isQuestionActive ? "En curso..." : "Finalizada"}
              </p>
            </div>
            {gameState.isQuestionActive ? (
              <button
                onClick={endQuestion}
                className="ml-4 px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600"
              >
                ❌ Cancelar Pregunta
              </button>
            ) : (
              <span className="ml-4 px-6 py-3 bg-gray-400 text-white rounded-xl font-semibold">
                ✓ Cerrada
              </span>
            )}
          </div>
        </div>
      )}

      {gameState.isQuestionActive && (
        <div className="mb-6">
          {/* <h3 className="text-lg font-bold text-gray-800 mb-3">
            ⚡ Orden de Respuestas
          </h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Instrucciones:</span>
            </p>
            <ul className="text-sm text-gray-600 mt-1 ml-4 list-disc">
              <li>
                <strong>+2 pts</strong>: Respuesta directa sin opciones
              </li>
              <li>
                <strong>+1 pt</strong>: Respuesta con opciones múltiples
              </li>
              <li>
                <strong>✗</strong>: Respuesta incorrecta (pasa al siguiente)
              </li>
            </ul>
          </div> */}
          {gameState.responses.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              Esperando respuestas...
            </p>
          ) : (
            <div className="space-y-2">
              {gameState.responses.map((response, index) => {
                const medal = getMedal(index);
                const currentTurnIndex = getCurrentTurnIndex();
                const isCurrentTurn =
                  response.status === "waiting" && index === currentTurnIndex;

                const getBorderClass = () => {
                  if (response.status === "correct")
                    return "bg-green-100 border-green-400";
                  if (response.status === "incorrect")
                    return "bg-red-100 border-red-400";
                  if (isCurrentTurn)
                    return "bg-yellow-100 border-yellow-400 animate-pulse";
                  return "bg-gray-50 border-gray-300";
                };

                return (
                  <div
                    key={`${response.name}-${index}`}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 ${getBorderClass()}`}
                  >
                    <span className="text-2xl font-bold">{medal}</span>
                    <span className="font-semibold text-gray-800 flex-1">
                      {response.name}
                    </span>

                    {response.status === "waiting" ? (
                      isCurrentTurn ? (
                        <>
                          <span className="text-xs bg-yellow-500 text-white px-2 py-1 rounded-full mr-2">
                            ES SU TURNO
                          </span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => markCorrect(response.name, 2)}
                              className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:shadow-lg font-semibold transform hover:scale-105 transition-all"
                            >
                              ✓ +2 pts
                            </button>
                            <button
                              onClick={() => markCorrect(response.name, 1)}
                              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:shadow-lg font-semibold transform hover:scale-105 transition-all"
                            >
                              ✓ +1 pt
                            </button>
                            <button
                              onClick={() => markIncorrect(response.name)}
                              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold"
                            >
                              ✗
                            </button>
                          </div>
                        </>
                      ) : (
                        <span className="text-sm text-gray-600">
                          Esperando turno...
                        </span>
                      )
                    ) : response.status === "correct" ? (
                      <span className="text-green-600 font-bold">
                        ✓ CORRECTO
                      </span>
                    ) : (
                      <span className="text-red-600 font-bold">
                        ✗ INCORRECTO
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
