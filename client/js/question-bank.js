/**
 * Question Bank Logic
 */

const bankAPI = {
  getSubjects: async () => {
    return apiCall("/subjects", { method: "GET" });
  },
  getQuestionsBySubject: async (subjectId) => {
    return apiCall(`/questions?subjectId=${subjectId}&limit=100`, { method: "GET" });
  },
};

let currentSubjectId = null;

document.addEventListener("DOMContentLoaded", () => {
  loadSubjects();
});

async function loadSubjects() {
  const subjectsList = document.getElementById("subjects-list");
  
  try {
    const response = await bankAPI.getSubjects();
    if (response.success && response.data.subjects) {
      renderSubjects(response.data.subjects);
    } else {
      subjectsList.innerHTML = '<div class="error-message">Không thể tải danh sách môn học</div>';
    }
  } catch (error) {
    console.error("Load subjects error:", error);
    subjectsList.innerHTML = '<div class="error-message">Lỗi kết nối</div>';
  }
}

function renderSubjects(subjects) {
  const subjectsList = document.getElementById("subjects-list");
  subjectsList.innerHTML = "";

  if (subjects.length === 0) {
    subjectsList.innerHTML = '<div class="empty-message">Chưa có môn học nào</div>';
    return;
  }

  subjects.forEach((subject) => {
    const item = document.createElement("div");
    item.className = "subject-item";
    item.textContent = subject.name;
    item.dataset.id = subject._id;
    
    item.addEventListener("click", () => {
      // Update active state
      document.querySelectorAll(".subject-item").forEach(el => el.classList.remove("active"));
      item.classList.add("active");
      
      selectSubject(subject);
    });

    subjectsList.appendChild(item);
  });
}

async function selectSubject(subject) {
  currentSubjectId = subject._id;
  
  // Update header
  document.getElementById("selected-subject-title").textContent = subject.name;
  document.getElementById("question-count").textContent = "Đang tải...";
  
  const questionsList = document.getElementById("questions-list");
  questionsList.innerHTML = '<div class="loading-spinner"></div>';

  try {
    const response = await bankAPI.getQuestionsBySubject(subject._id);
    if (response.success && response.data.questions) {
      renderQuestions(response.data.questions);
    } else {
      questionsList.innerHTML = '<div class="error-message">Không thể tải câu hỏi</div>';
    }
  } catch (error) {
    console.error("Load questions error:", error);
    questionsList.innerHTML = '<div class="error-message">Lỗi kết nối</div>';
  }
}

function renderQuestions(questions) {
  const questionsList = document.getElementById("questions-list");
  const countEl = document.getElementById("question-count");
  
  countEl.textContent = `${questions.length} câu hỏi`;
  questionsList.innerHTML = "";

  if (questions.length === 0) {
    questionsList.innerHTML = `
      <div class="empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <p>Chưa có câu hỏi nào cho môn học này</p>
      </div>
    `;
    return;
  }

  questions.forEach((q, index) => {
    const card = document.createElement("div");
    card.className = "question-card";
    
    // Find correct answer
    const correctOption = q.options.find(opt => opt.isCorrect);
    const correctAnswerText = correctOption ? correctOption.text : "Chưa cập nhật đáp án";
    
    // Difficulty badge
    const difficulty = q.difficulty || "medium"; // Default if missing
    const difficultyLabel = {
      easy: "Dễ",
      medium: "Trung bình",
      hard: "Khó"
    }[difficulty] || difficulty;

    card.innerHTML = `
      <div class="question-header">
        <span class="question-number">Câu ${index + 1}</span>
        <span class="difficulty-badge difficulty-${difficulty}">${difficultyLabel}</span>
      </div>
      <div class="question-content">${q.content}</div>
      
      <div class="correct-answer">
        <strong>Đáp án đúng:</strong>
        ${correctAnswerText}
      </div>
      
      ${q.explanation ? `
        <div class="explanation-box">
          <strong>Giải thích:</strong>
          <p>${q.explanation}</p>
        </div>
      ` : ''}
    `;
    
    questionsList.appendChild(card);
  });
}
