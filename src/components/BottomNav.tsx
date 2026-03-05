import { Screen } from '../types';
import { Home, Share2, Users, Trophy, Gift } from 'lucide-react';

interface BottomNavProps {
  currentScreen: Screen;
  goTo: (screen: Screen) => void;
}

export default function BottomNav({ currentScreen, goTo }: BottomNavProps) {
  return (
    <nav className="bottom-nav" id="bottomNav">
      <button
        className={`nav-btn ${currentScreen === 'home' ? 'active' : ''}`}
        onClick={() => goTo('home')}
      >
        <Home size={22} />
        <span className="nav-label">Início</span>
      </button>
      <button
        className={`nav-btn ${currentScreen === 'indicate' ? 'active' : ''}`}
        onClick={() => goTo('indicate')}
      >
        <Share2 size={22} />
        <span className="nav-label">Indicar</span>
      </button>
      <button
        className={`nav-btn ${currentScreen === 'referrals' ? 'active' : ''}`}
        onClick={() => goTo('referrals')}
      >
        <Users size={22} />
        <span className="nav-label">Indicados</span>
        <div className="nav-badge"></div>
      </button>
      <button
        className={`nav-btn ${currentScreen === 'ranking' ? 'active' : ''}`}
        onClick={() => goTo('ranking')}
      >
        <Trophy size={22} />
        <span className="nav-label">Ranking</span>
      </button>
      <button
        className={`nav-btn ${currentScreen === 'rewards' ? 'active' : ''}`}
        onClick={() => goTo('rewards')}
      >
        <Gift size={22} />
        <span className="nav-label">Prêmios</span>
      </button>
    </nav>
  );
}
