@echo off
REM Quiz App Setup Script for Windows
REM Automated setup for the Quiz App project

setlocal enabledelayedexpansion
color 0A

echo.
echo ===============================================
echo     Quiz App Setup Script
echo     Luyen thi Trac nghiem CNTT
echo ===============================================
echo.

REM Check Node.js
echo [1/10] Checking prerequisites...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo [OK] Node.js found: 
node --version

where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] npm is not installed!
    pause
    exit /b 1
)
echo [OK] npm found: 
npm --version

REM Create project structure
echo.
echo [2/10] Creating project structure...
mkdir public\assets\images\avatars 2>nul
mkdir public\assets\images\subjects 2>nul
mkdir public\assets\images\badges 2>nul
mkdir public\assets\images\illustrations 2>nul
mkdir public\assets\audio 2>nul
mkdir public\assets\fonts 2>nul
mkdir src\components\ui 2>nul
mkdir src\components\quiz 2>nul
mkdir src\components\auth 2>nul
mkdir src\components\dashboard 2>nul
mkdir src\components\settings 2>nul
mkdir src\components\layout 2>nul
mkdir src\pages 2>nul
mkdir src\hooks 2>nul
mkdir src\store 2>nul
mkdir src\services 2>nul
mkdir src\lib 2>nul
mkdir src\constants 2>nul
mkdir src\styles\tokens 2>nul
mkdir server\config 2>nul
mkdir server\models 2>nul
mkdir server\routes 2>nul
mkdir server\controllers 2>nul
mkdir server\middleware 2>nul
mkdir server\utils 2>nul
echo [OK] Project structure created!

REM Initialize npm
echo.
echo [3/10] Initializing npm...
if not exist package.json (
    call npm init -y
    echo [OK] package.json created!
) else (
    echo [SKIP] package.json already exists
)

REM Install backend dependencies
echo.
echo [4/10] Installing backend dependencies...
call npm install express mongodb mongoose cors dotenv bcryptjs jsonwebtoken
echo [OK] Backend dependencies installed!

REM Install dev dependencies
echo.
echo [5/10] Installing development dependencies...
call npm install --save-dev nodemon
echo [OK] Dev dependencies installed!

REM Install frontend dependencies
echo.
echo [6/10] Installing frontend dependencies...
call npm install react react-dom react-router-dom axios zustand react-hot-toast
echo [OK] Frontend dependencies installed!

REM Install UI dependencies
echo.
echo [7/10] Installing UI dependencies...
call npm install lucide-react framer-motion clsx tailwind-merge
echo [OK] UI dependencies installed!

REM Install Tailwind CSS
echo.
echo [8/10] Installing Tailwind CSS...
call npm install -D tailwindcss postcss autoprefixer @vitejs/plugin-react vite
echo [OK] Tailwind CSS installed!

REM Create .env file
echo.
echo [9/10] Creating environment file...
if not exist .env (
    (
        echo # MongoDB Configuration
        echo MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/quizapp?retryWrites=true^&w=majority
        echo.
        echo # JWT Configuration
        echo JWT_SECRET=change-this-to-a-secure-random-string-in-production
        echo JWT_EXPIRES_IN=7d
        echo.
        echo # Server Configuration
        echo PORT=5000
        echo NODE_ENV=development
        echo.
        echo # Client URL
        echo CLIENT_URL=http://localhost:3000
    ) > .env
    echo [OK] .env file created!
    echo [WARNING] Update MONGODB_URI in .env with your actual MongoDB connection string!
) else (
    echo [SKIP] .env file already exists
)

REM Create .gitignore
if not exist .gitignore (
    (
        echo node_modules/
        echo .env
        echo .env.local
        echo dist/
        echo build/
        echo *.log
        echo .DS_Store
        echo Thumbs.db
        echo .vscode/*
        echo !.vscode/settings.json
    ) > .gitignore
    echo [OK] .gitignore created!
) else (
    echo [SKIP] .gitignore already exists
)

REM Initialize Tailwind
echo.
echo [10/10] Initializing Tailwind CSS...
if not exist tailwind.config.js (
    call npx tailwindcss init -p
    echo [OK] Tailwind configuration created!
) else (
    echo [SKIP] Tailwind config already exists
)

REM Update package.json scripts
call npm pkg set scripts.dev="vite"
call npm pkg set scripts.build="vite build"
call npm pkg set scripts.preview="vite preview"
call npm pkg set scripts.server="node server/index.js"
call npm pkg set scripts.server:dev="nodemon server/index.js"
echo [OK] Scripts added to package.json!

REM Create index.html
if not exist index.html (
    (
        echo ^<!DOCTYPE html^>
        echo ^<html lang="vi"^>
        echo ^<head^>
        echo     ^<meta charset="UTF-8" /^>
        echo     ^<meta name="viewport" content="width=device-width, initial-scale=1.0" /^>
        echo     ^<title^>Quiz App - Luyen thi CNTT^</title^>
        echo ^</head^>
        echo ^<body^>
        echo     ^<div id="root"^>^</div^>
        echo     ^<script type="module" src="/src/main.jsx"^>^</script^>
        echo ^</body^>
        echo ^</html^>
    ) > index.html
    echo [OK] index.html created!
)

REM Create main.jsx
if not exist src\main.jsx (
    (
        echo import React from 'react'
        echo import ReactDOM from 'react-dom/client'
        echo import './styles/global.css'
        echo.
        echo ReactDOM.createRoot^(document.getElementById^('root'^)^).render^(
        echo   ^<React.StrictMode^>
        echo     ^<div className="flex items-center justify-center min-h-screen"^>
        echo       ^<h1 className="text-4xl font-bold"^>Quiz App^</h1^>
        echo     ^</div^>
        echo   ^</React.StrictMode^>
        echo ^)
    ) > src\main.jsx
    echo [OK] src\main.jsx created!
)

REM Create global.css
if not exist src\styles\global.css (
    (
        echo @tailwind base;
        echo @tailwind components;
        echo @tailwind utilities;
        echo.
        echo @layer base {
        echo   body {
        echo     @apply bg-neutral-50 text-neutral-900;
        echo   }
        echo }
    ) > src\styles\global.css
    echo [OK] src\styles\global.css created!
)

REM Final message
echo.
echo ===============================================
echo     Setup Complete!
echo ===============================================
echo.
echo [OK] Project structure created
echo [OK] Dependencies installed
echo [OK] Configuration files created
echo [OK] Environment setup completed
echo.
echo [WARNING] Next Steps:
echo.
echo 1. Update .env file with your MongoDB connection string
echo 2. Follow GETTING_STARTED.md for detailed instructions
echo 3. Create your server files in server/ directory
echo 4. Build your components in src/components/
echo.
echo To start development:
echo.
echo   Terminal 1 (Backend):
echo   npm run server:dev
echo.
echo   Terminal 2 (Frontend):
echo   npm run dev
echo.
echo Happy coding!
echo.
pause
