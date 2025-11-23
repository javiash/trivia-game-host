import { createContext, useContext, useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const GameContext = createContext();

export function GameProvider({ children }) {
  const [gameState, setGameState] = useState({
    currentQuestion: "",
    isQuestionActive: false,
    responses: [],
    scores: {},
    questionNumber: 0,
    players: [],
    currentTurnIndex: 0,
  });

  const [mode, setMode] = useState("choose");
  const [playerName, setPlayerName] = useState("");
  const [previousPlayerName, setPreviousPlayerName] = useState("");
  const [hasResponded, setHasResponded] = useState(false);
  const [isHostAuthenticated, setIsHostAuthenticated] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState(null);

  const socketRef = useRef(null);

  // Inicializar socket una sola vez
  useEffect(() => {
    if (!socketRef.current) {
      // En producción, conectar al mismo servidor (mismo dominio)
      // En desarrollo, Vite proxy maneja la conexión
      const socketUrl = import.meta.env.PROD
        ? window.location.origin
        : undefined;
      socketRef.current = io(socketUrl);
    }

    const socket = socketRef.current;

    // Escuchar cambios de nombre
    const handleNameChanged = (data) => {
      const { oldName, newName } = data;
      setPlayerName((currentName) => {
        if (mode === "player" && currentName === oldName) {
          console.log(
            `Nombre actualizado por el host: ${oldName} -> ${newName}`
          );
          return newName;
        }
        return currentName;
      });
    };

    // Escuchar estado del juego
    const handleGameState = (state) => {
      setGameState((prevState) => {
        // Actualizar estado
        const newState = state;

        // Si estamos en modo jugador, manejar lógica específica
        if (mode === "player") {
          if (!newState.isQuestionActive) {
            setHasResponded(false);
          }

          // Fallback: si nuestro nombre ya no está en los jugadores
          setPlayerName((currentName) => {
            if (currentName && !newState.players.includes(currentName)) {
              const oldScore = prevState.scores[currentName] || 0;
              const newPlayerName = newState.players.find((player) => {
                const playerScore = newState.scores[player] || 0;
                return player !== currentName && playerScore === oldScore;
              });

              if (newPlayerName) {
                console.log(
                  `Nombre actualizado (fallback): ${currentName} -> ${newPlayerName}`
                );
                return newPlayerName;
              }
            }
            return currentName;
          });
        }

        return newState;
      });
    };

    socket.on("playerNameChanged", handleNameChanged);
    socket.on("gameState", handleGameState);

    return () => {
      socket.off("gameState", handleGameState);
      socket.off("playerNameChanged", handleNameChanged);
    };
  }, [mode]);

  // Funciones del socket
  const socketActions = {
    startQuestion: (question) => {
      socketRef.current?.emit("startQuestion", question);
    },
    endQuestion: () => {
      socketRef.current?.emit("endQuestion");
    },
    playerResponse: (name) => {
      if (!gameState.isQuestionActive || hasResponded) return;
      setHasResponded(true);
      socketRef.current?.emit("playerResponse", { name });
    },
    markCorrect: (name, points) => {
      socketRef.current?.emit("markCorrect", { name, points });
    },
    markIncorrect: (name) => {
      socketRef.current?.emit("markIncorrect", name);
    },
    resetGame: () => {
      socketRef.current?.emit("resetGame");
    },
    removeAllPlayers: () => {
      socketRef.current?.emit("removeAllPlayers");
    },
    removePlayer: (name) => {
      socketRef.current?.emit("removePlayer", name);
    },
    updatePlayer: (oldName, newName, newScore) => {
      socketRef.current?.emit("updatePlayer", { oldName, newName, newScore });
    },
    registerPlayer: (name) => {
      socketRef.current?.emit("registerPlayer", name);
    },
  };

  const value = {
    gameState,
    setGameState,
    mode,
    setMode,
    playerName,
    setPlayerName,
    previousPlayerName,
    setPreviousPlayerName,
    hasResponded,
    setHasResponded,
    isHostAuthenticated,
    setIsHostAuthenticated,
    isEditMode,
    setIsEditMode,
    editingPlayer,
    setEditingPlayer,
    socket: socketRef.current,
    ...socketActions,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within GameProvider");
  }
  return context;
}
