/*
  ==============================================================
  ETHIOPIAN EXIT EXAM PREP - CORE APPLICATION CONTROLLER (JS)
  Clean, Offline-First, Full Interactive Feature Suite
  ==============================================================
*/

// --- STATE MANAGEMENT ---
const state = {
  activeTab: 'modules',
  
  // Modules & Study Sub-Tools
  currentModuleIdx: 0,
  activeModuleTool: 'flashcards', // 'flashcards' | 'practice'
  
  // Flashcards state
  activeCardIdx: 0,
  isCardFlipped: false,
  
  // Practice Exam state
  practiceQuestions: [],
  currentPracticeQIdx: 0,
  practiceSelectedOptIdx: null,
  practiceAnsweredStates: {}, // qId -> selectedOptIdx
  
  // Textbook state
  activeTextbookModuleIdx: null,
  activeTextbookChapterIdx: null,
  
  // Exam Simulator state
  simActive: false,
  simQuestions: [],
  currentSimQIdx: 0,
  simAnswers: {},       // qIdx -> selectedOptIdx
  simBookmarks: new Set(),
  simTimerInterval: null,
  simSecondsLeft: 7200, // 2 Hours (120 Mins)
  simResults: null,
  
  // Study Journal state
  journals: [],
  activeJournalId: null,
  
  // Chat Advisor State
  chatHistory: []
};

// --- MARKDOWN PASS-THRU RENDERER ---
// An exceptionally fast, robust regex-based offline parser that translates markdown content into semantic, stylized HTML structures
function parseMarkdownToHtml(markdown) {
  if (!markdown) return '';
  let html = markdown;
  
  // Headers
  html = html.replace(/^##\s+(.*)$/gmi, '<h3 style="color:var(--color-primary); font-size:1.25rem; font-weight:700; border-bottom:1.5px solid var(--color-border); padding-bottom:0.25rem; margin-top:1.5rem; margin-bottom:0.75rem;">$1</h3>');
  html = html.replace(/^###\s+(.*)$/gmi, '<h4 style="color:var(--color-secondary); font-size:1.05rem; font-weight:700; margin-top:1.25rem; margin-bottom:0.5rem;">$1</h4>');
  
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--color-dark);">$1</strong>');
  
  // Bullet Points
  // Handle lists line-by-line helper
  const lines = html.split('\n');
  let inList = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('*') || line.startsWith('-') || (/^\d+\.\s+/.test(line))) {
      const content = line.replace(/^[*-\d.]\s+/, '');
      if (!inList) {
        lines[i] = '<ul style="padding-left:1.5rem; margin-bottom:1rem; display:flex; flex-direction:column; gap:0.35rem;"><li>' + content + '</li>';
        inList = true;
      } else {
        lines[i] = '<li>' + content + '</li>';
      }
    } else {
      if (inList) {
        lines[i - 1] = lines[i - 1] + '</ul>';
        inList = false;
      }
    }
  }
  if (inList) {
    lines[lines.length - 1] = lines[lines.length - 1] + '</ul>';
  }
  html = lines.join('\n');
  
  // Replace spacing and carriage returns with visual line splits, keeping structural HTML tag containers safe
  html = html.replace(/\n\n/g, '<p style="margin-bottom:1rem;"></p>');
  
  return html;
}

// --- TAB MAIN NAVIGATION SYSTEM ---
function switchTab(tabId) {
  state.activeTab = tabId;
  
  // Update Buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  const activeBtn = document.getElementById(`btn-tab-${tabId}`);
  if (activeBtn) activeBtn.classList.add('active');
  
  // Update Content Panels
  document.querySelectorAll('.tab-content').forEach(view => {
    view.classList.add('hidden');
  });
  const activeView = document.getElementById(`view-${tabId}`);
  if (activeView) activeView.classList.remove('hidden');
  
  // Performance-specific tab initializations
  if (tabId === 'journals' || tabId === 'journal') {
    renderJournalsList();
  } else if (tabId === 'textbook') {
    renderTextbookSidebar();
  }
}

// --- 📁 CURRICULUM MODULE WORKSPACE ---
function initModulesView() {
  const container = document.getElementById('module-sidebar-list');
  if (!container) return;
  
  container.innerHTML = '';
  window.courseModules.forEach((mod, idx) => {
    const btn = document.createElement('div');
    btn.className = `module-list-item ${idx === state.currentModuleIdx ? 'selected' : ''}`;
    btn.id = `sidebar-mod-btn-${idx}`;
    btn.onclick = () => selectModule(idx);
    
    // Core Title markup
    btn.innerHTML = `
      <div style="text-align: left;">
        <span class="font-mono text-xs text-subtle" style="display-block; margin-bottom:0.15rem;">UNIT ${idx+1}</span>
        <div style="font-size:0.95rem;">${mod.title}</div>
      </div>
      <span>&rarr;</span>
    `;
    
    container.appendChild(btn);
  });
  
  renderSelectedModule();
}

function selectModule(moduleIdx) {
  // Reset selected highlights
  const oldBtn = document.getElementById(`sidebar-mod-btn-${state.currentModuleIdx}`);
  if (oldBtn) oldBtn.classList.remove('selected');
  
  state.currentModuleIdx = moduleIdx;
  
  const newBtn = document.getElementById(`sidebar-mod-btn-${moduleIdx}`);
  if (newBtn) newBtn.classList.add('selected');
  
  renderSelectedModule();
}

function renderSelectedModule() {
  const mod = window.courseModules[state.currentModuleIdx];
  if (!mod) return;
  
  document.getElementById('mod-unit-badge').textContent = mod.academicUnit;
  document.getElementById('mod-title').textContent = mod.title;
  document.getElementById('mod-description').textContent = mod.shortDesc;
  
  // Render Objectives
  const objBox = document.getElementById('mod-objectives');
  objBox.innerHTML = '';
  mod.objectives.forEach(obj => {
    const item = document.createElement('div');
    item.className = 'objective-item';
    item.innerHTML = `<span>★</span><p>${obj}</p>`;
    objBox.appendChild(item);
  });
  
  // Trigger subtools refresh
  state.activeCardIdx = 0;
  state.isCardFlipped = false;
  renderFlashcard();
  
  // Setup Practice questions for this module
  state.practiceQuestions = window.mockQuestions.filter(q => q.moduleIndex === state.currentModuleIdx);
  state.currentPracticeQIdx = 0;
  state.practiceSelectedOptIdx = null;
  renderPracticeQuestion();
}

