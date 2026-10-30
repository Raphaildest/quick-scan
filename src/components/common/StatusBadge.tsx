import React from 'react';

interface StatusBadgeProps {
  status: 'Alto' | 'Médio' | 'Baixo' | 'Não Avaliado' | string;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs font-semibold',
    lg: 'px-3 py-1.5 text-sm font-bold'
  }[size];

  switch (status) {
    case 'Alto':
      return (
        <span className={`inline-flex items-center rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mr-1.5 animate-pulse"></span>
          Alto
        </span>
      );
    case 'Médio':
      return (
        <span className={`inline-flex items-center rounded-full bg-amber-100 text-amber-800 border border-amber-300 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span>
          Médio
        </span>
      );
    case 'Baixo':
      return (
        <span className={`inline-flex items-center rounded-full bg-rose-100 text-rose-800 border border-rose-300 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mr-1.5"></span>
          Baixo
        </span>
      );
    case 'Não Avaliado':
      return (
        <span className={`inline-flex items-center rounded-full bg-slate-100 text-slate-600 border border-slate-300 ${sizeClasses}`}>
          Não Avaliado
        </span>
      );
    default:
      // Action tags
      if (status.includes('Manter') || status.includes('Habilitador') || status.includes('Multiplicador')) {
        return (
          <span className={`inline-flex items-center rounded-md bg-blue-50 text-blue-700 border border-blue-200 ${sizeClasses}`}>
            {status}
          </span>
        );
      }
      if (status.includes('Entrevista') || status.includes('Divergência')) {
        return (
          <span className={`inline-flex items-center rounded-md bg-rose-100 text-rose-900 border border-rose-300 font-bold ${sizeClasses}`}>
            ⚠️ {status}
          </span>
        );
      }
      if (status.includes('Substituição') || status.includes('Declínio') || status.includes('Emergencial')) {
        return (
          <span className={`inline-flex items-center rounded-md bg-red-50 text-red-700 border border-red-200 ${sizeClasses}`}>
            {status}
          </span>
        );
      }
      return (
        <span className={`inline-flex items-center rounded-md bg-slate-100 text-slate-700 border border-slate-200 ${sizeClasses}`}>
          {status}
        </span>
      );
  }
};
