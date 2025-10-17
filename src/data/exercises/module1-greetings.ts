import type { Exercise } from '../../types/index';

export const module1Exercises: Exercise[] = [
  {
    id: 1,
    type: 'choice',
    question: 'Cum spui "Salut" în franceză?',
    image: '👋',
    options: ['Bonjour', 'Au revoir', 'Merci', 'Oui'],
    correct: 0,
    audio: 'Bonjour'
  },
  {
    id: 2,
    type: 'match',
    question: 'Găsește perechea corectă!',
    pairs: [
      { french: 'Bonjour', russian: 'Salut', emoji: '👋' },
      { french: 'Merci', russian: 'Mulțumesc', emoji: '🙏' },
      { french: 'Oui', russian: 'Da', emoji: '✅' },
      { french: 'Non', russian: 'Nu', emoji: '❌' }
    ]
  },
  {
    id: 3,
    type: 'choice',
    question: 'Ce înseamnă "Au revoir"?',
    image: '👋',
    options: ['До свидания', 'Привет', 'Спасибо', 'Пожалуйста'],
    correct: 0,
    audio: 'Au revoir'
  },
  {
    id: 4,
    type: 'choice',
    question: 'Cum spui "Mulțumesc"?',
    image: '🙏',
    options: ['Oui', 'Merci', 'Non', 'Salut'],
    correct: 1,
    audio: 'Merci'
  },
  {
    id: 5,
    type: 'letters',
    question: 'Compune cuvântul "MERCI"',
    word: 'MERCI',
    letters: ['M', 'E', 'R', 'C', 'I', 'A', 'B', 'S']
  }
];