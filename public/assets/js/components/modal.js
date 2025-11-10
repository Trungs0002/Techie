// Modal Component
class Modal {
  constructor(options = {}) {
    this.id = options.id || `modal-${Date.now()}`;
    this.title = options.title || '';
    this.content = options.content || '';
    this.size = options.size || 'md'; // sm, md, lg, xl, full
    this.showClose = options.showClose !== false;
    this.closeOnBackdrop = options.closeOnBackdrop !== false;
    this.onOpen = options.onOpen || null;
    this.onClose = options.onClose || null;
    this.footer = options.footer || null;
    
    this.modal = null;
    this.isOpen = false;
  }

  create() {
    const sizeClasses = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      '2xl': 'max-w-2xl',
      full: 'max-w-full mx-4'
    };

    const modalHTML = `
      <div id="${this.id}" class="modal fixed inset-0 z-50 hidden">
        <div class="modal-backdrop fixed inset-0 bg-black bg-opacity-50 transition-opacity" onclick="window.ModalInstances['${this.id}'].${this.closeOnBackdrop ? 'close()' : ''}"></div>
        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <div class="modal-content bg-white rounded-lg shadow-xl ${sizeClasses[this.size]} w-full transform transition-all animate-scale-in">
              ${this.showClose ? `
                <button onclick="window.ModalInstances['${this.id}'].close()" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition z-10">
                  <i class="fas fa-times text-xl"></i>
                </button>
              ` : ''}
              
              ${this.title ? `
                <div class="modal-header px-6 py-4 border-b border-gray-200">
                  <h3 class="text-xl font-semibold text-gray-900">${this.title}</h3>
                </div>
              ` : ''}
              
              <div class="modal-body px-6 py-4">
                ${this.content}
              </div>
              
              ${this.footer ? `
                <div class="modal-footer px-6 py-4 border-t border-gray-200 flex justify-end gap-2">
                  ${this.footer}
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    `;

    // Remove existing modal with same ID
    const existing = document.getElementById(this.id);
    if (existing) existing.remove();

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    this.modal = document.getElementById(this.id);

    // Store instance
    if (!window.ModalInstances) window.ModalInstances = {};
    window.ModalInstances[this.id] = this;

    return this;
  }

  open() {
    if (!this.modal) this.create();
    
    this.modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    this.isOpen = true;

    if (this.onOpen) this.onOpen();

    return this;
  }

  close() {
    if (!this.modal) return;

    const content = this.modal.querySelector('.modal-content');
    content.classList.remove('animate-scale-in');
    content.classList.add('animate-scale-out');

    setTimeout(() => {
      this.modal.classList.add('hidden');
      document.body.style.overflow = '';
      this.isOpen = false;

      if (this.onClose) this.onClose();
    }, 200);

    return this;
  }

  destroy() {
    if (this.modal) {
      this.modal.remove();
      delete window.ModalInstances[this.id];
    }
  }

  setContent(content) {
    if (this.modal) {
      const body = this.modal.querySelector('.modal-body');
      if (body) body.innerHTML = content;
    }
    return this;
  }

  setTitle(title) {
    if (this.modal) {
      const header = this.modal.querySelector('.modal-header h3');
      if (header) header.textContent = title;
    }
    return this;
  }
}

// Confirm Dialog
function confirmDialog(options = {}) {
  return new Promise((resolve) => {
    const modal = new Modal({
      title: options.title || 'Xác nhận',
      content: options.message || 'Bạn có chắc chắn?',
      size: options.size || 'sm',
      footer: `
        <button onclick="window.ModalInstances['${Date.now()}-confirm'].close(); window.confirmResolve(false)" class="btn btn-secondary">
          ${options.cancelText || 'Hủy'}
        </button>
        <button onclick="window.ModalInstances['${Date.now()}-confirm'].close(); window.confirmResolve(true)" class="btn btn-primary">
          ${options.confirmText || 'Xác nhận'}
        </button>
      `,
      closeOnBackdrop: false,
      onClose: () => {
        resolve(false);
        delete window.confirmResolve;
      }
    });

    window.confirmResolve = (result) => {
      resolve(result);
      delete window.confirmResolve;
    };

    modal.id = Date.now() + '-confirm';
    modal.create().open();
  });
}

// Alert Dialog
function alertDialog(message, title = 'Thông báo') {
  return new Promise((resolve) => {
    const modal = new Modal({
      title: title,
      content: message,
      size: 'sm',
      footer: `
        <button onclick="window.ModalInstances['${Date.now()}-alert'].close(); window.alertResolve()" class="btn btn-primary">
          OK
        </button>
      `,
      closeOnBackdrop: false,
      onClose: () => {
        resolve();
        delete window.alertResolve;
      }
    });

    window.alertResolve = () => {
      resolve();
      delete window.alertResolve;
    };

    modal.id = Date.now() + '-alert';
    modal.create().open();
  });
}

// Export
window.Modal = Modal;
window.confirmDialog = confirmDialog;
window.alertDialog = alertDialog;
