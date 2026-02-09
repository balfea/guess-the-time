# Railway.com Setup Checklist

**Important:** This repository is configured and ready for Railway.com deployment, but YOU need to connect it to your Railway account. I (the AI assistant) cannot access your Railway.com account or perform this connection for you.

## What's Already Done ✅

- ✅ Repository has `server.js` with proper Express setup
- ✅ `package.json` configured with correct start script
- ✅ `railway.json` configuration file added
- ✅ CORS configured for GitHub Pages (`https://balfea.github.io`)
- ✅ Environment variable support via `.env` and `dotenv`
- ✅ `.gitignore` excludes secrets (`.env` file)
- ✅ Comprehensive deployment guide (`RAILWAY_DEPLOYMENT.md`)

## What YOU Need to Do 🎯

Follow these steps to connect your Railway.com account to this repository:

### Step 1: Log in to Railway.com ⚡

1. Go to https://railway.app/
2. Click "Login" or "Start a New Project"
3. **Select "Login with GitHub"** (Important: Use your GitHub account `balfea`)
4. Authorize Railway to access your GitHub repositories

### Step 2: Create New Project 🚀

Once logged in to Railway:

1. Click **"New Project"** button
2. Select **"Deploy from GitHub repo"**
3. You should see a list of your repositories
4. Find and select **`balfea/guess-the-time`**
5. Click to deploy

### Step 3: Railway Auto-Detection 🔍

Railway will automatically:
- ✅ Detect this is a Node.js project
- ✅ Find `package.json`
- ✅ Use `npm start` command (from package.json)
- ✅ Assign a public URL (like `https://guess-the-time-production.up.railway.app`)

### Step 4: Configure Environment Variables 🔐

**Critical:** Set these environment variables in Railway dashboard:

1. In Railway dashboard, click your deployed service
2. Go to **"Variables"** tab
3. Click **"New Variable"** for each:

| Variable | How to Generate | Example Value |
|----------|----------------|---------------|
| `ADMIN_PASSWORD_HASH` | `node -e "console.log(require('bcryptjs').hashSync('YOUR_PASSWORD', 10))"` | `$2a$10$abc...xyz` |
| `JWT_SECRET` | `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"` | `NpBIp0r...8/w=` |

4. Click **"Save"** - Railway will automatically redeploy

### Step 5: Get Your Railway URL 🌐

**Your Railway project is named: `illustrious-love`**

To find your deployment URL:

1. In Railway dashboard, click on your project **"illustrious-love"**
2. Click on your service (usually the repository name: "guess-the-time")
3. **Look at the top of the page** - you should see your public URL displayed
4. If no URL is shown:
   - Click the **"Settings"** tab (gear icon)
   - Scroll down to find **"Networking"** or **"Public Networking"** section
   - Click **"Generate Domain"** button to create a public URL
5. Copy your Railway URL (e.g., `https://illustrious-love-production.up.railway.app`)

### Step 6: Update GitHub Pages Configuration 📝

Now connect GitHub Pages to your Railway backend:

1. Edit `time-grid-board.html` in this repository
2. Find line ~391 where it says:
   ```javascript
   const RAILWAY_BACKEND_URL = 'https://illustrious-love-production.up.railway.app';
   ```
3. **Verify or update** with your actual Railway URL from Step 5
4. Commit and push to GitHub:
   ```bash
   git add time-grid-board.html
   git commit -m "Connect to Railway.com backend"
   git push
   ```

### Step 7: Test Everything 🧪

1. Wait for GitHub Pages to rebuild (1-2 minutes)
2. Visit: https://balfea.github.io/guess-the-time/time-grid-board.html
3. Click **"Admin Login"**
4. Enter your admin password
5. Verify you can successfully log in and use admin features

## Verification Checklist ✓

Use this to verify your Railway connection:

- [ ] I have logged into Railway.com with my GitHub account
- [ ] I have created a new Railway project
- [ ] I have selected the `balfea/guess-the-time` repository
- [ ] Railway has successfully deployed the app
- [ ] I have set `ADMIN_PASSWORD_HASH` environment variable
- [ ] I have set `JWT_SECRET` environment variable
- [ ] I have copied my Railway URL
- [ ] I have updated `time-grid-board.html` with the Railway URL
- [ ] I have committed and pushed the changes
- [ ] GitHub Pages has rebuilt with the changes
- [ ] Admin login works on the GitHub Pages site
- [ ] I can reserve/edit squares as admin

## Troubleshooting 🔧

### "I don't see my repository in Railway"

- Make sure you logged in with GitHub
- Railway may need permission - go to GitHub Settings → Applications → Railway
- Grant access to the `balfea/guess-the-time` repository

### "Railway deployment failed"

- Check Railway logs in the "Deployments" tab
- Verify `package.json` has all dependencies
- Ensure Node.js version is compatible (Railway uses latest stable)

### "CORS errors in browser console"

- Verify `server.js` includes `https://balfea.github.io` in CORS origins
- Check Railway logs for incoming requests
- Ensure Railway URL is correct in `time-grid-board.html`

### "Admin login doesn't work"

- Double-check environment variables in Railway
- Verify password hash was generated correctly
- Check Railway logs for authentication errors
- Test the `/login` endpoint directly: `https://your-railway-url.up.railway.app/login`

## Railway Dashboard Quick Links 🔗

After connecting, you can manage your deployment at:
- **Railway Dashboard**: https://railway.app/dashboard
- **Project Settings**: https://railway.app/project/[your-project-id]
- **Logs**: Available in the "Deployments" tab of your service

## Need Help? 💬

- [Railway Documentation](https://docs.railway.app/)
- [Railway Discord](https://discord.gg/railway)
- [Railway Status](https://status.railway.app/)
- This repository's [Deployment Guide](RAILWAY_DEPLOYMENT.md)

---

## Important Notes ⚠️

1. **I (AI assistant) cannot connect Railway.com for you** - It requires your authentication
2. **Environment variables are stored securely in Railway** - Never commit them to Git
3. **Railway free tier** - Check current limits at https://railway.app/pricing
4. **Auto-deploys** - Railway automatically redeploys when you push to GitHub
5. **Custom domains** - You can add custom domains in Railway settings

**Once you complete these steps, your Railway.com account will be connected to this repository!** 🎉
