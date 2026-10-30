import React from 'react';
import { CheckCircle2, ArrowLeft, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QASuccessScreenProps {
  qaName: string;
  onRestart: () => void;
}

export const QASuccessScreen: React.FC<QASuccessScreenProps> = ({ qaName, onRestart }) => {
  React.useEffect(() => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <div className="max-w-xl mx-auto py-16 px-4 text-center animate-fade-in">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 sm:p-10 space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto text-emerald-600 shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
            Questionário Concluído com Sucesso
          </span>
          <h2 className="text-2xl font-black text-slate-900">
            Obrigado, {qaName}!
          </h2>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Suas respostas foram registradas e encaminhadas com sucesso para a plataforma de analytics da liderança da NTT DATA.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2 text-left">
          <div className="flex items-center space-x-2 font-bold text-slate-800">
            <ShieldCheck className="w-4 h-4 text-ntt-blue" />
            <span>O que acontece agora?</span>
          </div>
          <p>
            1. As respostas técnicas geram automaticamente o mapeamento de competências (Automação, IA, Engenharia, CI/CD e Fundamentos).
          </p>
          <p>
            2. A liderança técnica usará esses dados para direcionar planos de capacitação e suporte de engenharia para o seu time.
          </p>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={onRestart}
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Preencher outro questionário</span>
          </button>
        </div>
      </div>
    </div>
  );
};

