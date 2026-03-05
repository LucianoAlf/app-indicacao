import React, { useEffect, useState } from 'react';
import { useAuth } from '../lib/auth';
import { supabase } from '../lib/supabase';
import { STATUS_CONFIG, timeAgo } from '../lib/helpers';
import type { AdminDashboard, Referral, RewardRedemption, ReferralStatus } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface RedemptionWithJoins extends RewardRedemption {
  reward: { name: string; emoji: string; points_required: number };
  profile: { full_name: string; avatar_emoji: string };
}

interface ReferralWithReferrer extends Referral {
  referrer: { full_name: string };
}

export default function AdminModal({ isOpen, onClose }: AdminModalProps) {
  const { profile } = useAuth();
  const [dashboard, setDashboard] = useState<AdminDashboard | null>(null);
  const [pendingRedemptions, setPendingRedemptions] = useState<RedemptionWithJoins[]>([]);
  const [recentReferrals, setRecentReferrals] = useState<ReferralWithReferrer[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!profile?.is_admin) return;

    setLoading(true);

    const [dashRes, redemptionsRes, referralsRes] = await Promise.all([
      supabase
        .from('admin_dashboard')
        .select('*')
        .eq('school_id', profile.school_id)
        .single(),
      supabase
        .from('reward_redemptions')
        .select('*, reward:rewards(name, emoji, points_required), profile:profiles(full_name, avatar_emoji)')
        .eq('school_id', profile.school_id)
        .eq('status', 'pendente')
        .order('created_at', { ascending: false }),
      supabase
        .from('referrals')
        .select('*, referrer:profiles!referrer_id(full_name)')
        .eq('school_id', profile.school_id)
        .order('created_at', { ascending: false })
        .limit(10),
    ]);

    if (dashRes.data) setDashboard(dashRes.data);
    if (redemptionsRes.data) setPendingRedemptions(redemptionsRes.data as RedemptionWithJoins[]);
    if (referralsRes.data) setRecentReferrals(referralsRes.data as ReferralWithReferrer[]);

    setLoading(false);
  };

  useEffect(() => {
    if (isOpen && profile?.is_admin) {
      fetchData();
    }
  }, [isOpen, profile]);

  const handleDeliver = async (redemptionId: string) => {
    await supabase
      .from('reward_redemptions')
      .update({ status: 'entregue', delivered_by: profile!.id, delivered_at: new Date().toISOString() })
      .eq('id', redemptionId);

    await fetchData();
  };

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
          <div className="modal-title">{'\u2699\ufe0f'} Painel da Escola</div>
          <button className="icon-btn" onClick={onClose}>{'\u2715'}</button>
        </div>
        <p className="modal-sub">Dashboard admin {'\u2014'} {dashboard?.school_name ?? 'Carregando...'}</p>

        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--text2)', padding: '20px' }}>Carregando dados...</p>
        ) : dashboard ? (
          <>
            {/* KPIs */}
            <div className="admin-kpis">
              <div className="admin-kpi">
                <div className="admin-kpi-val">{dashboard.total_active_members}</div>
                <div className="admin-kpi-lbl">Alunos no programa</div>
                <div className="admin-kpi-delta">{'\u2191'} +{dashboard.referrals_this_month} este mês</div>
              </div>
              <div className="admin-kpi">
                <div className="admin-kpi-val">{dashboard.adhesion_rate_pct}%</div>
                <div className="admin-kpi-lbl">Taxa de adesão</div>
                <div className="admin-kpi-delta">{'\u2191'} Meta: 15% {'\u2713'}</div>
              </div>
              <div className="admin-kpi">
                <div className="admin-kpi-val">{dashboard.total_referrals}</div>
                <div className="admin-kpi-lbl">Indicações recebidas</div>
                <div className="admin-kpi-delta">{'\u2191'} +{dashboard.referrals_this_month} este mês</div>
              </div>
              <div className="admin-kpi">
                <div className="admin-kpi-val">{dashboard.conversion_rate_pct}%</div>
                <div className="admin-kpi-lbl">Taxa de conversão</div>
                <div className="admin-kpi-delta">{dashboard.total_converted} matriculados</div>
              </div>
            </div>

            <div className="sec-hdr" style={{ marginBottom: '12px' }}>
              <h2>Recompensas a entregar</h2>
              <span className="pill-tag">{pendingRedemptions.length} pendentes</span>
            </div>
            <div className="admin-list" style={{ marginBottom: '20px' }}>
              {pendingRedemptions.length === 0 ? (
                <p style={{ color: 'var(--text2)', fontSize: '.85rem', padding: '8px 0' }}>Nenhuma recompensa pendente.</p>
              ) : (
                pendingRedemptions.map(redemption => (
                  <div className="admin-list-item" key={redemption.id}>
                    <span style={{ fontSize: '1.2rem' }}>{redemption.reward.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <strong>{redemption.profile.full_name}</strong>
                      <span style={{ display: 'block', fontSize: '.7rem', color: 'var(--text2)' }}>{redemption.reward.name} {'·'} {redemption.points_spent} pts</span>
                    </div>
                    <button className="admin-action" onClick={() => handleDeliver(redemption.id)}>Entregar</button>
                  </div>
                ))
              )}
            </div>

            <div className="sec-hdr" style={{ marginBottom: '12px' }}>
              <h2>Indicações recentes</h2>
            </div>
            <div className="admin-list" style={{ marginBottom: '20px' }}>
              {recentReferrals.length === 0 ? (
                <p style={{ color: 'var(--text2)', fontSize: '.85rem', padding: '8px 0' }}>Nenhuma indicação ainda.</p>
              ) : (
                recentReferrals.map(referral => {
                  const statusInfo = STATUS_CONFIG[referral.status as ReferralStatus];
                  return (
                    <div className="admin-list-item" key={referral.id}>
                      <div className="rank-av">{statusInfo.emoji}</div>
                      <div style={{ flex: 1 }}>
                        <strong style={{ fontSize: '.88rem' }}>{referral.referred_name}</strong>
                        <span style={{ display: 'block', fontSize: '.7rem' }} className={statusInfo.className}>{statusInfo.label}</span>
                      </div>
                      <span style={{ fontSize: '.72rem', color: 'var(--text2)' }}>por {referral.referrer.full_name} {'·'} {timeAgo(referral.created_at)}</span>
                    </div>
                  );
                })
              )}
            </div>
          </>
        ) : (
          <p style={{ textAlign: 'center', color: 'var(--text2)', padding: '20px' }}>Erro ao carregar dashboard.</p>
        )}

        <button className="btn btn-gold" onClick={onClose}>Fechar painel</button>
      </div>
    </div>
  );
}
