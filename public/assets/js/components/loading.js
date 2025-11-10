// Loading Spinner Component
class LoadingSpinner {
  constructor() {
    this.overlay = null;
    this.init();
  }

  init() {
    if (!document.getElementById('loading-overlay')) {
      this.overlay = document.createElement('div');
      this.overlay.id = 'loading-overlay';
      this.overlay.className = 'fixed inset-0 z-[100] hidden';
      this.overlay.innerHTML = `
        <div class="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="bg-white rounded-lg shadow-2xl p-6 flex flex-col items-center gap-4 animate-scale-in">
            <div class="spinner"></div>
            <p id="loading-text" class="text-gray-700 font-medium">Đang tải...</p>
          </div>
        </div>
      `;
      document.body.appendChild(this.overlay);
    } else {
      this.overlay = document.getElementById('loading-overlay');
    }
  }

  show(text = 'Đang tải...') {
    if (!this.overlay) this.init();
    
    const textElement = document.getElementById('loading-text');
    if (textElement) textElement.textContent = text;
    
    this.overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  hide() {
    if (this.overlay) {
      this.overlay.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  updateText(text) {
    const textElement = document.getElementById('loading-text');
    if (textElement) textElement.textContent = text;
  }
}

// Initialize global instance
window.LoadingSpinnerInstance = new LoadingSpinner();

// Progress Bar Component
class ProgressBar {
  constructor(container, options = {}) {
    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    this.value = options.value || 0;
    this.max = options.max || 100;
    this.color = options.color || 'bg-blue-600';
    this.showLabel = options.showLabel !== false;
    this.animated = options.animated !== false;
    this.striped = options.striped || false;
    
    this.render();
  }

  render() {
    const percentage = Math.round((this.value / this.max) * 100);
    
    this.container.innerHTML = `
      <div class="progress-bar-container">
        ${this.showLabel ? `<div class="text-sm text-gray-600 mb-1 flex justify-between">
          <span>Tiến độ</span>
          <span class="font-semibold">${percentage}%</span>
        </div>` : ''}
        <div class="progress">
          <div class="progress-bar ${this.color} ${this.animated ? 'progress-bar-animated' : ''} ${this.striped ? 'progress-bar-striped' : ''}" 
               style="width: ${percentage}%"
               role="progressbar" 
               aria-valuenow="${this.value}" 
               aria-valuemin="0" 
               aria-valuemax="${this.max}">
          </div>
        </div>
      </div>
    `;
  }

  setValue(value) {
    this.value = Math.min(Math.max(value, 0), this.max);
    this.render();
  }

  increment(amount = 1) {
    this.setValue(this.value + amount);
  }

  reset() {
    this.setValue(0);
  }
}

window.ProgressBar = ProgressBar;
