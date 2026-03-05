import React from 'react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminModal({ isOpen, onClose }: AdminModalProps) {
  const handleBgClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={handleBgClick}>
      <div className="modal-sheet">
        <div className="modal-handle"></div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
          <div className="modal-title">⚙️ Painel da Escola</div>
          <button className="icon-btn" onClick={onClose}>✕</button>
        </div>
        <p className="modal-sub">Dashboard admin — LA Music Campo Grande</p>

        {/* KPIs */}
        <div className="admin-kpis">
          <div className="admin-kpi">
            <div className="admin-kpi-val">37</div>
            <div className="admin-kpi-lbl">Alunos no programa</div>
            <div className="admin-kpi-delta">↑ +5 este mês</div>
          </div>
          <div className="admin-kpi">
            <div className="admin-kpi-val">28%</div>
            <div className="admin-kpi-lbl">Taxa de adesão</div>
            <div className="admin-kpi-delta">↑ Meta: 15% ✓</div>
          </div>
          <div className="admin-kpi">
            <div className="admin-kpi-val">42</div>
            <div className="admin-kpi-lbl">Indicações recebidas</div>
            <div className="admin-kpi-delta">↑ +12 este mês</div>
          </div>
          <div className="admin-kpi">
            <div className="admin-kpi-val">40%</div>
            <div className="admin-kpi-lbl">Taxa de conversão</div>
            <div className="admin-kpi-delta">17 matriculados</div>
          </div>
        </div>

        <div className="sec-hdr" style={{ marginBottom: '12px' }}>
          <h2>Recompensas a entregar</h2>
          <span className="pill-tag">3 pendentes</span>
        </div>
        <div className="admin-list" style={{ marginBottom: '20px' }}>
          <div className="admin-list-item">
            <span style={{ fontSize: '1.2rem' }}>🎽</span>
            <div style={{ flex: 1 }}>
              <strong>Rafael Alves</strong>
              <span style={{ display: 'block', fontSize: '.7rem', color: 'var(--text2)' }}>Kit LA Music · 100 pts</span>
            </div>
            <button className="admin-action">Entregar</button>
          </div>
          <div className="admin-list-item">
            <span style={{ fontSize: '1.2rem' }}>🍽️</span>
            <div style={{ flex: 1 }}>
              <strong>Ana Paula</strong>
              <span style={{ display: 'block', fontSize: '.7rem', color: 'var(--text2)' }}>Jantar família · 500 pts</span>
            </div>
            <button className="admin-action">Entregar</button>
          </div>
          <div className="admin-list-item">
            <span style={{ fontSize: '1.2rem' }}>🎽</span>
            <div style={{ flex: 1 }}>
              <strong>Bruno Melo</strong>
              <span style={{ display: 'block', fontSize: '.7rem', color: 'var(--text2)' }}>Kit LA Music · 100 pts</span>
            </div>
            <button className="admin-action">Entregar</button>
          </div>
        </div>

        <div className="sec-hdr" style={{ marginBottom: '12px' }}>
          <h2>Indicações recentes</h2>
        </div>
        <div className="admin-list" style={{ marginBottom: '20px' }}>
          <div className="admin-list-item">
            <div className="rank-av">👦</div>
            <div style={{ flex: 1 }}>
              <strong style={{ fontSize: '.88rem' }}>Lucas Ferreira</strong>
              <span style={{ display: 'block', fontSize: '.7rem', color: '#50C878' }}>Matriculado ✓</span>
            </div>
            <span style={{ fontSize: '.72rem', color: 'var(--text2)' }}>por Rafael</span>
          </div>
          <div className="admin-list-item">
            <div className="rank-av">👧</div>
            <div style={{ flex: 1 }}>
              <strong style={{ fontSize: '.88rem' }}>Mariana Costa</strong>
              <span style={{ display: 'block', fontSize: '.7rem', color: 'var(--teal)' }}>Aula experimental</span>
            </div>
            <span style={{ fontSize: '.72rem', color: 'var(--text2)' }}>por Rafael</span>
          </div>
          <div className="admin-list-item">
            <div className="rank-av">👨</div>
            <div style={{ flex: 1 }}>
              <strong style={{ fontSize: '.88rem' }}>Thiago Oliveira</strong>
              <span style={{ display: 'block', fontSize: '.7rem', color: 'var(--gold)' }}>Em contato</span>
            </div>
            <span style={{ fontSize: '.72rem', color: 'var(--text2)' }}>por Rafael</span>
          </div>
        </div>

        <button className="btn btn-gold" onClick={onClose}>Fechar painel</button>
      </div>
    </div>
  );
}
