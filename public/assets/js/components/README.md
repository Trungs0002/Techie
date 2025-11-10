# QuizMaster Components Documentation

## 📦 Available Components

### 1. Toast Notifications (`toast.js`)
**Usage:**
```javascript
// Show toast
window.ToastInstance.show('Message', 'type', duration);

// Shortcuts
window.ToastInstance.success('Success!');
window.ToastInstance.error('Error!');
window.ToastInstance.warning('Warning!');
window.ToastInstance.info('Info!');

// Or use Utils wrapper
Utils.showToast('Message', 'type');
```

**Types:** `success`, `error`, `warning`, `info`

**Features:**
- Auto-dismiss with configurable duration
- Manual close button
- Slide-in/out animations
- Stacking multiple toasts
- Global instance

---

### 2. Modal Dialogs (`modal.js`)
**Usage:**
```javascript
// Create modal
const modal = new Modal({
  id: 'my-modal',
  title: 'Modal Title',
  content: '<p>Modal content</p>',
  size: 'md', // sm, md, lg, xl, 2xl, full
  showClose: true,
  closeOnBackdrop: true,
  footer: '<button class="btn btn-primary">OK</button>',
  onOpen: () => console.log('opened'),
  onClose: () => console.log('closed')
});

modal.create().open();

// Confirm dialog
const result = await confirmDialog({
  title: 'Confirm?',
  message: 'Are you sure?',
  confirmText: 'Yes',
  cancelText: 'No'
});

if (result) {
  // User confirmed
}

// Alert dialog
await alertDialog('Message!', 'Title');
```

**Features:**
- Multiple sizes
- Custom footer
- Backdrop click to close
- Callbacks on open/close
- Confirm/Alert helpers
- Scale animations

---

### 3. Loading Spinner (`loading.js`)
**Usage:**
```javascript
// Show loading
window.LoadingSpinnerInstance.show('Loading...');

// Update text
window.LoadingSpinnerInstance.updateText('Processing...');

// Hide loading
window.LoadingSpinnerInstance.hide();

// Or use Utils wrapper
Utils.showLoading('Loading...');
Utils.hideLoading();
```

**Features:**
- Full-screen overlay
- Customizable text
- Backdrop blur effect
- Auto body scroll lock

---

### 4. Progress Bar (`loading.js`)
**Usage:**
```javascript
const progress = new ProgressBar('#container', {
  value: 50,
  max: 100,
  color: 'bg-blue-600',
  showLabel: true,
  animated: true,
  striped: false
});

// Update progress
progress.setValue(75);
progress.increment(5);
progress.reset();
```

**Features:**
- Percentage display
- Custom colors
- Animated/striped variants
- Increment helper

---

### 5. Dropdown (`dropdown.js`)
**Usage:**
```javascript
const dropdown = new Dropdown('#trigger', '#menu', {
  closeOnClick: true,
  closeOnOutside: true
});

// Or simple initialization
dropdown.open();
dropdown.close();
dropdown.toggle();
```

**Features:**
- Click outside to close
- Auto-close on item click
- Toggle behavior
- Fade animations

---

### 6. Tooltip (`dropdown.js`)
**Usage:**
```javascript
// HTML attribute (auto-init)
<button data-tooltip="Tooltip text">Hover me</button>

// Manual initialization
new Tooltip('#element', {
  text: 'Tooltip text',
  position: 'top', // top, bottom, left, right
  delay: 200
});

// Re-init all tooltips
initTooltips();
```

**Features:**
- Auto-positioning
- Configurable delay
- Multiple positions
- Auto-initialization from data attributes

---

### 7. Pagination (`pagination.js`)
**Usage:**
```javascript
const pagination = new Pagination('#pagination', {
  currentPage: 1,
  totalPages: 10,
  maxVisible: 5,
  showFirstLast: true,
  showPrevNext: true,
  onPageChange: (page) => {
    console.log('Page changed to:', page);
    // Load data for page
  }
});

// Control
pagination.goToPage(5);
pagination.setTotalPages(20);
pagination.reset();
```

