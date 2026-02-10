# guess-the-time

Quick dev server for GuessTheTime

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment** - Create `.env` file with admin password:
   ```bash
   cp .env.example .env
   # Edit .env and set ADMIN_PASSWORD or generate a bcrypt hash for ADMIN_PASSWORD_HASH
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Open in browser**
   - Local: http://localhost:3000/time-grid-board.html
   - GitHub Pages: https://balfea.github.io/guess-the-time/time-grid-board.html

## 🌐 Deployment

### Railway.com Deployment (Recommended)

**Want admin functionality on your GitHub Pages site?** Deploy the backend to Railway.com!

👉 **[Railway Setup Checklist](RAILWAY_SETUP_CHECKLIST.md)** - Step-by-step connection guide (YOU need to do this)

👉 **[Complete Railway.com Deployment Guide](RAILWAY_DEPLOYMENT.md)** - Detailed technical documentation

**Why Railway.com?**
- ✅ Free tier available
- ✅ Secure environment variables for passwords
- ✅ Automatic HTTPS
- ✅ Auto-deploy from GitHub
- ✅ Easy setup (5-10 minutes)

**Important:** An AI assistant cannot connect Railway.com to your GitHub account. You must log in to Railway.com yourself with your GitHub credentials and authorize the connection.

The setup checklist covers:
- Logging in to Railway.com with your GitHub account
- Creating a new project from this repository
- Configuring environment variables
- Connecting to GitHub Pages
- Verification steps

## Enabling GitHub Pages

To enable GitHub Pages for this repository:

1. Go to repository Settings → Pages
2. Set Source to "Deploy from a branch"
3. Select `main` branch and `/ (root)` folder
4. Click "Save"
5. Wait 1-2 minutes for deployment

Your site will be published at: https://balfea.github.io/guess-the-time/time-grid-board.html

**Note:** The HTML file is maintained in both locations:
- `public/time-grid-board.html` - For local development with Express server
- `time-grid-board.html` - For GitHub Pages deployment

## Repository Protection

⚠️ **IMPORTANT:** If you see a warning "Your main branch isn't protected", follow the **[Branch Protection Setup Guide](.github/BRANCH_PROTECTION_SETUP.md)** to enable it in 2 minutes via GitHub Actions.

This repository is protected with GitHub rulesets and code ownership rules to prevent unauthorized modifications.

### 🚀 Quick Setup Guides

- **[🛡️ Branch Protection Setup](.github/BRANCH_PROTECTION_SETUP.md)** - **START HERE** to enable branch protection
- **[Quick Start](.github/QUICKSTART.md)** - 5-minute fast track setup
- **[Complete Setup Guide](.github/SETUP_GUIDE.md)** - Detailed step-by-step instructions
- **[Setup Checklist](.github/CHECKLIST.md)** - Track your progress
- **[Security Documentation](.github/SECURITY.md)** - Comprehensive security guide
- **[Ruleset Details](.github/rulesets/README.md)** - GitHub ruleset configuration

### 🔒 Protection Features

- ✅ All changes require pull requests with code owner approval
- ✅ Direct pushes to main branch are blocked
- ✅ Force pushes and branch deletion prevented
- ✅ @balfea automatically added as reviewer on all PRs
