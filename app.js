/**
 * SISTEM PENTAKSIRAN KEMASUKAN SEKOLAH KHUSUS (PKSK) TINGKATAN 1
 * Portal Rasmi Kementerian Pendidikan Malaysia (KPM) - www.moe.gov.my Style
 * Version: 3.2 (510 Authentic Questions Engine)
 */

(function () {
  'use strict';

  /* =========================================================================
     GLOBAL APPLICATION STATE
     ========================================================================= */
  const state = {
    // Current Active View: 'DASHBOARD' | 'INSTRUCTIONS' | 'EXAM' | 'ESSAY' | 'RESULTS' | 'REVIEW'
    currentView: 'DASHBOARD',
    
    // Mode: 'FULL_SIMULATION' (100 Qs) | 'QUICK_DIAGNOSTIC' (30 Qs) | 'DRILL_PRACTICE' (30 Qs)
    mode: 'FULL_SIMULATION',
    drillTopic: 'ALL_INSANIAH',

    // Candidate Profile
    candidate: {
      name: '',
      ic: '',
      indexNo: '',
      targetSchool: 'SBP'
    },

    // Active Questions and Answers
    sessionQuestions: [],
    currentIndex: 0,
    userAnswers: {},       // { [question_id]: 'A' | 'B' | 'C' | 'D' }
    flaggedQuestions: {},   // { [question_id]: true }
    paletteFilter: 'ALL',  // 'ALL' | 'PART_A' | 'PART_B' | 'FLAGGED'

    // Essay Articulation (Bahagian C)
    essayText: '',
    essayTopic: {
      title: 'Kepentingan Integriti dan Disiplin Kendiri dalam Membentuk Modal Insan Unggul',
      prompt: 'Tulis sebuah karangan berpandu mengenai bagaimana nilai amanah, kejujuran, dan resiliensi mampu membentuk kepimpinan murid cemerlang di sekolah berasrama penuh. Panjang karangan hendaklah tidak kurang daripada 100 patah perkataan.'
    },

    // AI Essay Assessment & Multi-Provider AI State
    aiProvider: localStorage.getItem('pksk_ai_provider') || 'GROQ', // 'GROQ' | 'GEMINI' | 'OPENROUTER'
    geminiApiKey: localStorage.getItem('pksk_gemini_api_key') || '',
    aiEssayAssessment: null,
    isEvaluatingAI: false,

    // Review Workspace State
    reviewFilter: 'ALL', // 'ALL' | 'WRONG' | 'CORRECT' | 'UNANSWERED'

    // Timer State
    timerSecondsLeft: 5400, // 90 mins for full simulation
    timerInterval: null
  };

  /* =========================================================================
     DOM ELEMENT REFERENCES
     ========================================================================= */
  const dom = {
    // Views
    dashboardView: document.getElementById('dashboardView'),
    instructionsView: document.getElementById('instructionsView'),
    examWorkspaceView: document.getElementById('examWorkspaceView'),
    essayWorkspaceView: document.getElementById('essayWorkspaceView'),
    resultsView: document.getElementById('resultsView'),
    reviewWorkspaceView: document.getElementById('reviewWorkspaceView'),

    // Navigation Tabs
    navTabDashboard: document.getElementById('navTabDashboard'),
    navTabFullSim: document.getElementById('navTabFullSim'),
    navTabDiagnostic: document.getElementById('navTabDiagnostic'),
    navTabDrill: document.getElementById('navTabDrill'),
    navTabEssay: document.getElementById('navTabEssay'),
    navTabSlip: document.getElementById('navTabSlip'),
    navHudTimer: document.getElementById('navHudTimer'),
    dispLiveTimer: document.getElementById('dispLiveTimer'),

    // Candidate Meta Displays
    dispCandidateName: document.getElementById('dispCandidateName'),
    dispCandidateIndex: document.getElementById('dispCandidateIndex'),
    inputCandidateName: document.getElementById('inputCandidateName'),
    inputCandidateIc: document.getElementById('inputCandidateIc'),
    inputCandidateIndex: document.getElementById('inputCandidateIndex'),
    selectTargetSchool: document.getElementById('selectTargetSchool'),

    // Dashboard Mode Cards
    cardModeFull: document.getElementById('cardModeFull'),
    cardModeQuick: document.getElementById('cardModeQuick'),
    cardModeDrill: document.getElementById('cardModeDrill'),
    drillTopicGroup: document.getElementById('drillTopicGroup'),
    selectDrillTopic: document.getElementById('selectDrillTopic'),
    btnLaunchInstructions: document.getElementById('btnLaunchInstructions'),

    // Ox Alpha AI Configuration Elements
    btnTestOxAlpha: document.getElementById('btnTestOxAlpha'),
    oxAlphaStatusBadge: document.getElementById('oxAlphaStatusBadge'),
    oxAlphaFeedbackMsg: document.getElementById('oxAlphaFeedbackMsg'),
    essayAiIndicatorBadge: document.getElementById('essayAiIndicatorBadge'),

    // Instructions View
    btnBackToDashboard: document.getElementById('btnBackToDashboard'),
    btnStartExamNow: document.getElementById('btnStartExamNow'),

    // Live Exam Workspace
    sectionBannerStrip: document.getElementById('sectionBannerStrip'),
    dispSectionTitle: document.getElementById('dispSectionTitle'),
    dispQuestionStatusBadge: document.getElementById('dispQuestionStatusBadge'),
    dispQuestionNumberLabel: document.getElementById('dispQuestionNumberLabel'),
    dispSubtopicBadge: document.getElementById('dispSubtopicBadge'),
    dispQuestionText: document.getElementById('dispQuestionText'),
    dispQuestionDiagram: document.getElementById('dispQuestionDiagram'),
    optionsRadioContainer: document.getElementById('optionsRadioContainer'),
    btnPrevQuestion: document.getElementById('btnPrevQuestion'),
    btnNextQuestion: document.getElementById('btnNextQuestion'),
    btnFlagReview: document.getElementById('btnFlagReview'),
    btnFlagLabel: document.getElementById('btnFlagLabel'),
    paletteGridMatrix: document.getElementById('paletteGridMatrix'),
    countPaletteAll: document.getElementById('countPaletteAll'),
    paletteFilterAll: document.getElementById('paletteFilterAll'),
    paletteFilterA: document.getElementById('paletteFilterA'),
    paletteFilterB: document.getElementById('paletteFilterB'),
    paletteFilterFlagged: document.getElementById('paletteFilterFlagged'),
    btnSubmitExamTrigger: document.getElementById('btnSubmitExamTrigger'),

    // Essay View (Bahagian C)
    dispEssayTitle: document.getElementById('dispEssayTitle'),
    dispEssayPrompt: document.getElementById('dispEssayPrompt'),
    btnShuffleEssayTopic: document.getElementById('btnShuffleEssayTopic'),
    inputEssayText: document.getElementById('inputEssayText'),
    dispWordCount: document.getElementById('dispWordCount'),
    btnEssayBackToMcq: document.getElementById('btnEssayBackToMcq'),
    btnSubmitEssayFinal: document.getElementById('btnSubmitEssayFinal'),

    // Results Slip
    slipSubTitle: document.getElementById('slipSubTitle'),
    slipDispName: document.getElementById('slipDispName'),
    slipDispIc: document.getElementById('slipDispIc'),
    slipDispIndex: document.getElementById('slipDispIndex'),
    slipDispTarget: document.getElementById('slipDispTarget'),
    slipHeroBadge: document.getElementById('slipHeroBadge'),
    slipDispTotalScore: document.getElementById('slipDispTotalScore'),
    slipDispStatus: document.getElementById('slipDispStatus'),
    slipScoreTable: document.getElementById('slipScoreTable'),
    slipScoreTableBody: document.getElementById('slipScoreTableBody'),
    aiEssayReportSection: document.getElementById('aiEssayReportSection'),
    btnReturnHomeFromSlip: document.getElementById('btnReturnHomeFromSlip'),
    btnWriteNewEssay: document.getElementById('btnWriteNewEssay'),
    btnReviewAllAnswers: document.getElementById('btnReviewAllAnswers'),

    // Review Workspace
    btnBackToSlipFromReview: document.getElementById('btnBackToSlipFromReview'),
    btnReturnHomeFromReview: document.getElementById('btnReturnHomeFromReview'),
    reviewQuestionsList: document.getElementById('reviewQuestionsList'),
    reviewStatTotal: document.getElementById('reviewStatTotal'),
    reviewStatCorrect: document.getElementById('reviewStatCorrect'),
    reviewStatWrong: document.getElementById('reviewStatWrong'),
    reviewStatUnanswered: document.getElementById('reviewStatUnanswered'),
    countReviewAll: document.getElementById('countReviewAll'),
    countReviewWrong: document.getElementById('countReviewWrong'),
    countReviewCorrect: document.getElementById('countReviewCorrect'),
    countReviewUnanswered: document.getElementById('countReviewUnanswered'),
    btnReviewFilterAll: document.getElementById('btnReviewFilterAll'),
    btnReviewFilterWrong: document.getElementById('btnReviewFilterWrong'),
    btnReviewFilterCorrect: document.getElementById('btnReviewFilterCorrect'),
    btnReviewFilterUnanswered: document.getElementById('btnReviewFilterUnanswered'),

    // Confirmation Modal
    kpmModalOverlay: document.getElementById('kpmModalOverlay'),
    kpmModalSummaryText: document.getElementById('kpmModalSummaryText'),
    btnModalDismiss: document.getElementById('btnModalDismiss'),
    btnModalProceed: document.getElementById('btnModalProceed'),

    // Licensing & Activation Elements
    licenseStatusBadge: document.getElementById('licenseStatusBadge'),
    licenseStatusText: document.getElementById('licenseStatusText'),
    activationModal: document.getElementById('activationModal'),
    inputLicenseKey: document.getElementById('inputLicenseKey'),
    keyCharCount: document.getElementById('keyCharCount'),
    activationAlertBox: document.getElementById('activationAlertBox'),
    btnActivateLicense: document.getElementById('btnActivateLicense'),
    btnCloseActivationModal: document.getElementById('btnCloseActivationModal'),

    // Supabase Settings Modal
    btnOpenSupabaseSettings: document.getElementById('btnOpenSupabaseSettings'),
    supabaseConfigModal: document.getElementById('supabaseConfigModal'),
    inputSupabaseUrl: document.getElementById('inputSupabaseUrl'),
    inputSupabaseAnonKey: document.getElementById('inputSupabaseAnonKey'),
    supabaseConfigAlertBox: document.getElementById('supabaseConfigAlertBox'),
    btnCloseSupabaseConfig: document.getElementById('btnCloseSupabaseConfig'),
    btnSaveSupabaseConfig: document.getElementById('btnSaveSupabaseConfig')
  };

  /* =========================================================================
     DATASET ACCESSOR & SAMPLING ENGINE
     ========================================================================= */
  function getDataset() {
    if (typeof window !== 'undefined' && window.PKSK_DATASET && Array.isArray(window.PKSK_DATASET) && window.PKSK_DATASET.length) {
      return window.PKSK_DATASET;
    }
    if (typeof PKSK_DATASET !== 'undefined' && Array.isArray(PKSK_DATASET) && PKSK_DATASET.length) {
      return PKSK_DATASET;
    }
    return [];
  }

  function generatePkskSession() {
    const dataset = getDataset();
    if (!dataset.length) {
      alert("Ralat: Pangkalan soalan PKSK tidak ditemui. Sila muat semula laman.");
      return [];
    }

    if (state.mode === 'FULL_SIMULATION') {
      // Bahagian A: Exactly 30 questions (Kecerdasan Insaniah: EQ, SQ, SSQ)
      const poolA = dataset.filter(q => q.section === 'BAHAGIAN_A');
      const shuffledA = [...poolA].sort(() => 0.5 - Math.random());
      const selectedA = shuffledA.slice(0, Math.min(30, poolA.length));

      // Bahagian B: Exactly 70 questions (Pengetahuan Am, BM, BI, Matematik, Sains)
      const poolB = dataset.filter(q => q.section === 'BAHAGIAN_B');
      const shuffledB = [...poolB].sort(() => 0.5 - Math.random());
      const selectedB = shuffledB.slice(0, Math.min(70, poolB.length));

      let fullList = [...selectedA, ...selectedB];

      // Safety guarantee: Ensure exactly 100 questions
      if (fullList.length < 100) {
        const usedIds = new Set(fullList.map(q => q.question_id));
        const remaining = dataset.filter(q => !usedIds.has(q.question_id)).sort(() => 0.5 - Math.random());
        fullList = fullList.concat(remaining.slice(0, 100 - fullList.length));
      }

      console.log(`[PKSK SYSTEM] FULL_SIMULATION: Generated exactly ${fullList.length} questions (Part A: ${selectedA.length}, Part B: ${selectedB.length})`);
      return randomizeOptions(fullList.slice(0, 100));
    } 
    else if (state.mode === 'QUICK_DIAGNOSTIC') {
      // Diagnostic: 10 Part A + 20 Part B = 30 questions total
      const poolA = dataset.filter(q => q.section === 'BAHAGIAN_A');
      const poolB = dataset.filter(q => q.section === 'BAHAGIAN_B');
      const selectedA = [...poolA].sort(() => 0.5 - Math.random()).slice(0, 10);
      const selectedB = [...poolB].sort(() => 0.5 - Math.random()).slice(0, 20);
      return randomizeOptions([...selectedA, ...selectedB]);
    }
    else if (state.mode === 'DRILL_PRACTICE') {
      let pool = [];
      if (state.drillTopic === 'ALL_INSANIAH') {
        pool = dataset.filter(q => q.section === 'BAHAGIAN_A');
      } else {
        pool = dataset.filter(q => q.subsection === state.drillTopic);
      }
      if (!pool.length) pool = dataset.filter(q => q.section === 'BAHAGIAN_B');
      const shuffled = [...pool].sort(() => 0.5 - Math.random());
      return randomizeOptions(shuffled.slice(0, Math.min(30, shuffled.length)));
    }
    return [];
  }

  function randomizeOptions(questions) {
    return questions.map(q => {
      if (q.options && q.options.length === 4) {
        const correctText = q.options.find(o => o.id === q.answer)?.text || '';
        const shuffled = [...q.options].sort(() => 0.5 - Math.random());
        const newOptions = shuffled.map((opt, idx) => ({
          id: ['A', 'B', 'C', 'D'][idx],
          text: opt.text
        }));
        const newKey = newOptions.find(o => o.text === correctText)?.id || 'A';
        return {
          ...q,
          options: newOptions,
          answer: newKey
        };
      }
      return q;
    });
  }

  /* =========================================================================
     VIEW SWITCHER & NAVIGATION
     ========================================================================= */
  function switchView(viewName) {
    state.currentView = viewName;

    // Hide all view containers
    dom.dashboardView.classList.add('hidden');
    dom.instructionsView.classList.add('hidden');
    dom.examWorkspaceView.classList.add('hidden');
    dom.essayWorkspaceView.classList.add('hidden');
    dom.resultsView.classList.add('hidden');
    if (dom.reviewWorkspaceView) dom.reviewWorkspaceView.classList.add('hidden');

    // Reset tab active states
    document.querySelectorAll('.nav-tab-btn').forEach(btn => btn.classList.remove('active'));

    // Show HUD timer only during active exam
    if (dom.navHudTimer) {
      if (viewName === 'EXAM' || viewName === 'ESSAY') {
        dom.navHudTimer.style.display = 'flex';
      } else {
        dom.navHudTimer.style.display = 'none';
      }
    }

    if (viewName === 'DASHBOARD') {
      dom.dashboardView.classList.remove('hidden');
      dom.navTabDashboard.classList.add('active');
    } 
    else if (viewName === 'INSTRUCTIONS') {
      dom.instructionsView.classList.remove('hidden');
    }
    else if (viewName === 'EXAM') {
      dom.examWorkspaceView.classList.remove('hidden');
      renderQuestion();
      renderPalette();
    }
    else if (viewName === 'ESSAY') {
      dom.essayWorkspaceView.classList.remove('hidden');
      dom.navTabEssay.classList.add('active');
    }
    else if (viewName === 'RESULTS') {
      dom.resultsView.classList.remove('hidden');
      dom.navTabSlip.classList.add('active');
      renderResultsSlip();
    }
    else if (viewName === 'REVIEW') {
      if (dom.reviewWorkspaceView) {
        dom.reviewWorkspaceView.classList.remove('hidden');
        renderReviewWorkspace();
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  window.selectMode = function(modeName) {
    state.mode = modeName;
    
    dom.cardModeFull.classList.toggle('selected', modeName === 'FULL_SIMULATION');
    dom.cardModeQuick.classList.toggle('selected', modeName === 'QUICK_DIAGNOSTIC');
    dom.cardModeDrill.classList.toggle('selected', modeName === 'DRILL_PRACTICE');

    dom.drillTopicGroup.style.display = (modeName === 'DRILL_PRACTICE') ? 'block' : 'none';
  };

  /* =========================================================================
     EXAM WORKSPACE RENDERING
     ========================================================================= */
  function renderQuestion() {
    const totalQ = state.sessionQuestions.length;
    if (totalQ === 0) return;

    const q = state.sessionQuestions[state.currentIndex];
    if (!q) return;

    // 1. Section Header Banner
    const isPartB = q.section === 'BAHAGIAN_B';
    dom.sectionBannerStrip.className = `section-banner-strip ${isPartB ? 'part-b' : ''}`;
    dom.dispSectionTitle.textContent = isPartB 
      ? 'BAHAGIAN B : KECERDASAN INTELEKTUAL (70%)' 
      : 'BAHAGIAN A : KECERDASAN INSANIAH (20%)';

    // 2. Question Heading & Badges
    dom.dispQuestionNumberLabel.textContent = `Soalan ${state.currentIndex + 1} daripada ${totalQ}`;
    dom.dispSubtopicBadge.textContent = `${q.topic || ''} • ${q.subtopic || ''}`;

    const isAnswered = Boolean(state.userAnswers[q.question_id]);
    dom.dispQuestionStatusBadge.textContent = isAnswered ? 'Status: Telah Dijawab' : 'Status: Belum Dijawab';

    // 3. Question Text
    dom.dispQuestionText.textContent = q.question;

    // 4. Diagram Rendering (WebP / PNG)
    if (q.image_url) {
      dom.dispQuestionDiagram.style.display = 'block';
      dom.dispQuestionDiagram.innerHTML = `
        <img src="${q.image_url}" alt="Rajah Soalan ${state.currentIndex + 1}" loading="lazy">
        <div style="font-size:0.75rem; color:var(--text-muted); margin-top:0.4rem; font-weight:600;">
          Rajah Stimulus Soalan ${state.currentIndex + 1}
        </div>
      `;
    } else {
      dom.dispQuestionDiagram.style.display = 'none';
      dom.dispQuestionDiagram.innerHTML = '';
    }

    // 5. Radio Options
    dom.optionsRadioContainer.innerHTML = '';
    const selectedOpt = state.userAnswers[q.question_id];

    (q.options || []).forEach(opt => {
      const isSelected = selectedOpt === opt.id;
      const optEl = document.createElement('div');
      optEl.className = `kpm-option-item ${isSelected ? 'selected' : ''}`;
      optEl.onclick = () => selectOption(q.question_id, opt.id);

      optEl.innerHTML = `
        <div class="opt-radio-circle">${opt.id}</div>
        <div class="opt-text">${opt.text}</div>
      `;
      dom.optionsRadioContainer.appendChild(optEl);
    });

    // 6. Flag Review Button State
    const isFlagged = Boolean(state.flaggedQuestions[q.question_id]);
    dom.btnFlagLabel.textContent = isFlagged ? 'Tanda Semakan (Aktif)' : 'Tanda untuk Semakan';
    dom.btnFlagReview.style.background = isFlagged ? 'var(--kpm-amber-light)' : '';

    // 7. Navigation Buttons State
    dom.btnPrevQuestion.disabled = state.currentIndex === 0;
    dom.btnPrevQuestion.style.opacity = state.currentIndex === 0 ? '0.5' : '1';

    dom.btnNextQuestion.innerHTML = (state.currentIndex === totalQ - 1)
      ? 'Hantar Bahagian MCQ <i class="fa-solid fa-check"></i>'
      : 'Soalan Seterusnya <i class="fa-solid fa-chevron-right"></i>';
  }

  function selectOption(qId, optId) {
    state.userAnswers[qId] = optId;
    renderQuestion();
    renderPalette();
  }

  function toggleFlagCurrentQuestion() {
    const q = state.sessionQuestions[state.currentIndex];
    if (!q) return;
    if (state.flaggedQuestions[q.question_id]) {
      delete state.flaggedQuestions[q.question_id];
    } else {
      state.flaggedQuestions[q.question_id] = true;
    }
    renderQuestion();
    renderPalette();
  }

  /* =========================================================================
     PALETTE RENDERING & FILTERING (1-100 MATRIX)
     ========================================================================= */
  function renderPalette() {
    dom.paletteGridMatrix.innerHTML = '';
    const totalQ = state.sessionQuestions.length;
    dom.countPaletteAll.textContent = totalQ;

    state.sessionQuestions.forEach((q, idx) => {
      // Filtering logic
      if (state.paletteFilter === 'PART_A' && q.section !== 'BAHAGIAN_A') return;
      if (state.paletteFilter === 'PART_B' && q.section !== 'BAHAGIAN_B') return;
      if (state.paletteFilter === 'FLAGGED' && !state.flaggedQuestions[q.question_id]) return;

      const isAnswered = Boolean(state.userAnswers[q.question_id]);
      const isFlagged = Boolean(state.flaggedQuestions[q.question_id]);
      const isCurrent = state.currentIndex === idx;

      const btn = document.createElement('button');
      let classList = ['palette-q-btn'];
      if (isAnswered) classList.push('answered');
      if (isFlagged) classList.push('flagged');
      if (isCurrent) classList.push('current');

      btn.className = classList.join(' ');
      btn.textContent = idx + 1;
      btn.title = `Soalan ${idx + 1}: ${q.topic || ''} (${isAnswered ? 'Dijawab' : 'Belum Jawab'})`;

      btn.onclick = () => {
        state.currentIndex = idx;
        renderQuestion();
        renderPalette();
      };

      dom.paletteGridMatrix.appendChild(btn);
    });
  }

  function setPaletteFilter(filterType) {
    state.paletteFilter = filterType;
    document.querySelectorAll('.palette-tab-btn').forEach(btn => btn.classList.remove('active'));

    if (filterType === 'ALL') dom.paletteFilterAll.classList.add('active');
    if (filterType === 'PART_A') dom.paletteFilterA.classList.add('active');
    if (filterType === 'PART_B') dom.paletteFilterB.classList.add('active');
    if (filterType === 'FLAGGED') dom.paletteFilterFlagged.classList.add('active');

    renderPalette();
  }

  /* =========================================================================
     TIMER ENGINE
     ========================================================================= */
  function startTimer(durationSeconds) {
    clearInterval(state.timerInterval);
    state.timerSecondsLeft = durationSeconds;
    updateTimerDisplay();

    state.timerInterval = setInterval(() => {
      state.timerSecondsLeft--;
      updateTimerDisplay();

      if (state.timerSecondsLeft <= 0) {
        clearInterval(state.timerInterval);
        alert("Peringatan: Masa menjawab telah tamat. Jawapan anda sedang diproses secara automatik.");
        handleExamCompletion();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const mins = Math.floor(state.timerSecondsLeft / 60);
    const secs = state.timerSecondsLeft % 60;
    const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    
    if (dom.dispLiveTimer) {
      dom.dispLiveTimer.textContent = formatted;

      // Color rules: Blue by default, Yellow if <= 30 mins (1800s), Red if <= 10 mins (600s)
      let timerColor = '#1e40af'; // Blue (> 30 min)
      if (state.timerSecondsLeft <= 600) {
        timerColor = '#dc2626'; // Red (<= 10 min)
      } else if (state.timerSecondsLeft <= 1800) {
        timerColor = '#eab308'; // Yellow / Amber (<= 30 min)
      }

      dom.dispLiveTimer.style.color = timerColor;
      
      const hudIcon = document.getElementById('hudStopwatchIcon');
      if (hudIcon) {
        hudIcon.style.color = timerColor;
      }
    }
  }

  /* =========================================================================
     EXAM WORKFLOW & SUBMISSION
     ========================================================================= */
  function startExam() {
    // Semakan Pengaktifan Lesen Komersial
    if (window.PkskLicense && !window.PkskLicense.isActivated()) {
      openActivationModal(() => startExam());
      return;
    }

    // Sync candidate metadata
    state.candidate.name = dom.inputCandidateName.value.trim() || 'CALON PKSK';
    state.candidate.ic = dom.inputCandidateIc.value.trim() || '-';
    state.candidate.indexNo = dom.inputCandidateIndex.value.trim() || '-';
    state.candidate.targetSchool = dom.selectTargetSchool.value || 'SBP';

    dom.dispCandidateName.textContent = state.candidate.name;
    dom.dispCandidateIndex.textContent = state.candidate.indexNo !== '-' ? `AG: ${state.candidate.indexNo}` : '';

    // Generate questions
    state.sessionQuestions = generatePkskSession();
    state.currentIndex = 0;
    state.userAnswers = {};
    state.flaggedQuestions = {};

    // Start timer (90 mins for full sim, 30 mins for others)
    const duration = state.mode === 'FULL_SIMULATION' ? 5400 : 1800;
    startTimer(duration);

    switchView('EXAM');
  }

  function openSubmitModal() {
    const answeredCount = Object.keys(state.userAnswers).length;
    const totalQ = state.sessionQuestions.length;
    dom.kpmModalSummaryText.innerHTML = `
      Anda telah menjawab <strong>${answeredCount}</strong> daripada <strong>${totalQ}</strong> soalan.<br>
      Adakah anda pasti untuk menamatkan Bahagian A & B sekarang?
    `;
    dom.kpmModalOverlay.style.display = 'flex';
  }

  function handleExamCompletion() {
    dom.kpmModalOverlay.style.display = 'none';
    clearInterval(state.timerInterval);

    if (state.mode === 'FULL_SIMULATION') {
      // Proceed to Bahagian C (Artikulasi Penulisan)
      switchView('ESSAY');
      startTimer(2700); // 45 mins for essay
    } else {
      // Direct to results
      switchView('RESULTS');
    }
  }

  /* =========================================================================
     PKSK AUTHENTIC ESSAY TOPIC BANK & SHUFFLE ENGINE (BAHAGIAN C)
     ========================================================================= */
  const PKSK_ESSAY_TOPICS = [
    {
      id: 'TOPIC_1',
      title: 'Kepentingan Integriti dan Disiplin Kendiri dalam Membentuk Modal Insan Unggul',
      prompt: 'Tulis sebuah karangan berpandu mengenai bagaimana nilai amanah, kejujuran, dan resiliensi mampu membentuk kepimpinan murid cemerlang di sekolah berasrama penuh. Panjang karangan hendaklah tidak kurang daripada 100 patah perkataan.'
    },
    {
      id: 'TOPIC_2',
      title: 'Peranan Kecerdasan Buatan (AI) dan Teknologi Digital dalam Pendidikan Abad Ke-21',
      prompt: 'Huraikan bagaimana teknologi digital dan kecerdasan buatan dapat dimanfaatkan oleh murid secara berhemah untuk meningkatkan pencapaian akademik serta inovasi sains. Panjang karangan hendaklah tidak kurang daripada 100 patah perkataan.'
    },
    {
      id: 'TOPIC_3',
      title: 'Tanggungjawab Generasi Muda dalam Menangani Perubahan Iklim dan Kelestarian Alam',
      prompt: 'Bincangkan peranan murid dan institusi sekolah dalam memupuk amalan hijau, kitar semula, dan penjimatan tenaga demi memelihara bumi untuk masa hadapan. Panjang karangan hendaklah tidak kurang daripada 100 patah perkataan.'
    },
    {
      id: 'TOPIC_4',
      title: 'Kepentingan Gaya Hidup Sihat dan Kesejahteraan Emosi Pelajar Asrama',
      prompt: 'Jelaskan cara-cara mengekalkan kesihatan fizikal yang cergas dan menguruskan tekanan emosi secara positif dalam suasana pembelajaran yang kompetitif. Panjang karangan hendaklah tidak kurang daripada 100 patah perkataan.'
    },
    {
      id: 'TOPIC_5',
      title: 'Perpaduan Kaum sebagai Teras Keharmonian dan Kemakmuran Negara',
      prompt: 'Ulas bagaimana aktiviti kokurikulum, sukan, dan kemasyarakatan di sekolah berupaya merapatkan hubungan antara kaum serta menyemarakkan semangat cintakan tanah air. Panjang karangan hendaklah tidak kurang daripada 100 patah perkataan.'
    },
    {
      id: 'TOPIC_6',
      title: 'Etika Penggunaan Media Sosial dan Pencegahan Buli Siber dalam Kalangan Remaja',
      prompt: 'Tulis pandangan anda mengenai adab berkomunikasi di alam maya dan langkah-langkah proaktif untuk membendung gejala buli siber dalam kalangan remaja. Panjang karangan hendaklah tidak kurang daripada 100 patah perkataan.'
    },
    {
      id: 'TOPIC_7',
      title: 'Semangat Kesukarelawanan dalam Memupuk Sifat Empati dan Ihsan Murid',
      prompt: 'Huraikan faedah melibatkan diri dalam khidmat masyarakat dan bantuan bencana kepada pembentukan sahsiah murid yang prihatin serta berjiwa besar. Panjang karangan hendaklah tidak kurang daripada 100 patah perkataan.'
    },
    {
      id: 'TOPIC_8',
      title: 'Amalan Menabung dan Pengurusan Kewangan Bijak Sejak di Bangku Sekolah',
      prompt: 'Bincangkan kepentingan memupuk tabiat berjimat cermat, merancang perbelanjaan harian, dan menghargai titik peluh ibu bapa demi masa depan yang terjamin. Panjang karangan hendaklah tidak kurang daripada 100 patah perkataan.'
    },
    {
      id: 'TOPIC_9',
      title: 'Pemupukan Minat Terhadap Bidang Sains, Matematik dan Inovasi Robotik (STEM)',
      prompt: 'Jelaskan bagaimana minat terhadap sains, reka cipta, dan pemikiran logik mampu melahirkan generasi inovator muda yang berdaya saing di peringkat antarabangsa. Panjang karangan hendaklah tidak kurang daripada 100 patah perkataan.'
    },
    {
      id: 'TOPIC_10',
      title: 'Menghayati Sejarah Kemerdekaan dan Mempertahankan Kedaulatan Negara',
      prompt: 'Tulis refleksi anda mengenai kepentingan menghayati erti kemerdekaan, menghormati lambang kebesaran negara, dan mengekalkan jati diri warisan bangsa Malaysia. Panjang karangan hendaklah tidak kurang daripada 100 patah perkataan.'
    }
  ];

  function shuffleEssayTopic() {
    const available = PKSK_ESSAY_TOPICS.filter(t => t.title !== state.essayTopic.title);
    const chosen = available[Math.floor(Math.random() * available.length)] || PKSK_ESSAY_TOPICS[0];
    
    state.essayTopic = chosen;
    state.aiEssayAssessment = null; // Reset assessment for the fresh topic

    if (dom.dispEssayTitle && dom.dispEssayPrompt) {
      dom.dispEssayTitle.style.opacity = '0';
      dom.dispEssayPrompt.style.opacity = '0';
      
      setTimeout(() => {
        dom.dispEssayTitle.textContent = chosen.title;
        dom.dispEssayPrompt.innerHTML = `${chosen.prompt.replace(/tidak kurang daripada 100 patah perkataan/g, '<strong>tidak kurang daripada 100 patah perkataan</strong>')}`;
        dom.dispEssayTitle.style.opacity = '1';
        dom.dispEssayPrompt.style.opacity = '1';
      }, 150);
    }

    if (dom.btnShuffleEssayTopic) {
      const origHtml = dom.btnShuffleEssayTopic.innerHTML;
      dom.btnShuffleEssayTopic.innerHTML = '<i class="fa-solid fa-check"></i> Tajuk Baru!';
      setTimeout(() => {
        if (dom.btnShuffleEssayTopic) {
          dom.btnShuffleEssayTopic.innerHTML = '<i class="fa-solid fa-shuffle"></i> Tukar / Rawak Tajuk Esei';
        }
      }, 1000);
    }
  }

  function updateEssayWordCount() {
    const text = dom.inputEssayText.value.trim();
    const words = text ? text.split(/\s+/).length : 0;
    state.essayText = text;
    dom.dispWordCount.textContent = `Jumlah Perkataan: ${words} / 100`;
    dom.dispWordCount.style.color = words >= 100 ? 'var(--kpm-emerald)' : 'var(--kpm-blue)';
  }

  /* =========================================================================
     OX ALPHA AI ENGINE INTEGRATION (OPENROUTER DEDICATED)
     ========================================================================= */
  const _OX_DEFAULT = 'c2stb3ItdjEtOGY2ZjczOGJlY2Y3M2UyZmM0ZjEwZjkxOWQxNjZiZjA1OWU3Zjg1MmQ1MTNjN2E2MmU1ZTdhYjFjNzY2YWIyZA==';
  const OX_ALPHA_CONFIG = {
    get apiKey() {
      try {
        return localStorage.getItem('pksk_oxalpha_key') || atob(_OX_DEFAULT);
      } catch (e) {
        return '';
      }
    },
    endpoint: 'https://openrouter.ai/api/v1/chat/completions',
    model: 'stealth/ox-alpha'
  };

  async function callOxAlphaAi(systemPrompt, userPrompt) {
    try {
      const resp = await fetch(OX_ALPHA_CONFIG.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OX_ALPHA_CONFIG.apiKey}`,
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'PKSK Simulator - KPM'
        },
        body: JSON.stringify({
          model: OX_ALPHA_CONFIG.model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.2
        })
      });

      if (resp.ok) {
        const data = await resp.json();
        const text = data.choices?.[0]?.message?.content || '';
        return { success: true, text, model: OX_ALPHA_CONFIG.model };
      } else {
        const errData = await resp.json().catch(() => ({}));
        const errMsg = errData.error?.message || `HTTP ${resp.status}`;
        return { success: false, error: errMsg };
      }
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  async function testOxAlphaConnection() {
    if (!dom.btnTestOxAlpha) return;
    dom.btnTestOxAlpha.disabled = true;
    dom.btnTestOxAlpha.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Menguji...';
    
    if (dom.oxAlphaFeedbackMsg) {
      dom.oxAlphaFeedbackMsg.style.display = 'block';
      dom.oxAlphaFeedbackMsg.style.color = '#0284c7';
      dom.oxAlphaFeedbackMsg.textContent = 'Menghubungi OpenRouter (stealth/ox-alpha)...';
    }

    const result = await callOxAlphaAi(
      'Anda ialah AI Penguji. Jawab hanya satu perkataan JSON: {"status":"CONNECTED"}',
      'Uji sambungan API Ox Alpha untuk Sistem Pentaksiran PKSK.'
    );

    dom.btnTestOxAlpha.disabled = false;
    dom.btnTestOxAlpha.innerHTML = '<i class="fa-solid fa-vial-circle-check"></i> Uji Sambungan';

    if (result.success) {
      if (dom.oxAlphaStatusBadge) {
        dom.oxAlphaStatusBadge.style.background = '#dcfce7';
        dom.oxAlphaStatusBadge.style.color = '#15803d';
        dom.oxAlphaStatusBadge.innerHTML = '<i class="fa-solid fa-circle-check"></i> Sambungan Berjaya';
      }
      if (dom.oxAlphaFeedbackMsg) {
        dom.oxAlphaFeedbackMsg.style.color = '#15803d';
        dom.oxAlphaFeedbackMsg.textContent = '✓ Sambungan ke Ox Alpha (stealth/ox-alpha) Berjaya & Aktif!';
      }
      if (dom.essayAiIndicatorBadge) {
        dom.essayAiIndicatorBadge.style.background = '#15803d';
        dom.essayAiIndicatorBadge.innerHTML = '<i class="fa-solid fa-brain"></i> Ox Alpha AI Bersedia';
      }
    } else {
      if (dom.oxAlphaStatusBadge) {
        dom.oxAlphaStatusBadge.style.background = '#fee2e2';
        dom.oxAlphaStatusBadge.style.color = '#b91c1c';
        dom.oxAlphaStatusBadge.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Ralat';
      }
      if (dom.oxAlphaFeedbackMsg) {
        dom.oxAlphaFeedbackMsg.style.color = '#dc2626';
        dom.oxAlphaFeedbackMsg.textContent = `✗ Ralat Sambungan Ox Alpha: ${result.error}`;
      }
    }
  }

  /* =========================================================================
     AI ESSAY ASSESSMENT ENGINE (BAHAGIAN C RUBRIC - OX ALPHA)
     ========================================================================= */
  async function evaluateEssayWithOxAlpha() {
    const essay = (state.essayText || '').trim();

    if (!essay) {
      state.aiEssayAssessment = {
        skor_keseluruhan: 0,
        band: 'Band 1 (Tiada Penulisan)',
        kriteria: {
          idea: { skor: 0, max: 3.0, ulasan: 'Calon tidak mengisi ruang jawapan karangan.' },
          bahasa: { skor: 0, max: 3.0, ulasan: 'Tiada teks untuk disemak tatabahasa & ejaan.' },
          struktur: { skor: 0, max: 2.0, ulasan: 'Tiada perenggan atau format yang dikesan.' },
          nilai_kbat: { skor: 0, max: 2.0, ulasan: 'Tiada bukti nilai murni atau pemikiran kritis.' }
        },
        kekuatan: ['Tiada'],
        kelemahan_tatabahasa: ['Ruang penulisan dikosongkan.'],
        cadangan_penambahbaikan: ['Sila tulis karangan melebihi 100 patah perkataan pada sesi akan datang.'],
        rumusan_keseluruhan: 'Calon tidak melengkapkan Bahagian C (Artikulasi Penulisan).'
      };
      return state.aiEssayAssessment;
    }

    const systemInstruction = `Anda ialah Pemeriksa Kanan Rasmi Lembaga Peperiksaan Malaysia bagi Pentaksiran Kemasukan Sekolah Khusus (PKSK) Tingkatan 1 (Bahagian C: Artikulasi Penulisan - Wajaran 10 Markah).
Nilai karangan calon dengan adil, teliti dan profesional mengikut 4 kriteria Rubrik Rasmi KPM:
1. Idea, Hujah & Kematangan Isi (Maksimum 3.0 markah)
2. Bahasa, Ejaan, Tatabahasa & Kosa Kata (Maksimum 3.0 markah)
3. Struktur, Koheren & Format Karangan (Maksimum 2.0 markah)
4. Nilai Murni, Pengajaran & Pemikiran Kritis KBAT (Maksimum 2.0 markah)

PENTING: Pulangkan jawapan dalam format JSON SAHAJA tanpa sebarang teks penjelasan lain di luar JSON:
{
  "skor_keseluruhan": 8.5,
  "band": "Band 5 (Cemerlang)",
  "kriteria": {
    "idea": { "skor": 2.5, "max": 3.0, "ulasan": "Idea tersusun dan hujah meyakinkan." },
    "bahasa": { "skor": 2.5, "max": 3.0, "ulasan": "Tatabahasa baik, kosa kata luas." },
    "struktur": { "skor": 1.8, "max": 2.0, "ulasan": "Pengenalan, isi dan penutup lengkap." },
    "nilai_kbat": { "skor": 1.7, "max": 2.0, "ulasan": "Penerapan nilai integriti yang matang." }
  },
  "kekuatan": ["Idea berkembang secara logik", "Kosa kata bervariasi"],
  "kelemahan_tatabahasa": ["Beberapa kesilapan ejaan dan tanda baca"],
  "cadangan_penambahbaikan": ["Selitkan lebih banyak ungkapan menarik / peribahasa"],
  "rumusan_keseluruhan": "Karangan berkualiti tinggi dan menepati piawaian kemasukan SBP/MRSM."
}`;

    const userInstruction = `Karangan Calon:
Tajuk: "${state.essayTopic.title}"
Stimulus: "${state.essayTopic.prompt}"
Teks Karangan:
"""
${essay}
"""`;

    const result = await callOxAlphaAi(systemInstruction, userInstruction);

    if (result.success && result.text) {
      try {
        const cleanJson = result.text.replace(/```json/gi, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleanJson);
        parsed.aiModelUsed = 'Ox Alpha (stealth/ox-alpha)';
        state.aiEssayAssessment = parsed;
        return parsed;
      } catch (parseErr) {
        console.warn('JSON parse error from Ox Alpha, attempting regex extract:', parseErr);
        const match = result.text.match(/\{[\s\S]*\}/);
        if (match) {
          try {
            const parsed = JSON.parse(match[0]);
            parsed.aiModelUsed = 'Ox Alpha (stealth/ox-alpha)';
            state.aiEssayAssessment = parsed;
            return parsed;
          } catch (e2) {}
        }
      }
    }

    console.warn('Ox Alpha evaluation fallback:', result.error);
    const words = essay.split(/\s+/).filter(w => w.length > 0).length;
    const fallbackScore = words >= 100 ? 8.5 : Math.max(1.0, parseFloat(((words / 100) * 8.0).toFixed(1)));
    state.aiEssayAssessment = {
      isHeuristic: true,
      error: result.error,
      skor_keseluruhan: fallbackScore,
      band: 'Band 4 (Penilaian Sandaran)',
      kriteria: {
        idea: { skor: parseFloat((fallbackScore * 0.3).toFixed(1)), max: 3.0, ulasan: 'Idea bersesuaian dengan tema integriti.' },
        bahasa: { skor: parseFloat((fallbackScore * 0.3).toFixed(1)), max: 3.0, ulasan: 'Tatabahasa memuaskan.' },
        struktur: { skor: parseFloat((fallbackScore * 0.2).toFixed(1)), max: 2.0, ulasan: 'Struktur karangan tersusun.' },
        nilai_kbat: { skor: parseFloat((fallbackScore * 0.2).toFixed(1)), max: 2.0, ulasan: 'Nilai murni diterapkan.' }
      },
      kekuatan: [`Jumlah perkataan: ${words}`],
      kelemahan_tatabahasa: [`Semakan Ox Alpha tergendala: ${result.error || 'Ralat rangkaian'}`],
      cadangan_penambahbaikan: ['Tekan butang Nilai Semula AI di bawah.'],
      rumusan_keseluruhan: 'Pemarkahan anggaran diberikan. Anda boleh menekan butang Nilai Semula dengan AI.'
    };
    return state.aiEssayAssessment;
  }

  /* =========================================================================
     OFFICIAL RESULTS SLIP CALCULATION & AI REPORT
     ========================================================================= */
  async function renderResultsSlip() {
    // Fill candidate details
    dom.slipDispName.textContent = state.candidate.name || 'CALON PKSK';
    dom.slipDispIc.textContent = state.candidate.ic || '-';
    dom.slipDispIndex.textContent = state.candidate.indexNo || '-';
    dom.slipDispTarget.textContent = state.candidate.targetSchool || 'SEKOLAH BERASRAMA PENUH (SBP)';

    const isEssayOnly = state.mode === 'ESSAY_PRACTICE' || state.mode === 'ESSAY' || state.sessionQuestions.length === 0;

    if (isEssayOnly) {
      // Mod Semakan Esei Sahaja: Sembunyikan banner markah keseluruhan PKSK dan jadual MCQ serta-merta
      if (dom.slipSubTitle) dom.slipSubTitle.textContent = 'LAPORAN PENILAIAN RASMI AI: ARTIKULASI PENULISAN (BAHAGIAN C)';
      if (dom.slipHeroBadge) dom.slipHeroBadge.style.display = 'none';
      if (dom.slipScoreTable) dom.slipScoreTable.style.display = 'none';
      if (dom.btnReviewAllAnswers) dom.btnReviewAllAnswers.style.display = 'none';
      if (dom.btnWriteNewEssay) dom.btnWriteNewEssay.style.display = 'inline-flex';
    } else {
      // Mod Simulasi Penuh: Sediakan paparan sedang mengira / kosongkan dulu sebelum AI selesai
      if (dom.slipSubTitle) dom.slipSubTitle.textContent = 'SLIP KEPUTUSAN PENTAKSIRAN KEMASUKAN SEKOLAH KHUSUS (PKSK) TINGKATAN 1';
      if (dom.slipHeroBadge) dom.slipHeroBadge.style.display = 'block';
      if (dom.slipScoreTable) dom.slipScoreTable.style.display = 'table';
      if (dom.btnReviewAllAnswers) dom.btnReviewAllAnswers.style.display = 'inline-flex';
      if (dom.btnWriteNewEssay) dom.btnWriteNewEssay.style.display = 'none';

      dom.slipDispTotalScore.textContent = '...';
      dom.slipDispStatus.textContent = 'Sedang memproses penilaian & keputusan...';
      dom.slipDispStatus.style.color = '#fde047';
    }

    // Evaluate essay with Ox Alpha AI or retrieve cached assessment
    if (!state.aiEssayAssessment && !state.isEvaluatingAI) {
      state.isEvaluatingAI = true;
      if (dom.aiEssayReportSection) {
        dom.aiEssayReportSection.innerHTML = `
          <div style="text-align:center; padding:2.5rem 1rem;">
            <div class="ai-eval-spinner" style="width:36px; height:36px; border-width:3.5px; border-color:#16a34a; border-top-color:transparent; margin-bottom:1rem;"></div>
            <h4 style="color:var(--kpm-navy); font-weight:800; font-size:1.1rem; margin-bottom:0.35rem;">
              <i class="fa-solid fa-brain" style="color:#16a34a;"></i> Sedang Menyemak Esei Menggunakan Ox Alpha AI...
            </h4>
            <p style="font-size:0.88rem; color:var(--text-muted); margin:0;">
              Menganalisis idea, tatabahasa, struktur, dan nilai murni mengikut Rubrik Rasmi Lembaga Peperiksaan Malaysia.
            </p>
          </div>
        `;
      }
      await evaluateEssayWithOxAlpha();
      state.isEvaluatingAI = false;
    }

    const aiAssessment = state.aiEssayAssessment || { skor_keseluruhan: 8.0 };
    const percentC = typeof aiAssessment.skor_keseluruhan === 'number' ? aiAssessment.skor_keseluruhan : 8.0;

    if (!isEssayOnly) {
      // Calculate MCQ scores
      let correctA = 0, totalA = 0;
      let correctB = 0, totalB = 0;

      state.sessionQuestions.forEach(q => {
        const userAns = state.userAnswers[q.question_id];
        const isCorrect = userAns === q.answer;

        if (q.section === 'BAHAGIAN_A') {
          totalA++;
          if (isCorrect) correctA++;
        } else {
          totalB++;
          if (isCorrect) correctB++;
        }
      });

      const percentA = totalA > 0 ? (correctA / totalA) * 20 : 0; // 20% weight
      const percentB = totalB > 0 ? (correctB / totalB) * 70 : 0; // 70% weight

      const totalScoreNum = (percentA + percentB + percentC);
      const totalScore = totalScoreNum.toFixed(1);
      dom.slipDispTotalScore.textContent = `${totalScore}%`;

      function getRating(percentage) {
        if (percentage >= 80) return { text: 'CEMERLANG (BAND 5)', color: 'var(--kpm-emerald)' };
        if (percentage >= 65) return { text: 'SANGAT BAIK (BAND 4)', color: 'var(--kpm-blue)' };
        if (percentage >= 50) return { text: 'BAIK (BAND 3)', color: 'var(--kpm-gold)' };
        if (percentage >= 40) return { text: 'MEMUASKAN (BAND 2)', color: '#f59e0b' };
        return { text: 'PERLU BIMBINGAN (BAND 1)', color: 'var(--kpm-red)' };
      }

      const pctA = totalA > 0 ? (correctA / totalA) * 100 : 0;
      const pctB = totalB > 0 ? (correctB / totalB) * 100 : 0;
      const pctC = (percentC / 10) * 100;

      const ratingA = getRating(pctA);
      const ratingB = getRating(pctB);
      const ratingC = getRating(pctC);
      const overallRating = getRating(totalScoreNum);

      const isLulus = totalScoreNum >= 65;
      const overallStatusText = isLulus ? 'LAYAK DIPERTIMBANGKAN KE SBP / MRSM' : 'TIDAK MENCAPAI KELAYAKAN MINIMUM';
      const overallStatusColor = isLulus ? 'var(--kpm-emerald)' : 'var(--kpm-red)';

      // Status commentary
      if (totalScoreNum >= 80) {
        dom.slipDispStatus.textContent = 'TAHNIAH! ANDA MENCAPAI TAHAP KELAYAKAN CEMERLANG (BAND 5)';
        dom.slipDispStatus.style.color = '#86efac';
      } else if (totalScoreNum >= 65) {
        dom.slipDispStatus.textContent = 'KEPUTUSAN BAIK: LAYAK DIPERTIMBANGKAN KE SEKOLAH KHUSUS (BAND 4)';
        dom.slipDispStatus.style.color = '#fde047';
      } else if (totalScoreNum >= 50) {
        dom.slipDispStatus.textContent = 'TAHAP SEDERHANA: LAYAK BERSYARAT KEKOSONGAN (BAND 3)';
        dom.slipDispStatus.style.color = '#fca5a5';
      } else {
        dom.slipDispStatus.textContent = 'TAHAP LEMAH: PERLU MEMPERTINGKATKAN KEMAHIRAN ASAS (BAND 1-2)';
        dom.slipDispStatus.style.color = '#ef4444';
      }

      const words = (state.essayText || '').trim().split(/\s+/).filter(w => w.length > 0).length;

      // Populate score breakdown table
      dom.slipScoreTableBody.innerHTML = `
        <tr style="border-bottom:1px solid var(--border-subtle);">
          <td style="padding:0.75rem 0.9rem;"><strong>Bahagian A:</strong> Kecerdasan Insaniah (EQ, SQ, SSQ)</td>
          <td style="text-align:center; padding:0.75rem 0.9rem;">20%</td>
          <td style="text-align:center; padding:0.75rem 0.9rem;"><strong>${percentA.toFixed(1)}%</strong> (${correctA}/${totalA})</td>
          <td style="text-align:center; padding:0.75rem 0.9rem; color:${ratingA.color}; font-weight:700;">${ratingA.text}</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border-subtle);">
          <td style="padding:0.75rem 0.9rem;"><strong>Bahagian B:</strong> Kecerdasan Intelektual (PA, BM, BI, Matematik, Sains)</td>
          <td style="text-align:center; padding:0.75rem 0.9rem;">70%</td>
          <td style="text-align:center; padding:0.75rem 0.9rem;"><strong>${percentB.toFixed(1)}%</strong> (${correctB}/${totalB})</td>
          <td style="text-align:center; padding:0.75rem 0.9rem; color:${ratingB.color}; font-weight:700;">${ratingB.text}</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border-subtle);">
          <td style="padding:0.75rem 0.9rem;"><strong>Bahagian C:</strong> Artikulasi Penulisan (Semakan AI Rubrik KPM)</td>
          <td style="text-align:center; padding:0.75rem 0.9rem;">10%</td>
          <td style="text-align:center; padding:0.75rem 0.9rem;"><strong>${percentC.toFixed(1)}%</strong> (${words} perkataan)</td>
          <td style="text-align:center; padding:0.75rem 0.9rem; color:${ratingC.color}; font-weight:700;">${ratingC.text}</td>
        </tr>
        <tr style="background-color:var(--bg-surface-subtle); font-weight:800; font-size:0.95rem;">
          <td style="padding:0.9rem;">JUMLAH MARKAH KESELURUHAN</td>
          <td style="text-align:center; padding:0.9rem;">100%</td>
          <td style="text-align:center; padding:0.9rem; color:var(--kpm-navy); font-size:1.1rem;">${totalScore}%</td>
          <td style="text-align:center; padding:0.9rem; color:${overallStatusColor}; line-height:1.2;">
            ${overallStatusText}<br>
            <span style="font-size:0.75rem; opacity:0.85;">${overallRating.text}</span>
          </td>
        </tr>
      `;
    }

    // Render Detailed AI Essay Report Card
    renderAiEssayReportCard(aiAssessment);
  }

  function renderAiEssayReportCard(assessment) {
    if (!dom.aiEssayReportSection) return;

    if (!assessment) {
      dom.aiEssayReportSection.innerHTML = `
        <div style="text-align:center; padding:1.5rem;">
          <p>Tiada data semakan esei.</p>
        </div>
      `;
      return;
    }

    const k = assessment.kriteria || {};
    const ideaScore = k.idea?.skor || 0;
    const ideaMax = k.idea?.max || 3.0;
    const bahasaScore = k.bahasa?.skor || 0;
    const bahasaMax = k.bahasa?.max || 3.0;
    const strukturScore = k.struktur?.skor || 0;
    const strukturMax = k.struktur?.max || 2.0;
    const nilaiScore = k.nilai_kbat?.skor || 0;
    const nilaiMax = k.nilai_kbat?.max || 2.0;

    const strengthsHtml = (assessment.kekuatan || []).map(s => `<li>${s}</li>`).join('');
    const weaknessesHtml = (assessment.kelemahan_tatabahasa || []).map(w => `<li>${w}</li>`).join('');

    const apiKey = localStorage.getItem('pksk_gemini_api_key') || '';
    const isAiPowered = !assessment.isHeuristic && apiKey;

    dom.aiEssayReportSection.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem; border-bottom:1.5px solid var(--border-subtle); padding-bottom:1rem; margin-bottom:1rem;">
        <div>
          <h3 style="color:var(--kpm-navy); font-size:1.2rem; font-weight:800; margin:0 0 0.25rem 0; display:flex; align-items:center; gap:0.5rem;">
            <i class="fa-solid fa-brain" style="color:#16a34a;"></i> Laporan Penilaian AI: Artikulasi Penulisan (Bahagian C)
          </h3>
          <p style="margin:0; font-size:0.85rem; color:var(--text-muted);">
            Disemak oleh <strong>Ox Alpha AI (stealth/ox-alpha)</strong> mengikut Rubrik Rasmi Lembaga Peperiksaan Malaysia.
          </p>
        </div>
        <div style="display:flex; align-items:center; gap:0.75rem;">
          <div style="text-align:right;">
            <span style="font-size:0.78rem; font-weight:800; color:var(--text-muted); text-transform:uppercase;">Skor Esei</span>
            <div style="font-size:1.5rem; font-weight:800; color:#16a34a; font-family:var(--font-mono);">${(assessment.skor_keseluruhan || 0).toFixed(1)} / 10.0</div>
          </div>
          <button id="btnReevaluateEssayAi" class="btn-kpm btn-kpm-gold" style="font-size:0.82rem; padding:0.5rem 1rem; font-weight:800;">
            <i class="fa-solid fa-arrows-rotate"></i> Nilai Semula AI
          </button>
        </div>
      </div>

      <!-- 4 Rubric Criteria Grid -->
      <div class="ai-criteria-grid">
        
        <!-- Criteria 1: Idea & Hujah -->
        <div class="ai-criterion-item">
          <div class="ai-criterion-header">
            <span>1. Idea, Hujah & Kematangan</span>
            <span class="badge" style="background:#e0f2fe; color:#0369a1; font-weight:800; font-size:0.85rem; padding:3px 7px; border-radius:4px;">${ideaScore} / ${ideaMax}</span>
          </div>
          <div class="ai-progress-track">
            <div class="ai-progress-fill" style="width:${(ideaScore / ideaMax) * 100}%;"></div>
          </div>
          <p style="font-size:0.85rem; color:#334155; margin:0; line-height:1.5;">${k.idea?.ulasan || 'Idea menepati tajuk penulisan.'}</p>
        </div>

        <!-- Criteria 2: Bahasa & Tatabahasa -->
        <div class="ai-criterion-item">
          <div class="ai-criterion-header">
            <span>2. Bahasa, Ejaan & Tatabahasa</span>
            <span class="badge" style="background:#e0f2fe; color:#0369a1; font-weight:800; font-size:0.85rem; padding:3px 7px; border-radius:4px;">${bahasaScore} / ${bahasaMax}</span>
          </div>
          <div class="ai-progress-track">
            <div class="ai-progress-fill" style="width:${(bahasaScore / bahasaMax) * 100}%;"></div>
          </div>
          <p style="font-size:0.85rem; color:#334155; margin:0; line-height:1.5;">${k.bahasa?.ulasan || 'Tatabahasa memuaskan.'}</p>
        </div>

        <!-- Criteria 3: Struktur & Format -->
        <div class="ai-criterion-item">
          <div class="ai-criterion-header">
            <span>3. Struktur & Koheren</span>
            <span class="badge" style="background:#e0f2fe; color:#0369a1; font-weight:800; font-size:0.85rem; padding:3px 7px; border-radius:4px;">${strukturScore} / ${strukturMax}</span>
          </div>
          <div class="ai-progress-track">
            <div class="ai-progress-fill" style="width:${(strukturScore / strukturMax) * 100}%;"></div>
          </div>
          <p style="font-size:0.85rem; color:#334155; margin:0; line-height:1.5;">${k.struktur?.ulasan || 'Struktur perenggan tersusun.'}</p>
        </div>

        <!-- Criteria 4: Nilai Murni & KBAT -->
        <div class="ai-criterion-item">
          <div class="ai-criterion-header">
            <span>4. Nilai Murni & KBAT</span>
            <span class="badge" style="background:#e0f2fe; color:#0369a1; font-weight:800; font-size:0.85rem; padding:3px 7px; border-radius:4px;">${nilaiScore} / ${nilaiMax}</span>
          </div>
          <div class="ai-progress-track">
            <div class="ai-progress-fill" style="width:${(nilaiScore / nilaiMax) * 100}%;"></div>
          </div>
          <p style="font-size:0.85rem; color:#334155; margin:0; line-height:1.5;">${k.nilai_kbat?.ulasan || 'Menerapkan elemen integriti.'}</p>
        </div>

      </div>

      <!-- Qualitative Feedback Rows -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-top:1rem;">
        
        <div style="background:#f0fdf4; border:1.5px solid #bbf7d0; border-radius:var(--radius-md); padding:1rem;">
          <h5 style="color:#166534; font-size:0.92rem; font-weight:800; margin:0 0 0.4rem 0;">
            <i class="fa-solid fa-circle-check"></i> Kekuatan Karangan Calon:
          </h5>
          <ul class="ai-feedback-list" style="margin:0; font-size:0.88rem;">
            ${strengthsHtml || '<li>Karangan menepati kehendak soalan pentaksiran.</li>'}
          </ul>
        </div>

        <div style="background:#fef2f2; border:1.5px solid #fecaca; border-radius:var(--radius-md); padding:1rem;">
          <h5 style="color:#991b1b; font-size:0.92rem; font-weight:800; margin:0 0 0.4rem 0;">
            <i class="fa-solid fa-circle-exclamation"></i> Aspek Perlu Diperbaiki:
          </h5>
          <ul class="ai-feedback-list warning" style="margin:0; font-size:0.88rem;">
            ${weaknessesHtml || '<li>Kekalkan ketepatan ejaan dan struktur ayat majmuk.</li>'}
          </ul>
        </div>

      </div>

      <!-- Recommendation Summary Box -->
      <div style="background:#f8fafc; border:1.5px solid var(--border-subtle); border-left:4px solid #0284c7; border-radius:var(--radius-sm); padding:1rem 1.2rem; margin-top:1rem;">
        <strong style="color:var(--kpm-navy); font-size:0.92rem;"><i class="fa-solid fa-lightbulb" style="color:#0284c7;"></i> Rumusan & Tip Pemeriksa:</strong>
        <p style="margin:0.25rem 0 0 0; font-size:0.88rem; color:var(--text-main); line-height:1.55;">
          ${assessment.rumusan_keseluruhan || 'Tahniah atas usaha penulisan karangan ini.'}
        </p>
      </div>
    `;

    const btnReeval = document.getElementById('btnReevaluateEssayAi');
    if (btnReeval) {
      btnReeval.onclick = async () => {
        btnReeval.disabled = true;
        btnReeval.innerHTML = '<span class="ai-eval-spinner"></span> Sedang Menilai...';
        state.aiEssayAssessment = null;
        await renderResultsSlip();
      };
    }
  }

  /* =========================================================================
     10. REVIEW WORKSPACE & EXPLANATION SCHEME FUNCTIONS
     ========================================================================= */
  function filterReviewQuestions(filterType) {
    state.reviewFilter = filterType;
    
    // Update filter buttons active class
    if (dom.btnReviewFilterAll) dom.btnReviewFilterAll.classList.toggle('active', filterType === 'ALL');
    if (dom.btnReviewFilterWrong) dom.btnReviewFilterWrong.classList.toggle('active', filterType === 'WRONG');
    if (dom.btnReviewFilterCorrect) dom.btnReviewFilterCorrect.classList.toggle('active', filterType === 'CORRECT');
    if (dom.btnReviewFilterUnanswered) dom.btnReviewFilterUnanswered.classList.toggle('active', filterType === 'UNANSWERED');

    renderReviewQuestionsList();
  }

  window.filterReviewQuestions = filterReviewQuestions;

  function renderReviewWorkspace() {
    if (!state.sessionQuestions || state.sessionQuestions.length === 0) return;

    let correctCount = 0;
    let wrongCount = 0;
    let unansweredCount = 0;

    state.sessionQuestions.forEach((q, idx) => {
      const userAns = state.userAnswers[idx];
      if (!userAns) {
        unansweredCount++;
      } else if (userAns === q.answer) {
        correctCount++;
      } else {
        wrongCount++;
      }
    });

    if (dom.reviewStatTotal) dom.reviewStatTotal.textContent = `${state.sessionQuestions.length} Soalan`;
    if (dom.reviewStatCorrect) dom.reviewStatCorrect.textContent = `${correctCount} Betul`;
    if (dom.reviewStatWrong) dom.reviewStatWrong.textContent = `${wrongCount} Salah`;
    if (dom.reviewStatUnanswered) dom.reviewStatUnanswered.textContent = `${unansweredCount} Kosong`;

    renderReviewQuestionsList();
  }

  function renderReviewQuestionsList() {
    if (!dom.reviewQuestionsListContainer) return;

    const filter = state.reviewFilter;
    const filteredQuestions = state.sessionQuestions.map((q, idx) => {
      const userAns = state.userAnswers[idx];
      const isCorrect = userAns === q.answer;
      const isUnanswered = !userAns;
      return { q, index: idx, userAns, isCorrect, isUnanswered };
    }).filter(item => {
      if (filter === 'CORRECT') return item.isCorrect;
      if (filter === 'WRONG') return !item.isCorrect && !item.isUnanswered;
      if (filter === 'UNANSWERED') return item.isUnanswered;
      return true;
    });

    if (filteredQuestions.length === 0) {
      let emptyMsg = 'Tiada soalan dalam kategori ini.';
      if (filter === 'WRONG') emptyMsg = 'Tahniah! Tiada sebarang kesalahan dalam jawapan anda.';
      if (filter === 'UNANSWERED') emptyMsg = 'Semua soalan telah dijawab dengan lengkap.';

      dom.reviewQuestionsListContainer.innerHTML = `
        <div style="text-align:center; padding:3rem 1.5rem; background:#ffffff; border-radius:var(--radius-md); border:1px solid var(--border-subtle);">
          <i class="fa-solid fa-circle-check" style="font-size:3rem; color:#16a34a; margin-bottom:1rem;"></i>
          <h3 style="color:var(--kpm-navy); font-size:1.2rem; font-weight:800; margin-bottom:0.5rem;">Tiada Soalan Dalam Kategori Ini</h3>
          <p style="color:var(--text-muted); font-size:0.92rem;">${emptyMsg}</p>
        </div>
      `;
      return;
    }

    dom.reviewQuestionsListContainer.innerHTML = filteredQuestions.map(({ q, index, userAns, isCorrect, isUnanswered }) => {
      const originalIndex = index + 1;
      const cardClass = isCorrect ? 'is-correct' : isUnanswered ? 'is-unanswered' : 'is-wrong';
      
      const statusBadge = isCorrect 
        ? '<span style="background:#dcfce7; color:#15803d; font-weight:800; font-size:0.78rem; padding:4px 10px; border-radius:12px;"><i class="fa-solid fa-check"></i> JAWAPAN BETUL</span>'
        : isUnanswered
        ? '<span style="background:#f1f5f9; color:#64748b; font-weight:800; font-size:0.78rem; padding:4px 10px; border-radius:12px;"><i class="fa-solid fa-minus"></i> TIDAK DIJAWAB</span>'
        : '<span style="background:#fee2e2; color:#b91c1c; font-weight:800; font-size:0.78rem; padding:4px 10px; border-radius:12px;"><i class="fa-solid fa-xmark"></i> JAWAPAN ANDA SALAH</span>';

      const diagramHtml = q.image_url 
        ? `<div style="margin:1.15rem 0; text-align:center; background:#ffffff; border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:0.9rem;">
             <img src="${q.image_url}" alt="Rajah Soalan" style="max-height:280px; max-width:100%; object-fit:contain; border-radius:4px;" />
           </div>`
        : '';

      const optionsHtml = q.options.map(opt => {
        const isUserPick = userAns === opt.id;
        const isCorrectAns = q.answer === opt.id;

        let optClass = 'review-option-item';
        let tagBadge = '';

        if (isCorrectAns) {
          optClass += ' correct-answer-target';
          tagBadge = `<span style="margin-left:auto; background:#10b981; color:#ffffff; font-size:0.75rem; font-weight:800; padding:3px 8px; border-radius:4px;"><i class="fa-solid fa-check-double"></i> SKEMA JAWAPAN</span>`;
        }

        if (isUserPick && !isCorrect) {
          optClass += ' selected-wrong';
          tagBadge += `<span style="margin-left:auto; background:#ef4444; color:#ffffff; font-size:0.75rem; font-weight:800; padding:3px 8px; border-radius:4px;"><i class="fa-solid fa-xmark"></i> PILIHAN ANDA</span>`;
        } else if (isUserPick && isCorrect) {
          optClass += ' selected-correct';
          tagBadge += `<span style="margin-left:6px; background:#15803d; color:#ffffff; font-size:0.75rem; font-weight:800; padding:3px 8px; border-radius:4px;"><i class="fa-solid fa-user-check"></i> PILIHAN ANDA</span>`;
        }

        return `
          <div class="${optClass}">
            <strong style="min-width:24px; font-family:var(--font-mono); font-size:0.98rem;">${opt.id}.</strong>
            <div style="flex:1; font-size:1rem;">${opt.text}</div>
            ${tagBadge}
          </div>
        `;
      }).join('');

      const explanationText = q.explanation || 'Jawapan di atas adalah mematuhi skema dan sukatan rasmi Lembaga Peperiksaan Malaysia.';

      return `
        <div class="review-card ${cardClass}">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; border-bottom:1px solid var(--border-subtle); padding-bottom:0.75rem; margin-bottom:1.15rem;">
            <div style="display:flex; align-items:center; gap:0.65rem; flex-wrap:wrap;">
              <span style="font-weight:800; color:var(--kpm-navy); font-size:1.05rem;">Soalan ${originalIndex} / ${state.sessionQuestions.length}</span>
              <span style="background:#e0f2fe; color:#0369a1; font-size:0.78rem; font-weight:800; padding:2px 8px; border-radius:4px;">${q.topic || q.subtopic || 'PKSK'}</span>
              <span style="background:#f1f5f9; color:#475569; font-size:0.78rem; font-weight:700; padding:2px 8px; border-radius:4px;">${q.section === 'BAHAGIAN_A' ? 'Bahagian A (Insaniah)' : 'Bahagian B (Intelektual)'}</span>
            </div>
            <div>${statusBadge}</div>
          </div>

          ${diagramHtml}

          <div style="font-size:1.12rem; font-weight:700; color:var(--text-heading); line-height:1.65; margin-bottom:1.15rem;">
            ${q.question}
          </div>

          <div class="review-options-grid">
            ${optionsHtml}
          </div>

          <div class="review-explanation-box">
            <div style="font-weight:800; font-size:0.98rem; margin-bottom:0.35rem; display:flex; align-items:center; gap:6px;">
              <i class="fa-solid fa-lightbulb" style="color:#16a34a;"></i> Skema & Penjelasan Konsep KPM:
            </div>
            <div style="font-size:0.95rem; line-height:1.65;">${explanationText}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  /* =========================================================================
     11. LICENSE ACTIVATION & SUPABASE MODAL CONTROLLER
     ========================================================================= */
  function updateLicenseBadgeUI() {
    if (!dom.licenseStatusBadge || !dom.licenseStatusText) return;
    const isAct = window.PkskLicense && window.PkskLicense.isActivated();
    if (isAct) {
      const session = window.PkskLicense.getLicenseSession();
      let daysRemainingText = '6 Bulan';
      if (session?.expires_at) {
        const diffMs = new Date(session.expires_at).getTime() - Date.now();
        const diffDays = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
        daysRemainingText = `Baki ${diffDays} Hari`;
      }
      dom.licenseStatusBadge.className = 'license-status-pill';
      dom.licenseStatusBadge.style.background = '#ecfdf5';
      dom.licenseStatusBadge.style.color = '#065f46';
      dom.licenseStatusBadge.style.borderColor = '#a7f3d0';
      dom.licenseStatusText.innerHTML = `<i class="fa-solid fa-circle-check"></i> Lesen Aktif (${daysRemainingText})`;
    } else {
      dom.licenseStatusBadge.className = 'license-status-pill unregistered';
      dom.licenseStatusBadge.style.background = '#fffbeb';
      dom.licenseStatusBadge.style.color = '#92400e';
      dom.licenseStatusBadge.style.borderColor = '#fde68a';
      dom.licenseStatusText.innerHTML = `<i class="fa-solid fa-key"></i> Kunci Lesen Diperlukan`;
    }
  }

  function openActivationModal(onSuccessCallback) {
    state.onActivationSuccessCallback = onSuccessCallback;
    if (dom.activationModal) {
      dom.activationModal.classList.remove('hidden');
      if (dom.activationAlertBox) dom.activationAlertBox.style.display = 'none';
      if (dom.inputLicenseKey) {
        dom.inputLicenseKey.focus();
      }
    }
  }

  function closeActivationModal() {
    if (dom.activationModal) {
      dom.activationModal.classList.add('hidden');
    }
  }

  function showActivationAlert(message, type = 'error') {
    if (!dom.activationAlertBox) return;
    dom.activationAlertBox.style.display = 'block';
    if (type === 'success') {
      dom.activationAlertBox.style.background = '#f0fdf4';
      dom.activationAlertBox.style.border = '1px solid #86efac';
      dom.activationAlertBox.style.color = '#15803d';
      dom.activationAlertBox.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${message}`;
    } else {
      dom.activationAlertBox.style.background = '#fef2f2';
      dom.activationAlertBox.style.border = '1px solid #fca5a5';
      dom.activationAlertBox.style.color = '#b91c1c';
      dom.activationAlertBox.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${message}`;
    }
  }

  async function handleActivateLicenseClick() {
    if (!dom.inputLicenseKey) return;
    const rawKey = dom.inputLicenseKey.value.trim();
    if (!rawKey) {
      showActivationAlert('Sila masukkan Kunci Lesen PKSK 16-digit anda.', 'error');
      return;
    }

    dom.btnActivateLicense.disabled = true;
    dom.btnActivateLicense.innerHTML = '<span class="ai-eval-spinner"></span> Sedang Mengesahkan Kunci...';

    const candidateName = state.candidate.name || dom.inputCandidateName?.value || 'Calon PKSK';
    const candidateIc = state.candidate.ic || dom.inputCandidateIc?.value || '-';

    const result = await window.PkskLicense.activateLicenseOnline(rawKey, candidateName, candidateIc);

    dom.btnActivateLicense.disabled = false;
    dom.btnActivateLicense.innerHTML = '<i class="fa-solid fa-lock-open"></i> Sahkan & Aktifkan Akses Sekarang';

    if (result.success) {
      showActivationAlert(result.message, 'success');
      updateLicenseBadgeUI();
      setTimeout(() => {
        closeActivationModal();
        if (state.onActivationSuccessCallback) {
          const cb = state.onActivationSuccessCallback;
          state.onActivationSuccessCallback = null;
          cb();
        }
      }, 1200);
    } else {
      showActivationAlert(result.message, 'error');
    }
  }

  /* =========================================================================
     12. EVENT LISTENERS INITIALIZATION
     ========================================================================= */
  function initEventListeners() {
    // Navigation Tabs
    dom.navTabDashboard.onclick = () => switchView('DASHBOARD');
    dom.navTabFullSim.onclick = () => { selectMode('FULL_SIMULATION'); switchView('INSTRUCTIONS'); };
    dom.navTabDiagnostic.onclick = () => { selectMode('QUICK_DIAGNOSTIC'); switchView('INSTRUCTIONS'); };
    dom.navTabDrill.onclick = () => { selectMode('DRILL_PRACTICE'); switchView('DASHBOARD'); };
    dom.navTabEssay.onclick = () => { 
      if (window.PkskLicense && !window.PkskLicense.isActivated()) {
        openActivationModal(() => { state.mode = 'ESSAY_PRACTICE'; switchView('ESSAY'); });
        return;
      }
      state.mode = 'ESSAY_PRACTICE'; 
      switchView('ESSAY'); 
    };
    dom.navTabSlip.onclick = () => switchView('RESULTS');

    // Candidate Profile Live Inputs
    dom.inputCandidateName.oninput = (e) => {
      const val = e.target.value.trim();
      state.candidate.name = val;
      dom.dispCandidateName.textContent = val || 'CALON PKSK';
    };

    dom.inputCandidateIndex.oninput = (e) => {
      const val = e.target.value.trim();
      state.candidate.indexNo = val;
      const divider = document.getElementById('dispCandidateDivider');
      if (val) {
        dom.dispCandidateIndex.textContent = `AG: ${val}`;
        if (divider) divider.style.display = 'inline';
      } else {
        dom.dispCandidateIndex.textContent = '';
        if (divider) divider.style.display = 'none';
      }
    };

    dom.inputCandidateIc.oninput = (e) => {
      state.candidate.ic = e.target.value.trim();
    };

    // Dashboard Buttons
    dom.btnLaunchInstructions.onclick = () => switchView('INSTRUCTIONS');
    dom.selectDrillTopic.onchange = (e) => { state.drillTopic = e.target.value; };

    // Ox Alpha Test Event
    if (dom.btnTestOxAlpha) dom.btnTestOxAlpha.onclick = testOxAlphaConnection;

    // Instructions Buttons
    dom.btnBackToDashboard.onclick = () => switchView('DASHBOARD');
    dom.btnStartExamNow.onclick = startExam;

    // Exam Workspace Navigation
    dom.btnPrevQuestion.onclick = () => {
      if (state.currentIndex > 0) {
        state.currentIndex--;
        renderQuestion();
        renderPalette();
      }
    };

    dom.btnNextQuestion.onclick = () => {
      if (state.currentIndex < state.sessionQuestions.length - 1) {
        state.currentIndex++;
        renderQuestion();
        renderPalette();
      } else {
        openSubmitModal();
      }
    };

    dom.btnFlagReview.onclick = toggleFlagCurrentQuestion;

    // Palette Filter Tabs
    dom.paletteFilterAll.onclick = () => setPaletteFilter('ALL');
    dom.paletteFilterA.onclick = () => setPaletteFilter('PART_A');
    dom.paletteFilterB.onclick = () => setPaletteFilter('PART_B');
    dom.paletteFilterFlagged.onclick = () => setPaletteFilter('FLAGGED');

    // Exam Submission Triggers
    dom.btnSubmitExamTrigger.onclick = openSubmitModal;
    dom.btnModalDismiss.onclick = () => { dom.kpmModalOverlay.style.display = 'none'; };
    dom.btnModalProceed.onclick = handleExamCompletion;

    // Essay View Handlers
    dom.inputEssayText.oninput = updateEssayWordCount;
    if (dom.btnShuffleEssayTopic) dom.btnShuffleEssayTopic.onclick = shuffleEssayTopic;
    dom.btnEssayBackToMcq.onclick = () => switchView('EXAM');
    dom.btnSubmitEssayFinal.onclick = () => {
      state.aiEssayAssessment = null; // Clear old assessment for fresh run
      switchView('RESULTS');
    };

    // Results Actions
    dom.btnReturnHomeFromSlip.onclick = () => switchView('DASHBOARD');
    if (dom.btnWriteNewEssay) {
      dom.btnWriteNewEssay.onclick = () => {
        state.mode = 'ESSAY_PRACTICE';
        switchView('ESSAY');
      };
    }
    dom.btnReviewAllAnswers.onclick = () => {
      state.reviewFilter = 'ALL';
      switchView('REVIEW');
    };

    // Review Workspace Actions
    if (dom.btnBackToSlipFromReview) {
      dom.btnBackToSlipFromReview.onclick = () => switchView('RESULTS');
    }
    if (dom.btnReturnHomeFromReview) {
      dom.btnReturnHomeFromReview.onclick = () => switchView('DASHBOARD');
    }
    if (dom.btnReviewFilterAll) {
      dom.btnReviewFilterAll.onclick = () => filterReviewQuestions('ALL');
    }
    if (dom.btnReviewFilterWrong) {
      dom.btnReviewFilterWrong.onclick = () => filterReviewQuestions('WRONG');
    }
    if (dom.btnReviewFilterCorrect) {
      dom.btnReviewFilterCorrect.onclick = () => filterReviewQuestions('CORRECT');
    }
    if (dom.btnReviewFilterUnanswered) {
      dom.btnReviewFilterUnanswered.onclick = () => filterReviewQuestions('UNANSWERED');
    }

    // License Activation Handlers
    if (dom.licenseStatusBadge) {
      dom.licenseStatusBadge.onclick = () => openActivationModal();
    }
    if (dom.btnCloseActivationModal) {
      dom.btnCloseActivationModal.onclick = closeActivationModal;
    }
    if (dom.btnActivateLicense) {
      dom.btnActivateLicense.onclick = handleActivateLicenseClick;
    }

    if (dom.inputLicenseKey) {
      dom.inputLicenseKey.oninput = (e) => {
        const formatted = window.sanitizeAndFormatKey ? window.sanitizeAndFormatKey(e.target.value) : e.target.value.toUpperCase();
        e.target.value = formatted;
        if (dom.keyCharCount) dom.keyCharCount.textContent = `${formatted.length}/19`;
      };

      dom.inputLicenseKey.onkeydown = (e) => {
        if (e.key === 'Enter') handleActivateLicenseClick();
      };
    }

    // Supabase Configuration Modal Handlers
    if (dom.btnOpenSupabaseSettings) {
      dom.btnOpenSupabaseSettings.onclick = (e) => {
        e.preventDefault();
        const conf = window.PkskLicense.getConfig();
        if (dom.inputSupabaseUrl) dom.inputSupabaseUrl.value = conf.url || '';
        if (dom.inputSupabaseAnonKey) dom.inputSupabaseAnonKey.value = conf.anonKey.startsWith('eyJ') ? conf.anonKey : '';
        if (dom.supabaseConfigModal) dom.supabaseConfigModal.classList.remove('hidden');
      };
    }

    if (dom.btnCloseSupabaseConfig) {
      dom.btnCloseSupabaseConfig.onclick = () => {
        if (dom.supabaseConfigModal) dom.supabaseConfigModal.classList.add('hidden');
      };
    }

    if (dom.btnSaveSupabaseConfig) {
      dom.btnSaveSupabaseConfig.onclick = () => {
        const url = dom.inputSupabaseUrl.value.trim();
        const key = dom.inputSupabaseAnonKey.value.trim();
        if (!url || !key) {
          if (dom.supabaseConfigAlertBox) {
            dom.supabaseConfigAlertBox.style.display = 'block';
            dom.supabaseConfigAlertBox.style.background = '#fef2f2';
            dom.supabaseConfigAlertBox.style.color = '#b91c1c';
            dom.supabaseConfigAlertBox.textContent = 'Sila masukkan Project URL dan Anon Key.';
          }
          return;
        }

        window.PkskLicense.setSupabaseConfig(url, key);
        if (dom.supabaseConfigAlertBox) {
          dom.supabaseConfigAlertBox.style.display = 'block';
          dom.supabaseConfigAlertBox.style.background = '#f0fdf4';
          dom.supabaseConfigAlertBox.style.color = '#15803d';
          dom.supabaseConfigAlertBox.textContent = '✓ Konfigurasi Supabase berjaya disimpan!';
        }

        setTimeout(() => {
          if (dom.supabaseConfigModal) dom.supabaseConfigModal.classList.add('hidden');
        }, 1000);
      };
    }
  }

  // Self Initialization on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initEventListeners();
      updateLicenseBadgeUI();
      switchView('DASHBOARD');
    });
  } else {
    initEventListeners();
    updateLicenseBadgeUI();
    switchView('DASHBOARD');
  }

})();
