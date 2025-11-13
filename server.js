// server.js - main entry
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db'); // ensure DB file is created/initialized
const authRoutes = require('./routes/auth');
const settingsRoutes = require('./routes/settings');
const authMiddleware = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Public routes
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/settings', authMiddleware, settingsRoutes);

// Simple "me" endpoint
app.get('/api/me', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

// Simple search stub (demo): returns a redirect URL or search results placeholder
app.get('/api/search', (req, res) => {
  const q = (req.query.q || '').trim();
  if (!q) return res.status(400).json({ error: 'q param required' });
  // Demo: return Google search url (client should open it)
  res.json({ url: 'https://www.google.com/search?q=' + encodeURIComponent(q) });
});

// Health
app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'internal_server_error' });
});

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});
