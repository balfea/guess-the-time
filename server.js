const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const app = express();

// CORS configuration - allows requests from GitHub Pages and development
// When deploying to Railway.com, this automatically allows requests from your GitHub Pages site
app.use(cors({
  origin: [
    'https://balfea.github.io', // GitHub Pages URL
    'http://localhost:3000',     // Local development
    'http://127.0.0.1:3000'      // Local development (alternative)
  ],
  credentials: true
}));

app.use(express.json());

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');

// Strict rate limit for the login endpoint (brute-force protection)
const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20 });
// General limit for all admin-protected and database routes
const apiLimiter = rateLimit({ windowMs: 60 * 1000, max: 120 });

// Path to store reservations (JSON-file fallback when no DATABASE_URL)
const RESERVATIONS_FILE = path.join(__dirname, 'reservations.json');

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
const JWT_SECRET = process.env.JWT_SECRET || 'NpBIp0rKg2S6NuC7xX/FhX5w0cik9bG80pFqUIJ/8/w=';

// Maximum number of log entries returned by GET /logs
const MAX_LOG_ENTRIES = 500;

// ---------------------------------------------------------------------------
// Postgres setup (used when Railway provides DATABASE_URL)
// ---------------------------------------------------------------------------
let pgPool = null;

if (process.env.DATABASE_URL) {
  const { Pool } = require('pg');
  pgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false }
  });

  // Create the reservations table (and log table) if they don't exist yet
  pgPool.query(`
    CREATE TABLE IF NOT EXISTS reservations (
      time        TEXT PRIMARY KEY,
      player_name TEXT NOT NULL,
      updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `).then(() => pgPool.query(`
    CREATE TABLE IF NOT EXISTS reservation_log (
      id          SERIAL PRIMARY KEY,
      time        TEXT NOT NULL,
      player_name TEXT,
      action      TEXT NOT NULL,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)).then(() => {
    console.log('Postgres tables ready');
  }).catch(err => {
    console.error('Error creating Postgres tables:', err.message);
  });
}

// ---------------------------------------------------------------------------
// Storage helpers — Postgres when available, JSON file otherwise
// ---------------------------------------------------------------------------

async function readReservations() {
  if (pgPool) {
    const result = await pgPool.query(
      'SELECT time, player_name FROM reservations ORDER BY time'
    );
    const reservations = {};
    for (const row of result.rows) {
      reservations[row.time] = row.player_name;
    }
    return reservations;
  }
  // JSON-file fallback
  try {
    if (fs.existsSync(RESERVATIONS_FILE)) {
      return JSON.parse(fs.readFileSync(RESERVATIONS_FILE, 'utf8'));
    }
  } catch (err) {
    console.error('Error reading reservations file:', err);
  }
  return {};
}

async function upsertReservation(time, playerName) {
  if (pgPool) {
    await pgPool.query(
      `INSERT INTO reservations (time, player_name, updated_at)
       VALUES ($1, $2, NOW())
       ON CONFLICT (time) DO UPDATE SET player_name = $2, updated_at = NOW()`,
      [time, playerName]
    );
    await pgPool.query(
      'INSERT INTO reservation_log (time, player_name, action) VALUES ($1, $2, $3)',
      [time, playerName, 'upsert']
    );
    return true;
  }
  // JSON-file fallback
  try {
    const reservations = await readReservations();
    reservations[time] = playerName;
    fs.writeFileSync(RESERVATIONS_FILE, JSON.stringify(reservations, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing reservations file:', err);
    return false;
  }
}

async function deleteReservation(time) {
  if (pgPool) {
    await pgPool.query('DELETE FROM reservations WHERE time = $1', [time]);
    await pgPool.query(
      'INSERT INTO reservation_log (time, player_name, action) VALUES ($1, NULL, $2)',
      [time, 'delete']
    );
    return true;
  }
  // JSON-file fallback
  try {
    const reservations = await readReservations();
    delete reservations[time];
    fs.writeFileSync(RESERVATIONS_FILE, JSON.stringify(reservations, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing reservations file:', err);
    return false;
  }
}

async function resetReservations() {
  if (pgPool) {
    await pgPool.query('DELETE FROM reservations');
    await pgPool.query(
      "INSERT INTO reservation_log (time, player_name, action) VALUES ('*', NULL, 'reset')"
    );
    return true;
  }
  // JSON-file fallback
  try {
    fs.writeFileSync(RESERVATIONS_FILE, JSON.stringify({}, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error resetting reservations file:', err);
    return false;
  }
}

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

app.post('/login', loginLimiter, async (req, res) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ ok: false, error: 'no password' });

  try {
    let match = false;

    if (ADMIN_PASSWORD_HASH) {
      match = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    } else if (ADMIN_PASSWORD) {
      match = password === ADMIN_PASSWORD;
    } else {
      return res.status(500).json({ ok: false, error: 'admin password not configured' });
    }

    if (match) {
      const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '8h' });
      return res.json({ ok: true, token });
    }

    res.status(401).json({ ok: false });
  } catch (err) {
    console.error('Login error', err);
    res.status(500).json({ ok: false, error: 'internal' });
  }
});

function requireAuth(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : (req.cookies && req.cookies.token) || null;
  if (!token) return res.status(401).json({ ok: false, error: 'no token' });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ ok: false, error: 'invalid token' });
  }
}

app.post('/verify', (req, res) => {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ ok: false });
  try {
    jwt.verify(token, JWT_SECRET);
    return res.json({ ok: true });
  } catch (err) {
    return res.status(401).json({ ok: false });
  }
});

// ---------------------------------------------------------------------------
// Reservations API
// ---------------------------------------------------------------------------

// GET /reservations - Get all reservations (public endpoint)
app.get('/reservations', async (req, res) => {
  try {
    const reservations = await readReservations();
    return res.json({ ok: true, reservations });
  } catch (err) {
    console.error('GET /reservations error:', err);
    return res.status(500).json({ ok: false, error: 'failed to read reservations' });
  }
});

// POST /reservations - Save/update a reservation (admin only)
app.post('/reservations', apiLimiter, requireAuth, async (req, res) => {
  const { time, playerName } = req.body;

  if (!time) {
    return res.status(400).json({ ok: false, error: 'time is required' });
  }

  try {
    if (playerName && playerName.trim()) {
      await upsertReservation(time, playerName.trim());
    } else {
      await deleteReservation(time);
    }
    const reservations = await readReservations();
    return res.json({ ok: true, reservations });
  } catch (err) {
    console.error('POST /reservations error:', err);
    return res.status(500).json({ ok: false, error: 'failed to save reservation' });
  }
});

// DELETE /reservations/:time - Delete a reservation (admin only)
app.delete('/reservations/:time', apiLimiter, requireAuth, async (req, res) => {
  const { time } = req.params;

  try {
    await deleteReservation(time);
    const reservations = await readReservations();
    return res.json({ ok: true, reservations });
  } catch (err) {
    console.error('DELETE /reservations error:', err);
    return res.status(500).json({ ok: false, error: 'failed to delete reservation' });
  }
});

app.post('/reset', apiLimiter, requireAuth, async (req, res) => {
  try {
    await resetReservations();
    return res.json({ ok: true });
  } catch (err) {
    console.error('POST /reset error:', err);
    return res.status(500).json({ ok: false, error: 'failed to reset reservations' });
  }
});

// ---------------------------------------------------------------------------
// GET /logs - Reservation entry log (admin only, Postgres only)
// ---------------------------------------------------------------------------
app.get('/logs', apiLimiter, requireAuth, async (req, res) => {
  if (!pgPool) {
    return res.json({
      ok: true,
      message: 'No database connected — logs are only available when DATABASE_URL is set.',
      logs: []
    });
  }
  try {
    const result = await pgPool.query(
      'SELECT id, time, player_name, action, created_at FROM reservation_log ORDER BY created_at DESC LIMIT $1',
      [MAX_LOG_ENTRIES]
    );
    return res.json({ ok: true, logs: result.rows });
  } catch (err) {
    console.error('GET /logs error:', err);
    return res.status(500).json({ ok: false, error: 'failed to read logs' });
  }
});

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  const storage = pgPool ? 'Postgres' : 'JSON file';
  console.log(`server running on http://localhost:${PORT} (storage: ${storage})`);
});
