import React, { useState } from 'react';
import { UserCheck, ArrowRight, ShieldCheck, Mail, Briefcase, User } from 'lucide-react';

interface QAIdentificationProps {
  onStart: (data: { name: string; email: string; area: string }) => void;
}

const COMMON_AREAS = [
  'Investimentos & Previdência',
  'Meios de Pagamentos & PIX',
  'Cartões & Cobrança',
  'Canais Digitais Mobile',
  'Core Banking & Liquidação',
  'Open Finance',
  'Seguros & Benefícios'
];

export const QAIdentification: React.FC<QAIdentificationProps> = ({ onStart }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [area, setArea] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Por favor, informe seu nome completo.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Por favor, informe um e-mail válido.');
      return;
    }
    if (!area.trim()) {
      setError('Por favor, informe ou selecione sua área de atuação.');
      return;
    }

    setError('');
    onStart({ name: name.trim(), email: email.trim(), area: area.trim() });
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Banner */}
        <div className="bg-gradient-to-r from-ntt-navy via-slate-900 to-ntt-blue p-8 text-white">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-cyan-300" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                Quality Engineering • Assessment Técnico
              </span>
              <h1 className="text-2xl font-black">Quick Scan de Habilidades</h1>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed max-w-lg">
            Mapeamento objetivo de competências em Automação, IA Aplicada, Engenharia de Código, CI/CD e Fundamentos de Qualidade.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900 flex items-center space-x-2">
              <UserCheck className="w-4 h-4 text-ntt-blue" />
              <span>Dados de Identificação do Profissional</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Preencha seus dados para vincular suas respostas ao relatório da liderança.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Nome */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Nome Completo *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Ana Silva"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-ntt-blue focus:bg-white transition"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          {/* E-mail */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              E-mail Corporativo *
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ex: ana.silva@nttdata.com"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-ntt-blue focus:bg-white transition"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          {/* Área de Atuação */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Área de Atuação / Squad *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="Ex: Investimentos, Cartões, Meios de Pagamento..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-ntt-blue focus:bg-white transition"
              />
              <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>

            {/* Quick Selection Pills */}
            <div className="mt-2.5">
              <span className="text-[11px] text-slate-400 block mb-1.5 font-medium">
                Sugestões rápidas de área:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {COMMON_AREAS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setArea(item)}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition ${
                      area === item
                        ? 'bg-blue-50 border-blue-500 text-blue-900 font-bold'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 py-3 bg-ntt-blue hover:bg-blue-600 text-white font-bold rounded-xl shadow-md transition"
            >
              <span>Iniciar Questionário Técnico</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

