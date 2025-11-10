// Simple Client-Side Router
const Router = {
  routes: {
    '/': '/tracnghiemluyenthi/public/index.html',
    '/login': '/tracnghiemluyenthi/public/pages/auth/login.html',
    '/register': '/tracnghiemluyenthi/public/pages/auth/register.html',
    '/dashboard': '/tracnghiemluyenthi/public/pages/dashboard.html',
    '/subjects': '/tracnghiemluyenthi/public/pages/subjects.html',
    '/exams': '/tracnghiemluyenthi/public/pages/exams.html',
    '/quiz': '/tracnghiemluyenthi/public/pages/quiz.html',
    '/results': '/tracnghiemluyenthi/public/pages/results.html',
    '/history': '/tracnghiemluyenthi/public/pages/history.html',
    '/profile': '/tracnghiemluyenthi/public/pages/profile.html',
    '/settings': '/tracnghiemluyenthi/public/pages/settings.html'
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
