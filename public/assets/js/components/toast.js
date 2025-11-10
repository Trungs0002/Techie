// Toast Notification Component
class Toast {
  constructor() {
    this.container = null;
    this.init();
  }

  init() {
    // Create container if not exists
    if (!document.getElementById('toast-container')) {
      this.container = document.createElement('div');
      this.container.id = 'toast-container';
      this.container.className = 'fixed top-4 right-4 z-50 space-y-2';
      document.body.appendChild(this.container);
    } else {
      this.container = document.getElementById('toast-container');
    }
  }

  show(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    const id = `toast-${Date.now()}`;
    toast.id = id;
    
    const icons = {
      success: '<i class="fas fa-check-circle"></i>',
      error: '<i class="fas fa-times-circle"></i>',
      warning: '<i class="fas fa-exclamation-triangle"></i>',
      info: '<i class="fas fa-info-circle"></i>'
    };

    const colors = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      warning: 'bg-yellow-500',
      info: 'bg-blue-500'
    };

    toast.className = `${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] animate-slide-in-right`;
    toast.innerHTML = `
      ${icons[type]}
      <span class="flex-1">${message}</span>
      <button onclick="window.ToastInstance.hide('${id}')" class="hover:bg-white hover:bg-opacity-20 rounded p-1 transition">
        <i class="fas fa-times"></i>
      </button>
    `;

    this.container.appendChild(toast);

    // Auto hide
    if (duration > 0) {
      setTimeout(() => this.hide(id), duration);
    }

    return id;
  }

  hide(id) {
    const toast = document.getElementById(id);
    if (toast) {
      toast.classList.add('animate-slide-out-right');
      setTimeout(() => toast.remove(), 300);
    }
  }

  success(message, duration) {
    return this.show(message, 'success', duration);
  }

  error(message, duration) {
    return this.show(message, 'error', duration);
  }

  warning(message, duration) {
    return this.show(message, 'warning', duration);
  }

  info(message, duration) {
    return this.show(message, 'info', duration);
  }
}

// Initialize global instance
window.ToastInstance = new Toast();
