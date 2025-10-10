import type { Exercise } from '../../types/index';

export const module1Exercises: Exercise[] = [
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
];