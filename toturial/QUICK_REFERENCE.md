# 📚 Quick Reference Guide

> Tài liệu tham khảo nhanh cho Quiz App

## 🚀 Quick Start

### Chạy ứng dụng

```bash
# Terminal 1 - Backend
npm run server:dev

# Terminal 2 - Frontend  
npm run dev
```

### Automated Setup

```bash
# Linux/Mac
chmod +x setup.sh
./setup.sh

# Windows
setup.bat
```

---

## 📦 NPM Commands

### Quản lý Dependencies

```bash
# Install tất cả dependencies
npm install

# Install một package
npm install package-name

# Install dev dependency
npm install -D package-name

# Remove package
npm uninstall package-name

# Update packages
npm update

# Check outdated packages
npm outdated

# Clear cache
npm cache clean --force
```

### Project Scripts

```bash
# Frontend
npm run dev          # Start dev server (port 3000)
npm run build        # Build for production
npm run preview      # Preview production build

# Backend
npm run server       # Start server (production)
npm run server:dev   # Start server with nodemon (dev)
```

---

## 🎨 Tailwind CSS Classes

### Layout

```jsx
// Container
<div className="container mx-auto px-4">

// Flex
<div className="flex items-center justify-center">
<div className="flex flex-col space-y-4">
<div className="flex-1">  // Take remaining space

// Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

### Spacing

```jsx
// Padding
p-4      // 16px all sides
px-4     // 16px left/right
py-4     // 16px top/bottom
pt-4     // 16px top

// Margin
m-4      // 16px all sides
mx-auto  // Center horizontally
my-4     // 16px top/bottom
-mt-4    // Negative margin top

// Gap
gap-4    // 16px gap
gap-x-4  // 16px horizontal gap
gap-y-4  // 16px vertical gap
```

### Typography

```jsx
// Size
text-xs    // 12px
text-sm    // 14px
text-base  // 16px
text-lg    // 18px
text-xl    // 20px
text-2xl   // 24px
text-3xl   // 30px
text-4xl   // 36px

// Weight
font-light      // 300
font-normal     // 400
font-medium     // 500
font-semibold   // 600
font-bold       // 700

// Color
text-neutral-900   // Dark text
text-neutral-600   // Secondary text
text-primary-500   // Primary color
```

### Colors

```jsx
// Background
bg-white
bg-primary-500
bg-neutral-50

// Text
text-primary-500
text-neutral-900

// Border
border-primary-500
border-neutral-300
```

### Border & Radius

```jsx
// Border
border           // 1px
border-2         // 2px
border-t-2       // Top only

// Radius
rounded          // 4px
rounded-lg       // 8px
rounded-xl       // 12px
rounded-2xl      // 16px
rounded-full     // Circle
```

### Shadow

```jsx
shadow-sm   // Small shadow
shadow-md   // Medium shadow
shadow-lg   // Large shadow
shadow-xl   // Extra large shadow
```

### Responsive Design

```jsx
// Mobile first
<div className="text-sm md:text-base lg:text-lg">

// Breakpoints
sm:  // 640px
md:  // 768px
lg:  // 1024px
xl:  // 1280px
2xl: // 1536px
```

### States

```jsx
// Hover
hover:bg-primary-600
hover:text-white

// Focus
focus:ring-2
focus:ring-primary-500
focus:outline-none

// Active
active:bg-primary-700

// Disabled
disabled:opacity-50
disabled:cursor-not-allowed
```

---

## ⚛️ React Patterns

### Component Structure

```jsx
import React, { useState, useEffect } from 'react';

export const MyComponent = ({ prop1, prop2 }) => {
  // 1. State
  const [state, setState] = useState(initialValue);
  
  // 2. Effects
  useEffect(() => {
    // Side effects
    return () => {
      // Cleanup
    };
  }, [dependencies]);
  
  // 3. Handlers
  const handleClick = () => {
    // Logic
  };
  
  // 4. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};
```

### State Management

```jsx
// Simple state
const [count, setCount] = useState(0);

// Object state
const [user, setUser] = useState({ name: '', email: '' });
setUser({ ...user, name: 'John' });

// Array state
const [items, setItems] = useState([]);
setItems([...items, newItem]);
setItems(items.filter(item => item.id !== id));
```

### useEffect Patterns

```jsx
// Run once on mount
useEffect(() => {
  fetchData();
}, []);

// Run when dependency changes
useEffect(() => {
  fetchData(id);
}, [id]);

// Cleanup
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  return () => clearInterval(timer);
}, []);
```

### Event Handlers

```jsx
// Click
<button onClick={handleClick}>Click</button>
<button onClick={() => handleClick(id)}>Click</button>

