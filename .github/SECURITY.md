# Repository Security and Protection Guide

This guide explains the security measures implemented to protect the `guess-the-time` repository from unauthorized edits.

## Protection Mechanisms

### 1. GitHub Rulesets (`.github/rulesets/`)

GitHub rulesets provide branch-level protection rules. The configuration is documented in the `rulesets` directory, but must be manually applied through GitHub's web interface.

**What it protects:**
- Main/master branches from direct pushes
- Prevents force pushes and history rewrites
- Requires pull requests for all changes
- Blocks branch deletion

**Setup Instructions:** See `.github/rulesets/README.md`

### 2. CODEOWNERS File (`.github/CODEOWNERS`)

The CODEOWNERS file designates @balfea as the owner of all code in the repository.

**What it does:**
- Automatically requests @balfea as a reviewer on all pull requests
- Ensures the owner is aware of all proposed changes
- Can be combined with branch protection to require owner approval

**How it works:**
- When anyone opens a PR, @balfea is automatically added as a required reviewer
- The PR cannot be merged until @balfea approves it (when combined with branch protection)

### 3. Recommended GitHub Settings

In addition to the rulesets and CODEOWNERS file, configure these settings in GitHub:

#### Branch Protection Rules (Settings → Branches)

For the `main` branch (and `master` if it exists):

1. **Require a pull request before merging**
   - ✅ Require approvals: 1
   - ✅ Dismiss stale pull request approvals when new commits are pushed
   - ✅ Require review from code owners

2. **Require status checks to pass before merging**
   - (Add any CI/CD checks if you have them)

3. **Require conversation resolution before merging**
   - ✅ Enabled (ensures all PR comments are addressed)

4. **Require signed commits**
   - ✅ Enabled (for extra security)

5. **Require linear history**
   - ✅ Enabled (prevents messy merge commits)

6. **Do not allow bypassing the above settings**
   - ⚠️ Leave unchecked so you (admin) can bypass if needed in emergencies

7. **Restrict who can push to matching branches**
   - Add: Only repository administrators

8. **Allow force pushes**
   - ❌ Disabled

9. **Allow deletions**
   - ❌ Disabled

#### Repository Settings (Settings → General)

1. **Collaborators and teams**
   - Only add collaborators you trust
   - Give them "Write" access at most (not "Admin")
   - Review collaborators regularly

2. **Require contributors to sign off on web-based commits**
   - ✅ Enabled

3. **Automatically delete head branches**
   - ✅ Enabled (keeps repository clean)

## Quick Setup Checklist

- [x] Create `.github/CODEOWNERS` file with @balfea as owner
- [x] Create `.github/rulesets/` directory with configuration templates
- [ ] Apply branch protection rules via GitHub Settings → Branches
- [ ] Create GitHub ruleset via Settings → Rules → Rulesets
- [ ] Review collaborator access levels
- [ ] Enable signed commits requirement
- [ ] Test by creating a test branch and PR to verify protections work

## Testing the Protection

After setup, test that the protections work:

1. **As a collaborator (not owner):**
   - Try to push directly to `main` → Should be blocked
   - Create a branch and open a PR → Should work
   - Try to merge without owner approval → Should be blocked
   - After owner approval → Should allow merge

2. **As the owner (@balfea):**
   - You should be able to approve and merge PRs
   - You can bypass rules in emergencies (if configured)
   - You can push directly to main (if configured to allow admin bypass)

## Security Best Practices

1. **Regular Reviews**: Periodically review:
   - Who has access to the repository
   - Recent commits and changes
   - Pull requests and their approvals

2. **Keep Secrets Safe**: Never commit:
   - `.env` files with real credentials
   - API keys or tokens
   - Passwords or sensitive data

3. **Enable 2FA**: Require two-factor authentication for:
   - Your GitHub account
   - All collaborators with write access

4. **Monitor Activity**: 
   - Watch for unusual commits or PRs
   - Review the repository's security tab regularly
   - Enable GitHub's Dependabot alerts

5. **Audit Log**: 
   - Review the audit log periodically
   - Check for unauthorized access attempts
   - Monitor permission changes

## Emergency Procedures

If you need to bypass protections in an emergency:

1. **As repository admin**, you can:
   - Temporarily disable branch protection
   - Push directly to main (if admin bypass is enabled)
   - Force push if absolutely necessary

2. **After the emergency**:
   - Re-enable all protections immediately
   - Review what happened
   - Update this guide if needed

## Additional Resources

- [GitHub Branch Protection Documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [GitHub Rulesets Documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets)
- [CODEOWNERS Documentation](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)

## Support

If you have questions about these protections or need to modify them, please review this guide and the individual README files in the `.github` directory.