function setModuleTool(toolId) {
  state.activeModuleTool = toolId;
  const tcBack = document.getElementById('subtab-btn-flashcards');
  const tcPrac = document.getElementById('subtab-btn-practice');
  
  tcBack.className = 'neobrutal-btn neobrutal-btn-sm';
  tcPrac.className = 'neobrutal-btn neobrutal-btn-sm';
  
  if (toolId === 'flashcards') {
    tcBack.classList.add('neobrutal-btn-warning');
    document.getElementById('subview-flashcards').classList.remove('hidden');
    document.getElementById('subview-practice').classList.add('hidden');
    renderFlashcard();
  } else {
    tcPrac.classList.add('neobrutal-btn-secondary');
    document.getElementById('subview-flashcards').classList.add('hidden');
    document.getElementById('subview-practice').classList.remove('hidden');
    renderPracticeQuestion();
  }
}

// --- 🃏 DEEPMIND ACTIVE RECALL FLASHCARDS ---
function renderFlashcard() {
  const mod = window.courseModules[state.currentModuleIdx];
  if (!mod || !mod.keyConcepts) return;
  
  const concepts = mod.keyConcepts;
  const total = concepts.length;
  
  document.getElementById('card-progress-text').textContent = `${state.activeCardIdx + 1} / ${total} Concepts`;
  
  const currentConcept = concepts[state.activeCardIdx];
  if (!currentConcept) return;
  
  // Front term
  document.getElementById('card-term').textContent = currentConcept.term;
  
  // Back description
  document.getElementById('card-definition').textContent = currentConcept.definition;
  
  // Back custom bullets
  const list = document.getElementById('card-bullets');
  list.innerHTML = '';
  currentConcept.bulletPoints.forEach(pt => {
    const li = document.createElement('li');
    li.style.marginBottom = '0.35rem';
    li.innerHTML = `<strong style="color:var(--color-secondary);">${pt.split(':')[0] || ''}:</strong> ${pt.split(':').slice(1).join(':') || ''}`;
    list.appendChild(li);
  });
  
  // Clear flip status upon card swap
  const fc = document.getElementById('flashcard-element');
  fc.classList.remove('flipped');
  state.isCardFlipped = false;
}

function flipFlashcard() {
  const fc = document.getElementById('flashcard-element');
  fc.classList.toggle('flipped');
  state.isCardFlipped = !state.isCardFlipped;
}

function prevCard() {
  const mod = window.courseModules[state.currentModuleIdx];
  const max = mod.keyConcepts.length;
  state.activeCardIdx = (state.activeCardIdx - 1 + max) % max;
  renderFlashcard();
}

function nextCard() {
  const mod = window.courseModules[state.currentModuleIdx];
  const max = mod.keyConcepts.length;
  state.activeCardIdx = (state.activeCardIdx + 1) % max;
  renderFlashcard();
}

// --- 📝 PRACTICE MULTIPLE CHOICE TESTS ---
function renderPracticeQuestion() {
  const questionsList = state.practiceQuestions;
  if (!questionsList || questionsList.length === 0) return;
  
  const q = questionsList[state.currentPracticeQIdx];
  if (!q) return;
  
  // Calculate module score live
  let solved = 0;
  let correct = 0;
  questionsList.forEach(item => {
    if (state.practiceAnsweredStates[item.id] !== undefined) {
      solved++;
      if (state.practiceAnsweredStates[item.id] === item.correctOptionIndex) {
        correct++;
      }
    }
  });
  document.getElementById('module-score-pill').textContent = `Correct: ${correct} / ${questionsList.length}`;
  
  // Fill Question Text
  document.getElementById('prac-q-text').innerHTML = `
    <span class="font-mono text-xs px-2 py-0.5" style="border:1.5px solid var(--color-border); background-color: var(--color-canvas); margin-right:0.5rem;">Q-${state.currentPracticeQIdx + 1}</span> 
    ${q.questionText}
  `;
  
  const cont = document.getElementById('prac-options-container');
  cont.innerHTML = '';
  
  const selectedSaved = state.practiceAnsweredStates[q.id];
  const isAnswered = selectedSaved !== undefined;
  
  q.options.forEach((opt, oIdx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.id = `prac-opt-${oIdx}`;
    
    // Alphabet indicator prefix
    const alphabet = ['A', 'B', 'C', 'D'][oIdx] || '';
    
    btn.innerHTML = `
      <span class="option-prefix">${alphabet}</span>
      <span>${opt}</span>
    `;
    
    if (isAnswered) {
      btn.disabled = true;
      btn.style.cursor = 'default';
      
      // Determine correct vs wrong formatting
      if (oIdx === q.correctOptionIndex) {
        btn.classList.add('correct');
      } else if (oIdx === selectedSaved) {
        btn.classList.add('incorrect');
      }
    } else {
      btn.onclick = () => selectPracticeAnswer(oIdx);
    }
    
    cont.appendChild(btn);
  });
  
  // Handle explanation display
  const explBox = document.getElementById('prac-explanation-box');
  if (isAnswered) {
    document.getElementById('prac-explanation-text').textContent = q.explanation;
    explBox.classList.remove('hidden');
  } else {
    explBox.classList.add('hidden');
  }
}

function selectPracticeAnswer(optIdx) {
  const q = state.practiceQuestions[state.currentPracticeQIdx];
  if (!q) return;
  
  // Save answer
  state.practiceAnsweredStates[q.id] = optIdx;
  
  // Re-render immediately to lock and display highlights
  renderPracticeQuestion();
}

function prevPracticeQuestion() {
  if (state.currentPracticeQIdx > 0) {
    state.currentPracticeQIdx--;
    renderPracticeQuestion();
  }
}

function nextPracticeQuestion() {
  const questionsList = state.practiceQuestions;
  if (state.currentPracticeQIdx < questionsList.length - 1) {
    state.currentPracticeQIdx++;
    renderPracticeQuestion();
  }
}

