// Pagination Component
class Pagination {
  constructor(container, options = {}) {
    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    this.currentPage = options.currentPage || 1;
    this.totalPages = options.totalPages || 1;
    this.onPageChange = options.onPageChange || null;
    this.maxVisible = options.maxVisible || 5;
    this.showFirstLast = options.showFirstLast !== false;
    this.showPrevNext = options.showPrevNext !== false;
    
    this.render();
  }

  render() {
    if (this.totalPages <= 1) {
      this.container.innerHTML = '';
      return;
    }

    let pages = [];

    // Calculate visible pages
    let start = Math.max(1, this.currentPage - Math.floor(this.maxVisible / 2));
    let end = Math.min(this.totalPages, start + this.maxVisible - 1);

    if (end - start < this.maxVisible - 1) {
      start = Math.max(1, end - this.maxVisible + 1);
    }

    // First page + ellipsis
    if (start > 1 && this.showFirstLast) {
      pages.push(this.createButton(1, '1'));
      if (start > 2) {
        pages.push('<span class="px-3 py-2 text-gray-500">...</span>');
      }
    }

    // Page numbers
    for (let i = start; i <= end; i++) {
      pages.push(this.createButton(i, i.toString(), i === this.currentPage));
    }

    // Last page + ellipsis
    if (end < this.totalPages && this.showFirstLast) {
      if (end < this.totalPages - 1) {
        pages.push('<span class="px-3 py-2 text-gray-500">...</span>');
      }
      pages.push(this.createButton(this.totalPages, this.totalPages.toString()));
    }

    // Prev button
    const prevBtn = this.showPrevNext ? `
      <button 
        onclick="window.PaginationInstances['${this.container.id}'].goToPage(${this.currentPage - 1})"
        class="btn btn-secondary btn-sm ${this.currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}"
        ${this.currentPage === 1 ? 'disabled' : ''}>
        <i class="fas fa-chevron-left"></i>
      </button>
    ` : '';

    // Next button
    const nextBtn = this.showPrevNext ? `
      <button 
        onclick="window.PaginationInstances['${this.container.id}'].goToPage(${this.currentPage + 1})"
        class="btn btn-secondary btn-sm ${this.currentPage === this.totalPages ? 'opacity-50 cursor-not-allowed' : ''}"
        ${this.currentPage === this.totalPages ? 'disabled' : ''}>
        <i class="fas fa-chevron-right"></i>
      </button>
    ` : '';

    this.container.innerHTML = `
      <div class="flex items-center justify-center gap-2">
        ${prevBtn}
        ${pages.join('')}
        ${nextBtn}
      </div>
    `;

    // Store instance
    if (!window.PaginationInstances) window.PaginationInstances = {};
    if (this.container.id) {
      window.PaginationInstances[this.container.id] = this;
    }
  }

  createButton(page, label, active = false) {
    return `
      <button 
        onclick="window.PaginationInstances['${this.container.id}'].goToPage(${page})"
        class="px-3 py-2 rounded transition ${active 
          ? 'bg-blue-600 text-white font-semibold' 
          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'}">
        ${label}
      </button>
    `;
  }

  goToPage(page) {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    
    this.currentPage = page;
    this.render();

    if (this.onPageChange) {
      this.onPageChange(page);
    }
  }

  setTotalPages(total) {
    this.totalPages = total;
    this.currentPage = Math.min(this.currentPage, total);
    this.render();
  }

  reset() {
    this.currentPage = 1;
    this.render();
  }
}

// Tabs Component
class Tabs {
  constructor(container, options = {}) {
    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    this.activeTab = options.activeTab || 0;
    this.onChange = options.onChange || null;
    
    this.init();
  }

  init() {
    if (!this.container) return;

    const tabButtons = this.container.querySelectorAll('[data-tab]');
    const tabPanels = this.container.querySelectorAll('[data-tab-panel]');

    tabButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        this.switchTab(index, tabButtons, tabPanels);
      });
    });

    // Activate initial tab
    this.switchTab(this.activeTab, tabButtons, tabPanels);
  }

  switchTab(index, buttons, panels) {
    // Remove active from all
    buttons.forEach(btn => {
      btn.classList.remove('active', 'text-blue-600', 'border-blue-600');
      btn.classList.add('text-gray-600');
    });
    
    panels.forEach(panel => {
      panel.classList.add('hidden');
    });

    // Activate selected
    if (buttons[index]) {
      buttons[index].classList.add('active', 'text-blue-600', 'border-blue-600');
      buttons[index].classList.remove('text-gray-600');
    }

    if (panels[index]) {
      panels[index].classList.remove('hidden');
    }

    this.activeTab = index;

    if (this.onChange) {
      this.onChange(index);
    }
  }
}

// Accordion Component
class Accordion {
  constructor(container, options = {}) {
    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    this.allowMultiple = options.allowMultiple || false;
    
    this.init();
  }

  init() {
    if (!this.container) return;

    const items = this.container.querySelectorAll('[data-accordion-item]');

    items.forEach((item, index) => {
      const header = item.querySelector('[data-accordion-header]');
      const content = item.querySelector('[data-accordion-content]');

      if (!header || !content) return;

      // Initially hide content
      content.classList.add('hidden');

      header.addEventListener('click', () => {
        const isOpen = !content.classList.contains('hidden');

        if (!this.allowMultiple) {
          // Close all other items
          items.forEach((otherItem, otherIndex) => {
            if (otherIndex !== index) {
              const otherContent = otherItem.querySelector('[data-accordion-content]');
              const otherIcon = otherItem.querySelector('[data-accordion-icon]');
              if (otherContent) otherContent.classList.add('hidden');
              if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
            }
          });
        }

        // Toggle current item
        if (isOpen) {
          content.classList.add('hidden');
          const icon = header.querySelector('[data-accordion-icon]');
          if (icon) icon.style.transform = 'rotate(0deg)';
        } else {
          content.classList.remove('hidden');
          const icon = header.querySelector('[data-accordion-icon]');
          if (icon) icon.style.transform = 'rotate(180deg)';
        }
      });
    });
  }
}

window.Pagination = Pagination;
window.Tabs = Tabs;
window.Accordion = Accordion;
