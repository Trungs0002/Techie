// Dropdown Component
class Dropdown {
  constructor(trigger, menu, options = {}) {
    this.trigger = typeof trigger === 'string' ? document.querySelector(trigger) : trigger;
    this.menu = typeof menu === 'string' ? document.querySelector(menu) : menu;
    this.closeOnClick = options.closeOnClick !== false;
    this.closeOnOutside = options.closeOnOutside !== false;
    this.isOpen = false;

    this.init();
  }

  init() {
    if (!this.trigger || !this.menu) return;

    // Hide menu initially
    this.menu.classList.add('hidden');

    // Toggle on trigger click
    this.trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggle();
    });

    // Close on outside click
    if (this.closeOnOutside) {
      document.addEventListener('click', (e) => {
        if (this.isOpen && !this.menu.contains(e.target)) {
          this.close();
        }
      });
    }

    // Close on menu item click
    if (this.closeOnClick) {
      this.menu.addEventListener('click', () => {
        this.close();
      });
    }
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.menu.classList.remove('hidden');
    this.menu.classList.add('animate-fade-in');
    this.isOpen = true;
  }

  close() {
    this.menu.classList.add('hidden');
    this.menu.classList.remove('animate-fade-in');
    this.isOpen = false;
  }
}

// Tooltip Component
class Tooltip {
  constructor(element, options = {}) {
    this.element = typeof element === 'string' ? document.querySelector(element) : element;
    this.text = options.text || this.element.getAttribute('data-tooltip') || '';
    this.position = options.position || 'top'; // top, bottom, left, right
    this.delay = options.delay || 200;
    
    this.tooltip = null;
    this.timeout = null;

    this.init();
  }

  init() {
    if (!this.element) return;

    this.element.addEventListener('mouseenter', () => {
      this.timeout = setTimeout(() => this.show(), this.delay);
    });

    this.element.addEventListener('mouseleave', () => {
      clearTimeout(this.timeout);
      this.hide();
    });
  }

  show() {
    if (this.tooltip) return;

    this.tooltip = document.createElement('div');
    this.tooltip.className = 'tooltip fixed z-[999] bg-gray-900 text-white text-sm px-3 py-2 rounded shadow-lg pointer-events-none animate-fade-in';
    this.tooltip.textContent = this.text;
    document.body.appendChild(this.tooltip);

    this.position();
  }

  hide() {
    if (this.tooltip) {
      this.tooltip.remove();
      this.tooltip = null;
    }
  }

  position() {
    if (!this.tooltip) return;

    const rect = this.element.getBoundingClientRect();
    const tooltipRect = this.tooltip.getBoundingClientRect();

    let top, left;

    switch (this.position) {
      case 'top':
        top = rect.top - tooltipRect.height - 8;
        left = rect.left + (rect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = rect.bottom + 8;
        left = rect.left + (rect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = rect.top + (rect.height - tooltipRect.height) / 2;
        left = rect.left - tooltipRect.width - 8;
        break;
      case 'right':
        top = rect.top + (rect.height - tooltipRect.height) / 2;
        left = rect.right + 8;
        break;
    }

    this.tooltip.style.top = `${top}px`;
    this.tooltip.style.left = `${left}px`;
  }
}

// Initialize tooltips automatically
function initTooltips() {
  document.querySelectorAll('[data-tooltip]').forEach(element => {
    new Tooltip(element);
  });
}

// Auto-init on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTooltips);
} else {
  initTooltips();
}

window.Dropdown = Dropdown;
window.Tooltip = Tooltip;
window.initTooltips = initTooltips;