// --- 📖 STUDIO TEXTBOOK LIBRARY VIEW ---
function renderTextbookSidebar() {
  const container = document.getElementById('textbook-sidebar-modules-list');
  if (!container) return;
  
  container.innerHTML = '';
  window.courseModules.forEach((mod, idx) => {
    const accordionBtn = document.createElement('button');
    accordionBtn.className = 'chapter-accordion-btn';
    accordionBtn.id = `tb-acc-btn-${idx}`;
    accordionBtn.onclick = () => toggleTextbookAccordion(idx);
    
    accordionBtn.innerHTML = `
      <div style="max-width:85%;">
        <span class="font-mono text-xs block text-subtle">UNIT ${idx+1}</span>
        <div style="font-size:0.87rem; line-height:1.2;">${mod.title}</div>
      </div>
      <span id="tb-acc-caret-${idx}">&darr;</span>
    `;
    container.appendChild(accordionBtn);
    
    // Accordion contents
    const contentsDiv = document.createElement('div');
    contentsDiv.className = 'chapter-accordion-content hidden';
    contentsDiv.id = `tb-acc-content-${idx}`;
    
    const chapters = window.courseChapters[idx] || [];
    if (chapters.length === 0) {
      contentsDiv.innerHTML = '<p class="text-xs text-subtle italic">No syllabus chapters loaded</p>';
    } else {
      chapters.forEach((chap, cIdx) => {
        const item = document.createElement('div');
        item.style.padding = '0.5rem 0';
        item.style.borderBottom = '1px solid #eeeeee';
        item.style.cursor = 'pointer';
        item.style.fontSize = '0.82rem';
        item.className = 'tb-chap-item-link';
        item.id = `tb-chap-link-${idx}-${cIdx}`;
        item.onclick = (e) => {
          e.stopPropagation();
          viewTextbookChapter(idx, cIdx);
        };
        
        item.innerHTML = `
          <strong style="color:var(--color-primary);">§ Chapter ${cIdx+1}</strong>
          <div style="font-weight:500; font-family:var(--font-sans); color:var(--color-dark); margin-top:0.15rem;">${chap.title}</div>
        `;
        contentsDiv.appendChild(item);
      });
    }
    container.appendChild(contentsDiv);
  });
  
  // Re-open active accordion if exists
  if (state.activeTextbookModuleIdx !== null) {
    const acc = document.getElementById(`tb-acc-content-${state.activeTextbookModuleIdx}`);
    if (acc) acc.classList.remove('hidden');
    const caret = document.getElementById(`tb-acc-caret-${state.activeTextbookModuleIdx}`);
    if (caret) caret.textContent = '↑';
  }
}

function toggleTextbookAccordion(moduleIdx) {
  const content = document.getElementById(`tb-acc-content-${moduleIdx}`);
  const caret = document.getElementById(`tb-acc-caret-${moduleIdx}`);
  
  const isHidden = content.classList.contains('hidden');
  
  // Close all other accordions to maintain sidebar hygiene
  document.querySelectorAll('.chapter-accordion-content').forEach(c => c.classList.add('hidden'));
  document.querySelectorAll('[id^="tb-acc-caret-"]').forEach(p => p.textContent = '↓');
  
  if (isHidden) {
    content.classList.remove('hidden');
    if (caret) caret.textContent = '↑';
    state.activeTextbookModuleIdx = moduleIdx;
  } else {
    state.activeTextbookModuleIdx = null;
  }
}

function viewTextbookChapter(moduleIdx, chapIdx) {
  state.activeTextbookModuleIdx = moduleIdx;
  state.activeTextbookChapterIdx = chapIdx;
  
  // Style active item link
  document.querySelectorAll('.tb-chap-item-link').forEach(link => {
    link.style.backgroundColor = 'transparent';
    link.style.borderLeft = 'none';
    link.style.paddingLeft = '0';
  });
  const el = document.getElementById(`tb-chap-link-${moduleIdx}-${chapIdx}`);
  if (el) {
    el.style.backgroundColor = 'var(--color-primary-light)';
    el.style.borderLeft = '3px solid var(--color-primary)';
    el.style.paddingLeft = '0.5rem';
  }
  
  const chap = window.courseChapters[moduleIdx][chapIdx];
  if (!chap) return;
  
  document.getElementById('tb-chapter-count').textContent = `UNIT ${moduleIdx + 1} • CHAPTER ${chapIdx + 1}`;
  document.getElementById('tb-chapter-title').textContent = chap.title;
  
  // Parse Content
  const bodyBox = document.getElementById('tb-chapter-content-box');
  const markdownParsed = parseMarkdownToHtml(chap.fullContent);
  
  bodyBox.innerHTML = `
    <div style="background-color: var(--color-secondary-light); border: 2px dashed var(--color-secondary); padding: 1rem; margin-bottom: 1.5rem; font-family: var(--font-sans); border-radius: 4px;">
      <strong style="color:var(--color-secondary);">🎯 Syllabus Competency Focus:</strong>
      <p style="font-size:0.88rem; margin-top:0.25rem; font-weight:500;">${chap.syllabusGoals}</p>
    </div>
    <div style="font-family: var(--font-sans);">
      ${markdownParsed}
    </div>
  `;
}

// --- ⏱️ COUNTDOWN NATIONAL EXAM SIMULATOR ---
function startSimulatedExam() {
  state.simActive = true;
  state.simSecondsLeft = 7200; // Reset Time to 2 Hours (120 Mins)
  state.simAnswers = {};
  state.simBookmarks.clear();
  state.currentSimQIdx = 0;
  
  // Dynamite Assembly: 10 random questions from each of the 10 core modules
  const chosenAll = [];
  window.courseModules.forEach((mod, mIdx) => {
    const modQs = window.mockQuestions.filter(q => q.moduleIndex === mIdx);
    
    // Shuffle the 50 module questions and clip exactly 10
    const shuffledModQs = [...modQs].sort(() => 0.5 - Math.random());
    const subset = shuffledModQs.slice(0, 10);
    
    // We shuffle options within these final 10 chosen questions to guarantee different layouts on reuse
    const finalized = subset.map(q => window.shuffleQuestionOptions(q));
    chosenAll.push(...finalized);
  });
  
  // Shuffling the overall array so modules are mixed is standard practice!
  state.simQuestions = chosenAll.sort(() => 0.5 - Math.random());
  
  // UI Panels swapping
  document.getElementById('sim-start-panel').classList.add('hidden');
  document.getElementById('sim-exam-board').classList.remove('hidden');
  document.getElementById('sim-results-panel').classList.add('hidden');
  
  // Update status bars
  document.getElementById('sim-state-text').textContent = 'EXAM RUNNING';
  document.getElementById('sim-state-text').className = 'sim-stat-val text-primary';
  
  // Generate Navigation Grid
  generateSimNavigationGrid();
  renderSimQuestionCard();
  
  // Start countdown timer securely
  if (state.simTimerInterval) clearInterval(state.simTimerInterval);
  state.simTimerInterval = setInterval(updateSimTimerTick, 1000);
}

