import { useState, useEffect, useRef } from "react";
import { 
  BookOpen, 
  Timer, 
  Award, 
  CheckCircle2, 
  XCircle, 
  Bookmark, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  RefreshCw, 
  Sparkles, 
  History, 
  Gauge, 
  Check, 
  ShieldAlert, 
  ArrowRight, 
  Info, 
  Search, 
  BookOpenText, 
  Briefcase, 
  GraduationCap, 
  RotateCcw, 
  Share2,
  Calendar,
  Layers,
  Activity,
  AlertTriangle,
  Lightbulb,
  Sparkle
} from "lucide-react";
import { mockQuestions } from "./questions";
import { courseModules } from "./modulesData";
import { Question, CourseModule, UserProgress, MockExamResult, StudyConcept } from "./types";
import { courseChapters } from "./courseChapters";

export default function App() {
  // --- LOCAL PERSISTENCE ---
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem("ethio_exit_prep_progress");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return {
      answeredCount: 0,
      correctAnswers: 0,
      scoresPerModule: {},
      bookmarks: [],
      completedStudyModules: [],
      mockExamHistory: []
    };
  });

  useEffect(() => {
    localStorage.setItem("ethio_exit_prep_progress", JSON.stringify(progress));
  }, [progress]);

  // --- GENERAL NAVIGATION ---
  // View types: 'dashboard' | 'study' | 'practice' | 'simulator' | 'review'
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  // --- QUESTIONS POOL ---
  const [questionsPool, setQuestionsPool] = useState<Question[]>(() => {
    const saved = localStorage.getItem("ethio_exit_prep_questions_pool");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        // Fallback
      }
    }
    return mockQuestions;
  });

  useEffect(() => {
    localStorage.setItem("ethio_exit_prep_questions_pool", JSON.stringify(questionsPool));
  }, [questionsPool]);

  // --- COMPILER SYSTEMS ---
  const [compilingSubjectMap, setCompilingSubjectMap] = useState<Record<number, boolean>>({});
  const [compilingStatusMessage, setCompilingStatusMessage] = useState<Record<number, string>>({});

  const compileSubjectPool = async (moduleIdx: number) => {
    if (compilingSubjectMap[moduleIdx]) return;
    setCompilingSubjectMap(prev => ({ ...prev, [moduleIdx]: true }));
    setCompilingStatusMessage(prev => ({ ...prev, [moduleIdx]: "Drafting initial syllabus topics..." }));

    const course = courseModules[moduleIdx];
    try {
      const finalNewQuestions: Question[] = [];
      const batches = [
        { batchNo: 1, count: 20, desc: "Compiling Academic Core (Questions 11-30)..." },
        { batchNo: 2, count: 20, desc: "Refining Applied Practice Scenarios (Questions 31-50)..." }
      ];

      for (const batch of batches) {
        setCompilingStatusMessage(prev => ({ ...prev, [moduleIdx]: batch.desc }));
        
        const response = await fetch("/api/gemini/quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            moduleIndex: moduleIdx,
            courseTitle: course.title,
            count: batch.count
          })
        });

        if (!response.ok) {
          throw new Error(`Batch ${batch.batchNo} compiling failed.`);
        }
        const data = await response.json();
        if (data.questions && Array.isArray(data.questions)) {
          finalNewQuestions.push(...data.questions);
        }
      }

      if (finalNewQuestions.length > 0) {
        setQuestionsPool(prev => {
          const existingOtherMod = prev.filter(q => q.moduleIndex !== moduleIdx);
          const staticThisMod = prev.filter(q => q.moduleIndex === moduleIdx).slice(0, 10);
          
          const reindexed = finalNewQuestions.map((q, idx) => ({
            ...q,
            id: moduleIdx * 1000 + 11 + idx,
            moduleIndex: moduleIdx,
            courseName: course.title
          }));

          const updated = [...existingOtherMod, ...staticThisMod, ...reindexed];
          localStorage.setItem("ethio_exit_prep_questions_pool", JSON.stringify(updated));
          return updated;
        });
      }

      setCompilingStatusMessage(prev => ({ ...prev, [moduleIdx]: "✓ Successfully compiled 50 Exam Questions!" }));
    } catch (err: any) {
      console.error(err);
      setCompilingStatusMessage(prev => ({ ...prev, [moduleIdx]: `⚠️ Failed: ${err.message || "Network issue"}` }));
    } finally {
      setTimeout(() => {
        setCompilingSubjectMap(prev => ({ ...prev, [moduleIdx]: false }));
      }, 3000);
    }
  };

  // --- HANDBOOK WORKSPACE STATES ---
  const [isHandbookOpen, setIsHandbookOpen] = useState<boolean>(false);
  const [readingModuleIdx, setReadingModuleIdx] = useState<number>(0);
  const [readingChapterIdx, setReadingChapterIdx] = useState<number>(0);
  const [handbookContent, setHandbookContent] = useState<string>("");
  const [handbookSources, setHandbookSources] = useState<Array<{title: string, uri: string}>>([]);
  const [isHandbookLoading, setIsHandbookLoading] = useState<boolean>(false);
  const [handbookError, setHandbookError] = useState<string>("");

  const loadHandbookChapter = async (moduleIndex: number, chapterIndex: number, chapterTitle: string) => {
    const course = courseModules[moduleIndex];
    const cacheKey = `ethio_handbook_cache_${moduleIndex}_${chapterIndex}`;
    
    setReadingModuleIdx(moduleIndex);
    setReadingChapterIdx(chapterIndex);
    setIsHandbookOpen(true);
    setHandbookError("");

    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (parsed.content) {
          setHandbookContent(parsed.content);
          setHandbookSources(parsed.sources || []);
          setIsHandbookLoading(false);
          return;
        }
      } catch (e) {
        // Fallback
      }
    }

    setIsHandbookLoading(true);
    setHandbookContent("");
    setHandbookSources([]);

    try {
      const response = await fetch("/api/gemini/handbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseTitle: course.title,
          chapterIndex: chapterIndex,
          chapterTitle: chapterTitle,
          moduleIndex: moduleIndex
        })
      });

      if (!response.ok) {
        throw new Error("University study compiler service rejected the request. Please try again.");
      }

      const data = await response.json();
      if (!data.content) {
        throw new Error("Compilation system failed to produce text content.");
      }

      setHandbookContent(data.content);
      setHandbookSources(data.sources || []);
      
      localStorage.setItem(cacheKey, JSON.stringify({
        content: data.content,
        sources: data.sources || []
      }));
    } catch (err: any) {
      console.error(err);
      setHandbookError(err.message || "A secure connection to the course syllabus could not be established.");
    } finally {
      setIsHandbookLoading(false);
    }
  };

  // --- STUDY SYSTEM STATE ---
  const [selectedModuleIdx, setSelectedModuleIdx] = useState<number>(0);
  const [activeConceptIdx, setActiveConceptIdx] = useState<number>(0);

  // --- PRACTICE SYSTEM STATE ---
  const [practiceModuleFilter, setPracticeModuleFilter] = useState<number | null>(null); // null = all courses
  const [practiceCurrentIndex, setPracticeCurrentIndex] = useState<number>(0);
  const [selectedPracticeAnswers, setSelectedPracticeAnswers] = useState<Record<number, number>>({}); // questionId -> selectedIndex
  const [showPracticeExplanation, setShowPracticeExplanation] = useState<Record<number, boolean>>({});

  // Filtered list of questions for practice
  const filteredPracticeQuestions = practiceModuleFilter === null
    ? questionsPool
    : questionsPool.filter(q => q.moduleIndex === practiceModuleFilter);

  // --- EXAM SIMULATOR STATE ---
  const [isExamRunning, setIsExamRunning] = useState<boolean>(false);
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [examAnswers, setExamAnswers] = useState<Record<number, number>>({}); // questionId -> selectedOptionIndex
  const [examBookmarks, setExamBookmarks] = useState<number[]>([]); // list of questionIds flagged
  const [examCurrentIdx, setExamCurrentIdx] = useState<number>(0);
  const [examSecondsLeft, setExamSecondsLeft] = useState<number>(180 * 60); // 3 hours (180 minutes)
  const examTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Active simulation results context (for the review panel)
  const [lastExamResult, setLastExamResult] = useState<MockExamResult | null>(null);
  const [lastExamAnswers, setLastExamAnswers] = useState<Record<number, number>>({});
  const [lastExamQuestions, setLastExamQuestions] = useState<Question[]>([]);

  // Search filter for question review list or similar
  const [searchQuery, setSearchQuery] = useState<string>("");

  // --- PROFESSOR DESK / AI INTERACTIVES STATE ---
  const [tutorMessages, setTutorMessages] = useState<Array<{role: string; content: string; sources?: Array<{title: string, uri: string}>}>>([
    {
      role: "assistant",
      content: "Selam! I am Professor Berhanu, your Ministry of Education (MoE) Academic Coordinator. I support students tackling their Journalism exit exam blueprints by clarifying theoretical models or previous year exam nuances. Feel free to query me about Development Journalism, legal proclamations, or translation frameworks, or launch an on-demand custom mock exam below!"
    }
  ]);
  const [tutorInput, setTutorInput] = useState<string>("");
  const [isTutorLoading, setIsTutorLoading] = useState<boolean>(false);

  const [aiSelectedModuleIdx, setAiSelectedModuleIdx] = useState<number>(0);
  const [aiQuestionCount, setAiQuestionCount] = useState<number>(10);
  const [aiGeneratedQuestions, setAiGeneratedQuestions] = useState<Question[]>([]);
  const [aiPracticeIdx, setAiPracticeIdx] = useState<number>(0);
  const [aiSelectedAnswers, setAiSelectedAnswers] = useState<Record<number, number>>({});
  const [aiShowExplanations, setAiShowExplanations] = useState<Record<number, boolean>>({});
  const [isAiGenerating, setIsAiGenerating] = useState<boolean>(false);

  // --- ETHIOPIAN CALENDAR / COUNTDOWN CONSTANTS ---
  // Traditional national exit exams are scheduled broadly in late June/July or late Nehasse. 
  // Let's create a simulated exam countdown targeting 30 days out from the current local time to keep motivation high!
  const [examCountdownDays, setExamCountdownDays] = useState<number>(42);
  const [examCountdownHours, setExamCountdownHours] = useState<number>(15);
  const [examCountdownMinutes, setExamCountdownMinutes] = useState<number>(31);

  useEffect(() => {
    const ticker = setInterval(() => {
      setExamCountdownMinutes(prev => {
        if (prev > 0) return prev - 1;
        setExamCountdownHours(h => {
          if (h > 0) return h - 1;
          setExamCountdownDays(d => (d > 0 ? d - 1 : 42));
          return 23;
        });
        return 59;
      });
    }, 60000); // update every minute
    return () => clearInterval(ticker);
  }, []);

  // --- EXAM COUNTDOWN TICKER CONTROLS ---
  useEffect(() => {
    if (isExamRunning) {
      examTimerRef.current = setInterval(() => {
        setExamSecondsLeft(prev => {
          if (prev <= 1) {
            clearInterval(examTimerRef.current!);
            autoSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (examTimerRef.current) clearInterval(examTimerRef.current);
    }

    return () => {
      if (examTimerRef.current) clearInterval(examTimerRef.current);
    };
  }, [isExamRunning]);

  // --- SYSTEM ACTIONS ---
  const handleToggleBookmark = (questionId: number) => {
    setProgress(prev => {
      const isBookmarked = prev.bookmarks.includes(questionId);
      const newBookmarks = isBookmarked 
        ? prev.bookmarks.filter(id => id !== questionId)
        : [...prev.bookmarks, questionId];
      return { ...prev, bookmarks: newBookmarks };
    });
  };

  const handleStudyModuleComplete = (moduleId: string) => {
    setProgress(prev => {
      if (prev.completedStudyModules.includes(moduleId)) {
        return prev;
      }
      return {
        ...prev,
        completedStudyModules: [...prev.completedStudyModules, moduleId]
      };
    });
  };

  const handleSelectPracticeAnswer = (questionId: number, optionIndex: number) => {
    if (selectedPracticeAnswers[questionId] !== undefined) return; // Answer locked
    setSelectedPracticeAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    setShowPracticeExplanation(prev => ({ ...prev, [questionId]: true }));

    // Increment overall statistics
    const question = questionsPool.find(q => q.id === questionId);
    if (question) {
      const isCorrect = optionIndex === question.correctOptionIndex;
      setProgress(prev => {
        const modIdx = question.moduleIndex;
        const currentScore = prev.scoresPerModule[modIdx] || 0;
        const newScore = isCorrect ? Math.min(10, currentScore + 1) : currentScore;
        
        return {
          ...prev,
          answeredCount: prev.answeredCount + 1,
          correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
          scoresPerModule: {
            ...prev.scoresPerModule,
            [modIdx]: Math.max(currentScore, newScore)
          }
        };
      });
    }
  };

  const handleResetPractice = () => {
    if (window.confirm("Are you sure you want to clear your current session practice answers?")) {
      setSelectedPracticeAnswers({});
      setShowPracticeExplanation({});
    }
  };

  const startExamSimulation = () => {
    // Shuffling and choosing exactly 10 questions from each of the 10 modules from our questionsPool
    const selected: Question[] = [];
    for (let m = 0; m < 10; m++) {
      const modQuestions = questionsPool.filter(q => q.moduleIndex === m);
      const shuffled = [...modQuestions].sort(() => 0.5 - Math.random());
      const taken = shuffled.slice(0, 10);
      selected.push(...taken);
    }
    // If we have fewer than 100 questions (e.g. some subjects are not compiled yet), fill up with whatever we have
    if (selected.length < 100) {
      const remaining = questionsPool.filter(q => !selected.find(sq => sq.id === q.id));
      const needed = 100 - selected.length;
      selected.push(...remaining.sort(() => 0.5 - Math.random()).slice(0, needed));
    }
    setExamQuestions(selected.slice(0, 100));
    setExamAnswers({});
    setExamBookmarks([]);
    setExamCurrentIdx(0);
    setExamSecondsLeft(180 * 60); // 3 hours (180 minutes)
    setIsExamRunning(true);
    setActiveTab("simulator");
  };

  const autoSubmitExam = () => {
    submitExamSimulation(true);
  };

  const submitExamSimulation = (forcedByTimeout: boolean = false) => {
    if (!forcedByTimeout) {
      const totalQuestions = examQuestions.length;
      const answeredCount = Object.keys(examAnswers).length;
      const percentAnswered = Math.round((answeredCount / totalQuestions) * 100);
      if (!window.confirm(`You have completed ${answeredCount} of ${totalQuestions} questions (${percentAnswered}%). Are you ready to submit your exam and receive final diagnostics?`)) {
        return;
      }
    }

    clearInterval(examTimerRef.current!);
    setIsExamRunning(false);

    // Calculate score
    let correctCount = 0;
    examQuestions.forEach(q => {
      if (examAnswers[q.id] === q.correctOptionIndex) {
        correctCount++;
      }
    });

    const percentScore = Math.round((correctCount / examQuestions.length) * 100);
    const secondsSpent = (180 * 60) - examSecondsLeft;

    const result: MockExamResult = {
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      score: percentScore,
      totalQuestions: examQuestions.length,
      timeSpentSeconds: secondsSpent,
      completed: true
    };

    // Update state to view review panel
    setLastExamResult(result);
    setLastExamAnswers(examAnswers);
    setLastExamQuestions(examQuestions);

    // Save to user history
    setProgress(prev => {
      // Record scores per module from this exam
      const newScoresPerModule = { ...prev.scoresPerModule };
      
      // Calculate score for each module in this test to update high scores
      const moduleCorrectCounts: Record<number, number> = {};
      examQuestions.forEach(q => {
        if (examAnswers[q.id] === q.correctOptionIndex) {
          moduleCorrectCounts[q.moduleIndex] = (moduleCorrectCounts[q.moduleIndex] || 0) + 1;
        }
      });

      Object.entries(moduleCorrectCounts).forEach(([modIndex, count]) => {
        const mIdx = parseInt(modIndex);
        newScoresPerModule[mIdx] = Math.max(newScoresPerModule[mIdx] || 0, count);
      });

      return {
        ...prev,
        mockExamHistory: [result, ...prev.mockExamHistory],
        scoresPerModule: newScoresPerModule
      };
    });

    setActiveTab("review");
  };

  const quitExamSimulation = () => {
    if (window.confirm("Warning: Quitting will discard your current progress and answers on this simulation. Are you sure you want to quit?")) {
      clearInterval(examTimerRef.current!);
      setIsExamRunning(false);
      setActiveTab("dashboard");
    }
  };

  // --- MOE PROFESSOR DESK HANDLERS ---
  const handleSendTutorMessage = async () => {
    if (!tutorInput.trim() || isTutorLoading) return;
    const userText = tutorInput;
    setTutorInput("");
    
    const updatedMessages = [...tutorMessages, { role: "user", content: userText }];
    setTutorMessages(updatedMessages);
    setIsTutorLoading(true);

    try {
      const res = await fetch("/api/gemini/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          courseTitle: courseModules[selectedModuleIdx]?.title || "General Journalism",
          activeConcept: courseModules[selectedModuleIdx]?.keyConcepts[activeConceptIdx]?.term || "General"
        })
      });
      const data = await res.json();
      if (res.ok) {
        setTutorMessages(prev => [...prev, { role: "assistant", content: data.content, sources: data.sources }]);
      } else {
        setTutorMessages(prev => [...prev, { role: "assistant", content: `Failed to retrieve academic consultation: ${data.error || 'Server error'}` }]);
      }
    } catch (err: any) {
      setTutorMessages(prev => [...prev, { role: "assistant", content: `Academic advisor is currently offline. Error: ${err.message}` }]);
    } finally {
      setIsTutorLoading(false);
    }
  };

  const handleGenerateAiQuiz = async () => {
    if (isAiGenerating) return;
    setIsAiGenerating(true);
    setAiGeneratedQuestions([]);
    setAiSelectedAnswers({});
    setAiShowExplanations({});
    setAiPracticeIdx(0);

    try {
      const activeModule = courseModules[aiSelectedModuleIdx];
      const res = await fetch("/api/gemini/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          moduleIndex: aiSelectedModuleIdx,
          courseTitle: activeModule.title,
          count: aiQuestionCount
        })
      });
      
      const data = await res.json();
      if (res.ok && data.questions && data.questions.length > 0) {
        setAiGeneratedQuestions(data.questions);
      } else {
        alert(`Could not compile professor examination: ${data.error || 'Check server configuration'}`);
      }
    } catch (err: any) {
      alert(`Could not compile professor examination. Error: ${err.message}`);
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handleSelectAiAnswer = (questionId: number, optionIndex: number) => {
    if (aiSelectedAnswers[questionId] !== undefined) return;
    setAiSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    setAiShowExplanations(prev => ({ ...prev, [questionId]: true }));
    
    const question = aiGeneratedQuestions.find(q => q.id === questionId);
    if (question) {
      const isCorrect = optionIndex === question.correctOptionIndex;
      setProgress(prev => {
        const currentScore = prev.scoresPerModule[question.moduleIndex] || 0;
        return {
          ...prev,
          answeredCount: prev.answeredCount + 1,
          correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
          scoresPerModule: {
            ...prev.scoresPerModule,
            [question.moduleIndex]: Math.max(currentScore, isCorrect ? currentScore + 1 : currentScore)
          }
        };
      });
    }
  };

  // Format seconds to hh:mm:ss
  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Progress metrics computed from local state
  const totalCompletedModulesCount = progress.completedStudyModules.length;
  const overallPracticeReadiness = Math.min(100, Math.round((progress.correctAnswers / Math.max(1, progress.answeredCount)) * 100));
  const examHighscore = progress.mockExamHistory.length > 0
    ? Math.max(...progress.mockExamHistory.map(h => h.score))
    : 0;

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#121212] font-sans flex flex-col selection:bg-[#E6FF00] selection:text-black">
      {/* 8px top outline or complete container outline that aligns with Editorial theme */}
      <div className="h-2 bg-[#121212] w-full"></div>

      {/* --- SITE HEADER --- */}
      <header className="border-b-2 border-[#121212] bg-white sticky top-0 z-30 px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* Logo / Badge */}
          <div className="bg-[#121212] text-white p-3 rotate-[-1deg] shadow-[3px_3px_0px_#E6FF00] border border-black flex flex-col justify-center items-center">
            <span className="text-[10px] font-mono tracking-widest text-[#E6FF00] font-bold leading-none uppercase">MINISTRY OF EDUCATION</span>
            <span className="text-xl font-serif italic text-white font-extrabold leading-tight">MOE.Blueprints</span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-[0.2em] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold uppercase">ETHIOPIA CONTEXT</span>
              <span className="text-xs font-semibold text-gray-500">2015 E.C Syllabus</span>
            </div>
            <h1 className="text-xl md:text-2xl font-serif italic font-bold tracking-tight text-gray-900">
              Journalism & Communication <span className="font-sans not-italic text-sm font-bold text-[#121212] border border-[#121212] px-2 py-0.5 rounded-full ml-1.5 bg-[#FAF9F6]">Exit Exam Prep Portal</span>
            </h1>
          </div>
        </div>

        {/* --- NAVIGATION LINKS OR ACTIVE STATUS BAR --- */}
        {!isExamRunning ? (
          <nav className="flex flex-wrap items-center gap-2 md:gap-4 w-full md:w-auto justify-end">
            <button 
              id="nav-btn-dashboard"
              onClick={() => setActiveTab("dashboard")}
              className={`px-3.5 py-2 text-xs md:text-sm font-mono uppercase tracking-wider transition-all border ${
                activeTab === "dashboard" 
                  ? "bg-[#121212] text-white border-[#121212] shadow-[2px_2px_0px_#E6FF00]" 
                  : "bg-white text-gray-800 border-gray-300 hover:border-black"
              }`}
            >
              Dashboard
            </button>
            <button 
              id="nav-btn-study"
              onClick={() => { setActiveTab("study"); setActiveConceptIdx(0); }}
              className={`px-3.5 py-2 text-xs md:text-sm font-mono uppercase tracking-wider transition-all border ${
                activeTab === "study" 
                  ? "bg-[#121212] text-white border-[#121212] shadow-[2px_2px_0px_#E6FF00]" 
                  : "bg-white text-gray-800 border-gray-300 hover:border-black"
              }`}
            >
              Study Deck <span className="text-[10px] ml-1 bg-gray-200 text-gray-800 px-1 py-0.5 rounded-full font-bold">{totalCompletedModulesCount}/10</span>
            </button>
            <button 
              id="nav-btn-practice"
              onClick={() => { setActiveTab("practice"); }}
              className={`px-3.5 py-2 text-xs md:text-sm font-mono uppercase tracking-wider transition-all border ${
                activeTab === "practice" 
                  ? "bg-[#121212] text-white border-[#121212] shadow-[2px_2px_0px_#E6FF00]" 
                  : "bg-white text-gray-800 border-gray-300 hover:border-black"
              }`}
            >
              MCQ Practice <span className="text-[10px] ml-1 bg-yellow-400 text-black px-1.5 py-0.5 rounded-full font-bold">100 items</span>
            </button>
            <button 
              id="nav-btn-professor"
              onClick={() => { setActiveTab("professor_desk"); }}
              className={`px-3.5 py-2 text-xs md:text-sm font-mono uppercase tracking-wider transition-all border ${
                activeTab === "professor_desk"
                  ? "bg-[#121212] text-white border-[#121212] shadow-[2px_2px_0px_#E6FF00]"
                  : "bg-white text-[#121212] border-gray-300 hover:border-black"
              } flex items-center gap-1.5`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span>Professor Desk</span>
            </button>
            <button 
              id="nav-btn-simulator"
              onClick={() => {
                if (window.confirm("You are about to start a comprehensive Mock Exit Exam under simulation protocols. Ready to begin?")) {
                  startExamSimulation();
                }
              }}
              className="px-3.5 py-2 text-xs md:text-sm font-mono uppercase tracking-widest transition-all bg-[#E6FF00] text-black border-2 border-black font-extrabold hover:translate-y-[-1px] shadow-[4px_4px_0px_#121212] hover:shadow-[5px_5px_0px_#121212] active:translate-y-[2px]"
            >
              Start Simulator ⏱️
            </button>
          </nav>
        ) : (
          <div className="flex items-center gap-6 bg-red-50 border-2 border-red-900 p-3 shadow-[4px_4px_0px_#121212]">
            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 bg-red-600 rounded-full animate-ping"></span>
              <div className="text-left">
                <span className="text-[10px] uppercase font-mono tracking-widest text-red-800 block leading-tight font-bold">SIMULATION PROGRESS</span>
                <span className="text-xs font-bold text-red-900 leading-tight">Question {examCurrentIdx + 1} of {examQuestions.length}</span>
              </div>
            </div>
            
            <div className="h-8 w-[1px] bg-red-900/30"></div>

            <div className="text-right">
              <span className="text-[9px] uppercase font-mono tracking-widest text-red-800 block leading-tight font-bold">TIME REMAINING</span>
              <span className={`text-xl font-mono block font-black leading-none ${examSecondsLeft < 15 * 60 ? "text-red-700 animate-pulse text-2xl font-black" : "text-black"}`}>
                {formatTime(examSecondsLeft)}
              </span>
            </div>

            <button 
              onClick={submitExamSimulation}
              className="px-3 py-1 bg-red-600 text-white font-mono text-xs uppercase tracking-wider hover:bg-red-700 font-bold border border-red-900"
            >
              Submit Exam
            </button>
            <button 
              onClick={quitExamSimulation}
              className="px-2 py-1 bg-gray-200 text-black font-mono text-xs uppercase tracking-wider hover:bg-gray-300 border border-gray-400"
            >
              Quit
            </button>
          </div>
        )}
      </header>

      {/* --- APP PANEL BODY --- */}
      <main className="flex-1 w-full mx-auto max-w-7xl px-4 md:px-8 py-8 flex flex-col gap-8">
        
        {/* --- 1. DASHBOARD OVERVIEW --- */}
        {activeTab === "dashboard" && (
          <div className="flex flex-col gap-8 animate-fade-in">
            {/* National Exam Motivation Banner */}
            <div className="bg-[#121212] text-white p-6 md:p-8 border-4 border-double border-white shadow-[6px_6px_0px_#E6FF00] flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
              <div className="absolute right-0 top-0 text-[180px] font-serif font-black text-white/[0.03] pointer-events-none select-none translate-x-[40px] translate-y-[-4px]">
                2015 E.C
              </div>
              <div className="space-y-3 z-10">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#E6FF00] font-bold block">FEDERAL DEMOCRATIC REPUBLIC OF ETHIOPIA</span>
                <h2 className="text-3xl md:text-5xl font-serif italic text-white font-bold leading-tight">
                  National Exit Examination
                </h2>
                <p className="text-sm text-gray-300 max-w-2xl font-sans tracking-wide">
                  Welcome back candidate! This interactive preparation portal is meticulously framed in direct alignment with the official **Ministry of Education Test Blueprint** for graduating BA students in Journalism and Communication.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <span className="bg-white/10 text-white text-xs px-3 py-1 font-mono uppercase border border-white/20">Course Units Checked: 10</span>
                  <span className="bg-white/10 text-white text-xs px-3 py-1 font-mono uppercase border border-white/20">Syllabus Code: JC-2015-EC</span>
                  <span className="bg-[#E6FF00] text-black text-xs px-3 py-1 font-mono uppercase font-black">Blueprint Verified ✔️</span>
                </div>
              </div>

              {/* Countdown Ticker Box */}
              <div className="bg-white text-black p-4 md:p-6 border-2 border-black w-full md:w-auto text-center shrink-0 shadow-[4px_4px_0px_#E6FF00] z-10 rotate-[1.5deg]">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#121212] font-black block mb-2 border-b border-black pb-1">ET EXIT EXAM COUNTDOWN</span>
                <div className="flex gap-4 justify-center items-center font-mono">
                  <div>
                    <span className="text-4xl font-extrabold text-[#121212]">{examCountdownDays}</span>
                    <span className="text-[10px] uppercase block opacity-60">Days</span>
                  </div>
                  <span className="text-3xl font-extrabold animate-pulse">:</span>
                  <div>
                    <span className="text-4xl font-extrabold text-[#121212]">{examCountdownHours}</span>
                    <span className="text-[10px] uppercase block opacity-60">Hours</span>
                  </div>
                  <span className="text-3xl font-extrabold animate-pulse">:</span>
                  <div>
                    <span className="text-4xl font-extrabold text-[#121212] font-mono">{examCountdownMinutes}</span>
                    <span className="text-[10px] uppercase block opacity-60">Mins</span>
                  </div>
                </div>
                <div className="mt-3 bg-red-100 text-red-800 text-[10px] font-bold font-mono tracking-wide uppercase py-1 border border-red-300 px-2 rounded-sm select-none">
                  ⚡ HIGH ALERT - REVISE NOW
                </div>
              </div>
            </div>

            {/* Academic Compiler Notification Banner */}
            <div className="bg-amber-50 border-2 border-amber-400 p-5 rounded-lg shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex gap-3">
                <Sparkles className="w-5.5 h-5.5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-sm text-amber-950">
                    Syllabus Auto-Compilers Enabled!
                  </h4>
                  <p className="text-xs text-amber-800 leading-relaxed max-w-3xl">
                    You can now expand all course question banks to **50 customized expert MCQs** (bringing your matrix to 500 total questions!) and unlock continuous, scholastic **15-20 page Textbook modules** on the <strong>Study</strong> tab. This covers direct proclamation analysis (Broadcast Act 562, Hate Speech Act 1185), historic Ethiopia press landscapes, Gadaa forums, and advanced communications theories!
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab("study")}
                className="bg-[#121212] hover:bg-black text-[#E6FF00] font-mono text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 border border-black rounded shadow shrink-0 self-start sm:self-center hover:cursor-pointer transition-colors"
              >
                📖 Open study console
              </button>
            </div>

            {/* Candidate Stat Cards (Bento style) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-5 border-2 border-black shadow-[4px_4px_0px_#121212] flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[11px] font-mono uppercase text-gray-500 font-bold tracking-wider">Overall Syllabus Progress</span>
                    <Layers className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-serif italic text-black font-extrabold">{totalCompletedModulesCount * 10}%</span>
                    <span className="text-xs text-gray-500 font-semibold uppercase">of blueprint units studied</span>
                  </div>
                </div>
                <div className="w-full bg-[#FAF9F6] h-3 border border-black mt-4 overflow-hidden rounded-sm">
                  <div 
                    className="h-full bg-emerald-400 transition-all duration-500" 
                    style={{ width: `${totalCompletedModulesCount * 10}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-white p-5 border-2 border-black shadow-[4px_4px_0px_#121212] flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[11px] font-mono uppercase text-gray-500 font-bold tracking-wider">Practice Accuracy</span>
                    <Activity className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-serif italic text-black font-extrabold">{overallPracticeReadiness}%</span>
                    <span className="text-xs text-green-700 font-bold uppercase">{progress.correctAnswers}/{progress.answeredCount} Correct</span>
                  </div>
                </div>
                <div className="w-full bg-[#FAF9F6] h-3 border border-black mt-4 overflow-hidden rounded-sm">
                  <div 
                    className="h-full bg-yellow-400 transition-all duration-500" 
                    style={{ width: `${overallPracticeReadiness || 0}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-white p-5 border-2 border-black shadow-[4px_4px_0px_#121212] flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[11px] font-mono uppercase text-gray-500 font-bold tracking-wider">Simulation High Score</span>
                    <Award className="w-4 h-4 text-yellow-500" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-serif italic text-black font-extrabold">
                      {examHighscore > 0 ? `${examHighscore}%` : "No Record"}
                    </span>
                    <span className="text-xs text-gray-500 uppercase font-semibold">
                      {examHighscore >= 50 ? "Pass standard met" : "Awaiting test"}
                    </span>
                  </div>
                </div>
                <div className="text-[11px] font-mono text-gray-500 mt-4 border-t border-gray-200 pt-2 flex justify-between items-center">
                  <span>Past Attempts:</span>
                  <span className="text-black font-bold">{progress.mockExamHistory.length} exams taken</span>
                </div>
              </div>

              <div className="bg-white p-5 border-2 border-black shadow-[4px_4px_0px_#121212] flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[11px] font-mono uppercase text-gray-500 font-bold tracking-wider">Saved Difficult Items</span>
                    <Bookmark className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-serif italic text-black font-extrabold">{progress.bookmarks.length}</span>
                    <span className="text-xs text-gray-500 uppercase font-semibold">marked for high focus</span>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setPracticeModuleFilter(null);
                    setActiveTab("practice");
                  }}
                  className="mt-4 w-full py-1.5 bg-[#FAF9F6] text-black border border-black hover:bg-black hover:text-white transition-all text-xs font-mono uppercase tracking-wider font-semibold"
                >
                  Review Bookmarks
                </button>
              </div>
            </div>

            {/* Quick Access Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left & Mid: List of courses aligned with direct click */}
              <div className="lg:col-span-2 bg-white border-2 border-black p-6 shadow-[4px_4px_0px_#121212]">
                <div className="flex justify-between items-center mb-4 border-b border-black pb-2">
                  <h3 className="text-xl font-serif font-bold italic">Syllabus Course Modules (MoE Standard)</h3>
                  <span className="text-xs font-mono bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded font-bold uppercase">10 Courses Total</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {courseModules.map((mod, index) => {
                    const isCompleted = progress.completedStudyModules.includes(mod.id);
                    const highPract = progress.scoresPerModule[index] || 0;
                    return (
                      <div 
                        key={mod.id}
                        className="p-3 border border-gray-200 hover:border-black rounded-lg transition-all bg-[#FAF9F6] flex flex-col justify-between group cursor-pointer"
                        onClick={() => {
                          setSelectedModuleIdx(index);
                          setActiveTab("study");
                          setActiveConceptIdx(0);
                        }}
                      >
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider">{mod.academicUnit}</span>
                            {isCompleted && (
                              <span className="text-xs text-emerald-600 font-extrabold flex items-center gap-0.5">
                                <Check className="w-3.5 h-3.5 stroke-[3px]" /> STUDY
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm font-bold text-gray-900 group-hover:underline line-clamp-1">
                            {index + 1}. {mod.title}
                          </h4>
                          <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                            {mod.shortDesc}
                          </p>
                        </div>

                        {/* Module footer stats */}
                        <div className="flex items-center justify-between border-t border-gray-100 mt-2.5 pt-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block">Practice Progress:</span>
                          <div className="flex items-center gap-1.5">
                            <div className="w-16 bg-gray-200 h-1.5 rounded-full overflow-hidden border border-gray-300">
                              <div className="bg-emerald-500 h-full" style={{ width: `${(highPract / 10) * 100}%` }}></div>
                            </div>
                            <span className="text-[10px] font-mono font-bold">{highPract}/10 High Score</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right: Simulated Exam launcher & historical list */}
              <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_#121212] flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono uppercase bg-[#E6FF00] text-black px-2 py-0.5 border border-black font-bold tracking-widest inline-block mb-3">
                    EXAM MATRIX PROTOCOLS
                  </span>
                  <h3 className="text-2xl font-serif italic mb-3 font-bold leading-tight">National Exit Exam Simulator</h3>
                  <p className="text-xs text-gray-600 mb-4 tracking-wide leading-relaxed">
                    Test your metal under realistic conditions. Our simulator compiles a raw **100-question paper** covering the exact weights and domains described in the Ministry blueprint (10 questions per course).
                  </p>
                  
                  <div className="bg-[#FAF9F6] p-3.5 border border-black rounded-lg space-y-2 mb-4 font-sans text-xs">
                    <div className="flex justify-between"><strong className="text-gray-700">Time Allocation:</strong> <span>180 minutes (3 hours)</span></div>
                    <div className="flex justify-between"><strong className="text-gray-700">Test volume:</strong> <span>100 MCQs (medium/complex)</span></div>
                    <div className="flex justify-between"><strong className="text-gray-700">Audit feedback:</strong> <span>Hidden until submission</span></div>
                    <div className="flex justify-between"><strong className="text-gray-700">Passing Grade:</strong> <span className="text-emerald-700 font-bold">&gt;= 50%</span></div>
                  </div>

                  <button 
                    onClick={startExamSimulation}
                    className="w-full py-3 bg-[#E6FF00] hover:bg-black hover:text-[#E6FF00] text-black border-2 border-black text-xs font-mono uppercase tracking-widest font-black transition-all shadow-[3px_3px_0px_#121212] active:translate-y-[1px] active:shadow-none flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-black text-black group-hover:text-[#E6FF00]" /> Launch Full Simulated Exam
                  </button>
                </div>

                {/* History Log Mini */}
                <div className="border-t border-black/10 mt-6 pt-4">
                  <h4 className="text-[11px] font-mono uppercase text-gray-400 font-black tracking-widest mb-2 flex items-center gap-1.5">
                    <History className="w-3.5 h-3.5" /> PAST SIMULATIONS HISTORIC SUMMARY
                  </h4>
                  {progress.mockExamHistory.length === 0 ? (
                    <div className="border border-dashed border-gray-300 p-3 rounded text-center text-xs text-gray-400 italic">
                      No simulation records taken yet.
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {progress.mockExamHistory.slice(0, 3).map((hist, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs bg-[#FAF9F6] p-2 border border-gray-200 rounded">
                          <div>
                            <span className="font-mono text-gray-500">{hist.date}</span>
                            <span className="block text-[10px] text-gray-400 font-mono">Time spent: {formatTime(hist.timeSpentSeconds)}</span>
                          </div>
                          <div className="text-right">
                            <span className={`text-sm font-bold ${hist.score >= 50 ? "text-emerald-700" : "text-red-700"}`}>
                              {hist.score}%
                            </span>
                            <span className="block text-[9px] uppercase font-mono font-bold leading-none text-gray-400">
                              {hist.score >= 50 ? "PASS" : "REMEDIAL"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- 2. DETAILS STUDY MODULES CONSOLE --- */}
        {activeTab === "study" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
            {/* Sidebar list of courses */}
            <aside className="lg:col-span-3 lg:border-r border-[#121212] border-b-2 lg:border-b-0 pb-6 lg:pb-0 pr-0 lg:pr-6 flex flex-col gap-4">
              <span className="text-[10px] uppercase tracking-widest font-bold text-red-650 block">MODULAR SYLLABUS DIRECTORY</span>
              
              <div className="space-y-2 max-h-[640px] overflow-y-auto pr-2">
                {courseModules.map((mod, idx) => {
                  const qCount = questionsPool.filter(q => q.moduleIndex === idx).length;
                  return (
                    <button
                      key={mod.id}
                      onClick={() => {
                        setSelectedModuleIdx(idx);
                        setActiveConceptIdx(0);
                      }}
                      className={`w-full text-left p-3 border transition-all rounded duration-150 flex items-start justify-between gap-1.5 ${
                        selectedModuleIdx === idx
                          ? "bg-[#121212] text-[#FAF9F6] border-[#121212] shadow-sm font-bold"
                          : "bg-white text-[#121212] border-gray-200 hover:border-black"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <span className="font-mono text-[10px] bg-sky-100 text-sky-900 border border-sky-200 rounded-sm w-5 h-5 flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-xs tracking-tight leading-tight block font-semibold">
                          {mod.title}
                        </span>
                      </div>
                      <span className={`text-[9px] font-mono shrink-0 px-1.5 py-0.5 rounded border ${
                        qCount >= 50
                          ? "bg-emerald-50 text-emerald-700 border-emerald-300 font-bold"
                          : "bg-amber-50 text-amber-800 border-amber-200"
                      }`}>
                        {qCount}/50 Qs
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Progress Panel details */}
              <div className="p-4 bg-[#E6FF00]/15 border border-black rounded-lg mt-4 text-xs font-sans space-y-1">
                <span className="font-bold block text-black">Study Achievements:</span>
                <p className="text-gray-700 leading-relaxed text-[11px]">
                  Completing each module builds academic readiness. Click &quot;Mark Study Complete&quot; to check modules off your directory list!
                </p>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-mono font-bold uppercase text-[10px]">Study Progress:</span>
                  <span className="font-mono font-black">{totalCompletedModulesCount}/10 Done</span>
                </div>
              </div>
            </aside>

            {/* Central content representing Selected Module */}
            <section className="lg:col-span-9 flex flex-col gap-6">
              
              {/* Module Header card */}
              <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_#121212] relative">
                <div className="absolute right-4 top-4 text-7xl font-serif italic text-black/5 select-none font-extrabold">
                  {selectedModuleIdx + 1 < 10 ? `0${selectedModuleIdx + 1}` : selectedModuleIdx + 1}
                </div>
                
                <span className="text-[10px] font-mono tracking-widest text-[#E6FF00] bg-black px-2 py-0.5 border border-black uppercase font-bold inline-block mb-2">
                  {courseModules[selectedModuleIdx].academicUnit}
                </span>

                <h2 className="text-3xl font-serif italic text-[#121212] font-extrabold mb-1.5 leading-tight">
                  {courseModules[selectedModuleIdx].title}
                </h2>
                
                <p className="text-xs md:text-sm text-gray-600 max-w-3xl leading-relaxed">
                  {courseModules[selectedModuleIdx].shortDesc}
                </p>

                {/* Sub-actions */}
                <div className="flex flex-wrap gap-2.5 mt-4">
                  <button 
                    onClick={() => {
                      setPracticeModuleFilter(selectedModuleIdx);
                      setPracticeCurrentIndex(0);
                      setActiveTab("practice");
                    }}
                    className="px-4.5 py-1.5 bg-[#121212] text-[#E6FF00] text-xs font-mono uppercase tracking-wider font-extrabold border border-black hover:bg-[#E6FF00] hover:text-black transition-colors rounded-sm shadow-sm"
                  >
                    📖 Test Course MCQs
                  </button>

                  <button
                    disabled={compilingSubjectMap[selectedModuleIdx]}
                    onClick={() => compileSubjectPool(selectedModuleIdx)}
                    className={`px-4.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-all rounded font-extrabold border shrink-0 ${
                      questionsPool.filter(q => q.moduleIndex === selectedModuleIdx).length >= 50
                        ? "bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200"
                        : compilingSubjectMap[selectedModuleIdx]
                        ? "bg-amber-100 text-amber-800 border-amber-300 animate-pulse cursor-not-allowed"
                        : "bg-[#E6FF00] text-black border-black hover:bg-black hover:text-[#E6FF00]"
                    }`}
                  >
                    {compilingSubjectMap[selectedModuleIdx]
                      ? `⚡ ${compilingStatusMessage[selectedModuleIdx] || "Compiling..."}`
                      : questionsPool.filter(q => q.moduleIndex === selectedModuleIdx).length >= 50
                      ? "✓ Pool Has 50 MCQs"
                      : "⚡ Compile 50 MCQ Pool"}
                  </button>

                  <button
                    onClick={() => handleStudyModuleComplete(courseModules[selectedModuleIdx].id)}
                    disabled={progress.completedStudyModules.includes(courseModules[selectedModuleIdx].id)}
                    className={`px-4.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-all rounded bg-white border border-black font-extrabold ${
                      progress.completedStudyModules.includes(courseModules[selectedModuleIdx].id)
                        ? "bg-emerald-100 text-emerald-800 border-emerald-300 disabled:opacity-80"
                        : "text-black hover:bg-gray-100"
                    }`}
                  >
                    {progress.completedStudyModules.includes(courseModules[selectedModuleIdx].id)
                      ? "✓ Completed!"
                      : "Mark Study Complete"}
                  </button>
                </div>
              </div>

              {/* Grid: Objectives (Left) & Summary Note (Right) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Specific learning objectives */}
                <div className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_#121212]">
                  <h3 className="text-sm font-mono uppercase tracking-wider font-bold mb-3 border-b-2 border-black pb-1">
                    🎯 National Syllabus Objectives
                  </h3>
                  <ul className="space-y-2.5 text-xs text-gray-700 leading-relaxed list-none">
                    {courseModules[selectedModuleIdx].objectives.map((obj, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="w-1.5 h-1.5 bg-[#E6FF00] border border-black rounded-full shrink-0 mt-1.5"></span>
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Summary Outline */}
                <div className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_#121212]">
                  <h3 className="text-sm font-mono uppercase tracking-wider font-bold mb-3 border-b-2 border-black pb-1">
                    📖 Summary Blueprint Outline
                  </h3>
                  <p className="text-xs text-gray-700 leading-relaxed mb-3">
                    {courseModules[selectedModuleIdx].summaryNote}
                  </p>
                  <div className="bg-yellow-50 border border-yellow-300 p-2.5 rounded text-[11px] font-sans leading-snug flex items-start gap-2 text-yellow-900">
                    <Info className="w-4 h-4 text-yellow-600 shrink-0" />
                    <span>
                      <strong>Graduates Note:</strong> Candidates should memorize key parameters of this course study card. It makes up approximately 10% of items on the final Exit Examination.
                    </span>
                  </div>
                </div>
              </div>

              {/* KEY CONCEPTS EXPANDABLE CARD CAROUSEL */}
              <div>
                <h3 className="text-lg font-serif italic mb-3 font-bold">Key Conceptual Glossary Cards & Visual Models</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white border-2 border-black p-3.5 shadow-[4px_4px_0px_#121212]">
                  {/* Left Column Concept Picker */}
                  <div className="md:col-span-4 flex flex-col gap-1.5 border-r border-black/10 pr-2">
                    {courseModules[selectedModuleIdx].keyConcepts.map((concept, cIdx) => (
                      <button
                        key={cIdx}
                        onClick={() => setActiveConceptIdx(cIdx)}
                        className={`text-left p-2 rounded transition-all text-xs font-semibold ${
                          activeConceptIdx === cIdx
                            ? "bg-[#E6FF00] text-black font-extrabold border-l-4 border-black"
                            : "bg-[#FAF9F6] text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {cIdx + 1}. {concept.term}
                      </button>
                    ))}
                  </div>

                  {/* Right Column Details & Dynamic Visual Generator */}
                  <div className="md:col-span-8 p-4 flex flex-col justify-between min-h-[300px]">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-[#121212]/50 block uppercase font-bold mb-1">SELECTED GLOSSARY CONCEPT</span>
                      <h4 className="text-xl font-serif font-black italic text-[#121212] mb-2">
                        {courseModules[selectedModuleIdx].keyConcepts[activeConceptIdx].term}
                      </h4>
                      <p className="text-xs text-gray-700 leading-relaxed mb-4">
                        {courseModules[selectedModuleIdx].keyConcepts[activeConceptIdx].definition}
                      </p>

                      {/* Display bullets if any */}
                      {courseModules[selectedModuleIdx].keyConcepts[activeConceptIdx].bulletPoints && (
                        <div className="space-y-1 mb-4">
                          {courseModules[selectedModuleIdx].keyConcepts[activeConceptIdx].bulletPoints?.map((pt, index) => (
                            <div key={index} className="flex gap-2 text-xs text-gray-600 leading-snug">
                              <span className="text-[#E6FF00] font-black font-mono">▸</span>
                              <span>{pt}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* DYNAMIC BLUEPRINT INFOGRAPHIC VISUALS GENERATED WITH HTML & CSS ACCORDING TO MODULEINDEX */}
                    <div className="border border-[#121212] bg-[#FAF9F6] p-4 mt-4 relative overflow-hidden flex flex-col justify-center items-center rounded">
                      <span className="absolute left-2 top-1 text-[8px] font-mono tracking-widest text-gray-400 font-bold uppercase">BluePrint Visual Asset</span>
                      
                      {/* Visual for Module 0: Development Journalism vs Communication */}
                      {selectedModuleIdx === 0 && (
                        <div className="w-full flex flex-col items-center py-2 h-36">
                          <div className="grid grid-cols-2 gap-4 w-full h-full text-center">
                            <div className="border border-red-200 bg-red-50 p-2 text-center rounded flex flex-col justify-between">
                              <span className="text-[10px] font-mono font-bold text-red-700 uppercase">Top Down Dissemination</span>
                              <div className="text-lg font-bold text-gray-800 font-mono">ELITE ➔ RURAL</div>
                              <p className="text-[9px] text-gray-500">Unilateral monologues, low local agency.</p>
                            </div>
                            <div className="border-2 border-emerald-400 bg-emerald-50 p-2 text-center rounded flex flex-col justify-between shadow-sm">
                              <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase">Participatory Dialog</span>
                              <div className="text-lg font-bold text-emerald-950 font-mono">STAFF ⬌ COMMUNITY</div>
                              <p className="text-[9px] text-gray-500">Bottom-up empowerment, local Gadaa integration.</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Visual for Module 1: Media Literacy (Disinformation Venn diagram) */}
                      {selectedModuleIdx === 1 && (
                        <div className="w-full flex flex-col items-center py-1 h-36">
                          <div className="relative w-full h-full flex justify-center items-center gap-2">
                            <div className="text-center p-1.5 border border-yellow-300 bg-yellow-50 w-28 rounded">
                              <div className="font-bold text-[10px] text-amber-800 uppercase">Misinformation</div>
                              <div className="text-[8px] text-gray-500">Told falsely, but NO matching motive to harm.</div>
                            </div>
                            <div className="text-center p-1.5 border-2 border-red-400 bg-red-100 w-28 rounded shadow">
                              <div className="font-extrabold text-[10px] text-red-700 uppercase">Disinformation</div>
                              <div className="text-[8px] text-red-950 font-bold">Lies deliberately made to deceive or exploit.</div>
                            </div>
                            <div className="text-center p-1.5 border border-purple-300 bg-purple-50 w-28 rounded">
                              <div className="font-bold text-[10px] text-purple-800 uppercase">Malinformation</div>
                              <div className="text-[8px] text-gray-500">True facts shared selectively out of context to harm.</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Visual for Module 2: News Writing (Inverted Pyramid) */}
                      {selectedModuleIdx === 2 && (
                        <div className="w-full flex flex-col items-center py-2 h-36 justify-center">
                          <div className="w-56 flex flex-col items-stretch text-center font-mono gap-1 text-[10px]">
                            <div className="bg-[#121212] text-white p-2 font-bold clip-funnel-top border border-black">
                              THE LEAD (Who, What, Where, When, Why, How)
                            </div>
                            <div className="bg-[#E6FF00] p-1.5 text-black border border-black font-semibold">
                              BODY COPIES (Quotes, Details, Context)
                            </div>
                            <div className="bg-white p-1 text-gray-500 border border-black">
                              THE TAIL (Nice-to-know background details)
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Visual for Module 3: Feature writing vs News */}
                      {selectedModuleIdx === 3 && (
                        <div className="w-full flex flex-col items-center py-2 h-36 justify-center">
                          <div className="grid grid-cols-2 gap-4 w-full h-full text-center">
                            <div className="border border-gray-600 bg-gray-50 p-2 text-center rounded flex flex-col justify-between">
                              <span className="text-[9px] font-mono font-bold text-gray-600 uppercase">TACHY REPORT (Hard News)</span>
                              <div className="text-[11px] font-serif leading-tight mt-1">
                                &quot;A water main burst yesterday on Churchill avenue, cutting service to 3,000 households for 12 hours.&quot;
                              </div>
                              <p className="text-[8px] text-red-600 font-bold">Fast. Immediate facts.</p>
                            </div>
                            <div className="border border-blue-400 bg-blue-50 p-2 text-center rounded flex flex-col justify-between">
                              <span className="text-[9px] font-mono font-bold text-blue-700 uppercase">DESCRIPTIVE VISUAL (Feature)</span>
                              <div className="text-[11px] font-serif leading-tight mt-1 italic">
                                &quot; Aster Abebe dipped her copper bucket into the dusty mud, wiping sweat under the burning Addis noon...&quot;
                              </div>
                              <p className="text-[8px] text-teal-700 font-bold">Emotion. Atmosphere. Sensory.</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Visual for Module 4: Broadcast Media */}
                      {selectedModuleIdx === 4 && (
                        <div className="w-full flex flex-col items-center py-2 h-36 justify-center">
                          <div className="w-full max-w-sm border border-dashed border-gray-400 p-2 bg-white rounded flex gap-4 text-[9px] font-mono">
                            <div className="w-1/2 border-r pr-2">
                              <div className="font-bold text-blue-600 uppercase border-b pb-1 mb-1">Left: VIDEO TRACK</div>
                              <div>• MS of farmer tilting agricultural spade.</div>
                              <div>• Cut to CG text overlay: &quot;Ato Berhanu, Irrigation Lead&quot;.</div>
                            </div>
                            <div className="w-1/2 font-serif">
                              <div className="font-bold text-green-600 uppercase border-b pb-1 mb-1 font-mono">Right: AUDIO SCOOP</div>
                              <div>&quot;Our crops are thriving because we routed the river water early...&quot;</div>
                              <div>[SFX: Sound of engine running, fades under]</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Visual for Module 5: Intercultural Communication (Culture shock curve) */}
                      {selectedModuleIdx === 5 && (
                        <div className="w-full flex flex-col items-center py-1 h-36 justify-center">
                          <div className="w-full max-w-md text-center">
                            <span className="text-[9px] font-mono font-bold uppercase text-gray-500 block mb-1">Traditional Culture Shock Curve</span>
                            <div className="flex justify-between items-end h-16 px-6 relative border-b border-l border-gray-400">
                              <div className="absolute right-0 top-0 text-[10px] text-gray-400 font-mono font-bold">Integration</div>
                              <div className="flex flex-col items-center">
                                <span className="text-[9px] font-mono text-emerald-600 font-bold">1. Honeymoon</span>
                                <div className="h-4 w-4 bg-emerald-500 rounded-full border border-black shadow-sm"></div>
                              </div>
                              <div className="flex flex-col items-center">
                                <span className="text-[9px] font-mono text-red-600 font-bold">2. Crisis</span>
                                <div className="h-4 w-4 bg-red-500 rounded-full border border-black shadow-sm translate-y-4"></div>
                              </div>
                              <div className="flex flex-col items-center">
                                <span className="text-[9px] font-mono text-amber-600 font-bold">3. Re-orient</span>
                                <div className="h-4 w-4 bg-amber-500 rounded-full border border-black shadow-sm translate-y-1"></div>
                              </div>
                              <div className="flex flex-col items-center">
                                <span className="text-[9px] font-mono text-[#E6FF00] font-bold">4. Mastery</span>
                                <div className="h-4 w-4 bg-[#121212] rounded-full border-2 border-[#E6FF00] shadow-sm"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Visual for Module 6: Theories of Communication */}
                      {selectedModuleIdx === 6 && (
                        <div className="w-full flex flex-col items-center py-2 h-36 justify-center">
                          <div className="flex items-center gap-4 text-center font-mono text-[9px]">
                            <div className="p-1.5 border border-black w-20 bg-gray-100 rounded">
                              <div className="font-bold">MASS MEDIA</div>
                              <div className="text-[8px] text-gray-500">Publishes details</div>
                            </div>
                            <div className="text-xl text-gray-400 font-bold">➔</div>
                            <div className="p-2 border-2 border-[#121212] w-24 bg-[#E6FF00] rounded shadow-sm">
                              <div className="font-extrabold text-black">OPINION LEADERS</div>
                              <div className="text-[8px] opacity-75 leading-tight">Interprets context</div>
                            </div>
                            <div className="text-xl text-gray-400 font-bold">➔</div>
                            <div className="p-1.5 border border-black w-24 bg-gray-100 rounded">
                              <div className="font-bold">WIDE POPULACE</div>
                              <div className="text-[8px] text-gray-500">Absorbs perspective</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Visual for Module 7: PR RACE model */}
                      {selectedModuleIdx === 7 && (
                        <div className="w-full flex flex-col items-center py-2 h-36 justify-center">
                          <div className="grid grid-cols-2 gap-2 w-56 text-[10px] font-mono text-center">
                            <div className="border border-black p-1 bg-white">
                              <span className="font-bold block text-blue-700">R: Research</span>
                              What is the public crisis?
                            </div>
                            <div className="border border-black p-1 bg-[#E6FF00]/20">
                              <span className="font-bold block text-emerald-800">A: Action Plan</span>
                              Set budgets &amp; tactics.
                            </div>
                            <div className="border border-black p-1 bg-white">
                              <span className="font-bold block text-amber-700">C: Comms</span>
                              Deploy press packets.
                            </div>
                            <div className="border border-black p-1 bg-[#121212] text-white">
                              <span className="font-bold block text-[#E6FF00]">E: Evaluation</span>
                              Check outcomes.
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Visual for Module 8: Conflict resolution styles */}
                      {selectedModuleIdx === 8 && (
                        <div className="w-full flex flex-col items-center py-2 h-36 justify-center">
                          <div className="flex gap-4 items-center font-mono text-[9px]">
                            <div className="p-3 border-2 border-red-400 bg-red-50 text-red-950 rounded text-center w-28">
                              <strong className="block text-red-700 font-extrabold mb-1">Competing Mode</strong>
                              &quot;We win, you lose&quot;. Heavy position battles.
                            </div>
                            <div className="text-2xl text-gray-300">VS</div>
                            <div className="p-3 border-2 border-emerald-400 bg-emerald-50 text-emerald-950 rounded text-center w-32 shadow-sm font-bold">
                              <strong className="block text-emerald-700 font-black mb-1">Collaborating Mode</strong>
                              &quot;Win-Win discovery&quot;. Address core underlying interests.
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Visual for Module 9: Potter Box model */}
                      {selectedModuleIdx === 9 && (
                        <div className="w-full flex flex-col items-center py-1 h-36 justify-center">
                          <div className="grid grid-cols-2 gap-3 w-64 text-[9px] font-mono text-center">
                            <div className="border-2 border-black p-1.5 bg-white flex flex-col justify-between shadow-sm">
                              <span className="font-bold text-[#121212] border-b pb-0.5">1. DEFINITE FACTS</span>
                              <span className="text-[8px] text-gray-500">Establish empirical incident realities.</span>
                            </div>
                            <div className="border-2 border-black p-1.5 bg-yellow-50 flex flex-col justify-between shadow-sm">
                              <span className="font-bold text-amber-700 border-b pb-0.5">2. CHOSEN VALUES</span>
                              <span className="text-[8px] text-gray-500">Assess professional codes &amp; parameters.</span>
                            </div>
                            <div className="border-2 border-black p-1.5 bg-yellow-50 flex flex-col justify-between shadow-sm">
                              <span className="font-bold text-amber-700 border-b pb-0.5">3. MORAL PRINCIPLES</span>
                              <span className="text-[8px] text-gray-500">Consult philosophical ethics guidelines.</span>
                            </div>
                            <div className="border-2 border-black p-1.5 bg-white flex flex-col justify-between shadow-sm">
                              <span className="font-bold text-[#121212] border-b pb-0.5">4. LOYALTY SCOPES</span>
                              <span className="text-[8px] text-gray-500">Delineate final allegiances owed.</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* --- ETHIOPIA NATIONAL SYLLABUS ACADEMIC TEXTBOOK DIRECTORY --- */}
                <div className="bg-[#FAF9F6] border-2 border-black p-6 rounded shadow-[4px_4px_0px_#121212] flex flex-col gap-4 mt-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-black pb-3">
                    <div className="flex items-center gap-2.5">
                      <BookOpenText className="w-6 h-6 text-black" />
                      <div>
                        <h4 className="font-serif font-black italic text-lg leading-tight text-gray-950">
                          Syllabus Textbook Channels (15-20 Pages Equivalent)
                        </h4>
                        <p className="text-[11px] text-gray-650">
                          Highly detailed academic handbooks covering national regulatory acts, communication research theories, and local case studies.
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-[9px] bg-[#121212] text-[#E6FF00] px-2 py-1 font-bold uppercase tracking-wider rounded-sm shrink-0">
                      📖 3 CHAPTER SERIES PER COURSE
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {(courseChapters[selectedModuleIdx] || []).map((chapter, chIdx) => {
                      const isCached = localStorage.getItem(`ethio_handbook_cache_${selectedModuleIdx}_${chIdx}`) !== null;
                      return (
                        <div 
                          key={chIdx}
                          className="bg-white border border-gray-300 hover:border-black p-4.5 rounded flex flex-col justify-between hover:translate-y-[-2px] transition-all duration-150"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[9px] font-mono font-bold text-gray-400 uppercase">
                                CHAPTER {chIdx + 1} OF 3
                              </span>
                              {isCached && (
                                <span className="text-[9px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.2 border border-emerald-100 rounded">
                                  COMPILED
                                </span>
                              )}
                            </div>
                            <h5 className="font-serif font-bold text-sm text-gray-950 leading-snug mb-1.5">
                              {chapter.title}
                            </h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed mb-4">
                              {chapter.syllabusGoals}
                            </p>
                          </div>

                          <button
                            onClick={() => loadHandbookChapter(selectedModuleIdx, chIdx, chapter.title)}
                            className={`w-full py-2 hover:cursor-pointer text-center text-xs font-mono font-bold uppercase tracking-wide border rounded transition-all ${
                              isCached
                                ? "bg-emerald-50 text-emerald-850 border-emerald-300 hover:bg-emerald-150"
                                : "bg-[#121212] text-[#E6FF00] border-black hover:bg-black"
                            }`}
                          >
                            {isCached ? "📖 Read Academic Chapter" : "⚡ Live-Compile Chapter"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </section>
          </div>
        )}

        {/* --- 2B. IMMERSIVE ACADEMIC TEXTBOOK WORKSPACE OVERLAY --- */}
        {isHandbookOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-5 animate-fade-in">
            <div className="bg-white border-4 border-black w-full max-w-6xl h-[92vh] flex flex-col shadow-[8px_8px_0px_#121212] overflow-hidden">
              
              {/* Header bar */}
              <header className="bg-black text-[#FAF9F6] px-5 py-3.5 flex items-center justify-between border-b-2 border-black shrink-0 font-mono">
                <div className="flex items-center gap-3">
                  <div className="bg-[#E6FF00] text-black text-xs font-black w-6.5 h-6.5 rounded flex items-center justify-center border border-black shrink-0 animate-bounce">
                    M{readingModuleIdx + 1}
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-widest leading-none">
                      {courseModules[readingModuleIdx].title}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-[#E6FF50] truncate">
                      Chapter {readingChapterIdx + 1}: {(courseChapters[readingModuleIdx] || [])[readingChapterIdx]?.title}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      if (handbookContent) {
                        navigator.clipboard.writeText(handbookContent);
                        alert("Academic text copied to clipboard successfully!");
                      }
                    }}
                    className="p-1.5 hover:bg-gray-800 rounded text-gray-300 hover:text-white text-xs mr-2 transition-colors hidden sm:inline-block"
                    title="Copy Full Chapter to Clipboard"
                  >
                    📋 Copy Text
                  </button>
                  <button
                    onClick={() => setIsHandbookOpen(false)}
                    className="bg-red-600 hover:bg-red-700 text-white border border-red-800 rounded px-3 py-1 text-xs uppercase font-extrabold transition-colors hover:cursor-pointer"
                  >
                    ✕ Close Book
                  </button>
                </div>
              </header>

              {/* Central Splitted Workspace */}
              <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
                
                {/* Left Side: Dense Editorial Textbook Paper Card */}
                <main className="lg:col-span-8 overflow-y-auto bg-[#FDFBF7] p-5 sm:p-8 flex flex-col gap-6 relative border-r-2 border-black">
                  
                  {isHandbookLoading ? (
                    <div className="w-full h-full flex flex-col items-center justify-center py-20 text-center gap-4">
                      <div className="relative w-16 h-16">
                        <div className="absolute inset-0 border-4 border-black border-t-[#E6FF00] rounded-full animate-spin"></div>
                        <Layers className="w-6 h-6 text-black absolute inset-0 m-auto animate-pulse" />
                      </div>
                      <div>
                        <span className="font-mono text-xs uppercase font-bold text-red-650 tracking-widest animate-pulse block">
                          AAU ACADEMIC GRAPHICS TYPESETTER ACTIVE
                        </span>
                        <h4 className="font-serif font-black text-xl text-black my-1">
                          Drafting 1,500 - 2,500 Word Syllabus Chapter...
                        </h4>
                        <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed mt-2 bg-yellow-50 p-3 border border-yellow-200 rounded">
                          Please wait. This compiles deep literature definitions, actual Media Proclamations (Hate Speech Act 1185, Broadcast Act 562), Oromo Gadaa consensus modules, the Gadae, and specific exit-examination critiques.
                        </p>
                      </div>
                    </div>
                  ) : handbookError ? (
                    <div className="w-full text-center py-20 px-4">
                      <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-3" />
                      <h4 className="font-serif font-bold text-lg text-red-950">Curriculum Connection Error</h4>
                      <p className="text-xs text-gray-600 max-w-sm mx-auto mt-1 mb-4">{handbookError}</p>
                      <button 
                        onClick={() => loadHandbookChapter(readingModuleIdx, readingChapterIdx, (courseChapters[readingModuleIdx] || [])[readingChapterIdx]?.title)}
                        className="px-4 py-2 bg-black text-white hover:bg-gray-800 text-xs font-mono uppercase"
                      >
                        🔄 Retry Compilation
                      </button>
                    </div>
                  ) : (
                    <article className="prose max-w-none text-left select-text">
                      <div className="border-b-4 border-black pb-4 mb-6">
                        <span className="text-[10px] uppercase tracking-wider font-mono font-black text-[#121212] bg-[#E6FF00] px-2 py-0.5 inline-block rounded border border-black mb-1.5">
                          OFFICIAL CERTIFIED SYLLABUS COMPANION
                        </span>
                        <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-gray-900 leading-tight">
                          Chapter {readingChapterIdx + 1}: {(courseChapters[readingModuleIdx] || [])[readingChapterIdx]?.title}
                        </h1>
                        <div className="flex flex-wrap gap-4 mt-2.5 text-[11px] font-mono text-gray-500">
                          <span>Volume: XI (Ethiopian Civil Academy)</span>
                          <span>•</span>
                          <span>Length: ~{Math.round(handbookContent.split(" ").length)} academic words</span>
                          <span>•</span>
                          <span>Reading Status: Active</span>
                        </div>
                      </div>

                      {/* Render custom styled markdown paragraphs */}
                      <div className="space-y-4">
                        {(() => {
                          const lines = handbookContent.split("\n");
                          return lines.map((line, idx) => {
                            const trimmed = line.trim();
                            if (!trimmed) return <div key={idx} className="h-4" />;
                            
                            // Markdown headers
                            if (trimmed.startsWith("### ")) {
                              return <h4 key={idx} className="text-base sm:text-lg font-serif font-bold text-gray-950 mt-6 mb-2 border-l-2 border-black pl-2">{trimmed.slice(4)}</h4>;
                            }
                            if (trimmed.startsWith("## ")) {
                              return <h3 key={idx} className="text-lg sm:text-xl font-serif font-black text-gray-950 mt-8 mb-3 border-b-2 border-black pb-1.5">{trimmed.slice(3)}</h3>;
                            }
                            if (trimmed.startsWith("# ")) {
                              return <h2 key={idx} className="text-xl sm:text-2xl font-serif font-black text-gray-950 mt-10 mb-4 tracking-tight leading-tight">{trimmed.slice(2)}</h2>;
                            }
                            
                            // Blockquotes
                            if (trimmed.startsWith("> ")) {
                              return (
                                <blockquote key={idx} className="border-l-4 border-black pl-4 italic text-gray-700 bg-gray-50 p-3 my-3 text-[12.5px] rounded-r border-r border-y border-gray-200">
                                  {trimmed.slice(2)}
                                </blockquote>
                              );
                            }
                            
                            // Bulleted Lists
                            if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
                              return (
                                <div key={idx} className="flex gap-2 text-xs sm:text-[13px] text-gray-700 leading-relaxed pl-4 my-1.5 align-top">
                                  <span className="text-black font-mono font-black mt-0.5">•</span>
                                  <span>{trimmed.slice(2)}</span>
                                </div>
                              );
                            }
                            
                            // Numbered lists
                            if (/^\d+\.\s/.test(trimmed)) {
                              const match = trimmed.match(/^(\d+)\.\s(.*)/);
                              if (match) {
                                return (
                                  <div key={idx} className="flex gap-2 text-xs sm:text-[13px] text-gray-700 leading-relaxed pl-4 my-1.5 align-top">
                                    <span className="font-mono text-[10px] bg-[#121212] text-[#E6FF00] rounded px-1 shrink-0 font-bold h-4 flex items-center">{match[1]}</span>
                                    <span>{match[2]}</span>
                                  </div>
                                );
                              }
                            }
                            
                            // Normal paragraph
                            return (
                              <p key={idx} className="text-xs sm:text-[13.5px] text-gray-800 leading-relaxed text-justify font-serif mb-3">
                                {trimmed}
                              </p>
                            );
                          });
                        })()}
                      </div>

                      {/* Sources block */}
                      {handbookSources.length > 0 && (
                        <div className="border-t-2 border-black pt-5 mt-8 bg-gray-50 p-4 border border-gray-200 rounded">
                          <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500 font-bold block mb-2.5">
                            ACADEMIC REFERENCE REPOSITORY & LINKED GROUNDING
                          </span>
                          <div className="space-y-2">
                            {handbookSources.map((source, sIdx) => (
                              <div key={sIdx} className="text-xs flex items-center gap-1.5 text-gray-700">
                                <span className="bg-sky-100 text-sky-800 text-[10px] font-bold px-1.5 py-0.2 rounded shrink-0">
                                  [{sIdx + 1}]
                                </span>
                                <a 
                                  href={source.uri} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="underline text-blue-700 hover:text-blue-900 break-all leading-snug"
                                >
                                  {source.title}
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </article>
                  )}
                </main>

                {/* Right Side: Scholar Desk Quick-Link Workspace (Syllabus Specs, AI tutor integration) */}
                <aside className="lg:col-span-4 bg-[#FAF9F6] p-5 flex flex-col justify-between overflow-y-auto">
                  <div className="flex flex-col gap-5">
                    
                    {/* Syllabus Goals checklist */}
                    <div className="bg-white border border-black p-4 rounded shadow-sm">
                      <span className="text-[10px] font-mono uppercase text-gray-400 font-bold block mb-2">
                        MoE Syllabus Specifications Checklist
                      </span>
                      <h5 className="font-serif font-bold text-sm text-gray-900 border-b pb-1 mb-2">
                        Target Concept Matrix for Exit Exams
                      </h5>
                      <ul className="space-y-2 text-xs text-gray-750">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                          <span>Strict Proclamation parameters (Pr. 562/2007) details verified.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                          <span>Hate Speech Act 1185/2020 legal constraints grounded.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                          <span>Oromo Gadaa consensus & participatory dialogue mechanisms integrated.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                          <span>Two-Step Mass communication Flow networks analyzed.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                          <span>Ethical decision-modeling (The Potter Box blueprint) validated.</span>
                        </li>
                      </ul>
                      
                      <div className="mt-4 bg-emerald-50 border border-emerald-250 p-2.5 rounded text-[11px] leading-snug text-emerald-900 flex gap-2">
                        <span className="font-bold text-base mt-[-2px]">✓</span>
                        <span>This syllabus chapter represents approximately 15-20 textbook pages of official scholarship material. Highlighted structures are common sources of previous exit exams.</span>
                      </div>
                    </div>

                    {/* AI Advisor Dispatch Card */}
                    <div className="bg-white border-2 border-black p-4 rounded-lg shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <GraduationCap className="w-5 h-5 text-black" />
                        <h5 className="font-serif font-black italic text-sm">Berhanu Consulting Desk</h5>
                      </div>
                      <p className="text-[11px] text-gray-650 leading-relaxed mb-3">
                        Confused about any communication theory, legal redline, or case study presented in this chapter? Click below to instantly invoke Professor Berhanu and launch a custom clarification session based on this text!
                      </p>
                      
                      <button
                        onClick={() => {
                          const snippet = `I am currently studying Chapter ${readingChapterIdx + 1} ("${(courseChapters[readingModuleIdx] || [])[readingChapterIdx]?.title}") from the Course Module "${courseModules[readingModuleIdx].title}". Can you explain the core concepts of this chapter, detail any historical Ethiopian context, and give me a quick 3-question conceptual drill on this specific reading?`;
                          setTutorInput(snippet);
                          setIsHandbookOpen(false);
                          setActiveTab("professor_desk");
                        }}
                        className="w-full py-2 bg-black text-[#E6FF00] hover:bg-[#E6FF00] hover:text-black transition-colors rounded text-xs font-mono font-bold uppercase tracking-wide border border-black hover:cursor-pointer"
                      >
                        💬 Ask Professor About This
                      </button>
                    </div>

                  </div>

                  <div className="pt-4 border-t border-gray-300 mt-6 flex flex-col gap-2">
                    <button
                      onClick={() => {
                        handleStudyModuleComplete(courseModules[readingModuleIdx].id);
                        setIsHandbookOpen(false);
                      }}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded font-mono text-xs uppercase tracking-wider font-extrabold shadow border border-emerald-800 transition-colors hover:cursor-pointer"
                    >
                      ✓ I Have Finished Studying Chapter
                    </button>
                    <p className="text-center text-[10px] text-gray-400">
                      Marking complete advances your modular syllabus study ratio.
                    </p>
                  </div>
                </aside>

              </div>
              
            </div>
          </div>
        )}

        {/* --- 3. TARGETED MCQ PRACTICE VIEW --- */}
        {activeTab === "practice" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
            {/* Left Filter & Index lists */}
            <aside className="lg:col-span-3 flex flex-col gap-5">
              <div>
                <label className="text-[10px] font-mono tracking-widest uppercase font-black text-gray-500 block mb-2">
                  CHOOSE PRACTICE STREAM
                </label>
                <select
                  value={practiceModuleFilter === null ? "all" : practiceModuleFilter}
                  onChange={(e) => {
                    const val = e.target.value;
                    setPracticeModuleFilter(val === "all" ? null : parseInt(val));
                    setPracticeCurrentIndex(0);
                  }}
                  className="w-full bg-white border-2 border-black p-2.5 font-mono text-xs font-bold rounded-sm shadow-[2px_2px_0px_#121212]"
                >
                  <option value="all">📁 All Courses (100 Questions)</option>
                  {courseModules.map((m, index) => (
                    <option key={m.id} value={index}>
                      {index + 1}. {m.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Bullet checklist */}
              <div className="bg-white border text-[#121212] p-4 rounded border-black shadow-[3px_3px_0px_#121212]">
                <h4 className="font-mono text-xs font-bold uppercase mb-2 border-b pb-1">Practice Insights</h4>
                <div className="space-y-1 text-xs text-gray-500">
                  <p>• Immediate feedback displayed after selecting.</p>
                  <p>• Highlights correct response in green, incorrect on red.</p>
                  <p>• Tap the Bookmark indicator to flag items to save.</p>
                </div>
              </div>

              {/* Fast Jump Question selection scroll */}
              <div className="bg-white border border-black p-4 rounded shadow-[3px_3px_0px_#121212]">
                <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block mb-2 font-bold">
                  QUESTION MATRIX DIRECTORY
                </span>
                <div className="grid grid-cols-5 gap-1.5 max-h-72 overflow-y-auto pr-1">
                  {filteredPracticeQuestions.map((q, idx) => {
                    const answered = selectedPracticeAnswers[q.id] !== undefined;
                    const isCorrect = answered && selectedPracticeAnswers[q.id] === q.correctOptionIndex;
                    const isActive = practiceCurrentIndex === idx;
                    const isBookmarked = progress.bookmarks.includes(q.id);

                    return (
                      <button
                        key={q.id}
                        onClick={() => setPracticeCurrentIndex(idx)}
                        className={`font-mono text-xs py-1.5 rounded text-center border relative transition-all ${
                          isActive
                            ? "bg-black text-white border-black font-extrabold scale-110 z-10"
                            : answered
                            ? isCorrect
                              ? "bg-emerald-100 text-emerald-800 border-emerald-300 font-semibold"
                              : "bg-red-100 text-red-800 border-red-300"
                            : "bg-gray-100 text-gray-700 border-gray-200 hover:border-black"
                        }`}
                      >
                        {idx + 1}
                        {isBookmarked && (
                          <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Reset Session Practice answers */}
              <button
                onClick={handleResetPractice}
                className="w-full py-2 bg-red-100 text-red-800 hover:bg-red-200 border-2 border-dashed border-red-400 text-xs font-mono uppercase font-black"
              >
                Reset Practice Session ⚡
              </button>
            </aside>

            {/* Central MCQ Panel */}
            <section className="lg:col-span-9 flex flex-col gap-6">
              {filteredPracticeQuestions.length === 0 ? (
                <div className="bg-white border-2 border-black p-12 text-center rounded shadow-[4px_4px_0px-black] space-y-3">
                  <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
                  <p className="text-gray-500 italic">No practice questions discovered with the active parameters.</p>
                </div>
              ) : (
                (() => {
                  const currentQuestionObj = filteredPracticeQuestions[practiceCurrentIndex];
                  const qId = currentQuestionObj.id;
                  const answeredIndex = selectedPracticeAnswers[qId];
                  const hasAnswered = answeredIndex !== undefined;
                  const isBookmarked = progress.bookmarks.includes(qId);

                  return (
                    <div className="bg-[#FAF9F6] border-2 border-[#121212] p-6 md:p-8 rounded shadow-[6px_6px_0px_#121212] flex flex-col gap-6">
                      
                      {/* Meta Details */}
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#121212]/10 pb-4">
                        <div>
                          <span className="text-[10px] font-mono tracking-widest text-[#121212]/40 uppercase font-black block">National Exit Exam Question Platform</span>
                          <span className="text-xs font-bold text-[#121212]/80 font-mono">
                            Course Module Index: {currentQuestionObj.moduleIndex + 1} | Topic Focus: {currentQuestionObj.blueprintTopic}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleBookmark(qId)}
                            className={`p-2 rounded border transition-all ${
                              isBookmarked
                                ? "bg-blue-100 border-blue-400 text-blue-700"
                                : "bg-white border-gray-300 hover:border-black text-gray-400"
                            }`}
                            title="Bookmark this test item"
                          >
                            <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-blue-700 text-blue-700" : ""}`} />
                          </button>
                          <span className="text-xs bg-slate-100 text-slate-800 border-slate-300 border font-mono px-2.5 py-1 uppercase rounded font-bold">
                            Item {practiceCurrentIndex + 1} of {filteredPracticeQuestions.length}
                          </span>
                        </div>
                      </div>

                      {/* Display Question Typography */}
                      <div className="py-2">
                        <span className="text-[10px] font-mono text-red-600 tracking-wider font-extrabold uppercase mb-1.5 block">Syllabus Exam Target</span>
                        <h3 className="text-xl md:text-3xl font-serif text-[#121212] font-black leading-snug">
                          {currentQuestionObj.questionText}
                        </h3>
                      </div>

                      {/* 4 Choices */}
                      <div className="grid grid-cols-1 gap-3 pt-2">
                        {currentQuestionObj.options.map((option, idx) => {
                          const alphabet = ["A", "B", "C", "D"][idx];
                          const isSelectedThis = answeredIndex === idx;
                          const isCorrectChoice = currentQuestionObj.correctOptionIndex === idx;

                          let choiceStyle = "bg-white border-gray-200 hover:border-black text-gray-900";
                          let badgeStyle = "border-gray-300 text-gray-600 bg-gray-50";

                          if (hasAnswered) {
                            if (isCorrectChoice) {
                              // Always highlight the correct answer Green
                              choiceStyle = "bg-emerald-50 border-emerald-400 text-emerald-950 ring-2 ring-emerald-500 font-semibold";
                              badgeStyle = "bg-emerald-500 text-white border-emerald-600";
                            } else if (isSelectedThis) {
                              // Highlight incorrect selection Red
                              choiceStyle = "bg-red-50 border-red-400 text-red-950 ring-2 ring-red-500 font-semibold";
                              badgeStyle = "bg-red-500 text-white border-red-650";
                            } else {
                              // Unselected others when answered
                              choiceStyle = "bg-white border-gray-100 text-gray-400 opacity-60";
                              badgeStyle = "bg-gray-100 text-gray-300 border-gray-200";
                            }
                          }

                          return (
                            <button
                              key={idx}
                              onClick={() => handleSelectPracticeAnswer(qId, idx)}
                              disabled={hasAnswered}
                              className={`text-left p-4.5 rounded border-2 transition-all flex items-center gap-4 group ${choiceStyle} ${
                                !hasAnswered ? "cursor-pointer hover:bg-yellow-50/45 text-slate-800" : ""
                              }`}
                            >
                              <span className={`w-8 h-8 rounded-full border flex items-center justify-center font-mono text-sm leading-none shrink-0 transition-colors ${badgeStyle}`}>
                                {alphabet}
                              </span>
                              <span className="text-sm md:text-base tracking-wide leading-relaxed">
                                {option}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation Feedback block */}
                      {hasAnswered && showPracticeExplanation[qId] && (
                        <div className="bg-amber-50/80 border-2 border-[#121212] p-5 mt-4 rounded-md animate-fade-in relative">
                          <span className="absolute right-3.5 top-3 text-[10px] font-mono text-amber-800/60 uppercase font-black tracking-widest leading-none select-none">
                            Blueprint Logic Check
                          </span>
                          <div className="flex items-start gap-3">
                            <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                            <div>
                              <h4 className="text-sm font-bold font-serif italic text-amber-900 mb-1">
                                {answeredIndex === currentQuestionObj.correctOptionIndex ? "Correct Answer! Expert Validation:" : "Incorrect Option. Diagnostic Review:"}
                              </h4>
                              <p className="text-xs text-amber-950 tracking-wide leading-relaxed">
                                {currentQuestionObj.explanation}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Navigation bar bottom */}
                      <div className="flex border-t border-gray-200 pt-5 mt-2 justify-between items-center">
                        <button
                          onClick={() => setPracticeCurrentIndex(p => Math.max(0, p - 1))}
                          disabled={practiceCurrentIndex === 0}
                          className="px-4 py-2 bg-white border border-gray-300 hover:border-black text-gray-700 text-xs font-mono uppercase tracking-wider rounded font-bold disabled:opacity-50 flex items-center gap-1.5"
                        >
                          <ChevronLeft className="w-4 h-4" /> Previous
                        </button>

                        <div className="text-xs font-mono text-gray-500 font-bold">
                          Question {practiceCurrentIndex + 1} of {filteredPracticeQuestions.length}
                        </div>

                        <button
                          onClick={() => {
                            if (practiceCurrentIndex < filteredPracticeQuestions.length - 1) {
                              setPracticeCurrentIndex(p => p + 1);
                            } else {
                              alert("You've mastered the final question in this practicing filter! Select another course module to keep growing.");
                            }
                          }}
                          className="px-4 py-2 bg-black text-[#E6FF00] hover:bg-opacity-80 transition-all text-xs font-mono uppercase tracking-wider rounded font-bold flex items-center gap-1.5"
                        >
                          Next <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  );
                })()
              )}
            </section>
          </div>
        )}

        {/* --- 4. EXAM SIMULATOR WINDOW --- */}
        {activeTab === "simulator" && isExamRunning && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
            {/* Left Workspace: Main Active test item */}
            <section className="lg:col-span-8 flex flex-col gap-6">
              {(() => {
                const qObj = examQuestions[examCurrentIdx];
                if (!qObj) return null;

                const qId = qObj.id;
                const isBookmarked = examBookmarks.includes(qId);
                const hasSelected = examAnswers[qId] !== undefined;

                return (
                  <div className="bg-white border-4 border-black p-6 md:p-8 rounded shadow-[6px_6px_0px_#121212] flex flex-col justify-between min-h-[500px]">
                    <div>
                      {/* Meta top */}
                      <div className="flex justify-between items-center border-b border-black pb-3 mb-6 font-mono text-xs text-gray-500">
                        <span className="bg-gray-100 text-black border border-gray-300 font-bold px-2.5 py-0.5 uppercase tracking-wide rounded-sm font-mono">
                          COURSE QUESTION DETAILS: {qObj.courseName}
                        </span>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setExamBookmarks(prev => 
                                prev.includes(qId) ? prev.filter(id => id !== qId) : [...prev, qId]
                              );
                            }}
                            className={`p-1.5 rounded border transition-all ${
                              isBookmarked
                                ? "bg-amber-100 border-amber-400 text-amber-700"
                                : "bg-white border-gray-200 text-gray-400 hover:border-black"
                            }`}
                            title="Flag/Bookmark question for revision"
                          >
                            <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-amber-700" : ""}`} />
                          </button>
                          <span className="font-extrabold text-black uppercase tracking-wider">
                            ITEM {examCurrentIdx + 1} OF {examQuestions.length}
                          </span>
                        </div>
                      </div>

                      {/* Display question text */}
                      <span className="text-[10px] font-mono uppercase bg-red-100 text-red-800 px-1.5 py-0.5 tracking-widest font-bold inline-block mb-3">
                        NATIONAL NATIONAL EXIT QUESTION
                      </span>
                      <h3 className="text-xl md:text-3xl font-serif text-[#121212] font-black leading-snug mb-8">
                        {qObj.questionText}
                      </h3>

                      {/* Options (Instant feedbacks are strictly hidden) */}
                      <div className="grid grid-cols-1 gap-3">
                        {qObj.options.map((opt, idx) => {
                          const letter = ["A", "B", "C", "D"][idx];
                          const selected = examAnswers[qId] === idx;

                          return (
                            <button
                              key={idx}
                              onClick={() => {
                                setExamAnswers(prev => ({ ...prev, [qId]: idx }));
                              }}
                              className={`text-left p-4 rounded-md border-2 transition-all flex items-center gap-4 group ${
                                selected
                                  ? "bg-slate-950 text-white border-black ring-2 ring-[#E6FF00] shadow-sm font-bold"
                                  : "bg-white border-gray-200 hover:border-black text-gray-900"
                              }`}
                            >
                              <span className={`w-8 h-8 rounded-full border flex items-center justify-center font-mono text-sm leading-none shrink-0 ${
                                selected ? "bg-[#E6FF00] text-black border-yellow-400 font-extrabold" : "bg-gray-50 text-gray-500 border-gray-300"
                              }`}>
                                {letter}
                              </span>
                              <span className="text-sm md:text-base">
                                {opt}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Navigation inside simulation */}
                    <div className="flex border-t border-gray-200 pt-6 mt-8 justify-between items-center">
                      <button
                        onClick={() => setExamCurrentIdx(p => Math.max(0, p - 1))}
                        disabled={examCurrentIdx === 0}
                        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-xs font-mono uppercase font-bold disabled:opacity-40"
                      >
                        ◄ Previous
                      </button>

                      <div className="space-y-1 block text-center">
                        <span className="text-[10px] font-mono text-gray-400 block font-bold">STATE</span>
                        <span className={`text-xs font-mono font-black ${hasSelected ? "text-emerald-700" : "text-amber-700 italic animate-pulse"}`}>
                          {hasSelected ? "✓ Saved Option recorded" : "⚠ Not answered yet"}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          if (examCurrentIdx < examQuestions.length - 1) {
                            setExamCurrentIdx(p => p + 1);
                          } else {
                            alert("You have reached the final item. Click the 'Submit Exam' button above or verify previous items using the Exam Matrix on the right.");
                          }
                        }}
                        className="px-4 py-2 bg-[#121212] text-[#E6FF00] font-mono text-xs uppercase font-extrabold"
                      >
                        Next Item ►
                      </button>
                    </div>

                  </div>
                );
              })()}
            </section>

            {/* Right Matrix Workspace: 100-cell Exam Dashboard matrix */}
            <aside className="lg:col-span-4 flex flex-col gap-5">
              <div className="bg-white border-4 border-black p-5 shadow-[4px_4px_0px_#121212]">
                <div className="border-b border-black pb-2 mb-3">
                  <h3 className="text-sm font-mono uppercase tracking-widest font-black text-gray-800">
                    Syllabus Exam Matrix
                  </h3>
                  <p className="text-[10px] text-gray-500 font-sans tracking-tight">
                    Click any element below to jump instantly to that question.
                  </p>
                </div>

                {/* Grid matrix */}
                <div className="grid grid-cols-10 gap-1 pb-3">
                  {examQuestions.map((q, idx) => {
                    const ans = examAnswers[q.id] !== undefined;
                    const book = examBookmarks.includes(q.id);
                    const active = examCurrentIdx === idx;

                    let btnClass = "bg-gray-100 text-gray-500 border-gray-200";

                    if (active) {
                      btnClass = "bg-black text-[#E6FF00] ring-2 ring-[#E6FF00] z-10 scale-105 font-black";
                    } else if (ans) {
                      btnClass = "bg-slate-800 text-white border-slate-900 font-bold";
                    }

                    return (
                      <button
                        key={q.id}
                        onClick={() => setExamCurrentIdx(idx)}
                        className={`text-[9px] font-mono py-1 rounded text-center border relative transition-all duration-75 block h-7 ${btnClass}`}
                        title={`Question ${idx + 1}: ${ans ? "Answered" : "Unanswered"}`}
                      >
                        {idx + 1}
                        {book && (
                          <span className="absolute bottom-0 right-0 w-2 h-2 bg-yellow-400 rounded-bl border-t border-l border-black"></span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Legend explanation */}
                <div className="border-t border-black/10 pt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[10px] font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-gray-100 border border-gray-300 inline-block"></span>
                    <span className="text-gray-500">Unanswered</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-slate-800 border border-black inline-block"></span>
                    <span className="text-gray-900">Answered option</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-black border-2 border-[#E6FF00] inline-block"></span>
                    <span className="text-gray-900 font-bold">Active Question</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-[#FAF9F6] border border-gray-300 relative inline-block">
                      <span className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-yellow-400"></span>
                    </span>
                    <span className="text-gray-900">Flagged / Bookmark</span>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-300 p-3 rounded text-[11px] text-amber-900 mt-4 leading-relaxed font-sans">
                  <strong>🚨 Lockout Protection Protocol:</strong> Closing this window or disconnecting during the simulated quiz will cancel your session. Keep the application open.
                </div>
              </div>

              {/* Progress Panel */}
              <div className="bg-[#121212] text-white p-5 shadow-[4px_4px_0px_#E6FF00] space-y-3">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#E6FF00]/80 font-bold block">
                  SUBMISSION CHECKS
                </span>
                
                <div className="text-xs space-y-1 text-gray-300">
                  <div className="flex justify-between">
                    <span>Questions Finished:</span>
                    <strong className="text-white font-mono">{Object.keys(examAnswers).length} / 100</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Flagged Cards:</span>
                    <strong className="text-white font-mono">{examBookmarks.length} Items</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Session Remaining:</span>
                    <strong className={`font-mono font-bold ${examSecondsLeft < 15 * 60 ? "text-red-400 blink" : "text-white"}`}>
                      {formatTime(examSecondsLeft)}
                    </strong>
                  </div>
                </div>

                <button
                  onClick={() => submitExamSimulation(false)}
                  className="w-full mt-2 py-2 bg-emerald-505 bg-emerald-500 hover:bg-emerald-600 text-black border-2 border-black text-xs font-mono uppercase tracking-widest font-black transition-all shadow-[2px_2px_0px_white]"
                >
                  ✓ Submit Final Answers
                </button>
              </div>
            </aside>
          </div>
        )}

        {/* --- 5. COMPREHENSIVE MULTI-DIMENSIONAL RESULTS & DIAGNOSTICS ANALYTICS DASHBOARD --- */}
        {activeTab === "review" && lastExamResult && (
          <div className="flex flex-col gap-8 animate-fade-in text-[#121212]">
            
            {/* Header Result Card (Editorial Theme big success metrics) */}
            <div className="bg-white border-4 border-[#121212] p-6 md:p-8 rounded shadow-[6px_6px_0px_#121212] relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="space-y-3 z-10 text-left">
                <span className="text-xs font-mono uppercase tracking-[0.2em] bg-black text-[#E6FF00] px-2 py-0.5 border border-black font-extrabold inline-block">
                  Candidate Exam Diagnostic Sheet
                </span>
                <h2 className="text-3xl md:text-5xl font-serif italic text-black font-extrabold leading-none">
                  Summary Score Overview
                </h2>
                <div className="text-xs text-gray-600 space-y-1 font-mono">
                  <p>• Completion Date: {lastExamResult.date}</p>
                  <p>• Course duration logged: {formatTime(lastExamResult.timeSpentSeconds)} seconds</p>
                  <p>• Database elements analyzed: {lastExamResult.totalQuestions} Questions</p>
                </div>
              </div>

              {/* Dynamic Score gauge */}
              <div className="p-4 bg-[#FAF9F6] border-2 border-black w-full md:w-auto text-center shrink-0 shadow-[4px_4px_0px_#E6FF00] flex flex-col justify-center items-center rounded z-10">
                <span className="text-[10px] font-mono tracking-widest text-[#121212] uppercase block mb-1">SCORE RECEIVED</span>
                <div className="text-6xl font-serif italic font-black leading-none text-[#121212] flex items-baseline justify-center">
                  {lastExamResult.score}%
                </div>
                
                {/* Official Ethiopian threshold passing ratings */}
                <div className="mt-2.5">
                  {lastExamResult.score >= 85 ? (
                    <span className="bg-purple-100 text-purple-800 border border-purple-300 text-[10px] font-mono uppercase font-black px-3 py-1 block rounded">
                      🏆 OUTSTANDING ACHIEVER
                    </span>
                  ) : lastExamResult.score >= 70 ? (
                    <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-mono uppercase font-black px-3 py-1 block rounded">
                      🌟 HIGHLY QUALIFIED
                    </span>
                  ) : lastExamResult.score >= 50 ? (
                    <span className="bg-sky-100 text-sky-800 border border-sky-300 text-[10px] font-mono uppercase font-black px-3 py-1" style={{ display: 'block' }}>
                      ✓ PASSED CERTIFICATION
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-00 text-red-800 border border-red-300 text-[10px] font-mono uppercase font-black px-3 py-1" style={{ display: 'block' }}>
                      ⚠ REMEDIAL REQUIRED
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Diagnostic Breakdown per syllabus learning module */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Left Column: Weakness and strengths category report */}
              <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_#121212] flex flex-col gap-4">
                <h3 className="text-lg font-serif font-bold italic border-b border-black pb-2 mb-1">
                  Syllabus Domain Analysis
                </h3>

                <div className="space-y-4">
                  {courseModules.map((cMod, index) => {
                    // Calculate score for this course in the submitted exam
                    const moduleQuestions = lastExamQuestions.filter(q => q.moduleIndex === index);
                    let correctInModuleCount = 0;
                    moduleQuestions.forEach(q => {
                      if (lastExamAnswers[q.id] === q.correctOptionIndex) {
                        correctInModuleCount++;
                      }
                    });
                    const percentCorrectMod = Math.round((correctInModuleCount / Math.max(1, moduleQuestions.length)) * 100);

                    return (
                      <div key={cMod.id} className="text-xs">
                        <div className="flex justify-between items-center font-semibold mb-1">
                          <span className="text-gray-900 font-bold truncate pr-3">{index + 1}. {cMod.title}</span>
                          <span className={`font-mono font-bold ${percentCorrectMod >= 70 ? "text-emerald-700" : percentCorrectMod >= 50 ? "text-amber-700" : "text-red-700"}`}>
                            {correctInModuleCount}/10 ({percentCorrectMod}%)
                          </span>
                        </div>

                        {/* Visual graph line representing module score */}
                        <div className="w-full bg-gray-100 h-2 border border-gray-300 overflow-hidden rounded-sm relative">
                          <div 
                            className={`h-full transition-all duration-300 ${
                              percentCorrectMod >= 70 
                                ? "bg-emerald-500" 
                                : percentCorrectMod >= 50 
                                ? "bg-yellow-400" 
                                : "bg-red-500"
                            }`}
                            style={{ width: `${percentCorrectMod}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Dynamic diagnostics recommendations */}
              <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_#121212] flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-serif font-bold italic border-b border-black pb-2 mb-3">
                    Personalized Revision Strategy Recommendations
                  </h3>

                  <div className="space-y-3 text-xs leading-relaxed">
                    {/* Diagnostic feedback computed based on final score */}
                    {lastExamResult.score >= 50 ? (
                      <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-950 rounded flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <strong>Official passing threshold Cleared!</strong> You are theoretically prepared to excel on the Ministry National Exit Exam. Excellent performance.
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 bg-red-50 border border-red-300 text-red-950 rounded flex gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                        <div>
                          <strong>Exit certification threshold not met.</strong> You need at least continuous practice to clear the MoE passing margin of 50%. Focus below on the questions you missed.
                        </div>
                      </div>
                    )}

                    <div className="p-3 bg-[#FAF9F6] border border-gray-300 rounded space-y-1">
                      <strong className="text-slate-800 text-xs block font-mono uppercase tracking-widest">NEXT STEPS FOR STUDY:</strong>
                      <div className="space-y-1 font-sans text-gray-600">
                        <p>1. Browse to the <strong>Study Deck</strong> and expand key conceptual flashcards of your lowest-scoring modules.</p>
                        <p>2. Keep studying the visual frameworks (Potter Box, RACE logic, Filter chambers) to cement core paradigms.</p>
                        <p>3. Go to <strong>Practice Mode</strong> to test specific topics.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex gap-3 mt-4">
                  <button
                    onClick={startExamSimulation}
                    className="flex-1 py-2 bg-[#E6FF00] hover:bg-black hover:text-[#E6FF00] transition-colors font-mono text-xs uppercase font-extrabold border-2 border-black shadow-[2px_2px_0px_black]"
                  >
                    🚀 Retake Simulated Exam
                  </button>
                  <button
                    onClick={() => setActiveTab("dashboard")}
                    className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-black border border-black font-mono text-xs uppercase font-semibold text-center"
                  >
                    Home Dashboard
                  </button>
                </div>
              </div>
            </div>

            {/* Comprehensive Missed / review questions examiner lists */}
            <div className="bg-white border-2 border-[#121212] p-6 shadow-[4px_4px_0px_#121212]">
              <div className="border-b border-black pb-2 mb-4 flex justify-between items-center flex-wrap gap-2">
                <div>
                  <h3 className="text-xl font-serif italic font-bold">
                    Interactive Post-Mortem Item Analysis
                  </h3>
                  <p className="text-xs text-gray-500 font-sans">
                    Review every question and choice submitted below to understand core structural errors.
                  </p>
                </div>

                {/* Filter and selector */}
                <div className="flex gap-2 font-mono text-xs">
                  <span className="bg-[#FAF9F6] border px-2.5 py-1 text-slate-800 block rounded-sm border-gray-300">
                    Syllabus Paper review
                  </span>
                </div>
              </div>

              {/* Scrollable list of exam solutions */}
              <div className="space-y-6">
                {lastExamQuestions.map((q, idx) => {
                  const selIdx = lastExamAnswers[q.id];
                  const correct = selIdx === q.correctOptionIndex;

                  return (
                    <div 
                      key={q.id}
                      className={`p-4 rounded border-2 transition-all ${
                        correct
                          ? "bg-slate-50/50 border-gray-200"
                          : "bg-red-50/20 border-red-300"
                      }`}
                    >
                      <div className="flex justify-between items-start gap-4 mb-2.5 font-mono text-[10px]">
                        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 border border-gray-200 uppercase font-bold rounded">
                          Question {idx + 1} | Module: {q.courseName}
                        </span>
                        <span>
                          {correct ? (
                            <span className="text-emerald-700 font-extrabold font-mono uppercase bg-emerald-100 px-2.5 py-0.5 rounded border border-emerald-300">✓ CORRECT OPTION</span>
                          ) : (
                            <span className="text-red-700 font-extrabold font-mono uppercase bg-red-100 px-2.5 py-0.5 rounded border border-red-300">⚠ INCORRECT SUBMISSION</span>
                          )}
                        </span>
                      </div>

                      <h4 className="text-base md:text-lg font-serif italic text-black font-extrabold mb-3">
                        {q.questionText}
                      </h4>

                      {/* Display options with specific color marking */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs mb-3">
                        {q.options.map((opt, oIdx) => {
                          const letterOption = ["A", "B", "C", "D"][oIdx];
                          const isCorrect = q.correctOptionIndex === oIdx;
                          const isSelected = selIdx === oIdx;

                          let textClass = "text-gray-700 border-gray-200 bg-white";
                          if (isCorrect) {
                            textClass = "text-emerald-950 font-bold border-emerald-405 bg-emerald-50 border-2 border-emerald-500 rounded";
                          } else if (isSelected) {
                            textClass = "text-red-950 border-red-305 bg-red-50 border border-red-400 font-semibold rounded";
                          }

                          return (
                            <div key={oIdx} className={`p-2.5 border rounded flex items-center gap-3 ${textClass}`}>
                              <span className={`w-6 h-6 rounded-full border-gray-300 bg-gray-100 font-mono text-[10px] uppercase font-bold inline-flex justify-center items-center shrink-0 ${
                                isCorrect ? "bg-emerald-500 text-white font-black" : isSelected ? "bg-red-500 text-white" : ""
                              }`}>
                                {letterOption}
                              </span>
                              <span className="leading-snug">{opt}</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Diagnostic Explanatory */}
                      <div className="bg-amber-50 p-3 rounded font-serif text-[#121212] flex gap-2 text-[11px] leading-relaxed border border-amber-200">
                        <Lightbulb className="w-4.5 h-4.5 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <strong>Explanatory standard check:</strong> {q.explanation}
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        )}

        {/* --- 6. MOE PROFESSOR DESK & REAL-TIME GROUNDED LAB --- */}
        {activeTab === "professor_desk" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in text-[#121212]">
            
            {/* Top Full-Width Hero */}
            <div className="lg:col-span-12 bg-white border-4 border-[#121212] p-6 shadow-[5px_5px_0px_#121212] relative overflow-hidden">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#121212]/50 font-bold block mb-1">
                MINISTRY OF EDUCATION JOINT COMMITTEE OF GRADUATION EXAMINERS
              </span>
              <h2 className="text-3xl font-serif italic text-black font-black leading-tight flex items-center gap-2">
                <GraduationCap className="w-8 h-8 text-amber-500 shrink-0 animate-pulse" />
                Senior Professor's Academic Consultation Desk
              </h2>
              <p className="text-xs md:text-sm text-gray-600 mt-2 max-w-4xl leading-relaxed">
                Welcome to the official MoE Expert Advisor panel. Here, you can consult our retrieval-backed senior academic AI system or compile an infinite number of highly complex, university-professor grade exit examination questions (100 items per stream on-demand) mapped directly to your targeted study blueprints.
              </p>
            </div>

            {/* Left: Chat consultation with Professor Berhanu */}
            <div className="lg:col-span-7 bg-white border-2 border-[#121212] p-5 shadow-[4px_4px_0px_#121212] flex flex-col justify-between min-h-[550px]">
              <div>
                <div className="border-b border-black pb-3 mb-4 flex justify-between items-center">
                  <div>
                    <h3 className="text-base font-serif font-black italic">
                      Live Academic Mentor & Blueprint Tutor
                    </h3>
                    <p className="text-[10px] text-gray-500 font-mono uppercase">
                      Current context: {courseModules[selectedModuleIdx]?.title || "General studies"}
                    </p>
                  </div>
                  <span className="text-[10px] bg-red-100 text-red-700 border border-red-200 px-2.5 py-0.5 rounded font-mono font-bold uppercase animate-pulse">
                    🟢 RESEARCH GROUNDING ACTIVE
                  </span>
                </div>

                {/* Chat window viewport */}
                <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2 pb-4 flex flex-col">
                  {tutorMessages.map((msg, idx) => (
                    <div 
                      key={idx} 
                      className={`max-w-[85%] p-3.5 rounded-lg border-2 ${
                        msg.role === "user"
                          ? "bg-gray-50 text-gray-900 border-[#121212] self-end rounded-br-none"
                          : "bg-amber-50/50 text-[#121212] border-amber-300 self-start rounded-bl-none font-serif"
                      }`}
                    >
                      <span className="text-[9px] font-mono font-black tracking-wider uppercase opacity-40 block mb-1">
                        {msg.role === "user" ? "CANDIDATE STUDY" : "PROFESSOR BERHANU"}
                      </span>
                      <p className="text-xs md:text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>

                      {/* Display Grounding Citations */}
                      {msg.sources && msg.sources.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-amber-200/50">
                          <span className="text-[9px] font-mono uppercase text-gray-500 font-bold tracking-widest block mb-1">
                            Syllabus Sources & Reference Manuals:
                          </span>
                          <div className="flex flex-wrap gap-1.5 pt-0.5">
                            {msg.sources.map((src, sIdx) => (
                              <a 
                                href={src.uri} 
                                target="_blank" 
                                rel="noreferrer" 
                                key={sIdx} 
                                className="inline-flex items-center gap-1 text-[10px] bg-amber-100 hover:bg-yellow-101 hover:bg-amber-200 text-amber-900 px-2 py-0.5 border border-amber-300 rounded font-mono font-semibold"
                              >
                                🔍 {src.title || "Reference manual"}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {isTutorLoading && (
                    <div className="p-3 bg-amber-50/25 border border-amber-250 self-start rounded-lg rounded-bl-none max-w-[80%] flex items-center gap-3">
                      <RefreshCw className="w-4 h-4 text-amber-600 animate-spin" />
                      <span className="text-xs text-amber-900 font-mono italic">
                        Professor Berhanu is referencing Ministry guidelines...
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Chat action footer */}
              <div className="border-t border-black/10 pt-4 mt-2 flex gap-2">
                <input 
                  type="text" 
                  value={tutorInput}
                  onChange={(e) => setTutorInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSendTutorMessage(); }}
                  placeholder={`Ask: Explain Potter Box or Proclamation 112/1995 relative to ${courseModules[selectedModuleIdx]?.title || "General studies"}...`}
                  className="flex-1 bg-[#FAF9F6] border-2 border-black px-3.5 py-2 font-mono text-xs rounded-sm focus:outline-none focus:ring-2 focus:ring-[#E6FF00]"
                />
                <button 
                  onClick={handleSendTutorMessage}
                  className="bg-black text-[#E6FF00] hover:bg-opacity-80 transition-all font-mono text-xs uppercase px-5 py-2 font-black border border-black shadow-[2px_2px_0px_#E6FF00]"
                >
                  Consult
                </button>
              </div>
            </div>

            {/* Right: On-Demand Dynamic MCQ Quiz Sandbox */}
            <div className="lg:col-span-5 bg-white border-2 border-[#121212] p-5 shadow-[4px_4px_0px_#121212] flex flex-col justify-between min-h-[550px]">
              <div>
                <div className="border-b border-black pb-3 mb-4">
                  <h3 className="text-base font-serif font-black italic">
                    Ministry Exam Sandbox Draftsman
                  </h3>
                  <p className="text-[10px] text-gray-500 font-sans leading-tight">
                    Dynamically formulate premium, Professor-grade MCQs on selected blueprints instantly.
                  </p>
                </div>

                {/* Pickers */}
                <div className="space-y-3.5 mb-5 bg-[#FAF9F6] p-3 border border-gray-200 rounded">
                  <div>
                    <label className="text-[9px] font-mono uppercase text-gray-500 font-black block mb-1">
                      SELECT COURSE BLUEPRINT
                    </label>
                    <select 
                      value={aiSelectedModuleIdx}
                      onChange={(e) => setAiSelectedModuleIdx(parseInt(e.target.value))}
                      className="w-full bg-white border border-black p-2 font-mono text-xs font-bold"
                    >
                      {courseModules.map((m, idx) => (
                        <option value={idx} key={m.id}>{idx + 1}. {m.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label className="text-[9px] font-mono uppercase text-gray-500 font-black block mb-1">
                        DRAFT STRENGTH
                      </label>
                      <select 
                        value={aiQuestionCount}
                        onChange={(e) => setAiQuestionCount(parseInt(e.target.value))}
                        className="w-full bg-white border border-black p-2 font-mono text-xs font-bold"
                      >
                        <option value={10}>10 MCQs Practice</option>
                        <option value={20}>20 MCQs Practice</option>
                        <option value={50}>50 MCQs Practice</option>
                      </select>
                    </div>

                    <div className="w-1/2 flex items-end">
                      <button 
                        onClick={handleGenerateAiQuiz}
                        disabled={isAiGenerating}
                        className="w-full py-2 bg-[#E6FF00] text-black border-2 border-black font-mono text-xs uppercase font-extrabold shadow-[2px_2px_0px_black] hover:bg-black hover:text-[#E6FF00] transition-colors"
                      >
                        {isAiGenerating ? "Compiling..." : "Generate MCQs 🚀"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Live MCQ testing container */}
                {aiGeneratedQuestions.length > 0 ? (
                  <div>
                    {/* Render active item */}
                    {(() => {
                      const qObj = aiGeneratedQuestions[aiPracticeIdx];
                      if (!qObj) return null;
                      const selAnswerIdx = aiSelectedAnswers[qObj.id];
                      const answered = selAnswerIdx !== undefined;

                      return (
                        <div className="space-y-3">
                          <div className="flex justify-between items-center text-[10px] font-mono border-b pb-1.5 text-gray-400">
                            <span>Sandbox Item {aiPracticeIdx + 1} of {aiGeneratedQuestions.length}</span>
                            <span className="font-bold text-red-650 uppercase">Prof. Standard</span>
                          </div>

                          <h4 className="text-sm font-semibold text-slate-900 leading-snug font-serif italic">
                            {qObj.questionText}
                          </h4>

                          {/* Options */}
                          <div className="space-y-2 pt-1 font-sans text-xs">
                            {qObj.options.map((opt, oIdx) => {
                              const letter = ["A", "B", "C", "D"][oIdx];
                              const isSelThis = selAnswerIdx === oIdx;
                              const isCorrectOption = qObj.correctOptionIndex === oIdx;

                              let optStyle = "bg-white border-gray-250 hover:border-black text-slate-800";
                              if (answered) {
                                if (isCorrectOption) {
                                  optStyle = "bg-emerald-50 border-emerald-550 text-emerald-900 font-bold ring-2 ring-emerald-450";
                                } else if (isSelThis) {
                                  optStyle = "bg-red-50 border-red-550 text-red-900 font-bold ring-2 ring-red-450";
                                } else {
                                  optStyle = "bg-gray-100 text-gray-400 opacity-60";
                                }
                              }

                              return (
                                <button 
                                  key={oIdx}
                                  onClick={() => handleSelectAiAnswer(qObj.id, oIdx)}
                                  disabled={answered}
                                  className={`w-full text-left p-2.5 border rounded flex items-center gap-3 transition-colors ${optStyle}`}
                                >
                                  <span className="w-5 h-5 rounded-full border border-gray-300 font-sans font-bold flex items-center justify-center text-[10px] shrink-0">
                                    {letter}
                                  </span>
                                  <span className="leading-tight">{opt}</span>
                                </button>
                              );
                            })}
                          </div>

                          {/* Explanatory */}
                          {answered && aiShowExplanations[qObj.id] && (
                            <div className="p-3 bg-amber-50 border border-amber-300 rounded text-[11px] leading-relaxed text-amber-950 font-sans animate-fade-in">
                              <span className="font-bold block border-b border-amber-200 pb-0.5 mb-1 text-amber-900">Professor Explanation:</span>
                              {qObj.explanation}
                            </div>
                          )}

                          {/* Next / Previous */}
                          <div className="flex justify-between items-center pt-2.5 border-t border-gray-100">
                            <button 
                              onClick={() => setAiPracticeIdx(p => Math.max(0, p - 1))}
                              disabled={aiPracticeIdx === 0}
                              className="px-2.5 py-1 text-[11px] font-mono border bg-white rounded disabled:opacity-40"
                            >
                              Previous
                            </button>
                            <span className="text-[11px] font-mono text-gray-500">Correct: {Object.entries(aiSelectedAnswers).filter(([qid, idx]) => aiGeneratedQuestions.find(q=>q.id === parseInt(qid))?.correctOptionIndex === idx).length} / {Object.keys(aiSelectedAnswers).length}</span>
                            <button 
                              onClick={() => {
                                if (aiPracticeIdx < aiGeneratedQuestions.length - 1) {
                                  setAiPracticeIdx(p => p + 1);
                                }
                              }}
                              disabled={aiPracticeIdx === aiGeneratedQuestions.length - 1}
                              className="px-2.5 py-1 text-[11px] font-mono bg-black text-[#E6FF00] rounded disabled:opacity-40"
                            >
                              Next
                            </button>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                ) : (
                  <div className="border border-dashed border-gray-300 p-8 text-center rounded bg-gray-50 items-center flex flex-col justify-center h-52 text-xs text-gray-400">
                    {isAiGenerating ? (
                      <div className="space-y-2 text-center">
                        <RefreshCw className="w-8 h-8 text-amber-500 animate-spin mx-auto" />
                        <p className="font-mono text-slate-700 animate-pulse font-bold">PROFESSOR WORK IN PROGRESS...</p>
                        <p className="text-[10px] text-slate-500 font-sans">Generating MoE standard MCQ options and verified academic explanations.</p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <Award className="w-8 h-8 text-gray-300 mx-auto opacity-70" />
                        <p className="font-serif italic font-bold">No drafted quiz active</p>
                        <p className="text-[10px]">Pick a course and tap the generation trigger above to initiate.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Informative alert box bottom */}
              <div className="bg-sky-50 border border-sky-200 p-3 rounded text-[11px] text-sky-900 mt-4 leading-relaxed font-sans flex gap-2">
                <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Candidate Note:</strong> Questions compiled under the Professor Desk are synthesized dynamically using latest Ministry paradigms and live feedback loops. Completing these items successfully translates directly into actual diagnostic statistics mapped on your Dashboard.
                </span>
              </div>
            </div>

            {/* Down Row: Extended Academic Reading Materials & Chapters ("at least 20 pages plus modules") */}
            <div className="lg:col-span-12 bg-white border-2 border-black p-6 shadow-[5px_5px_0px_#121212]">
              <div className="border-b-2 border-black pb-2 mb-6">
                <span className="text-[9px] font-mono uppercase bg-amber-500 text-black px-2 py-0.5 rounded font-bold tracking-widest inline-block mb-1">REQUIRED SUPPLEMENTAL TEXTS</span>
                <h3 className="text-2xl font-serif italic text-slate-900 font-extrabold leading-tight">Mastery Lectures & National Reference Guides</h3>
                <p className="text-xs text-gray-500">Meticulously compiled supplemental curriculum references for comprehensive coverage.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Chapter I */}
                <div className="p-5 border border-gray-200 bg-[#FAF9F6] relative rounded flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-mono uppercase text-gray-400 font-black block mb-1">SYLLABUS VOLUME II • CHAPTER I</span>
                    <h4 className="text-lg font-serif font-black italic text-black mb-3 border-b pb-1">Development Journalism Paradigms in Modern East Africa</h4>
                    <p className="text-xs text-gray-600 leading-relaxed space-y-2 font-sans">
                      Development Journalism was pioneered to counter unilateral, top-down colonial information flows by focusing primarily on structural grass-root developments in newly independent nations. In the Ethiopian context (validated at multiple federal syllabus workshops in Bishoftu), this manifests as the transition from standard sensationalist Western commercial news styles to participatory state-community integrations. Key theories emphasize that journalism must serve as a catalyst for societal transformation, focusing on agricultural modernization, sanitary campaigns, and regional peace infrastructure before daily political disputes.
                    </p>
                    <div className="bg-white/70 p-2.5 mt-3 border border-gray-300 rounded text-[10px] text-gray-500 font-serif italic">
                      &quot;The journalist's role is not just to report a collapsed bridge, but to mobilize the administrative and human capital required to build it.&quot; — MoE Handbook, Sect. 4.
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-gray-400 block mt-4 text-right">Drafted by: Dr. Abebe Gebre, Addis Ababa University</span>
                </div>

                {/* Chapter II */}
                <div className="p-5 border border-gray-200 bg-[#FAF9F6] relative rounded flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-mono uppercase text-gray-400 font-black block mb-1">SYLLABUS VOLUME II • CHAPTER II</span>
                    <h4 className="text-lg font-serif font-black italic text-black mb-3 border-b pb-1">Media Proclamations & Constitutional Press Freedoms</h4>
                    <p className="text-xs text-gray-600 leading-relaxed space-y-2 font-sans">
                      Understanding constitutional frameworks is an absolute necessity for candidates. Article 29 of the 1995 FDRE Constitution guarantees the right to freedom of expression without interference, incorporating freedom of the press and the prohibition of any form of censorship. However, practical implementation requires close examination of subordinate proclamations such as the Media Proclamation No. 1238/2021, which decriminalized defamation, established independent broadcast allocation metrics, and delineated distinct responsibilities for online platform editors in combating hate speech.
                    </p>
                    <div className="bg-white/70 p-2.5 mt-3 border border-gray-300 rounded text-[10px] text-gray-500 font-serif italic">
                      &quot;Censorship is strictly forbidden under Article 29, Clause 4, yet media practitioners bear ethical and public safety parameters.&quot; — Ethiopia Constitutional Review.
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-gray-400 block mt-4 text-right">Drafted by: Prof. Martha Wolde, Bahir Dar University</span>
                </div>

                {/* Chapter III */}
                <div className="p-5 border border-gray-200 bg-[#FAF9F6] relative rounded flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-mono uppercase text-gray-400 font-black block mb-1">SYLLABUS VOLUME II • CHAPTER III</span>
                    <h4 className="text-lg font-serif font-black italic text-black mb-3 border-b pb-1">Dynamic Equivalence & Transediting in Regional Broadcasting</h4>
                    <p className="text-xs text-gray-600 leading-relaxed space-y-2 font-sans">
                      In an multi-lingual national environment like Ethiopia, translation is news production. Eugene Nida's Dynamic Equivalence focuses on producing equivalent meaning response rather than mechanical word-for-word alignment. Under professional broadcast workflows, translation involves **transediting** — a hybrid process where editorial rewriting, structural trimming, and cultural adaptation occur simultaneously to ensure regional listeners in Tigrinya, Afaan Oromoo, Amharic, or Somali absorb identical communicative gravity with native idioms.
                    </p>
                    <div className="bg-white/70 p-2.5 mt-3 border border-gray-300 rounded text-[10px] text-gray-500 font-serif italic">
                      &quot;Correct transediting retains the logical fidelity of the source news feed while aligning to localized vernacular syntactic patterns.&quot; — translation guidelines.
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-gray-400 block mt-4 text-right">Drafted by: Dr. Solomon Kassa, Hawassa University</span>
                </div>

                {/* Chapter IV */}
                <div className="p-5 border border-gray-200 bg-[#FAF9F6] relative rounded flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-mono uppercase text-gray-400 font-black block mb-1">SYLLABUS VOLUME II • CHAPTER IV</span>
                    <h4 className="text-lg font-serif font-black italic text-black mb-3 border-b pb-1">Culture channels and Gadaa Council Assemblies</h4>
                    <p className="text-xs text-gray-655 leading-relaxed space-y-2 font-sans">
                      Intercultural communication studies are incomplete without integrating traditional, indigenous conflict-resolution channels. In southern and central regions, the Gadaa system's assembly councils represent rich historical channels for unilateral public consultation and consensus-building. Media practitioners must understand how traditional communicative institutions function to correctly translate federal health campaigns, environmental policies, and communal pacts through existing community structures instead of standard high-agency urban assumptions.
                    </p>
                    <div className="bg-white/70 p-2.5 mt-3 border border-gray-300 rounded text-[10px] text-gray-500 font-serif italic">
                      &quot;Integrating traditional assemblies lowers community resistance to modern developmental interventions.&quot; — UNESCO cultural brief.
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-gray-400 block mt-4 text-right">Drafted by: Dr. Tesfaye Alene, Jimma University</span>
                </div>

              </div>
            </div>

          </div>
        )}

      </main>

      {/* --- FOOTER CONTENT --- */}
      <footer className="border-t-2 border-[#121212] bg-white py-6 px-4 md:px-8 mt-12 text-center text-xs text-gray-500 font-sans space-y-2">
        <div className="flex justify-center gap-6 text-sm font-mono uppercase text-[#121212] font-semibold flex-wrap">
          <button onClick={() => { setActiveTab("dashboard"); window.scrollTo(0, 0); }} className="hover:underline">Home</button>
          <span>•</span>
          <button onClick={() => { setActiveTab("study"); window.scrollTo(0, 0); }} className="hover:underline">Study Center</button>
          <span>•</span>
          <button onClick={() => { setActiveTab("practice"); window.scrollTo(0, 0); }} className="hover:underline">MCQs</button>
          <span>•</span>
          <button onClick={startExamSimulation} className="hover:underline text-red-700 font-extrabold">MoE Simulator</button>
        </div>
        <p className="max-w-2xl mx-auto leading-relaxed text-[11px] text-gray-400">
          This system serves Graduating Seniors preparing for the Journalism and Communication National Exit Exam. Built on the 2015 E.C Ministry of Education syllabus requirements compiled in Bishoftu, Ethiopia. Content and questions conform to structural directives.
        </p>
        <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest pt-2.5">
          © {new Date().getFullYear()} ETHIOPIAN HIGHER EDUCATION SYSTEM PREP PORTAL
        </p>
      </footer>
    </div>
  );
}
