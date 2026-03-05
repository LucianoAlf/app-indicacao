import { useEffect, useState } from 'react';
import { Screen, Theme } from '../types';
import TopBar from '../components/TopBar';

interface HomeProps {
  isActive: boolean;
  goTo: (screen: Screen) => void;
  toggleTheme: () => void;
  openAdmin: () => void;
  theme: Theme;
}

export default function Home({ isActive, goTo, toggleTheme, openAdmin, theme }: HomeProps) {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (isActive) {
      let start = 0;
      const target = 340;
      const duration = 800;
      const step = target / (duration / 16);
      const timer = setInterval(() => {
        start = Math.min(start + step, target);
        setPoints(Math.floor(start));
        if (start >= target) clearInterval(timer);
      }, 16);
      return () => clearInterval(timer);
    } else {
      setPoints(0);
    }
  }, [isActive]);

  return (
    <div className={`screen ${isActive ? 'active' : ''}`} id="home">
      <TopBar
        title="LA Indica 🎸"
        subtitle="Bem-vindo de volta"
        onToggleTheme={toggleTheme}
        onOpenAdmin={openAdmin}
        theme={theme}
      />

      <div className="home-content">
        {/* Hero card */}
        <div className="home-hero">
          <p className="home-greeting">Olá, Rafael 👋</p>
          <p className="home-name">Seus Pontos LA Indica</p>
          <div className="points-display">
            <span className="points-num">{points}</span>
            <span className="points-label">pts</span>
          </div>
          <div className="progress-section">
            <div className="progress-meta">
              <span>Próxima recompensa</span>
              <strong>340 / 500 pts</strong>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '68%' }}></div>
            </div>
          </div>
          <div className="home-next-reward">
            <span className="next-reward-icon">🍽️</span>
            <div className="next-reward-text">
              <p>Você está quase lá!</p>
              <strong>Jantar para a família</strong>
            </div>
            <span style={{ fontSize: '.78rem', color: 'var(--gold)', fontWeight: 700 }}>160 pts</span>
          </div>
        </div>

        {/* Quick actions */}
        <div className="quick-actions">
          <div className="quick-card" onClick={() => goTo('indicate')}>
            <div className="quick-card-icon gold">📲</div>
            <h3>Indicar Amigo</h3>
            <p>Ganhe 100 pts por matrícula</p>
          </div>
          <div className="quick-card" onClick={() => goTo('rewards')}>
            <div className="quick-card-icon teal">🎁</div>
            <h3>Recompensas</h3>
            <p>Veja o que está te esperando</p>
          </div>
        </div>

        {/* Mini referral list */}
        <div className="sec-hdr">
          <h2>Últimas indicações</h2>
          <a onClick={() => goTo('referrals')} style={{ cursor: 'pointer' }}>Ver todas</a>
        </div>
        <div className="ref-mini-list">
          <div className="ref-mini-item">
            <div className="ref-avatar">👦</div>
            <div className="ref-info">
              <strong>Lucas Ferreira</strong>
              <span>Indicado há 3 dias</span>
            </div>
            <span className="ref-status status-enrolled">Matriculado ✓</span>
          </div>
          <div className="ref-mini-item">
            <div className="ref-avatar">👧</div>
            <div className="ref-info">
              <strong>Mariana Costa</strong>
              <span>Indicada há 6 dias</span>
            </div>
            <span className="ref-status status-trial">Aula exp.</span>
          </div>
          <div className="ref-mini-item">
            <div className="ref-avatar">👨</div>
            <div className="ref-info">
              <strong>Thiago Oliveira</strong>
              <span>Indicado há 10 dias</span>
            </div>
            <span className="ref-status status-pending">Em contato</span>
          </div>
        </div>

        {/* Ranking teaser */}
        <div className="sec-hdr" style={{ marginTop: '4px' }}>
          <h2>Ranking do mês</h2>
          <a onClick={() => goTo('ranking')} style={{ cursor: 'pointer' }}>Ver completo</a>
        </div>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
          <span style={{ fontSize: '1.8rem' }}>🥇</span>
          <div style={{ flex: 1 }}>
            <strong style={{ fontSize: '.9rem' }}>Carlos Santos</strong>
            <p style={{ fontSize: '.72rem', color: 'var(--text2)' }}>8 indicações · 800 pontos</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '.68rem', color: 'var(--text2)' }}>Sua posição</p>
            <strong style={{ fontFamily: 'var(--font-d)', fontSize: '1.2rem', color: 'var(--gold)' }}>#3</strong>
          </div>
        </div>

        {/* Conquistas teaser */}
        <div className="sec-hdr">
          <h2>Conquistas</h2>
          <a onClick={() => goTo('badges')} style={{ cursor: 'pointer' }}>Ver todas</a>
        </div>
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }}>
          <div style={{ flexShrink: 0, textAlign: 'center', background: 'var(--card)', border: '1px solid var(--gold-border)', borderRadius: '12px', padding: '12px 14px', minWidth: '80px' }}>
            <div style={{ fontSize: '1.6rem' }}>🎸</div>
            <p style={{ fontSize: '.62rem', color: 'var(--gold)', marginTop: '4px', fontWeight: 700 }}>1ª Indicação</p>
          </div>
          <div style={{ flexShrink: 0, textAlign: 'center', background: 'var(--card)', border: '1px solid var(--gold-border)', borderRadius: '12px', padding: '12px 14px', minWidth: '80px' }}>
            <div style={{ fontSize: '1.6rem' }}>⭐</div>
            <p style={{ fontSize: '.62rem', color: 'var(--gold)', marginTop: '4px', fontWeight: 700 }}>3 Indicações</p>
          </div>
          <div style={{ flexShrink: 0, textAlign: 'center', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '12px 14px', minWidth: '80px', opacity: .4 }}>
            <div style={{ fontSize: '1.6rem' }}>🔒</div>
            <p style={{ fontSize: '.62rem', color: 'var(--text3)', marginTop: '4px', fontWeight: 700 }}>5 Indicações</p>
          </div>
          <div style={{ flexShrink: 0, textAlign: 'center', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '12px 14px', minWidth: '80px', opacity: .4 }}>
            <div style={{ fontSize: '1.6rem' }}>🔒</div>
            <p style={{ fontSize: '.62rem', color: 'var(--text3)', marginTop: '4px', fontWeight: 700 }}>Top Indicador</p>
          </div>
        </div>

      </div>
    </div>
  );
}