function updateSimTimerTick() {
  if (state.simSecondsLeft > 0) {
    state.simSecondsLeft--;
    
    // Formulate Display minutes:seconds
    const mins = Math.floor(state.simSecondsLeft / 60);
    const secs = state.simSecondsLeft % 60;
    
    const formatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    document.getElementById('sim-timer-val').textContent = formatted;
    
    // Trigger alarm warning color when time is lower than 5 minutes
    if (state.simSecondsLeft < 300) {
      document.getElementById('sim-timer-val').className = 'sim-stat-val text-danger bold';
    } else {
      document.getElementById('sim-timer-val').className = 'sim-stat-val';
    }
  } else {
    // Time's up! Force absolute submission
    clearInterval(state.simTimerInterval);
    alert("TIME IS UP! Your exam sheet will be graded automatically now.");
    confirmSubmitSimExam();
  }
}

function generateSimNavigationGrid() {
  const container = document.getElementById('sim-grid-nav-container');
  if (!container) return;
  
  container.innerHTML = '';
  for (let i = 0; i < 100; i++) {
    const box = document.createElement('div');
    box.className = 'nav-q-box';
    box.id = `nav-box-sim-${i}`;
    box.textContent = i + 1;
    box.onclick = () => jumpToSimQuestion(i);
    
    container.appendChild(box);
  }
  
  updateSimGridVisualColoring();
}

function updateSimGridVisualColoring() {
  for (let i = 0; i < 100; i++) {
    const el = document.getElementById(`nav-box-sim-${i}`);
    if (!el) continue;
    
    // Strip stale formats
    el.className = 'nav-q-box';
    
    // Check context criteria sequential
    if (i === state.currentSimQIdx) {
      el.classList.add('active');
    } else if (state.simBookmarks.has(i)) {
      el.classList.add('bookmarked');
    } else if (state.simAnswers[i] !== undefined) {
      el.classList.add('answered');
    }
  }
}

function renderSimQuestionCard() {
  const q = state.simQuestions[state.currentSimQIdx];
  if (!q) return;
  
  // Header details
  document.getElementById('sim-core-mod-label').textContent = `${q.courseName} (Comps weighting)`;
  document.getElementById('sim-q-header').textContent = `Competency Test Unit ${state.currentSimQIdx + 1} of 100`;
  document.getElementById('sim-q-indicator-text').textContent = `${state.currentSimQIdx + 1} / 100`;
  
  // Question Body
  document.getElementById('sim-q-text').textContent = q.questionText;
  
  // Options
  const cont = document.getElementById('sim-options-container');
  cont.innerHTML = '';
  
  const savedAnsIdx = state.simAnswers[state.currentSimQIdx];
  
  q.options.forEach((opt, oIdx) => {
    const btn = document.createElement('button');
    btn.className = `option-btn ${savedAnsIdx === oIdx ? 'selected' : ''}`;
    btn.id = `sim-opt-item-${oIdx}`;
    
    const alphabet = ['A', 'B', 'C', 'D'][oIdx] || '';
    btn.innerHTML = `
      <span class="option-prefix">${alphabet}</span>
      <span>${opt}</span>
    `;
    
    btn.onclick = () => selectSimAnswer(oIdx);
    cont.appendChild(btn);
  });
  
  // Stat counts
  const answeredTotal = Object.keys(state.simAnswers).length;
  document.getElementById('sim-completion-val').textContent = `${answeredTotal} / 100`;
  document.getElementById('sim-flags-count').textContent = state.simBookmarks.size;
  
  updateSimGridVisualColoring();
}

function selectSimAnswer(optIdx) {
  state.simAnswers[state.currentSimQIdx] = optIdx;
  
  // Shift grid colors
  renderSimQuestionCard();
}

function toggleBookmarkSimQuestion() {
  const idx = state.currentSimQIdx;
  if (state.simBookmarks.has(idx)) {
    state.simBookmarks.delete(idx);
  } else {
    state.simBookmarks.add(idx);
  }
  
  renderSimQuestionCard();
}

function jumpToSimQuestion(qIdx) {
  state.currentSimQIdx = qIdx;
  renderSimQuestionCard();
}

function prevSimQuestion() {
  if (state.currentSimQIdx > 0) {
    state.currentSimQIdx--;
    renderSimQuestionCard();
  }
}

function nextSimQuestion() {
  if (state.currentSimQIdx < 99) {
    state.currentSimQIdx++;
    renderSimQuestionCard();
  }
}

function promptSubmitSimExam() {
  const answered = Object.keys(state.simAnswers).length;
  const isAllAnswered = answered === 100;
  
  const modal = document.getElementById('modal-submit-exam-prompt');
  const context = document.getElementById('modal-submit-status-context');
  
  if (isAllAnswered) {
    context.textContent = "Outstanding job! You have filled all 100 required questions. Are you ready to lodge your answer sheet for automatic diagnostic scoring?";
  } else {
    context.textContent = `Warning! You have only completed ${answered} out of 100 questions. Submitting will register 0 marks for all empty entries. Would you like to proceed anyway?`;
  }
  
  modal.classList.remove('hidden');
}

function closeSubmitExamModal() {
  document.getElementById('modal-submit-exam-prompt').classList.add('hidden');
}

