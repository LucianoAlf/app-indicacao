import { useEffect, useState } from 'react';
import { Screen, Theme, Referral, RankingLive, Badge, UserBadge, Reward } from '../types';
import TopBar from '../components/TopBar';
import { useAuth } from '../lib/auth';
import { supabase } from '../lib/supabase';
import { STATUS_CONFIG, timeAgo } from '../lib/helpers';

interface HomeProps {
  isActive: boolean;
  goTo: (screen: Screen) => void;
  toggleTheme: () => void;
  openAdmin: (() => void) | undefined;
  theme: Theme;
}

export default function Home({ isActive, goTo, toggleTheme, openAdmin, theme }: HomeProps) {
  const { profile } = useAuth();
  const [points, setPoints] = useState(0);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [topRanker, setTopRanker] = useState<RankingLive | null>(null);
  const [myRank, setMyRank] = useState<number | null>(null);
  const [badges, setBadges] = useState<(UserBadge & { badge: Badge })[]>([]);
  const [nextReward, setNextReward] = useState<Reward | null>(null);

  // Animate points
  useEffect(() => {
    if (isActive && profile) {
      let start = 0;
      const target = profile.total_points;
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
  }, [isActive, profile?.total_points]);

  // Fetch data when screen becomes active
  useEffect(() => {
    if (!isActive || !profile) return;

    // Fetch recent 3 referrals
    supabase
      .from('referrals')
      .select('*')
      .eq('referrer_id', profile.id)
      .order('created_at', { ascending: false })
      .limit(3)
      .then(({ data }) => {
        if (data) setReferrals(data);
      });

    // Fetch ranking: top 1 and my position
    supabase
      .from('ranking_live')
      .select('*')
      .eq('school_id', profile.school_id)
      .order('rank_position', { ascending: true })
      .limit(1)
      .then(({ data }) => {
        if (data && data.length > 0) setTopRanker(data[0]);
      });

    supabase
      .from('ranking_live')
      .select('rank_position')
      .eq('school_id', profile.school_id)
      .eq('profile_id', profile.id)
      .single()
      .then(({ data }) => {
        if (data) setMyRank(data.rank_position);
      });

    // Fetch badges (user_badges joined with badges)
    supabase
      .from('user_badges')
      .select('*, badge:badges(*)')
      .eq('profile_id', profile.id)
      .then(({ data }) => {
        if (data) setBadges(data as any);
      });

    // Fetch next reward
    supabase
      .from('rewards')
      .select('*')
      .eq('school_id', profile.school_id)
      .gt('points_required', profile.total_points)
      .order('points_required', { ascending: true })
      .limit(1)
      .then(({ data }) => {
        if (data && data.length > 0) setNextReward(data[0]);
      });
  }, [isActive, profile?.id]);

  const firstName = profile?.full_name?.split(' ')[0] ?? '';
  const totalPoints = profile?.total_points ?? 0;
  const nextRewardPoints = nextReward?.points_required ?? totalPoints;
  const remaining = nextRewardPoints - totalPoints;
  const progressPct = nextRewardPoints > 0 ? Math.min((totalPoints / nextRewardPoints) * 100, 100) : 0;

  const AVATAR_EMOJIS = ['👦', '👧', '👨', '👩', '🧑', '👤'];
  const getAvatar = (index: number) => AVATAR_EMOJIS[index % AVATAR_EMOJIS.length];

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
          <p className="home-greeting">Olá, {firstName} 👋</p>
          <p className="home-name">Seus Pontos LA Indica</p>
          <div className="points-display">
            <span className="points-num">{points}</span>
            <span className="points-label">pts</span>
          </div>
          <div className="progress-section">
            <div className="progress-meta">
              <span>Próxima recompensa</span>
              <strong>{totalPoints} / {nextRewardPoints} pts</strong>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progressPct}%` }}></div>
            </div>
          </div>
          <div className="home-next-reward">
            <span className="next-reward-icon">{nextReward?.emoji ?? '🎁'}</span>
            <div className="next-reward-text">
              <p>Você está quase lá!</p>
              <strong>{nextReward?.name ?? 'Continue indicando!'}</strong>
            </div>
            <span style={{ fontSize: '.78rem', color: 'var(--gold)', fontWeight: 700 }}>{remaining} pts</span>
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
          {referrals.length === 0 && (
            <div className="ref-mini-item">
              <div className="ref-avatar">📲</div>
              <div className="ref-info">
                <strong>Nenhuma indicação ainda</strong>
                <span>Indique amigos e acompanhe aqui</span>
              </div>
            </div>
          )}
          {referrals.map((ref, i) => {
            const cfg = STATUS_CONFIG[ref.status];
            return (
              <div className="ref-mini-item" key={ref.id}>
                <div className="ref-avatar">{getAvatar(i)}</div>
                <div className="ref-info">
                  <strong>{ref.referred_name}</strong>
                  <span>Indicado {timeAgo(ref.created_at)}</span>
                </div>
                <span className={`ref-status ${cfg.className}`}>{cfg.label}</span>
              </div>
            );
          })}
        </div>

        {/* Ranking teaser */}
        <div className="sec-hdr" style={{ marginTop: '4px' }}>
          <h2>Ranking do mês</h2>
          <a onClick={() => goTo('ranking')} style={{ cursor: 'pointer' }}>Ver completo</a>
        </div>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
          <span style={{ fontSize: '1.8rem' }}>🥇</span>
          <div style={{ flex: 1 }}>
            <strong style={{ fontSize: '.9rem' }}>{topRanker?.full_name ?? '—'}</strong>
            <p style={{ fontSize: '.72rem', color: 'var(--text2)' }}>{topRanker?.converted_this_month ?? 0} indicações · {topRanker?.points_this_month ?? 0} pontos</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '.68rem', color: 'var(--text2)' }}>Sua posição</p>
            <strong style={{ fontFamily: 'var(--font-d)', fontSize: '1.2rem', color: 'var(--gold)' }}>#{myRank ?? '—'}</strong>
          </div>
        </div>

        {/* Conquistas teaser */}
        <div className="sec-hdr">
          <h2>Conquistas</h2>
          <a onClick={() => goTo('badges')} style={{ cursor: 'pointer' }}>Ver todas</a>
        </div>
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }}>
          {badges.map((ub) => (
            <div key={ub.id} style={{ flexShrink: 0, textAlign: 'center', background: 'var(--card)', border: '1px solid var(--gold-border)', borderRadius: '12px', padding: '12px 14px', minWidth: '80px' }}>
              <div style={{ fontSize: '1.6rem' }}>{ub.badge.emoji}</div>
              <p style={{ fontSize: '.62rem', color: 'var(--gold)', marginTop: '4px', fontWeight: 700 }}>{ub.badge.name}</p>
            </div>
          ))}
          {badges.length === 0 && (
            <div style={{ flexShrink: 0, textAlign: 'center', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '12px 14px', minWidth: '80px', opacity: .4 }}>
              <div style={{ fontSize: '1.6rem' }}>🔒</div>
              <p style={{ fontSize: '.62rem', color: 'var(--text3)', marginTop: '4px', fontWeight: 700 }}>Indique para desbloquear</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
