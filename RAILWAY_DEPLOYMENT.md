# Railway.com Deployment Guide

This guide explains how to deploy the `server.js` backend to Railway.com to enable admin functionality for the GitHub Pages site at `https://balfea.github.io/guess-the-time/time-grid-board.html`.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     GitHub Pages (Static)                   │
│         https://balfea.github.io/guess-the-time/            │
│                   time-grid-board.html                      │
│                                                             │
│  - Displays game board                                      │
│  - Stores reservations in localStorage                      │
│  - Admin button makes API calls ──────────┐                │
└───────────────────────────────────────────┼────────────────┘
                                            │
                                            │ HTTPS
                                            │
                                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   Railway.com (Backend)                     │
│         https://your-app.up.railway.app                     │
│                                                             │
│  - Node.js server running server.js                        │
│  - Handles admin authentication                            │
│  - Environment variables for secrets:                      │
│    • ADMIN_PASSWORD_HASH                                   │
│    • JWT_SECRET                                            │
│    • PORT (auto-set by Railway)                           │
│                                                             │
│  API Endpoints:                                            │
│  POST /login   - Admin authentication                      │
│  POST /verify  - Token verification                        │
│  POST /reset   - Reset all reservations                    │
└─────────────────────────────────────────────────────────────┘
```

## Why Railway.com?

Railway.com is perfect for this project because:
- ✅ **Free tier available** - Great for small projects
- ✅ **Environment variables** - Securely store `ADMIN_PASSWORD_HASH` and `JWT_SECRET`
- ✅ **Automatic HTTPS** - Secure by default
- ✅ **Easy deployment** - Deploy directly from GitHub
- ✅ **Auto-redeploy** - Updates automatically when you push changes

## Prerequisites

1. A [Railway.com](https://railway.app/) account (free to create)
2. This GitHub repository
3. Admin password and JWT secret ready

## Step 1: Prepare Your Secrets

Before deploying, generate your secure secrets:

### Generate Password Hash

Run this locally to create a bcrypt hash of your admin password:

```bash
node -e "console.log(require('bcryptjs').hashSync('YOUR_PASSWORD_HERE', 10))"
```

**Example output:** `$2a$10$abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJ`

### Generate JWT Secret

Generate a secure random JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Example output:** `NpBIp0rKg2S6NuC7xX/FhX5w0cik9bG80pFqUIJ/8/w=`

⚠️ **Important:** Save these values - you'll need them in Step 3!

## Step 2: Deploy to Railway

### Option A: Deploy from GitHub (Recommended)

1. **Log in to Railway.com**
   - Go to https://railway.app/
   - Sign in with your GitHub account

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `balfea/guess-the-time`
   - Railway will automatically detect it's a Node.js project

3. **Railway Auto-Configuration**
   - Railway will automatically:
     - Detect `package.json`
     - Install dependencies with `npm install`
     - Start server with `npm start` (which runs `node server.js`)
     - Assign a public URL like `https://your-app-name.up.railway.app`

### Option B: Deploy with Railway CLI

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Link to your project
railway link

# Deploy
railway up
```

## Step 3: Configure Environment Variables

After deployment, set your environment variables:

1. **In Railway Dashboard:**
   - Go to your project
   - Click on your service
   - Go to "Variables" tab
   - Click "New Variable"

2. **Add these variables:**

   | Variable Name | Value | Example |
   |--------------|-------|---------|
   | `ADMIN_PASSWORD_HASH` | Your bcrypt hash from Step 1 | `$2a$10$abc...` |
   | `JWT_SECRET` | Your JWT secret from Step 1 | `NpBIp0r...` |
   | `PORT` | Auto-set by Railway | `3000` (Railway sets this) |

3. **Save and Deploy**
   - Click "Deploy" or railway will auto-redeploy with new variables

## Step 4: Get Your Railway URL

After deployment:

1. Go to your Railway project dashboard
2. Click on your service
3. Go to "Settings" tab
4. Under "Domains", you'll see your public URL
5. Copy the URL (e.g., `https://guess-the-time-production.up.railway.app`)

