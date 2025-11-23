import { useGame } from '../../context/GameContext';
import { HostLogin } from './HostLogin';
import { HostDashboard } from './HostDashboard';

export function HostView() {
  const { isHostAuthenticated } = useGame();

  if (!isHostAuthenticated) {
    return <HostLogin />;
  }

  return <HostDashboard />;
}

