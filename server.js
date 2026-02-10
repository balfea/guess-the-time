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

// Path to store reservations
const RESERVATIONS_FILE = path.join(__dirname, 'reservations.json');

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
const JWT_SECRET = process.env.JWT_SECRET || 'NpBIp0rKg2S6NuC7xX/FhX5w0cik9bG80pFqUIJ/8/w=';

app.post('/login', async (req, res) => {
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

// Helper functions for reading/writing reservations
function readReservations() {
  try {
    if (fs.existsSync(RESERVATIONS_FILE)) {
      const data = fs.readFileSync(RESERVATIONS_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading reservations:', err);
  }
  return {};
}

function writeReservations(reservations) {
  try {
    fs.writeFileSync(RESERVATIONS_FILE, JSON.stringify(reservations, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing reservations:', err);
    return false;
  }
}

// GET /reservations - Get all reservations (public endpoint)
app.get('/reservations', (req, res) => {
  const reservations = readReservations();
  return res.json({ ok: true, reservations });
});

// POST /reservations - Save/update a reservation (admin only)
app.post('/reservations', requireAuth, (req, res) => {
  const { time, playerName } = req.body;
  
  if (!time) {
    return res.status(400).json({ ok: false, error: 'time is required' });
  }
  
  const reservations = readReservations();
  
  if (playerName && playerName.trim()) {
    reservations[time] = playerName.trim();
  } else {
    delete reservations[time];
  }
  
  if (writeReservations(reservations)) {
    return res.json({ ok: true, reservations });
  } else {
    return res.status(500).json({ ok: false, error: 'failed to save reservation' });
  }
});

// DELETE /reservations/:time - Delete a reservation (admin only)
app.delete('/reservations/:time', requireAuth, (req, res) => {
  const { time } = req.params;
  
  const reservations = readReservations();
  delete reservations[time];
  
  if (writeReservations(reservations)) {
    return res.json({ ok: true, reservations });
  } else {
    return res.status(500).json({ ok: false, error: 'failed to delete reservation' });
  }
});

app.post('/reset', requireAuth, (req, res) => {
  if (writeReservations({})) {
    return res.json({ ok: true });
  } else {
    return res.status(500).json({ ok: false, error: 'failed to reset reservations' });
  }
});

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`));
