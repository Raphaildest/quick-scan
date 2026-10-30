import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  icon: LucideIcon;
  variant?: 'default' | 'primary' | 'success' | 'warning';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtext,
  trend,
  icon: Icon,
  variant = 'default'
}) => {
  const borderVariants = {
    default: 'border-slate-200 hover:border-slate-300',
    primary: 'border-blue-200 bg-gradient-to-br from-white to-blue-50/40',
    success: 'border-emerald-200 bg-gradient-to-br from-white to-emerald-50/40',
    warning: 'border-amber-200 bg-gradient-to-br from-white to-amber-50/40'
  }[variant];

  const iconColors = {
    default: 'text-slate-600 bg-slate-100',
    primary: 'text-blue-600 bg-blue-100',
    success: 'text-emerald-600 bg-emerald-100',
    warning: 'text-amber-600 bg-amber-100'
  }[variant];

  return (
    <div className={`p-5 bg-white rounded-xl border shadow-sm transition-all duration-200 ${borderVariants}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </span>
        <div className={`p-2.5 rounded-lg ${iconColors}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-bold tracking-tight text-slate-900">{value}</span>
        {trend && (
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded-md ${
              trend.isPositive ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
            }`}
          >
            {trend.value}
          </span>
        )}
      </div>

      {subtext && <p className="mt-1.5 text-xs text-slate-500">{subtext}</p>}
    </div>
  );
};
