#!/bin/bash

# 🚀 Quiz App Setup Script
# Automated setup cho dự án Luyện thi Trắc nghiệm CNTT

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_header() {
    echo ""
    echo -e "${BLUE}========================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}========================================${NC}"
    echo ""
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Main setup
main() {
    clear
    echo -e "${GREEN}"
    cat << "EOF"
╔═══════════════════════════════════════════════╗
║                                               ║
║     🎯 Quiz App Setup Script                 ║
║     Luyện thi Trắc nghiệm CNTT               ║
║                                               ║
╚═══════════════════════════════════════════════╝
EOF
    echo -e "${NC}"

    # Step 1: Check prerequisites
    print_header "Step 1: Checking Prerequisites"
    
    if ! command_exists node; then
        print_error "Node.js is not installed!"
        print_info "Please install Node.js from https://nodejs.org/"
        exit 1
    fi
    print_success "Node.js $(node --version)"
    
    if ! command_exists npm; then
        print_error "npm is not installed!"
        exit 1
    fi
    print_success "npm $(npm --version)"
    
    if ! command_exists git; then
        print_warning "Git is not installed. Some features may not work."
    else
        print_success "Git $(git --version)"
    fi

    # Step 2: Create project structure
    print_header "Step 2: Creating Project Structure"
    
    print_info "Creating directories..."
    mkdir -p public/assets/{images/{avatars,subjects,badges,illustrations},audio,fonts}
    mkdir -p src/{components/{ui,quiz,auth,dashboard,settings,layout},pages,hooks,store,services,lib,constants,styles/tokens}
    mkdir -p server/{config,models,routes,controllers,middleware,utils}
    
    print_success "Project structure created!"

    # Step 3: Initialize npm
    print_header "Step 3: Initializing npm"
    
    if [ ! -f "package.json" ]; then
        npm init -y
        print_success "package.json created!"
    else
        print_warning "package.json already exists, skipping..."
    fi

    # Step 4: Install backend dependencies
    print_header "Step 4: Installing Backend Dependencies"
    
    print_info "Installing core dependencies..."
    npm install express mongodb mongoose cors dotenv bcryptjs jsonwebtoken
    
    print_info "Installing dev dependencies..."
    npm install --save-dev nodemon
    
    print_success "Backend dependencies installed!"

    # Step 5: Install frontend dependencies
    print_header "Step 5: Installing Frontend Dependencies"
    
    print_info "Installing React and related packages..."
    npm install react react-dom react-router-dom axios zustand react-hot-toast
    
    print_info "Installing UI dependencies..."
    npm install lucide-react framer-motion clsx tailwind-merge
    
    print_info "Installing Tailwind CSS..."
    npm install -D tailwindcss postcss autoprefixer @vitejs/plugin-react vite
    
    print_success "Frontend dependencies installed!"

    # Step 6: Setup environment file
    print_header "Step 6: Setting up Environment Variables"
    
    if [ ! -f ".env" ]; then
        cat > .env << 'ENV_EOF'
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/quizapp?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=change-this-to-a-secure-random-string-in-production
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=5000
NODE_ENV=development

# Client URL (for CORS)
CLIENT_URL=http://localhost:3000
ENV_EOF
        print_success ".env file created!"
        print_warning "⚠️  IMPORTANT: Update MONGODB_URI in .env with your actual MongoDB connection string!"
    else
        print_warning ".env file already exists, skipping..."
    fi

    # Step 7: Create gitignore
    print_header "Step 7: Creating .gitignore"
    
    if [ ! -f ".gitignore" ]; then
        cat > .gitignore << 'GITIGNORE_EOF'
# Dependencies
node_modules/
/.pnp
.pnp.js

# Production
/build
/dist

# Environment Variables
.env
.env.local
.env.*.local

# Logs
*.log
npm-debug.log*
yarn-debug.log*

# Editor
.vscode/*
!.vscode/settings.json
!.vscode/extensions.json
.idea
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Misc
.eslintcache
.cache
GITIGNORE_EOF
        print_success ".gitignore created!"
    else
        print_warning ".gitignore already exists, skipping..."
    fi

    # Step 8: Initialize Tailwind
    print_header "Step 8: Initializing Tailwind CSS"
    
    if [ ! -f "tailwind.config.js" ]; then
        npx tailwindcss init -p
        print_success "Tailwind configuration created!"
    else
        print_warning "Tailwind config already exists, skipping..."
    fi

    # Step 9: Update package.json scripts
    print_header "Step 9: Updating package.json scripts"
    
    npm pkg set scripts.dev="vite"
    npm pkg set scripts.build="vite build"
    npm pkg set scripts.preview="vite preview"
    npm pkg set scripts.server="node server/index.js"
    npm pkg set scripts.server:dev="nodemon server/index.js"
    
    print_success "Scripts added to package.json!"

    # Step 10: Create placeholder files
    print_header "Step 10: Creating Placeholder Files"
    
    # Create index.html
    if [ ! -f "index.html" ]; then
        cat > index.html << 'HTML_EOF'
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Quiz App - Luyện thi CNTT</title>
</head>
<body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
</body>
</html>
HTML_EOF
        print_success "index.html created!"
    fi

    # Create src/main.jsx placeholder
    if [ ! -f "src/main.jsx" ]; then
        cat > src/main.jsx << 'MAIN_EOF'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary-600 mb-4">
          🎯 Quiz App
        </h1>
        <p className="text-xl text-neutral-600">
          Setup completed! Start building your app.
        </p>
      </div>
    </div>
  </React.StrictMode>
)
MAIN_EOF
        print_success "src/main.jsx created!"
    fi

    # Create global.css placeholder
    if [ ! -f "src/styles/global.css" ]; then
        cat > src/styles/global.css << 'CSS_EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-neutral-50 text-neutral-900 font-sans antialiased;
  }
}
CSS_EOF
        print_success "src/styles/global.css created!"
    fi

    # Final summary
    print_header "🎉 Setup Complete!"
    
    echo ""
    echo -e "${GREEN}✓ Project structure created${NC}"
    echo -e "${GREEN}✓ Dependencies installed${NC}"
    echo -e "${GREEN}✓ Configuration files created${NC}"
    echo -e "${GREEN}✓ Environment setup completed${NC}"
    echo ""
    
    print_warning "⚠️  Next Steps:"
    echo ""
    echo "1. Update .env file with your MongoDB connection string"
    echo "2. Follow GETTING_STARTED.md for detailed setup instructions"
    echo "3. Create your server files in server/ directory"
    echo "4. Build your components in src/components/"
    echo ""
    echo -e "${BLUE}To start development:${NC}"
    echo ""
    echo "  Terminal 1 (Backend):"
    echo "  $ npm run server:dev"
    echo ""
    echo "  Terminal 2 (Frontend):"
    echo "  $ npm run dev"
    echo ""
    echo -e "${GREEN}Happy coding! 🚀${NC}"
    echo ""
}

# Run main function
main
