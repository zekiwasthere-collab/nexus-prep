export interface Question {
  id: number;
  moduleIndex: number;
  courseName: string;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  blueprintTopic: string;
}

export interface StudyConcept {
  term: string;
  definition: string;
  visualIcon?: string;
  bulletPoints?: string[];
}

export interface CourseModule {
  index: number;
  id: string;
  title: string;
  shortDesc: string;
  academicUnit: string;
  objectives: string[];
  keyConcepts: StudyConcept[];
  summaryNote: string;
}

export interface UserProgress {
  answeredCount: number;
  correctAnswers: number;
  scoresPerModule: Record<number, number>; // moduleIndex -> high score out of 10
  bookmarks: number[]; // question IDs
  completedStudyModules: string[]; // module IDs
  mockExamHistory: MockExamResult[];
}

export interface MockExamResult {
  date: string;
  score: number;
  totalQuestions: number;
  timeSpentSeconds: number;
  completed: boolean;
}
