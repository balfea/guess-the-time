# Quick Start: Repository Protection Setup

## ⚡ Fast Track (For the Impatient)

### 1. Merge the PR (30 seconds)
```
1. Go to: https://github.com/balfea/guess-the-time/pulls
2. Click the open PR
3. Click "Merge pull request" → "Confirm merge"
```

### 2. Set Up Branch Protection (2 minutes)
```
1. Go to: https://github.com/balfea/guess-the-time/settings/branches
2. Click "Add branch protection rule"
3. Branch name pattern: main
4. Check these boxes:
   ✅ Require a pull request before merging
      → Required approvals: 1
      → Dismiss stale reviews
      → Require review from Code Owners
   ✅ Require conversation resolution
   ✅ Require linear history
   ❌ Allow force pushes (leave UNCHECKED)
   ❌ Allow deletions (leave UNCHECKED)
5. Under "Restrict pushes", select "Repository administrators"
6. Click "Create"
```

### 3. Create Ruleset (Optional but Recommended - 2 minutes)
```
1. Go to: https://github.com/balfea/guess-the-time/settings/rules
2. Click "New ruleset" → "New branch ruleset"
3. Name: Main Branch Protection - Owner Only
4. Enforcement: Active
5. Target: main
6. Check:
   ✅ Require a pull request (1 approval, Code Owners)
   ✅ Block force pushes
   ✅ Require linear history
7. Bypass: Repository admin
8. Click "Create"
```

### 4. Test It (1 minute)
```bash
# This should FAIL (protection working):
git checkout main
echo "test" >> README.md
git commit -am "test"
git push origin main

# Reset the test:
git reset --hard HEAD~1
```

## ✅ Done!

You should now have:
- ✅ CODEOWNERS active (auto-adds you as reviewer)
- ✅ Branch protection preventing direct pushes to main
- ✅ All changes require PR + your approval
- ✅ Force pushes blocked
- ✅ Branch deletion blocked

## 📖 Need Details?

See `.github/SETUP_GUIDE.md` for the complete step-by-step guide with:
- Screenshots and detailed explanations
- Troubleshooting tips
- Testing procedures
- Additional security settings

## 🆘 Troubleshooting

**Can't push to main?** ✅ Good! Protection is working. Use branches instead.

**CODEOWNERS not working?** Check:
1. PR was merged to main
2. File contains: `* @balfea`
3. Branch protection has "Require review from Code Owners" enabled

**Need to bypass temporarily?** 
1. Settings → Branches → Edit rule → Uncheck "Include administrators"
2. Make your change
3. Re-enable immediately!

## 🔗 Quick Links

- [Repository Settings](https://github.com/balfea/guess-the-time/settings)
- [Branch Protection](https://github.com/balfea/guess-the-time/settings/branches)
- [Rulesets](https://github.com/balfea/guess-the-time/settings/rules)
- [Pull Requests](https://github.com/balfea/guess-the-time/pulls)

---

**Total Setup Time: ~5 minutes** | **Protection Level: High** 🔒