// Form
<input onChange={(e) => setValue(e.target.value)} />
<form onSubmit={handleSubmit}>

// Keyboard
<input onKeyDown={(e) => {
  if (e.key === 'Enter') handleSubmit();
}} />
```

### Conditional Rendering

```jsx
// If/Else
{condition ? <Component1 /> : <Component2 />}

// If only
{condition && <Component />}

// Multiple conditions
{loading ? (
  <Spinner />
) : error ? (
  <Error />
) : (
  <Data />
)}
```

### Lists

```jsx
{items.map((item) => (
  <div key={item.id}>
    {item.name}
  </div>
))}
```

---

## 🔌 API Calls

### Basic Patterns

```jsx
// GET request
const fetchData = async () => {
  try {
    const response = await api.get('/endpoint');
    setData(response.data.data);
  } catch (error) {
    console.error('Error:', error);
    toast.error('Failed to fetch data');
  }
};

// POST request
const createItem = async (data) => {
  try {
    const response = await api.post('/endpoint', data);
    toast.success('Created successfully');
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed');
    throw error;
  }
};

// PUT request
const updateItem = async (id, data) => {
  try {
    const response = await api.put(`/endpoint/${id}`, data);
    toast.success('Updated successfully');
    return response.data;
  } catch (error) {
    toast.error('Update failed');
    throw error;
  }
};

// DELETE request
const deleteItem = async (id) => {
  try {
    await api.delete(`/endpoint/${id}`);
    toast.success('Deleted successfully');
  } catch (error) {
    toast.error('Delete failed');
    throw error;
  }
};
```

### With Loading State

```jsx
const [loading, setLoading] = useState(false);
const [data, setData] = useState(null);
const [error, setError] = useState(null);

