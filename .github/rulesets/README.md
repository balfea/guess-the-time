# Repository Protection Rulesets

This directory contains GitHub repository rulesets that protect the codebase from unauthorized modifications.

## Overview

The ruleset defined in this directory ensures that only the repository owner (balfea) can directly push changes to protected branches.

## Rulesets

### `branch-protection.json`

This ruleset protects the main branches (`main` and `master`) with the following rules:

1. **Pull Request Required**: All changes must go through a pull request with at least 1 approval
2. **Deletion Protection**: Prevents deletion of protected branches
3. **Force Push Prevention**: Blocks force pushes and history rewrites
4. **Linear History**: Requires linear commit history (no merge commits)
5. **Bypass for Repository Owner**: Only repository administrators/owners can bypass these rules

## How to Apply These Rulesets

GitHub rulesets can be applied automatically using the GitHub Actions workflow or manually through the web interface.

### Method 1: Automated via GitHub Actions (Recommended)

The easiest way to apply branch protection is to use the included GitHub Actions workflow:

1. Go to your repository on GitHub (https://github.com/balfea/guess-the-time)
2. Navigate to **Actions** tab
3. Click on **Apply Branch Protection Rules** workflow in the left sidebar
4. Click **Run workflow** → Select `main` branch → Click **Run workflow**
5. Wait for the workflow to complete (usually takes less than a minute)
6. The branch protection ruleset will be automatically applied!

The workflow will:
- Read the configuration from `.github/rulesets/branch-protection.json`
- Create or update the ruleset via GitHub API
- Verify the ruleset was applied successfully

**Note:** This workflow also runs automatically whenever you push changes to `branch-protection.json`, so the ruleset stays in sync with your configuration file.

### Method 2: Manual via GitHub Web UI

1. Go to your repository on GitHub (e.g., https://github.com/balfea/guess-the-time)
2. Click on **Settings**
3. In the left sidebar, click on **Rules** → **Rulesets**
4. Click **New ruleset** → **New branch ruleset**
5. Configure the following settings:

   **Ruleset Name:** `Main Branch Protection - Owner Only`
   
   **Enforcement Status:** Active
   
   **Target branches:**
   - Add target: `main`
   - Add target: `master`
   
   **Branch protections (select the following):**
   - ✅ Require a pull request before merging
     - Required approvals: 1
     - Dismiss stale pull request approvals when new commits are pushed
   - ✅ Block force pushes
   - ✅ Require linear history
   
   **Bypass list:**
   - Add bypass: Repository admin (this allows you, the owner, to bypass if needed)

6. Click **Create** to save the ruleset

### Method 3: Via GitHub API

You can also use the GitHub API to create rulesets programmatically. However, this requires a personal access token with appropriate permissions.

## Additional Security Recommendations

1. **Enable Branch Protection**: In addition to rulesets, consider enabling traditional branch protection rules
2. **Required Status Checks**: Add CI/CD status checks that must pass before merging
3. **CODEOWNERS File**: Create a `.github/CODEOWNERS` file to automatically request reviews from specific people
4. **Signed Commits**: Require commits to be signed with GPG keys for additional security

## Reference Configuration

The `branch-protection.json` file in this directory contains the exact configuration used for the ruleset. This serves as:
- Documentation of the current protection settings
- A template for creating similar rulesets
- Version-controlled history of security policy changes

## Notes

- These rulesets protect against accidental or unauthorized changes
- As the repository owner, you can still bypass these rules if absolutely necessary
- Other collaborators will need to submit pull requests and get approval before merging
- Consider reviewing and updating these rules as your team and workflow evolve
