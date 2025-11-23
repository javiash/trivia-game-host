import { GameProvider, useGame } from './context/GameContext';
import { ChooseMode } from './components/ChooseMode';
import { HostView } from './components/Host/HostView';
import { PlayerView } from './components/Player/PlayerView';

function AppContent() {
  const { mode, setMode } = useGame();

  if (mode === 'choose') {
    return <ChooseMode />;
  }

  if (mode === 'host') {
    return <HostView />;
  }

  if (mode === 'player') {
    return <PlayerView />;
  }

  return null;
}

function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

export default App;

