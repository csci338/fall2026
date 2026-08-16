// Import for type guard
import { JavaScriptDOMQuestion, JavaScriptDOMTestCase, TestResults } from './javascript-dom/types';

export interface QuizQuestionVariant {
  question: string;
  options?: string[];
  correct?: number | number[];
  explanation?: string;
}

export interface QuizQuestion {
  id: string;
  question?: string;
  strand?: string;
  options?: string[];  // Optional (not needed for JS/DOM questions)
  type?: 'multiple-choice' | 'select-all' | 'javascript-dom';
  correct?: number | number[];  // Optional (not needed for JS/DOM questions)
  explanation?: string;
  variants?: Record<string, QuizQuestionVariant>;
  
  // Fields for JavaScript DOM questions
  htmlTemplate?: string;
  cssTemplate?: string;
  codeTemplate?: string;
  testCases?: JavaScriptDOMTestCase[];  // Will be typed as JavaScriptDOMTestCase when type is 'javascript-dom'
  testCode?: string;  // JavaScript test code (new format)
}

// Type guard helper
export function isJavaScriptDOMQuestion(question: QuizQuestion): question is JavaScriptDOMQuestion {
  return question.type === 'javascript-dom';
}

export interface QuizData {
  quizName?: string;
  showStrandResults?: boolean;
  strandThreshold?: number;
  strandLabels?: Record<string, string>;
  languages?: string[];
  defaultLanguage?: string;
  start_date?: string;
  draft?: number;
  folder?: string;
  cheatsheet?: string;
  questions: QuizQuestion[];
}

export function resolveQuestionForLanguage(question: QuizQuestion, language: string): QuizQuestion {
  const variant = question.variants?.[language];
  if (!variant) {
    return { ...question };
  }
  return {
    ...question,
    question: variant.question,
    options: variant.options ?? question.options,
    correct: variant.correct ?? question.correct,
    explanation: variant.explanation ?? question.explanation,
  };
}

export interface QuizState {
  selectedAnswers: { 
    [questionId: string]: string | string[] | { 
      html: string; 
      css: string; 
      js: string; 
      testResults?: TestResults;
    } 
  }; // Store option text for multiple-choice, or code for JS/DOM questions
  score: number;
  completed: boolean;
  timestamp: number;
  randomMode?: boolean; // Store the random mode state when saving
  revealedQuestions?: string[]; // Store array of revealed question IDs (Set is not JSON serializable)
}

export interface ResourceQuizProps {
  quizData: QuizData;
  resourceSlug: string;
  variant?: 'mobile' | 'desktop';
  cheatsheetContent?: string;
}
