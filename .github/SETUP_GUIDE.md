# Complete Setup Guide: Merge PR & Configure GitHub Protections

This guide will walk you through merging the repository protection PR and then manually configuring all the GitHub protections.

---

## Part 1: Merge the PR

### Step 1: Navigate to the Pull Request

1. Go to: https://github.com/balfea/guess-the-time/pulls
2. Find the PR titled "Add repository protection rules and security documentation"
3. Click on it to open the PR details

### Step 2: Review the Changes

Before merging, review the files changed:
- `.github/CODEOWNERS` - Code ownership configuration
- `.github/rulesets/branch-protection.json` - Ruleset template
- `.github/rulesets/README.md` - Ruleset setup instructions
- `.github/SECURITY.md` - Comprehensive security guide
- `README.md` - Updated with security section

### Step 3: Merge the PR

**Option A: Web UI Merge (Recommended)**
1. Scroll to the bottom of the PR page
2. Click the green **"Merge pull request"** button
3. Optionally add a merge commit message
4. Click **"Confirm merge"**
5. Optionally click **"Delete branch"** to clean up the PR branch

**Option B: Command Line Merge (Advanced)**
```bash
# Switch to main branch
git checkout main

# Pull latest changes
git pull origin main

# Merge the PR branch
git merge copilot/add-ruleset-restrictions

# Push to GitHub
git push origin main

# Delete the branch (optional)
git branch -d copilot/add-ruleset-restrictions
git push origin --delete copilot/add-ruleset-restrictions
```

### Step 4: Verify the Merge

1. Go to the main repository page: https://github.com/balfea/guess-the-time
2. Check that the `.github` directory now exists in the file list
3. Click on `.github/CODEOWNERS` to verify it's present

✅ **Part 1 Complete!** The CODEOWNERS file is now active.

---

## Part 2: Configure Branch Protection Rules

### Step 1: Access Branch Settings

1. Go to your repository: https://github.com/balfea/guess-the-time
2. Click **Settings** (top menu)
3. In the left sidebar, click **Branches** (under "Code and automation")

### Step 2: Add Branch Protection Rule

1. Click **"Add branch protection rule"** (or "Add rule")
2. In **Branch name pattern**, enter: `main`
   - If your default branch is `master`, enter `master` instead

### Step 3: Configure Protection Settings

Enable the following settings (check each box):

#### ✅ **Require a pull request before merging**
- Check this box
- Then configure these sub-options:
  - **Required number of approvals before merging**: `1`
  - ✅ **Dismiss stale pull request approvals when new commits are pushed**
  - ✅ **Require review from Code Owners** (This enforces the CODEOWNERS file)

#### ✅ **Require status checks to pass before merging**
- Check this box (even if you have no status checks yet)
- This enables future CI/CD integration

#### ✅ **Require conversation resolution before merging**
- Check this box
- Ensures all PR comments are addressed

#### ✅ **Require signed commits**
- Check this box (recommended for security)
- You'll need to set up GPG signing for your commits

#### ✅ **Require linear history**
- Check this box
- Prevents merge commits, keeping history clean

#### ✅ **Include administrators**
- **UNCHECK this box** (leave it unchecked)
- This allows you (as admin) to bypass rules in emergencies

#### ❌ **Allow force pushes**
- Leave this **UNCHECKED** (disabled)
- Prevents destructive force pushes

#### ❌ **Allow deletions**
- Leave this **UNCHECKED** (disabled)
- Prevents branch deletion

### Step 4: Restrict Push Access (Important!)

Scroll down to **"Restrict who can push to matching branches"**

1. ✅ Check **"Restrict pushes that create matching branches"**
2. Click **"Add" → "Search for people, teams, or apps"**
3. Select: **"Repository administrators"** or your username
4. This ensures only you can push to the protected branch

### Step 5: Save the Rule

1. Scroll to the bottom
2. Click **"Create"** (or "Save changes")
3. You should see a confirmation message

✅ **Branch Protection is now active!**

---

## Part 3: Create GitHub Ruleset

GitHub Rulesets are a newer, more flexible alternative to branch protection rules. You can use both together.

### Step 1: Access Rulesets

1. Go to your repository: https://github.com/balfea/guess-the-time
2. Click **Settings**
3. In the left sidebar, click **Rules** → **Rulesets** (under "Code and automation")

