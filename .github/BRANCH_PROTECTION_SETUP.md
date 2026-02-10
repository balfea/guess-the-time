# Quick Guide: Enable Branch Protection

You're seeing a warning that your main branch isn't protected. Here's how to fix it:

## ⚡ Quick Fix - Manual Setup (2 minutes)

**This is the simplest approach and doesn't require any tokens:**

1. **Go to Repository Settings:**
   - Visit: https://github.com/balfea/guess-the-time/settings/rules
   
2. **Create a new ruleset:**
   - Click **"New ruleset"** → **"New branch ruleset"**
   
3. **Configure the ruleset:**
   - **Ruleset name:** `Main Branch Protection - Owner Only`
   - **Enforcement status:** Active
   - **Target branches:** 
     - Click "Add target" → "Include by pattern"
     - Add pattern: `main`
     - Click "Add target" again and add: `master`
   
4. **Enable these protections:**
   - ✅ Restrict deletions
   - ✅ Require a pull request before merging
     - Set "Required approvals" to: 1
     - ✅ Check "Require review from Code Owners"
     - ✅ Check "Dismiss stale pull request approvals when new commits are pushed"
   - ✅ Require linear history
   - ✅ Block force pushes
   
5. **Set bypass permissions (optional):**
   - Under "Bypass list", click "Add bypass"
   - Select "Repository admin" (allows you to bypass if needed)
   
6. **Click "Create"** at the bottom

**Done!** Your main branch is now protected. ✅

## 🤖 Alternative: Automated Setup (requires PAT)

If you prefer automation, you can use the GitHub Actions workflow:

### Step 1: Create a Fine-Grained PAT

1. Go to: https://github.com/settings/tokens?type=beta
2. Click **"Generate new token"**
3. Configure:
   - **Token name:** Branch Protection Automation
   - **Resource owner:** Select your username
   - **Repository access:** Only select repositories → Choose `guess-the-time`
   - **Permissions:**
     - Administration: **Read and write**
4. Click **"Generate token"** and copy the token (starts with `github_pat_`)

### Step 2: Add the Token as a Secret

1. Go to: https://github.com/balfea/guess-the-time/settings/secrets/actions
2. Click **"New repository secret"**
3. Name: `BRANCH_PROTECTION_PAT`
4. Value: Paste your token
5. Click **"Add secret"**

### Step 3: Run the Workflow

1. Go to: https://github.com/balfea/guess-the-time/actions/workflows/apply-branch-protection.yml
2. Click **"Run workflow"** → Select `main` branch → Click **"Run workflow"**
3. Wait ~30 seconds for completion ✅

## 🛡️ What This Protection Does

Once enabled, the main branch will be protected with these rules:

- **Pull Request Required:** All changes must go through a pull request
- **Review Required:** At least 1 approval needed before merging
- **No Force Pushes:** Prevents rewriting history
- **No Deletion:** Branch cannot be deleted
- **Linear History:** Keeps commit history clean

**Important:** As the repository owner/admin, you can still bypass these rules if you add yourself to the bypass list during setup.

## ✅ Verify Protection is Active

After setup, verify your branch is protected:
1. Go to: https://github.com/balfea/guess-the-time/settings/rules
2. You should see **"Main Branch Protection - Owner Only"** with status **Active**
3. The warning message should disappear from your repository home page

## 🔧 Troubleshooting

**Using the automated workflow and it failed?**
- Check that you created the PAT with "Administration: Read and write" permission
- Make sure the secret is named exactly `BRANCH_PROTECTION_PAT`
- Verify the token hasn't expired
- Try the manual setup method above instead

**Manual setup - don't see the options?**
- Make sure you have admin/owner access to the repository
- Navigate to Settings → Rules (in the left sidebar under "Code and automation")

**Still seeing the warning after setup?**
- It can take a few minutes for GitHub to update
- Try refreshing the page
- The ruleset must be set to "Active" (not "Disabled" or "Evaluate")
- It can take a few minutes for GitHub to update
- Try refreshing the page
- Check Settings → Rules → Rulesets to confirm it's active

## 📚 More Information

For detailed documentation on the branch protection configuration, see:
- [Ruleset Configuration Details](.github/rulesets/README.md)
- [Branch Protection JSON](.github/rulesets/branch-protection.json)

---

**Questions?** Check the [Security Documentation](.github/SECURITY.md) or open an issue.
