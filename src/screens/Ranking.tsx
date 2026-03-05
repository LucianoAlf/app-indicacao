import { useEffect, useState } from 'react';
import { Theme, RankingLive } from '../types';
import TopBar from '../components/TopBar';
import { useAuth } from '../lib/auth';
import { supabase } from '../lib/supabase';
import { currentPeriodLabel } from '../lib/helpers';

interface RankingProps {
  isActive: boolean;
  toggleTheme: () => void;
  theme: Theme;
}

function shortName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length <= 1) return fullName;
  return `${parts[0]} ${parts[parts.length - 1][0]}.`;
}

const PODIUM_STYLES = {
  gold: {},
  silver: { color: '#A0A0B4' },
  bronze: { color: '#C87832' },
};

const PODIUM_BAR_STYLES = {
  gold: {},
  silver: { background: 'linear-gradient(to top,rgba(160,160,180,.15),transparent)', borderColor: 'rgba(160,160,180,.3)' },
  bronze: { background: 'linear-gradient(to top,rgba(180,120,60,.12),transparent)', borderColor: 'rgba(180,120,60,.3)' },
};

const PODIUM_CROWN = ['👑', '🥈', '🥉'];
const PODIUM_AV_CLASS = ['gold-av', 'silver-av', 'bronze-av'];
const PODIUM_METAL: Array<'gold' | 'silver' | 'bronze'> = ['gold', 'silver', 'bronze'];

export default function Ranking({ isActive, toggleTheme, theme }: RankingProps) {
  const { profile } = useAuth();
  const [rankings, setRankings] = useState<RankingLive[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRankings = async () => {
    if (!profile) return;
    const { data } = await supabase
      .from('ranking_live')
      .select('*')
      .eq('school_id', profile.school_id)
      .order('rank_position', { ascending: true });
    setRankings(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchRankings();
  }, [profile?.id]);

  const myRank = rankings.find(r => r.profile_id === profile?.id);
  const myPosition = myRank?.rank_position;

  // Podium: top 3, displayed in order: 2nd, 1st, 3rd
  const top3 = rankings.slice(0, 3);
  const podiumOrder = top3.length >= 3
    ? [top3[1], top3[0], top3[2]]
    : top3;
  const podiumMetalOrder: Array<'gold' | 'silver' | 'bronze'> = top3.length >= 3
    ? ['silver', 'gold', 'bronze']
    : PODIUM_METAL.slice(0, top3.length);

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
          <div className="ranking-period">{'\uD83D\uDCC5\uFE0F'} {currentPeriodLabel()}</div>
          <h2>Top Indicadores</h2>
          <p>
            Quem mais indicar amigos este mês ganha prêmio especial.
            {myPosition
              ? ` Você está em ${myPosition}º lugar!`
              : ''}
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '32px', color: 'var(--text3)' }}>
            Carregando...
          </div>
        ) : rankings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '32px', color: 'var(--text3)' }}>
            Nenhum participante ainda
          </div>
        ) : (
          <>
            {/* Podium */}
            <div className="podium">
              {podiumOrder.map((r, i) => {
                const metal = podiumMetalOrder[i];
                const isMe = r.profile_id === profile?.id;
                return (
                  <div key={r.profile_id} className="podium-item">
                    <div className="podium-crown">{PODIUM_CROWN[PODIUM_METAL.indexOf(metal)]}</div>
                    <div className={`podium-avatar ${PODIUM_AV_CLASS[PODIUM_METAL.indexOf(metal)]}`}>
                      {r.avatar_emoji}
                    </div>
                    <div className="podium-name">{isMe ? 'Você' : shortName(r.full_name)}</div>
                    <div className="podium-pts" style={PODIUM_STYLES[metal]}>{r.total_points}</div>
                    <div className="podium-bar" style={PODIUM_BAR_STYLES[metal]}></div>
                  </div>
                );
              })}
            </div>

            {/* Full list */}
            <div className="rank-list">
              {rankings.map(r => {
                const isMe = r.profile_id === profile?.id;
                return (
                  <div key={r.profile_id} className={`rank-item${isMe ? ' me' : ''}`}>
                    <div className="rank-pos">{r.rank_position}</div>
                    <div className="rank-av" style={isMe ? { background: 'var(--gold-dim)' } : undefined}>
                      {r.avatar_emoji}
                    </div>
                    <div className="rank-info">
                      <strong>
                        {r.full_name}
                        {isMe && <span className="you-badge"> Você</span>}
                      </strong>
                      <span>
                        {r.referrals_this_month} indicaç{r.referrals_this_month === 1 ? 'ão' : 'ões'}
                        {isMe && r.converted_this_month > 0
                          ? ` · ${r.converted_this_month} matriculado${r.converted_this_month === 1 ? '' : 's'}`
                          : ''}
                      </span>
                    </div>
                    <div className="rank-pts">{r.total_points}<small>pontos</small></div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        <div className="card" style={{ marginTop: '16px', textAlign: 'center' }}>
          <p style={{ fontSize: '.82rem', color: 'var(--text2)', marginBottom: '12px' }}>{'\uD83C\uDFC6'} Prêmio do mês para o 1º lugar</p>
          <strong style={{ fontFamily: 'var(--font-d)', fontSize: '1.2rem' }}>Fim de semana para o casal em hotel</strong>
          <p style={{ fontSize: '.72rem', color: 'var(--text3)', marginTop: '6px' }}>Atualizado em tempo real</p>
        </div>

      </div>
    </div>
  );
}
