import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';
import type { ReactNode } from 'react';

type InfoBoxVariant = 'info' | 'warning' | 'success' | 'danger';

type InfoBoxProps = {
  variant: InfoBoxVariant;
  children: ReactNode;
  className?: string;
};

const VARIANT_STYLES: Record<InfoBoxVariant, { bg: string; border: string; icon: typeof Info }> = {
  info: {
    bg: 'bg-primary-50',
    border: 'border-primary-200',
    icon: Info,
  },
  warning: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    icon: AlertTriangle,
  },
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    icon: CheckCircle,
  },
  danger: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    icon: XCircle,
  },
};

export function InfoBox({ variant, children, className = '' }: InfoBoxProps) {
  const styles = VARIANT_STYLES[variant];
  const Icon = styles.icon;

  return (
    <div className={`flex gap-3 p-4 rounded-xl border ${styles.bg} ${styles.border} ${className}`}>
      <Icon size={22} className="shrink-0 mt-0.5 text-current opacity-70" />
      <div className="text-base leading-relaxed">{children}</div>
    </div>
  );
}
