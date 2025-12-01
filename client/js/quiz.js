/**
 * Quiz play logic
 */

const QUIZ_STATE = {
  questions: [],
  currentIndex: 0,
  score: 0,
  correctCount: 0,
  answers: [],
  startedAt: null,
  totalTimerId: null,
  questionTimerId: null,
  totalSecondsLeft: 0,
  questionSecondsLeft: 0,
  settings: null,
  audioReady: false,
};

const QUIZ_DEFAULTS = {
  backgroundMusic: false,
  soundEffects: false,
  timer: false,
  questionsPerExam: 5,
  examTimer: 60, // minutes
  questionTimeLimit: 30, // seconds for each question when timer enabled
};

const quizAPI = {
  async fetchQuestions(limit) {
    return apiCall(`/questions/random?limit=${limit}`, { method: "GET" });
  },
};

document.addEventListener("DOMContentLoaded", async () => {
  showLoading(true);
  try {
    QUIZ_STATE.settings = await loadQuizSettings();
    initAudioFromSettings();
    await loadQuestions();
    startTotalTimer();
    renderQuestion();
    bindActions();
  } catch (error) {
    showMessage(error.message || "Không thể tải bài trắc nghiệm", true);
  } finally {
    showLoading(false);
  }
});

async function loadQuizSettings() {
  const cached = loadSettingsFromLocal();
  let serverSettings = {};

  try {
    const response = await apiCall("/users/settings", { method: "GET" });
    if (response.success) {
      serverSettings = response.data.settings || {};
      localStorage.setItem("userSettings", JSON.stringify(serverSettings));
    }
  } catch (error) {
    console.warn("Cannot load settings from server, use cached/default", error);
  }

  return {
    ...QUIZ_DEFAULTS,
    ...cached,
    ...serverSettings,
  };
}

function initAudioFromSettings() {
  if (typeof initAudioController === "function") {
    initAudioController();
    if (audioController && typeof audioController.setEffectsEnabled === "function") {
      audioController.setEffectsEnabled(!!QUIZ_STATE.settings?.soundEffects);
    }

    const tryStartBackground = () => {
      if (QUIZ_STATE.settings?.backgroundMusic && typeof toggleBackgroundMusic === "function") {
        toggleBackgroundMusic(true).catch((err) => {
          console.warn("Cannot start background music in quiz:", err);
        });
      }
      if (audioController && typeof audioController.setEffectsEnabled === "function") {
        audioController.setEffectsEnabled(!!QUIZ_STATE.settings?.soundEffects);
      }
      document.removeEventListener("click", tryStartBackground);
      document.removeEventListener("keydown", tryStartBackground);
    };

    // Attach user interaction listeners to satisfy autoplay policies
    document.addEventListener("click", tryStartBackground);
    document.addEventListener("keydown", tryStartBackground);
  }
}

function loadSettingsFromLocal() {
  try {
    const raw = localStorage.getItem("userSettings");
    if (raw) return JSON.parse(raw);
  } catch (error) {
    console.warn("Cannot parse cached settings", error);
  }
  return {};
}

async function loadQuestions() {
  const limit = QUIZ_STATE.settings.questionsPerExam || QUIZ_DEFAULTS.questionsPerExam;
  const response = await quizAPI.fetchQuestions(limit);
  if (!response.success || !response.data?.questions?.length) {
    throw new Error("Không tìm thấy câu hỏi nào");
  }
  QUIZ_STATE.questions = response.data.questions;
  QUIZ_STATE.currentIndex = 0;
  QUIZ_STATE.score = 0;
  QUIZ_STATE.correctCount = 0;
  QUIZ_STATE.answers = [];
  QUIZ_STATE.startedAt = Date.now();
}

