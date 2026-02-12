#!/usr/bin/env node

/**
 * Backup Reservations Script
 * 
 * This script fetches all reservations from a running server and saves them to a backup file.
 * 
 * Usage:
 *   node scripts/backup-reservations.js [server-url] [output-file]
 * 
 * Examples:
 *   node scripts/backup-reservations.js http://localhost:3000 backup.json
 *   node scripts/backup-reservations.js https://guess-the-time-production.up.railway.app reservations-backup.json
 */

const fs = require('fs');
const https = require('https');
const http = require('http');

const serverUrl = process.argv[2] || 'http://localhost:3000';
const outputFile = process.argv[3] || 'reservations-backup.json';

console.log(`📥 Backing up reservations from: ${serverUrl}`);
console.log(`💾 Output file: ${outputFile}`);

const url = new URL(`${serverUrl}/reservations`);
const client = url.protocol === 'https:' ? https : http;

client.get(url, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      
      if (response.ok && response.reservations) {
        const backup = {
          timestamp: new Date().toISOString(),
          serverUrl: serverUrl,
          reservations: response.reservations
        };
        
        fs.writeFileSync(outputFile, JSON.stringify(backup, null, 2));
        
        const count = Object.keys(response.reservations).length;
        console.log(`✅ Success! Backed up ${count} reservation(s) to ${outputFile}`);
        console.log(`\nReservations:`);
        Object.entries(response.reservations).forEach(([time, name]) => {
          console.log(`  ${time}: ${name}`);
        });
      } else {
        console.error('❌ Error: Server response missing reservations data');
        console.error('Response:', response);
        process.exit(1);
      }
    } catch (error) {
      console.error('❌ Error parsing server response:', error.message);
      console.error('Raw response:', data);
      process.exit(1);
    }
  });
}).on('error', (error) => {
  console.error(`❌ Error connecting to server: ${error.message}`);
  console.error('\nTroubleshooting:');
  console.error('1. Make sure the server is running');
  console.error('2. Check that the URL is correct');
  console.error('3. For Railway: Verify the deployment URL in your dashboard');
  process.exit(1);
});