## Step 5: Update GitHub Pages Configuration

Now connect your GitHub Pages site to the Railway backend:

1. **Edit `time-grid-board.html`** in your repository:

   Find this section (around line 373):
   ```javascript
   const API_BASE_URL = window.location.hostname.includes('github.io') 
       ? ''  // TODO: Set your server URL here for GitHub Pages deployment
       : '';
   ```

2. **Replace with your Railway URL:**
   ```javascript
   const API_BASE_URL = window.location.hostname.includes('github.io') 
       ? 'https://guess-the-time-production.up.railway.app'  // Your Railway URL
       : '';
   ```

3. **Commit and push** to GitHub:
   ```bash
   git add time-grid-board.html
   git commit -m "Configure Railway.com backend URL"
   git push
   ```

4. **Wait for GitHub Pages** to rebuild (1-2 minutes)

## Step 6: Test Your Deployment

1. **Visit your GitHub Pages site:**
   - Go to https://balfea.github.io/guess-the-time/time-grid-board.html

2. **Click "Admin Login"**
   - Enter your admin password
   - You should successfully log in!

3. **Verify admin features work:**
   - ✅ Admin mode activates
   - ✅ Can click on grid cells
   - ✅ Can reserve/edit squares
   - ✅ Reset button works

## Troubleshooting

### CORS Errors

If you see CORS errors in the browser console:

1. **Update `server.js`** to include your Railway domain:

   ```javascript
   app.use(cors({
     origin: [
       'https://balfea.github.io',
       'http://localhost:3000',
       'http://127.0.0.1:3000',
       'https://guess-the-time-production.up.railway.app'  // Add Railway URL
     ],
     credentials: true
   }));
   ```

2. Commit and push - Railway will auto-redeploy

### Login Fails

- **Check environment variables** in Railway dashboard
- **Verify password hash** is correct
- **Check Railway logs** in the dashboard under "Deployments" → "View Logs"

### Server Not Responding

- Check Railway deployment status in dashboard
- Verify the service is running (should show green/healthy)
- Check logs for errors

## Cost & Limits

**Railway Free Tier:**
- ✅ $5 free credit per month
- ✅ Enough for small projects like this
- ✅ Automatic sleep after inactivity (wakes on request)
- ✅ 500 hours of usage included

**If you exceed limits:**
- Upgrade to Hobby plan ($5/month)
- Or use Railway's pay-as-you-go pricing

## Security Best Practices

✅ **Never commit secrets to Git**
- Use Railway's environment variables
- Keep `.env` in `.gitignore`

✅ **Use strong passwords**
- Generate random admin passwords
- Use bcrypt hash (not plain text)

✅ **Use secure JWT secret**
- Generate random 32+ byte secret
- Never reuse secrets across projects

✅ **Enable Railway's security features**
- Use HTTPS URLs only
- Enable 2FA on your Railway account

## Updating Your Deployment

When you make changes to `server.js`:

1. Commit and push to GitHub
2. Railway auto-detects the change
3. Automatically rebuilds and redeploys
4. No manual steps needed! 🎉

## Alternative Deployment Options

If Railway.com doesn't work for you:

- **Heroku** - Similar to Railway, has free tier
- **Render** - Free tier with auto-sleep
- **Fly.io** - Good free tier, global deployment
- **DigitalOcean App Platform** - $5/month
- **AWS Lambda + API Gateway** - Serverless option
- **Vercel/Netlify Functions** - For serverless endpoints

Each requires updating `API_BASE_URL` in `time-grid-board.html` with the deployed URL.

## Support

Need help? Check:
- [Railway Documentation](https://docs.railway.app/)
- [Railway Discord Community](https://discord.gg/railway)
- This repo's GitHub Issues

---

**You're all set!** 🚀 Your admin functionality should now work seamlessly with GitHub Pages + Railway.com backend.
