import React, { useState } from 'react';
import { Code2, GitBranch, UploadCloud, CheckCircle2, ChevronRight, ChevronLeft, FileArchive, Info } from 'lucide-react';
import { PracticalChallengeSubmission } from '../../types/assessment';
import { dataService } from '../../services/dataService';

interface PracticalChallengeProps {
  sap: string;
  initialData?: PracticalChallengeSubmission;
  onSave: (data: PracticalChallengeSubmission) => void;
  onPrevious: () => void;
}

export const PracticalChallenge: React.FC<PracticalChallengeProps> = ({
  sap,
  initialData,
  onSave,
  onPrevious
}) => {
  const [repoUrl, setRepoUrl] = useState(initialData?.repoUrl || '');
  const [strategySummary, setStrategySummary] = useState(initialData?.strategySummary || '');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [storagePath, setStoragePath] = useState(initialData?.storagePath || '');
  const [uploadedFileName, setUploadedFileName] = useState(initialData?.fileName || '');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setUploadedFileName(selectedFile.name);

      setUploading(true);
      try {
        const publicUrl = await dataService.uploadPracticalZip(selectedFile, sap);
        setStoragePath(publicUrl);
      } catch (err) {
        console.error('Falha no upload:', err);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      repoUrl: repoUrl.trim() || undefined,
      storagePath: storagePath || undefined,
      fileName: uploadedFileName || undefined,
      strategySummary: strategySummary.trim()
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-ntt-navy to-slate-900 p-6 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center">
              <Code2 className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Bloco 2 de 3</span>
              <h2 className="text-xl font-bold">Desafio Prático de Automação</h2>
              <p className="text-xs text-slate-300">
                Evidência de arquitetura, manutenibilidade, reuso e estratégia de camadas
              </p>
            </div>
          </div>
        </div>

        {/* Challenge Scenario & Instructions */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-3">
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
              <Info className="w-4 h-4 text-blue-600" />
              <span>Cenário: Transferência Bancária Entre Contas</span>
            </div>
            <p>
              Você integra o time responsável por uma aplicação de pagamentos digitais. O usuário autenticado consulta saldo, executa uma transferência e obtém o comprovante com saldo atualizado.
            </p>
            <div className="bg-white p-3.5 rounded-lg border border-slate-200 font-mono text-[11px] space-y-1">
              <p className="font-bold text-slate-800">Critérios de Aceite:</p>
              <p>1. Usuário precisa estar autenticado.</p>
              <p>2. Conta destino deve existir e estar ativa.</p>
              <p>3. Valor precisa ser maior que R$ 0,00 e não pode superar o saldo em conta.</p>
              <p>4. Ao confirmar: saldo deve ser debitado e comprovante emitido com ID único.</p>
            </div>
            <p className="text-[11px] text-slate-500 italic">
              * Você pode utilizar o framework de sua preferência (Playwright, Robot Framework, Cypress, Selenium, etc.).
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Submission Mode: Git or Upload */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Submissão do Código (Híbrido: Git ou Upload de ZIP)
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setRepoUrl('https://github.com/ntt-qa/pagamentos-e2e-playwright');
                    setStrategySummary('Implementada separação estrita de camadas: validação de saldo insuficiente e regras bancárias via API REST (/api/transferencias) com asserções rápidas; na interface Web (Playwright) foram automatizados apenas os fluxos de ponta a ponta da jornada (login, confirmação e exibição do comprovante com snapshot). Massa gerada dinamicamente via fixtures efêmeras sem dependência de usuários fixos.');
                  }}
                  className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800 hover:bg-cyan-200 transition"
                  title="Carregar dados de exemplo para demonstração"
                >
                  ⚡ Usar Exemplo Demo
                </button>
              </div>

              {/* Option A: Git Repo URL */}
              <div>
                <label className="block text-xs text-slate-600 mb-1 font-medium">
                  URL do Repositório (GitHub, GitLab, Bitbucket)
                </label>
                <div className="relative">
                  <input
                    type="url"
                    placeholder="https://github.com/seu-usuario/desafio-automacao"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-ntt-blue focus:bg-white transition"
                  />
                  <GitBranch className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                </div>
              </div>

              {/* Option B: ZIP Upload to Supabase Storage */}
              <div>
                <label className="block text-xs text-slate-600 mb-1 font-medium">
                  Ou faça o upload do arquivo ZIP com seu projeto:
                </label>
                <div className="relative border-2 border-dashed border-slate-300 hover:border-ntt-blue rounded-xl p-4 text-center bg-slate-50/50 transition">
                  <input
                    type="file"
                    accept=".zip,.rar,.tar.gz"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
                    <UploadCloud className="w-8 h-8 text-slate-400" />
                    <p className="text-xs text-slate-600">
                      {uploading ? (
                        <span className="text-blue-600 font-bold">Enviando para Supabase Storage...</span>
                      ) : uploadedFileName ? (
                        <span className="text-emerald-700 font-semibold flex items-center space-x-1">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Arquivo anexado: {uploadedFileName}</span>
                        </span>
                      ) : (
                        <span>Arraste seu arquivo ZIP aqui ou clique para selecionar</span>
                      )}
                    </p>
                    <span className="text-[10px] text-slate-400">Até 25 MB (.zip)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategy Explanation */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Defesa Técnica da Estratégia Adotada *
              </label>
              <p className="text-xs text-slate-500 mb-2">
                Explique brevemente: quais cenários automatizou em API e quais em UI? Como tratou massa de dados e seletores?
              </p>
              <textarea
                required
                rows={4}
                value={strategySummary}
                onChange={(e) => setStrategySummary(e.target.value)}
                placeholder="Ex: Concentrei 80% das validações de regras de saldo e limites via API REST por serem atômicas e rápidas. Na UI com Playwright, mantive apenas a validação da jornada crítica com data-testid e fixtures de autenticação..."
                className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-ntt-blue focus:bg-white transition"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={onPrevious}
                className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Voltar ao Assessment</span>
              </button>

              <button
                type="submit"
                className="flex items-center space-x-1.5 px-6 py-2.5 rounded-xl text-xs font-bold bg-ntt-blue hover:bg-blue-600 text-white shadow-md transition"
              >
                <span>Prosseguir para Desafio de IA</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
