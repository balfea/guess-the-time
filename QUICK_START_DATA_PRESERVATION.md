# Quick Start: Data Preservation

## Problem Solved ✅
Your previously edited cells are preserved! The UI changes don't affect reservation data.

## How It Works

### Data Storage
- Reservations are stored in `reservations.json` (not in the HTML files)
- This file is on your server (Railway deployment or local)
- The file is NOT in git (listed in `.gitignore`)
- Backend API (`server.js`) reads from this file

### Why Your Data Is Safe
1. **UI changes** (image, info box) are only in HTML/CSS
2. **Backend unchanged** - all `/reservations` API endpoints work normally
3. **Data separate** - `reservations.json` is independent of HTML

## Quick Actions

### Check Your Data Right Now

```bash
# If server is running locally
curl http://localhost:3000/reservations

# If deployed on Railway
curl https://your-app.up.railway.app/reservations
```

You should see: `{"ok":true,"reservations":{"4:20:00":"Name",... }}`

### Backup Your Data (Recommended!)

```bash
# From production server
node scripts/backup-reservations.js https://your-app.up.railway.app my-backup.json

# You'll see:
# ✅ Success! Backed up X reservation(s) to my-backup.json
```

### Restore Data (If Needed)

```bash
# From a backup file
node scripts/restore-reservations.js my-backup.json reservations.json

# Then restart your server
npm start
```

## If Your Data Seems Missing

1. **Check the production server** (not your local copy):
   ```bash
   node scripts/backup-reservations.js https://your-railway-url.up.railway.app check.json
   cat check.json
   ```

2. **Check Railway logs**:
   - Go to Railway dashboard
   - Click on your project
   - View logs for any errors

3. **Look for a backup**:
   - Check if you have any `*.json` files with reservation data
   - Check Railway volumes/persistent storage

## Need More Help?

See `DATA_PRESERVATION.md` for:
- Complete backup/restore guide
- Troubleshooting steps
- Recovery procedures
- Best practices

## Test It Yourself

Want to see it work? Create test data:

```bash
# Create test reservations
cat > reservations.json << 'TEST'
{
  "4:20:00": "Test User 1",
  "4:25:00": "Test User 2"
}
TEST

# Start server
npm start

# Open http://localhost:3000/time-grid-board.html
# You'll see your test reservations displayed!
```

The data persists because it's in `reservations.json`, not the HTML.
