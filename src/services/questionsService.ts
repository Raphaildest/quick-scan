import { Question } from '../types/assessment';
import { questionsBank } from '../data/questionsBank';

const STORAGE_KEY = 'quickscan_custom_questions_v1';

function loadStoredQuestions(): Question[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questionsBank));
    return questionsBank;
  }
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : questionsBank;
  } catch {
    return questionsBank;
  }
}

export const questionsService = {
  // Get all active questions
  getQuestions(): Question[] {
    return loadStoredQuestions();
  },

  // Get question by ID
  getQuestionById(id: number): Question | undefined {
    const list = loadStoredQuestions();
    return list.find(q => q.id === id);
  },

  // Create new question
  createQuestion(data: Omit<Question, 'id'>): Question {
    const list = loadStoredQuestions();
    // Auto-generate next numeric ID
    const maxId = list.reduce((max, q) => (q.id > max ? q.id : max), 0);
    const newId = maxId + 1;

    const newQuestion: Question = {
      ...data,
      id: newId,
      code: data.code || `Q${newId}`
    };

    list.push(newQuestion);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return newQuestion;
  },

  // Update existing question
  updateQuestion(id: number, data: Partial<Question>): Question {
    const list = loadStoredQuestions();
    const index = list.findIndex(q => q.id === id);
    if (index === -1) {
      throw new Error(`Questão com ID ${id} não encontrada.`);
    }

    const updated: Question = {
      ...list[index],
      ...data,
      id // preserve original ID
    };

    list[index] = updated;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return updated;
  },

  // Delete question
  deleteQuestion(id: number): Question[] {
    const list = loadStoredQuestions();
    if (list.length <= 1) {
      throw new Error('O banco de questões não pode ficar vazio. Mantenha ao menos uma questão ativa.');
    }

    const filtered = list.filter(q => q.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return filtered;
  },

  // Reset to original 28 questions
  resetToDefault(): Question[] {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questionsBank));
    return questionsBank;
  }
};

