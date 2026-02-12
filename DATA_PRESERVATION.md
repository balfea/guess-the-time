# Data Preservation Guide

This guide explains how to backup, restore, and preserve reservation data for the Guess The Time application.

## Understanding Data Storage

Reservation data is stored in `reservations.json` file:
- **Local Development**: Stored in the project root directory
- **Production (Railway)**: Stored in the Railway deployment's filesystem
- **Git**: NOT tracked (listed in `.gitignore`)

## Backup Reservations

### From Local Development

```bash
# Start the server first
npm start

# In another terminal, run the backup script
node scripts/backup-reservations.js http://localhost:3000 my-backup.json
```

### From Production (Railway)

```bash
# Backup from your Railway deployment
node scripts/backup-reservations.js https://guess-the-time-production.up.railway.app production-backup.json
```

The backup file will contain:
```json
{
  "timestamp": "2026-02-12T12:00:00.000Z",
  "serverUrl": "http://localhost:3000",
  "reservations": {
    "4:20:00": "John Smith",
    "4:20:15": "Jane Doe"
  }
}
```

## Restore Reservations

### To Local Development

```bash
# This will restore reservations to your local reservations.json file
node scripts/restore-reservations.js my-backup.json reservations.json

# Restart the server to load the new data
npm start
```

### To Production (Railway)

For Railway deployments, you have two options:

#### Option 1: Use Railway CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Link to your project
railway link

# Upload the reservations file
railway volumes add
# Follow prompts to upload reservations.json
```

#### Option 2: Manual via Server Access

If you have direct server access:
1. Create `reservations.json` from your backup
2. Upload it to the server
3. Restart the application

## Data Preservation During UI Updates

The UI changes (HTML/CSS modifications) do NOT affect reservation data because:

1. **Separate Storage**: Reservations are stored in `reservations.json`, not in HTML
2. **Backend Unchanged**: The server code (`server.js`) that manages reservations is not modified
3. **API Intact**: All `/reservations` API endpoints remain functional

### Verification

After deploying UI changes, verify data is preserved:

```bash
# Check reservation count
curl https://your-app.up.railway.app/reservations

# Should return:
# {"ok":true,"reservations":{"4:20:00":"John Smith",...}}
```

## Best Practices

1. **Regular Backups**: Backup reservations before major changes
   ```bash
   node scripts/backup-reservations.js https://your-app.up.railway.app backup-$(date +%Y%m%d).json
   ```

2. **Version Control**: Keep backup files in a secure location (NOT in git)

3. **Test Locally**: Always test UI changes locally with sample data first

4. **Deployment Process**:
   - Backup production data
   - Deploy changes
   - Verify data is intact
   - Keep backup for 30 days

## Recovering Lost Data

If reservation data appears to be cleared:

1. **Check Production Server**:
   ```bash
   node scripts/backup-reservations.js https://your-app.up.railway.app check.json
   cat check.json
   ```

2. **Check Railway Logs**:
   - Visit Railway dashboard
   - Check deployment logs for errors
   - Look for file system issues

3. **Restore from Backup**:
   ```bash
   node scripts/restore-reservations.js your-latest-backup.json reservations.json
   ```

4. **Contact Support**: If data is lost and no backup exists, check:
   - Railway persistent volumes
   - Server logs for recent reservations
   - Database backups (if using external DB)

## Emergency Contact

For immediate assistance with lost data:
1. Check this repository's Issues tab
2. Contact the repository owner
3. Review Railway deployment logs

## Troubleshooting

### "Connection refused" when backing up
- Ensure the server is running
- Check the URL is correct
- Verify firewall/network settings

### "File not found" when restoring
- Check the backup file path
- Ensure you have read permissions
- Verify the backup file format

### Data not appearing after restore
- Restart the server
- Check server logs for errors
- Verify file permissions on reservations.json
