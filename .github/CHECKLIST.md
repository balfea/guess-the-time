# Setup Completion Checklist

Use this checklist to track your progress setting up repository protections.

---

## Phase 1: Merge the PR

- [ ] Navigated to https://github.com/balfea/guess-the-time/pulls
- [ ] Reviewed the PR changes
- [ ] Clicked "Merge pull request"
- [ ] Clicked "Confirm merge"
- [ ] Verified `.github/CODEOWNERS` exists in repository
- [ ] Verified `.github/SECURITY.md` exists in repository
- [ ] Optionally deleted the PR branch

**Status:** ⬜ Not Started | 🔄 In Progress | ✅ Complete

---

## Phase 2: Configure Branch Protection

### Access Settings
- [ ] Went to repository Settings
- [ ] Clicked on "Branches" in left sidebar
- [ ] Clicked "Add branch protection rule"
- [ ] Entered branch name pattern: `main`

### Required Settings
- [ ] ✅ Require a pull request before merging
  - [ ] Set required approvals to: `1`
  - [ ] ✅ Dismiss stale pull request approvals when new commits are pushed
  - [ ] ✅ Require review from Code Owners

### Recommended Settings
- [ ] ✅ Require status checks to pass before merging
- [ ] ✅ Require conversation resolution before merging
- [ ] ✅ Require signed commits (optional)
- [ ] ✅ Require linear history

### Restriction Settings
- [ ] ❌ Allow force pushes (UNCHECKED)
- [ ] ❌ Allow deletions (UNCHECKED)
- [ ] ❌ Include administrators (UNCHECKED - allows admin bypass)

### Push Restrictions
- [ ] ✅ Restrict pushes that create matching branches
- [ ] Added: Repository administrators (or your username)

### Save
- [ ] Clicked "Create" button
- [ ] Saw confirmation message
- [ ] Rule appears in branch protection list

**Status:** ⬜ Not Started | 🔄 In Progress | ✅ Complete

---

## Phase 3: Create GitHub Ruleset (Optional)

### Access Rulesets
- [ ] Went to repository Settings
- [ ] Clicked "Rules" → "Rulesets" in left sidebar
- [ ] Clicked "New ruleset" → "New branch ruleset"

### Basic Configuration
- [ ] Ruleset name: `Main Branch Protection - Owner Only`
- [ ] Enforcement status: `Active`

### Target Branches
- [ ] Clicked "Add target"
- [ ] Selected "Include by pattern"
- [ ] Entered pattern: `main`
- [ ] Clicked "Add inclusion pattern"

### Rules Configuration
- [ ] ✅ Require a pull request before merging
  - [ ] Required approvals: `1`
  - [ ] Dismiss stale reviews: enabled
  - [ ] Require Code Owner review: enabled
- [ ] ✅ Require status checks to pass
- [ ] ✅ Block force pushes
- [ ] ✅ Require linear history

### Bypass Configuration
- [ ] Clicked "Add bypass"
- [ ] Selected "Repository admin"

### Save
- [ ] Clicked "Create"
- [ ] Ruleset appears in list as "Active"

**Status:** ⬜ Not Started | 🔄 In Progress | ✅ Complete

---

## Phase 4: Testing & Verification

### Test 1: CODEOWNERS Auto-Assignment
- [ ] Created a test branch
- [ ] Made a small change
- [ ] Pushed branch to GitHub
- [ ] Opened a PR
- [ ] ✅ Verified @balfea was automatically added as reviewer
- [ ] Closed/deleted test PR and branch

**Result:** ⬜ Not Tested | ❌ Failed | ✅ Passed

### Test 2: Direct Push Prevention
- [ ] Attempted to push directly to `main` branch
- [ ] ✅ Push was rejected with protection message
- [ ] Reverted test changes

**Result:** ⬜ Not Tested | ❌ Failed | ✅ Passed

### Test 3: PR Approval Requirement
- [ ] Created a test PR
- [ ] Attempted to merge without approval
- [ ] ✅ Merge button was disabled or showed "Review required"
- [ ] Approved the PR (if using a test account)
- [ ] ✅ Merge button became enabled after approval
- [ ] Cleaned up test PR

**Result:** ⬜ Not Tested | ❌ Failed | ✅ Passed

### Test 4: Force Push Prevention
- [ ] Attempted a force push to a branch
- [ ] ✅ Force push was blocked
- [ ] Verified error message mentions protection

**Result:** ⬜ Not Tested | ❌ Failed | ✅ Passed

---

## Phase 5: Additional Security (Recommended)

### Account Security
- [ ] Two-factor authentication (2FA) enabled on GitHub account
- [ ] Recovery codes saved securely
- [ ] Authenticator app configured

### Repository Security
- [ ] Reviewed collaborators and their access levels
- [ ] Removed unnecessary collaborators
- [ ] Set appropriate permission levels (Read/Write/Admin)

### Automated Security
- [ ] Enabled Dependency graph (Settings → Code security)
- [ ] Enabled Dependabot alerts
- [ ] Enabled Dependabot security updates
- [ ] Enabled Secret scanning
- [ ] Enabled Push protection

### Documentation Review
- [ ] Read `.github/SECURITY.md`
- [ ] Read `.github/rulesets/README.md`
- [ ] Bookmarked `.github/QUICKSTART.md` for reference

**Status:** ⬜ Not Started | 🔄 In Progress | ✅ Complete

---

## Final Verification

### Visual Confirmation
- [ ] Repository has `.github` directory visible on main branch
- [ ] Settings → Branches shows active protection rule
- [ ] Settings → Rules shows active ruleset (if created)
- [ ] New PRs automatically assign you as reviewer
- [ ] Cannot push directly to `main` branch

### Functional Confirmation
- [ ] Direct pushes to main are blocked
- [ ] PRs require your approval to merge
- [ ] Force pushes are blocked
- [ ] Branch deletion is blocked
- [ ] Linear history is enforced

### Documentation
- [ ] All team members informed of new workflow
- [ ] Emergency bypass procedure documented
- [ ] Contact information updated if needed

---

## Overall Completion Status

### Summary
- **Total Items:** Count your checkboxes above
- **Completed:** ___ / ___
- **Completion Percentage:** ___%

### Priority Levels
- 🔴 **Critical (Must Have):** Phase 1, Phase 2, Test 1, Test 2
- 🟡 **Important (Should Have):** Phase 3, Phase 5 (Account Security)
- 🟢 **Recommended (Nice to Have):** Phase 5 (Automated Security)

### Next Steps
- [ ] Schedule regular security reviews (quarterly)
- [ ] Set calendar reminder to review collaborators (monthly)
- [ ] Document any custom workflows or processes
- [ ] Share security documentation with future collaborators

---

## Sign-Off

**Setup Completed By:** _________________

**Date:** _________________

**Notes/Issues Encountered:**
```
(Add any notes here about issues you encountered and how you solved them)
```

**Verification Signature:** _________________

---

## Need Help?

If you got stuck or need clarification:

1. **Quick answers:** `.github/QUICKSTART.md`
2. **Detailed guide:** `.github/SETUP_GUIDE.md`
3. **Security info:** `.github/SECURITY.md`
4. **Ruleset details:** `.github/rulesets/README.md`

## Support Resources

- GitHub Docs: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository
- Repository Issues: https://github.com/balfea/guess-the-time/issues

---

**Last Updated:** 2026-02-09
**Version:** 1.0
