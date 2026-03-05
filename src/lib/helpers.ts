import type { ReferralStatus, UserLevel } from '../types';

export const STATUS_CONFIG: Record<ReferralStatus, { label: string; className: string; emoji: string }> = {
  link_acessado:     { label: 'Link acessado',   className: 'status-pending',  emoji: '🔗' },
  em_contato:        { label: 'Em contato',       className: 'status-pending',  emoji: '💬' },
  aula_experimental: { label: 'Aula exp.',        className: 'status-trial',    emoji: '📅' },
  matriculado:       { label: 'Matriculado ✓',    className: 'status-enrolled', emoji: '✓' },
  cancelado:         { label: 'Cancelado',        className: 'status-cancelled', emoji: '✗' },
};

export const JOURNEY_STEPS: ReferralStatus[] = [
  'link_acessado',
  'em_contato',
  'aula_experimental',
  'matriculado',
];

const STATUS_ORDER: ReferralStatus[] = [
  'link_acessado', 'em_contato', 'aula_experimental', 'matriculado',
];

export function getStepState(
  currentStatus: ReferralStatus,
  stepStatus: ReferralStatus
): 'done' | 'active' | 'locked' {
  const currentIdx = STATUS_ORDER.indexOf(currentStatus);
  const stepIdx = STATUS_ORDER.indexOf(stepStatus);
  if (currentStatus === 'cancelado') return stepIdx === 0 ? 'done' : 'locked';
  if (stepIdx < currentIdx) return 'done';
  if (stepIdx === currentIdx) return 'active';
  return 'locked';
}

export function timeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'hoje';
  if (diffDays === 1) return 'ontem';
  if (diffDays < 30) return `há ${diffDays} dias`;
  const diffMonths = Math.floor(diffDays / 30);
  return `há ${diffMonths} ${diffMonths === 1 ? 'mês' : 'meses'}`;
}

export const LEVEL_NAMES: Record<UserLevel, { name: string; emoji: string; level: number }> = {
  iniciante:         { name: 'Iniciante',          emoji: '🎵', level: 1 },
  embaixador:        { name: 'Embaixador',         emoji: '🎸', level: 2 },
  musico_embaixador: { name: 'Músico Embaixador',  emoji: '⭐', level: 3 },
  rock_star:         { name: 'Rock Star',          emoji: '🎤', level: 4 },
  lenda_la_music:    { name: 'Lenda LA Music',     emoji: '👑', level: 5 },
};

export const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

export function currentPeriodLabel(): string {
  const now = new Date();
  return `${MONTH_NAMES[now.getMonth()]} de ${now.getFullYear()}`;
}