const fetchData = async () => {
  setLoading(true);
  setError(null);
  
  try {
    const response = await api.get('/endpoint');
    setData(response.data.data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

---

## 🗄️ MongoDB Queries

### Basic Operations

```javascript
// Find all
const users = await User.find();

// Find with filter
const user = await User.findOne({ email: 'test@example.com' });

// Find by ID
const user = await User.findById(userId);

// Create
const user = await User.create({
  username: 'john',
  email: 'john@example.com'
});

// Update
const user = await User.findByIdAndUpdate(
  userId,
  { $set: { name: 'John Doe' } },
  { new: true }
);

// Delete
await User.findByIdAndDelete(userId);
```

### Advanced Queries

```javascript
// Multiple conditions
const users = await User.find({
  age: { $gte: 18 },
  status: 'active'
});

// OR condition
const users = await User.find({
  $or: [
    { email: 'test@example.com' },
    { username: 'test' }
  ]
});

// Sort
const users = await User.find().sort({ createdAt: -1 });

// Limit & Skip
const users = await User.find()
  .limit(10)
  .skip(20);

// Select fields
const users = await User.find()
  .select('name email -_id');

// Populate
const exams = await Exam.find()
  .populate('userId', 'name email');
```

---

## 🛠️ Utility Functions

### Date/Time

```javascript
// Format date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('vi-VN');
};

// Format time
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Get relative time
const getRelativeTime = (date) => {
  const diff = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 60) return `${minutes} phút trước`;
  if (hours < 24) return `${hours} giờ trước`;
  return `${days} ngày trước`;
};
```

### Array Operations

```javascript
// Shuffle array
const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

// Remove duplicates
const unique = (array) => {
  return [...new Set(array)];
};

// Group by
const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    (result[item[key]] = result[item[key]] || []).push(item);
    return result;
  }, {});
};
```

### String Operations

```javascript
// Truncate
const truncate = (str, length) => {
  return str.length > length 
    ? str.slice(0, length) + '...' 
    : str;
};

// Capitalize
const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Slugify
const slugify = (str) => {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
};
```

### Number Operations

```javascript
// Format number
const formatNumber = (num) => {
  return new Intl.NumberFormat('vi-VN').format(num);
};

// Calculate percentage
const percentage = (value, total) => {
  return Math.round((value / total) * 100);
};

// Clamp number
const clamp = (num, min, max) => {
  return Math.min(Math.max(num, min), max);
};
```

---

## 🔒 Authentication

### Login Flow

```jsx
const handleLogin = async (credentials) => {
  try {
    // 1. Call API
    const response = await authService.login(credentials);
    
    // 2. Store token
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    
    // 3. Redirect
    navigate('/dashboard');
    
    // 4. Show success
    toast.success('Login successful!');
  } catch (error) {
    toast.error(error.response?.data?.message || 'Login failed');
  }
};
```

### Protected Route

```jsx
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Usage
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  } 
/>
```

### Axios Interceptor

```javascript
// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

---

## 🐛 Debugging

### Console Methods

```javascript
// Basic logging
console.log('Value:', value);
console.error('Error:', error);
console.warn('Warning:', warning);
console.info('Info:', info);

// Table
console.table(users);

// Group
console.group('API Call');
console.log('Request:', request);
console.log('Response:', response);
console.groupEnd();

// Time
console.time('operation');
// ... code ...
console.timeEnd('operation');
```

### React DevTools

```bash
# Install extension
Chrome/Edge: React Developer Tools
Firefox: React Developer Tools

# Usage
- Components tab: View component tree
- Profiler tab: Performance analysis
- Right-click component: Inspect props/state
```

### Network Debugging

```javascript
// Log all requests
api.interceptors.request.use((config) => {
  console.log('→', config.method.toUpperCase(), config.url);
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log('←', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.log('✗', error.response?.status, error.config.url);
    return Promise.reject(error);
  }
);
```

---

## 📝 Git Commands

### Basic Workflow

```bash
# Check status
git status

# Add files
git add .
git add file.js

# Commit
git commit -m "feat: add login page"

# Push
git push origin main

# Pull
git pull origin main
```

### Branch Management

```bash
# Create branch
git branch feature/quiz-ui
git checkout -b feature/quiz-ui

# Switch branch
git checkout main

# Merge branch
git checkout main
git merge feature/quiz-ui

# Delete branch
git branch -d feature/quiz-ui
```

### Useful Commands

```bash
# View history
git log --oneline

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo changes to file
git checkout -- file.js

# Stash changes
git stash
git stash pop

# View diff
git diff
```

---

## 🎯 VSCode Shortcuts

### General

```
Ctrl/Cmd + P       - Quick file open
Ctrl/Cmd + Shift + P - Command palette
Ctrl/Cmd + B       - Toggle sidebar
Ctrl/Cmd + J       - Toggle terminal
Ctrl/Cmd + `       - Toggle terminal
```

### Editing

```
Alt + Up/Down      - Move line up/down
Shift + Alt + Up/Down - Copy line up/down
Ctrl/Cmd + D       - Select next occurrence
Ctrl/Cmd + /       - Toggle comment
Ctrl/Cmd + Shift + K - Delete line
```

### Search

```
Ctrl/Cmd + F       - Find
Ctrl/Cmd + H       - Replace
Ctrl/Cmd + Shift + F - Find in files
```

### Navigation

```
Ctrl/Cmd + G       - Go to line
Ctrl/Cmd + P       - Go to file
F12                - Go to definition
Alt + Left/Right   - Navigate back/forward
```

---

## 📚 Resources

### Documentation

- **React**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **MongoDB**: https://docs.mongodb.com
- **Express**: https://expressjs.com
- **Mongoose**: https://mongoosejs.com

### Learning

- **React Tutorial**: https://react.dev/learn
- **Tailwind Tutorial**: https://tailwindcss.com/docs/installation
- **Node.js Guide**: https://nodejs.org/en/docs/guides

### Tools

- **Can I Use**: https://caniuse.com
- **Regex Tester**: https://regex101.com
- **JSON Formatter**: https://jsonformatter.org
- **Color Picker**: https://coolors.co

---

<div align="center">

**📖 For detailed setup instructions, see [GETTING_STARTED.md](./GETTING_STARTED.md)**

**🎨 For design system documentation, see [CLAUDE.md](./CLAUDE.md)**

</div>