### Step 2: Create New Ruleset

1. Click **"New ruleset"** → **"New branch ruleset"**
2. **Ruleset Name**: Enter `Main Branch Protection - Owner Only`
3. **Enforcement status**: Select **"Active"**

### Step 3: Configure Target Branches

1. Under **"Target branches"**, click **"Add target"**
2. Select **"Include by pattern"**
3. Enter: `main` (or `master` if that's your default branch)
4. Click **"Add inclusion pattern"**
5. Optionally add both patterns if you want to protect multiple branches

### Step 4: Configure Branch Protections

Enable the following rules (check each box):

#### ✅ **Require a pull request before merging**
- Check this box
- **Required approvals**: `1`
- ✅ **Dismiss stale pull request approvals when new commits are pushed**
- ✅ **Require review from Code Owners**

#### ✅ **Require status checks to pass**
- Check this box
- Leave the status checks list empty for now (or add CI checks if you have them)

#### ✅ **Block force pushes**
- Check this box

#### ✅ **Require linear history**
- Check this box

### Step 5: Configure Bypass Permissions

1. Under **"Bypass list"**, click **"Add bypass"**
2. Select **"Repository admin"**
3. This allows you to bypass rules in emergencies

### Step 6: Create the Ruleset

1. Review all settings
2. Click **"Create"** at the bottom
3. You should see the ruleset listed as "Active"

✅ **GitHub Ruleset is now active!**

---

## Part 4: Verification & Testing

### Test 1: Verify CODEOWNERS is Active

1. Create a test file in a new branch:
   ```bash
   git checkout -b test-codeowners
   echo "test" > test.txt
   git add test.txt
   git commit -m "Test CODEOWNERS"
   git push origin test-codeowners
   ```

2. Open a PR for this branch on GitHub
3. **Expected Result**: You should see yourself (@balfea) automatically added as a reviewer

4. Clean up:
   ```bash
   git checkout main
   git branch -D test-codeowners
   git push origin --delete test-codeowners
   ```

### Test 2: Verify Branch Protection

Try to push directly to main (this should fail):
```bash
git checkout main
echo "test" >> README.md
git add README.md
git commit -m "Test protection"
git push origin main
```

**Expected Result**: Push should be rejected with a message about branch protection

Undo the test:
```bash
git reset --hard HEAD~1
```

### Test 3: Verify PR Approval Requirement

1. Create a test branch and PR
2. Try to merge the PR without approval
3. **Expected Result**: Merge button should be disabled or require approval

### Test 4: Verify Code Owner Approval

If you add a collaborator:
1. Have them create a PR
2. Try to merge without your approval
3. **Expected Result**: Should require your approval to merge

---

## Part 5: Additional Security Settings

### Enable Two-Factor Authentication (2FA)

1. Click your profile picture → **Settings**
2. Click **Password and authentication** (left sidebar)
3. Under **Two-factor authentication**, click **"Enable two-factor authentication"**
4. Follow the setup wizard

### Review Repository Access

1. Go to repository **Settings** → **Collaborators and teams**
2. Review who has access
3. Ensure collaborators have appropriate permission levels:
   - **Read**: Can view and clone the repository
   - **Write**: Can push to branches (but not protected branches)
   - **Admin**: Full control (be careful who has this!)

### Enable Dependency Alerts

1. Go to repository **Settings** → **Code security and analysis**
2. Enable:
   - ✅ **Dependency graph**
   - ✅ **Dependabot alerts**
   - ✅ **Dependabot security updates**

### Enable Secret Scanning

1. In **Settings** → **Code security and analysis**
2. Enable:
   - ✅ **Secret scanning**
   - ✅ **Push protection** (prevents secrets from being committed)

---

## Checklist: Complete Setup

Use this checklist to track your progress:

### Merge PR
- [ ] PR reviewed and understood
- [ ] PR merged successfully
- [ ] `.github/CODEOWNERS` file exists in repository
- [ ] `.github/SECURITY.md` file exists in repository

### Branch Protection
- [ ] Branch protection rule created for `main` branch
- [ ] Pull requests required
- [ ] Code owner review required
- [ ] Force pushes blocked
- [ ] Branch deletion blocked
- [ ] Linear history required
- [ ] Signed commits required (optional but recommended)
- [ ] Push restrictions configured

### GitHub Ruleset
- [ ] Ruleset created and active
- [ ] Target branches configured
- [ ] Pull request rules enabled
- [ ] Force push blocking enabled
- [ ] Admin bypass configured

### Testing
- [ ] CODEOWNERS automatically adds you as reviewer
- [ ] Direct pushes to `main` are blocked
- [ ] PRs require approval before merging
- [ ] Protection rules are enforced

### Additional Security
- [ ] Two-factor authentication enabled
- [ ] Repository access reviewed
- [ ] Dependency alerts enabled
- [ ] Secret scanning enabled

---

## Troubleshooting

### Issue: "I can't push to main even as admin"

**Solution**: Branch protection is working correctly. Use a branch and PR instead:
```bash
git checkout -b my-feature
# make changes
git push origin my-feature
# Then create a PR on GitHub
```

If you need to bypass in an emergency:
- Temporarily disable branch protection in Settings → Branches
- Make your changes
- Re-enable protection immediately

### Issue: "CODEOWNERS not adding me as reviewer"

**Possible causes**:
1. The CODEOWNERS file hasn't been merged to main yet
2. The username in CODEOWNERS doesn't match your GitHub username
3. Branch protection "Require review from Code Owners" is not enabled

**Solution**: Verify the CODEOWNERS file contains `* @balfea` and branch protection is configured

### Issue: "Ruleset not applying"

**Possible causes**:
1. Ruleset is set to "Disabled" instead of "Active"
2. Target branches pattern doesn't match your branch name
3. Branch protection and ruleset have conflicting settings

**Solution**: Check ruleset status and target pattern in Settings → Rules → Rulesets

### Issue: "Merge button is disabled but I approved the PR"

**Possible causes**:
1. You approved your own PR (some settings require approval from others)
2. There are unresolved conversations
3. Status checks are failing

**Solution**: Check the PR status indicators for specific requirements

---

## Quick Reference

### Important Links
- Repository: https://github.com/balfea/guess-the-time
- Settings: https://github.com/balfea/guess-the-time/settings
- Branches: https://github.com/balfea/guess-the-time/settings/branches
- Rulesets: https://github.com/balfea/guess-the-time/settings/rules

### Key Configuration Files
- `.github/CODEOWNERS` - Code ownership (active immediately after merge)
- `.github/rulesets/branch-protection.json` - Ruleset template (manual configuration required)
- `.github/SECURITY.md` - Comprehensive security documentation
- `.github/rulesets/README.md` - Detailed ruleset instructions

### Who Can Do What (After Setup)
- **You (Repository Owner/Admin)**:
  - ✅ Can approve and merge PRs
  - ✅ Can bypass protection rules (if configured)
  - ✅ Can modify protection settings
  
- **Collaborators with Write Access**:
  - ✅ Can create branches and PRs
  - ❌ Cannot push directly to `main`
  - ❌ Cannot merge without your approval
  - ❌ Cannot force push or delete branches

- **Collaborators with Read Access**:
  - ✅ Can view and clone repository
  - ✅ Can fork and create PRs from their fork
  - ❌ Cannot push to any branch

---

## Need Help?

If you encounter issues not covered in this guide:

1. Check the detailed documentation:
   - `.github/SECURITY.md` - Security guide
   - `.github/rulesets/README.md` - Ruleset setup guide

2. GitHub Documentation:
   - [Branch Protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches)
   - [Repository Rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets)
   - [CODEOWNERS](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)

3. Common scenarios:
   - Making emergency changes: Temporarily disable protection → change → re-enable
   - Adding collaborators: Settings → Collaborators → Add people
   - Reviewing audit log: Settings → Audit log

---

## Success Indicators

You'll know everything is set up correctly when:

1. ✅ You see the `.github` directory in your repository
2. ✅ New PRs automatically add you as a reviewer
3. ✅ Direct pushes to `main` are rejected
4. ✅ PRs show "Review required" status
5. ✅ You see the protection rules listed in Settings → Branches
6. ✅ You see an active ruleset in Settings → Rules → Rulesets

---

**🎉 Congratulations!** Once you complete this guide, your repository will be fully protected with industry-standard security practices!