function renderQuestion() {
  const question = QUIZ_STATE.questions[QUIZ_STATE.currentIndex];
  if (!question) {
    finishQuiz();
    return;
  }

  const progressEl = document.getElementById("question-progress");
  const scoreEl = document.getElementById("score");
  const correctEl = document.getElementById("correct-count");
  const typeEl = document.getElementById("question-type");
  const subjectEl = document.getElementById("question-subject");
  const textEl = document.getElementById("question-text");
  const optionsEl = document.getElementById("options-container");

  progressEl.textContent = `${QUIZ_STATE.currentIndex + 1} / ${QUIZ_STATE.questions.length}`;
  scoreEl.textContent = `${QUIZ_STATE.score}`;
  correctEl.textContent = `${QUIZ_STATE.correctCount}`;
  
  // Display Type
  typeEl.textContent = question.type === "true_false" ? "Đúng / Sai" : "4 lựa chọn";

  // Display Subject
  if (subjectEl) {
    let subjectName = "";
    // Check subjectId (populated object)
    if (question.subjectId && question.subjectId.name) {
      subjectName = question.subjectId.name;
    } 
    // Check subjectId (string)
    else if (typeof question.subjectId === 'string' && question.subjectId) {
       subjectName = question.subjectId;
    }
    // Fallback to old 'subject' field
    else if (question.subject && question.subject.name) {
      subjectName = question.subject.name;
    } else if (typeof question.subject === 'string' && question.subject) {
      subjectName = question.subject;
    }

    if (subjectName) {
      subjectEl.textContent = subjectName;
      subjectEl.classList.remove("hidden");
    } else {
      subjectEl.classList.add("hidden");
    }
  }

  textEl.textContent = question.content;

  optionsEl.innerHTML = "";
  question.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = opt.text;
    btn.addEventListener("click", () => selectAnswer(idx));
    optionsEl.appendChild(btn);
  });

  resetQuestionTimer();
}

function selectAnswer(optionIndex) {
  const question = QUIZ_STATE.questions[QUIZ_STATE.currentIndex];
  if (!question) return;

  // Prevent double answer
  const alreadyAnswered = QUIZ_STATE.answers[QUIZ_STATE.currentIndex];
  if (alreadyAnswered) return;

  clearInterval(QUIZ_STATE.questionTimerId);

  const selectedOption = question.options[optionIndex];
  const isCorrect = !!selectedOption?.isCorrect;

  QUIZ_STATE.answers[QUIZ_STATE.currentIndex] = {
    selected: optionIndex,
    isCorrect,
    timeSpent: (QUIZ_STATE.settings.questionTimeLimit || 30) - QUIZ_STATE.questionSecondsLeft,
  };

  if (isCorrect) {
    QUIZ_STATE.score += 1;
    QUIZ_STATE.correctCount += 1;
    if (QUIZ_STATE.settings.soundEffects && typeof window.playSoundEffect === "function") {
      window.playSoundEffect("correct");
    }
  } else {
    if (QUIZ_STATE.settings.soundEffects && typeof window.playSoundEffect === "function") {
      window.playSoundEffect("wrong");
    }
  }

  paintOptionResult(optionIndex, isCorrect, question.options);
}

function paintOptionResult(selectedIndex, isCorrect, options) {
  const optionButtons = document.querySelectorAll(".option");
  optionButtons.forEach((btn, idx) => {
    if (idx === selectedIndex) {
      btn.classList.add(isCorrect ? "correct" : "wrong", "selected");
    }
    if (options[idx].isCorrect) {
      btn.classList.add("correct");
    }
    btn.disabled = true;
  });
}

function bindActions() {
  const nextBtn = document.getElementById("next-btn");
  const skipBtn = document.getElementById("skip-btn");

  nextBtn.addEventListener("click", () => {
    goNext();
  });

  skipBtn.addEventListener("click", () => {
    if (!QUIZ_STATE.answers[QUIZ_STATE.currentIndex]) {
      QUIZ_STATE.answers[QUIZ_STATE.currentIndex] = {
        selected: null,
        isCorrect: false,
        timeSpent: (QUIZ_STATE.settings.questionTimeLimit || 30) - QUIZ_STATE.questionSecondsLeft,
      };
    }
    goNext();
  });
}

function goNext() {
  const nextIndex = QUIZ_STATE.currentIndex + 1;
  if (nextIndex >= QUIZ_STATE.questions.length) {
    finishQuiz();
    return;
  }
  QUIZ_STATE.currentIndex = nextIndex;
  renderQuestion();
}

