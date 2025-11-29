/**
 * Question creation logic
 */

document.addEventListener("DOMContentLoaded", () => {
  bindTypeSwitcher();
  bindFormSubmit();
});

function bindTypeSwitcher() {
  const typeSelect = document.getElementById("type");
  if (!typeSelect) return;
  typeSelect.addEventListener("change", () => {
    toggleOptionBlocks(typeSelect.value);
  });
}

function toggleOptionBlocks(type) {
  const mc = document.getElementById("options-mc");
  const tf = document.getElementById("options-tf");
  if (!mc || !tf) return;
  if (type === "true_false") {
    mc.classList.add("hidden");
    tf.classList.remove("hidden");
  } else {
    tf.classList.add("hidden");
    mc.classList.remove("hidden");
  }
}

function bindFormSubmit() {
  const form = document.getElementById("question-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const content = form.content.value.trim();
    const type = form.type.value;
    const subject = form.subject.value.trim();
    const explanation = form.explanation.value.trim();

    if (!content) {
      return showCreateMessage("Vui lòng nhập nội dung câu hỏi", true);
    }

    let options = [];
    if (type === "true_false") {
      const correctValue = form["tf-correct"].value === "true";
      options = [
        { text: "Đúng", isCorrect: correctValue },
        { text: "Sai", isCorrect: !correctValue },
      ];
    } else {
      const optionInputs = form.querySelectorAll("input[data-option-index]");
      const correctRadios = form.querySelectorAll('input[name="correct"]');
      const correctIndex = Array.from(correctRadios).find((r) => r.checked)?.value || "0";

      options = Array.from(optionInputs).map((input, idx) => ({
        text: input.value.trim() || `Đáp án ${String.fromCharCode(65 + idx)}`,
        isCorrect: parseInt(correctIndex, 10) === idx,
      }));

      if (options.length !== 4) {
        return showCreateMessage("Cần đủ 4 đáp án cho dạng 4 lựa chọn", true);
      }
    }

    try {
      setSubmitState(form, true);
      const response = await apiCall("/questions", {
        method: "POST",
        body: JSON.stringify({
          content,
          type,
          options,
          explanation,
          subject,
        }),
      });

      if (response.success) {
        showCreateMessage("Đã lưu câu hỏi", false);
        form.reset();
        toggleOptionBlocks(form.type.value); // reset block visibility
      }
    } catch (error) {
      console.error("Create question error:", error);
      showCreateMessage(error.message || "Không thể lưu câu hỏi", true);
    } finally {
      setSubmitState(form, false);
    }
  });
}

function showCreateMessage(msg, isError = false) {
  const box = document.getElementById("message");
  if (!box) return;
  box.textContent = msg;
  box.classList.remove("hidden", "error", "success");
  box.classList.add(isError ? "error" : "success");
  setTimeout(() => box.classList.add("hidden"), 3500);
}

function setSubmitState(form, isSubmitting) {
  const submitBtn = form.querySelector('button[type="submit"]');
  if (!submitBtn) return;
  submitBtn.disabled = isSubmitting;
  submitBtn.textContent = isSubmitting ? "Đang lưu..." : "Lưu câu hỏi";
}
