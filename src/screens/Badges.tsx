import React, { useEffect, useState } from 'react';
import { Theme, Badge, UserBadge } from '../types';
import TopBar from '../components/TopBar';
import { useAuth } from '../lib/auth';
import { supabase } from '../lib/supabase';
import { LEVEL_NAMES } from '../lib/helpers';

interface BadgesProps {
  isActive: boolean;
  toggleTheme: () => void;
  theme: Theme;
}

export default function Badges({ isActive, toggleTheme, theme }: BadgesProps) {
  const { profile } = useAuth();
  const [allBadges, setAllBadges] = useState<Badge[]>([]);
  const [userBadgeIds, setUserBadgeIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile) return;

    const fetchData = async () => {
      setLoading(true);

      const [badgesRes, userBadgesRes] = await Promise.all([
        supabase
          .from('badges')
          .select('*')
          .eq('active', true)
          .order('sort_order'),
        supabase
          .from('user_badges')
          .select('badge_id')
          .eq('profile_id', profile.id),
      ]);

      if (badgesRes.data) setAllBadges(badgesRes.data);
      if (userBadgesRes.data) {
        setUserBadgeIds(new Set(userBadgesRes.data.map((ub: Pick<UserBadge, 'badge_id'>) => ub.badge_id)));
      }

      setLoading(false);
    };

    fetchData();
  }, [profile]);

  const unlockedBadges = allBadges.filter(b => userBadgeIds.has(b.id));
  const lockedBadges = allBadges.filter(b => !userBadgeIds.has(b.id));
  const pct = allBadges.length > 0 ? Math.round(unlockedBadges.length / allBadges.length * 100) : 0;

  const levelInfo = profile ? LEVEL_NAMES[profile.current_level] : null;

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
        {profile && levelInfo && (
          <div className="level-card">
            <div className="level-icon">{levelInfo.emoji}</div>
            <div className="level-info">
              <h3>{levelInfo.name}</h3>
              <p>Nível {levelInfo.level} · {profile.converted_count} indicações convertidas</p>
            </div>
            <div className="level-badge">Nível {levelInfo.level}</div>
          </div>
        )}

        {/* Badge summary */}
        <div className="badge-summary">
          <div className="badge-ring" style={{ '--pct': pct } as React.CSSProperties}>
            <div className="badge-ring-inner">{unlockedBadges.length}/{allBadges.length}<small>badges</small></div>
          </div>
          <div className="badge-summary-text">
            <h3>{unlockedBadges.length} conquistas desbloqueadas</h3>
            <p>Continue indicando para desbloquear todos os badges e subir de nível!</p>
          </div>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--text2)', padding: '20px' }}>Carregando conquistas...</p>
        ) : allBadges.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text2)', padding: '20px' }}>Nenhum badge disponível ainda.</p>
        ) : (
          <>
            <div className="sec-hdr"><h2>Desbloqueadas</h2></div>
            <div className="badges-grid" style={{ marginBottom: '24px' }}>
              {unlockedBadges.length === 0 ? (
                <p style={{ color: 'var(--text2)', fontSize: '.85rem', padding: '8px 0' }}>Nenhuma conquista desbloqueada ainda. Indique amigos para começar!</p>
              ) : (
                unlockedBadges.map(badge => (
                  <div className="badge-item unlocked" key={badge.id}>
                    <div className="badge-emoji">{badge.emoji}</div>
                    <div className="badge-name">{badge.name}</div>
                    <div className="badge-pts">{badge.description}</div>
                  </div>
                ))
              )}
            </div>

            <div className="sec-hdr"><h2>Próximas conquistas</h2></div>
            <div className="badges-grid">
              {lockedBadges.length === 0 ? (
                <p style={{ color: 'var(--text2)', fontSize: '.85rem', padding: '8px 0' }}>Você desbloqueou todos os badges! Parabéns!</p>
              ) : (
                lockedBadges.map(badge => (
                  <div className="badge-item locked" key={badge.id}>
                    <div className="badge-emoji">{badge.emoji}</div>
                    <div className="badge-name">{badge.name}</div>
                    <div className="badge-lock">{'\ud83d\udd12'}</div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
}