function confirmSubmitSimExam() {
  closeSubmitExamModal();
  clearInterval(state.simTimerInterval);
  
  state.simActive = false;
  
  // --- GRADING PIPELINE ---
  let scoreCount = 0;
  const reviewData = [];
  
  state.simQuestions.forEach((q, idx) => {
    const userAns = state.simAnswers[idx];
    const isCorrect = userAns === q.correctOptionIndex;
    if (isCorrect) scoreCount++;
    
    reviewData.push({
      originalIndex: idx,
      questionText: q.questionText,
      options: q.options,
      correctIndex: q.correctOptionIndex,
      userSelectionIndex: userAns !== undefined ? userAns : -1,
      explanation: q.explanation,
      isCorrect: isCorrect,
      courseName: q.courseName
    });
  });
  
  // Stats Compilations
  const pct = scoreCount; // raw equals percent since exam has exactly 100 questions
  const minsElapsed = Math.floor((7200 - state.simSecondsLeft) / 60);
  const secsElapsed = (7200 - state.simSecondsLeft) % 60;
  
  state.simResults = {
    scorePct: pct,
    scoreRaw: scoreCount,
    timeDuration: `${minsElapsed} Minutes ${secsElapsed} Seconds`,
    passed: pct >= 50, // Standard competency line is 50%
    reviewList: reviewData
  };
  
  // UI Display updates
  document.getElementById('sim-exam-board').classList.add('hidden');
  document.getElementById('sim-results-panel').classList.remove('hidden');
  
  // Header outcome style
  const headerCard = document.getElementById('sim-results-card-header');
  const badgeIcon = document.getElementById('sim-result-badge-icon');
  const outcomeText = document.getElementById('sim-result-outcome-text');
  const statusBox = document.getElementById('sim-results-status-box');
  const statusText = document.getElementById('sim-results-badge-status');
  
  document.getElementById('sim-state-text').textContent = 'EXAM GRADED';
  document.getElementById('sim-state-text').className = 'sim-stat-val text-success';
  
  // Set details
  document.getElementById('sim-results-score-percent').textContent = `${pct}%`;
  document.getElementById('sim-results-raw-ratio').textContent = `(${scoreCount} out of 100 correct)`;
  document.getElementById('sim-result-time-text').textContent = `Time Elapsed: ${state.simResults.timeDuration}`;
  
  if (state.simResults.passed) {
    headerCard.style.backgroundColor = 'var(--color-success-light)';
    badgeIcon.textContent = '🏆';
    outcomeText.textContent = 'CONGRATULATIONS! YOU PASSED';
    outcomeText.style.color = 'var(--color-success)';
    statusText.textContent = 'COMPETENT';
    statusText.style.color = 'var(--color-success)';
  } else {
    headerCard.style.backgroundColor = 'var(--color-danger-light)';
    badgeIcon.textContent = '⚠️';
    outcomeText.textContent = 'COMPETENCY NOT MET';
    outcomeText.style.color = 'var(--color-danger)';
    statusText.textContent = 'FAIL';
    statusText.style.color = 'var(--color-danger)';
  }
  
  // Save Attempt to localStorage history files (so progress is retained)
  const pastAttempts = JSON.parse(localStorage.getItem('competencyAttempts') || '[]');
  pastAttempts.push({
    date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
    score: pct,
    status: state.simResults.passed ? 'COMPETENT' : 'REMEDIATION'
  });
  localStorage.setItem('competencyAttempts', JSON.stringify(pastAttempts));
  
  // Render Dynamic Mistakes tables
  renderReviewTable(reviewData);
}

function renderReviewTable(reviewData) {
  const container = document.getElementById('sim-review-scroller-container');
  if (!container) return;
  
  container.innerHTML = '';
  reviewData.forEach((item, idx) => {
    const card = document.createElement('div');
    card.style.border = '2px solid var(--color-border)';
    card.style.margin = '1rem 0 1.5rem';
    card.style.background = 'white';
    
    const bannerColor = item.isCorrect ? 'var(--color-success-light)' : 'var(--color-danger-light)';
    const bannerText = item.isCorrect ? '✓ CORRECT ANSWER' : '✗ INCORRECT / ERROR';
    const bannerStyle = item.isCorrect ? 'color: var(--color-success); font-weight:700;' : 'color: var(--color-danger); font-weight:700;';
    
    card.innerHTML = `
      <div style="background-color: ${bannerColor}; border-bottom: 2px solid var(--color-border); padding: 0.5rem 1rem; display:flex; justify-content:space-between; align-items:center;">
        <span style="${bannerStyle}">${bannerText}</span>
        <span class="font-mono text-xs" style="background:#fff; border:1px solid #121212; padding:0.1rem 0.4rem;">${item.courseName}</span>
      </div>
      <div style="padding: 1.25rem;">
        <p class="bold mb-3 font-sans" style="font-size:1.02rem;">Unit Q-${idx + 1}: ${item.questionText}</p>
        <div style="display:flex; flex-direction:column; gap:0.5rem;" class="mb-4">
          <!-- Render static locked options -->
          ${item.options.map((opt, oIdx) => {
            let specStyle = 'background: white; border: 1.5px solid var(--color-border); padding: 0.5rem; text-align:left; font-size:0.9rem; display:flex; align-items:center; gap:0.5rem;';
            let checkBadge = '<span style="border-radius:50%; border:1.5px solid #121212; background:#e0e0e0; width:18px; height:18px; display:inline-flex; align-items:center; justify-content:center; font-size:0.7rem; font-weight:bold;">' + ['A','B','C','D'][oIdx] + '</span>';
            
            if (oIdx === item.correctIndex) {
              specStyle = 'background: var(--color-success-light); border: 2px solid var(--color-success); color: var(--color-success); font-weight:600; padding: 0.5rem; text-align:left; font-size:0.9rem; display:flex; align-items:center; gap:0.5rem;';
              checkBadge = '<span style="border-radius:50%; border:1.5px solid #121212; background:var(--color-success); color:white; width:18px; height:18px; display:inline-flex; align-items:center; justify-content:center; font-size:0.7rem; font-weight:bold;">✔</span>';
            } else if (oIdx === item.userSelectionIndex) {
              specStyle = 'background: var(--color-danger-light); border: 2px solid var(--color-danger); color: var(--color-danger); padding: 0.5rem; text-align:left; font-size:0.9rem; display:flex; align-items:center; gap:0.5rem;';
              checkBadge = '<span style="border-radius:50%; border:1.5px solid #121212; background:var(--color-danger); color:white; width:18px; height:18px; display:inline-flex; align-items:center; justify-content:center; font-size:0.7rem; font-weight:bold;">✘</span>';
            }
            return `<div style="${specStyle}">${checkBadge} <span>${opt}</span></div>`;
          }).join('')}
        </div>
        <div style="background-color:#f0f7f2; border: 1.5px dashed var(--color-secondary); padding: 0.75rem 1rem;">
          <p class="bold mb-1 text-xs font-mono" style="color:var(--color-secondary);">ACADEMIC EXPLANATION:</p>
          <p style="font-size:0.87rem; color:var(--color-dark);">${item.explanation}</p>
        </div>
      </div>
    `;
    
    container.appendChild(card);
  });
}

