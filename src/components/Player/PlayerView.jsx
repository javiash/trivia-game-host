import { useGame } from '../../context/GameContext';
import { NameInput } from './NameInput';
import { PlayerDashboard } from './PlayerDashboard';

export function PlayerView() {
  const { playerName } = useGame();

  if (!playerName) {
    return <NameInput />;
  }

  return <PlayerDashboard />;
}