function startTotalTimer() {
  const totalMinutes = QUIZ_STATE.settings.examTimer || QUIZ_DEFAULTS.examTimer;
  QUIZ_STATE.totalSecondsLeft = totalMinutes * 60;
  updateTotalTimerUI();
  QUIZ_STATE.totalTimerId = setInterval(() => {
    QUIZ_STATE.totalSecondsLeft -= 1;
    updateTotalTimerUI();
    if (QUIZ_STATE.totalSecondsLeft <= 0) {
      clearInterval(QUIZ_STATE.totalTimerId);
      finishQuiz();
    }
  }, 1000);
}

function updateTotalTimerUI() {
  const el = document.getElementById("total-timer");
  el.textContent = formatSeconds(QUIZ_STATE.totalSecondsLeft);
}

function resetQuestionTimer() {
  clearInterval(QUIZ_STATE.questionTimerId);

  const useTimer = !!QUIZ_STATE.settings.timer;
  const perQuestionLimit = QUIZ_STATE.settings.questionTimeLimit || QUIZ_DEFAULTS.questionTimeLimit;
  const timerEl = document.getElementById("per-question-timer");

  if (!useTimer) {
    timerEl.textContent = "Tắt";
    return;
  }

  QUIZ_STATE.questionSecondsLeft = perQuestionLimit;
  timerEl.textContent = formatSeconds(QUIZ_STATE.questionSecondsLeft);

  QUIZ_STATE.questionTimerId = setInterval(() => {
    QUIZ_STATE.questionSecondsLeft -= 1;
    timerEl.textContent = formatSeconds(QUIZ_STATE.questionSecondsLeft);
    if (QUIZ_STATE.questionSecondsLeft <= 0) {
      clearInterval(QUIZ_STATE.questionTimerId);
      if (!QUIZ_STATE.answers[QUIZ_STATE.currentIndex]) {
        QUIZ_STATE.answers[QUIZ_STATE.currentIndex] = {
          selected: null,
          isCorrect: false,
          timeSpent: perQuestionLimit,
        };
      }
      goNext();
    }
  }, 1000);
}

function formatSeconds(sec) {
  const clamped = Math.max(0, sec);
  const m = Math.floor(clamped / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(clamped % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

async function finishQuiz() {
  clearInterval(QUIZ_STATE.totalTimerId);
  clearInterval(QUIZ_STATE.questionTimerId);
  const endTime = Date.now();
  const elapsedSeconds = Math.floor((endTime - QUIZ_STATE.startedAt) / 1000);

  const totalQuestions = QUIZ_STATE.questions.length;
  const correct = QUIZ_STATE.correctCount;
  const wrong = totalQuestions - correct;

  // Save result to backend
  try {
    const resultData = {
      score: correct, // Using correct count as score for now
      totalQuestions,
      correctCount: correct,
      timeSpent: elapsedSeconds,
      subject: QUIZ_STATE.questions[0]?.subject || "Tổng hợp",
      questions: QUIZ_STATE.questions.map((q, idx) => ({
        questionId: q._id,
        userAnswer: QUIZ_STATE.answers[idx]?.selected?.toString(),
        isCorrect: QUIZ_STATE.answers[idx]?.isCorrect || false
      }))
    };
    
    await examAPI.saveResult(resultData);
  } catch (error) {
    console.error("Failed to save result:", error);
    showMessage("Không thể lưu kết quả bài thi", true);
  }

  document.getElementById("quiz-card").classList.add("hidden");
  document.getElementById("result-card").classList.remove("hidden");

  document.getElementById("result-score").textContent = `${correct} / ${totalQuestions}`;
  document.getElementById("result-correct").textContent = correct;
  document.getElementById("result-wrong").textContent = wrong;
  document.getElementById("result-time").textContent = formatSeconds(elapsedSeconds);
}

function showMessage(msg, isError = false) {
  const el = document.getElementById("message-area");
  if (!el) return;
  el.textContent = msg;
  el.classList.remove("hidden", "error", "success");
  el.classList.add(isError ? "error" : "success");
  setTimeout(() => el.classList.add("hidden"), 4000);
}

function showLoading(show) {
  const overlay = document.getElementById("loading-overlay");
  if (!overlay) return;
  overlay.classList[show ? "remove" : "add"]("hidden");
}