function restartSimulatorFull() {
  if (state.simTimerInterval) clearInterval(state.simTimerInterval);
  document.getElementById('sim-start-panel').classList.remove('hidden');
  document.getElementById('sim-exam-board').classList.add('hidden');
  document.getElementById('sim-results-panel').classList.add('hidden');
  
  document.getElementById('sim-state-text').textContent = 'Ready to Begin';
  document.getElementById('sim-state-text').className = 'sim-stat-val text-primary';
  document.getElementById('sim-timer-val').className = 'sim-stat-val';
  document.getElementById('sim-timer-val').textContent = '120:00';
  document.getElementById('sim-completion-val').textContent = '0 / 100';
}

// --- 📝 LOCAL STUDENT STUDY JOURNAL & TEMPLATES ---
function loadJournalsLocalStorage() {
  const local = localStorage.getItem('exitExamNotebooks');
  if (local) {
    state.journals = JSON.parse(local);
  } else {
    // Fill with default prefilled revision note so they see sample data on load
    state.journals = [
      {
        id: 'note-sample-1',
        title: 'Gerbner Cultivation Research Notes',
        dateStr: '06/12/2026 14:30',
        content: 'Systematic overview of Mean World Syndrome:\n- Argues heavy TV viewing leads to exaggerated fear of real-life crime.\n- Distinguishes "mainstreaming" from "resonance" structures.'
      }
    ];
    localStorage.setItem('exitExamNotebooks', JSON.stringify(state.journals));
  }
}

function renderJournalsList() {
  const list = document.getElementById('journal-saved-list');
  if (!list) return;
  
  list.innerHTML = '';
  if (state.journals.length === 0) {
    list.innerHTML = `<p class="text-xs text-subtle italic text-center p-4">No notes logged yet. Use the button below to compose.</p>`;
    return;
  }
  
  state.journals.forEach((item) => {
    const card = document.createElement('div');
    card.className = `journal-entry-card ${state.activeJournalId === item.id ? 'bold' : ''}`;
    card.style.borderWidth = state.activeJournalId === item.id ? '2.5px' : '2px';
    if (state.activeJournalId === item.id) {
      card.style.borderColor = 'var(--color-primary)';
      card.style.backgroundColor = 'var(--color-primary-light)';
    }
    
    card.onclick = () => selectJournal(item.id);
    card.innerHTML = `
      <div class="flex justify-between align-center mb-1">
        <span class="tag-badge">NOTE REVISION</span>
        <span class="font-mono" style="font-size:0.68rem; color:var(--color-subtle);">${item.dateStr.split(' ')[0]}</span>
      </div>
      <div style="font-size:0.87rem; font-weight:600;" class="font-display">${item.title || 'Untitled note'}</div>
    `;
    list.appendChild(card);
  });
}

function selectJournal(id) {
  state.activeJournalId = id;
  const item = state.journals.find(j => j.id === id);
  if (!item) return;
  
  document.getElementById('journal-input-title').value = item.title;
  document.getElementById('journal-input-body').value = item.content;
  document.getElementById('journal-char-count').textContent = `${item.content.length} characters logged`;
  
  renderJournalsList();
}

function createNewJournalFromScratch() {
  state.activeJournalId = null;
  document.getElementById('journal-input-title').value = '';
  document.getElementById('journal-input-body').value = '';
  document.getElementById('journal-char-count').textContent = '0 characters logged';
  renderJournalsList();
}

function saveActiveJournal() {
  const titleVal = document.getElementById('journal-input-title').value.trim() || 'Untitled revision note';
  const bodyVal = document.getElementById('journal-input-body').value;
  
  const datStr = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  
  if (state.activeJournalId) {
    // Edit existing note
    const idx = state.journals.findIndex(j => j.id === state.activeJournalId);
    if (idx > -1) {
      state.journals[idx].title = titleVal;
      state.journals[idx].content = bodyVal;
      state.journals[idx].dateStr = datStr;
    }
  } else {
    // Create new
    const newId = 'note-' + Date.now();
    const newEntry = {
      id: newId,
      title: titleVal,
      content: bodyVal,
      dateStr: datStr
    };
    state.journals.unshift(newEntry);
    state.activeJournalId = newId;
  }
  
  localStorage.setItem('exitExamNotebooks', JSON.stringify(state.journals));
  renderJournalsList();
  
  // Highlight card counter character count
  document.getElementById('journal-char-count').textContent = `${bodyVal.length} characters logged`;
}

function deleteActiveJournal() {
  if (!state.activeJournalId) {
    createNewJournalFromScratch();
    return;
  }
  
  state.journals = state.journals.filter(j => j.id !== state.activeJournalId);
  localStorage.setItem('exitExamNotebooks', JSON.stringify(state.journals));
  
  createNewJournalFromScratch();
}

const templates = {
  core: `===================================
💡 SYLLABUS CORE FORMULAS & KEY TERMS
===================================
Concept Term: 
Definition Overview: 
Syllabus Weighting Category: 

MY STUDY DIAGNOSTICK TIPS:
* Tip 1: 
* Tip 2: `,
  
  case: `===================================
🗺️ NATIONAL COMPETENCY CASE ANALYSIS
===================================
Ethio-Blueprint Scenario context: 
Systemic Stakeholder interests: 
Legislative redlines applicable: (e.g. Proclamation 1185/2020)

CORE RESOLUTION PATHWAY STRATEGY:
1. 
2. `,
  
  log: `===================================
⏰ DAILY MCQ PRACTICE PROGRESS LOG
===================================
Study Hours Completed today: 
Simulated Score: ____ % (Goal: >=50%)
Chapters remaining to review: 

CHALLENGING CONCEPTS REDEFINED:
- `
};

function stampJournalTemplate(type) {
  const txt = templates[type] || '';
  const area = document.getElementById('journal-input-body');
  area.value = area.value + (area.value ? '\n\n' : '') + txt;
  document.getElementById('journal-char-count').textContent = `${area.value.length} characters logged`;
}

// --- 👨‍🏫 PROFESSOR BERHANU INTUITIVE CHAT ADVISOR ---
function handleAdvisorChatKeyPress(e) {
  if (e.key === 'Enter') {
    sendAdvisorChatQuery();
  }
}

