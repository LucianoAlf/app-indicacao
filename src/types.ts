export type Screen = 'splash' | 'home' | 'indicate' | 'referrals' | 'ranking' | 'badges' | 'rewards';
export type Theme = 'dark' | 'light';

// Enums do banco
export type ReferralStatus = 'link_acessado' | 'em_contato' | 'aula_experimental' | 'matriculado' | 'cancelado';
export type UserLevel = 'iniciante' | 'embaixador' | 'musico_embaixador' | 'rock_star' | 'lenda_la_music';
export type RedemptionStatus = 'pendente' | 'entregue' | 'cancelado';

// Tipos das tabelas
export interface Profile {
  id: string;
  school_id: string;
  full_name: string;
  phone: string | null;
  instrument: string | null;
  avatar_emoji: string;
  referral_code: string;
  total_points: number;
  converted_count: number;
  current_level: UserLevel;
  is_admin: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Referral {
  id: string;
  school_id: string;
  referrer_id: string;
  referred_name: string;
  referred_phone: string | null;
  referred_instrument: string | null;
  status: ReferralStatus;
  points_awarded: number;
  converted_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Badge {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  emoji: string;
  bonus_points: number;
  condition_type: string;
  condition_value: number | null;
  sort_order: number;
  active: boolean;
  created_at: string;
}

export interface UserBadge {
  id: string;
  profile_id: string;
  badge_id: string;
  unlocked_at: string;
}

export interface Reward {
  id: string;
  school_id: string;
  tier: number;
  name: string;
  description: string | null;
  emoji: string;
  points_required: number;
  stock: number | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface RewardRedemption {
  id: string;
  school_id: string;
  profile_id: string;
  reward_id: string;
  status: RedemptionStatus;
  points_spent: number;
  delivered_by: string | null;
  delivered_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface RankingLive {
  profile_id: string;
  school_id: string;
  full_name: string;
  avatar_emoji: string;
  referral_code: string;
  total_points: number;
  converted_count: number;
  referrals_this_month: number;
  converted_this_month: number;
  points_this_month: number;
  rank_position: number;
}

export interface AdminDashboard {
  school_id: string;
  school_name: string;
  total_active_members: number;
  total_referrals: number;
  total_converted: number;
  conversion_rate_pct: number;
  adhesion_rate_pct: number;
  pending_redemptions: number;
  referrals_this_month: number;
  conversions_this_month: number;
}
