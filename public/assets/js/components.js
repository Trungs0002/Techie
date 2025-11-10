/**
 * QuizMaster Components Bundle
 * Import all components in one file for convenience
 * Version: 2.0.0
 */

// Check if running in browser
if (typeof window === 'undefined') {
  throw new Error('Components must be loaded in a browser environment');
}

// Component loading status
window.ComponentsLoaded = {
  toast: false,
  modal: false,
  loading: false,
  dropdown: false,
  pagination: false
};

// Load component scripts dynamically
function loadComponentScript(name, path) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = path;
    script.onload = () => {
      window.ComponentsLoaded[name] = true;
      console.log(`✓ Component loaded: ${name}`);
      resolve();
    };
    script.onerror = () => {
      console.error(`✗ Failed to load component: ${name}`);
      reject(new Error(`Failed to load ${name}`));
    };
    document.head.appendChild(script);
  });
}

// Auto-load all components
async function initComponents() {
  const components = [
    { name: 'toast', path: '/assets/js/components/toast.js' },
    { name: 'modal', path: '/assets/js/components/modal.js' },
    { name: 'loading', path: '/assets/js/components/loading.js' },
    { name: 'dropdown', path: '/assets/js/components/dropdown.js' },
    { name: 'pagination', path: '/assets/js/components/pagination.js' }
  ];

  try {
    await Promise.all(
      components.map(comp => loadComponentScript(comp.name, comp.path))
    );
    console.log('✓ All components loaded successfully');
    
    // Dispatch event
    window.dispatchEvent(new Event('componentsLoaded'));
    
    return true;
  } catch (error) {
    console.error('Failed to load components:', error);
    return false;
  }
}

// Enhanced Utils integration
if (window.Utils) {
  // Store original methods
  const originalShowToast = window.Utils.showToast;
  const originalShowLoading = window.Utils.showLoading;
  const originalHideLoading = window.Utils.hideLoading;

  // Override with component versions
  window.Utils.showToast = function(message, type = 'info', duration = 3000) {
    if (window.ToastInstance) {
      return window.ToastInstance.show(message, type, duration);
    }
    return originalShowToast.call(this, message, type, duration);
  };

  window.Utils.showLoading = function(message = 'Đang tải...') {
    if (window.LoadingSpinnerInstance) {
      return window.LoadingSpinnerInstance.show(message);
    }
    return originalShowLoading.call(this, message);
  };

  window.Utils.hideLoading = function() {
    if (window.LoadingSpinnerInstance) {
      return window.LoadingSpinnerInstance.hide();
    }
    return originalHideLoading.call(this);
  };

  // Add new utility methods
  window.Utils.confirm = async function(message, title = 'Xác nhận') {
    if (window.confirmDialog) {
      return await window.confirmDialog({ message, title });
    }
    return confirm(message);
  };

  window.Utils.alert = async function(message, title = 'Thông báo') {
    if (window.alertDialog) {
      return await window.alertDialog(message, title);
    }
    alert(message);
  };

  window.Utils.modal = function(options) {
    if (window.Modal) {
      return new window.Modal(options);
    }
    console.warn('Modal component not loaded');
    return null;
  };

  console.log('✓ Utils enhanced with component integration');
}

// Export for use
window.initComponents = initComponents;

// Auto-init on DOM ready (optional)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('QuizMaster Components Bundle loaded');
  });
} else {
  console.log('QuizMaster Components Bundle loaded');
}