// Advanced context-sensitive dictionary housing accurate, in-depth academic reviews aligned immediately with standard Ethiopian National Exit Competency criteria
const curriculumKnowledgeBase = [
  {
    regex: /(disinformation|misinformation|1185|hate speech|malinformation)/i,
    title: "Proclamation No. 1185/2020 & Information Pathologies",
    response: `Ah, a highly crucial competency line for the final exit examination! Let us unpack **Hate Speech and Disinformation Prevention Proclamation No. 1185/2020** along with our standard taxonomy of information pathologies:

1. **Hate Speech (Proclamation definition):** Statements that deliberately promote, trigger, or spread hatred, discrimination, or violence against individuals or groups based on race, ethnicity, religion, or gender.
2. **Disinformation:** The *deliberate* creation or dissemination of false information intended to mislead public opinion, deceive citizens, or cause widespread public alarm.
3. **Misinformation:** False information shared *without* malicious intent to cause harm (such as a translation slip-up in a fast newsroom).
4. **Malinformation:** Accurate factual information structured out of its physical timeline context to inflict malicious damage or spark ethnic/social conflicts.

**Exam Tip:** Remember that the FDR Constitution Article 29 guarantees press freedom, but Proclamation No. 1185/2020 establishes regulatory parameters to protect public order and civilian safety under strict penalty lines.`
  },
  {
    regex: /(potter box|ethics|kant|utilitarian|philosoph|moral|golden mean)/i,
    title: "The Potter Box Ethical Framework & Classic Philosophies",
    response: `Excellent query on media ethics! On the exit exam, you will frequently be tested on **Ralph Potter's Potter Box** and its philosophical foundations. The Potter Box guides journalists through four chronological quadrants to make a structured moral choice:

1. **Definition Quadrant:** Establish the empirical, objective facts of the ethical dilemma without any value bias.
2. **Values Quadrant:** Compare professional values (e.g., public interest, transparency) against personal and aesthetic considerations.
3. **Principles Quadrant:** Apply classical moral philosophies here:
   - *Kant's Categorical Imperative:* Act on rules that should become universal laws (Deontology; absolute duties like "never tell a lie").
   - *John Stuart Mill's Utilitarianism:* Seek the greatest good/happiness for the greatest number of people (Consequentialism).
   - *Aristotle's Golden Mean:* Virtue lies in the middle path between extremes of deficit and excess (Professional moderation).
4. **Loyalties Quadrant:** Explicitly specify the stakeholders you serve—the public, the source, or the establishment—and choose whose interest takes priority.`
  },
  {
    regex: /(gadaa|indigenous|oromo|chaffee|odaa)/i,
    title: "Indigenous Horizontal Systems: The Oromo Gadaa System",
    response: `The integration of indigenous systems with modern development communication (DevCom) is a cornerstone of Unit 1! Let us deconstruct how the **democratic Oromo Gadaa system** serves participatory communication:

1. **The Chaffee (General Assembly):** Acts as a horizontal, inclusive deliberative assembly where communities debate policy, share resources, and settle disputes via consensual reason rather than top-down decree.
2. **The Odaa (Sacred Tree Council):** Represents the physical symbol and site of democratic consultative meetings. It provides a platform for open, shared public consensus.
3. **Siiqqee Institution:** Serves as a consultative, balance-of-power women's council, asserting gender parity rights.

**Exam Tip:** In DevCom, top-down campaigns (modernization paradigm) often suffer from localized resistance. Blending state media (radio, TV) with horizontal traditional forums like Gadaa yields optimal community participation and long-range development sustainability!`
  },
  {
    regex: /(development journalism|devcom|moderniz|watchdog|participat)/i,
    title: "Development Journalism (DJ) Paradigms & Constraints",
    response: `Ah, development journalism! Let us review the foundational paradigms of **Development Journalism and DevCom** for your competency exam:

1. **Origins:** Emerged in Asian/African post-colonial societies in the 1960s. It rejects purely detached, entertainment-driven reporting and argues communication should serve national progress.
2. **Modernization Theory (1950s):** Top-down information flow assumptions from specialists to masses. Characterized by information dissemination (often criticized for treating recipients as passive targets).
3. **Participatory Model (Bottom-up):** Focuses on community empowerment, direct dialogue, and traditional folklore, enabling communities to define their own developmental challenges.
4. **The Watchdog vs. Cheerleader Tension:**
   - *Cheerleader role:* Promoting government flagging, state development bonds, or flagship actions (e.g., GERD campaigns) without critiquing policy.
   - *Watchdog role:* Investigating development delays, tracing budget leakages, and evaluating structural policy collapses. A professional DJ graduate must defend their investigative autonomy and serve as a constructive critic.`
  },
  {
    regex: /(inverted pyramid|lead|news lead|summary lead)/i,
    title: "Hard-News Inverted Pyramid & Lead Mechanics",
    response: `A highly core, practical journalism competency! Let us outline the structural mechanics of hard-news writing:

1. **The Inverted Pyramid:** Orders information purely in descending order of direct consequence:
   - *Top Tier (Lead):* Most critical facts (Who, What, Where, When, and occasionally Why & How).
   - *Middle Tier (Body):* Contextual details, quotes, and primary sourcing attributions.
   - *Bottom Tier (Tail):* Nice-to-know background details that editors can trim for layout constraints.
2. **The Summary Lead (Core Rules):**
   - Must be brief—aim for a **30-word absolute maximum**.
   - Use the high-impact **active voice** (Subject-Verb-Object construct), placing active actors at the beginning.
   - Lead with the *What* and the *Who*, deferring temporal details (such as the specific date) to secondary clauses.`
  },
  {
    regex: /(broadcast|radio|tv|b-roll|actuality|ear)/i,
    title: "Broadcast Arts: Writing for the Ear and Visual Syntax",
    response: `Excellent query regarding the broadcast news loop! Unlike print media where readers can re-scan a line, broadcast audiences must grasp statements immediately upon hearing.

1. **Writing for the Ear (Conversational Simplicity):**
   - Keep sentences short, punching, and built strictly in active present tense (e.g. 'The Minister reports' instead of 'said').
   - Keep names and titles preceding actions (e.g., "Addis Mayor Adane warns..." rather than "...warns Adane, the Addis Mayor").
   - Spell out complex numbers phonetically and omit unnecessary statistical clutter.
2. **Television Visual Syntax:**
   - *B-Roll:* Background visual footage displayed on screen while the reporter's narrated track runs.
   - *SOT (Sound-on-Tape/Talking Head):* Brief recorded audio interviews with sources.
   - *SVO Construct:* Subject-Verb-Object remains the golden grammatical rule.`
  },
  {
    regex: /(conflict|thomas|style|collaborat|competing|compromis)/i,
    title: "Conflict Management Modes (Thomas-Kilmann Matrix)",
    response: `Let us address the **Thomas-Kilmann Conflict Mode Instrument (TKI)**, which is highly relevant for Unit 9 questions. The TKI charts conflict reactions along two dimensions: assertiveness and cooperativeness.

1. **Competing Style (Win-Lose):** Highly assertive and uncooperative. Focuses purely on asserting authority, often utilized in emergency administrative crises.
2. **Collaborating Style (Win-Win):** High assertiveness coupled with high cooperativeness. Focuses on horizontal dialogue to integrate both parties' underlying interests.
3. **Compromising Style (Middle-Ground):** Medium assertiveness and cooperativeness. Seeks quick, temporary concessions to resolve disputes immediately.
4. **Avoiding Style (Walk-Away):** Unassertive and uncooperative. Postpones action, often used when tensions are too inflamed to permit constructive debate.`
  }
];

