# 🚀 Getting Started Guide - Quiz App CNTT

> **Hướng dẫn Setup Dự án từ đầu**  
> Làm theo từng bước để có một ứng dụng hoàn chỉnh!

## 📋 Mục lục

1. [Prerequisites](#prerequisites)
2. [Bước 1: Setup Môi Trường](#bước-1-setup-môi-trường)
3. [Bước 2: Tạo Project Structure](#bước-2-tạo-project-structure)
4. [Bước 3: Setup Backend](#bước-3-setup-backend)
5. [Bước 4: Setup Frontend](#bước-4-setup-frontend)
6. [Bước 5: Setup Figma](#bước-5-setup-figma)
7. [Bước 6: Run Application](#bước-6-run-application)
8. [Bước 7: Development Workflow](#bước-7-development-workflow)
9. [Troubleshooting](#troubleshooting)
10. [Next Steps](#next-steps)

---

## Prerequisites

### Yêu cầu hệ thống

Đảm bảo bạn đã cài đặt các công cụ sau:

```bash
# 1. Node.js (v18.0.0 trở lên)
node --version  # v18.0.0+

# 2. npm hoặc yarn
npm --version   # 9.0.0+
# hoặc
yarn --version  # 1.22.0+

# 3. Git
git --version   # 2.0.0+

# 4. Code Editor (VS Code khuyến nghị)
code --version
```

### Cài đặt Node.js

**Windows/Mac:**
- Download từ [nodejs.org](https://nodejs.org/)
- Chọn LTS version
- Chạy installer

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### VS Code Extensions (Khuyến nghị)

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "dsznajder.es7-react-js-snippets",
    "mongodb.mongodb-vscode",
    "figma.figma-vscode-extension"
  ]
}
```

---

## Bước 1: Setup Môi Trường

### 1.1. Clone hoặc Tạo Repository

```bash
# Option 1: Clone existing repo
git clone https://github.com/your-username/tracnghiemluyenthi.git
cd tracnghiemluyenthi

# Option 2: Tạo mới từ đầu
mkdir tracnghiemluyenthi
cd tracnghiemluyenthi
git init
```

### 1.2. Tạo .gitignore

```bash
# Tạo file .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
/.pnp
.pnp.js

# Testing
/coverage

# Production
/build
/dist

# Environment Variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
*.log

# Editor directories
.vscode/*
!.vscode/settings.json
!.vscode/extensions.json
.idea
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Misc
.eslintcache
.cache
EOF
```

### 1.3. Setup MongoDB Atlas

1. **Tạo tài khoản MongoDB Atlas**
   - Truy cập [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Đăng ký tài khoản miễn phí

2. **Tạo Cluster**
   ```
   - Click "Build a Database"
   - Chọn "FREE" shared cluster
   - Chọn region gần nhất (Singapore cho VN)
   - Cluster Name: quizapp
   - Click "Create"
   ```

3. **Setup Database Access**
   ```
   - Database Access → Add New Database User
   - Username: quizapp_user
   - Password: Tạo strong password (save lại!)
   - Database User Privileges: Read and write to any database
   - Add User
   ```

4. **Setup Network Access**
   ```
   - Network Access → Add IP Address
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - (Trong production, chỉ cho phép IP cụ thể)
   - Confirm
   ```

5. **Lấy Connection String**
   ```
   - Database → Connect
   - Connect your application
   - Copy connection string
   - Format: mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/
   ```

---

## Bước 2: Tạo Project Structure

### 2.1. Tạo Folder Structure

```bash
# Tạo toàn bộ structure
mkdir -p {public/assets/{images/{avatars,subjects,badges,illustrations},audio,fonts},src/{components/{ui,quiz,auth,dashboard,settings,layout},pages,hooks,store,services,lib,constants,styles/{tokens}},server/{config,models,routes,controllers,middleware,utils}}

# Kiểm tra structure
tree -L 3 -d
```

Kết quả structure:

```
tracnghiemluyenthi/
├── public/
│   └── assets/
│       ├── images/
│       │   ├── avatars/
│       │   ├── subjects/
│       │   ├── badges/
│       │   └── illustrations/
│       ├── audio/
│       └── fonts/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   ├── quiz/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── settings/
│   │   └── layout/
│   ├── pages/
│   ├── hooks/
│   ├── store/
│   ├── services/
│   ├── lib/
│   ├── constants/
│   └── styles/
│       └── tokens/
└── server/
    ├── config/
    ├── models/
    ├── routes/
    ├── controllers/
    ├── middleware/
    └── utils/
```

### 2.2. Initialize Package.json

```bash
npm init -y
```

---

## Bước 3: Setup Backend

### 3.1. Install Backend Dependencies

```bash
# Core dependencies
npm install express mongodb mongoose cors dotenv bcryptjs jsonwebtoken

# Development dependencies
npm install --save-dev nodemon
```

### 3.2. Tạo Environment Variables

```bash
# Tạo file .env
cat > .env << 'EOF'
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/quizapp?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=5000
NODE_ENV=development

# Client URL (for CORS)
CLIENT_URL=http://localhost:3000
EOF
```

**⚠️ QUAN TRỌNG:** Thay `MONGODB_URI` bằng connection string thực của bạn!

### 3.3. Tạo Database Configuration

```bash
# server/config/database.js
cat > server/config/database.js << 'EOF'
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
    return conn;
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
EOF
```

### 3.4. Tạo Models

#### User Model

```bash
cat > server/models/User.js << 'EOF'
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [50, 'Username cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  avatar: {
    type: String,
    default: '/assets/images/avatars/default.png'
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  settings: {
    backgroundMusic: { type: Boolean, default: false },
    soundEffects: { type: Boolean, default: false },
    timer: { type: Boolean, default: false },
    questionsPerExam: { type: Number, default: 5, min: 1, max: 50 },
    examTimer: { type: Number, default: 30, min: 1, max: 180 },
    selectedAvatar: { type: String, default: 'avatar1' }
  },
  stats: {
    totalExams: { type: Number, default: 0 },
    totalCorrect: { type: Number, default: 0 },
    totalQuestions: { type: Number, default: 0 },
    averageScore: { type: Number, default: 0 },
    bestScore: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

// Hash password trước khi save
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method để check password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method để update stats
userSchema.methods.updateStats = function(examResult) {
  this.stats.totalExams += 1;
  this.stats.totalCorrect += examResult.correctAnswers;
  this.stats.totalQuestions += examResult.totalQuestions;
  
  const newAverage = (this.stats.totalCorrect / this.stats.totalQuestions) * 100;
  this.stats.averageScore = Math.round(newAverage * 10) / 10;
  
  if (examResult.percentage > this.stats.bestScore) {
    this.stats.bestScore = examResult.percentage;
  }
};

module.exports = mongoose.model('User', userSchema);
EOF
```

#### Subject Model

```bash
cat > server/models/Subject.js << 'EOF'
const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Subject name is required'],
    trim: true
  },
  code: {
    type: String,
    required: [true, 'Subject code is required'],
    unique: true,
    uppercase: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  questionCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index
subjectSchema.index({ code: 1 });
subjectSchema.index({ isActive: 1 });

module.exports = mongoose.model('Subject', subjectSchema);
EOF
```

#### Question Model

```bash
cat > server/models/Question.js << 'EOF'
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: [true, 'Subject is required']
  },
  type: {
    type: String,
    enum: ['true_false', 'multiple_choice'],
    required: [true, 'Question type is required']
  },
  content: {
    type: String,
    required: [true, 'Question content is required'],
    trim: true
  },
  options: [{
    text: {
      type: String,
      required: true
    },
    isCorrect: {
      type: Boolean,
      required: true
    }
  }],
  explanation: {
    type: String,
    required: [true, 'Explanation is required'],
    trim: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  dateCreated: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  usageCount: {
    type: Number,
    default: 0
  },
  correctRate: {
    type: Number,
    default: 0,
    min: 0,
    max: 1
  }
}, {
  timestamps: true
});

// Validation: Đảm bảo có ít nhất 1 đáp án đúng
questionSchema.pre('save', function(next) {
  const hasCorrectAnswer = this.options.some(opt => opt.isCorrect);
  if (!hasCorrectAnswer) {
    return next(new Error('At least one option must be correct'));
  }
  
  // Validate số lượng options
  if (this.type === 'true_false' && this.options.length !== 2) {
    return next(new Error('True/False questions must have exactly 2 options'));
  }
  if (this.type === 'multiple_choice' && this.options.length !== 4) {
    return next(new Error('Multiple choice questions must have exactly 4 options'));
  }
  
  next();
});

// Indexes
questionSchema.index({ subjectId: 1, isActive: 1 });
questionSchema.index({ difficulty: 1 });
questionSchema.index({ tags: 1 });

module.exports = mongoose.model('Question', questionSchema);
EOF
```

### 3.5. Tạo Auth Middleware

```bash
cat > server/middleware/auth.middleware.js << 'EOF'
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    let token;

    // Lấy token từ header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Lấy user từ token
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }
};

module.exports = { protect };
EOF
```

### 3.6. Tạo Auth Routes & Controller

#### Auth Controller

```bash
cat > server/controllers/auth.controller.js << 'EOF'
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { username, email, password, fullName } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ $or: [{ email }, { username }] });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email or username'
      });
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password,
      fullName
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          avatar: user.avatar
        },
        token
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Check user exists
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Update last login
    user.lastLogin = Date.now();
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          avatar: user.avatar,
          settings: user.settings,
          stats: user.stats
        },
        token
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          avatar: user.avatar,
          settings: user.settings,
          stats: user.stats
        }
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
EOF
```

#### Auth Routes

```bash
cat > server/routes/auth.routes.js << 'EOF'
const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;
EOF
```

### 3.7. Tạo Main Server File

```bash
cat > server/index.js << 'EOF'
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// Load env vars
dotenv.config();

// Initialize app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health`);
});
EOF
```

### 3.8. Update package.json Scripts

```bash
# Add to package.json
npm pkg set scripts.server="node server/index.js"
npm pkg set scripts.server:dev="nodemon server/index.js"
```

### 3.9. Test Backend

```bash
# Chạy server
npm run server:dev

# Trong terminal khác, test health check
curl http://localhost:5000/health

# Test registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "fullName": "Test User"
  }'
```

---

## Bước 4: Setup Frontend

### 4.1. Initialize Vite + React

```bash
# Tạo Vite app
npm create vite@latest client -- --template react

# Hoặc nếu muốn TypeScript
npm create vite@latest client -- --template react-ts

# Di chuyển nội dung từ client/ ra root
mv client/* .
mv client/.* . 2>/dev/null || true
rm -rf client/

# Hoặc giữ structure riêng (khuyến nghị)
cd client
```

### 4.2. Install Frontend Dependencies

```bash
# Core dependencies
npm install react-router-dom axios zustand react-hot-toast

# UI dependencies
npm install lucide-react framer-motion

# Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Additional utilities
npm install clsx tailwind-merge
```

### 4.3. Configure Tailwind CSS

```bash
# tailwind.config.js
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
EOF
```

### 4.4. Setup CSS Files

```bash
# Create styles directory
mkdir -p src/styles/tokens

# src/styles/global.css
cat > src/styles/global.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-border;
  }
  
  body {
    @apply bg-neutral-50 text-neutral-900;
    @apply font-sans antialiased;
  }
}

@layer components {
  .container {
    @apply mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl;
  }

  .btn {
    @apply px-4 py-2 rounded-lg font-medium;
    @apply transition-all duration-200;
    @apply focus:outline-none focus:ring-2 focus:ring-offset-2;
  }

  .btn-primary {
    @apply bg-primary-500 hover:bg-primary-600 text-white;
    @apply focus:ring-primary-500;
  }

  .card {
    @apply bg-white rounded-xl shadow-md p-6;
  }
}
EOF
```

### 4.5. Create Utility Functions

```bash
# src/lib/utils.js
cat > src/lib/utils.js << 'EOF'
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('vi-VN');
}

export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
EOF
```

### 4.6. Setup API Service

```bash
# src/services/api.js
cat > src/services/api.js << 'EOF'
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors
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

export default api;
EOF
```

```bash
# src/services/auth.service.js
cat > src/services/auth.service.js << 'EOF'
import api from './api';

export const authService = {
  async register(userData) {
    const response = await api.post('/auth/register', userData);
    if (response.data.success) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  async login(credentials) {
    const response = await api.post('/auth/login', credentials);
    if (response.data.success) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  async getMe() {
    const response = await api.get('/auth/me');
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
};
EOF
```

### 4.7. Create Basic Components

#### Button Component

```bash
mkdir -p src/components/ui

cat > src/components/ui/Button.jsx << 'EOF'
import React from 'react';
import { cn } from '@/lib/utils';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  ...props
}) => {
  const variants = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white',
    secondary: 'bg-neutral-200 hover:bg-neutral-300 text-neutral-900',
    outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center',
        'rounded-lg font-medium',
        'transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
EOF
```

#### Input Component

```bash
cat > src/components/ui/Input.jsx << 'EOF'
import React from 'react';
import { cn } from '@/lib/utils';

export const Input = ({
  label,
  error,
  className,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full px-4 py-2 rounded-lg',
          'border-2 border-neutral-300',
          'focus:border-primary-500 focus:ring-2 focus:ring-primary-200',
          'transition-all duration-200',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-200',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};
EOF
```

### 4.8. Create Login Page

```bash
mkdir -p src/pages

cat > src/pages/LoginPage.jsx << 'EOF'
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { authService } from '@/services/auth.service';
import toast from 'react-hot-toast';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const response = await authService.login(formData);
      toast.success(response.message || 'Đăng nhập thành công!');
      navigate('/dashboard');
    } catch (error) {
      const message = error.response?.data?.message || 'Đăng nhập thất bại!';
      toast.error(message);
      setErrors({ general: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">
              Đăng nhập
            </h1>
            <p className="text-neutral-600">
              Chào mừng bạn quay trở lại!
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
              error={errors.email}
            />

            <Input
              label="Mật khẩu"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              error={errors.password}
            />

            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {errors.general}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-neutral-600">
              Chưa có tài khoản?{' '}
              <Link
                to="/register"
                className="text-primary-500 hover:text-primary-600 font-medium"
              >
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
EOF
```

### 4.9. Setup Routing

```bash
# src/App.jsx
cat > src/App.jsx << 'EOF'
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { LoginPage } from './pages/LoginPage';
import { authService } from './services/auth.service';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* Add more routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
EOF
```

```bash
# src/main.jsx
cat > src/main.jsx << 'EOF'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOF
```

### 4.10. Create .env for Frontend

```bash
cat > .env << 'EOF'
VITE_API_URL=http://localhost:5000/api
EOF
```

### 4.11. Update package.json Scripts

```bash
npm pkg set scripts.dev="vite"
npm pkg set scripts.build="vite build"
npm pkg set scripts.preview="vite preview"
```

### 4.12. Configure Vite

```bash
cat > vite.config.js << 'EOF'
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
EOF
```

---

## Bước 5: Setup Figma

### 5.1. Tạo Figma Account

1. Truy cập [figma.com](https://www.figma.com)
2. Sign up với email hoặc Google
3. Chọn plan Free (đủ cho dự án)

### 5.2. Tạo Design File

```
1. Click "New design file"
2. Đặt tên: "Quiz App - Design System"
3. Setup pages:
   - 🎨 Design Tokens
   - 🧩 Components
   - 📄 Pages
   - 📱 Mobile
```

### 5.3. Setup Design Tokens

#### Colors

```
Frame: "Colors"

Primary Colors:
- primary-50: #f0f9ff
- primary-100: #e0f2fe
- primary-500: #0ea5e9
- primary-600: #0284c7
- primary-900: #0c4a6e

Success: #22c55e
Error: #ef4444
Warning: #f59e0b

Neutrals:
- neutral-50: #fafafa
- neutral-100: #f5f5f5
- neutral-500: #737373
- neutral-900: #171717
```

#### Typography

```
Font: Inter (Google Fonts)

Text Styles:
- Heading 1: 48px, Bold
- Heading 2: 36px, Bold
- Heading 3: 30px, SemiBold
- Body Large: 18px, Regular
- Body: 16px, Regular
- Body Small: 14px, Regular
- Caption: 12px, Regular
```

#### Spacing

```
Base unit: 4px

Space scale:
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px
```

### 5.4. Create Components

#### Button Component

```
1. Create frame: 160x40px
2. Add Auto Layout (horizontal)
3. Padding: 16px horizontal, 8px vertical
4. Border radius: 8px
5. Text: "Button", 16px Medium

Variants:
- Primary (bg: primary-500)
- Secondary (bg: neutral-200)
- Outline (border: 2px primary-500)

States:
- Default
- Hover
- Disabled
```

#### Card Component

```
1. Create frame: 400x300px
2. Fill: white
3. Border radius: 12px
4. Shadow: 0 4px 6px rgba(0,0,0,0.1)
5. Padding: 24px

Sections:
- Header (title + actions)
- Content
- Footer
```

### 5.5. Design Key Screens

#### Login Screen

```
Components:
- Logo/Title
- Email input field
- Password input field
- Login button (primary)
- "Đăng ký" link

Layout:
- Center aligned
- Max width: 400px
- Gradient background
```

#### Dashboard

```
Components:
- Header with user info
- Stats cards (4 cards)
- Subject list
- Recent exams list

Layout:
- Grid: 2 columns on desktop
- Stack on mobile
```

#### Quiz Screen

```
Components:
- Progress bar (top)
- Question card
  - Question number
  - Timer (if enabled)
  - Question text
  - 4 answer options
- Navigation buttons

Layout:
- Centered card
- Max width: 800px
```

---

## Bước 6: Run Application

### 6.1. Run Backend

```bash
# Terminal 1 - Backend
cd tracnghiemluyenthi
npm run server:dev

# Đợi thấy:
# ✅ MongoDB Connected
# 🚀 Server is running on port 5000
```

### 6.2. Run Frontend

```bash
# Terminal 2 - Frontend
cd tracnghiemluyenthi
npm run dev

# Đợi thấy:
# VITE v5.x.x ready in xxx ms
# ➜ Local: http://localhost:3000/
```

### 6.3. Test Application

1. **Mở trình duyệt**
   ```
   http://localhost:3000
   ```

2. **Test Registration**
   - Click "Đăng ký ngay"
   - Điền thông tin
   - Submit

3. **Test Login**
   - Login với account vừa tạo
   - Check redirect to dashboard

4. **Test API Endpoints**
   ```bash
   # Health check
   curl http://localhost:5000/health

   # Register
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"username":"user1","email":"user1@test.com","password":"123456","fullName":"User One"}'

   # Login
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"user1@test.com","password":"123456"}'
   ```

---

## Bước 7: Development Workflow

### 7.1. Git Workflow

```bash
# Tạo branch mới cho feature
git checkout -b feature/quiz-interface

# Làm việc và commit thường xuyên
git add .
git commit -m "feat: add question card component"

# Push lên remote
git push origin feature/quiz-interface

# Merge vào main khi hoàn thành
git checkout main
git merge feature/quiz-interface
```

### 7.2. Code Organization Tips

```
Frontend:
- 1 component = 1 file
- Component names: PascalCase
- File names: PascalCase.jsx
- Utility functions: camelCase

Backend:
- Routes → Controllers → Services → Models
- Error handling ở mọi layer
- Validation ở controller layer
```

### 7.3. Best Practices

#### Component Structure

```jsx
// 1. Imports
import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';

// 2. Component
export const MyComponent = ({ prop1, prop2 }) => {
  // 3. State & hooks
  const [state, setState] = useState();
  
  // 4. Functions
  const handleClick = () => {
    // logic
  };
  
  // 5. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};
```

#### API Calls

```javascript
// Always use try-catch
try {
  const response = await api.get('/endpoint');
  // handle success
} catch (error) {
  // handle error
  toast.error(error.message);
}
```

### 7.4. Testing Checklist

```
Frontend:
□ All pages load correctly
□ Forms validate properly
□ API calls work
□ Error states display
□ Loading states show
□ Responsive on mobile

Backend:
□ All endpoints respond
□ Validation works
□ Authentication works
□ Database operations work
□ Error handling works
```

---

## Troubleshooting

### Common Issues

#### 1. MongoDB Connection Failed

```
Error: MongoNetworkError: failed to connect

Solution:
1. Check MONGODB_URI in .env
2. Verify Network Access in MongoDB Atlas
3. Check internet connection
4. Try: 0.0.0.0/0 in Network Access
```

#### 2. Port Already in Use

```
Error: Port 5000 is already in use

Solution:
# Kill process on port
# MacOS/Linux:
lsof -ti:5000 | xargs kill -9

# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

#### 3. Module Not Found

```
Error: Cannot find module 'express'

Solution:
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### 4. CORS Error

```
Access to XMLHttpRequest blocked by CORS

Solution:
1. Check CLIENT_URL in backend .env
2. Verify cors() configuration in server/index.js
3. Restart both servers
```

#### 5. Tailwind Classes Not Working

```
Solution:
1. Check tailwind.config.js content paths
2. Ensure global.css is imported in main.jsx
3. Restart dev server
```

#### 6. JWT Token Invalid

```
Error: jwt malformed / jwt expired

Solution:
1. Clear localStorage in browser
2. Login again
3. Check JWT_SECRET in .env
```

### Debug Commands

```bash
# Check Node version
node --version

# Check npm version
npm --version

# List running processes
ps aux | grep node

# Check port usage
lsof -i :5000
lsof -i :3000

# View logs
npm run server:dev | tee server.log
npm run dev | tee frontend.log

# Test MongoDB connection
mongosh "mongodb+srv://..."
```

---

## Next Steps

### Phase 1: Core Features (Week 3-6)

```
□ Complete authentication flow
□ Create subject management
□ Build question CRUD
□ Implement quiz taking flow
□ Add result calculation
```

### Phase 2: Enhanced Features (Week 7-9)

```
□ User settings page
□ Avatar selection
□ Audio system (music, effects)
□ Timer implementation
□ Progress tracking
```

### Phase 3: Analytics (Week 10-11)

```
□ Dashboard with stats
□ Progress charts
□ Weak/strong areas
□ Level & badges system
□ Study sessions tracking
```

### Phase 4: Polish (Week 12-13)

```
□ Mobile responsive
□ Animations
□ Loading states
□ Error handling
□ Performance optimization
```

### Learning Resources

```
React:
- https://react.dev/learn
- https://react-router.com

Tailwind CSS:
- https://tailwindcss.com/docs
- https://www.youtube.com/c/TailwindLabs

Node.js + Express:
- https://expressjs.com/
- https://mongoosejs.com/docs/

MongoDB:
- https://university.mongodb.com/
- https://www.mongodb.com/docs/
```

---

## Quick Reference

### Start Development

```bash
# Terminal 1 - Backend
npm run server:dev

# Terminal 2 - Frontend
npm run dev
```

### Environment Variables

```bash
# Backend (.env)
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret
PORT=5000

# Frontend (.env)
VITE_API_URL=http://localhost:5000/api
```

### Useful Commands

```bash
# Install all dependencies
npm install

# Clear node_modules
rm -rf node_modules package-lock.json && npm install

# Check for updates
npm outdated

# Update packages
npm update

# Format code (if Prettier installed)
npx prettier --write .

# Check for linting errors (if ESLint installed)
npx eslint .
```

---

## Support & Resources

### Documentation

- **Project Docs**: Check `CLAUDE.md` for design system
- **API Docs**: Check `README.md` for API endpoints
- **Database Schema**: Check `DATABASE_SCHEMA.md`

### Community

- **GitHub Issues**: Report bugs and request features
- **Discord/Slack**: Join team communication
- **Stack Overflow**: Search for common issues

### Contact

- **Email**: your-email@example.com
- **GitHub**: github.com/your-username
- **Project Repo**: github.com/your-username/tracnghiemluyenthi

---

<div align="center">

## 🎉 Congratulations!

Bạn đã hoàn thành setup dự án từ đầu!

**Happy Coding! 🚀**

Made with ❤️ by Nhóm 05

</div>
