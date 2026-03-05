import React from 'react';
import { Theme } from '../types';
import TopBar from '../components/TopBar';

interface BadgesProps {
  isActive: boolean;
  toggleTheme: () => void;
  theme: Theme;
}

export default function Badges({ isActive, toggleTheme, theme }: BadgesProps) {
  return (
    <div className={`screen ${isActive ? 'active' : ''}`} id="badges">
      <TopBar
        title="Conquistas"
        subtitle="Sua jornada"
        onToggleTheme={toggleTheme}
        theme={theme}
      />
      <div className="badges-content">

        {/* Level */}
        <div className="level-card">
          <div className="level-icon">🎸</div>
          <div className="level-info">
            <h3>Músico Embaixador</h3>
            <p>Nível 3 · 3 indicações convertidas</p>
          </div>
          <div className="level-badge">Nível 3</div>
        </div>

        {/* Badge summary */}
        <div className="badge-summary">
          <div className="badge-ring" style={{ '--pct': 42 } as React.CSSProperties}>
            <div className="badge-ring-inner">5/12<small>badges</small></div>
          </div>
          <div className="badge-summary-text">
            <h3>5 conquistas desbloqueadas</h3>
            <p>Continue indicando para desbloquear todos os badges e subir de nível!</p>
          </div>
        </div>

        <div className="sec-hdr"><h2>Desbloqueadas</h2></div>
        <div className="badges-grid" style={{ marginBottom: '24px' }}>
          <div className="badge-item unlocked">
            <div className="badge-emoji">🎵</div>
            <div className="badge-name">Primeira Nota</div>
            <div className="badge-pts">+20 pts</div>
          </div>
          <div className="badge-item unlocked">
            <div className="badge-emoji">🎸</div>
            <div className="badge-name">Rock Star</div>
            <div className="badge-pts">3 indicações</div>
          </div>
          <div className="badge-item unlocked">
            <div className="badge-emoji">⭐</div>
            <div className="badge-name">Estrela LA</div>
            <div className="badge-pts">+50 bônus</div>
          </div>
          <div className="badge-item unlocked">
            <div className="badge-emoji">🤝</div>
            <div className="badge-name">Parceiro</div>
            <div className="badge-pts">1 matrícula</div>
          </div>
          <div className="badge-item unlocked">
            <div className="badge-emoji">🎯</div>
            <div className="badge-name">Certeiro</div>
            <div className="badge-pts">100% conversão</div>
          </div>
        </div>

        <div className="sec-hdr"><h2>Próximas conquistas</h2></div>
        <div className="badges-grid">
          <div className="badge-item locked">
            <div className="badge-emoji">🏅</div>
            <div className="badge-name">5 Matrículas</div>
            <div className="badge-lock">🔒</div>
          </div>
          <div className="badge-item locked">
            <div className="badge-emoji">👑</div>
            <div className="badge-name">Top Indicador</div>
            <div className="badge-lock">🔒</div>
          </div>
          <div className="badge-item locked">
            <div className="badge-emoji">💎</div>
            <div className="badge-name">Diamante LA</div>
            <div className="badge-lock">🔒</div>
          </div>
          <div className="badge-item locked">
            <div className="badge-emoji">🌟</div>
            <div className="badge-name">Lenda</div>
            <div className="badge-lock">🔒</div>
          </div>
          <div className="badge-item locked">
            <div className="badge-emoji">🚀</div>
            <div className="badge-name">10 Indicados</div>
            <div className="badge-lock">🔒</div>
          </div>
          <div className="badge-item locked">
            <div className="badge-emoji">🎼</div>
            <div className="badge-name">Maestro</div>
            <div className="badge-lock">🔒</div>
          </div>
          <div className="badge-item locked">
            <div className="badge-emoji">🌈</div>
            <div className="badge-name">Mês Perfeito</div>
            <div className="badge-lock">🔒</div>
          </div>
        </div>

      </div>
    </div>
  );
}