function sendAdvisorChatQuery() {
  const inputEl = document.getElementById('advisor-chat-input-field');
  const queryText = inputEl.value.trim();
  if (!queryText) return;
  
  // Clear Input field
  inputEl.value = '';
  
  // Render user bubble
  appendChatBubble('User', queryText, 'user');
  
  // Render typing indicator
  const typId = appendTypingIndicator();
  
  const messagesPayload = [
    { role: "user", content: queryText }
  ];

  // Try online fetch proxy route first, falls back immediately on failure
  fetch('/api/gemini/tutor', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: messagesPayload,
      courseTitle: "Journalism & Communication national curriculum",
      activeConcept: null
    })
  })
  .then(res => {
    if (!res.ok) throw new Error("Offline fallbacks requested");
    return res.json();
  })
  .then(data => {
    removeTypingIndicator(typId);
    if (data && data.content) {
      appendChatBubble('Professor Berhanu', data.content, 'assistant');
    } else {
      triggerOfflineAdvisorLogic(queryText, typId);
    }
  })
  .catch(() => {
    // If offline, process expert regex matching locally
    triggerOfflineAdvisorLogic(queryText, typId);
  });
}

function askProfessorPreset(preset) {
  appendChatBubble('User', preset, 'user');
  const typId = appendTypingIndicator();
  triggerOfflineAdvisorLogic(preset, typId);
}

function triggerOfflineAdvisorLogic(queryText, typingIndicatorId) {
  // Wait exactly 800ms to simulate intellectual thinking
  setTimeout(() => {
    removeTypingIndicator(typingIndicatorId);
    
    let matchedResponse = null;
    for (let i = 0; i < curriculumKnowledgeBase.length; i++) {
      const entry = curriculumKnowledgeBase[i];
      if (entry.regex.test(queryText)) {
        matchedResponse = entry;
        break;
      }
    }
    
    if (matchedResponse) {
      appendChatBubble('Professor Berhanu', matchedResponse.response, 'assistant');
    } else {
      // Default encouraging response with randomized tip of the day!
      const defaultTips = [
        "Review Unit 10's Potter Box. Memorize the four quadrants in their chronological order.",
        "Remember that the FDRE constitutional Article 19 regulates privacy, while Article 29 regulates press freedom.",
        "For radio drafting, names and organizational titles must always precede the quote declaration.",
        "In the RACE PR model, Action planning sits securely between initial diagnostics research and execution communication."
      ];
      const randomTip = defaultTips[Math.floor(Math.random() * defaultTips.length)];
      
      const defaultReply = `Splendid question! While I do not have a specific curriculum chapter mapping on that detailed search term in my offline memory bank, I encourage you to check our **Study Textbook** library and **Exit Exam Simulator** to test your competencies.

**Professor Berhanu's Tip of the Day:**
${randomTip}

Would you like me to clarify the difference between *Disinformation* and *Misinformation*, or go over the *Potter Box framework* quadrants? Please ask!`;
      
      appendChatBubble('Professor Berhanu', defaultReply, 'assistant');
    }
  }, 800);
}

function appendChatBubble(senderName, messageText, speakerClass) {
  const scroller = document.getElementById('advisor-messages-scroller');
  if (!scroller) return;
  
  const bubble = document.createElement('div');
  bubble.className = `bubble bubble-${speakerClass}`;
  
  bubble.innerHTML = `
    <p class="chat-avatar font-mono">${senderName}</p>
    <p style="white-space: pre-wrap; font-size:0.92rem; line-height:1.5;">${messageText}</p>
  `;
  
  scroller.appendChild(bubble);
  scroller.scrollTop = scroller.scrollHeight;
}

function appendTypingIndicator() {
  const scroller = document.getElementById('advisor-messages-scroller');
  if (!scroller) return '';
  
  const id = 'typing-' + Date.now();
  const bubble = document.createElement('div');
  bubble.className = 'bubble bubble-assistant';
  bubble.id = id;
  
  bubble.innerHTML = `
    <p class="chat-avatar font-mono">Professor Berhanu</p>
    <div class="pulse-dots">
      <div class="pulse-dot"></div>
      <div class="pulse-dot"></div>
      <div class="pulse-dot"></div>
    </div>
  `;
  
  scroller.appendChild(bubble);
  scroller.scrollTop = scroller.scrollHeight;
  return id;
}

function removeTypingIndicator(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

// --- APP INIT PIPELINE ---
window.addEventListener('DOMContentLoaded', () => {
  // Test network status on load to set badge
  if (navigator.onLine) {
    document.getElementById('env-badge').textContent = 'ONLINE HOST';
    document.getElementById('env-badge').style.backgroundColor = 'var(--color-primary)';
  } else {
    document.getElementById('env-badge').textContent = 'OFFLINE MODE';
    document.getElementById('env-badge').style.backgroundColor = '#555';
  }
  
  // Track connections status live
  window.addEventListener('online', () => {
    document.getElementById('env-badge').textContent = 'ONLINE HOST';
    document.getElementById('env-badge').style.backgroundColor = 'var(--color-primary)';
  });
  window.addEventListener('offline', () => {
    document.getElementById('env-badge').textContent = 'OFFLINE MODE';
    document.getElementById('env-badge').style.backgroundColor = '#555';
  });

  // Load state and load databases
  loadJournalsLocalStorage();
  initModulesView();
  createNewJournalFromScratch();
  
  // Auto-load welcome message
  appendChatBubble('Professor Berhanu', 'Greetings! I am Professor Berhanu. Ready to help you prepare for the National exit test. Type any topic or keyword like "MIL", "Hate speech", "Gadaa", "Inverted pyramid", "Potter Box", or "Thomas-Kilmann" to begin!', 'assistant');
});
