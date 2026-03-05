import { useState, useEffect } from 'react';
import { Screen, Theme } from './types';
import Splash from './screens/Splash';
import Home from './screens/Home';
import Indicate from './screens/Indicate';
import Referrals from './screens/Referrals';
import Ranking from './screens/Ranking';
import Badges from './screens/Badges';
import Rewards from './screens/Rewards';
import BottomNav from './components/BottomNav';
import StatusBar from './components/StatusBar';
import AdminModal from './components/AdminModal';
import Toast from './components/Toast';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [theme, setTheme] = useState<Theme>('dark');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('la-theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('la-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    showToast(newTheme === 'dark' ? '🌙 Tema escuro ativado' : '☀️ Tema claro ativado');
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const goTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  return (
    <div className="app-shell" id="app">
      <StatusBar />
      
      <div className="screens">
        <Splash isActive={currentScreen === 'splash'} onEnter={() => goTo('home')} />
        <Home isActive={currentScreen === 'home'} goTo={goTo} toggleTheme={toggleTheme} openAdmin={() => setIsAdminOpen(true)} theme={theme} />
        <Indicate isActive={currentScreen === 'indicate'} toggleTheme={toggleTheme} showToast={showToast} theme={theme} />
        <Referrals isActive={currentScreen === 'referrals'} toggleTheme={toggleTheme} theme={theme} />
        <Ranking isActive={currentScreen === 'ranking'} toggleTheme={toggleTheme} theme={theme} />
        <Badges isActive={currentScreen === 'badges'} toggleTheme={toggleTheme} theme={theme} />
        <Rewards isActive={currentScreen === 'rewards'} toggleTheme={toggleTheme} goTo={goTo} theme={theme} />
      </div>

      {currentScreen !== 'splash' && (
        <BottomNav currentScreen={currentScreen} goTo={goTo} />
      )}

      <AdminModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      <Toast message={toastMsg} />
    </div>
  );
}
