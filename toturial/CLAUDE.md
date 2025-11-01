# Design System Rules - Quiz App CNTT

> **Comprehensive Design System Documentation for Figma Integration**  
> Last Updated: 2025-11-02

## 📋 Table of Contents

1. [Current Codebase Analysis](#current-codebase-analysis)
2. [Design System Structure](#design-system-structure)
3. [Token Definitions](#token-definitions)
4. [Component Library](#component-library)
5. [Frameworks & Libraries](#frameworks--libraries)
6. [Asset Management](#asset-management)
7. [Icon System](#icon-system)
8. [Styling Approach](#styling-approach)
9. [Project Structure](#project-structure)
10. [Figma Integration Guidelines](#figma-integration-guidelines)

---

## Current Codebase Analysis

### 🔍 Current State (as of 2025-11-02)

**What Exists:**
- ✅ MongoDB database schema (7 collections)
- ✅ Sample data structure
- ✅ Backend architecture planning (Node.js/Express)
- ✅ API endpoint documentation
- ✅ Business logic definitions

**What Needs Implementation:**
- ⏳ Frontend UI components
- ⏳ Design system tokens
- ⏳ Styling framework
- ⏳ Component library
- ⏳ Asset management system

### 📊 Project Stack (Planned)

```javascript
{
  backend: "Node.js/Express",
  database: "MongoDB Atlas",
  frontend: "React (recommended)" || "Vue" || "Vanilla JS",
  styling: "TBD - See recommendations below"
}
```

---

## Design System Structure

### Recommended Tech Stack for Figma Integration

Based on your project requirements and modern best practices:

```javascript
// Recommended setup for optimal Figma integration
const techStack = {
  // Frontend Framework
  framework: "React 18+",
  
  // Styling System
  styling: {
    primary: "Tailwind CSS v3.4+",
    components: "shadcn/ui",
    icons: "Lucide React",
    animations: "Framer Motion"
  },
  
  // Build Tools
  build: {
    bundler: "Vite",
    language: "TypeScript (optional but recommended)"
  },
  
  // Design Tokens
  tokens: {
    format: "CSS Custom Properties",
    storage: "tailwind.config.js + CSS variables"
  }
}
```

### Why This Stack?

1. **Tailwind CSS**: Perfect for Figma-to-code workflow
   - Utility-first approach matches Figma's design properties
   - Easy to map Figma tokens to Tailwind classes
   - Rapid prototyping

2. **shadcn/ui**: Pre-built accessible components
   - Copy-paste components (own your code)
   - Built with Radix UI primitives
   - Fully customizable

3. **Lucide React**: Modern icon system
   - 1000+ consistent icons
   - SVG-based, tree-shakeable
   - Easy to customize

---

## Token Definitions

### 1. Color Tokens

Create `src/styles/tokens/colors.css`:

```css
/* colors.css - Design Tokens from Figma */
:root {
  /* Primary Colors - Brand */
  --color-primary-50: #f0f9ff;
  --color-primary-100: #e0f2fe;
  --color-primary-200: #bae6fd;
  --color-primary-300: #7dd3fc;
  --color-primary-400: #38bdf8;
  --color-primary-500: #0ea5e9; /* Main brand color */
  --color-primary-600: #0284c7;
  --color-primary-700: #0369a1;
  --color-primary-800: #075985;
  --color-primary-900: #0c4a6e;

  /* Secondary Colors - Accent */
  --color-secondary-50: #faf5ff;
  --color-secondary-100: #f3e8ff;
  --color-secondary-200: #e9d5ff;
  --color-secondary-300: #d8b4fe;
  --color-secondary-400: #c084fc;
  --color-secondary-500: #a855f7;
  --color-secondary-600: #9333ea;
  --color-secondary-700: #7e22ce;
  --color-secondary-800: #6b21a8;
  --color-secondary-900: #581c87;

  /* Neutral Colors - UI Elements */
  --color-neutral-0: #ffffff;
  --color-neutral-50: #fafafa;
  --color-neutral-100: #f5f5f5;
  --color-neutral-200: #e5e5e5;
  --color-neutral-300: #d4d4d4;
  --color-neutral-400: #a3a3a3;
  --color-neutral-500: #737373;
  --color-neutral-600: #525252;
  --color-neutral-700: #404040;
  --color-neutral-800: #262626;
  --color-neutral-900: #171717;
  --color-neutral-950: #0a0a0a;

  /* Semantic Colors */
  --color-success: #22c55e;
  --color-success-light: #86efac;
  --color-success-dark: #16a34a;
  
  --color-error: #ef4444;
  --color-error-light: #fca5a5;
  --color-error-dark: #dc2626;
  
  --color-warning: #f59e0b;
  --color-warning-light: #fcd34d;
  --color-warning-dark: #d97706;
  
  --color-info: #3b82f6;
  --color-info-light: #93c5fd;
  --color-info-dark: #2563eb;

  /* Background Colors */
  --bg-primary: var(--color-neutral-0);
  --bg-secondary: var(--color-neutral-50);
  --bg-tertiary: var(--color-neutral-100);
  --bg-dark: var(--color-neutral-900);

  /* Text Colors */
  --text-primary: var(--color-neutral-900);
  --text-secondary: var(--color-neutral-600);
  --text-tertiary: var(--color-neutral-400);
  --text-inverse: var(--color-neutral-0);
}

/* Dark Mode */
[data-theme="dark"] {
  --bg-primary: var(--color-neutral-900);
  --bg-secondary: var(--color-neutral-800);
  --bg-tertiary: var(--color-neutral-700);
  
  --text-primary: var(--color-neutral-0);
  --text-secondary: var(--color-neutral-300);
  --text-tertiary: var(--color-neutral-500);
}
```

### 2. Typography Tokens

Create `src/styles/tokens/typography.css`:

```css
/* typography.css - Typography Design Tokens */
:root {
  /* Font Families */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;

  /* Font Sizes */
  --text-xs: 0.75rem;     /* 12px */
  --text-sm: 0.875rem;    /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg: 1.125rem;    /* 18px */
  --text-xl: 1.25rem;     /* 20px */
  --text-2xl: 1.5rem;     /* 24px */
  --text-3xl: 1.875rem;   /* 30px */
  --text-4xl: 2.25rem;    /* 36px */
  --text-5xl: 3rem;       /* 48px */

  /* Font Weights */
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  /* Line Heights */
  --leading-none: 1;
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
  --leading-loose: 2;

  /* Letter Spacing */
  --tracking-tighter: -0.05em;
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
}
```

### 3. Spacing Tokens

Create `src/styles/tokens/spacing.css`:

```css
/* spacing.css - Spacing Design Tokens */
:root {
  /* Base spacing unit: 4px */
  --space-0: 0;
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */

  /* Border Radius */
  --radius-none: 0;
  --radius-sm: 0.125rem;   /* 2px */
  --radius-base: 0.25rem;  /* 4px */
  --radius-md: 0.375rem;   /* 6px */
  --radius-lg: 0.5rem;     /* 8px */
  --radius-xl: 0.75rem;    /* 12px */
  --radius-2xl: 1rem;      /* 16px */
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-base: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);

  /* Z-Index */
  --z-0: 0;
  --z-10: 10;
  --z-20: 20;
  --z-30: 30;
  --z-40: 40;
  --z-50: 50;
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
}
```

### 4. Tailwind Configuration

Create `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
        },
        secondary: {
          50: 'var(--color-secondary-50)',
          100: 'var(--color-secondary-100)',
          200: 'var(--color-secondary-200)',
          300: 'var(--color-secondary-300)',
          400: 'var(--color-secondary-400)',
          500: 'var(--color-secondary-500)',
          600: 'var(--color-secondary-600)',
          700: 'var(--color-secondary-700)',
          800: 'var(--color-secondary-800)',
          900: 'var(--color-secondary-900)',
        },
        success: 'var(--color-success)',
        error: 'var(--color-error)',
        warning: 'var(--color-warning)',
        info: 'var(--color-info)',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
      },
      borderRadius: {
        'none': 'var(--radius-none)',
        'sm': 'var(--radius-sm)',
        'base': 'var(--radius-base)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        'full': 'var(--radius-full)',
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'base': 'var(--shadow-base)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
```

---

## Component Library

### Recommended Component Structure

```
src/
├── components/
│   ├── ui/              # Base UI components (shadcn/ui)
│   │   ├── button.jsx
│   │   ├── card.jsx
│   │   ├── input.jsx
│   │   ├── modal.jsx
│   │   └── ...
│   ├── quiz/            # Quiz-specific components
│   │   ├── QuestionCard.jsx
│   │   ├── AnswerOption.jsx
│   │   ├── Timer.jsx
│   │   ├── ScoreDisplay.jsx
│   │   └── ProgressBar.jsx
│   ├── auth/            # Authentication components
│   │   ├── LoginForm.jsx
│   │   ├── RegisterForm.jsx
│   │   └── ProfileCard.jsx
│   ├── dashboard/       # Dashboard components
│   │   ├── StatsCard.jsx
│   │   ├── SubjectCard.jsx
│   │   ├── RecentExams.jsx
│   │   └── ProgressChart.jsx
│   ├── settings/        # Settings components
│   │   ├── SettingsPanel.jsx
│   │   ├── AvatarSelector.jsx
│   │   └── PreferencesForm.jsx
│   └── layout/          # Layout components
│       ├── Header.jsx
│       ├── Sidebar.jsx
│       ├── Footer.jsx
│       └── Container.jsx
```

### Component Examples

#### 1. Button Component

`src/components/ui/button.jsx`:

```jsx
import React from 'react';
import { cn } from '@/lib/utils';

const buttonVariants = {
  variant: {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white',
    secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white',
    success: 'bg-green-500 hover:bg-green-600 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50',
    ghost: 'hover:bg-neutral-100 text-neutral-700',
  },
  size: {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  },
};

export const Button = React.forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center',
        'rounded-lg font-medium',
        'transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        buttonVariants.variant[variant],
        buttonVariants.size[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';
```

#### 2. Card Component

`src/components/ui/card.jsx`:

```jsx
import React from 'react';
import { cn } from '@/lib/utils';

export const Card = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        'bg-white rounded-xl shadow-md',
        'border border-neutral-200',
        'overflow-hidden',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className, ...props }) => {
  return (
    <div
      className={cn('px-6 py-4 border-b border-neutral-200', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className, ...props }) => {
  return (
    <h3
      className={cn('text-xl font-semibold text-neutral-900', className)}
      {...props}
    >
      {children}
    </h3>
  );
};

export const CardContent = ({ children, className, ...props }) => {
  return (
    <div className={cn('px-6 py-4', className)} {...props}>
      {children}
    </div>
  );
};

export const CardFooter = ({ children, className, ...props }) => {
  return (
    <div
      className={cn('px-6 py-4 bg-neutral-50 border-t border-neutral-200', className)}
      {...props}
    >
      {children}
    </div>
  );
};
```

#### 3. Quiz-Specific Components

`src/components/quiz/QuestionCard.jsx`:

```jsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AnswerOption } from './AnswerOption';
import { Timer } from './Timer';

export const QuestionCard = ({
  question,
  currentQuestion,
  totalQuestions,
  onAnswerSelect,
  selectedAnswer,
  showTimer,
  timeLimit,
}) => {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          Câu {currentQuestion}/{totalQuestions}
        </CardTitle>
        {showTimer && <Timer timeLimit={timeLimit} />}
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Question Content */}
        <div className="text-lg font-medium text-neutral-900">
          {question.content}
        </div>

        {/* Answer Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <AnswerOption
              key={index}
              option={option}
              index={index}
              isSelected={selectedAnswer === option.text}
              onSelect={() => onAnswerSelect(option.text)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
```

`src/components/quiz/AnswerOption.jsx`:

```jsx
import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export const AnswerOption = ({ option, index, isSelected, onSelect }) => {
  const labels = ['A', 'B', 'C', 'D'];
  
  return (
    <button
      onClick={onSelect}
      className={cn(
        'w-full text-left p-4 rounded-lg',
        'border-2 transition-all duration-200',
        'hover:border-primary-500 hover:bg-primary-50',
        isSelected
          ? 'border-primary-500 bg-primary-50'
          : 'border-neutral-200 bg-white'
      )}
    >
      <div className="flex items-center gap-3">
        {/* Option Label */}
        <div
          className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center',
            'font-semibold text-sm',
            isSelected
              ? 'bg-primary-500 text-white'
              : 'bg-neutral-100 text-neutral-600'
          )}
        >
          {labels[index]}
        </div>

        {/* Option Text */}
        <span className="flex-1 text-base text-neutral-900">
          {option.text}
        </span>

        {/* Selected Indicator */}
        {isSelected && (
          <Check className="w-5 h-5 text-primary-500" />
        )}
      </div>
    </button>
  );
};
```

`src/components/quiz/Timer.jsx`:

```jsx
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Timer = ({ timeLimit, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const isLowTime = timeLeft <= 10;

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className={cn(
        'flex items-center gap-2 px-4 py-2 rounded-lg',
        'font-mono font-semibold',
        isLowTime
          ? 'bg-red-100 text-red-600 animate-pulse'
          : 'bg-neutral-100 text-neutral-700'
      )}
    >
      <Clock className="w-4 h-4" />
      <span>{formatTime(timeLeft)}</span>
    </div>
  );
};
```

---

## Frameworks & Libraries

### Complete Package Setup

`package.json`:

```json
{
  "name": "tracnghiemluyenthi",
  "version": "1.0.0",
  "description": "Quiz App for IT Knowledge",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "server": "node server/index.js",
    "server:dev": "nodemon server/index.js"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "mongodb": "^6.20.0",
    "express": "^4.18.2",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "dotenv": "^16.3.1",
    "cors": "^2.8.5",
    "axios": "^1.6.2",
    "lucide-react": "^0.300.0",
    "framer-motion": "^10.16.16",
    "zustand": "^4.4.7",
    "react-hot-toast": "^2.4.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.0.8",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.32",
    "autoprefixer": "^10.4.16",
    "@tailwindcss/forms": "^0.5.7",
    "@tailwindcss/typography": "^0.5.10",
    "nodemon": "^3.0.2"
  }
}
```

### Vite Configuration

`vite.config.js`:

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
```

---

## Asset Management

### Directory Structure

```
public/
├── assets/
│   ├── images/
│   │   ├── avatars/      # User avatars
│   │   │   ├── avatar1.png
│   │   │   ├── avatar2.png
│   │   │   └── ...
│   │   ├── subjects/     # Subject icons
│   │   │   ├── ctdl.svg
│   │   │   ├── mmt.svg
│   │   │   └── ...
│   │   ├── badges/       # Achievement badges
│   │   │   ├── first-quiz.svg
│   │   │   ├── streak-5.svg
│   │   │   └── ...
│   │   └── illustrations/ # Decorative images
│   │       ├── empty-state.svg
│   │       ├── success.svg
│   │       └── ...
│   ├── audio/
│   │   ├── correct.mp3
│   │   ├── incorrect.mp3
│   │   ├── background-music.mp3
│   │   └── timer-tick.mp3
│   └── fonts/
│       ├── Inter/
│       └── JetBrains-Mono/
```

### Asset Loading Utility

`src/lib/assets.js`:

```javascript
/**
 * Asset path helpers
 */
export const ASSETS = {
  // Images
  images: {
    avatar: (name) => `/assets/images/avatars/${name}`,
    subject: (code) => `/assets/images/subjects/${code}.svg`,
    badge: (name) => `/assets/images/badges/${name}.svg`,
    illustration: (name) => `/assets/images/illustrations/${name}.svg`,
  },
  
  // Audio
  audio: {
    correct: '/assets/audio/correct.mp3',
    incorrect: '/assets/audio/incorrect.mp3',
    backgroundMusic: '/assets/audio/background-music.mp3',
    timerTick: '/assets/audio/timer-tick.mp3',
  },
};

/**
 * Preload critical assets
 */
export const preloadAssets = async (assetUrls) => {
  const promises = assetUrls.map((url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = reject;
      img.src = url;
    });
  });

  try {
    await Promise.all(promises);
  } catch (error) {
    console.error('Failed to preload assets:', error);
  }
};

/**
 * Play audio with settings check
 */
export const playAudio = (audioUrl, volume = 1.0) => {
  const audio = new Audio(audioUrl);
  audio.volume = volume;
  audio.play().catch((error) => {
    console.error('Failed to play audio:', error);
  });
};
```

### Image Optimization

```javascript
// src/components/ui/OptimizedImage.jsx
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export const OptimizedImage = ({
  src,
  alt,
  fallback = '/assets/images/placeholder.svg',
  className,
  ...props
}) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {loading && (
        <div className="absolute inset-0 bg-neutral-200 animate-pulse" />
      )}
      <img
        src={error ? fallback : src}
        alt={alt}
        onLoad={() => setLoading(false)}
        onError={() => {
          setError(true);
          setLoading(false);
        }}
        className={cn(
          'w-full h-full object-cover',
          loading && 'opacity-0'
        )}
        {...props}
      />
    </div>
  );
};
```

---

## Icon System

### Using Lucide React Icons

```jsx
// Example: Icon usage in components
import {
  User,
  Settings,
  Book,
  Trophy,
  Clock,
  Check,
  X,
  PlayCircle,
  PauseCircle,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Home,
  LogOut,
  Star,
  Award,
  TrendingUp,
  Calendar,
  BarChart,
  PieChart,
} from 'lucide-react';

// Icon wrapper component for consistent sizing
const Icon = ({ icon: IconComponent, size = 'md', className, ...props }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  };

  return (
    <IconComponent
      className={cn(sizes[size], className)}
      {...props}
    />
  );
};

// Usage
<Icon icon={User} size="lg" className="text-primary-500" />
```

### Subject Icons Mapping

```javascript
// src/constants/subjects.js
import { Book, Network, Database, Code } from 'lucide-react';

export const SUBJECT_ICONS = {
  CTDL: Code,        // Cấu trúc dữ liệu
  MMT: Network,      // Mạng máy tính
  CSDL: Database,    // Cơ sở dữ liệu
  OOP: Code,         // Lập trình hướng đối tượng
};

// Usage in component
const SubjectIcon = ({ subjectCode }) => {
  const IconComponent = SUBJECT_ICONS[subjectCode] || Book;
  return <IconComponent className="w-6 h-6" />;
};
```

---

## Styling Approach

### CSS Architecture

```
src/
├── styles/
│   ├── tokens/           # Design tokens
│   │   ├── colors.css
│   │   ├── typography.css
│   │   └── spacing.css
│   ├── global.css        # Global styles
│   ├── animations.css    # Custom animations
│   └── utilities.css     # Custom utilities
```

### Global Styles

`src/styles/global.css`:

```css
/* Import Tailwind */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Import Design Tokens */
@import './tokens/colors.css';
@import './tokens/typography.css';
@import './tokens/spacing.css';
@import './animations.css';

/* Base Styles */
@layer base {
  * {
    @apply border-border;
  }
  
  html {
    @apply scroll-smooth;
  }
  
  body {
    @apply bg-bg-primary text-text-primary;
    @apply font-sans antialiased;
  }

  /* Remove default focus outline */
  *:focus {
    outline: none;
  }

  /* Custom focus styles */
  *:focus-visible {
    @apply outline-none ring-2 ring-primary-500 ring-offset-2;
  }
}

/* Component Layer */
@layer components {
  /* Container */
  .container {
    @apply mx-auto px-4 sm:px-6 lg:px-8;
    max-width: 1280px;
  }

  /* Page Section */
  .section {
    @apply py-12 md:py-16 lg:py-20;
  }

  /* Form Input Base */
  .input-base {
    @apply w-full px-4 py-2 rounded-lg;
    @apply border-2 border-neutral-300;
    @apply focus:border-primary-500 focus:ring-2 focus:ring-primary-200;
    @apply transition-all duration-200;
  }

  /* Disabled State */
  .disabled {
    @apply opacity-50 cursor-not-allowed;
  }
}

/* Utilities Layer */
@layer utilities {
  /* Hide scrollbar */
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  /* Gradient text */
  .gradient-text {
    @apply bg-clip-text text-transparent;
    background-image: linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500));
  }

  /* Glass effect */
  .glass {
    @apply backdrop-blur-md bg-white/80 border border-white/20;
  }

  /* Card hover effect */
  .card-hover {
    @apply transition-all duration-300;
    @apply hover:shadow-lg hover:-translate-y-1;
  }
}
```

### Custom Animations

`src/styles/animations.css`:

```css
/* Custom animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Animation classes */
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

.animate-slide-in-right {
  animation: slideInRight 0.3s ease-out;
}

.animate-bounce {
  animation: bounce 1s infinite;
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-spin {
  animation: spin 1s linear infinite;
}
```

---

## Project Structure

### Recommended Frontend Structure

```
tracnghiemluyenthi/
├── public/                    # Static assets
│   ├── assets/
│   │   ├── images/
│   │   ├── audio/
│   │   └── fonts/
│   └── index.html
│
├── src/                       # Source code
│   ├── components/            # React components
│   │   ├── ui/               # Base UI components
│   │   ├── quiz/             # Quiz components
│   │   ├── auth/             # Auth components
│   │   ├── dashboard/        # Dashboard components
│   │   ├── settings/         # Settings components
│   │   └── layout/           # Layout components
│   │
│   ├── pages/                 # Page components
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── QuizPage.jsx
│   │   ├── ResultsPage.jsx
│   │   ├── SettingsPage.jsx
│   │   └── ProfilePage.jsx
│   │
│   ├── hooks/                 # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useQuiz.js
│   │   ├── useTimer.js
│   │   ├── useAudio.js
│   │   └── useLocalStorage.js
│   │
│   ├── store/                 # State management (Zustand)
│   │   ├── authStore.js
│   │   ├── quizStore.js
│   │   └── settingsStore.js
│   │
│   ├── services/              # API services
│   │   ├── api.js            # Axios instance
│   │   ├── auth.service.js
│   │   ├── quiz.service.js
│   │   ├── user.service.js
│   │   └── subject.service.js
│   │
│   ├── lib/                   # Utilities
│   │   ├── utils.js          # Helper functions
│   │   ├── assets.js         # Asset helpers
│   │   └── validation.js     # Form validation
│   │
│   ├── constants/             # Constants
│   │   ├── routes.js
│   │   ├── subjects.js
│   │   └── config.js
│   │
│   ├── styles/                # Styles
│   │   ├── tokens/
│   │   ├── global.css
│   │   ├── animations.css
│   │   └── utilities.css
│   │
│   ├── App.jsx                # Root component
│   └── main.jsx               # Entry point
│
├── server/                    # Backend (Node.js/Express)
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Subject.js
│   │   ├── Question.js
│   │   └── Exam.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── subject.routes.js
│   │   ├── question.routes.js
│   │   └── exam.routes.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── subject.controller.js
│   │   ├── question.controller.js
│   │   └── exam.controller.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   ├── utils/
│   │   └── helpers.js
│   └── index.js
│
├── .env                       # Environment variables
├── .gitignore
├── package.json
├── tailwind.config.js
├── vite.config.js
├── postcss.config.js
└── README.md
```

---

## Figma Integration Guidelines

### 1. Figma File Organization

Recommended Figma file structure:

```
Quiz App Design System
├── 📱 Cover
├── 🎨 Design Tokens
│   ├── Colors
│   ├── Typography
│   ├── Spacing
│   ├── Shadows
│   └── Border Radius
├── 🧩 Components
│   ├── Buttons
│   ├── Inputs
│   ├── Cards
│   ├── Modals
│   └── Icons
├── 📄 Pages
│   ├── Auth
│   │   ├── Login
│   │   └── Register
│   ├── Dashboard
│   ├── Quiz
│   │   ├── Question View
│   │   ├── Results
│   │   └── Review
│   ├── Settings
│   └── Profile
└── 📱 Mobile Views
```

### 2. Naming Conventions

#### Components
```
Format: ComponentName/Variant/State

Examples:
- Button/Primary/Default
- Button/Primary/Hover
- Button/Primary/Disabled
- Card/QuestionCard/Empty
- Input/Text/Error
```

#### Layers
```
Format: element-name-purpose

Examples:
- button-primary
- text-heading
- icon-close
- container-content
- bg-overlay
```

### 3. Design Tokens in Figma

#### Colors
- Use Figma Variables for colors
- Match variable names with CSS custom properties
- Example: `Primary/500` → `--color-primary-500`

#### Typography
- Create Text Styles matching your CSS
- Name format: `Size/Weight` (e.g., `16/Medium`)
- Apply line-height and letter-spacing

#### Effects
- Create Effect Styles for shadows
- Name format: `Shadow/Size` (e.g., `Shadow/MD`)

### 4. Exporting from Figma

#### SVG Icons
```
Settings:
- Format: SVG
- Simplify stroke: On
- Include "id" attribute: Off
- Outline text: On
```

#### Images
```
Settings:
- Format: PNG or WebP
- Resolution: 2x for retina displays
- Optimize: On
```

#### Design Specs
Use Figma's Dev Mode to:
- Generate CSS code
- Copy design tokens
- Measure spacing
- Export assets

### 5. Figma to Code Workflow

#### Step 1: Inspect in Dev Mode
```
1. Select component in Figma
2. Switch to Dev Mode
3. Copy CSS or React code
4. Adjust for your framework
```

#### Step 2: Map to Tailwind Classes
```
Figma Property → Tailwind Class

Background: #0EA5E9 → bg-primary-500
Font Size: 16px → text-base
Padding: 16px → p-4
Border Radius: 8px → rounded-lg
```

#### Step 3: Create Component
```jsx
// From Figma component
const QuestionCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {/* Component content */}
    </div>
  );
};
```

### 6. Responsive Design

#### Breakpoints (match Tailwind defaults)
```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

#### Figma Frames
```
Mobile: 375px
Tablet: 768px
Desktop: 1440px
```

### 7. Component States

Document all states in Figma:
```
- Default
- Hover
- Focus
- Active
- Disabled
- Loading
- Error
- Success
```

### 8. Auto Layout Best Practices

```
✅ Use Auto Layout for:
- Buttons
- Cards
- Lists
- Navigation
- Forms

✅ Set constraints:
- Horizontal: Left & Right (for full width)
- Vertical: Top (for consistent spacing)

✅ Use padding and gap consistently:
- Padding: 16px (matches p-4)
- Gap: 8px, 16px, 24px
```

### 9. Plugins for Design-to-Code

Recommended Figma plugins:
```
1. Anima - Export React/Vue code
2. Figma to Code - Generate clean code
3. Tailwind CSS - Generate Tailwind classes
4. Content Reel - Fill with realistic data
5. Stark - Accessibility checking
```

### 10. Version Control

```
- Create versions for major design changes
- Name format: v1.0 - Feature Name
- Document changes in version description
- Share links with team
```

---

## Utility Functions

### cn() - Class Name Helper

`src/lib/utils.js`:

```javascript
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind classes with clsx
 * Handles conditional classes and conflicts
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Format date
 */
export function formatDate(date, format = 'DD/MM/YYYY') {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();

  const formats = {
    'DD/MM/YYYY': `${day}/${month}/${year}`,
    'MM/DD/YYYY': `${month}/${day}/${year}`,
    'YYYY-MM-DD': `${year}-${month}-${day}`,
  };

  return formats[format] || formats['DD/MM/YYYY'];
}

/**
 * Calculate percentage
 */
export function calculatePercentage(correct, total) {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}

/**
 * Format time (seconds to MM:SS)
 */
export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Shuffle array
 */
export function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/**
 * Debounce function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
```

---

## Quick Reference

### Common Tailwind Patterns

```jsx
// Card
<div className="bg-white rounded-xl shadow-md p-6">

// Button Primary
<button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg">

// Input
<input className="w-full px-4 py-2 border-2 border-neutral-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200">

// Grid Layout
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Flex Center
<div className="flex items-center justify-center">

// Container
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
```

### Color Usage Guidelines

```jsx
// Primary - Main actions, links
className="text-primary-500"
className="bg-primary-500"

// Secondary - Less important actions
className="text-secondary-500"
className="bg-secondary-500"

// Success - Correct answers, success states
className="text-green-500"
className="bg-green-500"

// Error - Wrong answers, errors
className="text-red-500"
className="bg-red-500"

// Warning - Warnings, time running out
className="text-yellow-500"
className="bg-yellow-500"

// Neutral - Text, borders, backgrounds
className="text-neutral-700"
className="border-neutral-300"
```

---

## Checklist for Figma Integration

### Before Starting

- [ ] Install Figma desktop app or use web version
- [ ] Install recommended Figma plugins
- [ ] Set up Figma file with design tokens
- [ ] Create component library in Figma
- [ ] Document component states

### During Development

- [ ] Use Dev Mode to inspect components
- [ ] Copy design tokens to code
- [ ] Match Figma components to React components
- [ ] Test responsive behavior
- [ ] Check accessibility (colors, contrast, focus states)

### After Implementation

- [ ] Compare Figma design with implementation
- [ ] Test all component states
- [ ] Verify animations and transitions
- [ ] Test on different devices/browsers
- [ ] Document any deviations from design

---

## Additional Resources

### Documentation Links

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Docs](https://react.dev)
- [Lucide Icons](https://lucide.dev)
- [Framer Motion](https://www.framer.com/motion/)
- [shadcn/ui](https://ui.shadcn.com)

### Learning Resources

- [Tailwind CSS Best Practices](https://tailwindcss.com/docs/reusing-styles)
- [React Component Patterns](https://react.dev/learn/thinking-in-react)
- [Figma to Code Workflow](https://www.figma.com/community/file/928108847914589057)

---

**Last Updated**: 2025-11-02  
**Maintained By**: Development Team  
**Version**: 1.0.0
