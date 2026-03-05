import { Theme } from '../types';
import TopBar from '../components/TopBar';

interface RankingProps {
  isActive: boolean;
  toggleTheme: () => void;
  theme: Theme;
}

export default function Ranking({ isActive, toggleTheme, theme }: RankingProps) {
  return (
    <div className={`screen ${isActive ? 'active' : ''}`} id="ranking">
      <TopBar
        title="Ranking"
        subtitle="Competição amigável"
        onToggleTheme={toggleTheme}
        theme={theme}
      />
      <div className="ranking-content">

        <div className="ranking-header-card">
          <div className="ranking-period">🗓️ Março de 2025</div>
          <h2>Top Indicadores</h2>
          <p>Quem mais indicar amigos este mês ganha prêmio especial. Você está em 3º lugar!</p>
        </div>

        {/* Podium */}
        <div className="podium">
          {/* 2º lugar */}
          <div className="podium-item">
            <div className="podium-crown">🥈</div>
            <div className="podium-avatar silver-av">👩</div>
            <div className="podium-name">Ana P.</div>
            <div className="podium-pts" style={{ color: '#A0A0B4' }}>620</div>
            <div className="podium-bar" style={{ background: 'linear-gradient(to top,rgba(160,160,180,.15),transparent)', borderColor: 'rgba(160,160,180,.3)' }}></div>
          </div>
          {/* 1º lugar */}
          <div className="podium-item">
            <div className="podium-crown">👑</div>
            <div className="podium-avatar gold-av">😎</div>
            <div className="podium-name">Carlos S.</div>
            <div className="podium-pts">800</div>
            <div className="podium-bar"></div>
          </div>
          {/* 3º lugar */}
          <div className="podium-item">
            <div className="podium-crown">🥉</div>
            <div className="podium-avatar bronze-av">😊</div>
            <div className="podium-name">Você</div>
            <div className="podium-pts" style={{ color: '#C87832' }}>340</div>
            <div className="podium-bar" style={{ background: 'linear-gradient(to top,rgba(180,120,60,.12),transparent)', borderColor: 'rgba(180,120,60,.3)' }}></div>
          </div>
        </div>

        {/* Full list */}
        <div className="rank-list">
          <div className="rank-item">
            <div className="rank-pos">1</div>
            <div className="rank-av">😎</div>
            <div className="rank-info"><strong>Carlos Santos</strong><span>8 indicações</span></div>
            <div className="rank-pts">800<small>pontos</small></div>
          </div>
          <div className="rank-item">
            <div className="rank-pos">2</div>
            <div className="rank-av">👩</div>
            <div className="rank-info"><strong>Ana Paula</strong><span>6 indicações</span></div>
            <div className="rank-pts">620<small>pontos</small></div>
          </div>
          <div className="rank-item me">
            <div className="rank-pos">3</div>
            <div className="rank-av" style={{ background: 'var(--gold-dim)' }}>😊</div>
            <div className="rank-info"><strong>Rafael Alves <span className="you-badge">Você</span></strong><span>3 indicações · 3 matriculados</span></div>
            <div className="rank-pts">340<small>pontos</small></div>
          </div>
          <div className="rank-item">
            <div className="rank-pos">4</div>
            <div className="rank-av">👨</div>
            <div className="rank-info"><strong>Bruno Melo</strong><span>2 indicações</span></div>
            <div className="rank-pts">200<small>pontos</small></div>
          </div>
          <div className="rank-item">
            <div className="rank-pos">5</div>
            <div className="rank-av">👩‍🦱</div>
            <div className="rank-info"><strong>Júlia Ramos</strong><span>1 indicação</span></div>
            <div className="rank-pts">100<small>pontos</small></div>
          </div>
          <div className="rank-item">
            <div className="rank-pos">6</div>
            <div className="rank-av">👦</div>
            <div className="rank-info"><strong>Pedro Souza</strong><span>1 indicação</span></div>
            <div className="rank-pts">100<small>pontos</small></div>
          </div>
        </div>

        <div className="card" style={{ marginTop: '16px', textAlign: 'center' }}>
          <p style={{ fontSize: '.82rem', color: 'var(--text2)', marginBottom: '12px' }}>🏆 Prêmio do mês para o 1º lugar</p>
          <strong style={{ fontFamily: 'var(--font-d)', fontSize: '1.2rem' }}>Fim de semana para o casal em hotel</strong>
          <p style={{ fontSize: '.72rem', color: 'var(--text3)', marginTop: '6px' }}>Faltam 28 dias · Atualizado em tempo real</p>
        </div>

      </div>
    </div>
  );
}
