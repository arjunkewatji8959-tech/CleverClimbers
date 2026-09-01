const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = Number(process.env.PORT) || 10000;
const PUBLIC_DIR = __dirname;
const ASSETS_DIR = __dirname;
const DATA_DIR = __dirname;
const DATA_FILE = path.join(__dirname, 'submissions.json');

fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]', 'utf8');

app.disable('x-powered-by');
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// Explicit asset route: this prevents CSS/JS/image path issues on Render.
app.use('/assets', express.static(ASSETS_DIR, {
  fallthrough: false,
  maxAge: '1h'
}));
app.use(express.static(PUBLIC_DIR, { extensions: ['html'], maxAge: '5m' }));

function readData() {
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); }
  catch { return []; }
}
function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'CleverClimbers', version: '2026.08.31' });
});

app.post('/api/contact', (req, res) => {
  const { name, email, phone, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, message: 'Name, email and message are required.' });
  }
  const items = readData();
  items.push({
    type: 'contact',
    id: Date.now().toString(),
    name: String(name).trim(),
    email: String(email).trim(),
    phone: String(phone || '').trim(),
    message: String(message).trim(),
    createdAt: new Date().toISOString()
  });
  saveData(items);
  res.json({ ok: true, message: 'Thank you. Your message has been received.' });
});

app.post('/api/comments', (req, res) => {
  const { name, email, comment, article } = req.body || {};
  if (!name || !email || !comment) {
    return res.status(400).json({ ok: false, message: 'Name, email and comment are required.' });
  }
  const items = readData();
  items.push({
    type: 'comment',
    id: Date.now().toString(),
    article: String(article || 'CleverClimbers Article'),
    name: String(name).trim(),
    email: String(email).trim(),
    comment: String(comment).trim(),
    createdAt: new Date().toISOString()
  });
  saveData(items);
  res.json({ ok: true, message: 'Comment submitted successfully.' });
});

// SPA-style fallback only for normal page requests, never for missing assets/API.
app.use((req, res, next) => {
  if (req.method !== 'GET' || req.path.startsWith('/api/')) return next();
  res.status(404).sendFile(path.join(PUBLIC_DIR, '404.html'));
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ ok: false, message: 'Server error.' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`CleverClimbers live server listening on port ${PORT}`);
});
