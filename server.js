const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

// CORS configuration - allows requests from GitHub Pages
app.use(cors({
  origin: [
    'https://yourusername.github.io', // Replace with your GitHub Pages URL
    'http://localhost:3000',
    'http://127.0.0.1:3000'
  ],
  credentials: true
}));

app.use(express.json());

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

app.post('/reset', requireAuth, (req, res) => {
  return res.json({ ok: true });
});

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`));
