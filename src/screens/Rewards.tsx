import { useEffect, useState } from 'react';
import { Screen, Theme, Reward } from '../types';
import TopBar from '../components/TopBar';
import { useAuth } from '../lib/auth';
import { supabase } from '../lib/supabase';

interface RewardsProps {
  isActive: boolean;
  toggleTheme: () => void;
  goTo: (screen: Screen) => void;
  theme: Theme;
}

export default function Rewards({ isActive, toggleTheme, goTo, theme }: RewardsProps) {
  const { profile } = useAuth();
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile) return;

    const fetchRewards = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('rewards')
        .select('*')
        .eq('school_id', profile.school_id)
        .eq('active', true)
        .order('tier');

      if (data) setRewards(data);
      setLoading(false);
    };

    fetchRewards();
  }, [profile]);

  const totalPoints = profile?.total_points ?? 0;

  // Compute next reward info
  const nextReward = rewards.find(r => totalPoints < r.points_required);
  const currentRewardIndex = nextReward
    ? rewards.indexOf(nextReward) - 1
    : rewards.length - 1;
  const pointsToNext = nextReward
    ? nextReward.points_required - totalPoints
    : 0;
  const currentRewardLabel = currentRewardIndex >= 0
    ? `${currentRewardIndex + 1}ª recompensa`
    : 'nenhuma recompensa ainda';
  const nextRewardText = nextReward
    ? `Mais ${pointsToNext} pontos para o próximo prêmio!`
    : 'Você alcançou todas as recompensas!';

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
            <strong>{totalPoints}</strong>
            <small>pontos</small>
          </div>
          <div className="pts-header-text">
            <h3>Seus Pontos</h3>
            <p>Você está na {currentRewardLabel}. {nextRewardText}</p>
          </div>
        </div>

        {/* Ladder */}
        <div className="card" style={{ marginBottom: '20px' }}>
          <h3 style={{ fontFamily: 'var(--font-d)', fontSize: '1.1rem', marginBottom: '4px' }}>Escada de Prêmios</h3>
          <p style={{ fontSize: '.75rem', color: 'var(--text2)', marginBottom: '16px' }}>1 matrícula confirmada = 100 pontos</p>

          {loading ? (
            <p style={{ textAlign: 'center', color: 'var(--text2)', padding: '20px' }}>Carregando recompensas...</p>
          ) : rewards.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--text2)', padding: '20px' }}>Nenhuma recompensa disponível ainda.</p>
          ) : (
            <div className="reward-ladder">
              {rewards.map((reward, index) => {
                const isUnlocked = totalPoints >= reward.points_required;
                const isNext = !isUnlocked && (index === 0 || totalPoints >= rewards[index - 1].points_required);
                const isLast = index === rewards.length - 1;
                const remaining = reward.points_required - totalPoints;

                return (
                  <div className="reward-rung" key={reward.id}>
                    <div className="rung-left">
                      <div
                        className={`rung-num ${isUnlocked ? 'done' : isNext ? 'active' : 'locked'}`}
                        style={isLast && !isUnlocked ? { background: 'linear-gradient(135deg,var(--gold-dim),var(--teal-dim))', borderColor: 'var(--gold-border)', color: 'var(--gold)' } : undefined}
                      >
                        {isUnlocked ? '\u2713' : isNext ? '\u2192' : isLast ? '\ud83d\udc51' : reward.tier}
                      </div>
                      {!isLast && <div className={`rung-line ${isUnlocked ? 'done' : ''}`}></div>}
                    </div>
                    <div className="rung-content">
                      <h4>{reward.name}</h4>
                      <p>{reward.description}</p>
                      {isUnlocked ? (
                        <div className="rung-done-label">{'\u2728'} Desbloqueado! Pronto para retirar</div>
                      ) : isLast ? (
                        <div className="rung-pts-needed" style={{ color: 'var(--gold)' }}>{reward.points_required} pontos {'·'} Prêmio máximo</div>
                      ) : (
                        <div className="rung-pts-needed">{remaining} pontos para desbloquear</div>
                      )}
                    </div>
                    <div className="rung-emoji">{reward.emoji}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <button className="btn btn-gold" onClick={() => goTo('indicate')}>
          {'\ud83d\udcf2'} Indicar agora e ganhar pontos
        </button>

      </div>
    </div>
  );
}
