import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// In-memory todos (for learning). Each item: { id, text, done }
let todos = [
  { id: 1, text: 'Welcome to CI/CD demo!', done: false },
];

app.get('/api/health', (req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const { text } = req.body || {};
  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'text is required' });
  }
  const newItem = { id: Date.now(), text: text.trim(), done: false };
  todos.push(newItem);
  res.status(201).json(newItem);
});

app.patch('/api/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = todos.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: 'not found' });
  todos[idx].done = !todos[idx].done;
  res.json(todos[idx]);
});

app.delete('/api/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const before = todos.length;
  todos = todos.filter(t => t.id !== id);
  if (todos.length === before) return res.status(404).json({ error: 'not found' });
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});