# 🎉 Trivia de Cumpleaños

Aplicación de trivia en tiempo real para cumpleaños con WebSockets, construida con React y Vite.

## 🚀 Características

- **Modo Anfitrión**: Controla el juego, inicia preguntas, valida respuestas y gestiona jugadores
- **Modo Jugador**: Participa en el juego, responde preguntas y ve tu puntuación en tiempo real
- **Tiempo Real**: Sincronización instantánea entre todos los participantes usando Socket.IO
- **Gestión de Jugadores**: El anfitrión puede editar nombres y puntuaciones de los jugadores
- **Ranking**: Tabla de puntuaciones en tiempo real
- **Interfaz Moderna**: Diseño atractivo con Tailwind CSS

## 📋 Requisitos Previos

- Node.js 16+ y npm

## 🛠️ Instalación

1. Clona o descarga el repositorio
2. Instala las dependencias:

```bash
npm install
```

## 🚀 Uso

### Desarrollo

Para ejecutar en modo desarrollo (con hot-reload):

```bash
# Terminal 1: Inicia el servidor backend
npm start

# Terminal 2: Inicia el servidor de desarrollo de Vite
npm run dev
```

Luego abre tu navegador en `http://localhost:5173`

### Producción

Para construir la aplicación para producción:

```bash
npm run build
```

Esto generará los archivos optimizados en la carpeta `dist/`. Luego inicia el servidor:

```bash
npm start
```

El servidor servirá automáticamente los archivos de producción desde `dist/` si existe.

## 📁 Estructura del Proyecto

```
trivia-cumpleanos/
├── src/
│   ├── components/          # Componentes React
│   │   ├── ChooseMode.jsx   # Pantalla de selección de modo
│   │   ├── Host/            # Componentes del anfitrión
│   │   │   ├── HostView.jsx
│   │   │   ├── HostDashboard.jsx
│   │   │   ├── HostLogin.jsx
│   │   │   ├── QuestionPanel.jsx
│   │   │   ├── PlayersList.jsx
│   │   │   └── Ranking.jsx
│   │   └── Player/          # Componentes del jugador
│   │       ├── PlayerView.jsx
│   │       ├── PlayerDashboard.jsx
│   │       └── NameInput.jsx
│   ├── context/
│   │   └── GameContext.jsx  # Context API para estado global
│   ├── App.jsx              # Componente principal
│   ├── main.jsx             # Punto de entrada
│   └── index.css             # Estilos globales
├── server.js                 # Servidor Express + Socket.IO
├── package.json
├── vite.config.js            # Configuración de Vite
└── tailwind.config.js        # Configuración de Tailwind
```

## 🎮 Cómo Jugar

1. **Iniciar el Servidor**: Ejecuta `npm start` para iniciar el servidor backend
2. **Iniciar el Cliente**: Ejecuta `npm run dev` para iniciar Vite
3. **Acceso del Anfitrión**: 
   - Selecciona "Soy el Anfitrión"
   - Ingresa la contraseña: `Marco`
4. **Acceso de Jugadores**:
   - Selecciona "Soy un Jugador"
   - Ingresa tu nombre
5. **Jugar**:
   - El anfitrión inicia preguntas
   - Los jugadores presionan "RESPONDER" cuando saben la respuesta
   - El anfitrión valida las respuestas en orden
   - Los puntos se asignan automáticamente

## 🔧 Tecnologías Utilizadas

- **React 18**: Biblioteca de UI
- **Vite**: Build tool y dev server
- **Socket.IO**: Comunicación en tiempo real
- **Express**: Servidor backend
- **Tailwind CSS**: Framework de estilos
- **Node.js**: Runtime de JavaScript

## 📝 Scripts Disponibles

- `npm start`: Inicia el servidor backend (puerto 3000)
- `npm run dev`: Inicia Vite dev server (puerto 5173)
- `npm run build`: Construye la aplicación para producción
- `npm run preview`: Previsualiza la build de producción

## 🌐 Acceso desde Otros Dispositivos

Para acceder desde otros dispositivos en la misma red:

1. Encuentra tu IP local:
   - Windows: `ipconfig` (busca IPv4)
   - Mac/Linux: `ifconfig` o `ip addr`
2. Accede desde otro dispositivo usando: `http://TU_IP:5173`

## 🔐 Contraseña del Anfitrión

La contraseña por defecto es: `Marco`

Puedes cambiarla editando `src/components/Host/HostLogin.jsx`

## 🚀 Deploy en Render.com

Para deployar en Render.com, consulta la [Guía de Deploy](./DEPLOY.md).

**Resumen rápido:**
1. Sube tu código a GitHub/GitLab/Bitbucket
2. Crea un Web Service en Render.com
3. Configura:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Environment: `NODE_ENV=production`
4. ¡Listo! Tu app estará en línea

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso personal.

