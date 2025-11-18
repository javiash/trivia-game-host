const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let gameState = {
  currentQuestion: '',
  isQuestionActive: false,
  responses: [],
  scores: {},
  questionNumber: 0,
  players: new Set(),
  currentTurnIndex: 0
};

io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id);
  
  // Enviar estado actual al nuevo cliente
  socket.emit('gameState', {
    ...gameState,
    players: Array.from(gameState.players)
  });
  
  // Registrar jugador
  socket.on('registerPlayer', (name) => {
    gameState.players.add(name);
    if (!gameState.scores[name]) {
      gameState.scores[name] = 0;
    }
    io.emit('gameState', {
      ...gameState,
      players: Array.from(gameState.players)
    });
    console.log('Jugador registrado:', name);
  });
  
  // Iniciar pregunta
  socket.on('startQuestion', (question) => {
    gameState.questionNumber++;
    gameState.currentQuestion = question;
    gameState.isQuestionActive = true;
    gameState.responses = [];
    gameState.currentTurnIndex = 0;
    
    io.emit('gameState', {
      ...gameState,
      players: Array.from(gameState.players)
    });
    console.log('Nueva pregunta:', question);
  });
  
  // Respuesta de jugador
  socket.on('playerResponse', (data) => {
    if (!gameState.isQuestionActive) return;
    
    // Verificar que no haya respondido ya
    const alreadyResponded = gameState.responses.find(r => r.name === data.name);
    if (alreadyResponded) return;
    
    const response = {
      name: data.name,
      timestamp: Date.now(),
      status: 'waiting' // waiting, correct, incorrect
    };
    
    gameState.responses.push(response);
    gameState.responses.sort((a, b) => a.timestamp - b.timestamp);
    
    io.emit('gameState', {
      ...gameState,
      players: Array.from(gameState.players)
    });
    console.log('Respuesta de:', data.name);
  });
  
  // Marcar respuesta como correcta
  socket.on('markCorrect', (data) => {
    const response = gameState.responses.find(r => r.name === data.name);
    if (response) {
      response.status = 'correct';
      const points = data.points || 1;
      gameState.scores[data.name] = (gameState.scores[data.name] || 0) + points;
      
      // Cerrar pregunta automáticamente
      gameState.isQuestionActive = false;
      gameState.currentTurnIndex = 0;
      
      io.emit('gameState', {
        ...gameState,
        players: Array.from(gameState.players)
      });
      console.log('Respuesta correcta:', data.name, '+', points, 'pts');
    }
  });
  
  // Marcar respuesta como incorrecta
  socket.on('markIncorrect', (name) => {
    const response = gameState.responses.find(r => r.name === name);
    if (response) {
      response.status = 'incorrect';
      gameState.currentTurnIndex++;
      
      io.emit('gameState', {
        ...gameState,
        players: Array.from(gameState.players)
      });
      console.log('Respuesta incorrecta:', name);
    }
  });
  
  // Cerrar pregunta
  socket.on('endQuestion', () => {
    gameState.isQuestionActive = false;
    gameState.currentTurnIndex = 0;
    
    io.emit('gameState', {
      ...gameState,
      players: Array.from(gameState.players)
    });
    console.log('Pregunta cerrada');
  });
  
  // Reiniciar juego
  socket.on('resetGame', () => {
    const players = gameState.players;
    gameState = {
      currentQuestion: '',
      isQuestionActive: false,
      responses: [],
      scores: {},
      questionNumber: 0,
      players: players,
      currentTurnIndex: 0
    };
    
    // Reiniciar puntos de jugadores existentes
    Array.from(players).forEach(player => {
      gameState.scores[player] = 0;
    });
    
    io.emit('gameState', {
      ...gameState,
      players: Array.from(gameState.players)
    });
    console.log('Juego reiniciado');
  });
  
  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔════════════════════════════════════════╗
║   🎉 SERVIDOR DE TRIVIA INICIADO 🎉   ║
╚════════════════════════════════════════╝

Puerto: ${PORT}

Para conectarse desde otros dispositivos:
1. Asegúrate de estar en la misma red WiFi
2. Encuentra tu IP local:
   - Windows: ipconfig (busca IPv4)
   - Mac/Linux: ifconfig o ip addr
   
3. Abre en el navegador:
   http://TU_IP:${PORT}
   
Ejemplo: http://192.168.1.100:${PORT}

Presiona Ctrl+C para detener el servidor
  `);
});