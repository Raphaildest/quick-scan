import React, { useState, useEffect } from 'react';
import { HelpCircle, Plus, Edit3, Trash2, Search, RotateCcw, CheckCircle2, AlertCircle, X, ShieldAlert, BookOpen } from 'lucide-react';
import { Question, AssessmentDimension } from '../../types/assessment';
import { questionsService } from '../../services/questionsService';

const DIMENSIONS: { key: AssessmentDimension; label: string; color: string }[] = [
  { key: 'automacao', label: 'Automação de Testes', color: 'bg-cyan-100 text-cyan-800 border-cyan-300' },
  { key: 'ia_aplicada', label: 'IA Aplicada à Qualidade', color: 'bg-amber-100 text-amber-800 border-amber-300' },
  { key: 'engenharia', label: 'Engenharia / Código', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  { key: 'cicd_massa', label: 'CI/CD e Massa de Dados', color: 'bg-teal-100 text-teal-800 border-teal-300' },
  { key: 'fundamentos', label: 'Fundamentos de Qualidade', color: 'bg-blue-100 text-blue-800 border-blue-300' }
];

export const QuestionManagement: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedDimension, setSelectedDimension] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  // Form states
  const [formCode, setFormCode] = useState('');
  const [formDimension, setFormDimension] = useState<AssessmentDimension>('automacao');
  const [formTitle, setFormTitle] = useState('');
  const [formStatement, setFormStatement] = useState('');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('A');
  const [formExplanation, setFormExplanation] = useState('');
  const [formWeight, setFormWeight] = useState(1.0);
  const [formError, setFormError] = useState('');
  const [notification, setNotification] = useState('');

  const loadQuestions = () => {
    const list = questionsService.getQuestions();
    setQuestions(list);
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  const openCreateModal = () => {
    setEditingQuestion(null);
    setFormCode(`Q${questions.length + 1}`);
    setFormDimension('automacao');
    setFormTitle('');
    setFormStatement('');
    setOptA('');
    setOptB('');
    setOptC('');
    setOptD('');
    setCorrectAnswer('A');
    setFormExplanation('');
    setFormWeight(1.0);
    setFormError('');
    setShowModal(true);
  };

  const openEditModal = (q: Question) => {
    setEditingQuestion(q);
    setFormCode(q.code);
    setFormDimension(q.dimension);
    setFormTitle(q.title);
    setFormStatement(q.statement);
    setOptA(q.options.find(o => o.id === 'A')?.text || '');
    setOptB(q.options.find(o => o.id === 'B')?.text || '');
    setOptC(q.options.find(o => o.id === 'C')?.text || '');
    setOptD(q.options.find(o => o.id === 'D')?.text || '');
    setCorrectAnswer(q.correctAnswer);
    setFormExplanation(q.explanation || '');
    setFormWeight(q.weight || 1.0);
    setFormError('');
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      setFormError('Informe um título para a questão.');
      return;
    }
    if (!formStatement.trim()) {
      setFormError('Informe o enunciado da questão.');
      return;
    }
    if (!optA.trim() || !optB.trim() || !optC.trim() || !optD.trim()) {
      setFormError('Preencha as 4 alternativas (A, B, C, D).');
      return;
    }

    const dimensionObj = DIMENSIONS.find(d => d.key === formDimension);

    const questionPayload: Omit<Question, 'id'> = {
      code: formCode.trim() || `Q${questions.length + 1}`,
      dimension: formDimension,
      dimensionLabel: dimensionObj?.label || 'Geral',
      title: formTitle.trim(),
      statement: formStatement.trim(),
      options: [
        { id: 'A', text: optA.trim() },
        { id: 'B', text: optB.trim() },
        { id: 'C', text: optC.trim() },
        { id: 'D', text: optD.trim() }
      ],
      correctAnswer: correctAnswer,
      explanation: formExplanation.trim() || undefined,
      weight: formWeight
    };

    try {
      if (editingQuestion) {
        questionsService.updateQuestion(editingQuestion.id, questionPayload);
        setNotification(`Questão "${formCode}" atualizada com sucesso!`);
      } else {
        questionsService.createQuestion(questionPayload);
        setNotification(`Nova questão "${formCode}" criada com sucesso!`);
      }
      setShowModal(false);
      loadQuestions();
      setTimeout(() => setNotification(''), 4000);
    } catch (err: any) {
      setFormError(err.message || 'Erro ao salvar questão.');
    }
  };

  const handleDelete = (q: Question) => {
    if (!confirm(`Tem certeza que deseja excluir a questão [${q.code}] "${q.title}"?`)) return;

    try {
      questionsService.deleteQuestion(q.id);
      setNotification(`Questão [${q.code}] removida do banco.`);
      loadQuestions();
      setTimeout(() => setNotification(''), 4000);
    } catch (err: any) {
      alert(err.message || 'Erro ao excluir questão.');
    }
  };

  const handleResetDefaults = () => {
    if (confirm('Deseja restaurar o banco original de 28 questões oficiais? As alterações manuais serão resetadas.')) {
      questionsService.resetToDefault();
      setNotification('Banco de questões restaurado para o padrão original (28 questões).');
      loadQuestions();
      setTimeout(() => setNotification(''), 4000);
    }
  };

  // Filtered list
  const filteredQuestions = questions.filter(q => {
    if (selectedDimension && q.dimension !== selectedDimension) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchCode = q.code.toLowerCase().includes(term);
      const matchTitle = q.title.toLowerCase().includes(term);
      const matchStatement = q.statement.toLowerCase().includes(term);
      if (!matchCode && !matchTitle && !matchStatement) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-ntt-blue">
            Conteúdo & Gestão de Avaliação
          </span>
          <h2 className="text-lg font-black text-slate-900">
            Banco de Questões do Quick Scan ({questions.length} Cadastradas)
          </h2>
          <p className="text-xs text-slate-500">
            Cadastre, edite alternativas e gerencie o gabarito oficial do questionário dos QAs.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="inline-flex items-center space-x-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition"
            title="Restaurar as 28 questões oficiais originais"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Restaurar Padrão</span>
          </button>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-ntt-blue hover:bg-blue-600 text-white font-bold rounded-xl text-xs shadow-md transition"
          >
            <Plus className="w-4 h-4" />
            <span>Nova Questão</span>
          </button>
        </div>
      </div>

      {notification && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedDimension('')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              selectedDimension === ''
                ? 'bg-ntt-blue text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Todas ({questions.length})
          </button>
          {DIMENSIONS.map(d => {
            const count = questions.filter(q => q.dimension === d.key).length;
            const isSelected = selectedDimension === d.key;
            return (
              <button
                key={d.key}
                type="button"
                onClick={() => setSelectedDimension(d.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                  isSelected
                    ? 'bg-ntt-blue text-white border-ntt-blue shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {d.label.split(' ')[0]} ({count})
              </button>
            );
          })}
        </div>

        <div className="relative max-w-xs w-full">
          <input
            type="text"
            placeholder="Buscar por código, título ou enunciado..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-ntt-blue"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {filteredQuestions.map((q) => {
          const dimObj = DIMENSIONS.find(d => d.key === q.dimension);
          return (
            <div
              key={q.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-3 hover:border-slate-300 transition"
            >
              <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-black text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-800">
                    {q.code}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${
                      dimObj?.color || 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    {dimObj?.label || q.dimensionLabel}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm">{q.title}</h3>
                </div>

                <div className="flex items-center space-x-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => openEditModal(q)}
                    className="p-1.5 text-ntt-blue hover:bg-blue-50 rounded-lg transition"
                    title="Editar questão"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(q)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                    title="Excluir questão"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Statement */}
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {q.statement}
              </p>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {q.options.map((opt) => {
                  const isCorrect = opt.id === q.correctAnswer;
                  return (
                    <div
                      key={opt.id}
                      className={`p-2.5 rounded-xl border flex items-start space-x-2 ${
                        isCorrect
                          ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 font-semibold'
                          : 'bg-slate-50/50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 ${
                          isCorrect
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {opt.id}
                      </span>
                      <span className="leading-snug">{opt.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* Explanation */}
              {q.explanation && (
                <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-start space-x-1.5">
                  <span className="font-bold text-slate-700 shrink-0">💡 Justificativa:</span>
                  <span className="italic">{q.explanation}</span>
                </div>
              )}
            </div>
          );
        })}

        {filteredQuestions.length === 0 && (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-xs text-slate-400">
            Nenhuma questão encontrada com os filtros informados.
          </div>
        )}
      </div>

      {/* Modal: Create or Edit Question */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50 shrink-0">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-xl bg-blue-100 text-ntt-blue">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {editingQuestion ? `Editar Questão [${editingQuestion.code}]` : 'Cadastrar Nova Questão'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Defina enunciado, alternativas, gabarito e fundamentação
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 text-xs">
              {formError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Código *
                  </label>
                  <input
                    type="text"
                    required
                    value={formCode}
                    onChange={(e) => setFormCode(e.target.value)}
                    placeholder="Ex: Q29"
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-mono text-xs focus:ring-2 focus:ring-ntt-blue"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Dimensão Técnica *
                  </label>
                  <select
                    value={formDimension}
                    onChange={(e) => setFormDimension(e.target.value as any)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-ntt-blue"
                  >
                    {DIMENSIONS.map(d => (
                      <option key={d.key} value={d.key}>{d.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Título Curto da Competência *
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Ex: Seletores Resilientes em Playwright"
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-ntt-blue"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Enunciado Completo da Questão *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formStatement}
                  onChange={(e) => setFormStatement(e.target.value)}
                  placeholder="Escreva a situação-problema técnica ou contexto de engenharia..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-ntt-blue"
                />
              </div>

              {/* 4 Options */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="block font-bold uppercase tracking-wider text-slate-700 text-[11px]">
                  Alternativas de Resposta *
                </span>

                {(['A', 'B', 'C', 'D'] as const).map((letter) => {
                  const val = letter === 'A' ? optA : letter === 'B' ? optB : letter === 'C' ? optC : optD;
                  const setVal = letter === 'A' ? setOptA : letter === 'B' ? setOptB : letter === 'C' ? setOptC : setOptD;
                  const isCurrentCorrect = correctAnswer === letter;

                  return (
                    <div key={letter} className="flex items-center space-x-2">
                      <span className="w-6 h-6 rounded-md bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center shrink-0">
                        {letter}
                      </span>
                      <input
                        type="text"
                        required
                        value={val}
                        onChange={(e) => setVal(e.target.value)}
                        placeholder={`Texto da alternativa ${letter}...`}
                        className={`flex-1 p-2 rounded-xl text-xs border ${
                          isCurrentCorrect
                            ? 'bg-emerald-50/50 border-emerald-400 font-medium'
                            : 'bg-slate-50 border-slate-300'
                        }`}
                      />
                      <label className="flex items-center space-x-1 cursor-pointer shrink-0">
                        <input
                          type="radio"
                          name="correctOption"
                          checked={isCurrentCorrect}
                          onChange={() => setCorrectAnswer(letter)}
                          className="text-ntt-blue focus:ring-ntt-blue"
                        />
                        <span className={`text-[11px] font-bold ${isCurrentCorrect ? 'text-emerald-700' : 'text-slate-500'}`}>
                          Gabarito
                        </span>
                      </label>
                    </div>
                  );
                })}
              </div>

              {/* Technical Explanation */}
              <div className="pt-2 border-t border-slate-100">
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Justificativa Técnica / Explicação da Resposta Correta
                </label>
                <textarea
                  rows={2}
                  value={formExplanation}
                  onChange={(e) => setFormExplanation(e.target.value)}
                  placeholder="Por que esta alternativa é a correta do ponto de vista de engenharia de qualidade..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-ntt-blue"
                />
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-ntt-blue hover:bg-blue-600 text-white font-bold rounded-xl shadow transition"
                >
                  {editingQuestion ? 'Salvar Alterações' : 'Cadastrar Questão'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

