#!/usr/bin/env node

/**
 * Restore Reservations Script
 * 
 * This script restores reservations from a backup file to the local reservations.json file.
 * 
 * ⚠️  WARNING: This script should be run on the server where the application is deployed.
 *     For Railway deployments, you'll need to manually upload the reservations.json file
 *     or use Railway CLI to sync it.
 * 
 * Usage:
 *   node scripts/restore-reservations.js [backup-file] [target-file]
 * 
 * Examples:
 *   node scripts/restore-reservations.js reservations-backup.json reservations.json
 *   node scripts/restore-reservations.js backup.json ./reservations.json
 */

const fs = require('fs');
const path = require('path');

const backupFile = process.argv[2] || 'reservations-backup.json';
const targetFile = process.argv[3] || path.join(__dirname, '..', 'reservations.json');

console.log(`📥 Restoring reservations from: ${backupFile}`);
console.log(`💾 Target file: ${targetFile}`);

try {
  // Read backup file
  if (!fs.existsSync(backupFile)) {
    console.error(`❌ Error: Backup file not found: ${backupFile}`);
    process.exit(1);
  }

  const backupData = JSON.parse(fs.readFileSync(backupFile, 'utf8'));
  
  if (!backupData.reservations) {
    console.error('❌ Error: Backup file is missing reservations data');
    console.error('Expected format: { "timestamp": "...", "reservations": {...} }');
    process.exit(1);
  }

  // Backup existing file if it exists
  if (fs.existsSync(targetFile)) {
    const backupName = `${targetFile}.backup.${Date.now()}`;
    fs.copyFileSync(targetFile, backupName);
    console.log(`📋 Backed up existing file to: ${backupName}`);
  }

  // Write reservations
  fs.writeFileSync(targetFile, JSON.stringify(backupData.reservations, null, 2));
  
  const count = Object.keys(backupData.reservations).length;
  console.log(`✅ Success! Restored ${count} reservation(s) to ${targetFile}`);
  
  if (backupData.timestamp) {
    console.log(`   Backup from: ${backupData.timestamp}`);
  }
  
  console.log(`\nRestored Reservations:`);
  Object.entries(backupData.reservations).forEach(([time, name]) => {
    console.log(`  ${time}: ${name}`);
  });

  console.log(`\n⚠️  Important: Restart the server to load the new reservations`);
  
} catch (error) {
  console.error(`❌ Error: ${error.message}`);
  process.exit(1);
}
