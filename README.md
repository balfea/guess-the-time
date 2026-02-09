# guess-the-time

Quick dev server for GuessTheTime

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

http://localhost:3000/time-grid-board.html

Notes:
- Keep `server.js` and your `.env` on the server (don't commit secrets).
- Use `ADMIN_PASSWORD_HASH` with a bcrypt hash when possible. The README includes a command to generate the hash locally.

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
