import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());

// Path to persistent RSVPs storage
const DATA_DIR = path.join(__dirname, 'data');
const RSVPS_FILE = path.join(DATA_DIR, 'rsvps.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Ensure rsvps.json exists with empty array (starting clean at 0)
if (!fs.existsSync(RSVPS_FILE)) {
  fs.writeFileSync(RSVPS_FILE, JSON.stringify([], null, 2), 'utf8');
}

function readRsvps(): any[] {
  try {
    const raw = fs.readFileSync(RSVPS_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Error reading rsvps file:', e);
    return [];
  }
}

function writeRsvps(data: any[]): void {
  try {
    fs.writeFileSync(RSVPS_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {
    console.error('Error writing rsvps file:', e);
  }
}

// GET all RSVPs
app.get('/api/rsvps', (_req, res) => {
  const list = readRsvps();
  res.json(list);
});

// POST save or update an RSVP
app.post('/api/rsvps', (req, res) => {
  const item = req.body;
  if (!item || !item.name) {
    res.status(400).json({ error: 'Name is required' });
    return;
  }

  const list = readRsvps();
  const existingIdx = list.findIndex(
    (r) =>
      r.id === item.id ||
      (item.name && r.name && r.name.trim().toLowerCase() === item.name.trim().toLowerCase())
  );

  if (existingIdx >= 0) {
    list[existingIdx] = { ...list[existingIdx], ...item };
  } else {
    list.unshift(item);
  }

  writeRsvps(list);
  res.json(list);
});

// DELETE single RSVP by id
app.delete('/api/rsvps/:id', (req, res) => {
  const { id } = req.params;
  let list = readRsvps();
  list = list.filter((r) => r.id !== id);
  writeRsvps(list);
  res.json(list);
});

// DELETE all RSVPs (reset)
app.delete('/api/rsvps', (_req, res) => {
  writeRsvps([]);
  res.json({ message: 'All RSVPs cleared' });
});

// Mount Vite middleware in development
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production serve dist directory
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer();
