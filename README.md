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

This repository is protected with GitHub rulesets and code ownership rules to prevent unauthorized modifications. See [`.github/SECURITY.md`](.github/SECURITY.md) for details on:
- Branch protection rules
- Code ownership configuration
- How to set up repository protections
- Security best practices
