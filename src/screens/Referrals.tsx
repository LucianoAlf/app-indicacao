import { useState } from 'react';
import { Theme } from '../types';
import TopBar from '../components/TopBar';

interface ReferralsProps {
  isActive: boolean;
  toggleTheme: () => void;
  theme: Theme;
}

export default function Referrals({ isActive, toggleTheme, theme }: ReferralsProps) {
  const [activeTab, setActiveTab] = useState('Todos');

  const tabs = ['Todos', 'Matriculados ✓', 'Aula Exp. 📅', 'Em Contato', 'Pendente'];

  return (
    <div className={`screen ${isActive ? 'active' : ''}`} id="referrals">
      <TopBar
        title="Meus Indicados"
        subtitle="Acompanhe tudo"
        onToggleTheme={toggleTheme}
        theme={theme}
      />
      <div className="referrals-content">

        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-num">7</div>
            <div className="stat-lbl">Indicados</div>
          </div>
          <div className="stat-card">
            <div className="stat-num" style={{ color: 'var(--teal)' }}>3</div>
            <div className="stat-lbl">Matriculados</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">340</div>
            <div className="stat-lbl">Pontos</div>
          </div>
        </div>

        <div className="filter-tabs">
          {tabs.map(tab => (
            <div
              key={tab}
              className={`filter-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>

        <div className="ref-list">
          {/* Indicado 1 - Matriculado */}
          <div className="ref-card" style={{ borderColor: 'rgba(80,200,120,.25)' }}>
            <div className="ref-card-header">
              <div className="ref-avatar-lg">👦</div>
              <div className="ref-card-info">
                <strong>Lucas Ferreira</strong>
                <span>Indicado em 28 Fev · Guitarra</span>
              </div>
              <div className="ref-card-pts">+100<small>pontos</small></div>
            </div>
            <div className="journey">
              <div className="journey-step">
                <div className="journey-dot done">✓</div>
                <span>Link acessado</span>
              </div>
              <div className="journey-step">
                <div className="journey-dot done">✓</div>
                <span>Contato escola</span>
              </div>
              <div className="journey-step">
                <div className="journey-dot done">✓</div>
                <span>Aula exp.</span>
              </div>
              <div className="journey-step">
                <div className="journey-dot done">✓</div>
                <span>Matriculado</span>
              </div>
            </div>
          </div>

          {/* Indicado 2 - Aula experimental */}
          <div className="ref-card" style={{ borderColor: 'var(--teal-dim)' }}>
            <div className="ref-card-header">
              <div className="ref-avatar-lg">👧</div>
              <div className="ref-card-info">
                <strong>Mariana Costa</strong>
                <span>Indicada em 25 Fev · Canto</span>
              </div>
              <div className="ref-card-pts" style={{ color: 'var(--teal)' }}>~100<small>potencial</small></div>
            </div>
            <div className="journey">
              <div className="journey-step">
                <div className="journey-dot done">✓</div>
                <span>Link acessado</span>
              </div>
              <div className="journey-step">
                <div className="journey-dot done">✓</div>
                <span>Contato escola</span>
              </div>
              <div className="journey-step">
                <div className="journey-dot active">📅</div>
                <span>Aula exp.</span>
              </div>
              <div className="journey-step">
                <div className="journey-dot locked">○</div>
                <span>Matriculado</span>
              </div>
            </div>
          </div>

          {/* Indicado 3 - Em contato */}
          <div className="ref-card">
            <div className="ref-card-header">
              <div className="ref-avatar-lg">👨</div>
              <div className="ref-card-info">
                <strong>Thiago Oliveira</strong>
                <span>Indicado em 22 Fev · Bateria</span>
              </div>
              <div className="ref-card-pts" style={{ color: 'var(--text3)' }}>—</div>
            </div>
            <div className="journey">
              <div className="journey-step">
                <div className="journey-dot done">✓</div>
                <span>Link acessado</span>
              </div>
              <div className="journey-step">
                <div className="journey-dot active">💬</div>
                <span>Contato escola</span>
              </div>
              <div className="journey-step">
                <div className="journey-dot locked">○</div>
                <span>Aula exp.</span>
              </div>
              <div className="journey-step">
                <div className="journey-dot locked">○</div>
                <span>Matriculado</span>
              </div>
            </div>
          </div>

          {/* Indicado 4 - Matriculado */}
          <div className="ref-card" style={{ borderColor: 'rgba(80,200,120,.25)' }}>
            <div className="ref-card-header">
              <div className="ref-avatar-lg">👩</div>
              <div className="ref-card-info">
                <strong>Fernanda Lima</strong>
                <span>Indicada em 10 Fev · Piano</span>
              </div>
              <div className="ref-card-pts">+100<small>pontos</small></div>
            </div>
            <div className="journey">
              <div className="journey-step"><div className="journey-dot done">✓</div><span>Link acessado</span></div>
              <div className="journey-step"><div className="journey-dot done">✓</div><span>Contato escola</span></div>
              <div className="journey-step"><div className="journey-dot done">✓</div><span>Aula exp.</span></div>
              <div className="journey-step"><div className="journey-dot done">✓</div><span>Matriculado</span></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
