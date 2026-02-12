# guess-the-time

Quick dev server for GuessTheTime

## 🚀 Quick Start

1. Install dependencies

```bash
npm install
```

2. Create a `.env` file (or export env vars) with a real admin password or hash:

```bash
cp .env.example .env
# Option A (development): set ADMIN_PASSWORD in .env
# Option B (recommended): generate a bcrypt hash and set ADMIN_PASSWORD_HASH
# Example (generate hash locally):
node -e "console.log(require('bcryptjs').hashSync(process.argv[1], 10))" your_password
# then paste the generated string into ADMIN_PASSWORD_HASH in .env
```

3. Start the server

```bash
npm start
```

4. Open in browser:

Local development server:
http://localhost:3000/time-grid-board.html

GitHub Pages (when enabled):
https://balfea.github.io/guess-the-time/time-grid-board.html

Notes:
- Keep `server.js` and your `.env` on the server (don't commit secrets).
- Use `ADMIN_PASSWORD_HASH` with a bcrypt hash when possible. The README includes a command to generate the hash locally.

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

### Current Status
⚠️ **Important**: The `time-grid-board.html` file has been added to this repository in Pull Request #5, but it's currently only on the feature branch. **The file will return a 404 error on GitHub Pages until PR #5 is merged into the `main` branch.**

### Steps to Fix the 404 Error

**Step 1: Merge the Pull Request**
1. Go to [Pull Request #5](https://github.com/balfea/guess-the-time/pull/5)
2. Review the changes (HTML file moved to root directory)
3. Approve and merge the PR into `main`

**Step 2: Verify GitHub Pages Configuration**
1. Go to your repository Settings on GitHub
2. Navigate to "Pages" in the left sidebar
3. Verify "Source" is set to "Deploy from a branch"
4. Verify it's configured to use the `main` branch and `/ (root)` folder
5. If not configured, select these options and click "Save"

**Step 3: Wait for Deployment**
- After merging, GitHub Pages will automatically rebuild (takes 1-2 minutes)
- Your site will be published at: https://balfea.github.io/guess-the-time/time-grid-board.html

### File Locations
After the PR is merged, the HTML file will be available in both:
- The `public/` folder (for local development with the Express server)
- The root folder (for GitHub Pages deployment)

## Repository Protection

This repository is protected with GitHub rulesets and code ownership rules to prevent unauthorized modifications.

### 🚀 Quick Setup Guides

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
