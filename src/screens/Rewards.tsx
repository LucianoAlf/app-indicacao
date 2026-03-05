import { Screen, Theme } from '../types';
import TopBar from '../components/TopBar';

interface RewardsProps {
  isActive: boolean;
  toggleTheme: () => void;
  goTo: (screen: Screen) => void;
  theme: Theme;
}

export default function Rewards({ isActive, toggleTheme, goTo, theme }: RewardsProps) {
  return (
    <div className={`screen ${isActive ? 'active' : ''}`} id="rewards">
      <TopBar
        title="Recompensas"
        subtitle="Escada de prêmios"
        onToggleTheme={toggleTheme}
        theme={theme}
      />
      <div className="rewards-content">

        <div className="my-pts-header">
          <div className="pts-circle">
            <strong>340</strong>
            <small>pontos</small>
          </div>
          <div className="pts-header-text">
            <h3>Seus Pontos</h3>
            <p>Você está na 1ª recompensa. Mais 160 pontos para o próximo prêmio!</p>
          </div>
        </div>

        {/* Ladder */}
        <div className="card" style={{ marginBottom: '20px' }}>
          <h3 style={{ fontFamily: 'var(--font-d)', fontSize: '1.1rem', marginBottom: '4px' }}>Escada de Prêmios</h3>
          <p style={{ fontSize: '.75rem', color: 'var(--text2)', marginBottom: '16px' }}>1 matrícula confirmada = 100 pontos</p>

          <div className="reward-ladder">
            {/* Desbloqueado */}
            <div className="reward-rung">
              <div className="rung-left">
                <div className="rung-num done">✓</div>
                <div className="rung-line done"></div>
              </div>
              <div className="rung-content">
                <h4>Kit LA Music Completo</h4>
                <p>Camiseta + Caderno + Adesivos oficiais da escola</p>
                <div className="rung-done-label">✨ Desbloqueado! Pronto para retirar</div>
              </div>
              <div className="rung-emoji">🎽</div>
            </div>

            {/* Ativo / próximo */}
            <div className="reward-rung">
              <div className="rung-left">
                <div className="rung-num active">→</div>
                <div className="rung-line"></div>
              </div>
              <div className="rung-content">
                <h4>Jantar para a Família</h4>
                <p>Voucher em restaurante parceiro para até 4 pessoas</p>
                <div className="rung-pts-needed">160 pontos para desbloquear</div>
              </div>
              <div className="rung-emoji">🍽️</div>
            </div>

            {/* Bloqueado */}
            <div className="reward-rung">
              <div className="rung-left">
                <div className="rung-num locked">3</div>
                <div className="rung-line"></div>
              </div>
              <div className="rung-content">
                <h4>Fim de Semana para o Casal</h4>
                <p>Hospedagem em hotel parceiro (sexta a domingo)</p>
                <div className="rung-pts-needed">360 pontos para desbloquear</div>
              </div>
              <div className="rung-emoji">🏨</div>
            </div>

            {/* Bloqueado */}
            <div className="reward-rung">
              <div className="rung-left">
                <div className="rung-num locked">4</div>
                <div className="rung-line"></div>
              </div>
              <div className="rung-content">
                <h4>Parque de Diversões em Família</h4>
                <p>Ingressos para até 4 pessoas no parque parceiro</p>
                <div className="rung-pts-needed">560 pontos para desbloquear</div>
              </div>
              <div className="rung-emoji">🎢</div>
            </div>

            {/* Bloqueado - especial */}
            <div className="reward-rung">
              <div className="rung-left">
                <div className="rung-num locked" style={{ background: 'linear-gradient(135deg,var(--gold-dim),var(--teal-dim))', borderColor: 'var(--gold-border)', color: 'var(--gold)' }}>👑</div>
              </div>
              <div className="rung-content">
                <h4>Prêmio Lenda LA Music</h4>
                <p>Experiência VIP exclusiva + mensalidade gratuita + reconhecimento especial</p>
                <div className="rung-pts-needed" style={{ color: 'var(--gold)' }}>1000 pontos · Prêmio máximo</div>
              </div>
              <div className="rung-emoji">💎</div>
            </div>
          </div>
        </div>

        <button className="btn btn-gold" onClick={() => goTo('indicate')}>
          📲 Indicar agora e ganhar pontos
        </button>

      </div>
    </div>
  );
}
