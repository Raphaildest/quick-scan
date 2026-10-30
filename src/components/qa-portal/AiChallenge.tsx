import React, { useState } from 'react';
import { Bot, Sparkles, ChevronLeft, Send, AlertCircle, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { AiChallengeSubmission } from '../../types/assessment';

interface AiChallengeProps {
  initialData?: AiChallengeSubmission;
  onSubmitAssessment: (data: AiChallengeSubmission) => void;
  onPrevious: () => void;
  submitting: boolean;
}

export const AiChallenge: React.FC<AiChallengeProps> = ({
  initialData,
  onSubmitAssessment,
  onPrevious,
  submitting
}) => {
  const [toolUsed, setToolUsed] = useState(initialData?.toolUsed || 'ChatGPT-4o');
  const [prompt, setPrompt] = useState(initialData?.prompt || '');
  const [acceptedRejectedNotes, setAcceptedRejectedNotes] = useState(initialData?.acceptedRejectedNotes || '');
  const [hallucinationAnalysis, setHallucinationAnalysis] = useState(initialData?.hallucinationAnalysis || '');
  const [codeRefactoringNotes, setCodeRefactoringNotes] = useState(initialData?.codeRefactoringNotes || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitAssessment({
      toolUsed,
      prompt: prompt.trim(),
      acceptedRejectedNotes: acceptedRejectedNotes.trim(),
      hallucinationAnalysis: hallucinationAnalysis.trim(),
      codeRefactoringNotes: codeRefactoringNotes.trim()
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-ntt-navy via-slate-900 to-slate-800 p-6 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Bloco 3 de 3</span>
              <h2 className="text-xl font-bold">Desafio de IA Aplicada à Qualidade</h2>
              <p className="text-xs text-slate-300">
                Avaliação de discernimento crítico, detecção de alucinação e engenharia de prompt
              </p>
            </div>
          </div>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs text-slate-500">Responda aos questionamentos sobre a sua experiência com IA:</span>
            <button
              type="button"
              onClick={() => {
                setToolUsed('ChatGPT-4o');
                setPrompt('Atue como Staff Quality Engineer em um banco digital brasileiro. Analise a história de usuário sobre transferência bancária. Identifique ambiguidades, elabore cenários em Gherkin cobrindo caminhos felizes, exceções e concorrência, e aponte riscos arquiteturais.');
                setAcceptedRejectedNotes('ACEITEI: Cenários de concorrência com duas transferências simultâneas e validação de chave inativa. REJEITEI: Sugestão de cadastrar o mesmo CPF como chave em múltiplos bancos simultaneamente.');
                setHallucinationAnalysis('A IA alucinou ao presumir que um mesmo CPF pode ser chave ativa em bancos distintos ao mesmo tempo. Conforme diretrizes do BACEN, a chave CPF é estritamente unívoca por conta.');
                setCodeRefactoringNotes('Substituídos sleeps fixos por waitForLoadState e esperas explícitas de seletor. Removidas credenciais do código-fonte e adotado Page Object Model com dados injetados via env.');
              }}
              className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 hover:bg-amber-200 transition"
              title="Carregar respostas reflexivas de exemplo para demonstração"
            >
              ⚡ Carregar Exemplo Demo
            </button>
          </div>

          {/* 1. Tool Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              1. Qual ferramenta de IA você utilizou como apoio?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {['ChatGPT-4o', 'Claude 3.5 Sonnet', 'GitHub Copilot', 'Outra Ferramenta'].map((tool) => (
                <button
                  key={tool}
                  type="button"
                  onClick={() => setToolUsed(tool)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition ${
                    toolUsed === tool
                      ? 'bg-blue-50 border-blue-500 text-blue-900 ring-2 ring-blue-500/20'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {tool}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Prompt Used */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              2. Registro do Prompt Utilizado *
            </label>
            <p className="text-xs text-slate-500 mb-2">
              Cole o prompt exato com contexto, persona e restrições que forneceu à IA.
            </p>
            <textarea
              required
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ex: Atue como Staff QA Engineer em um banco digital. Analise a seguinte história de usuário e seus critérios de aceite. Gere matriz de risco e casos de teste em BDD..."
              className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-ntt-blue focus:bg-white font-mono transition"
            />
          </div>

          {/* 3. Accepted vs Rejected */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              3. Curadoria: O que você ACEITOU e o que REJEITOU da IA? *
            </label>
            <p className="text-xs text-slate-500 mb-2">
              Quais sugestões da IA agregaram valor real e quais foram descartadas por inconsistência ou risco?
            </p>
            <textarea
              required
              rows={3}
              value={acceptedRejectedNotes}
              onChange={(e) => setAcceptedRejectedNotes(e.target.value)}
              placeholder="Ex: Aceitei a sugestão de cobrir timeout com mock e validação de casas decimais. Rejeitei o teste de concorrência gerado na UI porque deve ser executado no backend..."
              className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-ntt-blue focus:bg-white transition"
            />
          </div>

          {/* 4. Hallucination Detection Test */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
            <div className="flex items-center space-x-2 text-amber-900 font-bold text-xs">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>4. Detecção de Alucinação (Caso Prático PIX) *</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Durante o assessment, uma IA sugeriu o seguinte cenário de teste: <br />
              <em className="font-semibold text-slate-900 bg-amber-100/70 px-1 py-0.5 rounded">
                "Validar se uma mesma chave PIX do tipo CPF pode ser cadastrada simultaneamente em contas de dois bancos diferentes."
              </em>
            </p>
            <p className="text-xs text-slate-600 font-medium">
              Analise criticamente essa premissa. Ela é válida segundo as regras do Banco Central? Como você trataria essa sugestão?
            </p>
            <textarea
              required
              rows={3}
              value={hallucinationAnalysis}
              onChange={(e) => setHallucinationAnalysis(e.target.value)}
              placeholder="Ex: A premissa é uma alucinação grave. O regulamento do Banco Central determina que a chave CPF é estritamente única no DICT, podendo estar vinculada a apenas uma conta bancária por vez..."
              className="w-full p-3 bg-white border border-amber-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-500 transition"
            />
          </div>

          {/* 5. Refactoring with AI */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              5. Refatoração Assistida por IA de Script Instável
            </label>
            <p className="text-xs text-slate-500 mb-2">
              Se você pediu para a IA refatorar um script legado com <code className="bg-slate-100 px-1 rounded">sleep(10)</code> e credenciais expostas, quais diretrizes você aplicou?
            </p>
            <textarea
              rows={3}
              value={codeRefactoringNotes}
              onChange={(e) => setCodeRefactoringNotes(e.target.value)}
              placeholder="Ex: Instruí o modelo a usar variáveis de ambiente para credenciais, substituir sleeps por waitForSelector do Playwright e adotar Page Object Model..."
              className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-ntt-blue focus:bg-white transition"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={onPrevious}
              disabled={submitting}
              className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Voltar ao Desafio de Automação</span>
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="flex items-center space-x-2 px-8 py-3 rounded-xl text-xs font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-600/30 transition disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'Calculando Resultados...' : 'FINALIZAR QUICK SCAN'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