**Features:**
- Ellipsis for many pages
- First/Last buttons
- Previous/Next buttons
- Page change callback
- Dynamic page updates

---

### 8. Tabs (`pagination.js`)
**Usage:**
```html
<div id="tabs">
  <!-- Tab buttons -->
  <button data-tab="0">Tab 1</button>
  <button data-tab="1">Tab 2</button>
  
  <!-- Tab panels -->
  <div data-tab-panel="0">Content 1</div>
  <div data-tab-panel="1">Content 2</div>
</div>

<script>
new Tabs('#tabs', {
  activeTab: 0,
  onChange: (index) => console.log('Tab changed:', index)
});
</script>
```

**Features:**
- Simple data attributes
- Active state management
- Change callback
- Smooth transitions

---

### 9. Accordion (`pagination.js`)
**Usage:**
```html
<div id="accordion">
  <div data-accordion-item>
    <div data-accordion-header>
      Header 1
      <i data-accordion-icon class="fas fa-chevron-down"></i>
    </div>
    <div data-accordion-content>Content 1</div>
  </div>
</div>

<script>
new Accordion('#accordion', {
  allowMultiple: false // Only one open at a time
});
</script>
```

**Features:**
- Single/multiple open
- Icon rotation
- Smooth collapse
- Data attribute based

---

## 🎨 CSS Files

### `animations.css`
**Includes:**
- Slide animations (in/out, left/right)
- Scale animations (in/out)
- Bounce, shake effects
- Progress bar animations
- Skeleton loading
- Glow, float, pulse effects
- Gradient animations
- Loading dots

### `utilities.css`
**Includes:**
- Spacing utilities (space-x, space-y)
- Flex utilities (flex-center, flex-between)
- Grid utilities (grid-auto)
- Text utilities (ellipsis, line-clamp)
- Border utilities (dashed, dotted, divide)
- Backdrop utilities (blur variants)
- Aspect ratio (square, video, 4:3)
- Interactive utilities (cursor, select)
- State utilities (disabled, loading)
- Gradient backgrounds
- Scrollbar styling
- Empty/error/success states
- Accessibility helpers

---

## 🚀 Integration

**In your HTML:**
```html
<!-- Core CSS -->
<link rel="stylesheet" href="/assets/css/main.css">
<link rel="stylesheet" href="/assets/css/components.css">
<link rel="stylesheet" href="/assets/css/animations.css">
<link rel="stylesheet" href="/assets/css/utilities.css">

<!-- Core JS -->
<script src="/assets/js/config.js"></script>
<script src="/assets/js/utils.js"></script>
<script src="/assets/js/api.js"></script>
<script src="/assets/js/auth.js"></script>

<!-- Components (optional - load as needed) -->
<script src="/assets/js/components/toast.js"></script>
<script src="/assets/js/components/modal.js"></script>
<script src="/assets/js/components/loading.js"></script>
<script src="/assets/js/components/dropdown.js"></script>
<script src="/assets/js/components/pagination.js"></script>
```

**All components are vanilla JavaScript - no dependencies!**

---

## 💡 Tips

1. **Components are optional** - Core functionality works without them
2. **Utils.js integrates automatically** - Falls back if components not loaded
3. **Global instances** - Toast and Loading have singleton instances
4. **Data attributes** - Tooltips auto-initialize from `data-tooltip`
5. **CSS animations** - All animations are in `animations.css`
6. **Utilities** - Use utility classes from `utilities.css` for quick styling

---

## 📝 Examples

See individual HTML pages for real-world usage:
- `login.html` - Toast notifications
- `dashboard.html` - Loading spinner, tooltips
- `exams.html` - Modal dialogs
- `history.html` - Pagination
- `profile.html` - Tabs component
- `settings.html` - Dropdown menus

---

**Version:** 2.0.0  
**Last Updated:** November 10, 2025
