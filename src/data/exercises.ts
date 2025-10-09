import type { Exercise } from '../types/index';

export const exercisesData: Record<number, Exercise[]> = {
  // Модуль 1: Приветствия
  1: [
    {
      id: 1,
      type: 'choice',
      question: 'Как сказать "Привет" по-французски?',
      image: '👋',
      options: ['Bonjour', 'Au revoir', 'Merci', 'Oui'],
      correct: 0,
      audio: 'Bonjour'
    },
    {
      id: 2,
      type: 'match',
      question: 'Найди правильную пару!',
      pairs: [
        { french: 'Bonjour', russian: 'Привет', emoji: '👋' },
        { french: 'Merci', russian: 'Спасибо', emoji: '🙏' },
        { french: 'Oui', russian: 'Да', emoji: '✅' },
        { french: 'Non', russian: 'Нет', emoji: '❌' }
      ]
    },
    {
      id: 3,
      type: 'choice',
      question: 'Что означает "Au revoir"?',
      image: '👋',
      options: ['До свидания', 'Привет', 'Спасибо', 'Пожалуйста'],
      correct: 0,
      audio: 'Au revoir'
    },
    {
      id: 4,
      type: 'choice',
      question: 'Как сказать "Спасибо"?',
      image: '🙏',
      options: ['Oui', 'Merci', 'Non', 'Salut'],
      correct: 1,
      audio: 'Merci'
    },
    {
      id: 5,
      type: 'letters',
      question: 'Составь слово "MERCI"',
      word: 'MERCI',
      letters: ['M', 'E', 'R', 'C', 'I', 'A', 'B', 'S']
    }
  ],

  // Модуль 2: Алфавит
  2: [
    {
      id: 1,
      type: 'choice',
      question: 'Какая это буква?',
      image: '🔤',
      display: 'A',
      options: ['A (а)', 'E (э)', 'I (и)', 'O (о)'],
      correct: 0,
      audio: 'A'
    },
    {
      id: 2,
      type: 'choice',
      question: 'Выбери правильную букву "B"',
      image: '📝',
      display: 'B',
      options: ['B (бэ)', 'D (дэ)', 'P (пэ)', 'V (вэ)'],
      correct: 0,
      audio: 'B'
    },
    {
      id: 3,
      type: 'match',
      question: 'Соедини буквы с произношением',
      pairs: [
        { french: 'C', russian: 'сэ', emoji: '🔤' },
        { french: 'D', russian: 'дэ', emoji: '📝' },
        { french: 'E', russian: 'э', emoji: '✏️' },
        { french: 'F', russian: 'эф', emoji: '📖' }
      ]
    },
    {
      id: 4,
      type: 'letters',
      question: 'Составь алфавит: A, B, C',
      word: 'ABC',
      letters: ['A', 'B', 'C', 'D', 'E', 'F', 'X', 'Z']
    },
    {
      id: 5,
      type: 'choice',
      question: 'Сколько букв во французском алфавите?',
      image: '🔢',
      options: ['26', '30', '33', '24'],
      correct: 0,
      audio: 'vingt-six'
    }
  ],

  // Модуль 13: Произношение
  13: [
    {
      id: 1,
      type: 'pronunciation',
      question: 'Произнеси слово "Bonjour"',
      targetWord: 'Bonjour',
      image: '👋',
      hint: 'Бонжур'
    },
    {
      id: 2,
      type: 'pronunciation',
      question: 'Произнеси слово "Merci"',
      targetWord: 'Merci',
      image: '🙏',
      hint: 'Мерси'
    },
    {
      id: 3,
      type: 'pronunciation',
      question: 'Произнеси "Je m\'appelle"',
      targetWord: 'Je m\'appelle',
      image: '👤',
      hint: 'Же мапель'
    },
    {
      id: 4,
      type: 'pronunciation',
      question: 'Произнеси "Au revoir"',
      targetWord: 'Au revoir',
      image: '👋',
      hint: 'О ревуар'
    },
    {
      id: 5,
      type: 'pronunciation',
      question: 'Произнеси "S\'il vous plaît"',
      targetWord: 'S\'il vous plaît',
      image: '🙏',
      hint: 'Силь ву пле'
    }
  ],

  // Модуль 14: Грамматика
  14: [
    {
      id: 1,
      type: 'grammar',
      question: 'Напиши "Привет" по-французски',
      correctAnswer: 'Bonjour',
      hint: 'Начинается с B...',
      image: '👋'
    },
    {
      id: 2,
      type: 'grammar',
      question: 'Напиши "Спасибо"',
      correctAnswer: 'Merci',
      hint: 'Начинается с M...',
      image: '🙏'
    },
    {
      id: 3,
      type: 'grammar',
      question: 'Напиши "До свидания"',
      correctAnswer: 'Au revoir',
      hint: 'Два слова: Au...',
      image: '👋'
    },
    {
      id: 4,
      type: 'grammar',
      question: 'Напиши "Да"',
      correctAnswer: 'Oui',
      hint: 'Три буквы...',
      image: '✅'
    },
    {
      id: 5,
      type: 'grammar',
      question: 'Напиши "Нет"',
      correctAnswer: 'Non',
      hint: 'Три буквы...',
      image: '❌'
    }
  ]
};

export const getModuleExercises = (moduleId: number): Exercise[] => {
  return exercisesData[moduleId] || [];
};