// Simple Client-Side Router
const Router = {
  routes: {
    '/': '/index.html',
    '/login': '/pages/auth/login.html',
    '/register': '/pages/auth/register.html',
    '/dashboard': '/pages/dashboard.html',
    '/subjects': '/pages/subjects.html',
    '/exams': '/pages/exams.html',
    '/quiz': '/pages/quiz.html',
    '/results': '/pages/results.html',
    '/history': '/pages/history.html',
    '/profile': '/pages/profile.html',
    '/settings': '/pages/settings.html'
  },
  
  protectedRoutes: [
    '/dashboard',
    '/subjects',
    '/exams',
    '/quiz',
    '/results',
    '/history',
    '/profile',
    '/settings'
  ],
  
  init() {
    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
      this.loadCurrentRoute();
    });
    
    // Handle all link clicks
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[data-link]');
      if (link) {
        e.preventDefault();
        this.navigate(link.getAttribute('href'));
      }
    });
  },
  
  navigate(path) {
    // Check authentication for protected routes
    if (this.protectedRoutes.includes(path) && !Auth.isAuthenticated()) {
      Utils.showToast('Please login to continue', 'warning');
      path = '/login';
    }
    
    // Update browser history
    history.pushState(null, '', path);
    
    // Load the page
    this.loadRoute(path);
  },
  
  loadCurrentRoute() {
    const path = window.location.pathname;
    this.loadRoute(path);
  },
  
  loadRoute(path) {
    const route = this.routes[path] || this.routes['/'];
    
    // For multi-page app, just redirect
    if (window.location.pathname !== path) {
      window.location.href = route;
    }
  },
  
  // Helper method to create navigation links
  createLink(path, text, className = '') {
    return `<a href="${path}" data-link class="${className}">${text}</a>`;
  }
};
