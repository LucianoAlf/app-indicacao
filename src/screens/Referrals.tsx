import { useEffect, useState } from 'react';
import { Theme, Referral, ReferralStatus } from '../types';
import TopBar from '../components/TopBar';
import { useAuth } from '../lib/auth';
import { supabase } from '../lib/supabase';
import { STATUS_CONFIG, JOURNEY_STEPS, getStepState, timeAgo } from '../lib/helpers';

interface ReferralsProps {
  isActive: boolean;
  toggleTheme: () => void;
  theme: Theme;
}

const TAB_FILTER: Record<string, ReferralStatus | null> = {
  'Todos': null,
  'Matriculados \u2713': 'matriculado',
  'Aula Exp. \uD83D\uDCC5': 'aula_experimental',
  'Em Contato': 'em_contato',
  'Pendente': 'link_acessado',
};

export default function Referrals({ isActive, toggleTheme, theme }: ReferralsProps) {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState('Todos');
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);

  const tabs = Object.keys(TAB_FILTER);

  const fetchReferrals = async () => {
    if (!profile) return;
    const { data } = await supabase
      .from('referrals')
      .select('*')
      .eq('referrer_id', profile.id)
      .order('created_at', { ascending: false });
    setReferrals(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchReferrals();
  }, [profile?.id]);

  // Realtime subscription
  useEffect(() => {
    if (!profile) return;
    const channel = supabase
      .channel('my-referrals')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'referrals',
          filter: `referrer_id=eq.${profile.id}`,
        },
        () => fetchReferrals()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [profile?.id]);

  // Computed stats
  const totalReferrals = referrals.length;
  const totalMatriculados = referrals.filter(r => r.status === 'matriculado').length;
  const totalPoints = profile?.total_points ?? 0;

  // Filter by active tab
  const filterStatus = TAB_FILTER[activeTab];
  const filtered = filterStatus
    ? referrals.filter(r => r.status === filterStatus)
    : referrals;

  function renderPoints(r: Referral) {
    if (r.status === 'matriculado') {
      return <div className="ref-card-pts">+{r.points_awarded}<small>pontos</small></div>;
    }
    if (r.status === 'aula_experimental' || r.status === 'em_contato') {
      return <div className="ref-card-pts" style={{ color: 'var(--teal)' }}>~100<small>potencial</small></div>;
    }
    return <div className="ref-card-pts" style={{ color: 'var(--text3)' }}>&mdash;</div>;
  }

  function cardBorderColor(status: ReferralStatus): string | undefined {
    if (status === 'matriculado') return 'rgba(80,200,120,.25)';
    if (status === 'aula_experimental') return 'var(--teal-dim)';
    return undefined;
  }

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
            <div className="stat-num">{totalReferrals}</div>
            <div className="stat-lbl">Indicados</div>
          </div>
          <div className="stat-card">
            <div className="stat-num" style={{ color: 'var(--teal)' }}>{totalMatriculados}</div>
            <div className="stat-lbl">Matriculados</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">{totalPoints}</div>
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
          {loading ? (
            <div style={{ textAlign: 'center', padding: '32px', color: 'var(--text3)' }}>
              Carregando...
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px', color: 'var(--text3)' }}>
              Nenhuma indicação
            </div>
          ) : (
            filtered.map(r => {
              const border = cardBorderColor(r.status);
              const dateFormatted = new Date(r.created_at).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'short',
              });
              return (
                <div
                  key={r.id}
                  className="ref-card"
                  style={border ? { borderColor: border } : undefined}
                >
                  <div className="ref-card-header">
                    <div className="ref-avatar-lg">{STATUS_CONFIG[r.status].emoji}</div>
                    <div className="ref-card-info">
                      <strong>{r.referred_name}</strong>
                      <span>
                        Indicado em {dateFormatted}
                        {r.referred_instrument ? ` · ${r.referred_instrument}` : ''}
                      </span>
                    </div>
                    {renderPoints(r)}
                  </div>
                  <div className="journey">
                    {JOURNEY_STEPS.map(step => {
                      const state = getStepState(r.status, step);
                      let content: string;
                      let className: string;
                      if (state === 'done') {
                        className = 'journey-dot done';
                        content = '\u2713';
                      } else if (state === 'active') {
                        className = 'journey-dot active';
                        content = STATUS_CONFIG[step].emoji;
                      } else {
                        className = 'journey-dot locked';
                        content = '\u25CB';
                      }
                      return (
                        <div key={step} className="journey-step">
                          <div className={className}>{content}</div>
                          <span>{STATUS_CONFIG[step].label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
