# 🚀 DEPLOYMENT GUIDE

> Hướng dẫn deploy ứng dụng Quiz App lên Production  
> Backend + Frontend + Database

---

## 📋 Mục lục

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Deploy Database (MongoDB Atlas)](#deploy-database)
4. [Deploy Backend (Railway/Render)](#deploy-backend)
5. [Deploy Frontend (Vercel)](#deploy-frontend)
6. [Environment Variables](#environment-variables)
7. [Domain Setup](#domain-setup)
8. [Testing Production](#testing-production)
9. [Maintenance](#maintenance)
10. [Troubleshooting](#troubleshooting)

---

## Overview

### Deployment Architecture

```
┌─────────────────────────────────────────────────┐
│                                                 │
│           Users (https://quizapp.com)           │
│                                                 │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
        ┌────────────────────────┐
        │   Vercel (Frontend)    │
        │   - React App          │
        │   - Static Assets      │
        │   - CDN                │
        └────────────┬───────────┘
                     │ API Calls
                     ▼
        ┌────────────────────────┐
        │  Railway (Backend)     │
        │  - Node.js + Express   │
        │  - REST API            │
        │  - Authentication      │
        └────────────┬───────────┘
                     │ Database
                     ▼
        ┌────────────────────────┐
        │  MongoDB Atlas         │
        │  - User Data           │
        │  - Questions           │
        │  - Exam Results        │
        └────────────────────────┘
```

### Why These Services?

**Vercel (Frontend)**
- ✅ Free tier với unlimited bandwidth
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Git integration
- ✅ Zero config deployment

**Railway (Backend)** 
- ✅ Free $5 credit/month
- ✅ Automatic deployments
- ✅ Easy environment variables
- ✅ Built-in monitoring
- ✅ Supports Node.js

**Alternative: Render (Backend)**
- ✅ Free tier available
- ✅ Auto-deploy from Git
- ✅ Good for Node.js

**MongoDB Atlas (Database)**
- ✅ Free tier (512MB)
- ✅ Cloud hosted
- ✅ Auto backups
- ✅ Reliable

---

## Prerequisites

### Accounts Needed

```
✓ GitHub Account (for code repository)
✓ Vercel Account (for frontend)
✓ Railway Account (for backend)
✓ MongoDB Atlas Account (for database)
```

### Tools Required

```bash
# Git
git --version

# Node.js
node --version  # v18+

# npm
npm --version
```

### Code Preparation

```bash
# 1. Ensure code is in Git
git status
git add .
git commit -m "Prepare for deployment"

# 2. Push to GitHub
git remote add origin https://github.com/username/quiz-app.git
git push -u origin main

# 3. Test locally first
npm run server:dev  # Backend
npm run dev         # Frontend
```

---

## Deploy Database

### MongoDB Atlas Setup (Already done)

Nếu chưa setup, xem lại `GETTING_STARTED.md` Bước 1.3.

**Important:** Lấy Production Connection String

```
1. Login to MongoDB Atlas
2. Go to Database → Connect
3. Choose "Connect your application"
4. Copy connection string
5. Replace <password> with actual password
6. Save this for environment variables

Format:
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/quizapp?retryWrites=true&w=majority
```

### Database Seeding (Optional)

```bash
# Tạo script để seed initial data
# server/scripts/seed.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Subject = require('../models/Subject');
const Question = require('../models/Question');
const User = require('../models/User');
const sampleData = require('../../sample_data');

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('🗑️  Clearing database...');
    await Subject.deleteMany({});
    await Question.deleteMany({});
    await User.deleteMany({});
    
    console.log('👤 Creating admin user...');
    const admin = await User.create({
      username: 'admin',
      email: 'admin@quizapp.com',
      password: 'admin123',
      fullName: 'Administrator'
    });
    
    console.log('📚 Creating subjects...');
    const subjects = await Subject.create(
      sampleData.sampleSubjects.map(s => ({
        ...s,
        createdBy: admin._id
      }))
    );
    
    console.log('❓ Creating questions...');
    await Question.create([
      ...sampleData.sampleQuestionsStructure,
      ...sampleData.sampleQuestionsNetwork
    ]);
    
    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
```

```bash
# Run seeding
node server/scripts/seed.js
```

---

## Deploy Backend

### Option 1: Railway (Recommended)

#### Step 1: Create Railway Project

```
1. Go to https://railway.app
2. Sign in with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your quiz-app repository
6. Railway will auto-detect Node.js
```

#### Step 2: Configure Environment Variables

```
1. In Railway Dashboard → Variables
2. Add these variables:

MONGODB_URI=mongodb+srv://username:password@cluster0...
JWT_SECRET=your-super-secret-production-key-change-this
JWT_EXPIRES_IN=7d
NODE_ENV=production
PORT=5000
CLIENT_URL=https://your-frontend-url.vercel.app
```

#### Step 3: Configure Build & Start Commands

```
# In railway.json or Railway settings:

Build Command: npm install
Start Command: npm run server

# Or in package.json:
"scripts": {
  "server": "node server/index.js",
  "build": "npm install"
}
```

#### Step 4: Deploy

```
1. Railway auto-deploys on git push
2. Or click "Deploy Now" in dashboard
3. Wait for build (2-3 minutes)
4. Get your backend URL: https://quiz-app.railway.app
```

#### Step 5: Verify Deployment

```bash
# Test health endpoint
curl https://quiz-app.railway.app/health

# Expected response:
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-11-02T..."
}
```

### Option 2: Render

#### Setup on Render

```
1. Go to https://render.com
2. Sign in with GitHub
3. New → Web Service
4. Connect your repository
5. Configure:
   Name: quiz-app-backend
   Environment: Node
   Build Command: npm install
   Start Command: npm run server
   Plan: Free
```

#### Environment Variables

Same as Railway above.

#### Deploy

```
1. Click "Create Web Service"
2. Wait 5-10 minutes for first deploy
3. Get URL: https://quiz-app-backend.onrender.com
```

**Note:** Render free tier sleeps after 15 mins of inactivity.

---

## Deploy Frontend

### Deploy to Vercel

#### Step 1: Prepare Frontend Code

```bash
# Update API URL in code
# Create .env.production file

cat > .env.production << 'EOF'
VITE_API_URL=https://quiz-app.railway.app/api
EOF
```

**Important:** Update `src/services/api.js`:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD 
    ? 'https://quiz-app.railway.app/api'
    : 'http://localhost:5000/api'
  );
```

#### Step 2: Deploy to Vercel

**Method 1: Using Vercel CLI (Recommended)**

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Scope: Your account
# - Link to existing project? N
# - Project name: quiz-app
# - Directory: ./
# - Override settings? N

# Deploy to production
vercel --prod
```

**Method 2: Using Vercel Dashboard**

```
1. Go to https://vercel.com
2. Sign in with GitHub
3. Import Project
4. Select quiz-app repository
5. Configure:
   Framework Preset: Vite
   Root Directory: ./
   Build Command: npm run build
   Output Directory: dist
6. Environment Variables:
   VITE_API_URL = https://quiz-app.railway.app/api
7. Click Deploy
```

#### Step 3: Get Your URL

```
Your app will be live at:
https://quiz-app-username.vercel.app

Or custom domain:
https://quizapp.com (if you setup custom domain)
```

---

## Environment Variables

### Backend (.env for Railway/Render)

```bash
# MongoDB
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/quizapp

# JWT
JWT_SECRET=your-super-secret-production-key-min-32-chars
JWT_EXPIRES_IN=7d

# Server
NODE_ENV=production
PORT=5000

# CORS
CLIENT_URL=https://quiz-app-username.vercel.app
```

### Frontend (.env.production for Vercel)

```bash
VITE_API_URL=https://quiz-app.railway.app/api
```

### Security Best Practices

```
✓ Never commit .env files
✓ Use strong JWT_SECRET (min 32 characters)
✓ Rotate secrets regularly
✓ Use different secrets for dev/prod
✓ Enable MongoDB IP whitelist
```

---

## Domain Setup

### Custom Domain (Optional)

#### For Frontend (Vercel)

```
1. Buy domain (e.g., from Namecheap, GoDaddy)
2. In Vercel Dashboard:
   - Settings → Domains
   - Add domain: quizapp.com
   - Add DNS records as instructed
3. Wait for DNS propagation (up to 48 hours)
```

#### For Backend (Railway)

```
1. In Railway Dashboard:
   - Settings → Domains
   - Generate domain or add custom
2. Update CORS settings with new domain
3. Update frontend API_URL
```

### SSL/HTTPS

Both Vercel and Railway provide automatic HTTPS.

✅ No additional configuration needed!

---

## Testing Production

### Checklist

```bash
# 1. Backend Health Check
curl https://quiz-app.railway.app/health

# 2. Register new user
curl -X POST https://quiz-app.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "fullName": "Test User"
  }'

# 3. Login
curl -X POST https://quiz-app.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# 4. Test Frontend
# Open browser: https://quiz-app-username.vercel.app
# - Can you see login page?
# - Can you register?
# - Can you login?
# - Can you take a quiz?
```

### Performance Testing

```bash
# Use Lighthouse
npx lighthouse https://quiz-app-username.vercel.app

# Check metrics:
- Performance: >90
- Accessibility: >90
- Best Practices: >90
- SEO: >90
```

---

## Maintenance

### Monitoring

#### Railway Dashboard

```
- View logs: Railway Dashboard → Logs
- Monitor metrics: CPU, Memory, Network
- Set up alerts
```

#### Vercel Analytics

```
- View analytics: Vercel Dashboard → Analytics
- Monitor traffic, response times
- Error tracking
```

### Logs

```bash
# View Railway logs
railway logs

# View Vercel logs
vercel logs
```

### Updates & Deployments

```bash
# Make changes locally
git add .
git commit -m "Update feature"
git push origin main

# Auto-deploy triggers:
# - Railway: Deploys backend automatically
# - Vercel: Deploys frontend automatically

# Manual deploy if needed:
railway up      # For Railway
vercel --prod   # For Vercel
```

### Database Backups

```
MongoDB Atlas automatically backs up data.

Manual backup:
1. MongoDB Atlas → Clusters
2. Click "..." → Backup
3. Create On-Demand Backup
```

---

## Troubleshooting

### Common Issues

#### 1. CORS Error

**Error:** `Access to XMLHttpRequest blocked by CORS`

**Solution:**
```javascript
// server/index.js
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://quiz-app-username.vercel.app',
    'https://quizapp.com'  // If using custom domain
  ],
  credentials: true
}));
```

Update `CLIENT_URL` in Railway environment variables.

#### 2. MongoDB Connection Failed

**Error:** `MongoNetworkError: failed to connect`

**Solution:**
1. Check MONGODB_URI in Railway
2. MongoDB Atlas → Network Access
3. Add `0.0.0.0/0` (allow all IPs)
4. Or add Railway's IP addresses

#### 3. Build Failed

**Error:** `Build failed with exit code 1`

**Solution:**
```bash
# Check package.json scripts
"scripts": {
  "build": "vite build",
  "server": "node server/index.js"
}

# Ensure all dependencies are in package.json
npm install

# Test build locally
npm run build
```

#### 4. Environment Variables Not Working

**Solution:**
1. Verify variables in dashboard
2. Restart service after adding variables
3. Use correct prefix (VITE_ for frontend)
4. Check for typos

#### 5. 404 on API Routes

**Solution:**
```javascript
// Ensure backend routes are correct
// server/index.js
app.use('/api/auth', require('./routes/auth.routes'));

// Frontend API URL should include /api
const API_BASE_URL = 'https://quiz-app.railway.app/api';
```

#### 6. Assets Not Loading

**Solution:**
```javascript
// Use relative paths
// Good: /assets/images/avatar.png
// Bad: ./assets/images/avatar.png

// Or use absolute URLs
const ASSET_URL = import.meta.env.PROD
  ? 'https://quiz-app.vercel.app/assets'
  : '/assets';
```

---

## Deployment Checklist

### Pre-Deployment

- [ ] Code tested locally
- [ ] All features working
- [ ] No console errors
- [ ] Environment variables ready
- [ ] Database seeded
- [ ] Git repository clean

### Backend Deployment

- [ ] Railway/Render project created
- [ ] Environment variables set
- [ ] Build successful
- [ ] Health check returns 200
- [ ] API endpoints working

### Frontend Deployment

- [ ] API URL configured
- [ ] Vercel project created
- [ ] Build successful
- [ ] Site accessible
- [ ] Can register/login
- [ ] Can take quiz

### Post-Deployment

- [ ] Test all features
- [ ] Check mobile responsiveness
- [ ] Verify HTTPS working
- [ ] Test on multiple browsers
- [ ] Monitor for errors
- [ ] Document production URLs

---

## Production URLs

### Save These URLs

```
Frontend (Vercel):
https://quiz-app-username.vercel.app

Backend (Railway):
https://quiz-app.railway.app

API Base URL:
https://quiz-app.railway.app/api

MongoDB Atlas:
mongodb+srv://...

Admin Panel (if any):
https://quiz-app.railway.app/admin
```

---

## Cost Breakdown

### Free Tier Limits

| Service | Free Tier | Limits |
|---------|-----------|--------|
| Vercel | ✅ Free | Unlimited bandwidth, 100 GB/month |
| Railway | $5/month credit | ~500 hours/month |
| Render | ✅ Free | 750 hours/month, sleeps after 15 mins |
| MongoDB Atlas | ✅ Free | 512 MB storage |

**Total Cost: $0/month** (using free tiers)

**Recommended for Production:**
- Railway Pro: $20/month (no sleep, more resources)
- MongoDB Atlas M2: $9/month (2GB storage)

---

## Next Steps

### After Deployment

1. **Monitor Performance**
   - Check logs daily
   - Watch for errors
   - Monitor response times

2. **Gather Feedback**
   - Share with test users
   - Fix reported bugs
   - Iterate on features

3. **Documentation**
   - Document production URLs
   - Write user manual
   - Create admin guide

4. **Backup Plan**
   - Regular database backups
   - Code backups in Git
   - Environment variables saved

---

<div align="center">

## 🎉 Congratulations!

Your Quiz App is now live in production!

**Next:** Create amazing demos and present your project! 🚀

</div>
